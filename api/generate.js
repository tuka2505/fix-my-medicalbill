// Vercel Serverless Function - Secure Gemini API Proxy
// Features: reCAPTCHA v3, Rate Limiting (1 req/3 sec), Budget Protection ($37/month)

import { Redis } from '@upstash/redis';

// Vercel function configuration - increase timeout for large image processing
export const config = {
  maxDuration: 90 // 90 seconds (extended for complex medical bills)
};

const RATE_LIMIT_WINDOW = 3 * 1000; // 3 seconds
const RECAPTCHA_THRESHOLD = 0.5; // Score threshold for bot detection

// Initialize Redis client for global rate limiting
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN
});

// Verify reCAPTCHA token
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('[reCAPTCHA] Secret key not configured');
    return { success: false, error: 'Server configuration error' };
  }
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${secretKey}&response=${token}`
    });
    
    const data = await response.json();
    
    console.log('[reCAPTCHA] Verification result:', {
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
      challenge_ts: data['challenge_ts'],
      'error-codes': data['error-codes']
    });
    
    // Check if verification was successful and score is above threshold
    if (!data.success) {
      console.error('[reCAPTCHA] Verification failed. Error codes:', data['error-codes']);
      return { 
        success: false, 
        error: 'reCAPTCHA verification failed',
        errorCodes: data['error-codes']
      };
    }
    
    if (data.score < RECAPTCHA_THRESHOLD) {
      console.warn('[reCAPTCHA] Score too low:', data.score, '< threshold:', RECAPTCHA_THRESHOLD);
      return { 
        success: false, 
        error: 'Bot detected',
        score: data.score
      };
    }
    
    return { success: true, score: data.score };
    
  } catch (error) {
    console.error('[reCAPTCHA] Verification error:', error);
    return { success: false, error: 'reCAPTCHA server error' };
  }
}

// Rate limiting: 1 request per 3 seconds per IP using Redis
async function checkRateLimit(ip) {
  const key = `rate_limit:${ip}`;
  
  try {
    const exists = await redis.get(key);
    
    if (exists) {
      // User already made a request within the last 3 seconds
      return { 
        allowed: false, 
        waitTime: 3
      };
    }
    
    // Set key with 3-second expiration
    await redis.set(key, '1', { ex: 3 });
    
    return { allowed: true };
    
  } catch (error) {
    console.error('[Rate Limit] Redis error:', error);
    // Fail open - allow request if Redis is unavailable
    return { allowed: true };
  }
}

export default async function handler(req, res) {
  // CORS headers - Only allow specific domains
  const allowedOrigins = [
    'https://fixmymedicalbill.com',
    'https://www.fixmymedicalbill.com',
    'https://fix-my-medicalbill.vercel.app',
    'http://localhost:5173',  // Vite dev
    'http://localhost:4173'   // Vite preview
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Request body size limit (10MB for medical bill images)
  const contentLength = parseInt(req.headers['content-length'] || '0');
  const MAX_BODY_SIZE = 10 * 1024 * 1024; // 10MB
  
  if (contentLength > MAX_BODY_SIZE) {
    console.log(`[Security] Request rejected - Body too large: ${(contentLength / 1024 / 1024).toFixed(2)}MB`);
    return res.status(413).json({ 
      error: 'Payload too large',
      message: 'File size must be under 10MB. Please compress your image and try again.',
      maxSize: '10MB',
      receivedSize: `${(contentLength / 1024 / 1024).toFixed(2)}MB`
    });
  }
  
  // Get client IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
             req.headers['x-real-ip'] || 
             req.socket?.remoteAddress ||
             'unknown';
  
  console.log(`[Security] Request from IP: ${ip}`);
  
  // Rate limiting check (1 request per 3 seconds) - NOW ASYNC
  const rateLimit = await checkRateLimit(ip);
  
  if (!rateLimit.allowed) {
    console.log(`[Rate Limit] Blocked IP ${ip} - Wait ${rateLimit.waitTime}s`);
    return res.status(429).json({ 
      error: 'Rate limit exceeded',
      message: `Please wait ${rateLimit.waitTime} second(s) before trying again.`,
      waitTime: rateLimit.waitTime
    });
  }
  
  try {
    // Extract request data
    const { contents, generationConfig, action, recaptchaToken } = req.body;
    
    // Validate required fields
    if (!recaptchaToken) {
      return res.status(400).json({ 
        error: 'Missing reCAPTCHA token',
        message: 'Security verification required'
      });
    }
    
    if (!contents || !Array.isArray(contents)) {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'Contents array required'
      });
    }
    
    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    
    if (!recaptchaResult.success) {
      console.log(`[Security] reCAPTCHA failed for IP ${ip}:`, recaptchaResult.error);
      return res.status(403).json({ 
        error: 'Security check failed',
        message: recaptchaResult.error === 'Bot detected' 
          ? 'Automated access detected. Please try again or contact support.'
          : 'Security verification failed. Please refresh and try again.',
        details: recaptchaResult.error
      });
    }
    
    console.log(`[Security] ✓ reCAPTCHA passed (score: ${recaptchaResult.score}) for IP: ${ip}`);
    
    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[Backend] GEMINI_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'API key not configured'
      });
    }
    
    // Log request type
    console.log(`[Backend] Processing ${action || 'unknown'} request`);
    
    // Add system prompt for medical billing expertise
    const enhancedContents = contents.map((content, index) => {
      if (index === 0 && content.parts && content.parts[0]?.text) {
        // Prepend medical billing expert system prompt
        const systemPrompt = `You are a Senior Medical Billing Auditor with expertise in CPT/HCPCS coding and CMS compliance. Your goal is to identify overcharges, billing errors, and potential fraud in medical bills.

