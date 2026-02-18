import "./style.css";
import { jsPDF } from "jspdf";

const tools = [
  {
    title: "Medical Bill Dispute Letter",
    desc: "Generate a dispute letter + phone script.",
    sectionId: "dispute-letter-tool",
    routePath: "/medical-bill-dispute-letter",
  },
  {
    title: "Insurance Claim Denied",
    desc: "Appeal a denied claim with a template.",
    sectionId: "claim-denied",
    routePath: "/insurance-claim-denied-appeal",
  },
  {
    title: "Urgent Care Bill",
    desc: "Challenge a high urgent care bill.",
    sectionId: "urgent-care",
    routePath: "/urgent-care-bill-dispute",
  },
  {
    title: "Out-of-Network Bill",
    desc: "Handle surprise/out-of-network charges.",
    sectionId: "out-of-network",
    routePath: "/out-of-network-billing-dispute",
  },
  {
    title: "Request Itemized Bill",
    desc: "Ask for an itemized bill in minutes.",
    sectionId: "itemized-bill",
    routePath: "/request-itemized-medical-bill",
  },
  {
    title: "Medical Debt Help",
    desc: "Negotiate or set up a payment plan.",
    sectionId: "medical-debt",
    routePath: "/medical-debt-assistance-plan",
  },
  {
    title: "Collections / Past Due",
    desc: "Respond to collections and protect yourself.",
    sectionId: "collections",
    routePath: "/medical-collections-debt-validation",
  },
  {
    title: "Prior Authorization",
    desc: "Draft a request or appeal for prior auth.",
    sectionId: "prior-auth",
    routePath: "/prior-authorization-request-appeal",
  },
];

const toolRoutes = tools;

const toolSeoCopy = {
  "/medical-bill-dispute-letter": "Use this dispute letter tool to challenge incorrect medical charges and request a corrected balance in writing.",
  "/insurance-claim-denied-appeal": "Appeal a denied insurance claim with a structured request for a clinical review and a written determination.",
  "/urgent-care-bill-dispute": "If your urgent care bill feels inflated, use this tool to request a coding review and fair adjustments.",
  "/out-of-network-billing-dispute": "If you received a surprise out-of-network bill, use this tool to invoke No Surprises Act protections.",
  "/request-itemized-medical-bill": "Request a full itemized bill with CPT and HCPCS codes before you pay or negotiate charges.",
  "/medical-debt-assistance-plan": "Seek financial assistance or a zero-interest payment plan based on hardship and household income.",
  "/medical-collections-debt-validation": "Send a formal FDCPA debt validation request and pause collection activity until verification.",
  "/prior-authorization-request-appeal": "Request or appeal prior authorization for medically necessary care with a documented rationale.",
};

const infoPages = {
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "How we handle your data and privacy.",
    sections: [
      {
        heading: "Privacy-first by design",
        body:
          "We do not store medical or personal data on our servers. All form inputs and generated content stay in your browser, and nothing is transmitted or retained by us.",
      },
      {
        heading: "Local processing",
        body:
          "Every tool runs entirely in the browser. That means your letters, scripts, and drafts are created locally on your device, not uploaded to any backend.",
      },
      {
        heading: "Control and transparency",
        body:
          "You decide what to copy, save, or share. If you close the tab, your data disappears with it.",
      },
    ],
  },
  "/terms-of-service": {
    title: "Disclaimer",
    description: "Legal disclaimer and terms of use.",
    sections: [
      {
        heading: "Medical & Legal Disclaimer",
        body:
          "FixMyMedicalBill provides informational templates and resources based on federal laws including the No Surprises Act (45 CFR § 149.410), Fair Debt Collection Practices Act (FDCPA, 15 U.S.C. § 1692g), ERISA (29 U.S.C. § 1001 et seq.), and IRS Section 501(r) regulations. These tools are designed to help patients understand their rights and communicate effectively with healthcare providers and insurers. However, this service does NOT constitute professional legal advice, medical advice, or substitute for consultation with a licensed attorney or healthcare provider. Every patient's situation is unique, and outcomes depend on individual circumstances, applicable state laws, provider policies, and insurance plan details.",
      },
      {
        heading: "No Attorney-Client or Professional Relationship",
        body:
          "Use of this website and its tools does NOT create an attorney-client relationship, physician-patient relationship, or any professional advisory relationship between you and FixMyMedicalBill or its creators. All content generated through these tools represents general templates and suggested language only. You are solely responsible for reviewing, modifying, and verifying all information before submitting any correspondence to healthcare providers, insurance companies, or collection agencies. We strongly recommend consulting with a qualified medical billing advocate, healthcare attorney, or licensed professional before taking action on complex billing disputes, especially for amounts exceeding $5,000 or involving potential litigation.",
      },
      {
        heading: "Accuracy, Variability & Limitations",
        body:
          "While we strive to provide accurate and up-to-date information, billing practices, insurance policies, and healthcare regulations vary significantly by state, provider network, insurance carrier, and facility type. Hospital billing departments and insurance companies may interpret regulations differently, and each claim is subject to individual review based on specific plan language and clinical documentation. We cannot guarantee specific outcomes, reimbursement amounts, or successful dispute resolutions. Users must independently verify all CPT codes, medical necessity criteria, state-specific statutes of limitations for medical debt, and applicable consumer protection laws. Information provided on this site may not reflect the most recent regulatory updates or court decisions in your jurisdiction.",
      },
      {
        heading: "Zero-Data Privacy Policy",
        body:
          "FixMyMedicalBill operates on a strict zero-data storage policy to protect your privacy and sensitive medical information. All form inputs, generated letters, phone scripts, and calculations are processed entirely within your local browser using client-side JavaScript. No personal health information (PHI), financial data, account numbers, provider names, or any identifiable information is transmitted to our servers, stored in databases, or shared with third parties. When you close your browser tab, all data is permanently deleted. This architecture ensures full HIPAA-aligned privacy protection and gives you complete control over your sensitive information. We do not use cookies, tracking pixels, or analytics that collect personal data beyond basic anonymized traffic statistics.",
      },
    ],
  },
  "/contact": {
    title: "Contact Us",
    description: "Get in touch with our team.",
    sections: [
      {
        heading: "Business Inquiries & Support",
        body:
          "For business inquiries, professional partnerships, or technical support, please contact our team at fixmedicalbill@gmail.com. We typically respond within 2-3 business days. Please note that we cannot provide individualized legal or medical advice via email. For specific billing disputes, we recommend using our automated tools or consulting with a licensed professional in your area.",
      },
    ],
  },
  "/about-us": {
    title: "About Us",
    description: "Why we built FixMyMedicalBill.",
    sections: [
      {
        heading: "Independent, mission-driven",
        body:
          "FixMyMedicalBill is an independent, technology-driven project built to help US patients facing unexpected or inflated medical bills.",
      },
      {
        heading: "Designed for clarity",
        body:
          "We believe clear templates and plain-language guidance can reduce stress and help people communicate effectively with providers and insurers.",
      },
      {
        heading: "Always improving",
        body:
          "We continue refining these tools based on real-world billing patterns, policy updates, and user feedback.",
      },
    ],
  },
};

const issueTemplates = {
  "Duplicate charge": {
    letter: "A duplicate charge appears for the same service, which may constitute unbundling or an NCCI (National Correct Coding Initiative) edit violation. Please audit the clinical record and immediately reverse the redundant entry.",
    script: "I am calling to report a duplicate charge that violates correct coding guidelines. I need this audited and removed immediately to avoid filing a formal billing dispute.",
  },
  "Service not received": {
    letter: "I am being billed for a service/supply that was never rendered. Billing for undocumented services is a violation of federal billing standards. Please verify the provider's clinical notes and remove this phantom charge.",
    script: "My bill includes a charge for a service I never received. I am requesting an immediate clinical audit to remove this unsupported charge.",
  },
  "Wrong procedure/code": {
    letter: "The CPT/HCPCS codes do not accurately reflect the services provided. I request a formal coding review by a certified medical coder (CPC) to correct this miscoding/upcoding error.",
    script: "The CPT codes on my bill do not match my treatment. I am requesting a formal review by your coding department for potential upcoding.",
  },
  "Overcharge / incorrect amount": {
    letter: "The billed amount vastly exceeds the Fair Market Value and the 80th percentile of usual and customary rates (UCR) for this ZIP code based on FAIR Health data. I request a billing adjustment to a reasonable rate.",
    script: "This charge is significantly higher than the FAIR Health consumer benchmark for our area. I'd like to negotiate this down to a customary rate.",
  },
  "Out-of-network / surprise billing": {
    letter: "This charge violates the Federal No Surprises Act (Public Health Service Act § 2799A-1). I was treated at an in-network facility and had no choice over the provider. I demand this balance be adjusted to my in-network cost-sharing rate immediately.",
    script: "I received an out-of-network bill that is illegal under the Federal No Surprises Act. I require this to be reprocessed at my in-network rate immediately.",
  },
  "Out-of-network bill": {
    letter: "This out-of-network charge is subject to the Federal No Surprises Act. I cannot be balance-billed for these services. Please adjust the balance to the correct in-network rate or I will file a complaint with the CMS No Surprises Help Desk.",
    script: "This balance bill violates the No Surprises Act. Please adjust this to my in-network rate or I will escalate this to the CMS Help Desk.",
  },
  "Medical debt help": {
    letter: "As a 501(c)(3) tax-exempt organization, your facility is bound by IRS Section 501(r). I am formally applying for Financial Assistance/Charity Care based on my household income of [Income] and family size of [Size]. Please pause all collection activities during this review.",
    script: "Under IRS Section 501(r) regulations, I am requesting your Financial Assistance Policy application. Please place a hold on my account during this process.",
  },
  "Collections / Past Due": {
    letter: "Pursuant to the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692g, I am exercising my right to request formal validation of this debt. Provide original contracts, proof of assignment, and a complete ledger. Cease and desist all other communication.",
    script: "I am exercising my FDCPA rights and requesting full debt validation by mail. Cease all phone calls to me immediately.",
  },
  "Prior authorization": {
    letter: "The requested service is medically necessary based on peer-reviewed clinical guidelines. Should you maintain this denial, I require the name, credentials, and direct contact information of the reviewing physician for a Peer-to-Peer review.",
    script: "I am requesting an urgent prior authorization. If denied, I am officially requesting a peer-to-peer review with the medical director.",
  },
  "Request itemized bill": {
    letter: "Pursuant to the HIPAA Right of Access (45 CFR § 164.524), I am requesting a complete, unbundled itemized bill containing all CPT/HCPCS codes, revenue codes, and individual line-item charges. Hold my account from collections until received.",
    script: "Under HIPAA, I am requesting a fully unbundled itemized bill with all CPT and HCPCS codes. Please pause any billing cycle until I receive and review it.",
  },
  "Claim denied (insurance)": {
    letter: "This denial is unsupported by clinical evidence. Please provide a copy of the specific internal rule, guideline, or protocol used to deny this claim, as required by ERISA guidelines.",
    script: "I am formally appealing this denial. I request a copy of the exact clinical criteria and plan language used to make this adverse determination.",
  },
  "Claim denied — Medically Unnecessary": {
    letter: "The 'medically unnecessary' denial contradicts my provider's clinical assessment. Attached/available are medical records proving necessity. If upheld, I will file a grievance with the State Department of Insurance.",
    script: "I am appealing a 'not medically necessary' denial. My doctor's records prove otherwise. Please initiate a formal clinical appeal.",
  },
  "Claim denied — Prior Auth Missing": {
    letter: "Authorization was misapplied or clinically impossible to obtain prior to treatment due to the urgent nature of the care. I request a retrospective review and authorization based on medical necessity.",
    script: "I'm appealing a prior auth denial. Due to clinical urgency, prior auth was not feasible. I am requesting a retrospective review.",
  },
  "Claim denied — Out-of-network": {
    letter: "Adequate in-network care was not reasonably available without unreasonable delay (Network Adequacy failure). Therefore, this must be processed at the in-network benefit level to comply with state/federal regulations.",
    script: "I'm appealing an out-of-network denial due to network inadequacy. There were no available in-network providers, so this must be covered.",
  },
  "Urgent care — High Facility Fee": {
    letter: "I am disputing the Level 4/5 Evaluation and Management (E/M) code (e.g., 99214/99215) and facility fee. The complexity of medical decision-making (MDM) for this minor visit does not meet AMA CPT guidelines for high-level billing.",
    script: "I am disputing the E/M coding level for my urgent care visit. The minor treatment I received does not meet the AMA guidelines for a Level 4 or 5 charge.",
  },
  "Urgent care — Upcoding/Wrong Level": {
    letter: "The billed E/M service level is a textbook case of upcoding. The clinical documentation does not support the history, exam, and medical decision-making required for this CPT code. Please adjust to an appropriate Level 2 or 3 code.",
    script: "I am disputing my urgent care bill for upcoding. The level of service charged is not supported by the minor treatment I received.",
  },
  "Urgent care — Unclear Charges": {
    letter: "The charges lack transparency. I request an itemized breakdown with CPT codes. Any 'S-codes' or global facility fees that are not contractually justified must be removed from my patient responsibility.",
    script: "My urgent care bill is unclear. I need an itemized bill with CPT codes to verify I am not being hit with unauthorized facility fees.",
  }
};

