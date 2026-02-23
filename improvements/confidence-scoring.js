// ========== CONFIDENCE-WEIGHTED RISK SCORING SYSTEM ==========
// Phase 1 Improvement: Replace binary flag/safe with confidence levels

// NEW: Enhanced answer structure with confidence
function renderQuestionWithConfidence(index) {
  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  
  quizProgress.style.width = `${progress}%`;
  quizProgressText.textContent = `Question ${index + 1} of ${questions.length}`;

  quizContainer.innerHTML = `
    <div class="quiz-question">
      <h3 class="question-title">${q.question}</h3>
      <p class="question-context">${q.context}</p>
      
      <!-- Option Selection -->
      <div class="quiz-options">
        ${q.options.map(option => `
          <button class="quiz-option-btn" 
            data-value="${option.value}" 
            data-risk="${option.riskLevel}"
            data-flag="${option.flagText || ''}">
            <span class="option-label">${option.label}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        `).join('')}
      </div>
      
      <!-- NEW: Confidence Slider (shows ONLY for flag/safe answers, NOT unsure) -->
      <div id="confidence-container" style="display: none; margin-top: 24px; padding: 20px; background: #F5F5F7; border-radius: 12px;">
        <label style="display: block; font-weight: 600; color: #1D1D1F; margin-bottom: 12px; font-size: 15px;">
          How confident are you in this answer?
        </label>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-size: 13px; color: #86868B; white-space: nowrap;">Not Sure</span>
          <input 
            type="range" 
            id="confidence-slider" 
            min="0" 
            max="100" 
            value="70" 
            style="flex: 1; height: 8px; border-radius: 4px; background: linear-gradient(to right, #FF9500 0%, #34C759 100%); appearance: none; cursor: pointer;"
          />
          <span style="font-size: 13px; color: #86868B; white-space: nowrap;">Very Sure</span>
        </div>
        <div style="text-align: center; margin-top: 12px;">
          <span id="confidence-value" style="font-size: 20px; font-weight: 700; color: #0071E3;">70%</span>
          <span style="font-size: 13px; color: #86868B; margin-left: 8px;">confident</span>
        </div>
        <button id="confirm-answer-btn" class="btn" style="margin-top: 16px; width: 100%; background: #0071E3; color: white;">
          Continue →
        </button>
      </div>
    </div>
  `;

  // Attach option selection handlers
  const optionButtons = quizContainer.querySelectorAll('.quiz-option-btn');
  const confidenceContainer = document.getElementById('confidence-container');
  const confidenceSlider = document.getElementById('confidence-slider');
  const confidenceValue = document.getElementById('confidence-value');
  const confirmBtn = document.getElementById('confirm-answer-btn');
  
  let selectedAnswer = null;
  let selectedRisk = null;
  let selectedFlag = null;

  // Update confidence display
  if (confidenceSlider) {
    confidenceSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      confidenceValue.textContent = `${value}%`;
      
      // Dynamic color based on confidence
      if (value < 40) {
        confidenceValue.style.color = '#FF3B30'; // Red for low confidence
      } else if (value < 70) {
        confidenceValue.style.color = '#FF9500'; // Orange for medium
      } else {
        confidenceValue.style.color = '#34C759'; // Green for high
      }
    });
  }

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedAnswer = btn.dataset.value;
      selectedRisk = btn.dataset.risk;
      selectedFlag = btn.dataset.flag;
      
      // Mark selected
      optionButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      
      // Show confidence slider for definitive answers (not "unsure")
      if (selectedAnswer === 'flag' || selectedAnswer === 'safe') {
        confidenceContainer.style.display = 'block';
        confidenceSlider.focus();
      } else {
        // "Not Sure" option → skip directly with 0% confidence
        processAnswer(0);
      }
    });
  });

  // Confirm button handler
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const confidence = parseInt(confidenceSlider.value);
      processAnswer(confidence);
    });
  }

  function processAnswer(confidencePercent) {
    const confidence = confidencePercent / 100; // Convert to 0-1 scale
    
    // ========== CONFIDENCE-WEIGHTED RISK CALCULATION ==========
    
    // Calculate evidence strength (risk level × confidence)
    const riskWeights = { 'BLOCKER': 100, 'HIGH': 10, 'MEDIUM': 5, 'LOW': 2, 'NONE': 0 };
    const baseWeight = riskWeights[selectedRisk] || 0;
    const evidenceStrength = baseWeight * confidence;
    
    // Update highest risk (confidence-adjusted)
    const riskHierarchy = { 'BLOCKER': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'NONE': 0 };
    const adjustedRiskValue = riskHierarchy[selectedRisk] * confidence;
    const currentHighestValue = riskHierarchy[highestRisk] || 0;
    
    if (adjustedRiskValue > currentHighestValue) {
      highestRisk = selectedRisk;
    }
    
    // Track blocker detection
    if (selectedRisk === 'BLOCKER' && confidence > 0.5) {
      blockerDetected = true;
    }
    
    // Collect confirmed red flags with confidence metadata
    if (selectedAnswer === 'flag' && selectedFlag) {
      confirmedRedFlags.push({
        riskLevel: selectedRisk,
        description: selectedFlag,
        question: q.question,
        confidence: confidence, // NEW: Track user confidence
        evidenceStrength: evidenceStrength, // NEW: Weighted score
        needsVerification: confidence < 0.6 // NEW: Flag low-confidence answers
      });
    }
    
    // Store enhanced response
    quizResponses.push({
      id: q.id,
      question: q.question,
      answer: selectedAnswer,
      riskLevel: selectedRisk,
      flagText: selectedFlag,
      confidence: confidence, // NEW
      evidenceStrength: evidenceStrength // NEW
    });
    
    console.log(`[Enhanced Risk Quiz] ${q.id}: ${selectedAnswer} (Risk: ${selectedRisk}, Confidence: ${(confidence*100).toFixed(0)}%, Strength: ${evidenceStrength.toFixed(1)})`);
    
    // Move to next question
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        currentQuestion++;
        renderQuestion(currentQuestion);
      }, 300);
    } else {
      quizProgressText.textContent = 'Analyzing confidence-weighted risk...';
      setTimeout(() => {
        console.log(`[Confidence-Weighted Audit] Total Evidence Strength: ${confirmedRedFlags.reduce((sum, f) => sum + f.evidenceStrength, 0).toFixed(1)}`);
        showResults();
      }, 600);
    }
  }

  // Fade in animation
  quizContainer.style.opacity = '0';
  setTimeout(() => {
    quizContainer.style.opacity = '1';
  }, 50);
}

