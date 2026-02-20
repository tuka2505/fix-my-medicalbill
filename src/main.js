import "./style.css";
import { jsPDF } from "jspdf";
import * as pdfjsLib from 'pdfjs-dist';

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
  {
    title: "Good Faith Estimate Dispute",
    desc: "Dispute a bill that exceeds your estimate (Self-Pay/Uninsured).",
    sectionId: "gfe-dispute",
    routePath: "/good-faith-estimate-dispute",
  },
  {
    title: "Credit Report Removal",
    desc: "Force removal of illegal medical debt from your credit report.",
    sectionId: "credit-removal",
    routePath: "/medical-credit-report-removal",
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
  "/good-faith-estimate-dispute": "Invoke your No Surprises Act PPDR rights to dispute a medical bill that exceeds your Good Faith Estimate by $400 or more.",
  "/medical-credit-report-removal": "Use new FCRA rules to demand the removal of paid, under $500, or recent medical collections from your credit report.",
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
            "FixMyMedicalBill is a technology platform, not a law firm. We provide informational templates and resources based on federal laws including the No Surprises Act (45 CFR § 149.410), Fair Debt Collection Practices Act (FDCPA, 15 U.S.C. § 1692g), ERISA (29 U.S.C. § 1001 et seq.), and IRS Section 501(r) regulations. These tools are designed to help patients understand their rights and communicate effectively with healthcare providers and insurers. However, this service does NOT constitute professional legal advice, medical advice, or substitute for consultation with a licensed attorney or healthcare provider. Every patient's situation is unique, and outcomes depend on individual circumstances, applicable state laws, provider policies, and insurance plan details. Users assume all risks associated with the use of the generated documents.",
      },
      {
        heading: "No Attorney-Client or Professional Relationship",
        body:
          "Use of this website and its tools does NOT create an attorney-client relationship, physician-patient relationship, or any professional advisory relationship between you and FixMyMedicalBill or its creators. All content generated through these tools represents general templates and suggested language only. You are solely responsible for reviewing, modifying, and verifying all information before submitting any correspondence to healthcare providers, insurance companies, or collection agencies. We strongly recommend consulting with a qualified medical billing advocate, healthcare attorney, or licensed professional before taking action on complex billing disputes, especially for amounts exceeding $5,000 or involving potential litigation.",
      },
      {
        heading: "Accuracy, Variability & Limitations",
          body:
            "AI-generated estimates are for informational purposes only and do not guarantee financial recovery. While we strive to provide accurate and up-to-date information, billing practices, insurance policies, and healthcare regulations vary significantly by state, provider network, insurance carrier, and facility type. Hospital billing departments and insurance companies may interpret regulations differently, and each claim is subject to individual review based on specific plan language and clinical documentation. We cannot guarantee specific outcomes, reimbursement amounts, or successful dispute resolutions. Users must independently verify all CPT codes, medical necessity criteria, state-specific statutes of limitations for medical debt, and applicable consumer protection laws. Information provided on this site may not reflect the most recent regulatory updates or court decisions in your jurisdiction.",
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
  "Duplicate charge (Phantom Billing)": {
    letter: "I have identified a duplicate charge for the same service rendered on the same date, which constitutes phantom billing and likely violates National Correct Coding Initiative (NCCI) edits. I demand a comprehensive clinical audit of the medical records to justify this redundant entry. Under the Fair Credit Billing Act (FCBA), I request that all collection activities be paused while this dispute is pending, and that this account not be reported as delinquent to any credit bureau.",
    script: "I am calling to report a duplicate charge that violates NCCI coding guidelines. I need this audited and removed immediately, and I'm invoking Fair Credit Billing Act protections to pause collections during this dispute.",
  },
  "Unbundling / NCCI Edit Violation": {
    letter: "The bill reflects unbundling of services that should have been billed as a single comprehensive code per NCCI guidelines. This practice artificially inflates charges and violates Centers for Medicare & Medicaid Services (CMS) coding standards. I demand a full audit by a certified medical coder (CPC) and immediate correction of these charges. Under the Fair Credit Billing Act, this account must not be reported to credit agencies while this dispute is under investigation.",
    script: "I'm disputing unbundled charges that violate NCCI edits. These services should be billed under one comprehensive code. I need a coding audit and I'm invoking FCBA protections to freeze collections.",
  },
  "Modifier Abuse (-25 / -59)": {
    letter: "I am disputing the inappropriate use of CPT modifiers -25 and/or -59, which appear to have been applied to bypass edits and inflate reimbursement. The clinical documentation does not support separate, significant procedures or distinct diagnostic services as required by AMA CPT guidelines. I request an immediate audit by a certified coder and reversal of these improper charges. Under the Fair Credit Billing Act, I demand that this account be placed on hold and not reported to credit bureaus during this dispute.",
    script: "I'm disputing modifier abuse on my bill — specifically -25 or -59 modifiers that don't meet CPT requirements. I need a coding review and FCBA protection from collections during this dispute.",
  },
  "Upcoding (Wrong E/M Level)": {
    letter: "The Evaluation and Management (E/M) service level billed does not accurately reflect the complexity of the visit as documented in the medical record. The history, exam, and medical decision-making (MDM) do not meet the criteria for the reported CPT code, constituting upcoding. I request a formal coding review by a certified medical coder (CPC) to correct this violation. Under the Fair Credit Billing Act, I demand that collection activities cease and that this account not be reported to credit bureaus while this matter is investigated.",
    script: "I'm disputing upcoded E/M levels on my bill. The documented visit doesn't match the high-level code charged. I need a formal coding audit and FCBA protection to stop collections.",
  },
  "Overcharge / Exceeds FAIR Health UCR": {
    letter: "The billed amount vastly exceeds the 80th percentile of usual, customary, and reasonable (UCR) rates for this ZIP code based on FAIR Health Consumer benchmarks. This constitutes price gouging. I request an immediate billing adjustment to a fair market rate consistent with industry standards. Under the Fair Credit Billing Act, this account must be placed on hold and not reported to credit agencies while this dispute is resolved.",
    script: "This charge is significantly higher than FAIR Health consumer benchmarks for our area. I need this adjusted to a customary rate and I'm invoking FCBA protection to pause collections.",
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
  "Claim denied — Medically Unnecessary (Need Peer-to-Peer)": {
    letter: "The 'medically unnecessary' denial contradicts my treating physician's clinical assessment and peer-reviewed medical literature supporting this treatment. I demand a Peer-to-Peer review with a board-certified physician in the relevant specialty. If this denial is upheld without proper clinical justification, I will file a formal complaint with the State Department of Insurance and pursue an external review under ERISA Section 503 (if applicable to an employer-sponsored plan). Provide the specific clinical criteria and Evidence of Coverage language used to deny this claim.",
    script: "I am appealing a 'medically unnecessary' denial that contradicts my doctor's clinical judgment. I formally request a Peer-to-Peer review and will escalate to the State DOI and invoke ERISA rights if this is not resolved.",
  },
  "Claim denied — Coding / Administrative Error": {
    letter: "This denial appears to be the result of a coding or administrative error, not a clinical determination. I request immediate reprocessing of this claim with corrected information. If this matter is not resolved promptly, I will file a grievance with the State Department of Insurance and, if applicable, escalate under ERISA Section 503 for employer-sponsored plans.",
    script: "I'm appealing a denial caused by coding or administrative errors. I need this claim reprocessed immediately or I will file complaints with the State DOI and pursue ERISA remedies.",
  },
  "Claim denied — Prior Auth Missing / Urgent Care Exception": {
    letter: "Prior authorization was clinically impossible to obtain due to the urgent or emergent nature of the care required. Delaying treatment would have posed a significant risk to my health. I request a retrospective review and authorization based on medical necessity. If this appeal is denied, I will file a complaint with the State Department of Insurance and, for ERISA-governed plans, pursue external review under Section 503.",
    script: "I'm appealing a prior auth denial for urgent care that couldn't wait. I'm requesting a retrospective review and will escalate to State DOI and ERISA external review if needed.",
  },
  "Claim denied — Network Inadequacy (No in-network option)": {
    letter: "Adequate in-network care was not reasonably available within an acceptable timeframe or geographic distance (network adequacy failure). Federal and state regulations require that this claim be processed at the in-network benefit level when network adequacy standards are not met. If this determination is not reversed, I will file a network adequacy complaint with the State Department of Insurance and, if applicable, pursue ERISA remedies.",
    script: "I'm appealing an out-of-network denial due to network inadequacy. No in-network providers were available, so this must be covered at in-network rates or I will file State DOI and ERISA complaints.",
  },
  "Urgent care — Invalid Facility Fee (Freestanding POS 20)": {
    letter: "I am disputing the facility fee charged for services rendered at a freestanding urgent care center. Per CMS guidelines, freestanding clinics are designated as Place of Service (POS) code 20 and are not eligible to bill hospital facility fees, which are reserved for hospital outpatient departments (POS 22). I demand proof of POS 22 designation or immediate removal of this illegal facility fee. Medicare Administrative Contractors (MACs) and commercial payers do not recognize facility fees for POS 20 sites.",
    script: "I'm disputing a facility fee charged by a freestanding urgent care clinic. Freestanding clinics are POS 20 and cannot legally charge hospital facility fees, which are only for POS 22 hospital outpatient sites. Remove this charge immediately.",
  },
  "Urgent care — E/M Upcoding (Level 4/5 for minor issue)": {
    letter: "The billed Evaluation and Management (E/M) code of Level 4 or 5 (CPT 99214/99215 or equivalent facility codes) does not reflect the actual complexity of medical decision-making (MDM), history, or examination performed during my visit for a minor ailment. This is textbook upcoding and violates AMA CPT coding guidelines. I request a formal coding audit by a certified coder and adjustment to the appropriate Level 2 or 3 code.",
    script: "I'm disputing upcoded E/M levels for my urgent care visit. The minor treatment I received does not meet AMA CPT guidelines for Level 4 or 5 charges. I need a coding audit and adjustment.",
  },
  "Urgent care — Unclear / Bundled Supply Charges": {
    letter: "The charges on my bill lack transparency and include vague or bundled supply charges without itemized CPT/HCPCS codes. I request a complete unbundled itemized bill showing specific codes for all services and supplies. Any 'S-codes' (non-standard codes) or global facility fees not supported by contractual agreements or CMS guidelines must be removed from my patient responsibility.",
    script: "My urgent care bill has unclear bundled charges without proper CPT codes. I need a fully itemized bill with all codes, and any unsupported facility fees or S-codes must be removed.",
  },
  "GFE — Billed $400+ over estimate": {
    letter: "Under the No Surprises Act Patient-Provider Dispute Resolution (PPDR) process (45 CFR § 149.620), I am formally disputing this bill because the actual charges exceed my Good Faith Estimate by more than $400. Federal law requires self-pay/uninsured patients to receive a binding estimate, and any charges exceeding that estimate by this threshold constitute a violation. I demand an immediate adjustment to match the original estimate or I will initiate a formal PPDR claim with the CMS Help Desk at 1-800-985-3059.",
    script: "I'm disputing this bill under the No Surprises Act PPDR process. The charges exceed my Good Faith Estimate by more than $400, which violates federal law. I need this adjusted immediately to match my estimate or I will file a formal complaint with CMS.",
  },
  "GFE — Never received an estimate": {
    letter: "Under the No Surprises Act (45 CFR § 149.610), uninsured and self-pay patients are entitled to receive a Good Faith Estimate at least 1 business day before scheduled services or at the time of booking for services within 3 days. I never received this legally required estimate. The failure to provide a GFE is a federal violation, and I cannot be held responsible for charges I was not properly informed of in advance. I demand an immediate billing adjustment to a reasonable rate or I will file a complaint with the CMS No Surprises Help Desk.",
    script: "I never received a Good Faith Estimate as required by the No Surprises Act. Without this mandatory disclosure, I cannot be held responsible for these charges. I need an adjustment to a reasonable rate or I will escalate to CMS immediately.",
  },
  "Credit — Debt is under $500": {
    letter: "Under the Fair Credit Reporting Act (FCRA) as amended in 2023, medical debts under $500 cannot be reported on consumer credit reports. The account in question is below this threshold and must be immediately deleted from my credit file. This reporting constitutes a willful violation of federal credit reporting law. I demand deletion within 30 days and proof of removal from all three credit bureaus. Failure to comply will result in a formal complaint with the Consumer Financial Protection Bureau (CFPB).",
    script: "This medical debt is under $500 and cannot legally be reported under the 2023 FCRA amendments. I demand immediate deletion from my credit report and proof of removal from all bureaus within 30 days, or I will file a CFPB complaint.",
  },
  "Credit — Debt is already paid/settled": {
    letter: "Under the Fair Credit Reporting Act (FCRA) as amended in 2023, paid medical collection accounts must be removed from consumer credit reports immediately upon verification of payment. This debt has been fully satisfied, and continued reporting violates federal law. I demand immediate deletion of this tradeline from my credit file and written confirmation of removal from all three credit bureaus within 30 days. Any continued reporting will result in statutory damages under the FCRA.",
    script: "This medical debt was already paid and must be removed under the 2023 FCRA rules. Paid medical collections cannot remain on credit reports. I demand immediate deletion and proof of removal, or I will pursue FCRA violations in court.",
  },
  "Credit — Debt is less than 1 year old": {
    letter: "Under the Fair Credit Reporting Act (FCRA) as amended in 2023, medical collection accounts less than 365 days old cannot be reported on consumer credit reports. This account does not meet the minimum one-year aging requirement and must be immediately deleted from my credit file. Premature reporting of medical debt is a federal violation. I demand deletion within 30 days and written confirmation of removal from all three credit bureaus.",
    script: "This medical debt is less than one year old and cannot be reported under the 2023 FCRA amendments. Medical collections must age for 365 days before reporting. I demand immediate deletion or I will file complaints with the CFPB and FTC.",
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
        <div class="hero-left">
          <div class="hero-social-proof" style="margin-bottom: 24px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <circle cx="9" cy="7" r="4" stroke-width="1.5"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>15,000+ Bills Analyzed</span>
          </div>

          <h1 class="hero-title" style="line-height: 1.15; margin-bottom: 20px;">
            Stop Overpaying.<br>
            <span class="highlight-blue">Find Your Refund.</span>
          </h1>
          
          <p class="hero-sub" style="line-height: 1.6; margin-bottom: 32px; font-size: 1.1rem; color: var(--muted2); max-width: 90%;">
            80% of US medical bills contain errors. Drop your bill here, and let our AI Auditor find your hidden overcharges in 60 seconds.
          </p>
          
          <div class="mechanism-stepper" style="background: transparent; border: 1px solid var(--border); box-shadow: none; padding: 12px 20px;">
            🔍 1. Scan Bill <span style="margin: 0 12px; color: var(--muted2);">➔</span> 📝 2. AI Audit <span style="margin: 0 12px; color: var(--muted2);">➔</span> ⚖️ 3. Get Refund
          </div>
        </div>

        <div class="hero-right">
          
          <div class="super-card">
            
            <div class="hero-value-prop" style="box-shadow: none; background: transparent; padding: 0 0 24px 0; border-bottom: 1px solid var(--border); margin-bottom: 24px;">
              <div class="value-stat">
                <span class="value-number">$<span class="count-up" data-target="450">0</span></span>
                <span class="value-label">Avg Found</span>
              </div>
              <div class="value-divider"></div>
              <div class="value-stat">
                <span class="value-number"><span class="count-up" data-target="60">0</span>s</span>
                <span class="value-label">Audit Time</span>
              </div>
              <div class="value-divider"></div>
              <div class="value-stat">
                <span class="value-number"><span class="count-up" data-target="98">0</span>%</span>
                <span class="value-label">AI Accuracy</span>
              </div>
            </div>

            <div class="hero-cta-section dropzone-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.9;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: var(--text);">Drag & Drop your bill</h3>
              <p style="margin: 0; font-size: 14px; color: var(--muted2);">Supports PDF, JPG, PNG</p>
              
              <input type="file" id="bill-upload" accept="image/*,application/pdf" style="display:none;">
              <label for="bill-upload" id="upload-label" class="upload-pill-btn">
                Browse Files
              </label>
            </div>

            <div class="pro-tip-banner">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--muted2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; flex-shrink: 0; margin-top: 2px;">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p style="margin: 0; font-size: 13.5px; line-height: 1.5; color: #515154;">
                <strong>Pro Tip:</strong> For the most accurate deep audit, please upload an <strong>Itemized Bill</strong> containing 5-digit CPT codes, rather than a basic summary receipt.
              </p>
            </div>

          </div>

          <div style="margin-top: 24px; display: flex; justify-content: center; gap: 24px; font-size: 13px; font-weight: 500; color: var(--muted2);">
            <span style="display: flex; align-items: center; gap: 6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34C759" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 100% Private
            </span>
            <span style="display: flex; align-items: center; gap: 6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Zero Data Stored
            </span>
          </div>
          
        </div>
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

function renderQuickAuditor() {
  return `
    <section id="quick-auditor" class="quick-auditor-section" style="display:none;">
      <div class="auditor-container">
        <!-- Scan Progress (Hidden by default, shown during upload) -->
        <div class="scan-progress" id="scan-progress" style="display:none;">
          <div class="scan-progress-bar">
            <div class="scan-progress-fill" id="scan-progress-fill"></div>
          </div>
          <div class="scan-progress-text" id="scan-progress-text">Scanning... 0%</div>
        </div>

        <!-- Quiz Interface (Hidden by Default) -->
        <div class="auditor-quiz-wrapper" id="auditor-quiz-wrapper" style="display: none;">
          <div class="auditor-header">
            <h2 class="auditor-title">Find Your Hidden Medical Refund</h2>
            <p class="auditor-subtitle">Answer 4 quick questions to estimate your potential recovery amount</p>
          </div>
          
          <!-- Progress Bar -->
          <div class="quiz-progress-container">
            <div class="quiz-progress-bar">
              <div class="quiz-progress-fill" id="quiz-progress"></div>
            </div>
            <div class="quiz-progress-text" id="quiz-progress-text">Question 1 of 4</div>
          </div>

          <!-- Quiz Container -->
          <div class="quiz-container" id="quiz-container">
            <!-- Questions will be injected here by JavaScript -->
          </div>

          <!-- Result Container (hidden initially) -->
          <div class="quiz-result-container" id="quiz-result" style="display: none;">
            <div class="quiz-analyzing" id="quiz-analyzing">
              <div class="analyzing-spinner"></div>
              <p class="analyzing-text">Analyzing your bill...</p>
            </div>
            
            <div class="quiz-final-result" id="quiz-final" style="display: none;">
              <div class="result-badge">Estimated Recovery</div>
              <div class="result-amount" id="result-amount">$0</div>
              <p class="result-description">Based on your answers, you may be entitled to recover this amount from billing errors and overcharges.</p>
              <button class="result-cta-btn" id="quiz-cta-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Start My Dispute Now
              </button>
              <button class="result-reset-btn" id="quiz-reset-btn">Start Over</button>
              <p style="font-size: 11.5px; color: var(--muted2); text-align: center; max-width: 480px; margin: -8px auto 0; line-height: 1.4;">*Estimates are based on AI analysis of common billing errors and federal guidelines. Actual results depend on your provider and insurance plan. This tool provides educational templates, not medical or legal advice.</p>
            </div>
          </div>

          <div class="auditor-trust">
            <div class="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="1.5" stroke-linejoin="round"></path>
              </svg>
              <span>100% Private</span>
            </div>
            <div class="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="1.5"></circle>
                <path d="M9 12l2 2 4-4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span>98% AI Accuracy</span>
            </div>
            <div class="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="1.5"></circle>
                <path d="M12 6v6l4 2" stroke-width="1.5" stroke-linecap="round"></path>
              </svg>
              <span>Takes 30 Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSituationalCards() {
  return `
    <section id="situational-tools" class="situational-tools-section">
      <div class="situational-cards">
        <a href="/urgent-care-bill-dispute" class="situation-card-large" data-route="/urgent-care-bill-dispute">
          <div class="card-icon-large">🏥</div>
          <div class="card-content-large">
            <h3 class="card-title-large">ER Bill Review</h3>
            <p class="card-desc-large">Challenge emergency room overcharges and facility fees</p>
            <div class="card-stat">Avg Recovery: <strong>$850</strong></div>
          </div>
          <svg class="card-arrow-large" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a>
        <a href="/out-of-network-billing-dispute" class="situation-card-large" data-route="/out-of-network-billing-dispute">
          <div class="card-icon-large">🚑</div>
          <div class="card-content-large">
            <h3 class="card-title-large">Ambulance Bill Dispute</h3>
            <p class="card-desc-large">Fight surprise ambulance charges under No Surprises Act</p>
            <div class="card-stat">Avg Recovery: <strong>$650</strong></div>
          </div>
          <svg class="card-arrow-large" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a>
        <a href="/medical-bill-dispute-letter" class="situation-card-large" data-route="/medical-bill-dispute-letter">
          <div class="card-icon-large">📋</div>
          <div class="card-content-large">
            <h3 class="card-title-large">Hospital Bill Audit</h3>
            <p class="card-desc-large">Request itemized bill review and code verification</p>
            <div class="card-stat">Avg Recovery: <strong>$720</strong></div>
          </div>
          <svg class="card-arrow-large" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a>
      </div>
    </section>
  `;
}

function renderBrowseButton() {
  return `
    <div class="browse-all-container">
      <button class="browse-all-btn" onclick="document.getElementById('tools-section').scrollIntoView({behavior: 'smooth', block: 'start'})">
        See All Dispute Tools
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </div>
  `;
}

function renderFullToolsGrid(cards) {
  return `
    <section id="tools-section" class="section tools-grid-section">
      <div class="tools-header">
        <h2 class="h2">All Medical Dispute Tools</h2>
        <p class="tools-subtitle">Complete toolkit for fighting medical billing errors</p>
      </div>
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
          question: "Is the refund amount calculated by AI guaranteed?",
          answer: "No. The refund amount is a <strong>calculated estimate</strong> based on common billing error patterns and federal guidelines. Actual results depend entirely on your specific insurance plan and the hospital's internal billing policies. Use this as a starting point for negotiation, not a guaranteed check."
        },
        {
          question: "Does using this tool create a legal relationship?",
          answer: "No. Using FixMyMedicalBill does not create an attorney-client relationship. Our AI provides <strong>educational templates and data analysis</strong> to help you advocate for yourself. We do not provide legal representation or specific legal advice."
        },
        {
          question: "What if my hospital ignores the AI audit report?",
          answer: "While our reports are based on federal billing standards like the No Surprises Act, hospitals may have their own review processes. If a provider ignores your dispute, we recommend using our <strong>'Request Itemized Bill'</strong> tool to force a line-by-line coding review, which they are legally required to provide under HIPAA."
        },
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
                        <option>Duplicate charge (Phantom Billing)</option>
                        <option>Unbundling / NCCI Edit Violation</option>
                        <option>Modifier Abuse (-25 / -59)</option>
                        <option>Upcoding (Wrong E/M Level)</option>
                        <option>Overcharge / Exceeds FAIR Health UCR</option>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
                        <option>Medically Unnecessary (Need Peer-to-Peer)</option>
                        <option>Coding / Administrative Error</option>
                        <option>Prior Auth Missing / Urgent Care Exception</option>
                        <option>Network Inadequacy (No in-network option)</option>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
                        <option>Invalid Facility Fee (Freestanding POS 20)</option>
                        <option>E/M Upcoding (Level 4/5 for minor issue)</option>
                        <option>Unclear / Bundled Supply Charges</option>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
                    <div class="field">
                      <label for="oonSituation">Situation</label>
                      <select id="oonSituation" name="situation" required>
                        <option>Emergency Services (Full NSA Protection)</option>
                        <option>Ground Ambulance (State Law Check)</option>
                        <option>Non-emergency at In-Network Facility</option>
                        <option>Signed consent under duress / invalid notice</option>
                        <option value="Other">Other (Write my own)</option>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
                      <label for="collectionNoticeDate">Date of first notice</label>
                      <input id="collectionNoticeDate" name="noticeDate" type="text" placeholder="MM/DD/YYYY" />
                    </div>
                    <div class="field">
                      <label for="collectionIssueType">Issue type</label>
                      <select id="collectionIssueType" name="issueType" required>
                        <option>Unverified Debt (Require Original Contract)</option>
                        <option>Amount Discrepancy (Balance doesn't match)</option>
                        <option>Statute of Limitations Expired (Time-barred)</option>
                        <option>Identity Theft / Not My Debt</option>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
                    </div>
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
                        <option>New Request (Standard Review)</option>
                        <option>Urgent/Expedited Request (72-hour requirement)</option>
                        <option>Appeal of Denied Auth (Request Peer-to-Peer)</option>
                        <option value="Other">Other (Write my own)</option>
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
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
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
    case "gfe-dispute":
      return `
        <section id="gfe-dispute" class="section tool-section">
          <h2 class="h2">Good Faith Estimate Dispute</h2>
          <p class="text tool-subtitle">Dispute a bill exceeding your Good Faith Estimate under the No Surprises Act.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="gfe-dispute-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="gfeProviderName">Provider/Facility name</label>
                      <input id="gfeProviderName" name="providerName" type="text" placeholder="Provider or facility" />
                    </div>
                    <div class="field">
                      <label for="gfeDateOfService">Date of service</label>
                      <input id="gfeDateOfService" name="dateOfService" type="text" placeholder="MM/DD/YYYY" />
                    </div>
                    <div class="field">
                      <label for="gfeEstimatedAmount">Estimated Amount</label>
                      <input id="gfeEstimatedAmount" name="estimatedAmount" type="text" placeholder="$1,500" />
                    </div>
                    <div class="field">
                      <label for="gfeBilledAmount">Actual Billed Amount</label>
                      <input id="gfeBilledAmount" name="billedAmount" type="text" placeholder="$2,800" />
                    </div>
                    <div class="field">
                      <label for="gfeIssueType">Issue type</label>
                      <select id="gfeIssueType" name="issueType" required>
                        <option>Billed $400+ over estimate</option>
                        <option>Never received an estimate</option>
                        <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="gfePatientName">Patient name</label>
                      <input id="gfePatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="gfePatientPhone">Patient phone</label>
                      <input id="gfePatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="gfePatientEmail">Patient email</label>
                      <input id="gfePatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="gfePatientAddress">Patient address</label>
                      <textarea id="gfePatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Dispute Letter</div>
                    </div>
                    <pre id="gfe-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="gfe-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case "credit-removal":
      return `
        <section id="credit-removal" class="section tool-section">
          <h2 class="h2">Credit Report Removal</h2>
          <p class="text tool-subtitle">Demand removal of illegal medical debt from your credit report under FCRA rules.</p>
          <div class="tool-shell">
            <div class="tool-split">
              <div class="tool-panel">
                <form id="credit-removal-form" class="tool-form">
                  <div class="form-grid">
                    <div class="field">
                      <label for="creditAgencyName">Credit Bureau / Collector Name</label>
                      <input id="creditAgencyName" name="agencyName" type="text" placeholder="Experian, Equifax, TransUnion, or Collector" />
                    </div>
                    <div class="field">
                      <label for="creditAccountNumber">Account Number</label>
                      <input id="creditAccountNumber" name="accountNumber" type="text" placeholder="Account #" />
                    </div>
                    <div class="field">
                      <label for="creditDebtAmount">Debt Amount</label>
                      <input id="creditDebtAmount" name="debtAmount" type="text" placeholder="$345" />
                    </div>
                    <div class="field">
                      <label for="creditIssueType">Issue type</label>
                      <select id="creditIssueType" name="issueType" required>
                        <option>Debt is under $500</option>
                        <option>Debt is already paid/settled</option>
                        <option>Debt is less than 1 year old</option>
                        <option value="Other">Other (Write my own)</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="creditPatientName">Patient name</label>
                      <input id="creditPatientName" name="patientName" type="text" placeholder="Full name" />
                    </div>
                    <div class="field">
                      <label for="creditPatientPhone">Patient phone</label>
                      <input id="creditPatientPhone" name="patientPhone" type="text" placeholder="(555) 123-4567" />
                    </div>
                    <div class="field">
                      <label for="creditPatientEmail">Patient email</label>
                      <input id="creditPatientEmail" name="patientEmail" type="text" placeholder="name@email.com" />
                    </div>
                    <div class="field field-full">
                      <label for="creditPatientAddress">Patient address</label>
                      <textarea id="creditPatientAddress" name="patientAddress" rows="3" placeholder="Street, City, State ZIP"></textarea>
                    </div>
                  </div>
                  <div class="form-actions tool-actions">
                    <button class="btn" type="submit">Generate</button>
                    <button class="btn neutral" type="button" data-copy="letter" disabled>Copy Letter</button>
                    <button class="btn neutral" type="button" data-copy="script" disabled>Copy Phone Script</button>
                    <button class="btn neutral" type="button" data-download="pdf" disabled>Download PDF</button>
                  </div>
                  <p style="font-size: 11px; color: var(--muted2); margin-top: 12px; margin-bottom: 0; line-height: 1.4;">By generating this document, you acknowledge that you are solely responsible for reviewing its accuracy before submission. FixMyMedicalBill provides informational templates, not legal counsel.</p>
                </form>
              </div>
              <div class="tool-results">
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Dispute Letter</div>
                    </div>
                    <pre id="credit-letter-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
                  </div>
                  <div class="result-card">
                    <div class="result-header">
                      <div class="result-title">Phone Script</div>
                    </div>
                    <pre id="credit-script-output" class="result-content is-empty">No output yet. Fill out the form and click Generate.</pre>
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
        ${renderQuickAuditor()}
        ${renderSituationalCards()}
        ${renderBrowseButton()}
        ${renderFullToolsGrid(cards)}
        ${renderSuccessStories()}
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
  
  // --- CONTEXT PRESERVATION BANNER LOGIC ---
  let contextBannerHTML = "";
  try {
    const savedData = localStorage.getItem('medicalAuditData');
    if (savedData) {
      const auditData = JSON.parse(savedData);
      
      // Determine the primary issue to display
      let primaryIssue = "potential billing discrepancies";
      if (auditData.findings && auditData.findings.length > 0) {
        // Use the first finding's error type
        primaryIssue = auditData.findings[0].errorType || auditData.findings[0].issue || primaryIssue;
      } else if (auditData.category) {
        // Fallback to category
        primaryIssue = `${auditData.category} billing issues`;
      }
      
      // Apple-style Premium Banner HTML (Inline Styles)
      contextBannerHTML = `
        <div class="ai-context-banner" style="
          animation: fadeInUp 0.5s ease-out;
          margin-top: 16px;
          margin-bottom: 24px;
          padding: 18px 24px;
          background: linear-gradient(135deg, rgba(0, 113, 227, 0.06), rgba(0, 168, 255, 0.03));
          border: 1px solid rgba(0, 113, 227, 0.2);
          border-radius: 16px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        ">
          <div style="font-size: 24px; line-height: 1;">✨</div>
          <div>
            <h4 style="margin: 0 0 6px 0; font-family: -apple-system, 'SF Pro Display', sans-serif; font-size: 16px; font-weight: 700; color: rgba(11, 15, 25, 0.96); letter-spacing: -0.01em;">
              AI Audit Active: Proceeding with ${tool.title}
            </h4>
            <p style="margin: 0; font-family: -apple-system, 'SF Pro Text', sans-serif; font-size: 14px; line-height: 1.5; color: rgba(11, 15, 25, 0.7);">
              We detected <strong>${primaryIssue}</strong> in your document. We've auto-filled the extracted data below. Please review the highlighted fields and click 'Generate'.
            </p>
          </div>
        </div>
      `;
    }
  } catch (e) {
    console.error('[Context Banner] Error reading audit data:', e);
  }
  // --- END BANNER LOGIC ---

  document.querySelector("#app").innerHTML = `
    <div class="wrap">
      ${renderHeader()}
      <main class="main">
        <div class="tool-seo">
          <p class="text">${seoCopy}</p>
        </div>
        ${contextBannerHTML}
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
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

// ========== STEP 4: AUTO-FILL SYSTEM FOR TOOL PAGES ==========

function applyAutoFill(form) {
  try {
    // Action 1: Check for saved audit data
    const savedData = localStorage.getItem('medicalAuditData');
    if (!savedData) {
      console.log('[Phase 2 AutoFill] No medicalAuditData found');
      return;
    }
    
    const auditData = JSON.parse(savedData);
    console.log('[Phase 2 AutoFill] Retrieved audit data:', auditData);
    
    // Action 2: Map extracted metadata to form inputs
    
    // Helper function to fill field and add visual indicator
    const fillField = (field, value) => {
      if (field && value) {
        field.value = value;
        field.classList.add('is-autofilled');
        
        // Remove indicator when user focuses/edits the field
        const removeIndicator = () => {
          field.classList.remove('is-autofilled');
          field.removeEventListener('focus', removeIndicator);
        };
        field.addEventListener('focus', removeIndicator);
        
        return true;
      }
      return false;
    };
    
    // Fill facilityName -> providerName, facilityName, originalProvider, insuranceCompany (fallback)
    const facilityFieldNames = ['providerName', 'facilityName', 'originalProvider', 'insuranceCompany'];
    facilityFieldNames.forEach(fieldName => {
      const field = form.querySelector(`input[name="${fieldName}"]`);
      if (fillField(field, auditData.facilityName)) {
        console.log(`[Phase 2 AutoFill] ✓ Filled ${fieldName}: ${auditData.facilityName}`);
      }
    });
    
    // Fill totalAmount -> billAmount, totalAmount, debtAmount, totalDebtAmount
    const amountFieldNames = ['billAmount', 'totalAmount', 'totalDebtAmount', 'debtAmount'];
    amountFieldNames.forEach(fieldName => {
      const field = form.querySelector(`input[name="${fieldName}"]`);
      if (field && auditData.totalAmount) {
        // Format currency using existing logic
        const rawAmount = auditData.totalAmount.replace(/[^0-9.]/g, '');
        const number = parseFloat(rawAmount);
        if (!isNaN(number)) {
          const formattedValue = `$${number.toLocaleString('en-US')}`;
          fillField(field, formattedValue);
          console.log(`[Phase 2 AutoFill] ✓ Filled ${fieldName}: ${formattedValue}`);
        }
      }
    });
    
    // Fill dateOfService -> dateOfService, dateOfVisit
    const dateFieldNames = ['dateOfService', 'dateOfVisit'];
    dateFieldNames.forEach(fieldName => {
      const field = form.querySelector(`input[name="${fieldName}"]`);
      if (fillField(field, auditData.dateOfService)) {
        console.log(`[Phase 2 AutoFill] ✓ Filled ${fieldName}: ${auditData.dateOfService}`);
      }
    });
    
    // Fill accountNumber
    const accountField = form.querySelector('input[name="accountNumber"]');
    if (fillField(accountField, auditData.accountNumber)) {
      console.log(`[Phase 2 AutoFill] ✓ Filled accountNumber: ${auditData.accountNumber}`);
    }
    
    // Fill patientName
    const patientField = form.querySelector('input[name="patientName"]');
    if (fillField(patientField, auditData.patientName)) {
      console.log(`[Phase 2 AutoFill] ✓ Filled patientName: ${auditData.patientName}`);
    }
    
    // Fill issueType dropdown based on issueCategory or findings
    // Smart dropdown selector: covers issueType, requestReason, denialReason
    const issueTypeField = form.querySelector('select[name="issueType"], select[name="requestReason"], select[name="denialReason"]');
    if (issueTypeField && (auditData.verdict || auditData.issueCategory || (auditData.findings && auditData.findings.length > 0))) {
      let matchFound = false;
      const options = Array.from(issueTypeField.options);
      
      // 1. Try to find a reasonable match from options
      if (auditData.findings && auditData.findings.length > 0) {
        const primaryError = auditData.findings[0].errorType || '';
        for (const option of options) {
          if (option.value !== 'Other' && option.value !== '' && !option.value.includes('Write my own')) {
            const optionTextLower = option.text.toLowerCase();
            const optionValueLower = option.value.toLowerCase();
            const primaryErrorLower = primaryError.toLowerCase();
            
            // Check if option matches error type (bidirectional matching)
            if (optionTextLower.includes(primaryErrorLower) || primaryErrorLower.includes(optionValueLower)) {
              issueTypeField.value = option.value;
              issueTypeField.classList.add('is-autofilled');
              matchFound = true;
              console.log('[Phase 2 AutoFill] ✓ Matched dropdown option:', option.value);
              break;
            }
          }
        }
      }
      
      // 2. If no match, force "Other" and fill custom reason
      if (!matchFound) {
        const otherOption = options.find(opt => opt.value === 'Other' || opt.value.includes('Write my own'));
        if (otherOption) {
          issueTypeField.value = otherOption.value;
          issueTypeField.classList.add('is-autofilled');
          console.log('[Phase 2 AutoFill] No exact match. Using "Other"');
          
          // Dispatch change event to trigger the UI (Custom Input System)
          issueTypeField.dispatchEvent(new Event('change', { bubbles: true }));
          
          // Wait for the DOM to render the custom textarea, then fill it
          setTimeout(() => {
            const customReasonField = form.querySelector('textarea[name="customReason"]');
            if (customReasonField) {
              // Compile a strong legal reason from AI findings
              let customContent = '';
              
              if (auditData.verdict) {
                customContent = `Based on AI audit: ${auditData.verdict}`;
                if (auditData.findings && auditData.findings.length > 0) {
                  const findingsText = auditData.findings.map(f => f.issue || f.errorType).join(', ');
                  customContent += ` Specific flags: ${findingsText}`;
                }
              } else if (auditData.auditorNote) {
                customContent = auditData.auditorNote;
                if (auditData.findings && auditData.findings.length > 0) {
                  const findingsText = auditData.findings.map(f => f.issue || f.errorType).join(', ');
                  customContent += ` Specific flags: ${findingsText}`;
                }
              } else if (auditData.findings && auditData.findings.length > 0) {
                const findingsText = auditData.findings.map(f => f.issue || f.errorType).join(', ');
                customContent = `Detected billing issues: ${findingsText}`;
              } else if (auditData.issueCategory) {
                customContent = `Issue detected in ${auditData.issueCategory} billing. Please review the charges for accuracy.`;
              }
              
              if (customContent) {
                customReasonField.value = customContent;
                customReasonField.classList.add('is-autofilled');
                
                // Remove indicator when user focuses
                const removeIndicator = () => {
                  customReasonField.classList.remove('is-autofilled');
                  customReasonField.removeEventListener('focus', removeIndicator);
                };
                customReasonField.addEventListener('focus', removeIndicator);
                
                console.log('[Phase 2 AutoFill] ✓ Filled customReason with AI logic');
              }
            }
          }, 150); // Small delay to let CSS transition finish
        }
      }
    }
    
    console.log('[Phase 2 AutoFill] ✓ Auto-fill complete');
    
  } catch (error) {
    console.error('[Phase 2 AutoFill] Error during auto-fill:', error);
  }
}

// Action 4: Cleanup localStorage on user interaction
function setupAutoFillCleanup(form) {
  const clearDataOnce = () => {
    try {
      localStorage.removeItem('medicalAuditData');
      console.log('[Phase 2 AutoFill] ✓ Cleared medicalAuditData on user edit');
    } catch (error) {
      console.error('[Phase 2 AutoFill] Failed to clear data:', error);
    }
    // Remove listener after first manual edit
    form.removeEventListener('input', clearDataOnce);
  };
  
  form.addEventListener('input', clearDataOnce);
}

function setupTool(options) {
  const form = document.querySelector(`#${options.formId}`);
  if (!form) return;

  const section = form.closest("section");
  if (!section) return;

  applyInputEnhancements(form);
  
  // Action 3: Apply auto-fill from saved audit data
  applyAutoFill(form);
  
  // Action 4: Setup cleanup listener
  setupAutoFillCleanup(form);

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
    
    // Action 4: Clear audit data after successful submission
    try {
      localStorage.removeItem('medicalAuditData');
      console.log('[Phase 2 AutoFill] ✓ Cleared medicalAuditData after form submission');
    } catch (error) {
      console.error('[Phase 2 AutoFill] Failed to clear data on submission:', error);
    }
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
      if (!content || content.includes("No output yet")) return;

      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const margin = 54;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const dateText = new Date().toLocaleDateString();
      const auditId = "AUDIT-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

      // --- LETTERHEAD DESIGN ---
      // Official Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(0, 113, 227); // Apple Blue
      doc.text("FixMyMedicalBill", margin, 60);

      // Subheader / Tagline
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Official Medical Bill Dispute & Audit Request", margin, 75);

      // Document Meta Info (Right aligned)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text(`Date: ${dateText}`, pageWidth - margin, 60, { align: "right" });
      doc.text(`Reference ID: ${auditId}`, pageWidth - margin, 75, { align: "right" });

      // Divider Line
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(1);
      doc.line(margin, 90, pageWidth - margin, 90);

      // --- CONTENT RENDERING ---
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20); // Dark gray for better readability
      
      // Split content into lines based on page width
      const wrapped = doc.splitTextToSize(content, pageWidth - margin * 2);
      let cursorY = 120;

      wrapped.forEach((line) => {
        // Check if line contains specific keywords to make bold (optional enhancement)
        if (line.startsWith("To:") || line.startsWith("Re:") || line.startsWith("Account:") || line.startsWith("Amount:")) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }

        if (cursorY > pageHeight - margin) {
          doc.addPage();
          cursorY = margin; // Reset for new page
        }
        doc.text(line, margin, cursorY);
        cursorY += 16; // Line spacing
      });

// Footer (Page numbers + Liability Shield)
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 30, { align: "center" });
      
      // Liability Shield Disclaimer
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(180, 180, 180);
      const disclaimerText = "This document was independently generated by the patient using an educational template. FixMyMedicalBill.com is not a law firm and does not provide legal representation or medical advice.";
      const disclaimerLines = doc.splitTextToSize(disclaimerText, pageWidth - 2 * margin);
      doc.text(disclaimerLines, pageWidth / 2, pageHeight - 18, { align: "center" });
      }

      doc.save(options.pdfFileName);
    });
  }
}

