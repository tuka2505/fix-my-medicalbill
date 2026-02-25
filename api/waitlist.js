// Vercel Serverless Function — Waitlist Email Storage
// Stores email + context in Redis (Upstash), increments per-scenario counters

import { Redis } from '@upstash/redis';

export const config = {
  maxDuration: 10
};

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN
});

const ALLOWED_ORIGINS = [
  'https://fixmymedicalbill.com',
  'https://www.fixmymedicalbill.com',
  'https://fix-my-medicalbill.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173'
];

const VALID_SCENARIOS = ['blocker', 'high_risk', 'medium_risk', 'low_risk'];

export default async function handler(req, res) {
  // CORS
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, scenario, billAmount, flagCount, estimatedRecovery } = req.body;

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate scenario
    if (!scenario || !VALID_SCENARIOS.includes(scenario)) {
      return res.status(400).json({ error: 'Invalid scenario' });
    }

    const emailKey = `waitlist:${scenario}:${email.toLowerCase().trim()}`;
    const counterKey = `waitlist:count:${scenario}`;
    const totalKey = `waitlist:count:total`;

    // Check if already registered (dedup)
    const existing = await redis.get(emailKey);
    if (existing) {
      // Already registered — return current count anyway
      const [scenarioCount, totalCount] = await Promise.all([
        redis.get(counterKey),
        redis.get(totalKey)
      ]);
      return res.status(200).json({
        success: true,
        alreadyRegistered: true,
        scenarioCount: parseInt(scenarioCount || '0'),
        totalCount: parseInt(totalCount || '0')
      });
    }

    // Store entry + increment counters in parallel
    const timestamp = new Date().toISOString();
    const entry = {
      email: email.toLowerCase().trim(),
      scenario,
      billAmount: parseFloat(billAmount) || 0,
      flagCount: parseInt(flagCount) || 0,
      estimatedRecovery: parseFloat(estimatedRecovery) || 0,
      timestamp,
      ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown'
    };

    await Promise.all([
      redis.set(emailKey, entry, { ex: 60 * 60 * 24 * 365 }), // 1 year
      redis.incr(counterKey),
      redis.incr(totalKey)
    ]);

    const [scenarioCount, totalCount] = await Promise.all([
      redis.get(counterKey),
      redis.get(totalKey)
    ]);

    console.log(`[Waitlist] ✓ New signup: ${email} (${scenario}) | Total: ${totalCount}`);

    return res.status(200).json({
      success: true,
      alreadyRegistered: false,
      scenarioCount: parseInt(scenarioCount || '1'),
      totalCount: parseInt(totalCount || '1')
    });

  } catch (error) {
    console.error('[Waitlist] Error:', error);
    return res.status(500).json({ error: 'Failed to save. Please try again.' });
  }
}