// ========== ENHANCED RESULTS DISPLAY WITH CONFIDENCE METRICS ==========

function showResultsWithConfidence() {
  // Calculate confidence-weighted metrics
  const totalEvidenceStrength = confirmedRedFlags.reduce((sum, flag) => sum + flag.evidenceStrength, 0);
  const avgConfidence = confirmedRedFlags.length > 0
    ? confirmedRedFlags.reduce((sum, flag) => sum + flag.confidence, 0) / confirmedRedFlags.length
    : 0;
  
  const highConfidenceFlags = confirmedRedFlags.filter(f => f.confidence >= 0.7);
  const lowConfidenceFlags = confirmedRedFlags.filter(f => f.confidence < 0.6);
  
  // Risk assessment based on evidence strength (not just flag count)
  let overallRisk = 'LOW';
  if (totalEvidenceStrength > 15 && highConfidenceFlags.length > 0) {
    overallRisk = 'HIGH';
  } else if (totalEvidenceStrength > 8 || highConfidenceFlags.length >= 2) {
    overallRisk = 'MEDIUM';
  }
  
  console.log(`[Confidence Audit] Total Strength: ${totalEvidenceStrength.toFixed(1)}, Avg Confidence: ${(avgConfidence*100).toFixed(0)}%, High-Confidence Flags: ${highConfidenceFlags.length}`);
  
  // Display results with confidence breakdown
  if (quizVerdict) {
    let verdictHtml = `
      <div style="padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 600; color: #1D1D1F; margin-bottom: 16px;">
          ${overallRisk} Risk Billing Assessment
        </h3>
        <p style="font-size: 17px; line-height: 1.6; color: #1D1D1F; margin-bottom: 20px;">
          We analyzed your responses with confidence weighting to provide a more accurate assessment.
        </p>
        
        <!-- Confidence Metrics -->
        <div style="background: #F5F5F7; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
            <div>
              <div style="font-size: 28px; font-weight: 700; color: #0071E3;">${highConfidenceFlags.length}</div>
              <div style="font-size: 13px; color: #86868B; margin-top: 4px;">High Confidence<br/>Violations</div>
            </div>
            <div>
              <div style="font-size: 28px; font-weight: 700; color: #FF9500;">${lowConfidenceFlags.length}</div>
              <div style="font-size: 13px; color: #86868B; margin-top: 4px;">Needs<br/>Verification</div>
            </div>
            <div>
              <div style="font-size: 28px; font-weight: 700; color: #34C759;">${(avgConfidence*100).toFixed(0)}%</div>
              <div style="font-size: 13px; color: #86868B; margin-top: 4px;">Average<br/>Confidence</div>
            </div>
          </div>
        </div>
        
        <!-- High Confidence Violations -->
        ${highConfidenceFlags.length > 0 ? `
          <div style="background: #FFF3F0; border-left: 4px solid #FF3B30; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <strong style="display: block; margin-bottom: 12px; color: #FF3B30;">✓ Strong Evidence (High Confidence):</strong>
            <ul style="margin: 0; padding-left: 20px; color: #1D1D1F;">
              ${highConfidenceFlags.map(flag => `
                <li style="margin: 12px 0;">
                  <strong>[${flag.riskLevel}]</strong> ${flag.description}
                  <span style="color: #34C759; font-size: 13px; margin-left: 8px;">(${(flag.confidence*100).toFixed(0)}% confident)</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        <!-- Low Confidence Flags -->
        ${lowConfidenceFlags.length > 0 ? `
          <div style="background: #FFF9F0; border-left: 4px solid #FF9500; border-radius: 8px; padding: 20px;">
            <strong style="display: block; margin-bottom: 12px; color: #FF9500;">⚠️ Requires Verification (Lower Confidence):</strong>
            <ul style="margin: 0; padding-left: 20px; color: #1D1D1F;">
              ${lowConfidenceFlags.map(flag => `
                <li style="margin: 12px 0;">
                  ${flag.description}
                  <span style="color: #FF9500; font-size: 13px; margin-left: 8px;">(${(flag.confidence*100).toFixed(0)}% confident - recommend getting itemized bill)</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
    
    quizVerdict.innerHTML = verdictHtml;
  }
}