// ========== AI EVIDENCE INJECTION HELPER ==========
function buildAIEvidenceText() {
  try {
    const savedData = localStorage.getItem('medicalAuditData');
    if (!savedData) return { letterAddendum: "", scriptAddendum: "" };
    
    const data = JSON.parse(savedData);
    if (!data.findings || data.findings.length === 0) return { letterAddendum: "", scriptAddendum: "" };

    let letterAddendum = "\n\nSPECIFIC AUDIT FINDINGS FOR DISPUTE:\nBased on a preliminary clinical audit of my bill, I am formally disputing the following items:\n";
    let scriptAddendum = " Specifically, my audit flagged the following issue: ";

    data.findings.forEach((f, index) => {
      // Use reasoning if available (contains codes/prices), otherwise fallback to the question context
      const detail = f.reasoning || f.question;
      letterAddendum += `${index + 1}. [${f.errorType || 'Billing Anomaly'}]: ${detail}\n`;
      
      // Add only the most heavily weighted/first issue to the phone script to keep it natural
      if (index === 0) {
        scriptAddendum += detail;
      }
    });

    letterAddendum += "\nI demand a full clinical review of these specific line items against NCCI guidelines and my medical records.";

    return { letterAddendum, scriptAddendum };
  } catch (error) {
    console.error("Failed to build AI evidence text:", error);
    return { letterAddendum: "", scriptAddendum: "" };
  }
}

function generateDisputeContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  
  // Handle "Other" option with custom input
  let issue;
  if (data.issueType === "Other" && data.customReason) {
    issue = {
      letter: `I am formally disputing this balance due to the following specific discrepancies: ${data.customReason.trim()}. I request a full clinical audit of the medical records pertaining to this issue to justify these charges.`,
      script: `I'm disputing this bill because: ${data.customReason.trim()}. I need a clinical audit of the records.`
    };
  } else {
    issue = issueTemplates[data.issueType] || {
      letter: "I am requesting a formal audit of this bill for accuracy, including a review of medical records and coding.",
      script: "I am requesting a formal audit of this bill for accuracy.",
    };
  }
  const issueLetter = normalizeHello(issue.letter);

  // Inject Dynamic AI Evidence
  const aiEvidence = buildAIEvidenceText();
  const finalLetterBody = issueLetter + (aiEvidence.letterAddendum ? aiEvidence.letterAddendum : "");
  const finalScriptIssue = issue.script + (aiEvidence.scriptAddendum ? aiEvidence.scriptAddendum : "");

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

${finalLetterBody}

Please place my account on an immediate collections hold while this dispute is investigated. I expect a written response within 30 days detailing your findings, the exact CPT/HCPCS codes billed, and an adjusted statement reflecting the corrected balance.

Under federal consumer protection guidelines, I demand that this account not be reported as delinquent to any credit reporting agency while this dispute is pending.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I am calling to formally dispute the charges on account ${accountNumber} for my visit on ${dateOfService}. ${finalScriptIssue} Please place a hold on my account from entering collections while this is under review, and send me the audit results in writing.`;

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
      letter: `I am formally appealing this claim denial based on the following specific circumstances: ${data.customReason.trim()}. I request a comprehensive review of the clinical records and Evidence of Coverage to justify this adverse determination.`,
      script: `I'm appealing this denial because: ${data.customReason.trim()}. I need a full clinical review.`
    };
  } else {
    const templateKey = `Claim denied — ${data.denialReason || "Medically Unnecessary (Need Peer-to-Peer)"}`;
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

  let letterBody = "";
  let scriptBody = "";

  if (data.situation === "Ground Ambulance (State Law Check)") {
    letterBody = `I am writing to formally dispute the out-of-network charges for ground ambulance services provided on ${dateOfService}.

While the federal No Surprises Act currently exempts ground ambulance transport, this service was involuntary and medically necessary. I am disputing this charge to verify if it is protected under applicable State Balance Billing Laws, which often prohibit surprise billing for emergency transport in my jurisdiction.

I request a hold on this account while I verify my state's specific protections against surprise ground ambulance bills. I am willing to pay the in-network cost-sharing amount, but I reject any balance billing that exceeds the reasonable and customary rate for this service.`;
    
    scriptBody = `I received a surprise bill for ground ambulance transport on ${dateOfService}. Since this was an involuntary emergency service, I am verifying my protections under state balance billing laws. I am disputing this balance and requesting a hold on my account.`;
  } else {
    // Standard NSA Logic
    let situationLine;
    if (data.situation === "Other" && data.customReason) {
      situationLine = `I am disputing these out-of-network charges based on the following specific circumstances: ${data.customReason.trim()}. Any consent provided was not signed voluntarily with a full understanding of out-of-network cost estimates 72 hours prior to service, rendering it invalid under 45 CFR § 149.420.`;
    } else if (data.situation === "Signed consent under duress / invalid notice") {
      situationLine = "Any consent I provided was not signed voluntarily with a full understanding of out-of-network cost estimates at least 72 hours prior to the scheduled service, rendering it invalid under 45 CFR § 149.420. The notice and consent requirements of the No Surprises Act were not properly met, and therefore I am protected from balance billing.";
    } else {
      situationLine = data.situation === "Emergency Services (Full NSA Protection)"
          ? "As this was an emergency medical condition as defined under EMTALA, I am fully protected from balance billing under the No Surprises Act."
          : "As I received care at an in-network facility but was treated by an out-of-network provider without proper advance notice and valid consent under 45 CFR § 149.420, I am protected from balance billing.";
    }

    letterBody = `I am writing to formally dispute the out-of-network charges for the services rendered on ${dateOfService}. 

Under the Federal No Surprises Act (Public Health Service Act § 2799A-1), it is illegal for providers to balance bill patients for out-of-network emergency services or out-of-network non-emergency services provided at an in-network facility. 

${situationLine}

I am legally only responsible for my in-network cost-sharing amount. Please adjust this balance immediately. If this illegal balance billing is not corrected, I will submit a formal complaint to the federal No Surprises Help Desk and the State Attorney General.`;

    scriptBody = `I received a surprise out-of-network bill for my visit on ${dateOfService} that violates the Federal No Surprises Act. ${situationLine} I expect this bill to be adjusted to my in-network rate immediately, or I will file a complaint with the federal CMS Help Desk.`;
  }

  const letter = `${today}

To: ${facilityName} Billing Department
Re: Dispute of Out-of-Network Charges
Date of service: ${dateOfService}
Total amount billed: ${totalAmount}

To Whom It May Concern:

${letterBody}

Sincerely,

${patientName}
${patientAddress}
${patientPhone}`;

  const script = `Hello, my name is ${patientName}. ${scriptBody}`;

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

Under the HIPAA Privacy Rule (45 CFR § 164.524), I am entitled to access my complete medical and billing records. I require a fully unbundled itemized statement with all Revenue Codes, CPT/HCPCS codes, and individual line-item charges. A "Summary Bill" is unacceptable and non-compliant with this request.

This itemized statement MUST include:
1. Every individual service, supply, and medication provided.
2. The specific CPT, HCPCS, and Revenue codes for each item.
3. The individual unbundled price for each line item.
4. Date and time stamps for each separately billable service.

I will not make any payments until I have received this document and verified the charges for accuracy against my medical records. Please place a 30-day hold on this account and ensure it is not forwarded to collections during this time. Any attempts to report this account as delinquent while this request is pending will be considered a violation of my consumer rights.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}`;

  const script = `Hello, my name is ${patientName}. For account ${accountNumber}, I am exercising my HIPAA rights under 45 CFR § 164.524 to request a complete, unbundled itemized bill that includes all Revenue Codes, CPT, and HCPCS codes. A summary bill is not compliant with this request. I will not be paying the balance until I review these codes. Please place a hold on my account so it does not go to collections.`;

  return { letter, script };
}
function generateMedicalDebtContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const providerName = clean(data.providerName, "Hospital/Provider Name");
  const accountNumber = clean(data.accountNumber, "Account Number");
  const totalDebtAmount = clean(data.totalDebtAmount, "Total Debt Amount");
  
  // FPL (Federal Poverty Level) Logic - 2024 Guidelines
  const incomeStr = data.householdIncome || "0";
  const sizeStr = data.householdSize || "1";
  const annualIncome = parseFloat(incomeStr.replace(/[^0-9.]/g, ""));
  const familySize = parseInt(sizeStr.replace(/[^0-9]/g, ""), 10) || 1;

  // 2024 Federal Poverty Guidelines (48 Contiguous States)
  // $15,060 for first person + $5,380 for each additional person
  const fplBase = 15060;
  const fplPerPerson = 5380;
  const povertyLevel = fplBase + ((familySize - 1) * fplPerPerson);
  const percentFPL = (annualIncome / povertyLevel) * 100;
  
  const isUnder400 = percentFPL < 400;
  const fplCitation = isUnder400 
    ? `My household income of $${annualIncome.toLocaleString()} is ${Math.round(percentFPL)}% of the Federal Poverty Level (FPL). Under IRS Section 501(r) guidelines for non-profit hospital status, patients with income under 400% FPL are typically eligible for significant financial assistance or a total bill waiver.`
    : `My household income is $${annualIncome.toLocaleString()}.`;

  const householdIncome = clean(data.householdIncome, "Household Income");
  const householdSize = clean(data.householdSize, "Household Size");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  
  // Include special circumstances if provided
  const specialCircumstances = data.specialCircumstances && data.specialCircumstances.trim();
  const specialCircumstancesText = specialCircumstances 
    ? `\n\nAdditionally, my financial capacity has been severely impacted by the following circumstances: ${specialCircumstances}. Under federal guidelines, I request an immediate hold on any Extraordinary Collection Actions (ECAs) while this application is processed.` 
    : '';

  const letter = `${today}

To: ${providerName} Financial Assistance Department
Re: Financial Assistance / Charity Care Request
Account: ${accountNumber}
Balance: ${totalDebtAmount}

To Whom It May Concern:

As a tax-exempt hospital facility, you are mandated under IRS Section 501(r) to provide charity care or financial assistance to eligible patients. I am formally invoking my right to apply for your Financial Assistance Policy (FAP).

${fplCitation}

Based on this, I request that you provide me with:

1. A complete copy of your Financial Assistance Policy (FAP).
2. The Financial Assistance Application form in plain language.
3. A plain language summary translated if needed.
4. Confirmation that all collection activities will be suspended during the application review period.

If I do not qualify for a full waiver, I request a zero-interest payment plan that does not exceed 5% of my monthly discretionary income, consistent with IRS 501(r) requirements.${specialCircumstancesText}

Under IRS Section 501(r), you are prohibited from engaging in Extraordinary Collection Actions (ECAs) — including reporting to credit bureaus, filing lawsuits, or garnishing wages — until you have made reasonable efforts to determine my eligibility for financial assistance. I expect a written response within 30 days confirming receipt of this request and next steps.