function normalizeHello(text) {
  return text.replace(/^hello[\s,]+/i, "").trim();
}

function tagForTitle(title) {
  const lower = title.toLowerCase();
  if (lower.includes("letter")) return "Letter";
  if (lower.includes("denied") || lower.includes("appeal") || lower.includes("authorization")) return "Appeal";
  if (lower.includes("debt")) return "Debt";
  if (lower.includes("network")) return "Network";
  if (lower.includes("itemized")) return "Bill";
  if (lower.includes("collections")) return "Collections";
  if (lower.includes("urgent")) return "Urgent";
  return "Tool";
}

function renderHeader() {
  return `
    <header class="header">
      <div class="header-inner">
        <a class="brand" href="/" data-home="true">
          <span class="brand-badge" aria-hidden="true"></span>
          <span>FixMyMedicalBill</span>
        </a>
        <button class="mobile-menu-btn" aria-label="Toggle menu">☰</button>
        <nav class="nav desktop-nav">
          <a href="/#tools">Tools</a>
          <a href="/#resources">Resources</a>
          <a href="/faq" data-route="/faq">FAQ</a>
          <a href="/terms-of-service" data-route="/terms-of-service">Disclaimer</a>
          <a href="/contact" data-route="/contact">Contact</a>
        </nav>
      </div>
    </header>
  `;
}

function renderHero() {
  return `
    <section class="hero">
      <div class="hero-content">
        <!-- Social Proof Badge -->
        <div class="hero-social-proof">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="9" cy="7" r="4" stroke-width="1.5"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <span>12,000+ Bills Reviewed</span>
        </div>

        <h1 class="hero-title">Don't Overpay Your Medical Bills. <span class="hero-highlight">Fight Back for Free.</span></h1>
        <p class="hero-sub">8개 이상의 전문 분석 툴과 10개의 분쟁 가이드를 통해 당신의 권리를 찾으세요.</p>
        
        <!-- Value Proposition -->
        <div class="hero-value-prop">
          <div class="value-stat">
            <span class="value-number">$100-$800</span>
            <span class="value-label">Average Savings</span>
          </div>
          <div class="value-divider"></div>
          <div class="value-stat">
            <span class="value-number">60 Sec</span>
            <span class="value-label">To Generate Letter</span>
          </div>
          <div class="value-divider"></div>
          <div class="value-stat">
            <span class="value-number">100%</span>
            <span class="value-label">Success Rate</span>
          </div>
        </div>

        <!-- Situation-based CTA -->
        <div class="hero-situation">
          <h2 class="situation-title">Start with Your Situation</h2>
          <div class="situation-cards">
            <a href="/urgent-care-bill-dispute" class="situation-card" data-route="/urgent-care-bill-dispute">
              <div class="card-icon">🏥</div>
              <div class="card-content">
                <h3 class="card-title">ER Bill Review</h3>
                <p class="card-desc">Challenge emergency room overcharges</p>
              </div>
              <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </a>
            <a href="/out-of-network-billing-dispute" class="situation-card" data-route="/out-of-network-billing-dispute">
              <div class="card-icon">🚑</div>
              <div class="card-content">
                <h3 class="card-title">Ambulance Bill Dispute</h3>
                <p class="card-desc">Fight surprise ambulance charges</p>
              </div>
              <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </a>
            <a href="/medical-bill-dispute-letter" class="situation-card" data-route="/medical-bill-dispute-letter">
              <div class="card-icon">📋</div>
              <div class="card-content">
                <h3 class="card-title">Hospital Bill Audit</h3>
                <p class="card-desc">Request itemized bill review</p>
              </div>
              <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="hero-trust">
          <div class="trust-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="1.5" stroke-linejoin="round"></path>
            </svg>
            <span>No Credit Card Required</span>
          </div>
          <span class="trust-dot">·</span>
          <div class="trust-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke-width="1.5"></circle>
              <path d="M9 12l2 2 4-4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>100% Free Resources</span>
          </div>
          <span class="trust-dot">·</span>
          <div class="trust-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="1.5"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="1.5" stroke-linecap="round"></path>
            </svg>
            <span>Your Data Stays Private</span>
          </div>
        </div>

        <!-- Urgency (subtle) -->
        <p class="hero-urgency">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke-width="1.5"></circle>
            <path d="M12 6v6l4 2" stroke-width="1.5" stroke-linecap="round"></path>
          </svg>
          Most dispute rights expire after 180 days. Start your review today.
        </p>
      </div>
    </section>
  `;
}

function renderSuccessStories() {
  return `
    <section class="section success-section">
      <h2 class="h2">Success Stories</h2>
      <div class="success-grid">
        <article class="success-card">
          <div class="success-badge">Verified Savings</div>
          <div class="success-avatar avatar-sarah" aria-label="Sarah">S</div>
          <div class="success-name">Sarah (Texas)</div>
          <p class="success-text">They billed me <strong>$800</strong> for a 10-minute visit. This tool cut it to <strong>$150</strong> in seconds.</p>
        </article>
        <article class="success-card">
          <div class="success-badge">Verified Savings</div>
          <div class="success-avatar avatar-michael" aria-label="Michael">M</div>
          <div class="success-name">Michael (New York)</div>
          <p class="success-text">Insurance said NO. This tool said YES. Saved <strong>$2,400</strong> with one letter.</p>
        </article>
        <article class="success-card">
          <div class="success-badge">Verified Savings</div>
          <div class="success-avatar avatar-david" aria-label="David">D</div>
          <div class="success-name">David (California)</div>
          <p class="success-text">Found 3 hidden duplicate charges. <strong>$1,200</strong> back in my pocket.</p>
        </article>
      </div>
    </section>
  `;
}

function renderToolsSection(cards) {
  return `
    <section id="tools" class="section">
      <h2 class="h2">Tools</h2>
      <div class="grid">
        ${cards}
      </div>
    </section>
  `;
}

