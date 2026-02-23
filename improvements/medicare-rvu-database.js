// ========== MEDICARE RVU DATABASE (2024-2026 Data) ==========
// Real CMS pricing data for intelligent billing validation
// Source: CMS Physician Fee Schedule 2024

const MedicareRVUDatabase = {
  // Emergency Room Visit Codes
  "99281": {
    description: "ER Visit - Level 1 (Minor)",
    category: "Emergency Room",
    workRVU: 0.45,
    facilityPrice: 65.00,
    nonFacilityPrice: 92.00,
    globalPeriod: "000",
    typicalDuration: "5-10 minutes",
    medicalNecessity: [
      "Minor cuts requiring cleaning/bandaging",
      "Mild sprains",
      "Simple prescription refills"
    ],
    commonDenials: "Usually not medically necessary for ER setting"
  },
  "99282": {
    description: "ER Visit - Level 2 (Low Complexity)",
    category: "Emergency Room",
    workRVU: 0.93,
    facilityPrice: 102.00,
    nonFacilityPrice: 153.00,
    globalPeriod: "000",
    typicalDuration: "10-20 minutes",
    medicalNecessity: [
      "Moderate pain (headache, stomach ache)",
      "Minor burns",
      "Simple fractures (finger, toe)"
    ],
    comparableOutpatient: "99213" // Could be billed at urgent care instead
  },
  "99283": {
    description: "ER Visit - Level 3 (Moderate Complexity)",
    category: "Emergency Room",
    workRVU: 1.42,
    facilityPrice: 153.00,
    nonFacilityPrice: 224.00,
    globalPeriod: "000",
    typicalDuration: "15-30 minutes",
    medicalNecessity: [
      "Moderate injuries requiring sutures",
      "Asthma attacks (mild-moderate)",
      "Dehydration requiring IV fluids"
    ],
    typicalTests: ["Basic labs", "X-rays"],
    upcodingRisk: "MEDIUM - Often confused with Level 4"
  },
  "99284": {
    description: "ER Visit - Level 4 (High Complexity)",
    category: "Emergency Room",
    workRVU: 2.74,
    facilityPrice: 281.00,
    nonFacilityPrice: 388.00,
    globalPeriod: "000",
    typicalDuration: "30-60 minutes",
    medicalNecessity: [
      "Severe pain (kidney stones, broken bones)",
      "Chest pain (non-life-threatening)",
      "Severe asthma requiring multiple treatments"
    ],
    requiredDocumentation: [
      "Comprehensive history and exam",
      "Multiple diagnostic tests",
      "Medical decision-making of high complexity"
    ],
    typicalTests: ["CT scan", "Multiple labs", "EKG"],
    upcodingRisk: "HIGH - Most overused ER code"
  },
  "99285": {
    description: "ER Visit - Level 5 (Critical/Life-Threatening)",
    category: "Emergency Room",
    workRVU: 4.53,
    facilityPrice: 402.00,
    nonFacilityPrice: 515.00,
    globalPeriod: "000",
    typicalDuration: "60+ minutes",
    medicalNecessity: [
      "Heart attack (acute MI)",
      "Stroke",
      "Severe trauma (car accident, gunshot)",
      "Respiratory failure requiring intubation",
      "Severe sepsis/shock"
    ],
    requiredCriteria: [
      "Immediate threat to life or bodily function",
      "Continuous monitoring required",
      "Multiple critical interventions"
    ],
    typicalTests: ["CT/MRI", "Cardiac catheterization", "Arterial blood gases"],
    upcodingRisk: "CRITICAL - Requires ICU-level care to justify",
    auditRedFlags: [
      "Patient discharged same day (usually requires admission)",
      "No critical care time documented",
      "Stable vital signs throughout visit"
    ]
  },

  // Office Visits - New Patient
  "99202": {
    description: "Office Visit - New Patient, Level 2",
    category: "General Doctor Visit",
    workRVU: 0.93,
    facilityPrice: 51.00,
    nonFacilityPrice: 76.00,
    typicalDuration: "15-25 minutes",
    medicalNecessity: ["Straightforward medical decision-making"],
    ncciBundling: ["Cannot bill E/M with minor procedures same day without modifier"]
  },
  "99203": {
    description: "Office Visit - New Patient, Level 3",
    category: "General Doctor Visit",
    workRVU: 1.42,
    facilityPrice: 72.00,
    nonFacilityPrice: 110.00,
    typicalDuration: "30-44 minutes",
    medicalNecessity: ["Low complexity medical decision-making"],
    auditTip: "Most common new patient code"
  },
  "99204": {
    description: "Office Visit - New Patient, Level 4",
    category: "General Doctor Visit",
    workRVU: 2.43,
    facilityPrice: 105.00,
    nonFacilityPrice: 167.00,
    typicalDuration: "45-59 minutes",
    medicalNecessity: ["Moderate complexity medical decision-making"],
    upcodingRisk: "MEDIUM - Requires detailed documentation"
  },
  "99205": {
    description: "Office Visit - New Patient, Level 5",
    category: "General Doctor Visit",
    workRVU: 3.17,
    facilityPrice: 136.00,
    nonFacilityPrice: 211.00,
    typicalDuration: "60-74 minutes",
    medicalNecessity: ["High complexity medical decision-making"],
    upcodingRisk: "HIGH - Rarely justified for primary care",
    auditRedFlags: [
      "Visit duration under 50 minutes",
      "Minimal testing/diagnosis",
      "Routine follow-up miscoded as new patient"
    ]
  },

  // Office Visits - Established Patient
  "99211": {
    description: "Office Visit - Established Patient, Minimal",
    category: "General Doctor Visit",
    workRVU: 0.18,
    facilityPrice: 13.00,
    nonFacilityPrice: 25.00,
    typicalDuration: "5-10 minutes",
    medicalNecessity: ["May not require physician presence (nurse visit)"],
    commonUse: "Blood pressure check, wound check, prescription pickup"
  },
  "99213": {
    description: "Office Visit - Established Patient, Level 3",
    category: "General Doctor Visit",
    workRVU: 0.97,
    facilityPrice: 56.00,
    nonFacilityPrice: 93.00,
    typicalDuration: "20-29 minutes",
    medicalNecessity: ["Low complexity medical decision-making"],
    auditTip: "Most common office visit code (50%+ of all E/M)"
  },

  // Lab Tests
  "80053": {
    description: "Comprehensive Metabolic Panel (CMP)",
    category: "Lab & Imaging",
    workRVU: 0.00, // Technical component only
    facilityPrice: 15.00,
    nonFacilityPrice: 15.00,
    components: [
      "Glucose", "Calcium", "Albumin", "Total Protein",
      "Sodium", "Potassium", "CO2", "Chloride",
      "BUN", "Creatinine", "ALP", "ALT", "AST", "Bilirubin"
    ],
    unbundlingViolation: "If individual tests billed separately + panel = fraud",
    ncciBundling: [
      "82947", "82040", "82248", "84075",
      "84132", "84155", "82374", "82435",
      "84450", "84520", "84075", "84460", "84450", "82247"
    ]
  },
  "82947": {
    description: "Glucose (Blood Sugar) - Single Test",
    category: "Lab & Imaging",
    workRVU: 0.00,
    facilityPrice: 3.50,
    nonFacilityPrice: 3.50,
    auditRedFlag: "Cannot bill separately if CMP (80053) performed"
  },

  // Imaging
  "70450": {
    description: "CT Head/Brain without Contrast",
    category: "Lab & Imaging",
    workRVU: 0.98,
    facilityPrice: 145.00,
    nonFacilityPrice: 389.00,
    globalPeriod: "XXX",
    typicalIndication: ["Head injury", "Stroke symptoms", "Severe headache"],
    bilateralRule: "NOT applicable (single organ)",
    modifiers: {
      "26": "Professional component only (radiologist interpretation)",
      "TC": "Technical component only (facility/equipment)"
    }
  },
  "70460": {
    description: "CT Head/Brain with Contrast",
    category: "Lab & Imaging",
    workRVU: 1.18,
    facilityPrice: 178.00,
    nonFacilityPrice: 463.00,
    auditRedFlag: "Cannot bill both 70450 AND 70460 - use 70470 for with/without"
  },

  // Surgery
  "64483": {
    description: "Epidural Steroid Injection - Lumbar/Sacral, Single Level",
    category: "Surgery & Inpatient",
    workRVU: 1.89,
    facilityPrice: 102.00,
    nonFacilityPrice: 197.00,
    globalPeriod: "010", // 10-day global (includes post-op visits)
    fluoroscopyRequired: "Yes - must bill with 77003",
    multipleUnits: "Additional levels use +64484"
  }
};