Sincerely,
${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I'm calling about account ${accountNumber} at ${providerName}. Under IRS Section 501(r), I am formally requesting financial assistance. My income is ${Math.round(percentFPL)}% of the Federal Poverty Level, which qualifies for Charity Care protections. I request a copy of your FAP policy and confirmation that all collection activities will be paused during this review. My contact info is ${patientPhone} and ${patientEmail}.`;

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
  
  // 30-Day Window Logic
  let timeSensitiveText = "";
  let scriptUrgency = "";
  
  if (data.noticeDate) {
    const todayDate = new Date();
    const parts = data.noticeDate.split('/'); // Assuming MM/DD/YYYY from input mask
    if (parts.length === 3) {
       const noticeDate = new Date(parts[2], parts[0]-1, parts[1]);
       const diffTime = todayDate - noticeDate;
       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
       
       if (diffDays <= 30) {
         timeSensitiveText = `I am submitting this dispute within the 30-day validation period following your initial notice dated ${data.noticeDate}. Pursuant to 15 U.S.C. § 1692g(b), you must CEASE ALL COLLECTION EFFORTS until you obtain verification of the debt and mail it to me. Failure to pause collections during this mandatory period is a violation of federal law.`;
         scriptUrgency = `I am calling within the 30-day validation window. You are federally required to stop all collection activity immediately until you send me proof of this debt.`;
       }
    }
  }

  // Handle "Other" option with custom input for issue type
  let disputeReason;
  if (data.issueType === "Other" && data.customReason) {
    disputeReason = `I am exercising my rights under the FDCPA to dispute this debt because: ${data.customReason.trim()}.`;
  } else if (data.issueType) {
    const issueTypeText = clean(data.issueType, "Issue Type");
    disputeReason = `I am disputing this debt on the following grounds: ${issueTypeText}.`;
  } else {
    disputeReason = "I do not acknowledge this debt as mine at this time.";
  }

  const letter = `${today}

To: ${agencyName}
Re: Debt validation request (FDCPA)
Original provider: ${originalProvider}
Account: ${accountNumber}
Amount: ${debtAmount}

To Whom It May Concern:

Pursuant to the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692g, I am exercising my right to request formal validation of this debt. ${disputeReason}

${timeSensitiveText}

I demand that you provide the following documentation within 30 days:

1. The original signed contract or agreement establishing my liability.
2. A complete itemized accounting from the original healthcare provider showing how the balance was calculated.
3. Proof that you are licensed to collect debts in my state.
4. Verification that the statute of limitations has not expired on this debt.
5. Documentation proving the legal assignment or transfer of this debt from the original creditor to your agency.

Until this debt is properly validated in writing, I require that you:
- CEASE AND DESIST all collection activities, phone calls, and written communications.
- REFRAIN from reporting this account to any credit reporting agency or updating any existing tradeline.
- HALT any legal proceedings, wage garnishments, or bank levies.

Pursuant to 15 U.S.C. § 1692g, if you cannot provide original proof of this debt and a complete itemized accounting from the original healthcare provider within 30 days, this debt must be removed from my credit profile immediately.

Any violation of the FDCPA will result in formal complaints filed with the Consumer Financial Protection Bureau (CFPB), the Federal Trade Commission (FTC), and my State Attorney General's office, as well as potential legal action for statutory damages.

Sincerely,
${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I am formally exercising my rights under the Fair Debt Collection Practices Act. ${scriptUrgency || "I am requesting full debt validation."} I need you to mail me the original signed contract and itemized accounting. Until this is provided, you must cease all collection calls and stop reporting to credit bureaus. My contact info is ${patientPhone} and ${patientEmail}.`;

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
  
  // Handle "Other" option with custom input and specific request types
  let reasonText;
  let urgencyAddendum = '';
  
  if (data.requestReason === "Other" && data.customReason) {
    reasonText = `This request is necessary due to the following clinical factors: ${data.customReason.trim()}.`;
  } else if (data.requestReason === "Urgent/Expedited Request (72-hour requirement)") {
    reasonText = "This procedure is medically necessary based on peer-reviewed clinical guidelines and my treating physician's assessment.";
    urgencyAddendum = "\n\nDue to the urgent nature of my condition, any delay in treatment could seriously jeopardize my health. I am formally invoking the 72-hour expedited review timeline as mandated by federal regulations. Under these regulations, health plans must make a determination on urgent prior authorization requests within 72 hours. Failure to meet this timeline will be considered a denial, and I will proceed with the service and file an immediate grievance.";
  } else if (data.requestReason === "Appeal of Denied Auth (Request Peer-to-Peer)") {
    reasonText = "This is a formal appeal of a previously denied prior authorization. The procedure is medically necessary as evidenced by clinical documentation and peer-reviewed medical literature.";
    urgencyAddendum = "\n\nI am formally requesting a Peer-to-Peer review between the denying medical director and my treating physician to discuss the clinical evidence and medical necessity of this procedure. Under state and federal regulations, I am entitled to have a physician of the same or similar specialty review this case. Please provide the name, credentials, and direct contact information of the reviewing physician, along with the specific internal clinical criteria or guideline used to deny this authorization.";
  } else {
    reasonText = "This procedure is medically necessary based on clinical guidelines and my current diagnosis as documented by my treating physician.";
  }

  const letter = `${today}

To: ${insuranceCompany} Utilization Review Department
Re: Prior Authorization Request
Provider: ${providerName}
Service: ${service}
Request Type: ${requestReason}

To the Utilization Review Department:

I am writing to request prior authorization for ${service}. ${reasonText}${urgencyAddendum}

Delays in approval may result in a significant decline in my health status and could constitute a breach of the plan's duty to provide timely access to medically necessary care. 

If this request is denied, I require the following in writing:
1. The specific clinical criteria, medical policy, or guideline used to make this determination.
2. The name and credentials of the physician who reviewed this case.
3. A detailed explanation of how my case fails to meet medical necessity criteria.
4. Information on my appeal rights, including external review options.

I expect a determination within the legally mandated timeframe. Any unreasonable delay will be escalated to the State Department of Insurance as a violation of timely access regulations.

Sincerely,
${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I'm calling about a prior authorization request for ${service} with ${insuranceCompany}. ${data.requestReason === "Urgent/Expedited Request (72-hour requirement)" ? "This is an urgent request requiring a 72-hour expedited review due to the serious nature of my condition." : data.requestReason === "Appeal of Denied Auth (Request Peer-to-Peer)" ? "This is an appeal of a denial, and I am formally requesting a Peer-to-Peer review with the medical director and my treating physician." : "This service is medically necessary based on my physician's clinical assessment."} If denied, I need the specific clinical criteria, the reviewing physician's name and credentials, and information on my appeal rights. My contact info is ${patientPhone} and ${patientEmail}.`;

  return { letter, script };
}
function generateGFEDisputeContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const providerName = clean(data.providerName, "Provider/Facility Name");
  const dateOfService = clean(data.dateOfService, "Date of Service");
  const estimatedAmount = clean(data.estimatedAmount, "Estimated Amount");
  const billedAmount = clean(data.billedAmount, "Billed Amount");
  const issueType = clean(data.issueType, "Issue Type");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  
  // Parse amounts into numbers (strip $ and commas)
  const parseAmount = (str) => {
    const cleaned = str.replace(/[$,]/g, '').trim();
    return parseFloat(cleaned) || 0;
  };
  
  const estimatedNum = parseAmount(data.estimatedAmount || '0');
  const billedNum = parseAmount(data.billedAmount || '0');
  const difference = billedNum - estimatedNum;
  
  // Handle "Never received an estimate" option separately
  if (data.issueType === "Never received an estimate") {
    const letter = `${today}

To: ${providerName} Billing Department
Re: Good Faith Estimate Violation — No Estimate Provided
Date of service: ${dateOfService}
Actual amount billed: ${billedAmount}

To Whom It May Concern:

Under the No Surprises Act (45 CFR § 149.610), uninsured and self-pay patients are entitled to receive a Good Faith Estimate at least 1 business day before scheduled services or at the time of booking for services within 3 days. I never received this legally required estimate. The failure to provide a GFE is a federal violation, and I cannot be held responsible for charges I was not properly informed of in advance.

I demand an immediate billing adjustment to a reasonable and customary rate for these services. This account must be placed on hold and not reported to collections or credit bureaus while this matter is investigated.

If this is not resolved within 30 days, I will file a formal complaint with the CMS No Surprises Help Desk at 1-800-985-3059.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

    const script = `Hello, my name is ${patientName}. I never received a Good Faith Estimate as required by the No Surprises Act. Without this mandatory disclosure, I cannot be held responsible for these charges. I need an adjustment to a reasonable rate or I will escalate to CMS immediately at 1-800-985-3059. My contact info is ${patientPhone} and ${patientEmail}.`;
    
    return { letter, script };
  }
  
  // Handle "Other" option with custom input
  if (data.issueType === "Other" && data.customReason) {
    const letter = `${today}

To: ${providerName} Billing Department
Re: Good Faith Estimate Dispute
Date of service: ${dateOfService}
Good Faith Estimate provided: ${estimatedAmount}
Actual amount billed: ${billedAmount}

To Whom It May Concern:

I am disputing this charge under federal self-pay protections because: ${data.customReason.trim()}.

I request an immediate billing adjustment to reflect the original Good Faith Estimate or a reasonable and customary rate for these services. This account must be placed on hold and not reported to collections or credit bureaus while this matter is resolved.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

    const script = `Hello, my name is ${patientName}. I'm disputing this bill because: ${data.customReason.trim()}. I need a billing adjustment. My contact info is ${patientPhone} and ${patientEmail}.`;
    
    return { letter, script };
  }
  
  // CONDITION C: Billed amount does not exceed estimate (no valid dispute)
  if (difference <= 0) {
    return { 
      letter: "System Notice: Your billed amount does not exceed your Good Faith Estimate. A Good Faith Estimate dispute is not applicable in this case. If you believe there are other billing errors, please use the Medical Bill Dispute Letter tool instead.", 
      script: "N/A — No dispute necessary. The billed amount is equal to or less than your estimate." 
    };
  }
  
  // CONDITION A: Difference >= $400 (Federal PPDR Protection Applies)
  if (difference >= 400) {
    const letter = `${today}

To: ${providerName} Billing Department
Re: Good Faith Estimate Dispute — Patient-Provider Dispute Resolution (PPDR)
Date of service: ${dateOfService}
Good Faith Estimate provided: ${estimatedAmount}
Actual amount billed: ${billedAmount}
Difference: $${difference.toFixed(2)}

To Whom It May Concern:

I am formally disputing the charges on this account pursuant to the No Surprises Act Patient-Provider Dispute Resolution (PPDR) process under 45 CFR § 149.620.

The billed amount of ${billedAmount} exceeds my Good Faith Estimate of ${estimatedAmount} by $${difference.toFixed(2)}. Because this exceeds the $400 threshold established by federal law, I am protected under the No Surprises Act PPDR process.

Under federal law, uninsured and self-pay patients are entitled to receive a binding Good Faith Estimate. When the actual billed amount exceeds the estimate by $400 or more, patients have the right to initiate a PPDR dispute and demand that the provider honor the original estimate.

I demand an immediate adjustment of this bill to match the original Good Faith Estimate of ${estimatedAmount}. If this matter is not resolved within 30 days, I will initiate a formal PPDR claim through the CMS No Surprises Help Desk at 1-800-985-3059.

This account must be placed on hold and not reported to collections or credit bureaus while this federal dispute is pending.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

    const script = `Hello, my name is ${patientName}. I'm calling to dispute charges for my visit on ${dateOfService}. The billed amount of ${billedAmount} exceeds my Good Faith Estimate of ${estimatedAmount} by $${difference.toFixed(2)}. Because this exceeds the $400 federal threshold, I am protected under the No Surprises Act PPDR process. I demand this be adjusted to match my original estimate immediately, or I will file a formal complaint with the CMS Help Desk at 1-800-985-3059. Please place a hold on this account. My contact info is ${patientPhone} and ${patientEmail}.`;
    
    return { letter, script };
  }
  
  // CONDITION B: 0 < Difference < $400 (Standard Negotiation, No Federal Protection)
  const letter = `${today}

To: ${providerName} Billing Department
Re: Good Faith Estimate Billing Discrepancy
Date of service: ${dateOfService}
Good Faith Estimate provided: ${estimatedAmount}
Actual amount billed: ${billedAmount}
Difference: $${difference.toFixed(2)}

To Whom It May Concern:

I am writing to request a billing adjustment for the charges on this account. The billed amount of ${billedAmount} exceeds my Good Faith Estimate of ${estimatedAmount} by $${difference.toFixed(2)}.

While this discrepancy does not meet the federal PPDR threshold of $400, it violates the principle of good faith billing that underlies the No Surprises Act. Patients who receive a Good Faith Estimate rely on that estimate to make informed financial decisions about their care.

I request a billing adjustment to reflect the original Good Faith Estimate of ${estimatedAmount}. Charging significantly more than the estimate provided undermines patient trust and contradicts the intent of federal billing transparency requirements.

Please review this account and provide a written response within 30 days regarding your willingness to honor the original estimate. This account should be placed on hold from collections while this request is under review.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I'm calling about my bill for ${dateOfService}. The amount of ${billedAmount} is $${difference.toFixed(2)} more than my Good Faith Estimate of ${estimatedAmount}. While this doesn't meet the $400 federal threshold, it still violates good faith billing principles. I'm requesting an adjustment to match the original estimate. Please review this and place a hold on collections. My contact info is ${patientPhone} and ${patientEmail}.`;
  
  return { letter, script };
}
function generateCreditRemovalContent(data) {
  const clean = (value, placeholder) => (value && value.trim() ? value.trim() : `[${placeholder}]`);
  const today = new Date().toLocaleDateString();
  const agencyName = clean(data.agencyName, "Credit Bureau / Collector Name");
  const accountNumber = clean(data.accountNumber, "Account Number");
  const debtAmount = clean(data.debtAmount, "Debt Amount");
  const issueType = clean(data.issueType, "Issue Type");
  const patientName = clean(data.patientName, "Patient Name");
  const patientAddress = clean(data.patientAddress, "Patient Address");
  const patientPhone = clean(data.patientPhone, "Patient Phone");
  const patientEmail = clean(data.patientEmail, "Patient Email");
  
  // Math Validation for < $500 Rule
  const cleanAmountNum = parseFloat((data.debtAmount || "0").replace(/[^0-9.]/g, ""));
  const isUnder500 = cleanAmountNum > 0 && cleanAmountNum < 500;
  
  let issue;
  let additionalArgument = "";
  
  if (data.issueType === "Other" && data.customReason) {
    issue = {
      letter: `Reporting this account violates my rights under the FCRA because: ${data.customReason.trim()}.`,
      script: `This account violates FCRA rules because: ${data.customReason.trim()}.`
    };
  } else {
    // If user selected "Debt is under $500", use that template.
    // If they selected something else, but the math says < $500, we will Force/Add that argument.
    const templateKey = `Credit — ${data.issueType || "Debt is under $500"}`;
    issue = issueTemplates[templateKey] || issueTemplates["Credit — Debt is under $500"];
  }
  
  if (isUnder500 && data.issueType !== "Debt is under $500") {
     additionalArgument = `\n\nCRITICALLY, the balance of this account ($${cleanAmountNum}) is under the $500 federal reporting threshold. Under the Consumer Financial Protection Bureau (CFPB) guidelines and the three bureaus' (Equifax, Experian, TransUnion) own settlement rules, medical collection debt under $500 MUST NOT appear on credit reports. This single fact legally mandates immediate deletion.`;
  }
  
  const issueLetter = normalizeHello(issue.letter);

  const letter = `${today}

To: ${agencyName}
Re: Demand for Deletion of Medical Debt Under FCRA
Account Number: ${accountNumber}
Amount: ${debtAmount}

To Whom It May Concern:

I am writing to formally dispute the medical collection account listed above and demand its immediate deletion from my credit file pursuant to the Fair Credit Reporting Act (FCRA) as amended in 2023.

${issueLetter}${additionalArgument}

The FCRA amendments enacted in 2023 prohibit the following medical debts from being reported on consumer credit reports:
1. Medical collection debts under $500 (regardless of payment status or age)
2. Paid or settled medical collection debts (must be removed immediately upon verification)
3. Medical collection debts less than 365 days old (one-year waiting period required)

This account falls under one or more of these prohibited categories and cannot legally remain on my credit file. Continued reporting constitutes a willful violation of federal consumer protection law.

I demand the following actions within 30 days:
1. Immediate deletion of this tradeline from my credit file at Experian, Equifax, and TransUnion.
2. Written confirmation of deletion sent to my address below.
3. Cessation of all collection activities on this account.

Failure to comply will result in:
- A formal complaint filed with the Consumer Financial Protection Bureau (CFPB)
- A complaint filed with the Federal Trade Commission (FTC)
- Potential legal action seeking statutory damages of $100 to $1,000 per violation under 15 U.S.C. § 1681n

I expect immediate compliance with federal law.

Sincerely,

${patientName}
${patientAddress}
${patientPhone}
${patientEmail}`;

  const script = `Hello, my name is ${patientName}. I am disputing a medical collection account #${accountNumber} for ${debtAmount} that is being illegally reported on my credit file. ${issue.script} ${isUnder500 ? "Also, since this debt is under $500, it is automatically banned from credit reporting." : ""} I demand immediate deletion from all three credit bureaus and written confirmation within 30 days. If this is not resolved, I will file complaints with the CFPB. My contact info is ${patientPhone} and ${patientEmail}.`;

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
      // Initialize count-up animation
      initCountUpAnimation();
    }, 100);
    bindNavigation();
    setupBillScanning(); // Initialize OCR
    setupQuizLogic(); // Initialize quiz
    return;
  }
  
  if (infoPages[normalizedPath]) {
    renderInfoPage(normalizedPath);
  } else if (toolRoutes.some((tool) => tool.routePath === normalizedPath)) {
    renderToolPage(normalizedPath);
  } else {
    renderHomePage();
    // Initialize count-up animation after home page renders
    setTimeout(initCountUpAnimation, 100);
  }

  bindNavigation();
  
  // Initialize quiz if on home page
  if (normalizedPath === "/") {
    setupBillScanning();
    setupQuizLogic();
  }

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
  setupTool({
    formId: "gfe-dispute-form",
    letterOutputId: "gfe-letter-output",
    scriptOutputId: "gfe-script-output",
    pdfFileName: "fixmymedicalbill-gfe-dispute.pdf",
    pdfHeader: "FixMyMedicalBill — GFE Dispute",
    generate: generateGFEDisputeContent,
  });
  setupTool({
    formId: "credit-removal-form",
    letterOutputId: "credit-letter-output",
    scriptOutputId: "credit-script-output",
    pdfFileName: "fixmymedicalbill-credit-removal.pdf",
    pdfHeader: "FixMyMedicalBill — Credit Report Removal",
    generate: generateCreditRemovalContent,
  });
  
  // Auto-fill form fields from saved audit data
  initAutoFill();
}