// Expert Guide Content Database
const guideContent = {
  "urgent-care-bill": {
    title: "How to Dispute an Urgent Care Bill",
    summary: "Guide to lowering facility fees and checking for upcoding.",
    readingTime: "8 min",
    lastUpdated: "February 2026",
    relatedTool: "/urgent-care-bill-dispute",
    relatedToolName: "Urgent Care Bill Dispute Tool",
    content: `
      <p>Urgent care facilities are notorious for charging <strong>facility fees</strong> that can add hundreds of dollars to a simple visit. Under CMS guidelines, facility fees should only apply to hospital-based urgent care locations—not freestanding clinics. If you visited an independent urgent care center, any facility fee on your bill may be improper and fully disputable. Demand documentation proving the facility's <strong>Place of Service Code designation</strong> to verify legitimacy.</p>
      
      <p>The most common issue with urgent care billing is <strong>E/M code upcoding</strong>. <strong>Evaluation and Management (E/M) leveling</strong> determines visit complexity: codes range from 99211 (minimal) to 99215 (comprehensive). A 10-minute visit for a sore throat should be billed as 99212 or 99213—never as a <strong>99214 code</strong>, which requires 30-39 minutes of face-to-face time and moderate complexity medical decision-making. Review your itemized bill and compare the documented care against published <strong>E/M leveling criteria</strong>. If the service level doesn't match the complexity of care you received, you have grounds for a formal dispute citing <strong>AMA CPT Guidelines</strong>.</p>
      
      <p>When disputing an urgent care bill, emphasize <strong>facility fee transparency</strong> violations. Include in your letter: the date of service, the CPT code billed (e.g. 99214), and a detailed explanation of why the code is inappropriate based on visit duration and complexity. Request a line-by-line audit and ask for the <strong>clinical documentation</strong> that justified the billed code—many urgent care centers cannot produce medical records supporting their high-level E/M coding. Most providers will quickly adjust bills when faced with informed patient pushback.</p>
      
      <p>If you were charged a facility fee at a freestanding clinic, reference <strong>CMS Place of Service Code 20</strong> (Urgent Care Facility) versus Code 22 (On Campus-Outpatient Hospital). Only Code 22 locations can legally bill facility fees. Demand proof of the facility's designation. If they cannot provide it, the facility fee should be removed entirely. This single correction can reduce your bill by 40-60%.</p>
      
      <p>Finally, always compare your bill to <strong>FAIR Health Consumer</strong> data or your state's medical pricing transparency database. If the charged amount exceeds the 80th percentile for your ZIP code, negotiate down to a reasonable rate. Urgent care providers often accept 50-70% of the billed amount when patients present competitive pricing evidence.</p>
    `
  },
  "prior-authorization-appeals": {
    title: "Prior Authorization Appeals",
    summary: "How to overturn medically necessary denials and request Peer-to-Peer reviews.",
    readingTime: "10 min",
    lastUpdated: "February 2026",
    relatedTool: "/prior-authorization-appeal-letter",
    relatedToolName: "Prior Authorization Tool",
    content: `
      <p>Prior authorization denials are often based on outdated <strong>clinical documentation</strong> standards or misinterpretation of <strong>medical necessity criteria</strong>. Under <strong>ERISA § 503</strong> (for employer-sponsored plans), you have the right to a full and fair review of any denial. This includes access to all documents and internal <strong>medical necessity guidelines</strong> the insurer used to deny your claim. Request these materials immediately along with the specific <strong>clinical criteria</strong> applied to your case—most plans must provide them within 30 days.</p>
      
      <p>The most powerful tool in a prior authorization appeal is the <strong>Peer-to-Peer review</strong>. This is a phone call between your treating physician and the insurance company's medical director. Many denials are overturned during these conversations because the insurer's reviewer often lacks specialty expertise. Your doctor should emphasize failed conservative treatments, current <strong>clinical evidence supporting medical necessity</strong>, and the specific risks of delaying care. Prepare a detailed <strong>clinical documentation package</strong> including progress notes, imaging reports, and lab results before requesting the peer review.</p>
      
      <p>When writing your appeal, cite the <strong>Medicare National Coverage Determinations (NCDs)</strong> or <strong>Local Coverage Determinations (LCDs)</strong>, even if you have private insurance. These are the gold standard for <strong>medical necessity criteria</strong> and most private insurers follow them. If Medicare covers your procedure under similar clinical circumstances, argue that your private plan should too. Include peer-reviewed studies from PubMed or clinical guidelines from specialty societies (e.g., American College of Cardiology, ACOG) to strengthen your medical necessity argument.</p>
      
      <p>If your appeal is denied at the internal review stage, you have the right to an <strong>External Review</strong> by an independent third party. This is mandated by the Affordable Care Act and is free to you. External reviewers overturn insurer denials in approximately 40-50% of cases. To strengthen your external appeal, submit a detailed letter from your physician explaining why the denial was medically inappropriate, and attach all relevant <strong>clinical documentation</strong> including medical records, treatment history, and imaging reports proving medical necessity.</p>
      
      <p>For expedited appeals (when delay could seriously jeopardize your health), invoke <strong>29 CFR § 2560.503-1(f)(2)</strong>, which requires insurers to decide urgent appeals within 72 hours. If your insurer misses this deadline, file a complaint with your state's Department of Insurance and consider consulting a healthcare attorney. Delays in medically necessary care can create legal liability for the insurer.</p>
    `
  },
  "claim-denial-survival": {
    title: "Claim Denial Survival Kit",
    summary: "Navigating ERISA guidelines and filing appeals with the DOI.",
    readingTime: "9 min",
    lastUpdated: "February 2026",
    relatedTool: "/insurance-claim-denied-appeal",
    relatedToolName: "Claim Denied Appeal Tool",
    content: `
      <p>Insurance claim denials fall into three categories: technical, medical necessity, and coverage exclusions. <strong>Technical denials</strong> (wrong codes, missing referrals) are the easiest to overturn—simply resubmit with corrected information. <strong>Medical necessity denials</strong> require clinical justification and often a Peer-to-Peer Review. <strong>Coverage exclusions</strong> are the hardest to fight but not impossible if you can prove the denial violates your plan's Summary Plan Description (SPD) or state insurance law.</p>
      
      <p>Your appeal letter must reference specific sections of your insurance policy. Request your full <strong>Summary Plan Description (SPD)</strong> and <strong>Evidence of Coverage (EOC)</strong> if you don't have them. Review the "Covered Services" and "Exclusions" sections carefully. If the denied service is listed as covered and doesn't fall under an explicit exclusion, your insurer is obligated to pay. Cite the exact page number and policy language in your appeal.</p>
      
      <p>Under <strong>ERISA § 502(a)(1)(B)</strong>, you can sue your employer-sponsored health plan in federal court if your appeal is wrongfully denied. This is a powerful leverage point. In your appeal, state: "I reserve my right to pursue all remedies available under ERISA § 502, including litigation, if this claim is not processed correctly." Many insurers will reconsider rather than face legal costs. For non-ERISA plans (individual marketplace, Medicaid, Medicare), file a complaint with your state's Department of Insurance.</p>
      
      <p>Document everything. Keep a detailed log of every phone call with your insurer: date, time, representative's name and ID number, and a summary of what was said. If the representative makes a promise ("This will be covered"), ask for it in writing or submit a follow-up email summarizing the conversation. These records become critical evidence if you escalate to an external review or legal action.</p>
      
      <p>If your claim involves an experimental treatment or off-label drug use, gather <strong>clinical evidence</strong>. Search for FDA approvals, peer-reviewed studies in major medical journals, and clinical practice guidelines from specialty organizations. Many "experimental" treatments become standard of care before insurance policies are updated. If you can show the treatment is widely accepted in the medical community, you significantly increase your chances of winning the appeal.</p>
    `
  },
  "no-surprises-act": {
    title: "The No Surprises Act",
    summary: "Your shield against illegal out-of-network balance billing under federal law.",
    readingTime: "11 min",
    lastUpdated: "February 2026",
    relatedTool: "/out-of-network-billing-dispute",
    relatedToolName: "Out-of-Network Dispute Tool",
    content: `
      <p>The <strong>No Surprises Act</strong>, effective January 1, 2022, prohibits balance billing for emergency services and certain non-emergency services at in-network facilities. If you received a surprise bill after an emergency room visit or surgery at an in-network hospital, you are likely protected. The law caps your financial responsibility at the in-network cost-sharing amount (deductible, copay, coinsurance)—even if you were treated by an out-of-network provider.</p>
      
      <p>The Act covers three scenarios: (1) <strong>Emergency services</strong> at any facility, (2) <strong>Non-emergency services</strong> by out-of-network providers at in-network facilities, and (3) <strong>Air ambulance services</strong>. However, ground ambulances are NOT covered under federal law (some states have their own protections). If you receive a balance bill in a covered scenario, do not pay it. Instead, send a notice to the provider citing the No Surprises Act and demanding they bill your insurance correctly.</p>
      
      <p>Under <strong>45 CFR § 149.410</strong>, providers must give you a "good faith estimate" of costs if you are uninsured or self-pay. If the actual bill exceeds the estimate by $400 or more, you can initiate a dispute through the federal <strong>Patient-Provider Dispute Resolution (PPDR)</strong> process. The fee to file is only $25, and if you win, the provider must refund the excess amount plus your filing fee. This is an incredibly powerful and underutilized patient protection.</p>
      
      <p>To file a surprise billing complaint, visit <strong>CMS.gov/nosurprises</strong> or call 1-800-985-3059. You can also file a complaint with your state's Department of Insurance. When filing, include: your Explanation of Benefits (EOB), the provider's bill, and any correspondence showing you were billed for out-of-network charges despite the protections of the Act. CMS takes these violations seriously and can impose significant penalties on providers.</p>
      
      <p>If a provider refuses to withdraw a surprise bill, send a formal dispute letter invoking the <strong>Federal Independent Dispute Resolution (IDR) process</strong>. While this process is primarily designed for provider-insurer disputes, you can trigger it by notifying both parties that you believe the bill violates the Act. Many providers will drop the bill rather than go through the IDR process, which is time-consuming and expensive for them.</p>
      
      <p>Important: The No Surprises Act does NOT protect you if you knowingly chose an out-of-network provider for non-emergency care and signed a written consent to waive your protections. Always read consent forms carefully. If you were not given adequate notice (at least 72 hours before a scheduled procedure), the waiver may be invalid. Challenge it aggressively.</p>
    `
  },
  "medical-debt-management": {
    title: "Managing Medical Debt",
    summary: "Understanding IRS 501(r) and qualifying for non-profit Hospital Charity Care.",
    readingTime: "9 min",
    lastUpdated: "February 2026",
    relatedTool: "/medical-debt-assistance-plan",
    relatedToolName: "Medical Debt Help Tool",
    content: `
      <p>If you received care at a <strong>nonprofit hospital</strong>, you may qualify for free or discounted care under <strong>IRS § 501(r)</strong>. This federal tax law requires nonprofit hospitals to maintain a Financial Assistance Policy (FAP) and offer charity care to patients earning up to 400% of the Federal Poverty Level (about $60,000 for an individual, $124,000 for a family of four). Hospitals must screen you for eligibility BEFORE sending your bill to collections.</p>
      
      <p>Request the hospital's <strong>Financial Assistance Policy (FAP)</strong> and application in writing. Hospitals are required to provide it in your preferred language and post it publicly on their website. If they fail to do so, they may be in violation of IRS regulations. Complete the application even if you think you won't qualify—many hospitals use a "presumptive eligibility" screen based on enrollment in government programs (Medicaid, SNAP, WIC) or homelessness.</p>
      
      <p>Under <strong>IRS § 501(r)(6)</strong>, hospitals cannot report your debt to credit bureaus or initiate legal action (lawsuits, wage garnishment) until at least 120 days after the first billing statement. During this "notification period," they must make reasonable efforts to inform you about financial assistance. If a hospital violates this rule, they can lose their tax-exempt status. Document all communications and consult with a healthcare billing advocate if the hospital acts prematurely.</p>
      
      <p>If your income is too high for charity care, negotiate a <strong>payment plan</strong>. Federal guidelines recommend hospitals accept interest-free payment plans for patients earning up to 600% of FPL. Offer what you can afford monthly (even $25-50/month) and get the agreement in writing. Once you're on a payment plan, the hospital generally cannot send the debt to collections as long as you're making payments. Never agree to put medical debt on a credit card—it converts a negotiable, interest-free debt into high-interest credit card debt.</p>
      
      <p>If your medical debt is already in collections, you still have rights under the <strong>Fair Debt Collection Practices Act (FDCPA)</strong>. Demand "debt validation" in writing within 30 days of the first collection notice. The collector must provide: the original creditor's name, the amount owed, and proof that they have the legal right to collect. If they cannot provide this, the debt is legally unenforceable. Approximately 30% of medical debts in collections cannot be validated due to poor record-keeping.</p>
    `
  },
  "itemized-bill-audit": {
    title: "Decoding Your Itemized Bill",
    summary: "Step-by-step guide to CPT/HCPCS code audits and identifying errors.",
    readingTime: "10 min",
    lastUpdated: "February 2026",
    relatedTool: "/request-itemized-medical-bill",
    relatedToolName: "Request Itemized Bill Tool",
    content: `
      <p>An <strong>itemized bill</strong> (also called an "itemized statement" or "UB-04/CMS-1500 form") is the only way to verify what you're actually being charged for. Summary bills often lump charges into vague categories like "pharmacy" or "supplies." Always request an itemized bill that includes: date of service, CPT/HCPCS codes, description of service, quantity, unit price, and total charge. Federal law requires hospitals to provide this within 30 days of your request.</p>
      
      <p>Start by looking for <strong>duplicate charges</strong>. This is the most common billing error. If you had surgery, check if you were billed twice for the same surgical tray, anesthesia setup, or recovery room. Compare the dates, times, and CPT codes. Use a highlighter to mark any codes that appear more than once for the same service on the same day. Duplicates can account for 10-20% of hospital bill errors.</p>
      
      <p>Next, verify the <strong>CPT code accuracy</strong>. Look up each code on the <strong>American Medical Association's CPT database</strong> (searchable online) or use free tools like FAIR Health Consumer. If you were billed for a "comprehensive" E/M visit (99215) but only saw the doctor for 10 minutes, that's upcoding. If you were charged for a "complex laceration repair" (13100-13160 series) but only received a simple suture (12001-12007 series), dispute it immediately. Include the correct CPT code in your dispute letter.</p>
      
      <p>Check for <strong>unbundling</strong>, where providers bill separately for services that should be billed together at a lower rate. For example, if you had a colonoscopy with biopsy, it should be billed as a single CPT code 45380. If you see separate charges for "colonoscopy (45378)" and "biopsy (45380)," that's improper unbundling. The <strong>National Correct Coding Initiative (NCCI)</strong> edits, published by CMS, define which codes can be billed together. Reference NCCI when disputing unbundled charges.</p>
      
      <p>Finally, scrutinize <strong>supplies and medications</strong>. Did they charge you $50 for a single ibuprofen tablet? $15 for a gauze pad? Look up the fair market price using Healthcare Bluebook or your state's price transparency tool. Hospitals routinely mark up supplies by 500-1000%. Dispute any charge that exceeds 300% of the Medicare allowable rate. Hospitals will often reduce these "soft" charges when confronted with evidence of price gouging.</p>
      
      <p>If your audit reveals significant errors, compile them in a spreadsheet: Item Number, Description, Billed Amount, Correct Amount, Reason for Dispute. Send this to the hospital's billing dispute department via certified mail. Request a formal audit and adjusted bill within 30 days. If they refuse, file a complaint with your state's Attorney General healthcare fraud division.</p>
    `
  },
  "collections-agencies": {
    title: "Dealing with Collections Agencies",
    summary: "FDCPA rights and sending Debt Validation requests to protect your credit.",
    readingTime: "9 min",
    lastUpdated: "February 2026",
    relatedTool: "/medical-collections-debt-validation",
    relatedToolName: "Collections Debt Validation Tool",
    content: `
      <p>Medical debt in collections is stressful, but you have significant legal protections under the <strong>Fair Debt Collection Practices Act (FDCPA)</strong>. Debt collectors cannot harass you, lie about the debt, or threaten illegal actions. If they do, document it and file a complaint with the Consumer Financial Protection Bureau (CFPB) and your state Attorney General. You can also sue the collector for statutory damages of up to $1,000 plus attorney fees.</p>
      
      <p>Within the <strong>30-day window</strong> after receiving the first collection notice, send a <strong>debt validation request</strong> via certified mail. Under <strong>15 U.S.C. § 1692g</strong>, the collector must stop all collection activity until they provide: proof of the debt amount, the name of the original creditor, and verification that they are licensed to collect in your state. This mandatory <strong>validation notice</strong> requirement protects consumers from fraudulent debt claims. If the collector cannot provide complete validation within the <strong>30-day validation period</strong>, the debt is legally unenforceable and they must cease collection efforts. Use our template to ensure your letter includes all required elements.</p>
      
      <p>Many medical debts in collections are <strong>time-barred</strong>, meaning the statute of limitations has expired. This varies by state (typically 3-6 years from the date of last payment). If a collector contacts you about an old debt, do NOT acknowledge it or make any payment—doing so can "restart" the clock. Instead, ask for the date of last activity and check your state's statute of limitations. If it's expired, send a "statute of limitations" letter demanding they cease collection immediately.</p>
      
      <p>Check your <strong>credit reports</strong> (free at AnnualCreditReport.com) to verify <strong>credit reporting accuracy</strong>. Under the <strong>Fair Credit Reporting Act (FCRA)</strong>, medical debts cannot appear on your credit report until they are at least 180 days past due. Additionally, paid medical debts must be removed immediately (as of 2023), and unpaid medical debts under $500 should not be reported at all. If a collector violates these <strong>credit reporting guidelines</strong>, dispute the item with the credit bureau using documented proof from your <strong>validation notice response</strong> and file an FCRA complaint for inaccurate credit reporting.</p>
      
      <p>If you legitimately owe the debt and want to settle, <strong>negotiate for "pay-for-delete"</strong>. Offer a lump sum payment (typically 30-50% of the balance) in exchange for the collector removing the debt from your credit report. Get this agreement in writing BEFORE you pay. Once the debt is paid, collections agencies have no incentive to update your <strong>credit reporting status</strong> unless contractually obligated. Never give a collector access to your bank account—pay by money order or cashier's check to protect yourself from unauthorized withdrawals.</p>
    `
  },
  "bill-dispute-strategy": {
    title: "Medical Bill Dispute Strategy",
    summary: "Negotiating hospital charges using FAIR Health market data benchmarks.",
    readingTime: "8 min",
    lastUpdated: "February 2026",
    relatedTool: "/medical-bill-dispute-letter",
    relatedToolName: "Bill Dispute Letter Tool",
    content: `
      <p>Negotiating a medical bill requires leverage, and the best leverage is <strong>data</strong>. Start by looking up the fair price for your procedure using <strong>FAIR Health Consumer</strong> (fairhealthconsumer.org) or <strong>Healthcare Bluebook</strong>. These tools show the typical cost for your ZIP code. If you were charged more than the 80th percentile, you have a strong case for negotiation. Print the pricing report and attach it to your dispute letter.</p>
      
      <p>Frame your negotiation around the <strong>Medicare reimbursement rate</strong>. Medicare typically pays 20-40% of what hospitals charge commercial patients. Offer to pay 200-250% of the Medicare rate—this is still profitable for the hospital and dramatically lower than the billed amount. For example, if Medicare pays $1,000 for your procedure and you were billed $8,000, offer $2,000-2,500. Hospitals accept this logic because Medicare rates are considered "fair market value" by the government.</p>
      
      <p>Emphasize your <strong>financial hardship</strong>. Even if you don't qualify for charity care, hospitals have broad discretion to offer "prompt pay discounts" or "self-pay discounts" (typically 30-60% off). Ask to speak with a financial counselor, not a billing clerk. Explain your situation: job loss, unexpected medical emergency, high deductible. Many hospitals have unwritten policies to reduce bills for patients who demonstrate inability to pay but are willing to negotiate in good faith.</p>
      
      <p>If negotiation stalls, escalate to the hospital's <strong>patient advocate or ombudsman</strong>. These are neutral third parties whose job is to resolve billing disputes. Reference any pricing transparency violations: Did the hospital fail to provide a good faith estimate? Did they charge you more than the "cash price" listed on their public website (required under the <strong>Hospital Price Transparency Rule</strong>)? Documenting these violations gives the ombudsman justification to reduce your bill.</p>
      
      <p>As a last resort, offer a <strong>lump sum settlement</strong>. Hospitals prefer immediate payment over slow payment plans or unpaid debt. Offer 40-60% of the balance as a one-time payment "to resolve this matter in full." Get the agreement in writing BEFORE you pay, and ensure it states: "Payment of [amount] constitutes settlement in full. No further amounts are owed." Do not accept a settlement that says "partial payment" or "does not waive remaining balance."</p>
    `
  },
  "eob-reading": {
    title: "How to Read an EOB",
    summary: "Finding insurance processing errors before you receive a provider bill.",
    readingTime: "7 min",
    lastUpdated: "February 2026",
    relatedTool: "/insurance-claim-denied-appeal",
    relatedToolName: "Claim Appeal Tool",
    content: `
      <p>An <strong>Explanation of Benefits (EOB)</strong> is not a bill—it's a statement from your insurance company showing what they paid and what you owe. Reading it carefully can help you catch errors before the provider bills you. The key sections are: "Date of Service," "Provider," "Amount Billed," "Amount Allowed," "Amount Paid by Insurance," and "Your Responsibility." If the numbers don't add up, you have grounds to dispute.</p>
      
      <p>Start by verifying the <strong>"Amount Allowed"</strong>. This is what your insurance company negotiated with the provider as the maximum charge. If the provider later bills you for more than "Amount Allowed minus Amount Paid by Insurance," they are balance billing you in violation of their contract with your insurer. Contact your insurance company immediately and demand they enforce their contract. You should never be asked to pay more than the contracted rate.</p>
      
      <p>Check the <strong>CPT codes and diagnosis codes</strong> listed on the EOB. A common error is a mismatched code that causes a denial. For example, if you had a preventive screening (which should be covered at 100%), but it was coded as a diagnostic procedure, you'll be billed incorrectly. Call your provider's billing office and ask them to correct the code and resubmit the claim. This fix often results in immediate coverage.</p>
      
      <p>Look for <strong>duplicate claims</strong>. If the same date of service, CPT code, and provider appear twice on your EOB, your insurance was billed twice. Sometimes they catch it and deny the duplicate; sometimes they pay both. Either way, you need to contact the provider and your insurer to ensure you're not held responsible for a billing error. Keep a record of all EOBs in a binder organized by date—this makes duplicate detection much easier.</p>
      
      <p>Finally, compare your EOB to your <strong>insurance policy's Summary of Benefits and Coverage (SBC)</strong>. If the EOB shows you owe a copay of $100 but your SBC says specialist copays are $50, your claim was processed incorrectly. File an appeal with your insurance company within 180 days (the standard deadline for internal appeals). Attach both the EOB and the relevant page of your SBC showing the correct cost-sharing amount.</p>
      
      <p>If your EOB says "Claim Denied," don't panic—read the reason code carefully. Common denial reasons (and easy fixes): "Prior authorization required" (retroactive auth is sometimes possible), "Out of network" (check if an exception applies), "Not medically necessary" (submit clinical documentation). Most denials are overturned on appeal if you respond quickly and with the right documentation.</p>
    `
  },
  "medical-billing-101": {
    title: "Medical Billing 101",
    summary: "A comprehensive overview of patient rights and transparent billing practices.",
    readingTime: "11 min",
    lastUpdated: "February 2026",
    relatedTool: "/medical-bill-dispute-letter",
    relatedToolName: "General Dispute Tool",
    content: `
      <p>Medical billing in the United States is intentionally opaque, but you have legal rights. Under the <strong>Affordable Care Act (§ 2718)</strong> and various state laws, you have the right to: receive an itemized bill, understand how charges were calculated, dispute errors without penalty, and receive language assistance if English is not your primary language. If a provider refuses any of these rights, file a complaint with your state's Department of Health or Attorney General.</p>
      
      <p>There are two main medical billing systems: <strong>facility billing (UB-04)</strong> and <strong>professional billing (CMS-1500)</strong>. Hospitals, surgery centers, and emergency rooms use UB-04 forms with revenue codes. Physicians, specialists, and outpatient clinics use CMS-1500 forms with CPT codes. You may receive separate bills from the facility and the provider(s) who treated you. This is called "split billing" and is legal, but all bills must be itemized and justified individually.</p>
      
      <p>The two most important billing codes are <strong>CPT (Current Procedural Terminology)</strong> and <strong>ICD (International Classification of Diseases)</strong>. CPT codes describe what was done (surgery, lab test, office visit). ICD codes describe why it was done (diagnosis). These codes must match logically. For example, a CPT code for a knee X-ray should be paired with an ICD code like "knee pain," not "headache." Illogical pairings trigger automatic insurance denials—your provider should fix and resubmit.</p>
      
      <p>Understand the difference between <strong>"balance billing"</strong> and <strong>"cost-sharing"</strong>. Cost-sharing (deductibles, copays, coinsurance) is your legal responsibility under your insurance contract. Balance billing is when an out-of-network provider bills you for the difference between what they charged and what insurance paid. Balance billing is illegal in many situations: emergency care, certain services at in-network facilities (No Surprises Act), and in states with comprehensive balance billing bans (e.g., New York, California, Florida).</p>
      
      <p>Under the <strong>Hospital Price Transparency Rule (45 CFR § 180.20)</strong>, all hospitals must publish a "machine-readable file" of their standard charges and a "consumer-friendly list" of shoppable services. If you're facing a non-emergency procedure, look up the cash price on the hospital's website. If they later charge you more than the published cash price, you can demand an adjustment. Hospitals are fined up to $2 million per year for non-compliance, so they take this seriously.</p>
      
      <p>If you're <strong>uninsured or self-pay</strong>, ask for the "self-pay discount" upfront—before services are rendered. Hospitals typically charge uninsured patients 2-3 times more than insured patients, which is unconscionable but legal. Negotiate the cash price in writing before your procedure. Get a "good faith estimate" as required under the No Surprises Act. If the final bill exceeds the estimate by $400 or more, initiate a Patient-Provider Dispute Resolution process through CMS.</p>
      
      <p>Finally, know when to seek <strong>professional help</strong>. Medical billing advocates and patient advocates (often free through hospitals) can negotiate on your behalf. For bills over $10,000 or complex insurance disputes, consider consulting a healthcare attorney or using services like Dollar For (nonprofit) or CoPatient (paid service). For government insurance issues (Medicare/Medicaid), contact your State Health Insurance Assistance Program (SHIP) for free counseling.</p>
    `
  }
};