IMPORTANT: Your output MUST be valid JSON only. Do not include markdown formatting, code blocks, or any text outside the JSON structure.

`;
        return {
          ...content,
          parts: [
            { text: systemPrompt + content.parts[0].text },
            ...content.parts.slice(1)
          ]
        };
      }
      return content;
    });
    
    // Call Gemini API with gemini-3-flash model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    // Build generationConfig with SIMPLIFIED response schema for speed (40s→15s)
    // Additional data will be provided in 'rawData' field as free-form text
    const finalGenerationConfig = {
      ...generationConfig,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          isValid: {
            type: "BOOLEAN",
            description: "Whether this is a valid medical bill"
          },
          documentType: {
            type: "STRING",
            enum: ["itemized_bill", "summary_bill", "eob", "statement", "unknown"],
            description: "Type of medical document"
          },
          facilityName: {
            type: "STRING",
            nullable: true,
            description: "Name of the medical facility or provider"
          },
          totalAmount: {
            type: "NUMBER",
            description: "Total amount patient is responsible for (in dollars)"
          },
          dateOfService: {
            type: "STRING",
            nullable: true,
            description: "Date of service in YYYY-MM-DD format"
          },
          issueCategory: {
            type: "STRING",
            enum: ["Emergency Room", "Lab & Imaging", "Surgery & Inpatient", "General Doctor Visit"],
            description: "Primary category of medical service"
          },
          lineItemsSummary: {
            type: "STRING",
            nullable: true,
            description: "Text summary of line items with CPT codes, descriptions, and amounts"
          },
          detectedIssuesSummary: {
            type: "STRING",
            nullable: true,
            description: "Text summary of detected billing issues (upcoding, duplicates, etc)"
          }
        },
        required: ["isValid", "documentType", "totalAmount", "issueCategory"]
      }
    };
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 85000); // 85 second timeout (allow time for complex bills)
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: enhancedContents,
          generationConfig: finalGenerationConfig
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Gemini API] Error:', response.status, errorText);
        
        if (response.status === 429) {
          return res.status(429).json({ 
            error: 'API temporarily busy',
            message: 'Our service is experiencing high demand. Please try again in a moment.'
          });
        }
        
        return res.status(response.status).json({ 
          error: 'API error',
          message: `Service returned status ${response.status}`
        });
      }
      
      const data = await response.json();
      
        console.log(`[Backend] ✓ Successfully processed ${action} request`);
      
      // Return successful response
      return res.status(200).json(data);
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Handle abort/timeout errors
      if (fetchError.name === 'AbortError') {
        console.error('[Gemini API] Request timeout after 55 seconds');
        return res.status(504).json({ 
          error: 'Request timeout',
          message: 'Analysis took too long. Please compress your image file (under 2MB recommended) and try again.'
        });
      }
      
      throw fetchError; // Re-throw other fetch errors
    }
    
  } catch (error) {
    console.error('[Backend] Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again.'
    });
  }
}

