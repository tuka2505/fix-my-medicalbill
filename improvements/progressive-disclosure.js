// ========== PROGRESSIVE DISCLOSURE QUIZ SYSTEM ==========
// Phase 1 Improvement: Adaptive question flow - only ask what's needed

// Three-tier questioning strategy
const QuizFlowTiers = {
  tier1: {
    name: 'Quick Screening',
    duration: '30 seconds',
    questionCount: 3,
    purpose: 'Detect obvious red flags',
    requiredQuestions: [
      'itemized_bill_check',  // Gatekeeper
      'obvious_errors',       // Quick scan
      'out_of_network'        // Common issue
    ]
  },
  tier2: {
    name: 'Targeted Investigation',
    duration: '1-2 minutes',
    questionCount: 4,
    purpose: 'Drill into detected issues',
    trigger: 'IF tier1 detected ≥1 HIGH or BLOCKER risk',
    adaptiveGeneration: true
  },
  tier3: {
    name: 'Expert Validation',
    duration: '2-3 minutes',
    questionCount: 3,
    purpose: 'Verify complex billing patterns',
    trigger: 'IF tier2 detected ≥2 HIGH risks with high confidence',
    requiresAI: true
  }
};

// Tier 1: Fast screening questions (always show)
const Tier1Questions = [
  {
    id: 'tier1_itemized',
    tier: 1,
    question: 'Does your bill show detailed 5-digit CPT codes (like 99285, 70450)?',
    context: 'We need CPT codes to audit clinical accuracy. Summary bills hide errors.',
    exitCondition: 'BLOCKER', // If "No" → exit immediately to itemized bill tool
    options: [
      { label: 'Yes - I see detailed CPT codes', value: 'safe', riskLevel: 'NONE' },
      { label: 'No - Only general descriptions/totals', value: 'flag', riskLevel: 'BLOCKER', 
        flagText: 'AUDIT BLOCKED: Summary bill prevents CPT verification.' },
      { label: 'Not sure what CPT codes look like', value: 'unsure', riskLevel: 'LOW' }
    ]
  },
  {
    id: 'tier1_obvious_duplicate',
    tier: 1,
    question: 'Do you see any OBVIOUS duplicate charges (same service billed 2+ times on same date)?',
    context: 'Duplicate billing is the #1 most common error (found in 30-80% of bills).',
    quickScan: true,
    options: [
      { label: 'Yes - Clear duplicate', value: 'flag', riskLevel: 'HIGH',
        flagText: 'Duplicate charge confirmed by patient visual inspection.' },
      { label: 'No obvious duplicates', value: 'safe', riskLevel: 'NONE' },
      { label: 'Not sure - need help checking', value: 'unsure', riskLevel: 'LOW' }
    ]
  },
  {
    id: 'tier1_out_of_network',
    tier: 1,
    question: 'Were you treated by any out-of-network providers during your visit?',
    context: 'Out-of-network surprise bills violate the No Surprises Act (2022).',
    options: [
      { label: 'Yes - Out-of-network charges', value: 'flag', riskLevel: 'HIGH',
        flagText: 'Potential No Surprises Act violation detected.' },
      { label: 'No - All in-network', value: 'safe', riskLevel: 'NONE' },
      { label: 'Not sure / Mixed network', value: 'unsure', riskLevel: 'MEDIUM' }
    ]
  }
];

// Adaptive quiz flow controller
class AdaptiveQuizFlow {
  constructor(billData) {
    this.billData = billData;
    this.currentTier = 1;
    this.responses = [];
    this.riskScore = 0;
    this.highRiskCount = 0;
    this.skipToEnd = false;
  }

  // Start with Tier 1 screening
  async startQuiz() {
    console.log('[Adaptive Quiz] Starting Tier 1: Quick Screening (3 questions)');
    
    // Show tier progress
    this.showTierProgress(1);
    
    // Load Tier 1 questions
    return Tier1Questions;
  }