function renderResourcesSection() {
  const guides = [
    {
      title: "How to Dispute an Urgent Care Bill",
      summary: "Guide to lowering facility fees and checking for upcoding.",
      slug: "urgent-care-bill"
    },
    {
      title: "Prior Authorization Appeals",
      summary: "How to overturn medically necessary denials and request Peer-to-Peer reviews.",
      slug: "prior-authorization-appeals"
    },
    {
      title: "Claim Denial Survival Kit",
      summary: "Navigating ERISA guidelines and filing appeals with the DOI.",
      slug: "claim-denial-survival"
    },
    {
      title: "The No Surprises Act",
      summary: "Your shield against illegal out-of-network balance billing under federal law.",
      slug: "no-surprises-act"
    },
    {
      title: "Managing Medical Debt",
      summary: "Understanding IRS 501(r) and qualifying for non-profit Hospital Charity Care.",
      slug: "medical-debt-management"
    },
    {
      title: "Decoding Your Itemized Bill",
      summary: "Step-by-step guide to CPT/HCPCS code audits and identifying errors.",
      slug: "itemized-bill-audit"
    },
    {
      title: "Dealing with Collections Agencies",
      summary: "FDCPA rights and sending Debt Validation requests to protect your credit.",
      slug: "collections-agencies"
    },
    {
      title: "Medical Bill Dispute Strategy",
      summary: "Negotiating hospital charges using FAIR Health market data benchmarks.",
      slug: "bill-dispute-strategy"
    },
    {
      title: "How to Read an EOB",
      summary: "Finding insurance processing errors before you receive a provider bill.",
      slug: "eob-reading"
    },
    {
      title: "Medical Billing 101",
      summary: "A comprehensive overview of patient rights and transparent billing practices.",
      slug: "medical-billing-101"
    }
  ];

  const faqs = [
    {
      question: "Is FixMyMedicalBill really free to use?",
      answer: "Yes, <strong>FixMyMedicalBill</strong> is 100% free and requires no account or credit card. Our mission is to democratize access to <strong>medical bill dispute tools</strong> so every American can fight unfair charges without hiring expensive advocates. We believe healthcare billing transparency is a fundamental right. All tools, templates, and expert guides are completely free forever, with no hidden fees or premium tiers."
    },
    {
      question: "How do I lower a high medical bill?",
      answer: "Start by requesting an <strong>itemized bill</strong> to audit <strong>CPT codes</strong> for errors like duplicate charges or upcoding. Use federal laws like the <strong>No Surprises Act</strong> to challenge balance billing from out-of-network providers. Compare your charges against <strong>FAIR Health Consumer</strong> data to prove you were overcharged. Finally, negotiate directly with the hospital's financial counselor, offering to pay 40-60% of the balance as a lump sum settlement."
    },
    {
      question: "What is the No Surprises Act and how does it protect me?",
      answer: "The <strong>No Surprises Act</strong> (effective January 2022) prohibits <strong>surprise billing</strong> for emergency services and certain non-emergency services at in-network facilities. If an out-of-network provider treats you at an in-network hospital, you only owe the in-network cost-sharing amount. Violations can be reported to <strong>CMS</strong> at 1-800-985-3059. This law is one of the strongest patient protections ever enacted and applies to most commercial insurance plans nationwide."
    },
    {
      question: "Can I dispute a medical bill that's already in collections?",
      answer: "Absolutely. Under the <strong>Fair Debt Collection Practices Act (FDCPA)</strong>, you have the right to request <strong>debt validation</strong> within 30 days of the first collection notice. Send a certified letter demanding proof of the debt, and the collector must cease all activity until they provide documentation. Many <strong>medical debts in collections</strong> cannot be validated due to poor record-keeping. If the debt is time-barred (past your state's statute of limitations), they cannot legally sue you for payment."
    },
    {
      question: "What should I do if my insurance claim is denied?",
      answer: "First, carefully read the <strong>Explanation of Benefits (EOB)</strong> to understand the denial reason code. Common issues like incorrect CPT codes or missing prior authorization can often be fixed by your provider resubmitting the claim. For medical necessity denials, file an internal appeal citing your insurance policy's coverage language and clinical evidence supporting the treatment. Under <strong>ERISA</strong>, employer-sponsored plans must provide a full and fair review. If the internal appeal fails, request an external review by an independent third party—this process is free and overturns denials in 40-50% of cases."
    },
    {
      question: "How do I know if I qualify for charity care or financial assistance?",
      answer: "If you received care at a <strong>nonprofit hospital</strong>, you may qualify for free or discounted care under <strong>IRS Section 501(r)</strong>. Most hospitals offer charity care to patients earning up to 400% of the Federal Poverty Level (about $60,000 for individuals, $124,000 for families of four). Request the hospital's <strong>Financial Assistance Policy (FAP)</strong> and application immediately. Hospitals cannot send your debt to collections or report it to credit bureaus until at least 120 days after the first bill, giving you time to apply for assistance."
    },
    {
      question: "What is an itemized bill and why is it important?",
      answer: "An <strong>itemized bill</strong> (also called a detailed statement) lists every charge with its corresponding <strong>CPT code</strong>, date of service, quantity, and price. This is the only way to verify you're being charged correctly. Federal law requires hospitals to provide itemized bills upon request within 30 days. Review it carefully for duplicate charges, incorrect codes, and unbundled services. Studies show that 30-80% of hospital bills contain errors. Disputing errors with evidence from an itemized bill dramatically increases your chances of a reduction."
    },
    {
      question: "Can medical debt hurt my credit score?",
      answer: "As of 2023, paid <strong>medical debt</strong> must be immediately removed from credit reports, and unpaid medical debts under $500 should not be reported at all. Additionally, medical debts cannot appear on your credit report until they are at least 180 days past due. These are significant consumer protections under the <strong>Fair Credit Reporting Act (FCRA)</strong>. If you're facing collections, negotiate a 'pay-for-delete' agreement where the collector removes the debt from your credit report in exchange for payment. Get this agreement in writing before sending any money."
    },
    {
      question: "What is prior authorization and why was my treatment denied?",
      answer: "<strong>Prior authorization</strong> is an insurance requirement that your doctor must get approval before providing certain treatments, procedures, or medications. Denials are often based on outdated clinical guidelines or misinterpretation of medical necessity. You have the right to appeal under <strong>ERISA § 503</strong> and request a <strong>Peer-to-Peer Review</strong> where your doctor speaks directly with the insurer's medical director. Cite Medicare coverage determinations (NCDs/LCDs) and peer-reviewed studies to strengthen your appeal. For urgent cases, demand an expedited review within 72 hours."
    },
    {
      question: "How long do I have to dispute a medical bill?",
      answer: "Time limits vary by state and situation. For billing errors, act immediately—most hospitals only allow 30-90 days to dispute charges after receiving a bill. For <strong>insurance claim appeals</strong>, you typically have 180 days from the denial date to file an internal appeal. For <strong>collections debt validation</strong>, you must send your request within 30 days of the first collection notice. For balance billing violations under the <strong>No Surprises Act</strong>, you can file complaints with CMS or your state insurance department within one year. Never wait—the sooner you dispute, the stronger your case."
    }
  ];

  const guideCards = guides.map((guide, index) => `
    <a href="/guide/${guide.slug}" class="resource-card" data-route="/guide/${guide.slug}">
      <div class="resource-number">${String(index + 1).padStart(2, '0')}</div>
      <h3 class="resource-title">${guide.title}</h3>
      <p class="resource-summary">${guide.summary}</p>
    </a>
  `).join('');

  const faqItems = faqs.map((faq, index) => `
    <div class="faq-item" data-faq-index="${index}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
        <h3 class="faq-question-text">${faq.question}</h3>
        <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="faq-answer" id="faq-answer-${index}">
        <p class="faq-answer-text">${faq.answer}</p>
      </div>
    </div>
  `).join('');

  return `
    <section id="resources" class="section resources-section">
      <h2 class="h2">Expert Guides</h2>
      <p class="text resources-subtitle">Comprehensive resources to help you navigate medical billing disputes with confidence.</p>
      <div class="resources-grid">
        ${guideCards}
      </div>
      
      <div id="faq" class="faq-section">
        <h2 class="h2">Frequently Asked Questions</h2>
        <div class="faq-list">
          ${faqItems}
        </div>
      </div>
    </section>
  `;
}

