// ========== CONTRADICTION DETECTION ENGINE ==========
// Phase 1 Improvement: Catch impossible answer combinations in real-time

// Define logical contradiction rules
const ContradictionRules = [
  {
    id: 'er_level_vs_care',
    patterns: [
      { keyword: 'Level 5', type: 'CPT_99285', expectedAnswer: 'intensive care' },
      { keyword: 'routine care', type: 'CARE_LEVEL', expectedAnswer: 'simple' }
    ],
    severity: 'CRITICAL',
    message: '⚠️ Conflicting responses detected',
    explanation: 'You indicated you received "routine care" but also that Level 5 ER billing was appropriate. Level 5 (CPT 99285) requires life-threatening emergencies with intensive interventions (multiple IVs, CT/MRI, critical vitals). Routine care should be billed as Level 2-3.',
    clarifyingQuestion: 'Let\'s clarify: Did you receive any of these intensive treatments? (Check all that apply)',
    clarifyingOptions: [
      'Multiple IV lines or medications',
      'CT scan, MRI, or advanced imaging',
      'Continuous cardiac monitoring',
      'Respiratory support (oxygen, ventilator)',
      'None of the above - care was routine'
    ]
  },
  {
    id: 'visit_length_vs_complexity',
    patterns: [
      { keyword: 'under 15 minutes', type: 'DURATION', expectedAnswer: 'short' },
      { keyword: 'complex', type: 'COMPLEXITY', expectedAnswer: 'high' }
    ],
    severity: 'HIGH',
    message: '⚠️ Duration doesn\'t match complexity',
    explanation: 'You said your visit lasted under 15 minutes, but also indicated complex procedures were performed. Complex evaluations (Level 4-5) typically require 30-60+ minutes. Brief visits are usually Level 2-3.',
    clarifyingQuestion: 'Which better describes your visit?',
    clarifyingOptions: [
      'Quick evaluation (5-15 min) - vitals check, basic questions',
      'Standard visit (20-30 min) - exam, some tests',
      'Extended visit (40+ min) - detailed exam, multiple procedures'
    ]
  },
  {
    id: 'cpt_visible_vs_summary',
    patterns: [
      { keyword: 'CPT codes visible', type: 'BILL_TYPE', expectedAnswer: 'itemized' },
      { keyword: 'only totals', type: 'BILL_TYPE', expectedAnswer: 'summary' }
    ],
    severity: 'CRITICAL',
    message: '⚠️ Bill type confusion',
    explanation: 'You gave conflicting answers about whether your bill shows detailed CPT codes or just summary totals. This is critical for determining audit accuracy.',
    clarifyingQuestion: 'Looking at your bill right now, what do you see?',
    clarifyingOptions: [
      'Detailed line items with 5-digit codes (e.g., "99285", "70450")',
      'General descriptions only (e.g., "Emergency Visit", "Lab Services")',
      'Just total amounts with no breakdown'
    ]
  },
  {
    id: 'new_patient_vs_history',
    patterns: [
      { keyword: 'new patient billing', type: 'PATIENT_STATUS', expectedAnswer: 'new' },
      { keyword: 'seen within 3 years', type: 'VISIT_HISTORY', expectedAnswer: 'established' }
    ],
    severity: 'MEDIUM',
    message: '⚠️ Patient status mismatch',
    explanation: 'You were billed as a "New Patient" but also indicated you\'ve been to this practice within 3 years. Under CMS rules, you\'re an Established Patient if you\'ve seen ANY provider in the practice within 36 months.',
    clarifyingQuestion: 'Have you visited ANY provider at this practice (including different doctors) within the past 3 years?',
    clarifyingOptions: [
      'Yes - I\'ve been there before (Established Patient)',
      'No - This was my first visit ever (New Patient)',
      'Not sure - possible but can\'t remember'
    ]
  }
];

// Real-time contradiction checker (runs after each answer)
function detectContradictions(allResponses) {
  const foundContradictions = [];
  
  ContradictionRules.forEach(rule => {
    // Check if user responses match contradictory patterns
    const patternMatches = rule.patterns.map(pattern => {
      return allResponses.find(response => {
        const text = `${response.question} ${response.flagText || ''} ${response.answer}`.toLowerCase();
        return text.includes(pattern.keyword.toLowerCase());
      });
    });
    
    // If ALL patterns found → contradiction exists
    if (patternMatches.every(match => match !== undefined)) {
      foundContradictions.push({
        ...rule,
        conflictingResponses: patternMatches.filter(m => m),
        detectedAt: new Date().toISOString()
      });
    }
  });
  
  return foundContradictions;
}