// Intelligent pricing validator
function validateBillPricing(cptCode, chargedAmount, isInNetwork = true) {
  const benchmark = MedicareRVUDatabase[cptCode];
  
  if (!benchmark) {
    return {
      status: 'UNKNOWN_CPT',
      message: `CPT ${cptCode} not in our database. Cannot validate pricing.`
    };
  }
  
  // Calculate acceptable range
  // Medicare: 1.0x facility rate
  // Commercial insurance: 1.5x - 3.0x facility rate (typical negotiated rates)
  // Out-of-network: Up to 5.0x facility rate (billed charges)
  
  const basePrice = benchmark.facilityPrice;
  const minExpected = isInNetwork ? basePrice * 1.5 : basePrice * 1.0;
  const maxReasonable = isInNetwork ? basePrice * 3.0 : basePrice * 5.0;
  const extremeThreshold = basePrice * 8.0; // Anything above this is fraud
  
  if (chargedAmount > extremeThreshold) {
    return {
      status: 'EXTREME_OVERCHARGE',
      severity: 'CRITICAL',
      message: `🚨 EXTREME OVERCHARGE DETECTED`,
      details: {
        charged: chargedAmount,
        medicareRate: basePrice,
        expectedRange: [minExpected, maxReasonable],
        overchargePercent: Math.round((chargedAmount / basePrice - 1) * 100),
        recommendation: 'Demand itemized bill audit. This pricing is medically unjustifiable.'
      }
    };
  } else if (chargedAmount > maxReasonable) {
    return {
      status: 'HIGH_OVERCHARGE',
      severity: 'HIGH',
      message: `⚠️ Significantly higher than expected`,
      details: {
        charged: chargedAmount,
        medicareRate: basePrice,
        expectedRange: [minExpected, maxReasonable],
        overchargePercent: Math.round((chargedAmount / basePrice - 1) * 100),
        recommendation: 'Negotiate down or file dispute citing Medicare pricing.'
      }
    };
  } else if (chargedAmount >= minExpected) {
    return {
      status: 'REASONABLE',
      severity: 'LOW',
      message: '✓ Within expected range for commercial insurance',
      details: {
        charged: chargedAmount,
        medicareRate: basePrice,
        multiplier: (chargedAmount / basePrice).toFixed(1) + 'x Medicare'
      }
    };
  } else {
    return {
      status: 'BELOW_EXPECTED',
      severity: 'NONE',
      message: '✓ Fair pricing (below typical commercial rates)',
      details: {
        charged: chargedAmount,
        medicareRate: basePrice
      }
    };
  }
}

// Detect unbundling violations
function detectUnbundling(lineItems) {
  const violations = [];
  
  lineItems.forEach((item1, idx1) => {
    const cpt1 = item1.cptCode;
    const data1 = MedicareRVUDatabase[cpt1];
    
    if (!data1 || !data1.ncciBundling) return;
    
    // Check if any bundled codes were also billed
    lineItems.forEach((item2, idx2) => {
      if (idx1 === idx2) return;
      const cpt2 = item2.cptCode;
      
      if (data1.ncciBundling.includes(cpt2)) {
        violations.push({
          type: 'UNBUNDLING_VIOLATION',
          severity: 'HIGH',
          parentCode: cpt1,
          parentDescription: data1.description,
          bundledCode: cpt2,
          bundledDescription: MedicareRVUDatabase[cpt2]?.description || cpt2,
          message: `CPT ${cpt2} is included in ${cpt1}. Separate billing is an NCCI violation.`,
          estimatedOvercharge: item2.totalCharge || 0
        });
      }
    });
  });
  
  return violations;
}

// Export for use in audit system
window.MedicareRVUDatabase = MedicareRVUDatabase;
window.validateBillPricing = validateBillPricing;
window.detectUnbundling = detectUnbundling;