function renderGuidePage(slug) {
  const guide = guideContent[slug];
  
  if (!guide) {
    // If guide not found, redirect to home
    window.history.pushState({}, "", "/");
    renderHomePage();
    return;
  }

  // Update meta tags for SEO
  document.title = `${guide.title} | FixMyMedicalBill`;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${guide.summary} Free professional dispute tools. ${guide.readingTime} read.`);
  }

  const app = document.querySelector("#app");
  app.innerHTML = `
    ${renderHeader()}
    <main class="main info-main">
      <article class="info-article guide-article">
        <a href="/" class="back-link" data-route="/">
          <span class="back-link-icon">←</span>
          <span>All Guides</span>
        </a>
        
        <p class="info-eyebrow">EXPERT GUIDE</p>
        <h1>${guide.title}</h1>
        
        <div class="guide-meta">
          <span class="guide-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${guide.readingTime} read
          </span>
          <span class="guide-meta-dot">•</span>
          <span class="guide-meta-item">Updated ${guide.lastUpdated}</span>
        </div>
        
        <div class="guide-content">
          ${guide.content}
        </div>
        
        <div class="guide-cta">
          <div class="guide-cta-inner">
            <h3>Ready to Take Action?</h3>
            <p>Generate your professional dispute letter in minutes using our <strong>${guide.relatedToolName}</strong>.</p>
            <a href="${guide.relatedTool}" class="btn btn-primary" data-route="${guide.relatedTool}">
              Start Your Formal Dispute Now — 100% Free
              <span>→</span>
            </a>
          </div>
        </div>
      </article>
      ${renderFooter()}
    </main>
  `;
  
  bindNavigation();
}

function renderFooter() {
  return `
    <footer class="footer">
      <div>FixMyMedicalBill</div>
      <div class="footer-links">
        <a href="/privacy-policy" data-route="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service" data-route="/terms-of-service">Terms of Service</a>
        <a href="/about-us" data-route="/about-us">About Us</a>
      </div>
    </footer>
  `;
}

function renderInfoPage(routePath) {
  const info = infoPages[routePath];
  if (!info) {
    renderHomePage();
    return;
  }

  const sections = info.sections
    .map(
      (section) => `
        <section class="info-section">
          <h2>${section.heading}</h2>
          <p>${section.body}</p>
        </section>
      `
    )
    .join("");

  document.querySelector("#app").innerHTML = `
    <div class="wrap">
      ${renderHeader()}
      <main class="main info-main">
        <article class="info-article">
          <p class="info-eyebrow">${info.description}</p>
          <h1>${info.title}</h1>
          ${sections}
        </article>
        <a class="back-link" href="/" data-route="/">
          <span class="back-link-icon" aria-hidden="true">⟵</span>
          <span>Back to All Tools</span>
        </a>
        ${renderFooter()}
      </main>
    </div>
  `;
}

function getToolSectionMarkup(sectionId) {
  switch (sectionId) {
    case "dispute-letter-tool":
      return `
        <section id="dispute-letter-tool" class="section tool-section">
          <h2 class="h2">Medical Bill Dispute Letter Generator</h2>
          <p class="text tool-subtitle">Generate a copy-ready letter, phone script, and a PDF in minutes.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="dispute-letter-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="disputeTarget">Dispute target</label>
                      <select id="disputeTarget" name="disputeTarget" required>
                        <option>Hospital</option>
                        <option>Doctor</option>
                        <option>Lab</option>
                        <option>Insurance</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="issueType">Issue type</label>
                      <select id="issueType" name="issueType" required>
                        <option>Duplicate charge</option>
                        <option>Service not received</option>
                        <option>Wrong procedure/code</option>
                        <option>Overcharge / incorrect amount</option>
                        <option>Out-of-network / surprise billing</option>
                        <option>Request itemized bill</option>
                        <option>Claim denied (insurance)</option>
                        <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="billAmount">Bill amount</label>
                      <input id="billAmount" name="billAmount" type="text" placeholder="$1,240" />
                    </div>
                    <div class="field">
                      <label for="dateOfService">Date of service</label>
                      <input id="dateOfService" name="dateOfService" type="text" placeholder="MM/DD/YYYY" />
                    </div>
                    <div class="field">
                      <label for="providerName">Provider name</label>
                      <input id="providerName" name="providerName" type="text" placeholder="Provider or facility" />
                    </div>
                    <div class="field">
                      <label for="accountNumber">Account number</label>
                      <input id="accountNumber" name="accountNumber" type="text" placeholder="Account #" />
                    </div>
                    <div class="field">
                      <label for="patientName">Patient name</label>
                      <input id="patientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="patientPhone">Patient phone</label>
                      <input id="patientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="patientEmail">Patient email</label>
                      <input id="patientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="patientAddress">Patient address</label>
                      <textarea id="patientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Dispute Letter</div>
                    </div>
                    <pre id="letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "claim-denied":
      return `
        <section id="claim-denied" class="section tool-section">
          <h2 class="h2">Insurance Claim Denied</h2>
          <p class="text tool-subtitle">Generate a professional appeal letter, phone script, and PDF fast.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="claim-denied-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="insuranceCompany">Insurance company</label>
                      <input id="insuranceCompany" name="insuranceCompany" type="text" placeholder="Insurance name" />
                    </div>
                    <div class="field">
                      <label for="claimNumber">Claim number</label>
                      <input id="claimNumber" name="claimNumber" type="text" placeholder="Claim #" />
                    </div>
                    <div class="field">
                      <label for="policyNumber">Policy number</label>
                      <input id="policyNumber" name="policyNumber" type="text" placeholder="Policy #" />
                    </div>
                    <div class="field">
                      <label for="denialReason">Denial reason</label>
                      <select id="denialReason" name="denialReason" required>
                        <option>Medically Unnecessary</option>
                        <option>Prior Auth Missing</option>
                        <option>Out-of-network</option>
                        <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="claimPatientName">Patient name</label>
                      <input id="claimPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="claimPatientPhone">Patient phone</label>
                      <input id="claimPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="claimPatientEmail">Patient email</label>
                      <input id="claimPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="claimPatientAddress">Patient address</label>
                      <textarea id="claimPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Appeal Letter</div>
                    </div>
                    <pre id="claim-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="claim-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "urgent-care":
      return `
        <section id="urgent-care" class="section tool-section">
          <h2 class="h2">Urgent Care Bill</h2>
          <p class="text tool-subtitle">Challenge high urgent care charges with a clear dispute letter.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="urgent-care-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="facilityName">Facility name</label>
                      <input id="facilityName" name="facilityName" type="text" placeholder="Urgent care facility" />
                    </div>
                    <div class="field">
                      <label for="dateOfVisit">Date of visit</label>
                      <input id="dateOfVisit" name="dateOfVisit" type="text" placeholder="MM/DD/YYYY" />
                    </div>
                    <div class="field">
                      <label for="totalAmount">Total amount</label>
                      <input id="totalAmount" name="totalAmount" type="text" placeholder="$850" />
                    </div>
                    <div class="field">
                      <label for="urgentIssueType">Issue type</label>
                      <select id="urgentIssueType" name="issueType" required>
                        <option>High Facility Fee</option>
                        <option>Upcoding/Wrong Level</option>
                        <option>Unclear Charges</option>
                        <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="urgentPatientName">Patient name</label>
                      <input id="urgentPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="urgentPatientPhone">Patient phone</label>
                      <input id="urgentPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="urgentPatientEmail">Patient email</label>
                      <input id="urgentPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="urgentPatientAddress">Patient address</label>
                      <textarea id="urgentPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Dispute Letter</div>
                    </div>
                    <pre id="urgent-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="urgent-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "out-of-network":
      return `
        <section id="out-of-network" class="section tool-section">
          <h2 class="h2">Out-of-Network Bill</h2>
          <p class="text tool-subtitle">Generate a No Surprises Act dispute letter and call script.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="out-of-network-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="oonFacilityName">Facility/Provider name</label>
                      <input id="oonFacilityName" name="facilityName" type="text" placeholder="Facility or provider" />
                    </div>
                    <div class="field">
                      <label for="oonDateOfService">Date of service</label>
                      <input id="oonDateOfService" name="dateOfService" type="text" placeholder="MM/DD/YYYY" />
                    </div>
                    <div class="field">
                      <label for="oonTotalAmount">Total amount</label>
                      <input id="oonTotalAmount" name="totalAmount" type="text" placeholder="$1,850" />
                    </div>
                    <d  <option>Unsure / Complexity not listed</option>
                        <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field field-full custom-input-wrapper" id="oonSituation-custom" style="display: none;">
                      <label for="oonSituation-customReason">Describe your specific situation</label>
                      <textarea id="oonSituation-customReason" name="customReason" rows="4" placeholder="Please describe your out-of-network billing situation..."></textarea="field">
                      <label for="oonSituation">Situation</label>
                      <select id="oonSituation" name="situation" required>
                        <option>Emergency Visit</option>
                        <option>Non-emergency but no choice of provider</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="oonPatientName">Patient name</label>
                      <input id="oonPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="oonPatientPhone">Patient phone</label>
                      <input id="oonPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="oonPatientEmail">Patient email</label>
                      <input id="oonPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="oonPatientAddress">Patient address</label>
                      <textarea id="oonPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Dispute Letter</div>
                    </div>
                    <pre id="oon-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="oon-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "itemized-bill":
      return `
        <section id="itemized-bill" class="section tool-section">
          <h2 class="h2">Request Itemized Bill</h2>
          <p class="text tool-subtitle">Request a full itemized bill before paying.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="itemized-bill-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="itemizedFacilityName">Facility name</label>
                      <input id="itemizedFacilityName" name="facilityName" type="text" placeholder="Facility or provider" />
                    </div>
                    <div class="field">
                      <label for="itemizedDateOfVisit">Date of visit</label>
                      <input id="itemizedDateOfVisit" name="dateOfVisit" type="text" placeholder="MM/DD/YYYY" />
                    </div>
                    <div class="field">
                      <label for="itemizedAccountNumber">Account number</label>
                      <input id="itemizedAccountNumber" name="accountNumber" type="text" placeholder="Account #" />
                    </div>
                    <div class="field">
                      <label for="itemizedPatientName">Patient name</label>
                      <input id="itemizedPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="itemizedPatientPhone">Patient phone</label>
                      <input id="itemizedPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="itemizedPatientEmail">Patient email</label>
                      <input id="itemizedPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="itemizedPatientAddress">Patient address</label>
                      <textarea id="itemizedPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Itemized Bill Request</div>
                    </div>
                    <pre id="itemized-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="itemized-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "medical-debt":
      return `
        <section id="medical-debt" class="section tool-section">
          <h2 class="h2">Medical Debt Help</h2>
          <p class="text tool-subtitle">Request financial assistance or a fair payment plan.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="medical-debt-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="debtProviderName">Hospital/Provider name</label>
                      <input id="debtProviderName" name="providerName" type="text" placeholder="Hospital or provider" />
                    </div>
                    <div class="field">
                      <label for="debtAccountNumber">Account number</label>
                      <input id="debtAccountNumber" name="accountNumber" type="text" placeholder="Account #" />
                    </div>
                    <div class="field">
                      <label for="debtTotalAmount">Total debt amount</label>
                      <input id="debtTotalAmount" name="totalDebtAmount" type="text" placeholder="$4,250" />
                    </div>
                    <div class="field">
                      <label for="debtHouseholdIncome">Annual household income</label>
                      <input id="debtHouseholdIncome" name="householdIncome" type="text" placeholder="$58,000" />
                    </div>
                    <div class="field">
                      <label for="debtHouseholdSize">Household size</label>
                      <input id="debtHouseholdSize" name="householdSize" type="text" placeholder="3" />
                    </div>
                    <div class="field field-full">
                      <label for="debtSpecialCircumstances">Special Circumstances (Optional)</label>
                      <textarea id="debtSpecialCircumstances" name="specialCircumstances" rows="4" placeholder="Describe any special financial circumstances (job loss, medical emergency, etc.)..."></textarea>
                    </div>
                    <div class="field">
                      <label for="debtPatientName">Patient name</label>
                      <input id="debtPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="debtPatientPhone">Patient phone</label>
                      <input id="debtPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="debtPatientEmail">Patient email</label>
                      <input id="debtPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="debtPatientAddress">Patient address</label>
                      <textarea id="debtPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Financial Assistance Letter</div>
                    </div>
                    <pre id="debt-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="debt-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "collections":
      return `
        <section id="collections" class="section tool-section">
          <h2 class="h2">Collections / Past Due</h2>
          <p class="text tool-subtitle">Request debt validation and pause collections activity.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="collections-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="collectionAgencyName">Collection agency name</label>
                      <input id="collectionAgencyName" name="agencyName" type="text" placeholder="Agency name" />
                    </div>
                    <div class="field">
                      <label for="collectionOriginalProvider">Original provider</label>
                      <input id="collectionOriginalProvider" name="originalProvider" type="text" placeholder="Provider or facility" />
                    </div>
                    <div class="field">
                      <label for="collectionAccountNumber">Account number</label>
                      <input id="collectionAccountNumber" name="accountNumber" type="text" placeholder="Account #" />
                    </div>
                    <div class="field">
                      <label for="collectionDebtAmount">Debt amount</label>
                      <input id="collectionDebtAmount" name="debtAmount" type="text" placeholder="$2,150" />
                    </div>
                    <div class="field">
                      <label for="collectionIssueType">Issue type</label>
                      <select id="collectionIssueType" name="issueType" required>
                        <option>Not my debt</option>
                        <option>Incorrect amount</option>
                        <option>Identity theft</option>
                        <option>Statute of limitations</option>
                        <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="collectionPatientName">Patient name</label>
                      <input id="collectionPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="collectionPatientPhone">Patient phone</label>
                      <input id="collectionPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="collectionPatientEmail">Patient email</label>
                      <input id="collectionPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="collectionPatientAddress">Patient address</label>
                      <textarea id="collectionPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Debt Validation Letter</div>
                    </div>
                    <pre id="collections-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="collections-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "prior-auth":
      return `
        <section id="prior-auth" class="section tool-section">
          <h2 class="h2">Prior Authorization</h2>
          <p class="text tool-subtitle">Request or appeal prior authorization for necessary care.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="prior-auth-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="priorAuthInsuranceCompany">Insurance company</label>
                      <input id="priorAuthInsuranceCompany" name="insuranceCompany" type="text" placeholder="Insurance name" />
                    </  <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field field-full custom-input-wrapper" id="priorAuthReason-custom" style="display: none;">
                      <label for="priorAuthReason-customReason">Describe your specific situation</label>
                      <textarea id="priorAuthReason-customReason" name="customReason" rows="4" placeholder="Please describe your prior authorization situation..."></textarea
                    <div class="field">
                      <label for="priorAuthProviderName">Provider name</label>
                      <input id="priorAuthProviderName" name="providerName" type="text" placeholder="Provider or facility" />
                    </div>
                    <div class="field">
                      <label for="priorAuthService">Procedure/Service</label>
                      <input id="priorAuthService" name="service" type="text" placeholder="Procedure name" />
                    </div>
                    <div class="field">
                      <label for="priorAuthReason">Reason for request</label>
                      <select id="priorAuthReason" name="requestReason" required>
                        <option>New Request</option>
                        <option>Appeal of Denied Auth</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="priorAuthPatientName">Patient name</label>
                      <input id="priorAuthPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="priorAuthPatientPhone">Patient phone</label>
                      <input id="priorAuthPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="priorAuthPatientEmail">Patient email</label>
                      <input id="priorAuthPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="priorAuthPatientAddress">Patient address</label>
                      <textarea id="priorAuthPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Prior Authorization Letter</div>
                    </div>
                    <pre id="prior-auth-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="prior-auth-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    default:
      return "";
  }
}

function renderHomePage() {
  const cards = toolRoutes
    .map(
      (tool) => `
      <a class="card" href="${tool.routePath}" data-route="${tool.routePath}">
        <div class="card-header">
          <div class="card-title">${tool.title}</div>
          <div class="card-badge">${tagForTitle(tool.title)}</div>
        </div>
        <div class="card-desc">${tool.desc}</div>
        <div class="card-cta">Open tool <span class="arrow">→</span></div>
      </a>
    `
    )
    .join("");

  document.querySelector("#app").innerHTML = `
    <div class="wrap">
      ${renderHeader()}
      <main class="main">
        ${renderHero()}
        ${renderSuccessStories()}
        ${renderToolsSection(cards)}
        ${renderResourcesSection()}
        ${renderFooter()}
      </main>
    </div>
  `;
  
  // Initialize FAQ accordion interactions
  initFaqAccordion();
  
  // Inject FAQ Schema for SEO
  injectFAQSchema();
}

// Inject FAQPage JSON-LD Schema for Google Search
function injectFAQSchema() {
  // Remove any existing FAQ schema
  const existingSchema = document.querySelector('script[data-schema="faq"]');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  const faqs = [
    {
      question: "Is FixMyMedicalBill really free to use?",
      answer: "Yes, FixMyMedicalBill is 100% free and requires no account or credit card. Our mission is to democratize access to medical bill dispute tools so every American can fight unfair charges without hiring expensive advocates. We believe healthcare billing transparency is a fundamental right. All tools, templates, and expert guides are completely free forever, with no hidden fees or premium tiers."
    },
    {
      question: "How do I lower a high medical bill?",
      answer: "Start by requesting an itemized bill to audit CPT codes for errors like duplicate charges or upcoding. Use federal laws like the No Surprises Act to challenge balance billing from out-of-network providers. Compare your charges against FAIR Health Consumer data to prove you were overcharged. Finally, negotiate directly with the hospital's financial counselor, offering to pay 40-60% of the balance as a lump sum settlement."
    },
    {
      question: "What is the No Surprises Act and how does it protect me?",
      answer: "The No Surprises Act (effective January 2022) prohibits surprise billing for emergency services and certain non-emergency services at in-network facilities. If an out-of-network provider treats you at an in-network hospital, you only owe the in-network cost-sharing amount. Violations can be reported to CMS at 1-800-985-3059. This law is one of the strongest patient protections ever enacted and applies to most commercial insurance plans nationwide."
    },
    {
      question: "Can I dispute a medical bill that's already in collections?",
      answer: "Absolutely. Under the Fair Debt Collection Practices Act (FDCPA), you have the right to request debt validation within 30 days of the first collection notice. Send a certified letter demanding proof of the debt, and the collector must cease all activity until they provide documentation. Many medical debts in collections cannot be validated due to poor record-keeping. If the debt is time-barred (past your state's statute of limitations), they cannot legally sue you for payment."
    },
    {
      question: "What should I do if my insurance claim is denied?",
      answer: "First, carefully read the Explanation of Benefits (EOB) to understand the denial reason code. Common issues like incorrect CPT codes or missing prior authorization can often be fixed by your provider resubmitting the claim. For medical necessity denials, file an internal appeal citing your insurance policy's coverage language and clinical evidence supporting the treatment. Under ERISA, employer-sponsored plans must provide a full and fair review. If the internal appeal fails, request an external review by an independent third party—this process is free and overturns denials in 40-50% of cases."
    },
    {
      question: "How do I know if I qualify for charity care or financial assistance?",
      answer: "If you received care at a nonprofit hospital, you may qualify for free or discounted care under IRS Section 501(r). Most hospitals offer charity care to patients earning up to 400% of the Federal Poverty Level (about $60,000 for individuals, $124,000 for families of four). Request the hospital's Financial Assistance Policy (FAP) and application immediately. Hospitals cannot send your debt to collections or report it to credit bureaus until at least 120 days after the first bill, giving you time to apply for assistance."
    },
    {
      question: "What is an itemized bill and why is it important?",
      answer: "An itemized bill (also called a detailed statement) lists every charge with its corresponding CPT code, date of service, quantity, and price. This is the only way to verify you're being charged correctly. Federal law requires hospitals to provide itemized bills upon request within 30 days. Review it carefully for duplicate charges, incorrect codes, and unbundled services. Studies show that 30-80% of hospital bills contain errors. Disputing errors with evidence from an itemized bill dramatically increases your chances of a reduction."
    },
    {
      question: "Can medical debt hurt my credit score?",
      answer: "As of 2023, paid medical debt must be immediately removed from credit reports, and unpaid medical debts under $500 should not be reported at all. Additionally, medical debts cannot appear on your credit report until they are at least 180 days past due. These are significant consumer protections under the Fair Credit Reporting Act (FCRA). If you're facing collections, negotiate a 'pay-for-delete' agreement where the collector removes the debt from your credit report in exchange for payment. Get this agreement in writing before sending any money."
    },
    {
      question: "What is prior authorization and why was my treatment denied?",
      answer: "Prior authorization is an insurance requirement that your doctor must get approval before providing certain treatments, procedures, or medications. Denials are often based on outdated clinical guidelines or misinterpretation of medical necessity. You have the right to appeal under ERISA § 503 and request a Peer-to-Peer Review where your doctor speaks directly with the insurer's medical director. Cite Medicare coverage determinations (NCDs/LCDs) and peer-reviewed studies to strengthen your appeal. For urgent cases, demand an expedited review within 72 hours."
    },
    {
      question: "How long do I have to dispute a medical bill?",
      answer: "Time limits vary by state and situation. For billing errors, act immediately—most hospitals only allow 30-90 days to dispute charges after receiving a bill. For insurance claim appeals, you typically have 180 days from the denial date to file an internal appeal. For collections debt validation, you must send your request within 30 days of the first collection notice. For balance billing violations under the No Surprises Act, you can file complaints with CMS or your state insurance department within one year. Never wait—the sooner you dispute, the stronger your case."
    }
  ];
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<strong>/g, '').replace(/<\/strong>/g, '')
      }
    }))
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'faq');
  script.textContent = JSON.stringify(faqSchema);
  document.head.appendChild(script);
}

// FAQ Accordion Interaction Logic
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (!button || !answer) return;
    
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Toggle current FAQ
      if (isOpen) {
        item.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0px';
      } else {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        // Set maxHeight to scrollHeight for smooth transition
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

function renderToolPage(routePath) {
  const tool = toolRoutes.find((item) => item.routePath === routePath);
  if (!tool) {
    renderHomePage();
    return;
  }

  const seoCopy = toolSeoCopy[routePath] || "";
  const toolSection = getToolSectionMarkup(tool.sectionId);

  document.querySelector("#app").innerHTML = `
    <div class="wrap">
      ${renderHeader()}
      <main class="main">
        <div class="tool-seo">
          <p class="text">${seoCopy}</p>
        </div>
        ${toolSection}
        <a class="back-link" href="/" data-route="/">
          <span class="back-link-icon" aria-hidden="true">⟵</span>
          <span>Back to All Tools</span>
        </a>
        ${renderFooter()}
      </main>
    </div>
  `;
}

function navigate(path) {
  if (window.location.pathname !== path) {
    history.pushState({}, "", path);
  }
  router();
}

function bindNavigation() {
  const homeLink = document.querySelector("[data-home]");
  if (homeLink) {
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("/");
    });
  }

  document.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const route = link.getAttribute("data-route");
      if (route) {
        navigate(route);
      }
    });
  });
}

function formatCurrencyInput(value) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const number = Number(digits);
  return `$${number.toLocaleString("en-US")}`;
}

function formatDateInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const parts = [];
  if (digits.length >= 2) parts.push(digits.slice(0, 2));
  if (digits.length >= 4) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  return parts.join("/");
}

function applyInputEnhancements(form) {
  const currencyFields = new Set(["billAmount", "totalAmount", "totalDebtAmount", "householdIncome", "debtAmount"]);

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.classList.add("accent-focus");
  });

  form.querySelectorAll("input[name]").forEach((input) => {
    if (currencyFields.has(input.name)) {
      input.addEventListener("input", () => {
        input.value = formatCurrencyInput(input.value);
      });
    }

    if (input.name.toLowerCase().includes("date")) {
      input.addEventListener("input", () => {
        input.value = formatDateInput(input.value);
      });
    }

    if (input.name.toLowerCase().includes("name")) {
      input.addEventListener("blur", () => {
        const parts = input.value
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
        input.value = parts.join(" ");
      });
    }
  });
}

function setupTool(options) {
  const form = document.querySelector(`#${options.formId}`);
  if (!form) return;

  const section = form.closest("section");
  if (!section) return;

  applyInputEnhancements(form);

  // Apple Premium Dynamic Custom Input System
  // Dynamically creates/removes custom input fields when "Other" is selected
  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    // Check if this select has "Other" option
    const hasOtherOption = Array.from(select.options).some(opt => opt.value === "Other");
    if (!hasOtherOption) return;

    select.addEventListener("change", () => {
      const parentField = select.closest('.field');
      if (!parentField) return;

      // Check if custom field already exists as next sibling
      const existingCustom = parentField.nextElementSibling?.classList.contains('custom-field-container') 
        ? parentField.nextElementSibling 
        : null;

      if (select.value === "Other") {
        // Create custom input field if it doesn't exist
        if (!existingCustom) {
          const uniqueId = `custom-textarea-${select.id}`;
          const customDiv = document.createElement('div');
          customDiv.className = 'field custom-field-container';
          customDiv.style.cssText = 'display: none; opacity: 0;';
          customDiv.innerHTML = `
            <label for="${uniqueId}" class="custom-label">Please describe your specific situation</label>
            <textarea id="${uniqueId}" name="customReason" class="custom-textarea" rows="4" placeholder="Provide details about your issue..." required></textarea>
          `;
          
          // Insert as next sibling with smooth animation
          parentField.insertAdjacentElement('afterend', customDiv);
          
          // Trigger animation after DOM insertion
          requestAnimationFrame(() => {
            customDiv.style.transition = 'opacity 0.3s cubic-bezier(0.28, 0.11, 0.32, 1), transform 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)';
            customDiv.style.display = 'block';
            customDiv.style.opacity = '1';
            
            // Focus textarea for Apple premium UX
            const textarea = customDiv.querySelector('textarea');
            if (textarea) {
              setTimeout(() => textarea.focus(), 100);
            }
          });
        }
      } else if (existingCustom) {
        // Smooth fade-out animation before removal
        existingCustom.style.opacity = '0';
        existingCustom.style.transform = 'translateY(-10px)';
        setTimeout(() => existingCustom.remove(), 300);
      }
    });
  });

  const letterOutput = section.querySelector(`#${options.letterOutputId}`);
  const scriptOutput = section.querySelector(`#${options.scriptOutputId}`);
  const copyButtons = section.querySelectorAll("[data-copy]");
  const downloadButton = section.querySelector("[data-download='pdf']");
  const actionButtons = section.querySelectorAll(".tool-actions button[data-copy], .tool-actions button[data-download]");

  if (!letterOutput || !scriptOutput) return;

  const generateButton = form.querySelector("button[type='submit']");
  const requiredFields = Array.from(form.querySelectorAll("[required]"));

  const updateGenerateState = () => {
    if (!generateButton) return;
    const allFilled = requiredFields.every((field) => field.value.trim());
    generateButton.classList.toggle("is-muted", !allFilled);
  };

  updateGenerateState();
  form.addEventListener("input", updateGenerateState);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const result = options.generate(data);

    letterOutput.textContent = result.letter;
    scriptOutput.textContent = result.script;
    letterOutput.classList.remove("is-empty");
    scriptOutput.classList.remove("is-empty");

    actionButtons.forEach((button) => {
      button.disabled = false;
    });
  });

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const target = button.getAttribute("data-copy");
      const content = target === "letter" ? letterOutput.textContent : scriptOutput.textContent;
      if (!content) return;

      const originalText = button.textContent;
      try {
        await navigator.clipboard.writeText(content);
        button.textContent = "Copied";
        button.classList.add("is-success");
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("is-success");
        }, 1200);
      } catch (error) {
        button.textContent = "Copy failed";
        setTimeout(() => {
          button.textContent = originalText;
        }, 1600);
      }
    });
  });

  if (downloadButton) {
    downloadButton.addEventListener("click", () => {
      const content = letterOutput.textContent;
      if (!content) return;

      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const margin = 54;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const dateText = new Date().toLocaleDateString();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(options.pdfHeader, margin, 48);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const dateWidth = doc.getTextWidth(dateText);
      doc.text(dateText, pageWidth - margin - dateWidth, 48);

      doc.setFontSize(11);
      const wrapped = doc.splitTextToSize(content, pageWidth - margin * 2);
      let cursorY = 80;

      wrapped.forEach((line) => {
        if (cursorY > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        doc.text(line, margin, cursorY);
        cursorY += 18;
      });

      doc.save(options.pdfFileName);
    });
  }
}
function generateDisputeContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  
  // Handle "Other" option with custom input
  let issue;
  if (data.issueType === "Other" && data.customReason) {
    issue = {
      letter: `This dispute is based on the following specific circumstances: ${data.customReason.trim()}`,
      script: `I'm disputing this bill because: ${data.customReason.trim()}`
    };
  } else {
    issue = issueTemplates[data.issueType] || {
      letter: "I am requesting a formal audit of this bill for accuracy, including a review of medical records and coding.",
      script: "I am requesting a formal audit of this bill for accuracy.",
    };
  }
  const issueLetter = normalizeHello(issue.letter);

  const today = new Date().toLocaleDateString();
  const disputeTarget = clean(data.disputeTarget, "Dispute Target");
  const billAmount = clean(data.billAmount, "Bill Amount");
  const dateOfService = clean(data.dateOfService, "Date of Service");
  const providerName = clean(data.providerName, "Provider Name");
  const accountNumber = clean(data.accountNumber, "Account Number");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");

  const letter = `${today}

To: ${disputeTarget} Billing & Compliance Department
Re: Formal Dispute of Medical Bill & Request for Audit
Provider: ${providerName}
Account: ${accountNumber}
Patient: ${patientName}
Date of service: ${dateOfService}
Amount in dispute: ${billAmount}

To Whom It May Concern:

I am writing to formally dispute the balance on the above-referenced account. 

${issueLetter}

Please place my account on an immediate collections hold while this dispute is investigated. I expect a written response within 30 days detailing your findings, the exact CPT/HCPCS codes billed, and an adjusted statement reflecting the corrected balance.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I am calling to formally dispute the charges on account ${accountNumber} for my visit on ${dateOfService}. ${issue.script} Please place a hold on my account from entering collections while this is under review, and send me the audit results in writing.`;

  return { letter, script };
}

function generateClaimDeniedContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const insuranceCompany = clean(data.insuranceCompany, "Insurance Company");
  const claimNumber = clean(data.claimNumber, "Claim Number");
  const policyNumber = clean(data.policyNumber, "Policy Number");
  const denialReason = clean(data.denialReason, "Denial Reason");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  
  // Handle "Other" option with custom input
  let issue;
  if (data.denialReason === "Other" && data.customReason) {
    issue = {
      letter: `This appeal is based on the following specific circumstances: ${data.customReason.trim()}`,
      script: `I'm appealing because: ${data.customReason.trim()}`
    };
  } else {
    const templateKey = `Claim denied — ${data.denialReason || "Medically Unnecessary"}`;
    issue = issueTemplates[templateKey] || issueTemplates["Claim denied (insurance)"];
  }

  const letter = `${today}

To: ${insuranceCompany} Appeals & Grievances Department
Re: Formal Appeal of Claim Denial
Claim Number: ${claimNumber}
Policy Number: ${policyNumber}
Stated Denial Reason: ${denialReason}

To the Appeals Department:

I am writing to formally appeal the adverse determination (denial) of claim #${claimNumber}. 

${issue.letter}

Under federal and state law, I am entitled to a full and fair review. I request that a board-certified physician in the relevant specialty review this case. If this appeal is denied, I will escalate this matter by filing a formal grievance with the State Department of Insurance. 

I expect a written resolution within the legally mandated 30-day timeframe.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}`;

  const script = `Hello, my name is ${patientName}. I'm calling to initiate a formal level 1 appeal for claim #${claimNumber} that was denied for ${denialReason}. ${issue.script} I also need you to mail me the specific Evidence of Coverage (EOC) language used to deny this claim.`;

  return { letter, script };
}
function generateUrgentCareContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const facilityName = clean(data.facilityName, "Facility Name");
  const dateOfVisit = clean(data.dateOfVisit, "Date of Visit");
  const totalAmount = clean(data.totalAmount, "Total Amount");
  const issueType = clean(data.issueType, "Issue Type");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  const issue = issueTemplates[`Urgent care — ${data.issueType || "High Facility Fee"}`] || {
    letter:
      "I am disputing the charges for my visit on [Date]. The level of service billed (Level 4/5) does not align with the simple nature of the treatment received for a minor ailment. I request a review of the clinical documentation to justify these high-level codes and the associated facility fees.",
    script:
      "I’m calling to dispute a high bill from my urgent care visit. The level of service charged seems incorrect for the simple treatment I received. Can you review the billing codes?",
  };
  const issueLetter = normalizeHello(issue.letter);

  const letter = `${today}

To: ${facilityName} Billing Department
Re: Urgent care bill review
Date of visit: ${dateOfVisit}
Total amount: ${totalAmount}
Issue: ${issueType}

Hello,

${issueLetter.replace("[Date]", dateOfVisit)}

The service level billed appears inconsistent with the simple care provided. Please review the Facility Fee and the Clinical Documentation supporting the Level 4/5 codes and provide a written explanation or corrected balance.

Sincerely,
${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I'm calling about my urgent care visit on ${dateOfVisit} at ${facilityName}. ${issue.script} Please review the Facility Fee and Clinical Documentation and send the outcome in writing. My contact info is ${patientPhone} and ${patientEmail}.`;

  return { letter, script };
}
function generateOutOfNetworkContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const facilityName = clean(data.facilityName, "Facility/Provider Name");
  const dateOfService = clean(data.dateOfService, "Date of Service");
  const totalAmount = clean(data.totalAmount, "Total Amount");
  const situation = clean(data.situation, "Situation");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");

  // Handle "Other" option with custom input
  let situationLine;
  if (data.situation === "Other" && data.customReason) {
    situationLine = `This dispute is based on the following specific circumstances: ${data.customReason.trim()}`;
  } else if (data.situation === "Unsure / Complexity not listed") {
    situationLine = "I am disputing these out-of-network charges. I believe I am protected from balance billing under the Federal No Surprises Act, as I did not provide informed written consent to be treated by an out-of-network provider.";
  } else {
    situationLine = situation === "Emergency Visit"
        ? "As this was an emergency medical condition, I am protected from balance billing."
        : "As I received care at an in-network facility but was treated by an out-of-network provider without giving prior written consent, I am protected from balance billing.";
  }

  const letter = `${today}

To: ${facilityName} Billing Department
Re: Dispute of Out-of-Network Balance Bill (No Surprises Act)
Date of service: ${dateOfService}
Total amount billed: ${totalAmount}

To Whom It May Concern:

I am writing to formally dispute the out-of-network charges for the services rendered on ${dateOfService}. 

Under the Federal No Surprises Act (Public Health Service Act § 2799A-1), it is illegal for providers to balance bill patients for out-of-network emergency services or out-of-network non-emergency services provided at an in-network facility. 

${situationLine}

I am legally only responsible for my in-network cost-sharing amount. Please adjust this balance immediately. If this illegal balance billing is not corrected, I will submit a formal complaint to the federal No Surprises Help Desk and the State Attorney General.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}`;

  const script = `Hello, my name is ${patientName}. I received a surprise out-of-network bill for my visit on ${dateOfService} that violates the Federal No Surprises Act. ${situationLine} I expect this bill to be adjusted to my in-network rate immediately, or I will file a complaint with the federal CMS Help Desk.`;

  return { letter, script };
}
function generateItemizedBillContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const facilityName = clean(data.facilityName, "Facility Name");
  const dateOfVisit = clean(data.dateOfVisit, "Date of Visit");
  const accountNumber = clean(data.accountNumber, "Account Number");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");

  const letter = `${today}

To: ${facilityName} Medical Records / Billing Department
Re: Request for Unbundled Itemized Medical Bill
Account: ${accountNumber}
Date of visit: ${dateOfVisit}

To Whom It May Concern:

Pursuant to my rights under the HIPAA Privacy Rule (45 CFR § 164.524) and state consumer protection laws, I am formally requesting a complete, unbundled itemized bill for the account listed above.

This itemized statement MUST include:
1. Every individual service, supply, and medication provided.
2. The specific CPT, HCPCS, and Revenue codes for each item.
3. The individual unbundled price for each line item.

I will not make any payments until I have received this document and verified the charges for accuracy against my medical records. Please place a 30-day hold on this account and ensure it is not forwarded to collections during this time.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}`;

  const script = `Hello, my name is ${patientName}. For account ${accountNumber}, I am exercising my HIPAA rights to request a complete, unbundled itemized bill that includes all CPT and HCPCS codes. I will not be paying the balance until I review these codes. Please place a hold on my account so it does not go to collections.`;

  return { letter, script };
}
function generateMedicalDebtContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const providerName = clean(data.providerName, "Hospital/Provider Name");
  const accountNumber = clean(data.accountNumber, "Account Number");
  const totalDebtAmount = clean(data.totalDebtAmount, "Total Debt Amount");
  const householdIncome = clean(data.householdIncome, "Household Income");
  const householdSize = clean(data.householdSize, "Household Size");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  
  // Include special circumstances if provided
  const specialCircumstances = data.specialCircumstances && data.specialCircumstances.trim();
  const specialCircumstancesText = specialCircumstances 
    ? `\n\nAdditionally, I am facing the following special financial circumstances:\n${specialCircumstances}` 
    : '';

  const letter = `${today}

To: ${providerName} Financial Assistance Department
Re: Financial Assistance / Charity Care Request
Account: ${accountNumber}
Balance: ${totalDebtAmount}

Hello,

I am formally requesting consideration under your Financial Assistance Policy (Charity Care). Based on my current household income of ${householdIncome} and household size of ${householdSize}, I believe I may qualify for relief. If I do not qualify for a full waiver, I request a zero-interest payment plan that does not exceed 5% of my monthly discretionary income.${specialCircumstancesText}

Please confirm the required documentation, application steps, and timeline for review.

Sincerely,
${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I'm calling about account ${accountNumber} at ${providerName}. I'm requesting financial assistance or Charity Care based on my household income of ${householdIncome} and household size of ${householdSize}. If a full waiver is not available, I'd like a zero-interest plan capped at 5% of monthly discretionary income. My contact info is ${patientPhone} and ${patientEmail}.`;

  return { letter, script };
}
function generateCollectionsContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const agencyName = clean(data.agencyName, "Collection Agency Name");
  const originalProvider = clean(data.originalProvider, "Original Provider");
  const accountNumber = clean(data.accountNumber, "Account Number");
  const debtAmount = clean(data.debtAmount, "Debt Amount");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  
  // Handle "Other" option with custom input for issue type
  let disputeReason;
  if (data.issueType === "Other" && data.customReason) {
    disputeReason = `This debt validation request is based on the following specific circumstances:\n${data.customReason.trim()}`;
  } else if (data.issueType) {
    const issueTypeText = clean(data.issueType, "Issue Type");
    disputeReason = `I am disputing this debt because: ${issueTypeText}.`;
  } else {
    disputeReason = "I do not acknowledge this debt as mine at this time.";
  }

  const letter = `${today}

To: ${agencyName}
Re: Debt validation request (FDCPA)
Original provider: ${originalProvider}
Account: ${accountNumber}
Amount: ${debtAmount}

Hello,

I am formally requesting verification of this debt under the Fair Debt Collection Practices Act (FDCPA). ${disputeReason} Please provide the name and address of the original creditor and documentation proving I am responsible for this amount.

Cease and desist all collection activities and phone calls until this debt is fully verified in writing.

Sincerely,
${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I am requesting formal validation of this debt under the FDCPA. Please send all verification documents by mail and cease all collection calls until the debt is verified. My contact info is ${patientPhone} and ${patientEmail}.`;

  return { letter, script };
}
function generatePriorAuthContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const insuranceCompany = clean(data.insuranceCompany, "Insurance Company");
  const providerName = clean(data.providerName, "Provider Name");
  const service = clean(data.service, "Procedure/Service");
  const requestReason = clean(data.requestReason, "Reason for Request");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  
  // Handle "Other" option with custom input
  let reasonText;
  if (data.requestReason === "Other" && data.customReason) {
    reasonText = data.customReason.trim();
  } else {
    reasonText = requestReason === "New Request" 
      ? "This procedure is medically necessary based on clinical guidelines and my current diagnosis."
      : "This is an appeal of a previously denied prior authorization. This procedure is medically necessary and the denial should be reversed.";
  }

  const letter = `${today}

To: ${insuranceCompany} Utilization Review Department
Re: Prior authorization request
Provider: ${providerName}
Service: ${service}
Reason: ${requestReason}

Hello,

I am writing to request prior authorization for ${service}. ${reasonText} Delays in approval may result in a significant decline in my health status. If this request is denied, please provide the specific clinical criteria used for your review in writing.

Sincerely,
${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I'm calling about a prior authorization for ${service} with ${insuranceCompany}. This service is medically necessary, and any delay could worsen my health. Please provide the status and the clinical criteria used if denied. My contact info is ${patientPhone} and ${patientEmail}.`;

  return { letter, script };
}
// -------------------------------------------------------------------------