// ========== AUTO-FILL FROM LOCAL STORAGE ==========

function initAutoFill() {
  try {
    const savedAudit = localStorage.getItem('lastAudit');
    if (!savedAudit) {
      console.log('[AutoFill] No saved audit data found');
      return;
    }
    
    const auditData = JSON.parse(savedAudit);
    console.log('[AutoFill] Retrieved audit data:', auditData);
    
    // Auto-fill billAmount field
    const billAmountField = document.getElementById('billAmount');
    if (billAmountField && auditData.billTotal) {
      billAmountField.value = `$${auditData.billTotal.toLocaleString('en-US')}`;
      console.log('[AutoFill] ✓ Filled billAmount:', billAmountField.value);
    }
    
    // Auto-fill issueType field based on detected violations
    const issueTypeField = document.getElementById('issueType') || 
                           document.getElementById('urgentIssueType') || 
                           document.getElementById('collectionIssueType');
    
    if (issueTypeField && auditData.auditFindings && auditData.auditFindings.length > 0) {
      // Get the most common error type from audit findings
      const errorTypes = auditData.auditFindings.map(f => f.errorType);
      const mostCommonError = errorTypes[0]; // Take first detected error
      
      // Map error types to select options
      const errorTypeMapping = {
        'Upcoding': 'Incorrect coding (upcoding)',
        'Unbundling': 'Unbundled charges',
        'Phantom Billing': 'Phantom charges (billed but not received)',
        'Facility Fee Abuse': 'Excessive facility fees',
        'Charity Care Eligibility': 'Financial assistance qualifying',
        'Balance Billing': 'Balance billing (No Surprises Act)',
        'Out-of-Network': 'Out-of-network surprise billing'
      };
      
      const mappedValue = errorTypeMapping[mostCommonError];
      
      // Try to find matching option in select
      const options = Array.from(issueTypeField.options);
      const matchingOption = options.find(opt => 
        opt.value.toLowerCase().includes(mostCommonError.toLowerCase()) ||
        opt.text.toLowerCase().includes(mostCommonError.toLowerCase()) ||
        (mappedValue && (opt.value === mappedValue || opt.text === mappedValue))
      );
      
      if (matchingOption) {
        issueTypeField.value = matchingOption.value;
        console.log('[AutoFill] ✓ Filled issueType:', matchingOption.value);
      } else {
        // Default to first non-placeholder option
        const firstOption = options.find(opt => opt.value && opt.value !== '');
        if (firstOption) {
          issueTypeField.value = firstOption.value;
          console.log('[AutoFill] ⚠️ No exact match. Using first option:', firstOption.value);
        }
      }
    }
    
    console.log('[AutoFill] ✓ Auto-fill complete');
    
  } catch (error) {
    console.error('[AutoFill] Error loading saved audit data:', error);
  }
}

// ========== GLOBAL VARIABLES ==========
let currentBillCategory = null;
let currentBillText = null;
let detectedAmount = null;
let auditResults = {
  detectedFlags: [],
  errorProbability: 0,
  estimatedRefund: 0,
  initialSavings: 0,
  adjustmentMultiplier: 1.0,
  violationCount: 0,
  finalVerdict: '',
  auditFindings: [] // Track error types from quiz responses
};
let quizResponses = [];

// ========== AI FLAG DETECTION FUNCTIONS ==========

// Detect upcoding (high-level codes for low-severity visits)
function detectUpcoding(category, text, responses) {
  const textUpper = text.toUpperCase();
  
  if (category === 'Emergency Room') {
    // Check for Level 4/5 codes but long wait times or brief visits
    const hasHighLevelCode = textUpper.includes('99284') || textUpper.includes('99285') || textUpper.includes('LEVEL 5') || textUpper.includes('LEVEL 4');
    const hasLongWait = responses.some(r => r.question.includes('Triage') && r.answer === 'yes');
    const hasBriefVisit = responses.some(r => r.question.includes('5 minutes') && r.answer === 'yes');
    
    if (hasHighLevelCode && (hasLongWait || hasBriefVisit)) {
      return {
        detected: true,
        severity: 'high',
        description: 'High-level ER coding (Level 4/5) inconsistent with brief consultation or prolonged wait time',
        impact: 350
      };
    }
  }
  
  if (category === 'General Doctor Visit') {
    const hasNewPatientFee = responses.some(r => r.question.includes('New Patient') && r.answer === 'yes');
    if (hasNewPatientFee) {
      return {
        detected: true,
        severity: 'moderate',
        description: 'Charged as new patient for existing patient relationship',
        impact: 150
      };
    }
  }
  
  return { detected: false, severity: 'none', description: '', impact: 0 };
}

// Detect unbundling (separate charges for items included in facility fee)
function detectUnbundling(category, text, responses) {
  const textUpper = text.toUpperCase();
  
  if (category === 'Emergency Room') {
    const hasRoutineSupplies = responses.some(r => r.question.includes('Routine Supplies') && r.answer === 'yes');
    const hasFacilityFee = textUpper.includes('FACILITY') || textUpper.includes('0450');
    
    if (hasRoutineSupplies && hasFacilityFee) {
      return {
        detected: true,
        severity: 'high',
        description: 'Routine supplies billed separately despite facility fee (unbundling violation)',
        impact: 200
      };
    }
  }
  
  if (category === 'Surgery & Inpatient') {
    const hasAssistantSurgeon = responses.some(r => r.question.includes('Assistant Surgeon') && r.answer === 'yes');
    if (hasAssistantSurgeon) {
      return {
        detected: true,
        severity: 'high',
        description: 'Surprise assistant surgeon charges (likely out-of-network)',
        impact: 500
      };
    }
  }
  
  return { detected: false, severity: 'none', description: '', impact: 0 };
}

// Detect math errors (subtotal + tax ≠ total)
function detectMathErrors(text) {
  const textUpper = text.toUpperCase();
  
  // Extract subtotal
  const subtotalMatch = text.match(/SUBTOTAL[\s:]*\$?([\d,]+\.\d{2})/i);
  const taxMatch = text.match(/TAX[\s:]*\$?([\d,]+\.\d{2})/i);
  const totalMatch = text.match(/TOTAL[\s:]*\$?([\d,]+\.\d{2})/i);
  
  if (subtotalMatch && totalMatch) {
    const subtotal = parseFloat(subtotalMatch[1].replace(/,/g, ''));
    const tax = taxMatch ? parseFloat(taxMatch[1].replace(/,/g, '')) : 0;
    const total = parseFloat(totalMatch[1].replace(/,/g, ''));
    
    const calculatedTotal = subtotal + tax;
    const difference = Math.abs(calculatedTotal - total);
    
    if (difference > 1.0) { // Allow $1 rounding tolerance
      return {
        detected: true,
        severity: 'moderate',
        description: `Math error: Subtotal ($${subtotal.toFixed(2)}) + Tax ($${tax.toFixed(2)}) ≠ Total ($${total.toFixed(2)})`,
        impact: Math.round(difference)
      };
    }
  }
  
  return { detected: false, severity: 'none', description: '', impact: 0 };
}

// Detect time-based coding errors
function detectTimeErrors(category, text, responses) {
  if (category === 'Surgery & Inpatient') {
    const hasAnesthesiaTimeMismatch = responses.some(r => r.question.includes('Anesthesia') && r.answer === 'no');
    if (hasAnesthesiaTimeMismatch) {
      return {
        detected: true,
        severity: 'high',
        description: 'Anesthesia time does not match surgery duration (billed in 15-min increments)',
        impact: 300
      };
    }
  }
  
  return { detected: false, severity: 'none', description: '', impact: 0 };
}

// ========== AMOUNT EXTRACTION LOGIC ==========

function extractAmount(text) {
  if (!text) return null;

  // Patterns to match common bill amount labels
  const patterns = [
    /TOTAL[\s:]*\$?([\d,]+\.\d{2})/i,
    /AMOUNT\s+DUE[\s:]*\$?([\d,]+\.\d{2})/i,
    /BALANCE\s+DUE[\s:]*\$?([\d,]+\.\d{2})/i,
    /TOTAL\s+AMOUNT[\s:]*\$?([\d,]+\.\d{2})/i,
    /PATIENT\s+BALANCE[\s:]*\$?([\d,]+\.\d{2})/i,
    /\$([\d,]+\.\d{2})/g // Fallback: any dollar amount
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const amount = match[1].replace(/,/g, '');
      const numAmount = parseFloat(amount);
      
      // Only accept reasonable amounts ($10 - $100,000)
      if (numAmount >= 10 && numAmount <= 100000) {
        console.log(`[Amount Extraction] Detected: $${match[1]} (parsed: ${numAmount})`);
        return match[1]; // Return with commas for display
      }
    }
  }

  console.log('[Amount Extraction] No valid amount found');
  return null;
}

// ========== MEDICAL BILL CLASSIFICATION LOGIC ==========

function classifyBill(text) {
  if (!text || text.trim().length === 0) {
    console.warn('No text provided for classification');
    return null;
  }

  const normalizedText = text.toUpperCase();
  
  // ========== ACTION 1: EOB INTERCEPTOR ==========
  // Detect "Explanation of Benefits" documents
  const eobKeywords = [
    'EXPLANATION OF BENEFITS',
    'THIS IS NOT A BILL',
    'AMOUNT ALLOWED',
    'AMOUNT NOT COVERED',
    'PLAN PAYS',
    'YOU MAY OWE',
    'YOUR PLAN PAID',
    'BENEFIT SUMMARY'
  ];
  
  const hasEobKeyword = eobKeywords.some(keyword => normalizedText.includes(keyword));
  
  if (hasEobKeyword) {
    console.log('[EOB Interceptor] ✓ Explanation of Benefits detected. Redirecting to Claim Denied Appeal.');
    return {
      category: 'Claim Denied',
      route: '/insurance-claim-denied-appeal',
      confidence: 'high',
      isEOB: true
    };
  }
  // ========== END EOB INTERCEPTOR ==========
  
  // ========== ACTION 2: GATEKEEPER - Check basic medical bill keywords ==========
  const basicMedicalKeywords = [
    'TOTAL',
    'AMOUNT',
    'PATIENT',
    'HOSPITAL',
    'CLINIC',
    'STATEMENT',
    'INVOICE',
    'BILL',
    'CHARGE',
    'SERVICE',
    'MEDICAL',
    'PROVIDER'
  ];
  
  const hasMedicalKeyword = basicMedicalKeywords.some(keyword => normalizedText.includes(keyword));
  // ========== END GATEKEEPER CHECK ==========

  const categories = {
    'Emergency Room': { codeScore: 0, keywordScore: 0, route: '/urgent-care-bill-dispute' },
    'Ambulance': { codeScore: 0, keywordScore: 0, route: '/out-of-network-billing-dispute' },
    'Surgery & Inpatient': { codeScore: 0, keywordScore: 0, route: '/medical-bill-dispute-letter' },
    'General Doctor Visit': { codeScore: 0, keywordScore: 0, route: '/medical-bill-dispute-letter' }
  };

  // ===== EMERGENCY ROOM (ER) =====
  // CPT Codes
  const erCptCodes = ['99281', '99282', '99283', '99284', '99285'];
  erCptCodes.forEach(code => {
    if (normalizedText.includes(code)) {
      categories['Emergency Room'].codeScore += 10;
      console.log(`[ER] CPT Code found: ${code}`);
    }
  });

  // Revenue Code
  if (/REV\s*0*450|REVENUE\s*0*450|0450/.test(normalizedText)) {
    categories['Emergency Room'].codeScore += 10;
    console.log('[ER] Revenue Code 0450 found');
  }

  // Keywords
  if (/EMERGENCY\s*(DEPT|DEPARTMENT|ROOM|SERVICE)/i.test(text)) {
    categories['Emergency Room'].keywordScore += 5;
    console.log('[ER] Emergency keyword found');
  }
  if (/TRIAGE/i.test(text)) {
    categories['Emergency Room'].keywordScore += 3;
    console.log('[ER] Triage keyword found');
  }
  if (/FACILITY\s*FEE/i.test(text)) {
    categories['Emergency Room'].keywordScore += 3;
    console.log('[ER] Facility Fee keyword found');
  }

  // ===== AMBULANCE =====
  // HCPCS Codes
  const ambulanceHcpcs = ['A0425', 'A0426', 'A0427', 'A0428', 'A0429', 'A0433'];
  ambulanceHcpcs.forEach(code => {
    if (normalizedText.includes(code)) {
      categories['Ambulance'].codeScore += 10;
      console.log(`[Ambulance] HCPCS Code found: ${code}`);
    }
  });

  // Keywords
  if (/AMBULANCE/i.test(text)) {
    categories['Ambulance'].keywordScore += 5;
    console.log('[Ambulance] Ambulance keyword found');
  }
  if (/PARAMEDIC/i.test(text)) {
    categories['Ambulance'].keywordScore += 3;
    console.log('[Ambulance] Paramedic keyword found');
  }
  if (/GROUND\s*TRANSPORT/i.test(text)) {
    categories['Ambulance'].keywordScore += 4;
    console.log('[Ambulance] Ground Transport keyword found');
  }
  if (/LIFE\s*SUPPORT\s*(ALS|BLS)/i.test(text)) {
    categories['Ambulance'].keywordScore += 4;
    console.log('[Ambulance] Life Support keyword found');
  }

  // ===== SURGERY & INPATIENT =====
  // Revenue Codes
  if (/REV\s*0*36[01]|REVENUE\s*0*36[01]|036[01]/.test(normalizedText)) {
    categories['Surgery & Inpatient'].codeScore += 10;
    console.log('[Surgery] Operating Room Revenue Code found');
  }
  if (/REV\s*0*250|REVENUE\s*0*250|0250/.test(normalizedText)) {
    categories['Surgery & Inpatient'].codeScore += 8;
    console.log('[Surgery] Pharmacy Revenue Code found');
  }

  // Keywords
  if (/OPERATING\s*ROOM/i.test(text)) {
    categories['Surgery & Inpatient'].keywordScore += 5;
    console.log('[Surgery] Operating Room keyword found');
  }
  if (/ANESTHESIA/i.test(text)) {
    categories['Surgery & Inpatient'].keywordScore += 4;
    console.log('[Surgery] Anesthesia keyword found');
  }
  if (/SURGICAL/i.test(text)) {
    categories['Surgery & Inpatient'].keywordScore += 4;
    console.log('[Surgery] Surgical keyword found');
  }
  if (/INPATIENT/i.test(text)) {
    categories['Surgery & Inpatient'].keywordScore += 4;
    console.log('[Surgery] Inpatient keyword found');
  }

  // ===== GENERAL DOCTOR VISIT =====
  // Keywords
  if (/CHECK\s*UP/i.test(text)) {
    categories['General Doctor Visit'].keywordScore += 5;
    console.log('[General] Check Up keyword found');
  }
  if (/PHYSICIAN/i.test(text)) {
    categories['General Doctor Visit'].keywordScore += 4;
    console.log('[General] Physician keyword found');
  }
  if (/OFFICE\s*VISIT/i.test(text)) {
    categories['General Doctor Visit'].keywordScore += 5;
    console.log('[General] Office Visit keyword found');
  }
  if (/EXAMINATION/i.test(text)) {
    categories['General Doctor Visit'].keywordScore += 3;
    console.log('[General] Examination keyword found');
  }
  if (/\bINVOICE\b/i.test(text)) {
    categories['General Doctor Visit'].keywordScore += 2;
    console.log('[General] Invoice keyword found');
  }
  if (/CONSULTATION/i.test(text)) {
    categories['General Doctor Visit'].keywordScore += 4;
    console.log('[General] Consultation keyword found');
  }

  // ===== DETERMINE WINNER =====
  let bestCategory = null;
  let bestScore = 0;

  Object.entries(categories).forEach(([category, scores]) => {
    // Prioritize code matches (weight 2x) over keywords
    const totalScore = (scores.codeScore * 2) + scores.keywordScore;
    console.log(`[Classification] ${category}: Code=${scores.codeScore}, Keyword=${scores.keywordScore}, Total=${totalScore}`);
    
    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestCategory = category;
    }
  });

  // ========== ACTION 2: GATEKEEPER - Reject if no score and no medical keywords ==========
  if (bestScore === 0 && !hasMedicalKeyword) {
    console.warn('[Gatekeeper] ❌ No medical bill keywords found and score is 0. Rejecting document.');
    return null; // Invalid document
  }
  // ========== END GATEKEEPER ==========

  if (bestScore === 0) {
    console.log('[Classification] No specific category detected, defaulting to Hospital Bill Audit');
    return {
      category: 'Hospital Bill Audit',
      route: '/medical-bill-dispute-letter',
      confidence: 'low'
    };
  }

  console.log(`[Classification] Winner: ${bestCategory} with score ${bestScore}`);
  return {
    category: bestCategory,
    route: categories[bestCategory].route,
    confidence: bestScore >= 10 ? 'high' : 'medium'
  };
}

// ========== OCR BILL SCANNING LOGIC ==========

