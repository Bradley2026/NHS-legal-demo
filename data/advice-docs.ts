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
  {
    id: "adv-011",
    title: "Employment — Dismissal for Long-Term Sickness Absence and Disability Risks",
    department: "Employment",
    firmId: "hartwell-vine",
    date: "2023-03-14",
    summary:
      "Hartwell & Vine LLP (instructing solicitor Jane Thompson) advised the Trust on whether it could fairly dismiss an employee absent on long-term sickness leave for some 14 months (approximately 450 days) due to mental health issues, where disability status under the Equality Act 2010 had not yet been assessed. The advice sets out the fairness framework under section 98 of the Employment Rights Act 1996, the critical disability discrimination risk where mental health conditions are involved, and the positive duty to make reasonable adjustments. It warns against relying on an informal HR assessment of disability rather than occupational health evidence, and sets out the mandatory procedural steps: commission an occupational health assessment, explicitly assess disability status, genuinely consider and document reasonable adjustments, conduct meaningful consultation, and treat dismissal as a last resort. Risks identified include disability discrimination awards of £20,000 to £100,000+, unfair dismissal, constructive dismissal, and CQC/reputational exposure. This synthetic advice is modelled on the failures exposed in the University Hospitals of Morecambe Bay NHS Foundation Trust (2024) tribunal decision and would have prevented them.",
    body: `LEGAL ADVICE — LONG-TERM SICKNESS ABSENCE AND DISMISSAL

To: Anytown NHS Trust — Director of HR and Head of Governance
From: Hartwell & Vine LLP (Instructing Solicitor: Jane Thompson)
Date: 14 March 2023
Classification: Employment & HR — Dismissal and capability
Matter Type: Sickness absence and capability dismissal

BACKGROUND

You have advised us that you have an employee (referred to in this advice as "Employee A" to preserve confidentiality) who has been on continuous sick leave for 14 months due to mental health issues.

You have indicated that:
- The employee's absences commenced in February 2022
- The employee has now accumulated approximately 450 days of sick leave
- Management wishes to explore whether dismissal on grounds of capability is appropriate
- You are not currently certain whether the employee meets the definition of "disabled" under the Equality Act 2010

You have asked for advice on:
1. The legal framework for dismissal based on sickness absence
2. The procedural steps you must follow
3. The specific risks if the employee is disabled
4. What documentation you should obtain before proceeding

LEGAL POSITION

Dismissal for long-term sickness absence is potentially fair under section 98 of the Employment Rights Act 1996, provided the Trust follows a fair procedure and can demonstrate a genuine business case. However, this must be approached with considerable caution given the disability discrimination risks we outline below.

1. THE FAIRNESS FRAMEWORK
Dismissal for sickness absence is fair if: (a) the Trust has obtained up-to-date medical evidence about the employee's condition and prognosis; (b) the Trust has genuinely considered alternatives to dismissal (phased return, role adjustment, redeployment); (c) the employee has been consulted meaningfully about the medical evidence and proposed action; (d) the Trust has followed a procedurally fair process; and (e) the dismissal falls within the band of reasonable responses. Tribunals will closely scrutinise whether an employer genuinely explored alternatives before dismissing. Dismissal should be a last resort, not a first response to prolonged absence.

2. THE DISABILITY DISCRIMINATION RISK — CRITICAL
The Equality Act 2010 defines disability as a physical or mental impairment that has a substantial and long-term adverse effect on the ability to carry out normal day-to-day activities. Mental health conditions frequently meet this definition. An employee absent for 14+ months due to mental health issues is very likely to be disabled within the statutory meaning, regardless of whether they have obtained a formal diagnosis. You must not assume the employee is not disabled simply because they have not told you, have no diagnosis, have not claimed benefits, or because an informal HR assessment concludes they are "not disabled".

3. REASONABLE ADJUSTMENTS DUTY
If the employee is disabled (which is likely), you have a positive duty to make reasonable adjustments to support their work or return to work — for example a phased return, temporary redeployment, flexible working, additional support, or consideration of a different role. You must genuinely consider these before proceeding to dismissal; a tick-box exercise is not enough.

4. PROCEDURAL REQUIREMENTS
Step 1: Obtain medical evidence — commission an occupational health assessment addressing diagnosis, prognosis, restrictions, recommended adjustments, and likelihood of return within a reasonable timeframe. An HR manager's informal assessment is not sufficient.
Step 2: Assess disability status explicitly and document it. If there is uncertainty, assume disability applies.
Step 3: Consider reasonable adjustments and document what was considered and why accepted or rejected.
Step 4: Hold a genuine consultation meeting — share the evidence, seek the employee's response, discuss adjustments, explore return to work, and document thoroughly.
Step 5: Make a documented decision — phased return, redeployment, continued leave with review, or dismissal as a last resort with full justification.

5. SPECIFIC RISKS TO YOUR ORGANISATION
Risk 1: Disability discrimination claim (awards £20,000 to £100,000+) if you dismiss without proper evidence, disability assessment, adjustment consideration, or fair consultation.
Risk 2: Unfair dismissal if procedure is not followed.
Risk 3: Constructive dismissal if the process is handled poorly and the employee resigns.
Risk 4: Reputational and regulatory risk — NHS Trusts are subject to CQC inspection on governance and wellbeing.

RECOMMENDATIONS
1. Commission an occupational health assessment urgently (2-3 weeks).
2. Make no dismissal decision until that evidence is available.
3. Document the entire process clearly from this point forward.
4. Involve occupational health in the adjustment discussion.
5. Conduct a structured consultation.
6. Make a documented decision, in order of preference: (A) phased return with adjustments; (B) redeployment with adjustments; (C) continued sick leave with review; (D) dismissal as a last resort, only where OH advises no realistic prospect of return, all adjustments are genuinely infeasible, consultation has been fair, and the decision is well-documented.

CASE LAW CONTEXT
Recent tribunal decisions confirm that dismissal must be a last resort, employers must obtain proper medical evidence before dismissing, disability assessment is mandatory rather than optional, reasonable adjustments must be actively explored, and procedural fairness is critical.

CAVEATS AND LIMITATIONS
This advice is based on the facts as described. If material facts change, we should be consulted again before any final decision. This advice is subject to legal professional privilege and is for internal use only.

Jane Thompson
Hartwell & Vine LLP
j.thompson@hartwell-vine.com`,
    tags: ["employment", "sickness absence", "dismissal", "capability", "disability discrimination", "equality act 2010", "reasonable adjustments", "occupational health", "unfair dismissal", "mental health"],
  },
  {
    id: "adv-012",
    title: "Employment — Multi-Issue Capability Management: Disability, Race Discrimination and Procedural Fairness",
    department: "Employment",
    firmId: "hartwell-vine",
    date: "2023-01-18",
    summary:
      "Hartwell & Vine LLP (instructing solicitor Eleanor Whitfield) advised on a complex capability situation involving a senior clinical psychologist with 12 years' service, of South Asian descent, with a diagnosed disability (chronic migraines) who had requested workplace adjustments and flexible working. The advice addresses how a single flawed capability process can create multiple simultaneous legal breaches: disability discrimination, race discrimination, unfair dismissal, breach of contract and unlawful deduction of wages. It treats occupational health assessment and explicit disability assessment as the foundational steps, analyses the reasonable adjustments duty, and examines the comparative discrimination risk where similar flexible-working requests from other employees were treated more favourably. It warns against summary dismissal without notice (breach of contract) and unauthorised deductions from final pay (unlawful deduction of wages), and quantifies cumulative exposure if all claims succeed at £150,000 to £250,000+ plus legal costs and CQC/Well-Led regulatory risk. The recommended approach is to pause formal proceedings, commission urgent occupational health assessment, conduct a discrimination review of flexible-working decisions, consult the employee informally, and then choose between adjustments, alternative role, part-time working, ill-health retirement, or dismissal as a last resort.",
    body: `LEGAL ADVICE — CAPABILITY MANAGEMENT WITH DISABILITY AND DISCRIMINATION CONSIDERATIONS

To: Anytown NHS Trust — HR Director and Line Management Team
From: Hartwell & Vine LLP (Instructing Solicitor: Eleanor Whitfield)
Date: 18 January 2023
Classification: Employment & HR — Capability, Disability, Discrimination
Matter Type: Complex capability management with protected characteristics present

BACKGROUND

We have been instructed regarding concerns about the performance of a Senior Clinical Psychologist (referred to as "the employee"). We understand that the employee has 12 years' service with generally positive reviews; recent concerns relate to migraine-related sick leave (approximately 8 days per year); the employee has requested workplace adjustments including flexible working and a modified office environment; a formal capability review is being considered; the employee is of South Asian descent; and the employee has disclosed a diagnosed disability (chronic migraines). We are also informed that other employees have been granted similar flexible-working requests that were handled differently in this case.

You have asked how to manage this capability situation fairly, whether disability assessments are required, how to avoid discrimination claims, what procedural steps are essential, and what the risks are if this is mishandled. This is a complex case because multiple legal issues intersect.

EXECUTIVE SUMMARY

This capability review carries HIGH LEGAL RISK across multiple jurisdictions if not handled correctly. The presence of disability and the differential treatment of similar requests from other employees creates discrimination risk alongside the capability issue. The safest approach is to pause formal capability proceedings and commission an occupational health assessment and disability review first. This is essential risk management, not delay for its own sake.

LEGAL POSITION

1. DISABILITY ASSESSMENT — THE FOUNDATIONAL ISSUE
The Equality Act 2010 defines disability as a physical or mental impairment with a substantial and long-term adverse effect on normal day-to-day activities. Chronic migraine causing absences and requiring adjustments will almost certainly meet this definition. You must conduct a positive assessment of disability status BEFORE making any capability decision. Commission an occupational health assessment addressing diagnosis and prognosis, impact on the role, whether the Equality Act definition is met, recommended reasonable adjustments, and return-to-work prospects. If disability is confirmed, shift from "capability" language to "support and adjustment" language.

2. REASONABLE ADJUSTMENTS DUTY
If the employee is disabled, you must make reasonable adjustments unless they impose unjustifiable hardship. The requested adjustments (flexible hours, dimmed office lighting) are almost certainly reasonable: low cost, not interfering with service delivery, and already granted to other employees. If you refuse an adjustment you must document what it is, why it is allegedly unreasonable, the supporting evidence, alternatives considered, and why those are also unreasonable.

3. DISCRIMINATION — THE COMPARATIVE ELEMENT
Other employees have been granted flexible working that the employee was refused. This creates (a) disability discrimination risk if the refusal related to disability or disability-related absence, and (b) race discrimination risk if employees of other ethnic backgrounds were treated more favourably in similar circumstances. The critical question is why the request was handled differently; absent a documented business reason, the differential treatment itself becomes evidence of discrimination.

4. PROCEDURAL FAIRNESS IN CAPABILITY PROCEEDINGS
Even setting aside disability and discrimination, capability proceedings must be fair: document concerns clearly and objectively; obtain occupational health advice; consult genuinely with the employee; explore alternatives to dismissal (different role, phased return, different team, retraining); and document the decision, recording adjustments considered, why alternatives were not feasible, and that the decision falls within the band of reasonable responses.

5. UNEQUAL TREATMENT — THE COMPARATIVE CASE
The differential treatment of similar flexible-working requests is critical evidence. Where comparators are a different ethnicity or not disabled, the comparison is legally relevant and the differential treatment needs documented justification.

6. DISMISSAL IMPLICATIONS — BREACH OF CONTRACT
Summary dismissal without notice should only occur for gross misconduct; capability is not gross misconduct. Dismissing without notice and without just cause breaches the contract and the employee can claim wages due during the notice period.

7. DEDUCTION OF WAGES
Any deduction from final pay (unpaid annual leave, unauthorised deduction) is a separate legal issue. Accrued annual leave must be paid out unless there is a consensual agreement to carry it forward. Summary deductions from final pay are often unlawful.

SPECIFIC RISKS TO ANYTOWN NHS TRUST
Risk 1: Disability discrimination claim — award range £20,000 to £100,000+; very high likelihood if dismissed without OH assessment.
Risk 2: Race discrimination claim — award range £15,000 to £80,000+; triggered if differential treatment cannot be justified.
Risk 3: Unfair dismissal — up to 52 weeks' pay (capped); very high likelihood without proper consultation or OH assessment.
Risk 4: Breach of contract — notice pay due; near-certain if handled carelessly.
Risk 5: Unlawful deduction of wages — unauthorised deductions must be refunded.
Cumulative exposure if all claims succeed: £150,000 to £250,000+ plus legal fees. CQC and Well-Led regulatory risk also applies.

RECOMMENDATIONS
1. Pause formal capability proceedings now.
2. Commission an occupational health assessment urgently (within 2 weeks) addressing disability status, prognosis, recommended adjustments, and role viability.
3. Conduct a discrimination review of all flexible-working requests in the team over the last 3 years, recording who requested, who approved or refused, and documented reasons.
4. Consult the employee informally to understand what adjustments would help, her medical position, and her aspirations.
5. Once the OH report is received, choose between: (A, recommended) implement reasonable adjustments with a 3-month review; (B) alternative role with adjustments; (C) managed reduction to part-time; (D) disability-related early retirement; or (E) dismissal as a highest-risk last resort, only if OH confirms no reasonable adjustments can enable her to work and after full consultation and documentation.

CASE LAW CONTEXT
Employers must not rush to dismiss for capability where disability is involved; differential treatment of similar requests creates prima facie evidence of discrimination requiring explanation; occupational health assessment is not optional when disability is known or suspected (Hensman v Department of Trade and Industry [2000]); reasonable adjustments means genuinely exploring what could work (Cordell v Foreign and Commonwealth Office [2012]); and procedural fairness is critical where protected characteristics are involved (West Midlands Passenger Transport Executive v Singh [1988]).

CAVEATS
This advice is based on the facts as described. If additional information emerges (genuine performance issues, misconduct, or medical evidence that she cannot work in an NHS setting), we should be consulted again. This advice is subject to legal professional privilege and is for internal use only.

Eleanor Whitfield
Hartwell & Vine LLP
e.whitfield@hartwell-vine.com`,
    tags: ["employment", "capability", "disability discrimination", "race discrimination", "unfair dismissal", "breach of contract", "unlawful deduction of wages", "equality act 2010", "reasonable adjustments", "occupational health", "multi-issue", "procedural fairness"],
  },
];