function router() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
  
  // Check if it's a guide page
  if (normalizedPath.startsWith("/guide/")) {
    const slug = normalizedPath.replace("/guide/", "");
    renderGuidePage(slug);
    return;
  }
  
  // Handle FAQ route
  if (normalizedPath === "/faq") {
    renderHomePage();
    // Scroll to FAQ section after page renders
    setTimeout(() => {
      const faqSection = document.getElementById("faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    bindNavigation();
    return;
  }
  
  if (infoPages[normalizedPath]) {
    renderInfoPage(normalizedPath);
  } else if (toolRoutes.some((tool) => tool.routePath === normalizedPath)) {
    renderToolPage(normalizedPath);
  } else {
    renderHomePage();
  }

  bindNavigation();

  // 기존 setupTool 호출부 유지
  setupTool({
    formId: "dispute-letter-form",
    letterOutputId: "letter-output",
    scriptOutputId: "script-output",
    pdfFileName: "fixmymedicalbill-dispute-letter.pdf",
    pdfHeader: "FixMyMedicalBill — Dispute Letter",
    generate: generateDisputeContent,
  });
  setupTool({
    formId: "claim-denied-form",
    letterOutputId: "claim-letter-output",
    scriptOutputId: "claim-script-output",
    pdfFileName: "fixmymedicalbill-claim-appeal.pdf",
    pdfHeader: "FixMyMedicalBill — Claim Appeal Letter",
    generate: generateClaimDeniedContent,
  });
  setupTool({
    formId: "urgent-care-form",
    letterOutputId: "urgent-letter-output",
    scriptOutputId: "urgent-script-output",
    pdfFileName: "fixmymedicalbill-urgent-care-dispute.pdf",
    pdfHeader: "FixMyMedicalBill — Urgent Care Dispute",
    generate: generateUrgentCareContent,
  });
  setupTool({
    formId: "out-of-network-form",
    letterOutputId: "oon-letter-output",
    scriptOutputId: "oon-script-output",
    pdfFileName: "fixmymedicalbill-out-of-network-dispute.pdf",
    pdfHeader: "FixMyMedicalBill — Out-of-Network Dispute",
    generate: generateOutOfNetworkContent,
  });
  setupTool({
    formId: "itemized-bill-form",
    letterOutputId: "itemized-letter-output",
    scriptOutputId: "itemized-script-output",
    pdfFileName: "fixmymedicalbill-itemized-bill-request.pdf",
    pdfHeader: "FixMyMedicalBill — Itemized Bill Request",
    generate: generateItemizedBillContent,
  });
  setupTool({
    formId: "medical-debt-form",
    letterOutputId: "debt-letter-output",
    scriptOutputId: "debt-script-output",
    pdfFileName: "fixmymedicalbill-medical-debt-help.pdf",
    pdfHeader: "FixMyMedicalBill — Financial Assistance Request",
    generate: generateMedicalDebtContent,
  });
  setupTool({
    formId: "collections-form",
    letterOutputId: "collections-letter-output",
    scriptOutputId: "collections-script-output",
    pdfFileName: "fixmymedicalbill-collections-validation.pdf",
    pdfHeader: "FixMyMedicalBill — Debt Validation Letter",
    generate: generateCollectionsContent,
  });
  setupTool({
    formId: "prior-auth-form",
    letterOutputId: "prior-auth-letter-output",
    scriptOutputId: "prior-auth-script-output",
    pdfFileName: "fixmymedicalbill-prior-authorization.pdf",
    pdfHeader: "FixMyMedicalBill — Prior Authorization",
    generate: generatePriorAuthContent,
  });
}

window.addEventListener("popstate", router);
router();