function setupBillScanning() {
  const billUpload = document.getElementById('bill-upload');
  // Correctly target the class from renderHero
  const dropZone = document.querySelector('.hero-cta-section'); 
  const quickAuditorSection = document.getElementById('quick-auditor');
  const scanProgress = document.getElementById('scan-progress');
  const scanProgressFill = document.getElementById('scan-progress-fill');
  const scanProgressText = document.getElementById('scan-progress-text');

  if (!billUpload || !dropZone) return; 

  async function convertPDFToImage(file) {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    } catch (error) {
      console.error('PDF conversion error:', error);
      throw new Error('Failed to convert PDF to image');
    }
  }

  function showManualFallback(reason = 'unreadable') {
    const auditorQuizWrapper = document.getElementById('auditor-quiz-wrapper');
    if (!auditorQuizWrapper) return;

    if (scanProgress) scanProgress.style.display = 'none';
    if (quickAuditorSection) quickAuditorSection.style.display = 'block';
    auditorQuizWrapper.style.display = 'block';

    auditorQuizWrapper.innerHTML = `
      <div class="tool-panel manual-fallback" style="animation: fadeInUp 0.4s ease; width: 100%; max-width: 600px; margin: 0 auto; text-align: left;">
        <h3 class="question-title" style="text-align: center;">${reason === 'unreadable' ? "We couldn't clearly read your document." : "This doesn't appear to be a medical bill."}</h3>
        <p class="question-context" style="text-align: center; margin-bottom: 24px; font-size: 14.5px; line-height: 1.5;">
          We couldn't detect billing codes. A deep audit requires an <strong>Itemized Bill (with CPT codes)</strong>, not a summary or receipt.<br><br>
          Please enter your basic details below. We will help you generate a formal legal request for an itemized bill.
        </p>
        <div class="form-grid">
          <div class="field"><label>Facility / Provider Name</label><input type="text" id="manual-facility" class="accent-focus" placeholder="e.g. City General Hospital"></div>
          <div class="field"><label>Total Billed Amount</label><input type="text" id="manual-amount" class="accent-focus" placeholder="$0.00"></div>
        </div>
        <button class="btn" id="manual-submit" style="margin-top: 24px; width: 100%; justify-content: center;">Start AI Audit</button>
      </div>
    `;

    document.getElementById('manual-submit').addEventListener('click', () => {
      const facility = document.getElementById('manual-facility').value.trim() || "Unknown Facility";
      const amount = document.getElementById('manual-amount').value.trim().replace(/[$,]/g, '') || "0";
      
      localStorage.setItem('medicalAuditData', JSON.stringify({ isValid: true, facilityName: facility, totalAmount: amount, issueCategory: "General Doctor Visit" }));
      detectedAmount = amount;
      currentBillCategory = { category: "General Doctor Visit", route: '/medical-bill-dispute-letter' };
      currentBillText = "Manual Entry: " + facility;
      
      // Restore quiz structure
      auditorQuizWrapper.innerHTML = `
        <div class="auditor-header"><h2 class="auditor-title">Find Your Hidden Medical Refund</h2><p class="auditor-subtitle">Answer AI-personalized questions</p></div>
        <div class="quiz-progress-container"><div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-progress"></div></div><div class="quiz-progress-text" id="quiz-progress-text">Question 1 of 4</div></div>
        <div class="quiz-container" id="quiz-container"></div>
        <div class="quiz-result-container" id="quiz-result" style="display: none;">
          <div class="quiz-analyzing" id="quiz-analyzing"><div class="analyzing-spinner"></div><p class="analyzing-text">Analyzing your bill...</p></div>
          <div class="quiz-final-result" id="quiz-final" style="display: none;"><div class="result-badge">Estimated Recovery</div><div class="result-amount" id="result-amount">$0</div><p class="result-description"></p><button class="result-cta-btn" id="quiz-cta-btn"></button><button class="result-reset-btn" id="quiz-reset-btn">Start Over</button></div>
        </div>
      `;
      initializeTargetedQuiz("General Doctor Visit");
    });
  }

  async function processFile(file) {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) { alert('Please upload a valid image file or PDF.'); return; }

    if (quickAuditorSection) {
      quickAuditorSection.style.display = 'block';
      quickAuditorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (scanProgress) {
      scanProgress.style.display = 'flex';
      scanProgressFill.style.width = '30%';
      scanProgressText.textContent = 'Analyzing document with AI...';
    }
    const privacyNotice = document.querySelector('.privacy-notice');
    if (privacyNotice) privacyNotice.style.display = 'none';

    try {
      let fileToProcess = file;
      if (file.type === 'application/pdf') {
        scanProgressText.textContent = 'Converting PDF for AI...';
        const imageBlob = await convertPDFToImage(file);
        fileToProcess = new File([imageBlob], file.name.replace('.pdf', '.png'), { type: 'image/png' });
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(',')[1];
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          if (!apiKey) throw new Error("API Key missing");

          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: "Analyze this US medical bill. Return ONLY flat JSON. Required keys: \"isValid\"(bool), \"facilityName\", \"totalAmount\", \"dateOfService\", \"issueCategory\" (ONE OF: 'Emergency Room', 'Lab & Imaging', 'Surgery & Inpatient', 'General Doctor Visit')." }, { inlineData: { mimeType: fileToProcess.type, data: base64String } }] }],
              generationConfig: { response_mime_type: "application/json" }
            })
          });

          if (!response.ok) {
            if (response.status === 429) { alert("Server busy (429). Please wait 1 minute."); if (scanProgress) scanProgress.style.display = 'none'; return; }
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json();
          let aiText = data.candidates[0].content.parts[0].text.replace(/```json/gi, '').replace(/```/gi, '').trim();
          const aiResult = JSON.parse(aiText);
          const isActuallyValid = aiResult.isValid === true || aiResult.isValid === "true" || !!aiResult.facilityName || !!aiResult.totalAmount;

          if (isActuallyValid) {
            aiResult.isValid = true;
            localStorage.setItem('medicalAuditData', JSON.stringify(aiResult));
            scanProgressFill.style.width = '100%';
            scanProgressText.textContent = 'Analysis Complete! Preparing Audit...';

            setTimeout(() => {
              if (scanProgress) scanProgress.style.display = 'none';
              
              // FIX: Use dropZone variable to hide the hero CTA instead of getting by missing ID
              if (dropZone) dropZone.style.display = 'none'; 
              
              const quizWrapper = document.getElementById('auditor-quiz-wrapper');
              if (quizWrapper) quizWrapper.style.display = 'block';

              const category = aiResult.issueCategory || 'General Doctor Visit';
              currentBillCategory = { category: category, route: '/medical-bill-dispute-letter' };
              currentBillText = JSON.stringify(aiResult);
              detectedAmount = aiResult.totalAmount || "0";

              initializeTargetedQuiz(category);
            }, 800);
          } else { throw new Error("Invalid Data"); }
        } catch (inner) { console.error(inner); showManualFallback(); }
      };
      reader.readAsDataURL(fileToProcess);
    } catch (outer) { console.error(outer); showManualFallback(); }
  }

  billUpload.addEventListener('change', async (e) => { if(e.target.files.length > 0) await processFile(e.target.files[0]); });
  
  // Updated click handler to avoid self-triggering
  dropZone.addEventListener('click', (e) => {
    // Only trigger if clicking the container background, not the button/label directly (they handle themselves)
    if (!e.target.closest('.hero-cta-btn') && e.target.id !== 'upload-label' && e.target !== billUpload) {
      billUpload.click();
    }
  });

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(n => dropZone.addEventListener(n, (e) => { e.preventDefault(); e.stopPropagation(); }));
  ['dragenter', 'dragover'].forEach(n => dropZone.addEventListener(n, () => dropZone.classList.add('drag-over')));
  ['dragleave', 'drop'].forEach(n => dropZone.addEventListener(n, () => dropZone.classList.remove('drag-over')));
  dropZone.addEventListener('drop', async (e) => { if (e.dataTransfer.files.length > 0) await processFile(e.dataTransfer.files[0]); });
}

// ========== SMART QUESTION ENGINE - EXPERT QUESTION BANK ==========

// ========== PHASE 2: CPC KNOWLEDGE BASE (CERTIFIED PROFESSIONAL CODER) ==========
const ReferenceAuditRules = {
  Universal: [
    { id: 'u_itemized', issue: "Summary Bill / Hidden Codes", trigger: ["summary", "balance forward", "total due", "previous balance"], questionContext: "Summary bills conceal upcoding and unbundling. HIPAA (45 CFR § 164.524) guarantees the right to an unbundled bill with CPT codes.", weight: 0 },
    { id: 'u_charity', issue: "IRS 501(r) Charity Care", trigger: ["hospital", "medical center", "health system"], questionContext: "Non-profit hospitals are legally mandated to forgive or discount bills for households earning under 300-400% of the Federal Poverty Level.", weight: 1000 },
    { id: 'u_duplicate', issue: "Duplicate Phantom Charge", trigger: ["x2", "quantity 2", "duplicate"], questionContext: "Billing exactly the same CPT code twice on the same date without a valid modifier (like -76) is a classic NCCI violation.", weight: 500 }
  ],
  "Emergency Room": [
    { id: 'er_upcoding', issue: "E/M Severity Upcoding (99284-99285)", trigger: ["99284", "99285", "level 4", "level 5", "high severity"], questionContext: "Code 99285 requires high-complexity medical decision-making (e.g., heart attack, severe trauma). If treated for a minor cut, flu, or simple sprain, this is fraudulent upcoding.", weight: 800 },
    { id: 'er_facility', issue: "Invalid POS 20 Facility Fee", trigger: ["0450", "facility fee", "freestanding"], questionContext: "Freestanding urgent care centers (POS 20) legally cannot charge hospital-grade (POS 22) facility fees.", weight: 600 },
    { id: 'er_supplies', issue: "Routine Supply Unbundling", trigger: ["gloves", "gown", "iv start", "pulse oximetry", "tylenol", "99070"], questionContext: "Under NCCI edits, basic supplies (gloves, oral meds) are bundled into the main E/M visit fee. Separate line items for these are illegal.", weight: 150 }
  ],
  "Surgery & Inpatient": [
    { id: 'surg_timings', issue: "Anesthesia/OR Time Padding", trigger: ["operating room", "anesthesia", "minutes", "time", "01999"], questionContext: "Anesthesia is billed in strict 15-minute increments. Hospitals frequently round up aggressively. Compare billed time vs. actual time under the knife.", weight: 1500 },
    { id: 'surg_implant', issue: "Implant/Device Price Gouging", trigger: ["implant", "screw", "plate", "device", "mesh"], questionContext: "Hospitals often mark up surgical hardware by 300%+. Patients have the right to request the manufacturer's original invoice to dispute the markup.", weight: 2000 },
    { id: 'surg_obs', issue: "Observation Status Trick", trigger: ["observation", "short stay", "0110", "0120"], questionContext: "Staying overnight but classified as 'Observation' means Medicare/Insurance denies rehab coverage. A stay spanning two midnights should be 'Inpatient'.", weight: 3000 },
    { id: 'surg_assistant', issue: "Phantom Assistant Surgeon", trigger: ["assistant", "surgeon", "80", "81", "82", "asst"], questionContext: "Billed for an out-of-network assistant surgeon the patient never met. Highly disputable under the No Surprises Act.", weight: 800 }
  ],
  "General Doctor Visit": [
    { id: 'gen_new', issue: "New Patient Upcoding (99203-99205)", trigger: ["99203", "99204", "99205", "new patient"], questionContext: "If seen by ANY provider in the same practice within 3 years, the patient is 'Established' (9921x). 'New' patient codes pay 30% more and are highly audited.", weight: 200 },
    { id: 'gen_mod25', issue: "Modifier 25 Double-Dipping", trigger: ["25", "modifier 25", "office visit"], questionContext: "Modifier 25 allows an office visit and a minor procedure (e.g., injection) on the same day, BUT only if the visit was a 'significant, separately identifiable' service.", weight: 300 }
  ],
  "Lab & Imaging": [
    { id: 'lab_panel', issue: "Lab Panel Unbundling", trigger: ["80053", "metabolic", "lipid", "cbc", "85025", "venipuncture", "36415"], questionContext: "Routine blood tests must be bundled into a panel (e.g., 80053). Unbundling into individual chemical tests is an NCCI violation.", weight: 400 },
    { id: 'img_read', issue: "Duplicate Interpretation (Modifier 26/TC)", trigger: ["radiology", "reading", "interpretation", "26", "tc"], questionContext: "Billing the Technical Component (the machine) and the Professional Component (doctor reading it) twice by different entities for the same scan.", weight: 500 }
  ]
};

// ========== PHASE 2: AI-POWERED QUIZ GENERATOR (COT-ENFORCED CPC AUDIT) ==========
async function generateAIQuiz(category, extractedText) {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('API key missing');

    const quizContainer = document.getElementById('quiz-container');
    const quizAnalyzing = document.getElementById('quiz-analyzing');
    if (quizContainer) quizContainer.style.display = 'none';
    if (quizAnalyzing) quizAnalyzing.style.display = 'flex';

    const categoryRules = ReferenceAuditRules[category] || ReferenceAuditRules["General Doctor Visit"];
    const combinedRules = [...categoryRules, ...ReferenceAuditRules["Universal"], ...ReferenceAuditRules["Lab & Imaging"]];

    const prompt = `You are an elite Certified Professional Coder (CPC) and Forensic Medical Auditor. Your goal is 99% accuracy in detecting NCCI violations, upcoding, and unbundling.

[EVIDENCE - OCR TEXT FROM BILL]
"""${extractedText.substring(0, 3000)}"""

[EXPERT AUDIT RULES]
${JSON.stringify(combinedRules)}

[YOUR AUDIT PROTOCOL - CHAIN OF THOUGHT]
Step 1: Evaluate Completeness. Does the bill have specific 5-digit CPT codes and itemized prices? Or is it a summary?
Step 2: Line-by-Line Cross-Reference. Match every line item against the Expert Audit Rules.
Step 3: Generate Questions. You MUST inject the EXACT prices, codes, and item names from the OCR text into your questions to prove you are analyzing their specific bill.

[STRICT QUESTION SEQUENCE REQUIREMENTS]
You MUST generate EXACTLY 6 to 8 questions. 
1. Mandatory: "Is your annual household income roughly below $60,000?" (Charity Care check)
2. Mandatory: "Does this document show specific 5-digit CPT codes, or is it just a summary?"
3. Target #1: Find the MOST EXPENSIVE item. Inject its name and price. Ask if it matches the reality of the visit.
4. Target #2: Look for Upcoding (e.g., 99285, 99205, Level 4/5). 
5. Target #3: Look for Unbundling (supplies, labs, IV starts billed separately).
6. Target #4: Look for Phantom charges (providers not seen, excessive time billed).
7/8. Any other specific anomalies. If no more anomalies, ask a standard verification question regarding the duration of the visit.

[OUTPUT FORMAT - JSON ONLY]
Produce ONLY a valid JSON array of objects. No markdown formatting.
CRITICAL: You MUST include a "reasoning" key in each object. This is your internal Chain of Thought explaining WHY you generated this question based on the OCR data.

[
  {
    "id": "q1",
    "reasoning": "I noticed the text includes 'Hospital'. IRS 501r mandates charity care screening for non-profits.",
    "question": "Is your household income roughly below $60,000?",
    "context": "Non-profit hospitals are legally mandated to forgive or discount bills for lower-income patients.",
    "errorType": "Charity Care Eligibility",
    "options": [
      { "label": "Yes", "value": "yes", "weight": 800 },
      { "label": "No", "value": "no", "weight": 0 },
      { "label": "Not Sure", "value": "not-sure", "weight": 400 }
    ]
  },
  {
    "id": "q3",
    "reasoning": "OCR shows 'ER VISIT LEVEL 5' (CPT 99285) billed at $3,250. This requires high complexity. I must verify severity.",
    "question": "I see a charge for 'ER VISIT LEVEL 5' (99285) at $3,250. This code is for life-threatening emergencies. Was your condition truly a severe emergency (like a heart attack or severe trauma)?",
    "context": "Billing a Level 5 code for minor issues (flu, minor cuts) is illegal upcoding under CMS guidelines.",
    "errorType": "E/M Severity Upcoding",
    "options": [
      { "label": "Yes, it was severe", "value": "no", "weight": 0 },
      { "label": "No, it was a minor issue", "value": "yes", "weight": 800 },
      { "label": "Not Sure", "value": "not-sure", "weight": 400 }
    ]
  }
]`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    const data = await response.json();
    let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    aiText = aiText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    
    const aiQuestions = JSON.parse(aiText);
    if (!Array.isArray(aiQuestions) || aiQuestions.length < 5) throw new Error('Invalid or insufficient AI questions');

    console.log('[AI Quiz Generator] ✓ Generated CoT Enforced Questions:', aiQuestions);
    return aiQuestions;

  } catch (error) {
    console.error('[AI Quiz Generator] Error:', error);
    // Return standard 6 fallback questions if API fails
    return [
      { id: 'f1', question: 'Is your household income under $60,000/year?', context: 'Non-profit hospitals must forgive bills for low-to-middle income patients under IRS 501(r).', errorType: 'Charity Care Eligibility', options: [{ label: 'Yes', value: 'yes', weight: 1000 }, { label: 'No', value: 'no', weight: 0 }, { label: 'Not Sure', value: 'not-sure', weight: 500 }] },
      { id: 'f2', question: 'Did you receive a detailed itemized bill with 5-digit CPT codes?', context: 'Hospitals often hide errors in summary bills. You have a legal right to request an itemized bill.', errorType: 'Audit Requirement', options: [{ label: 'Yes', value: 'yes', weight: 0 }, { label: 'No', value: 'no', weight: 0 }, { label: 'Not Sure', value: 'not-sure', weight: 0 }] },
      { id: 'f3', question: 'Does the bill contain any "Facility Fees" for a simple clinic visit?', context: 'Freestanding clinics cannot legally charge hospital-grade facility fees.', errorType: 'Invalid Facility Fee', options: [{ label: 'Yes', value: 'yes', weight: 500 }, { label: 'No', value: 'no', weight: 0 }, { label: 'Not Sure', value: 'not-sure', weight: 200 }] },
      { id: 'f4', question: 'Are you being billed separately for basic supplies (gloves, IV kits, Tylenol)?', context: 'Routine supplies are bundled into the main visit fee under NCCI guidelines. Separate charges are unbundling violations.', errorType: 'Unbundling', options: [{ label: 'Yes', value: 'yes', weight: 300 }, { label: 'No', value: 'no', weight: 0 }, { label: 'Not Sure', value: 'not-sure', weight: 150 }] },
      { id: 'f5', question: 'Was the duration of your actual face-to-face time with the doctor less than 15 minutes?', context: 'Billing for extended, high-complexity visits when the doctor only spent a few minutes is considered upcoding.', errorType: 'E/M Upcoding', options: [{ label: 'Yes', value: 'yes', weight: 400 }, { label: 'No', value: 'no', weight: 0 }, { label: 'Not Sure', value: 'not-sure', weight: 200 }] },
      { id: 'f6', question: 'Are there any providers listed on the bill (like an Assistant Surgeon or Radiologist) that you never met?', context: 'Phantom billing for out-of-network providers you did not choose is a violation of the No Surprises Act.', errorType: 'Surprise Billing', options: [{ label: 'Yes', value: 'yes', weight: 800 }, { label: 'No', value: 'no', weight: 0 }, { label: 'Not Sure', value: 'not-sure', weight: 300 }] }
    ];
  }
}

