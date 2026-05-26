// Summaries are synthetic but realistic. Full document bodies are TODO — replace with
// real synthetic content from David before live demo.

export type AdviceDocument = {
  id: string;
  title: string;
  department: string;
  firmId: string;
  date: string;
  summary: string;
  body: string;
  tags: string[];
};

export const adviceDocs: AdviceDocument[] = [
  {
    id: "adv-001",
    title: "Employment Tribunal Defence — Unfair Dismissal (Clinical Staff)",
    department: "Employment",
    firmId: "hartwell-vine",
    date: "2024-10-14",
    summary:
      "Advice by Hartwell & Vine LLP on the Trust's defence of an unfair dismissal claim brought by a Band 6 staff nurse following a disciplinary process. Counsel reviewed the investigation and dismissal proceedings, concluding that the process was substantially compliant with the Acas Code of Practice, with a procedural irregularity in the appeal stage noted but assessed as unlikely to be determinative. The recommended approach was to defend the claim at tribunal whilst exploring without-prejudice settlement if compensation sought fell below the cost of full preparation and hearing. The Trust was advised to update its standard disciplinary letter templates to ensure full compliance with the Acas Code going forward. Indicative legal costs for a defended tribunal: £8,500 to £14,000 depending on hearing length.",
    body: "// TODO: Full document content from David",
    tags: ["employment", "tribunal", "unfair dismissal", "disciplinary", "clinical staff", "acas"],
  },
  {
    id: "adv-002",
    title: "Mental Health Act Compliance — Section 17 Leave Procedures",
    department: "Mental Health",
    firmId: "marston-carey",
    date: "2024-11-08",
    summary:
      "Marston Carey was instructed to review the Trust's Section 17 leave procedures following a recommendation in a CQC inspection report. The review identified three areas requiring update: responsible clinician authorisation records lacked consistent audit trails; monitoring of conditions attached to leave was not systematically recorded in clinical notes; and emergency recall procedures had not been updated to reflect the Trust's 2023 site reconfiguration. A revised policy framework was drafted and submitted to the Mental Health Act Managers' Committee. The updated procedures were approved and implemented in January 2025.",
    body: "// TODO: Full document content from David",
    tags: ["mental health act", "section 17", "leave", "compliance", "CQC", "responsible clinician", "recall"],
  },
  {
    id: "adv-003",
    title: "Board Governance — Conflicts of Interest Policy Review",
    department: "Governance & Public Law",
    firmId: "hartwell-vine",
    date: "2024-09-23",
    summary:
      "Hartwell & Vine LLP conducted a review of the Trust's conflicts of interest policy and register of interests following NHS England guidance published in August 2024, which required enhanced declarations from board members with private healthcare interests. The review found the Trust's public register to be broadly compliant but identified gaps in non-executive director secondary employment declarations and an absence of annual refresh procedures for clinical director declarations. Updated policy, register templates, and a mandatory annual declaration process were provided. The Trust's Audit Committee was advised to review all declarations at its next scheduled meeting.",
    body: "// TODO: Full document content from David",
    tags: ["governance", "conflicts of interest", "board", "non-executive", "register", "NHS England", "audit committee"],
  },
  {
    id: "adv-004",
    title: "Primary Care Network — Contract Amendment (Extended Access SLA)",
    department: "Primary Care",
    firmId: "marston-carey",
    date: "2024-08-05",
    summary:
      "Marston Carey provided advice on proposed amendments to a Primary Care Network service level agreement covering extended access services. The proposed changes related to revised performance targets, new data sharing arrangements with a third-party remote consultation provider, and changes to indemnity and liability provisions. Advice concluded that the amended performance targets were acceptable, but that the data sharing arrangements required a formal data processing agreement with the third party and an updated privacy notice. The liability cap was increased from £500,000 to £1 million to reflect the expanded service scope. Amendments were agreed and signed in September 2024.",
    body: "// TODO: Full document content from David",
    tags: ["primary care", "PCN", "contract", "SLA", "extended access", "data sharing", "liability"],
  },
  {
    id: "adv-005",
    title: "Property Acquisition — Community Health Hub, Anytown North",
    department: "Property & Estates",
    firmId: "bramley-sterling",
    date: "2024-07-17",
    summary:
      "Bramley Sterling was instructed to provide due diligence advice on the Trust's proposed acquisition of a long leasehold interest in a former retail unit for conversion to a community health hub in Anytown North. Local authority searches revealed no adverse planning restrictions, though the building is within the Anytown Town Centre Conservation Area, requiring careful management of any external alterations. Advice included a review of the proposed 25-year lease terms, noting that the alienation provisions restricted assignment and prohibited sub-letting, which is more restrictive than standard NHS estate arrangements. The Trust was advised to negotiate a more permissive alienation clause before exchange. Heads of terms were agreed in October 2024 subject to resolution of the lease terms.",
    body: "// TODO: Full document content from David",
    tags: ["property", "acquisition", "lease", "planning", "conservation area", "community health hub", "estate"],
  },
  {
    id: "adv-006",
    title: "Procurement Law — Contract Award Challenge (Facilities Management)",
    department: "Contract & Commercial",
    firmId: "bramley-sterling",
    date: "2024-12-03",
    summary:
      "Bramley Sterling advised on the Trust's response to a pre-action protocol letter from an unsuccessful tenderer following the award of an above-threshold facilities management contract. The letter alleged material irregularities in the evaluation scoring of the tenderer's quality submission. Bramley Sterling reviewed the full procurement file and advised that the Trust's process was compliant with the Provider Selection Regime 2023 and that the alleged scoring error fell within the permitted margin of evaluator discretion. A robust written response was provided within the 30-day standstill period. The challenge was not pursued to litigation and the contract was formally awarded.",
    body: "// TODO: Full document content from David",
    tags: ["procurement", "contract", "challenge", "standstill", "provider selection regime", "evaluation", "tender"],
  },
  {
    id: "adv-007",
    title: "Employment — TUPE Implications of Community Physiotherapy Integration",
    department: "Employment",
    firmId: "hartwell-vine",
    date: "2025-01-20",
    summary:
      "Hartwell & Vine LLP advised on the TUPE implications of integrating community physiotherapy services from Westbrook Community Trust into the Trust's musculoskeletal pathway. Analysis confirmed that TUPE 2006 applied and identified 47 affected employees across three grades. Advice covered information and consultation obligations (a 45-day consultation period was required), proposed harmonisation of terms and conditions, NHS pension continuity, and an ETO defence assessed as available for a proposed re-banding of two senior roles. The transfer completed successfully in March 2025 with no employment tribunal claims arising from the process.",
    body: "// TODO: Full document content from David",
    tags: ["TUPE", "employment", "transfer", "service integration", "consultation", "harmonisation", "pension", "physiotherapy"],
  },
  {
    id: "adv-008",
    title: "Healthcare Law — Clinical Negligence and NHS Resolution Indemnity",
    department: "Healthcare",
    firmId: "hartwell-vine",
    date: "2024-11-29",
    summary:
      "Hartwell & Vine LLP provided advice following a patient safety incident involving a self-employed consultant surgeon operating under a practising privileges agreement. Analysis confirmed that the surgeon fell outside the Clinical Negligence Scheme for Trusts because he was not employed or contracted as an NHS employee, and that the Trust faced potential direct liability under the non-delegable duty of care principle. The Trust was advised to review all practising privileges agreements to ensure appropriate indemnity requirements are in place, and to engage NHS Resolution directly. The incident was notified to NHS Resolution and is being managed as a joint matter.",
    body: "// TODO: Full document content from David",
    tags: ["clinical negligence", "NHS Resolution", "indemnity", "contractor", "practising privileges", "CNST", "duty of care"],
  },
  {
    id: "adv-009",
    title: "Data Protection — Third Party Processor Compliance Review",
    department: "Governance & Public Law",
    firmId: "hartwell-vine",
    date: "2024-10-31",
    summary:
      "Hartwell & Vine LLP provided advice on the Trust's compliance obligations under UK GDPR and the Data Protection Act 2018 in relation to a third-party workforce management software supplier acting as a data processor. The review identified three significant gaps: the absence of sub-processor notification provisions; a data transfer mechanism for US-based data storage that did not comply with UK GDPR Chapter V requirements; and outdated security standards. An updated data processing agreement and UK IDTA transfer mechanism were provided. The supplier was given a 60-day remediation period and the Trust's Data Protection Officer was formally notified of the findings.",
    body: "// TODO: Full document content from David",
    tags: ["data protection", "GDPR", "UK GDPR", "data processor", "DPA", "third party", "IDTA", "information governance", "IG"],
  },
  {
    id: "adv-010",
    title: "Workforce — Agency Staffing Framework and Rate Cap Compliance",
    department: "Employment",
    firmId: "penrose-bell",
    date: "2025-02-12",
    summary:
      "Penrose Bell advised on the Trust's obligations under NHS England's agency staffing framework following designation as a tier-1 agency user under the revised 2024 escalation framework. Analysis confirmed that the Trust's agency spend as a proportion of overall pay spend exceeded the recommended 3.5% ceiling in three months of the current financial year, triggering enhanced reporting obligations to NHS England. Advice recommended a formal workforce planning review supported by a compliance programme, including enhanced authorisation controls for agency bookings above the rate cap and monthly reporting to the People Committee. Monthly compliance reporting commenced in November 2024.",
    body: "// TODO: Full document content from David",
    tags: ["agency staffing", "workforce", "NHS England", "rate cap", "framework", "compliance", "tier 1", "reporting"],
  },
];