// Trigger contradiction check after each answer
function processAnswerWithValidation(answer, risk, flagText, confidence) {
  // Store answer first
  quizResponses.push({
    id: currentQuestion.id,
    question: currentQuestion.question,
    answer: answer,
    riskLevel: risk,
    flagText: flagText,
    confidence: confidence
  });
  
  // Check for contradictions
  const contradictions = detectContradictions(quizResponses);
  
  if (contradictions.length > 0 && contradictions[0].severity === 'CRITICAL') {
    // BLOCK progress and show clarification modal
    showContradictionModal(contradictions[0]);
  } else if (contradictions.length > 0) {
    // Non-critical: Show warning but allow continuation
    showContradictionWarning(contradictions[0]);
    proceedToNextQuestion();
  } else {
    // No contradictions - proceed normally
    proceedToNextQuestion();
  }
}

// Modal for critical contradictions (blocking)
function showContradictionModal(contradiction) {
  const modal = document.createElement('div');
  modal.id = 'contradiction-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(8px);
  `;
  
  modal.innerHTML = `
    <div style="background: white; border-radius: 16px; max-width: 540px; width: 90%; padding: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 64px; height: 64px; background: #FF3B30; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
          ⚠️
        </div>
        <h3 style="font-size: 22px; font-weight: 700; color: #1D1D1F; margin: 0 0 8px 0;">
          ${contradiction.message}
        </h3>
        <p style="font-size: 15px; color: #86868B; line-height: 1.6; margin: 0;">
          ${contradiction.explanation}
        </p>
      </div>
      
      <div style="background: #F5F5F7; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <strong style="display: block; margin-bottom: 12px; color: #1D1D1F;">Previous answers:</strong>
        ${contradiction.conflictingResponses.map((resp, idx) => `
          <div style="padding: 8px 12px; background: white; border-radius: 8px; margin-bottom: 8px; font-size: 14px;">
            <strong>Q${idx + 1}:</strong> ${resp.question}<br/>
            <span style="color: #0071E3;">→ ${resp.answer}</span>
          </div>
        `).join('')}
      </div>
      
      <div style="margin-bottom: 24px;">
        <label style="display: block; font-weight: 600; margin-bottom: 12px; color: #1D1D1F;">
          ${contradiction.clarifyingQuestion}
        </label>
        ${contradiction.clarifyingOptions.map((option, idx) => `
          <button 
            class="clarify-option" 
            data-index="${idx}"
            style="display: block; width: 100%; text-align: left; padding: 12px 16px; background: white; border: 2px solid #E5E5E7; border-radius: 8px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s ease; font-size: 15px; color: #1D1D1F;"
            onmouseover="this.style.borderColor='#0071E3'; this.style.background='#F5F5F7';"
            onmouseout="this.style.borderColor='#E5E5E7'; this.style.background='white';"
          >
            ${option}
          </button>
        `).join('')}
      </div>
      
      <button 
        id="skip-clarification"
        style="width: 100%; padding: 14px; background: #E5E5E7; color: #86868B; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer;"
      >
        Skip - I'm not sure
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Handle clarification option selection
  const clarifyButtons = modal.querySelectorAll('.clarify-option');
  clarifyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedOption = contradiction.clarifyingOptions[btn.dataset.index];
      
      // Store clarification
      quizResponses.push({
        id: `${contradiction.id}_clarification`,
        question: contradiction.clarifyingQuestion,
        answer: selectedOption,
        isClarification: true
      });
      
      console.log(`[Contradiction Resolved] ${contradiction.id}: User clarified with "${selectedOption}"`);
      
      // Remove modal and continue
      modal.remove();
      proceedToNextQuestion();
    });
  });
  
  // Skip button
  document.getElementById('skip-clarification').addEventListener('click', () => {
    console.log(`[Contradiction Skipped] ${contradiction.id}: User uncertain`);
    modal.remove();
    proceedToNextQuestion();
  });
}

// Non-blocking warning for medium-severity contradictions
function showContradictionWarning(contradiction) {
  const warningBanner = document.createElement('div');
  warningBanner.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #FFF9F0;
    border: 2px solid #FF9500;
    border-radius: 12px;
    padding: 16px 20px;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    animation: slideInRight 0.3s ease;
  `;
  
  warningBanner.innerHTML = `
    <div style="display: flex; align-items: start; gap: 12px;">
      <div style="font-size: 24px; flex-shrink: 0;">⚠️</div>
      <div style="flex: 1;">
        <strong style="display: block; margin-bottom: 4px; color: #1D1D1F; font-size: 15px;">
          ${contradiction.message}
        </strong>
        <p style="margin: 0; font-size: 13px; color: #86868B; line-height: 1.5;">
          ${contradiction.explanation}
        </p>
      </div>
      <button 
        onclick="this.parentElement.parentElement.remove()"
        style="background: none; border: none; font-size: 20px; cursor: pointer; padding: 0; color: #86868B;"
      >
        ×
      </button>
    </div>
  `;
  
  document.body.appendChild(warningBanner);
  
  // Auto-remove after 8 seconds
  setTimeout(() => {
    warningBanner.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => warningBanner.remove(), 300);
  }, 8000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export for integration
window.ContradictionDetection = {
  detectContradictions,
  showContradictionModal,
  showContradictionWarning,
  ContradictionRules
};