// ========== GEMINI AI INTEGRATION ==========

// Generate AI-powered audit verdict using Gemini 1.5 Flash
async function generateAIVerdict(extractedText, auditFindings, detectedAmount, quizSavings, quizResponses) {
  try {
    console.log('[Gemini API] Calling AI with audit findings:', auditFindings);
    console.log('[Gemini API] Bill Amount:', detectedAmount, '| Quiz Savings:', quizSavings);
    
    // Validate API key exists
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[Gemini API] ❌ API Key is missing! Check .env file and VITE_GEMINI_API_KEY variable.');
      throw new Error('API key missing');
    }
    
    console.log('[Gemini API] ✓ API Key detected (length:', apiKey.length, 'chars)');
    
    // ========== PHASE 3: INVESTIGATIVE PIVOT DETECTION ==========
    const hasItemizedBill = quizResponses.find(r => 
      r.errorType?.includes('Itemized') || 
      r.errorType?.includes('Audit Requirement') ||
      r.question?.toLowerCase().includes('itemized')
    )?.answer === 'yes';
    
    const notSureCount = quizResponses.filter(r => r.answer === 'not-sure').length;
    
    console.log('[Phase 3] Itemized Bill:', hasItemizedBill, '| Not Sure Count:', notSureCount);
    // ========== END PHASE 3 DETECTION ==========
    
    // Extract specific error types for context
    const hasCharityCare = auditFindings.some(f => f.errorType === 'Charity Care Eligibility');
    const hasUpcoding = auditFindings.some(f => f.errorType === 'Upcoding');
    const hasPhantomBilling = auditFindings.some(f => f.errorType === 'Phantom Billing');
    const hasUnbundling = auditFindings.some(f => f.errorType === 'Unbundling');
    
    // Define strict tool routes list to prevent AI hallucinations
    const toolRoutesList = [
      "/medical-bill-dispute-letter",
      "/insurance-claim-denied-appeal",
      "/urgent-care-bill-dispute",
      "/out-of-network-billing-dispute",
      "/request-itemized-medical-bill",
      "/medical-debt-assistance-plan",
      "/medical-collections-debt-validation",
      "/prior-authorization-request-appeal",
      "/good-faith-estimate-dispute",
      "/medical-credit-report-removal"
    ];
    
    const prompt = `You are a Senior Medical Billing Auditor.

[INPUT DATA]
- Bill Total: $${detectedAmount}
- User Quiz Answers: ${JSON.stringify(quizResponses)}
- Has Itemized Bill: ${hasItemizedBill}
- "Not Sure" Count: ${notSureCount}
- Audit Findings: ${JSON.stringify(auditFindings)}
- Detected Violations: Charity Care=${hasCharityCare}, Upcoding=${hasUpcoding}, Phantom Billing=${hasPhantomBilling}, Unbundling=${hasUnbundling}

[LOGIC RULES - STRICT]
1. CRITICAL: If 'Has Itemized Bill' is FALSE (user answered 'no'), you CANNOT calculate a refund.
   - Return: { "refundProbability": "Low (Need Evidence)", "estimatedRefund": 0, "auditorNote": "Audit Impossible - Summary Bill Detected. Without an itemized bill showing CPT/HCPCS codes, we cannot verify specific charges or identify billing errors. Request an itemized bill immediately to proceed with a proper audit.", "recommendedTool": "Request Itemized Bill" }
   
2. AMBIGUITY: If "Not Sure" count is >= 2, the user lacks information.
   - Return: { "refundProbability": "Low (Insufficient Evidence)", "estimatedRefund": 0, "auditorNote": "Insufficient Evidence for Dispute. Multiple uncertain responses indicate you need more details about your charges. Request an itemized bill to see exact CPT codes, quantities, and line-item charges before proceeding.", "recommendedTool": "Request Itemized Bill" }
   
3. STANDARD: If Itemized Bill = TRUE and Not Sure < 2:
   - Calculate realistic refund based on detected violations (use Quiz Savings as minimum)
   - If Charity Care is eligible, refund should be 60-80% of total bill
   - If Phantom Billing or Upcoding found, use weighted values from quiz
   - Recommend appropriate dispute tool ("Medical Bill Dispute Letter", "Urgent Care Bill Dispute", etc.)

[JSON OUTPUT FORMAT - NO MARKDOWN]
Return strictly valid JSON (no \`\`\`json tags):
{ 
  "refundProbability": "Low (Need Evidence)" | "High (85%)", 
  "estimatedRefund": 0 or Number, 
  "auditorNote": "Professional 2-3 sentence explanation", 
  "recommendedTool": "MUST BE EXACTLY ONE OF THESE STRINGS: ${toolRoutesList.join(', ')}" 
}`;
    
    // Use v1beta endpoint with gemini-3-flash-preview model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    console.log('[Gemini API] Calling URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=***');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    console.log('[Gemini API] Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[Gemini API] ❌ Error response body:', errorBody);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('[Gemini API] ✓ Raw response received:', data);
    
    // Extract text from Gemini response
    let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!aiText) {
      throw new Error('No text in API response');
    }
    
    // Clean markdown code blocks (```json ... ```)
    aiText = aiText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    console.log('[Gemini API] Cleaned response:', aiText);
    
    // Parse JSON
    const aiVerdict = JSON.parse(aiText);
    
    console.log('[Gemini API] Parsed verdict:', aiVerdict);
    
    // ========== SAFEGUARD: Cap unrealistic refunds ==========
    const billAmount = parseFloat(detectedAmount.replace(/,/g, '')) || 0;
    const maxRealisticRefund = billAmount * 0.8; // 80% max cap
    
    if (aiVerdict.estimatedRefund > billAmount) {
      console.warn('[Gemini API] ⚠️ AI returned refund ($' + aiVerdict.estimatedRefund + ') greater than bill ($' + billAmount + '). Capping at 50%.');
      aiVerdict.estimatedRefund = Math.round(billAmount * 0.5);
    } else if (aiVerdict.estimatedRefund > maxRealisticRefund) {
      console.warn('[Gemini API] ⚠️ AI returned refund ($' + aiVerdict.estimatedRefund + ') exceeds 80% of bill. Capping at 80%.');
      aiVerdict.estimatedRefund = Math.round(maxRealisticRefund);
    }
    
    console.log('[Gemini API] Final refund after safeguard:', aiVerdict.estimatedRefund);
    return aiVerdict;
    
  } catch (error) {
    console.error('[Gemini API] Error:', error);
    
    // Fallback: Calculate refund from auditFindings weights
    const fallbackRefund = auditFindings.reduce((sum, finding) => sum + finding.weight, 0);
    const probabilityPercent = Math.min(Math.round((auditFindings.length / 7) * 100), 95);
    
    console.log('[Gemini API] Using fallback calculation: $', fallbackRefund);
    
    return {
      refundProbability: probabilityPercent >= 70 ? `High (${probabilityPercent}%)` : `Moderate (${probabilityPercent}%)`,
      estimatedRefund: fallbackRefund,
      auditorNote: `Based on your responses, we identified ${auditFindings.length} potential billing violation${auditFindings.length > 1 ? 's' : ''} worth investigating. Common issues include incorrect coding, unbundled charges, and facility fee errors. These findings suggest significant overcharges that warrant a formal dispute.`,
      recommendedTool: currentBillCategory?.category || 'Medical Bill Dispute Letter'
    };
  }
}