  // Process Tier 1 results and decide next step
  async evaluateTier1() {
    const tier1Responses = this.responses.filter(r => r.tier === 1);
    
    // Check for BLOCKER (summary bill)
    const blockerDetected = tier1Responses.some(r => r.riskLevel === 'BLOCKER');
    if (blockerDetected) {
      console.log('[Adaptive Quiz] 🚫 BLOCKER detected - Exiting to itemized bill tool');
      this.skipToEnd = true;
      return { 
        action: 'EXIT_TO_ITEMIZED', 
        reason: 'Summary bill prevents clinical audit'
      };
    }
    
    // Count HIGH risks
    this.highRiskCount = tier1Responses.filter(r => r.riskLevel === 'HIGH').length;
    this.riskScore = tier1Responses.reduce((sum, r) => {
      const weights = { HIGH: 10, MEDIUM: 5, LOW: 2, NONE: 0 };
      return sum + (weights[r.riskLevel] || 0);
    }, 0);
    
    console.log(`[Adaptive Quiz] Tier 1 Complete: ${this.highRiskCount} HIGH risks, Score: ${this.riskScore}`);
    
    // Decision tree
    if (this.highRiskCount === 0 && this.riskScore < 5) {
      console.log('[Adaptive Quiz] ✓ Clean bill - Skip Tier 2/3');
      return { action: 'SHOW_RESULTS', tier: 1, classification: 'LOW_RISK' };
    } else if (this.highRiskCount >= 1 || this.riskScore >= 5) {
      console.log('[Adaptive Quiz] ⚠️ Issues detected - Load Tier 2 investigation');
      return { action: 'LOAD_TIER_2' };
    } else {
      return { action: 'SHOW_RESULTS', tier: 1, classification: 'MEDIUM_RISK' };
    }
  }

  // Generate Tier 2 questions based on Tier 1 findings
  async generateTier2Questions() {
    console.log('[Adaptive Quiz] Generating Tier 2: Targeted Investigation');
    
    this.showTierProgress(2);
    
    // Extract detected issues from Tier 1
    const detectedIssues = this.responses
      .filter(r => r.tier === 1 && r.answer === 'flag')
      .map(r => r.flagText);
    
    // Generate targeted follow-up questions using AI
    const prompt = `
You detected these issues in Tier 1 screening:
${detectedIssues.join('\n')}

Bill context:
- Category: ${this.billData.category}
- Amount: $${this.billData.amount}
- CPT codes: ${this.billData.cptCodes?.join(', ') || 'Unknown'}

Generate EXACTLY 4 follow-up questions to:
1. Quantify the severity of detected issues
2. Gather evidence for dispute letter
3. Check for related violations

Return JSON array with same schema as Tier 1.
`;

    // Call API
    const tier2Questions = await callSecureGeminiAPI(
      [{ parts: [{ text: prompt }] }],
      { responseMimeType: "application/json" },
      'tier2_generation'
    );
    
    return JSON.parse(tier2Questions.candidates[0].content.parts[0].text);
  }

  // Evaluate Tier 2 and decide if Tier 3 needed
  async evaluateTier2() {
    const tier2Responses = this.responses.filter(r => r.tier === 2);
    const highConfidenceHighRisks = tier2Responses.filter(r => 
      r.riskLevel === 'HIGH' && r.confidence >= 0.7
    );
    
    console.log(`[Adaptive Quiz] Tier 2 Complete: ${highConfidenceHighRisks.length} high-confidence HIGH risks`);
    
    if (highConfidenceHighRisks.length >= 2) {
      console.log('[Adaptive Quiz] 🔍 Complex case - Load Tier 3 expert validation');
      return { action: 'LOAD_TIER_3' };
    } else {
      return { action: 'SHOW_RESULTS', tier: 2 };
    }
  }

  // Generate Tier 3 expert validation questions
  async generateTier3Questions() {
    console.log('[Adaptive Quiz] Generating Tier 3: Expert Validation');
    
    this.showTierProgress(3);
    
    // Aggregate all previous responses
    const allFindings = this.responses
      .filter(r => r.answer === 'flag')
      .map(r => ({ question: r.question, flag: r.flagText, confidence: r.confidence }));
    
    const prompt = `
EXPERT-LEVEL AUDIT VALIDATION

You're a Senior Medical Billing Auditor reviewing a HIGH-RISK case.

Previous findings (${allFindings.length} total):
${JSON.stringify(allFindings, null, 2)}

Generate 3 EXPERT validation questions to:
1. Rule out false positives (ask for specific evidence)
2. Detect advanced fraud patterns (unbundling, creative upcoding)
3. Quantify financial impact for dispute letter

These should be technical questions requiring bill review.
`;

    const tier3Questions = await callSecureGeminiAPI(
      [{ parts: [{ text: prompt }] }],
      { responseMimeType: "application/json" },
      'tier3_expert_validation'
    );
    
    return JSON.parse(tier3Questions.candidates[0].content.parts[0].text);
  }