// Initialize targeted quiz based on bill category
async function initializeTargetedQuiz(category) {
  console.log('[Phase 2] Initializing AI-powered quiz for:', category);
  
  const quizContainer = document.getElementById('quiz-container');
  const quizProgress = document.getElementById('quiz-progress');
  const quizProgressText = document.getElementById('quiz-progress-text');
  const quizResult = document.getElementById('quiz-result');
  const quizAnalyzing = document.getElementById('quiz-analyzing');
  const quizFinal = document.getElementById('quiz-final');
  const resultAmount = document.getElementById('result-amount');
  const quizCtaBtn = document.getElementById('quiz-cta-btn');
  const quizResetBtn = document.getElementById('quiz-reset-btn');
  const auditorTitle = document.querySelector('.auditor-title');
  const auditorSubtitle = document.querySelector('.auditor-subtitle');

  if (!quizContainer) return;
  
  // Show loading state while AI generates questions
  quizContainer.style.display = 'none';
  quizResult.style.display = 'flex';
  quizAnalyzing.style.display = 'flex';
  quizFinal.style.display = 'none';
  
  const analyzingText = document.querySelector('.analyzing-text');
  if (analyzingText) {
    analyzingText.textContent = 'Cross-referencing bill with Federal Guidelines...';
  }

  // Generate AI-powered questions
  const questions = await generateAIQuiz(category, currentBillText || '');
  
  console.log(`[Phase 2] AI generated ${questions.length} questions for ${category}`);
  console.log('[Phase 2] Question IDs:', questions.map(q => q.id).join(', '));
  
  // Hide loading, show quiz
  quizResult.style.display = 'none';
  quizAnalyzing.style.display = 'none';
  quizContainer.style.display = 'block';
  
  // Update header with category and amount
  if (auditorTitle) {
    auditorTitle.textContent = `Smart Audit: ${category}`;
  }
  if (auditorSubtitle) {
    const amountText = detectedAmount ? `$${detectedAmount}` : 'your';
    auditorSubtitle.textContent = `${questions.length} AI-personalized questions analyzing ${amountText} bill for common overcharges`;
  }

  let currentQuestion = 0;
  let totalPotentialSavings = 0;
  let totalEstimatedSavings = 0; // Track estimated savings from "Yes" answers
  let auditFindings = []; // Track error types and questions for AI analysis
  let notSureCount = 0; // ========== STEP 7: Track "Not Sure" answers ==========
  quizResponses = []; // Reset quiz responses

  function renderQuestion(index) {
    const q = questions[index];
    const progress = ((index + 1) / questions.length) * 100;
    
    quizProgress.style.width = `${progress}%`;
    quizProgressText.textContent = `Question ${index + 1} of ${questions.length}`;

    quizContainer.innerHTML = `
      <div class="quiz-question">
        <h3 class="question-title">${q.question}</h3>
        <p class="question-context">${q.context}</p>
        <div class="quiz-options">
          ${q.options.map(option => `
            <button class="quiz-option-btn" data-value="${option.value}" data-weight="${option.weight}">
              <span class="option-label">${option.label}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const optionButtons = quizContainer.querySelectorAll('.quiz-option-btn');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const weight = parseInt(btn.dataset.weight);
        const answer = btn.dataset.value;
        totalPotentialSavings += weight;
        
        // ========== STEP 7: Track "Not Sure" answers ==========
        if (answer === 'not-sure') {
          notSureCount++;
          console.log(`[Phase 3] Not Sure count: ${notSureCount}`);
        }
        
        // Track audit findings for "Yes" answers
        if (answer === 'yes' && weight > 0) {
          totalEstimatedSavings += weight;
          auditFindings.push({
            errorType: q.errorType,
            question: q.question,
            reasoning: q.reasoning, // CRITICAL: Save the CoT reasoning containing codes/prices
            weight: weight
          });
        }
        
        // Store response for audit analysis
        quizResponses.push({
          id: q.id,
          question: q.question,
          answer: answer,
          weight: weight,
          errorType: q.errorType
        });
        
        console.log(`[Quiz Response] ${q.id}: ${answer} (weight: ${weight}, errorType: ${q.errorType})`);
        
        btn.classList.add('selected');
        setTimeout(() => {
          if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion(currentQuestion);
          } else {
            console.log(`[Quiz Complete] Total findings: ${auditFindings.length}, Estimated savings: $${totalEstimatedSavings}`);
            showResults();
          }
        }, 400);
      });
    });
  }

  // Animate analyzing messages during AI processing
  function animateAnalyzingMessages() {
    const analyzingText = document.querySelector('.analyzing-text');
    if (!analyzingText) return null;
    
    const messages = [
      "Establishing secure HIPAA-compliant connection...",
      "Extracting OCR data and Provider NPI numbers...",
      "Cross-referencing National Correct Coding Initiative (NCCI) edits...",
      "Checking for unbundled charges and Modifier 25/59 abuse...",
      "Comparing line items against FAIR Health UCR benchmarks...",
      "Finalizing refund estimation and generating official audit report..."
    ];
    
    let currentIndex = 0;
    
    // Apple-style smooth fade transition
    analyzingText.style.transition = "opacity 0.4s ease";
    analyzingText.style.opacity = 0;
    
    setTimeout(() => {
      analyzingText.textContent = messages[0];
      analyzingText.style.opacity = 1;
    }, 400);
    
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < messages.length) {
        analyzingText.style.opacity = 0; // fade out
        setTimeout(() => {
          analyzingText.textContent = messages[currentIndex];
          analyzingText.style.opacity = 1; // fade in
        }, 400);
      } else {
        clearInterval(interval);
      }
    }, 3500); // Change message every 3.5 seconds
    
    return interval;
  }

  function showResults() {
    quizContainer.style.display = 'none';
    quizResult.style.display = 'flex';
    quizAnalyzing.style.display = 'flex';
    quizFinal.style.display = 'none';

    // Start animating analyzing messages
    const messageInterval = animateAnalyzingMessages();

    // Call Gemini AI and wait for response
    (async () => {
      try {
        // ========== STEP 7: "NOT SURE" PENALTY OVERRIDE ==========
        // If user answered "Not Sure" too many times, skip AI and route to itemized bill
        if (notSureCount >= 3 || (notSureCount >= 2 && questions.length <= 4)) {
          console.log(`[Phase 3] Not Sure penalty triggered: ${notSureCount} uncertain answers out of ${questions.length} questions`);
          
          // Stop analyzing animation
          if (messageInterval) clearInterval(messageInterval);
          quizAnalyzing.style.display = 'none';
          
          // Override with $0 refund (insufficient information)
          const finalRefund = 0;
          const errorProbability = 0;
          
          // Custom verdict for uncertain responses
          const verdict = `We noticed several "Not Sure" responses in your audit. Without specific details about the charges, procedures, and timing on your bill, we cannot provide an accurate refund estimate. To protect your rights and uncover hidden billing codes, we strongly recommend requesting an Itemized Bill immediately. This document will reveal the exact CPT codes, quantities, and charges — giving you the clarity needed for a proper audit.`;
          
          // Override AI verdict to route to itemized bill tool
          const aiVerdict = {
            auditorNote: verdict,
            recommendedTool: 'Request Itemized Bill',
            estimatedRefund: 0
          };
          
          // Store override results
          auditResults = {
            detectedFlags: [],
            errorProbability: errorProbability,
            estimatedRefund: finalRefund,
            finalVerdict: verdict,
            billTotal: detectedAmount ? parseFloat(detectedAmount.replace(/,/g, '')) : 0,
            category: currentBillCategory.category,
            auditFindings: auditFindings,
            aiVerdict: aiVerdict,
            notSurePenalty: true // Flag for routing logic
          };
          
          console.log('[Phase 3] Override audit results:', auditResults);
          
          // Display override results
          quizFinal.style.display = 'flex';
          quizRefundAmount.textContent = '$0';
          quizVerdict.textContent = verdict;
          
          // Override CTA button to route to itemized bill tool
          quizCtaBtn.textContent = 'Request Itemized Bill →';
          quizCtaBtn.onclick = () => {
            // Save override data to localStorage
            const medicalAuditData = {
              amount: detectedAmount || '0',
              category: currentBillCategory.category,
              verdict: verdict,
              findings: auditFindings
            };
            
            localStorage.setItem('medicalAuditData', JSON.stringify(medicalAuditData));
            localStorage.setItem('lastAudit', JSON.stringify(auditResults));
            console.log('[Phase 3] Saved override data, routing to itemized bill tool');
            
            // Route to itemized bill tool
            window.location.hash = '/request-itemized-medical-bill';
          };
          
          return; // Skip normal audit processing
        }
        
        // ========== COMBINED AUDIT ENGINE ==========
        
        // Run AI flag detection
        const upcodingFlag = detectUpcoding(currentBillCategory.category, currentBillText, quizResponses);
        const unbundlingFlag = detectUnbundling(currentBillCategory.category, currentBillText, quizResponses);
        const mathErrorFlag = detectMathErrors(currentBillText);
        const timeErrorFlag = detectTimeErrors(currentBillCategory.category, currentBillText, quizResponses);
        
        // Collect detected flags
        const detectedFlags = [];
        let aiImpact = 0;
        
        if (upcodingFlag.detected) {
          detectedFlags.push(upcodingFlag);
          aiImpact += upcodingFlag.impact;
        }
        if (unbundlingFlag.detected) {
          detectedFlags.push(unbundlingFlag);
          aiImpact += unbundlingFlag.impact;
        }
        if (mathErrorFlag.detected) {
          detectedFlags.push(mathErrorFlag);
          aiImpact += mathErrorFlag.impact;
        }
        if (timeErrorFlag.detected) {
          detectedFlags.push(timeErrorFlag);
          aiImpact += timeErrorFlag.impact;
        }
        
        // Calculate adjustment multiplier
        const adjustmentMultiplier = detectedFlags.length > 0 ? 1.2 : 1.0;
        
        // Calculate initial savings from quiz responses
        const initialSavings = totalPotentialSavings + aiImpact;
        
        // Calculate bill amount for logic
        const billTotal = detectedAmount ? parseFloat(detectedAmount.replace(/,/g, '')) : 0;
        const calculatedRefund = initialSavings * adjustmentMultiplier;
        
        // ========== GEMINI AI VERDICT ==========
        
        // Call Gemini API for AI-generated verdict with quiz savings context
        const aiVerdict = await generateAIVerdict(
          currentBillText || 'No text extracted',
          auditFindings,
          detectedAmount || '0',
          Math.round(calculatedRefund),
          quizResponses // ========== PHASE 3: Pass quiz responses ==========
        );
        
        console.log('[AI Verdict] Received:', aiVerdict);
        
        // ========== UPGRADED LOGIC: Trust AI's judgment, cap at 100% of bill ==========
        let finalRefund = 0;
        
        if (aiVerdict && aiVerdict.estimatedRefund && aiVerdict.estimatedRefund > 0) {
          // Cap at 100% of bill (total forgiveness), not 40%
          finalRefund = Math.min(aiVerdict.estimatedRefund, billTotal);
          console.log('[AI Verdict] Using AI refund estimate:', finalRefund);
        } else {
          // Fallback if AI fails - cap at 100% of bill
          finalRefund = Math.min(Math.round(calculatedRefund), billTotal);
          console.log('[AI Verdict] ⚠️ AI refund invalid or 0. Using calculatedRefund:', finalRefund);
        }
        
        console.log('[AI Verdict] Final Refund Amount:', finalRefund);
        
        // Calculate error probability (0-100%)
        const violationCount = detectedFlags.length + quizResponses.filter(r => r.answer === 'yes').length;
        const errorProbability = Math.min(Math.round((violationCount / (questions.length + 4)) * 100), 95);
        
        // Generate final verdict (use AI note if available)
        let verdict = aiVerdict.auditorNote || '';
        
        if (!verdict) {
          if (detectedFlags.length > 0) {
            const flagDescriptions = detectedFlags.map(f => f.description.split('(')[0].trim()).join(', ');
            verdict = `Our audit detected ${detectedFlags.length} billing violation${detectedFlags.length > 1 ? 's' : ''}: ${flagDescriptions}. `;
          }
          
          if (errorProbability >= 70) {
            verdict += `With ${errorProbability}% likelihood of billing errors based on your responses, you have a strong case for disputing these charges.`;
          } else if (errorProbability >= 40) {
            verdict += `Based on your bill analysis, there is a ${errorProbability}% probability of recoverable overcharges that warrant further investigation.`;
          } else {
            verdict += `While some potential issues were identified, additional documentation may strengthen your dispute case.`;
          }
        }
        
        // Store audit results globally
        auditResults = {
          detectedFlags: detectedFlags,
          errorProbability: errorProbability,
          estimatedRefund: finalRefund,
          initialSavings: initialSavings,
          adjustmentMultiplier: adjustmentMultiplier,
          violationCount: violationCount,
          finalVerdict: verdict,
          billTotal: billTotal,
          category: currentBillCategory.category,
          auditFindings: auditFindings, // Store error types and questions from quiz
          aiVerdict: aiVerdict // Store full AI response
        };
        
        console.log('[Audit Results] Stored globally:', auditResults);
        
        // Stop analyzing message animation and display results
        if (messageInterval) clearInterval(messageInterval);
        quizAnalyzing.style.display = 'none';
        quizFinal.style.display = 'flex';
        
        // Update result UI with AI-powered breakdown
        const resultBadge = document.querySelector('.result-badge');
        const resultDescription = document.querySelector('.result-description');
        
        if (resultBadge) {
          // Use AI refundProbability if available
          const probabilityText = aiVerdict.refundProbability || `${errorProbability}% Likelihood of Refund`;
          const probabilityClass = (aiVerdict.refundProbability && aiVerdict.refundProbability.includes('High')) || errorProbability >= 70 ? 'high-probability' : 'moderate-probability';
          resultBadge.innerHTML = `
            <span class="probability-badge ${probabilityClass}">Auditor's Verdict: ${probabilityText}</span>
          `;
        }
        
        if (resultDescription) {
          let breakdownHtml = '<div class="audit-breakdown">';
          
          // AI Auditor's Note (NEW)
          if (aiVerdict.auditorNote) {
            breakdownHtml += `
              <div class="auditor-note">
                <p>${aiVerdict.auditorNote}</p>
              </div>
            `;
          }
          
          // Document Audit Section
          if (detectedFlags.length > 0) {
            breakdownHtml += '<div class="audit-section"><h4 class="audit-section-title">Document Audit</h4>';
            detectedFlags.forEach(flag => {
              const severityClass = flag.severity === 'high' ? 'flag-high' : 'flag-moderate';
              breakdownHtml += `
                <div class="audit-flag ${severityClass}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <line x1="12" y1="9" x2="12" y2="13" stroke-width="2" stroke-linecap="round"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2" stroke-linecap="round"></line>
                  </svg>
                  <span>${flag.description}</span>
                </div>
              `;
            });
            breakdownHtml += '</div>';
          }
          
          // Experience Audit Section
          const yesCount = quizResponses.filter(r => r.answer === 'yes').length;
          if (yesCount > 0) {
            breakdownHtml += `
              <div class="audit-section">
                <h4 class="audit-section-title">Experience Audit</h4>
                <p class="audit-summary">Based on your responses, we found <strong>${yesCount} violation${yesCount > 1 ? 's' : ''}</strong> of standard billing practices that support your dispute.</p>
              </div>
            `;
          }
          
          breakdownHtml += '</div>';
          resultDescription.innerHTML = breakdownHtml;
        }
        
        // ========== PHASE 3: HANDLE $0 REFUND FOR INVESTIGATIVE PIVOT ==========
        // If AI recommends "Request Itemized Bill", allow $0 refund
        if (aiVerdict.recommendedTool === 'Request Itemized Bill' && aiVerdict.estimatedRefund === 0) {
          finalRefund = 0;
          console.log('[Phase 3] Investigative Pivot: Refund set to $0 (audit impossible without itemized bill)');
        } else if (!finalRefund || finalRefund <= 0) {
          // Standard safeguard: if finalRefund is 0 or invalid (but not investigative pivot), use calculatedRefund
          finalRefund = Math.max(Math.round(calculatedRefund), 100); // Minimum $100
          console.log('[UI Update] ⚠️ finalRefund was 0. Using calculatedRefund:', finalRefund);
        }
        
        console.log('[UI Update] Animating amount:', finalRefund);
        animateAmount(finalRefund);
        
        // ========== PHASE 3: ADD SUBTITLE FOR $0 REFUND ==========
        if (finalRefund === 0 && resultAmount && resultAmount.parentElement) {
          const subtitle = document.createElement('p');
          subtitle.className = 'refund-subtitle';
          subtitle.style.cssText = 'margin-top: 8px; font-size: 13px; color: #86868b; font-weight: 500;';
          subtitle.textContent = 'Pending Detailed Audit';
          
          // Insert subtitle after the amount
          if (!resultAmount.nextElementSibling || !resultAmount.nextElementSibling.classList.contains('refund-subtitle')) {
            resultAmount.parentElement.insertBefore(subtitle, resultAmount.nextSibling);
          }
        }

        if (quizCtaBtn) {
          // 1. Determine safe target route and tool name
          let targetRoute = "/medical-bill-dispute-letter"; // Ultimate fallback
          let toolName = "Dispute Letter";

          if (aiVerdict && aiVerdict.recommendedTool && aiVerdict.recommendedTool.startsWith('/')) {
            targetRoute = aiVerdict.recommendedTool;
          } else if (currentBillCategory && currentBillCategory.route) {
            targetRoute = currentBillCategory.route;
          }

          // Create a readable name from the route (e.g. "/urgent-care-bill" -> "Urgent Care Bill")
          toolName = targetRoute.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          if(toolName.toLowerCase().includes("itemized")) toolName = "Itemized Bill Request";

          // 2. Set Button UI Dynamically
          if (targetRoute === '/request-itemized-medical-bill') {
            quizCtaBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              Get Itemized Bill & Audit Codes →
            `;
          } else {
            quizCtaBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              Start ${toolName}
            `;
          }
          
          // 3. Set Bulletproof Click Handler
          quizCtaBtn.onclick = () => {
            try {
              const medicalAuditData = {
                amount: detectedAmount || '0',
                category: currentBillCategory?.category || 'General',
                verdict: aiVerdict?.auditorNote || 'Based on your quiz responses, we estimate potential savings. Please proceed with generating your dispute document.',
                findings: auditFindings || []
              };
              
              localStorage.setItem('medicalAuditData', JSON.stringify(medicalAuditData));
              localStorage.setItem('lastAudit', JSON.stringify(auditResults)); // Keep for backward compatibility
              console.log('[Strict Routing] Saved audit data:', medicalAuditData);
            } catch (err) {
              console.error('[Strict Routing] Failed to save data:', err);
            }
            
            console.log("[Strict Routing] Navigating safely to:", targetRoute);
            navigate(targetRoute);
          };
        }

        if (quizResetBtn) {
          quizResetBtn.onclick = () => {
            location.reload();
          };
        }
        
      } catch (error) {
        console.error('[showResults] Critical Error:', error);
        
        // Stop analyzing message animation
        if (messageInterval) clearInterval(messageInterval);
        
        // Still show results with fallback data
        quizAnalyzing.style.display = 'none';
        quizFinal.style.display = 'flex';
        
        // Calculate fallback refund from quiz responses
        const fallbackRefund = Math.max(Math.round(totalPotentialSavings * 1.2), 100);
        console.log('[showResults] Using fallback refund:', fallbackRefund);
        
        // Display fallback amount
        if (resultAmount) {
          animateAmount(fallbackRefund);
        }
        
        // Show basic error message
        const resultDescription = document.querySelector('.result-description');
        if (resultDescription) {
          resultDescription.innerHTML = `
            <div class="audit-breakdown">
              <div class="audit-section">
                <p class="audit-summary">Based on your quiz responses, we estimate potential savings. Our AI analysis is temporarily unavailable, but your dispute can still proceed with the information gathered.</p>
              </div>
            </div>
          `;
        }
      }
    })();
  }

  function animateAmount(target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      resultAmount.textContent = `$${Math.round(current)}`;
    }, 50);
  }

  renderQuestion(0);
}

// ========== INTERACTIVE QUIZ LOGIC ==========

function setupQuizLogic() {
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const auditorCtaBox = document.querySelector('.hero-cta-section');
  const auditorQuizWrapper = document.getElementById('auditor-quiz-wrapper');
  const quizContainer = document.getElementById('quiz-container');
  const quizResult = document.getElementById('quiz-result');
  const quizProgress = document.getElementById('quiz-progress');
  const quizProgressText = document.getElementById('quiz-progress-text');
  const quizAnalyzing = document.getElementById('quiz-analyzing');
  const quizFinal = document.getElementById('quiz-final');
  const resultAmount = document.getElementById('result-amount');
  const quizCtaBtn = document.getElementById('quiz-cta-btn');
  const quizResetBtn = document.getElementById('quiz-reset-btn');

  if (!quizContainer) return; // Exit if not on home page

  // Show quiz when CTA button is clicked
  if (startQuizBtn && auditorCtaBox) {
    startQuizBtn.addEventListener('click', () => {
      auditorCtaBox.style.display = 'none';
      auditorQuizWrapper.style.display = 'block';
      renderQuestion(0);
    });
  }

  let currentQuestion = 0;
  let totalAmount = 0;
  let selectedServiceRoute = '/medical-bill-dispute-letter';

  const questions = [
    {
      id: 'service-type',
      question: 'What type of medical service did you receive?',
      options: [
        { label: 'Emergency Room Visit', value: 'ER', amount: 250, route: '/urgent-care-bill-dispute' },
        { label: 'Ambulance Transport', value: 'Ambulance', amount: 150, route: '/out-of-network-billing-dispute' },
        { label: 'Surgery or Procedure', value: 'Surgery', amount: 400, route: '/medical-bill-dispute-letter' },
        { label: 'General Doctor Visit', value: 'General', amount: 100, route: '/medical-bill-dispute-letter' }
      ]
    },
    {
      id: 'overnight-stay',
      question: 'Did you have an overnight hospital stay?',
      options: [
        { label: 'Yes', value: 'Yes', amount: 300 },
        { label: 'No', value: 'No', amount: 0 }
      ]
    },
    {
      id: 'itemized-bill',
      question: 'Have you received an itemized bill?',
      options: [
        { label: 'No / Not Sure', value: 'No', amount: 200 },
        { label: 'Yes', value: 'Yes', amount: 0 }
      ]
    },
    {
      id: 'out-of-network',
      question: 'Was any provider out-of-network?',
      options: [
        { label: 'Yes', value: 'Yes', amount: 350 },
        { label: 'No', value: 'No', amount: 0 }
      ]
    }
  ];

  function renderQuestion(index) {
    const q = questions[index];
    const progressPercent = ((index + 1) / questions.length) * 100;
    
    quizProgress.style.width = `${progressPercent}%`;
    quizProgressText.textContent = `Question ${index + 1} of ${questions.length}`;

    quizContainer.innerHTML = `
      <div class=\"quiz-question\">
        <h3 class=\"question-title\">${q.question}</h3>
        <div class=\"quiz-options\">
          ${q.options.map((opt, i) => `
            <button class=\"quiz-option-btn\" data-index=\"${i}\" data-amount=\"${opt.amount}\" data-route=\"${opt.route || ''}\">
              <span class=\"option-label\">${opt.label}</span>
              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\">
                <path d=\"M9 18l6-6-6-6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>
              </svg>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Attach event listeners to option buttons
    const optionButtons = quizContainer.querySelectorAll('.quiz-option-btn');
    optionButtons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const amount = parseInt(btn.getAttribute('data-amount'));
        const route = btn.getAttribute('data-route');
        
        // Add amount to total
        totalAmount += amount;
        
        // Store route from first question
        if (index === 0 && route) {
          selectedServiceRoute = route;
        }

        // Add selected state animation
        btn.classList.add('selected');
        
        // Move to next question after brief delay
        setTimeout(() => {
          currentQuestion++;
          if (currentQuestion < questions.length) {
            renderQuestion(currentQuestion);
          } else {
            showResults();
          }
        }, 300);
      });
    });
  }

  function showResults() {
    quizContainer.style.display = 'none';
    quizResult.style.display = 'block';
    quizAnalyzing.style.display = 'flex';
    quizFinal.style.display = 'none';

    // Show analyzing animation for 2 seconds
    setTimeout(() => {
      quizAnalyzing.style.display = 'none';
      quizFinal.style.display = 'flex';
      
      // Animate the amount
      animateAmount(totalAmount);
      
      // Set CTA button route
      quizCtaBtn.onclick = () => {
        navigate(selectedServiceRoute);
      };
    }, 2000);
  }

  function animateAmount(target) {
    let current = 0;
    const increment = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      resultAmount.textContent = `$${current.toLocaleString()}`;
    }, 30);
  }

  function resetQuiz() {
    currentQuestion = 0;
    totalAmount = 0;
    selectedServiceRoute = '/medical-bill-dispute-letter';
    quizContainer.style.display = 'block';
    quizResult.style.display = 'none';
    auditorQuizWrapper.style.display = 'none';
    auditorCtaBox.style.display = 'block';
  }

  // Reset button handler
  if (quizResetBtn) {
    quizResetBtn.addEventListener('click', resetQuiz);
  }

  // Don't initialize quiz automatically - wait for CTA button click
}

// ========== END QUIZ LOGIC ==========

// ========== COUNT-UP ANIMATION (Apple-style) ==========
function initCountUpAnimation() {
  const countUpElements = document.querySelectorAll('.count-up');
  if (countUpElements.length === 0) return;

  // Check if already animated
  const firstElement = countUpElements[0];
  if (firstElement.hasAttribute('data-animated')) return;

  // Apple-style easing function (ease-out cubic)
  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Count-up animation function
  const animateCountUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.floor(easedProgress * target);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target; // Ensure exact final value
        element.setAttribute('data-animated', 'true');
      }
    };

    requestAnimationFrame(updateCount);
  };

  // Intersection Observer to trigger animation when visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Check again if not already animated
          if (!firstElement.hasAttribute('data-animated')) {
            // Start all count-up animations
            countUpElements.forEach((element) => {
              animateCountUp(element);
            });
          }
          
          // Disconnect observer after animation starts
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% visible
      rootMargin: '0px'
    }
  );

  // Observe the stats container
  const statsContainer = document.querySelector('.hero-value-prop');
  if (statsContainer) {
    observer.observe(statsContainer);
  }
}

// Initialize count-up animation after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Inject CSS for auto-filled field styling
  const style = document.createElement('style');
  style.textContent = `
    .is-autofilled {
      background-color: rgba(0, 113, 227, 0.05) !important;
      border-color: rgba(0, 113, 227, 0.3) !important;
      transition: all 0.3s ease !important;
    }
    .is-autofilled:focus {
      background-color: white !important;
      border-color: rgba(0, 113, 227, 0.5) !important;
    }
  `;
  document.head.appendChild(style);
  console.log('[AutoFill CSS] ✓ Injected auto-fill styling');
  
  // Small delay to ensure hero section is rendered
  setTimeout(initCountUpAnimation, 100);
});

// Also re-initialize on route changes (for SPA)
window.addEventListener('popstate', () => {
  setTimeout(initCountUpAnimation, 100);
});

// ========== END COUNT-UP ANIMATION ==========

window.addEventListener("popstate", router);
router();