  // Visual tier progress indicator
  showTierProgress(tier) {
    const tierNames = ['Quick Screening', 'Investigation', 'Expert Review'];
    const tierIcons = ['🔍', '⚡', '🎓'];
    
    const progressHtml = `
      <div style="margin-bottom: 24px; padding: 16px; background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); border-radius: 12px; color: white;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="font-size: 32px;">${tierIcons[tier - 1]}</div>
          <div>
            <div style="font-size: 18px; font-weight: 700;">Tier ${tier}: ${tierNames[tier - 1]}</div>
            <div style="font-size: 13px; opacity: 0.9;">${QuizFlowTiers[`tier${tier}`].purpose}</div>
          </div>
        </div>
        
        <!-- Tier progress bar -->
        <div style="display: flex; gap: 8px; margin-top: 12px;">
          ${[1, 2, 3].map(t => `
            <div style="flex: 1; height: 4px; background: ${t <= tier ? 'white' : 'rgba(255,255,255,0.3)'}; border-radius: 2px;"></div>
          `).join('')}
        </div>
      </div>
    `;
    
    const container = document.getElementById('tier-progress-container');
    if (container) {
      container.innerHTML = progressHtml;
    }
  }

  // Save response with tier metadata
  addResponse(response) {
    this.responses.push({
      ...response,
      tier: this.currentTier,
      timestamp: Date.now()
    });
  }

  // Get final classification
  getFinalClassification() {
    const totalHighRisks = this.responses.filter(r => r.riskLevel === 'HIGH').length;
    const avgConfidence = this.responses.reduce((sum, r) => sum + (r.confidence || 0.5), 0) / this.responses.length;
    
    return {
      tier: this.currentTier,
      totalQuestions: this.responses.length,
      highRiskCount: totalHighRisks,
      avgConfidence: avgConfidence,
      riskScore: this.riskScore,
      classification: totalHighRisks >= 3 ? 'HIGH_RISK' : totalHighRisks >= 1 ? 'MEDIUM_RISK' : 'LOW_RISK'
    };
  }
}

// Usage example
async function initializeAdaptiveQuiz(billData) {
  const quiz = new AdaptiveQuizFlow(billData);
  
  // Tier 1: Quick screening
  const tier1Questions = await quiz.startQuiz();
  await showQuestions(tier1Questions, quiz);
  
  const tier1Result = await quiz.evaluateTier1();
  
  if (tier1Result.action === 'EXIT_TO_ITEMIZED') {
    navigate('/request-itemized-medical-bill');
    return;
  }
  
  if (tier1Result.action === 'SHOW_RESULTS') {
    showResults(quiz.getFinalClassification());
    return;
  }
  
  // Tier 2: Investigation (only if issues detected)
  if (tier1Result.action === 'LOAD_TIER_2') {
    quiz.currentTier = 2;
    const tier2Questions = await quiz.generateTier2Questions();
    await showQuestions(tier2Questions, quiz);
    
    const tier2Result = await quiz.evaluateTier2();
    
    if (tier2Result.action === 'SHOW_RESULTS') {
      showResults(quiz.getFinalClassification());
      return;
    }
    
    // Tier 3: Expert review (only for complex cases)
    if (tier2Result.action === 'LOAD_TIER_3') {
      quiz.currentTier = 3;
      const tier3Questions = await quiz.generateTier3Questions();
      await showQuestions(tier3Questions, quiz);
      
      showResults(quiz.getFinalClassification());
    }
  }
}

// Export
window.AdaptiveQuizFlow = AdaptiveQuizFlow;
window.initializeAdaptiveQuiz = initializeAdaptiveQuiz;
