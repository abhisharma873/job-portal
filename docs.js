// docs.js — Resume & Cover Letter generator

// ─── Contact ──────────────────────────────────────────────────────────────────
const CONTACT = {
  name:     "ABHYANKAR SHARMA",
  phone:    "+1 (617) 233-5927",
  location: "Boston, MA",
  email:    "abhisharma873@gmail.com",
  linkedin: "linkedin.com/in/abhyankarsharma",
  github:   "github.com/abhyankar-sharma",
  status:   "F-1 OPT Eligible (Jul 2026)"
};

// ─── Wipro bullets with role weights ─────────────────────────────────────────
const BULLETS = [
  { t: "Worked across the full software development lifecycle (SDLC), from requirements gathering and process definition through design, development, testing, validation, and release for enterprise clients.",
    w: {systems:5,ba:5,pm:4,qa:4,data:2,solutions:4,consultant:5,default:3} },
  { t: "Gathered and analyzed customer requirements and translated them into scalable technical solutions, contributing to solution design with focus on reliability, maintainability, and data quality.",
    w: {systems:5,ba:6,pm:3,qa:2,data:3,solutions:6,consultant:5,default:3} },
  { t: "Owned test management and validation activities, authoring and executing test cases, tracking defects and bugs in Jira, and driving issues to resolution across validation cycles.",
    w: {systems:3,ba:3,pm:2,qa:8,data:1,solutions:2,consultant:2,default:2} },
  { t: "Designed and managed database schemas and data models that functioned as a requirements engineering database, linking requirements to test content and defects for full traceability across deliverables.",
    w: {systems:4,ba:4,pm:2,qa:3,data:7,solutions:3,consultant:3,default:3} },
  { t: "Built Excel-macro and BI reporting solutions to consolidate status and traceability data, giving stakeholders clear visibility across the product lifecycle.",
    w: {systems:2,ba:4,pm:4,qa:2,data:8,solutions:2,consultant:3,default:2} },
  { t: "Led coordination and startup activities for client deliverables, planning schedules, timelines, resources, and dependencies, and performing risk and gap analysis with mitigation and change-management plans.",
    w: {systems:3,ba:3,pm:8,qa:2,data:1,solutions:3,consultant:5,default:2} },
  { t: "Identified workflow inefficiencies and drove continuous process improvements that reduced manual processing time by ~30%, communicating clearly with technical and non-technical stakeholders across global, cross-functional teams.",
    w: {systems:2,ba:5,pm:5,qa:2,data:2,solutions:3,consultant:6,default:3} }
];

const PROJECTS = [
  { name:"ResumeTarget", sub:"AI SaaS Platform | Python, React", year:"2026",
    bullet:"Designed and built a full-stack AI web application end-to-end, from requirements through development, testing, and release, using the Anthropic API with a Python backend and React front end.",
    tags:["python","react","sdlc","saas","ai"] },
  { name:"KitaKapital", sub:"Fintech Credit-Scoring Solution | React, TypeScript", year:"2026",
    bullet:"Built and deployed a live credit-scoring application, defining the data model and scoring logic and validating outputs against test cases before release.",
    tags:["fintech","data model","validation","react","typescript"] },
  { name:"Financial Operations Dashboard", sub:"BI & Data Modeling | Hult MBA", year:"2026",
    bullet:"Built a multi-page BI dashboard on a star-schema data model over 15,000+ records with 25+ measures, cutting manual reporting effort by ~40% and improving traceability for stakeholders.",
    tags:["bi","power bi","tableau","sql","data modeling","reporting","star-schema"] },
  { name:"Route Optimization Engine", sub:"Python | Hult MBA", year:"2025",
    bullet:"Implemented a delivery route optimization model in Python using VRP and bin-packing algorithms, reducing total route distance and cost by ~20%.",
    tags:["python","algorithms","optimization"] }
];

const EDU = [
  { deg:"MBA, Business Analytics & Finance", school:"Hult International Business School", loc:"Boston, MA", year:"Expected Jul 2026",
    note:"Coursework: Business Intelligence, Data Visualization, Operations Research, Agile Project Management, Financial Modeling." },
  { deg:"B.Tech, Computer Science", school:"DIT University", loc:"Dehradun, India", year:"2016–2020",
    note:"Coursework: Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering." }
];

const CERTS = [
  "SQL for Data Science — UC Davis / Coursera (Jun 2026)",
  "Introduction to SQL — DataCamp (May 2026)",
  "DAX Functions in Power BI — DataCamp (Mar 2026)",
  "Foundations: Data, Data, Everywhere — Google / Coursera (Jan 2026)",
  "Pesto Fellowship: Full Stack Development & Product Engineering — Pesto (2024)",
  "AI Fluency: Framework & Foundations — Anthropic (2026)",
  "Introduction to Model Context Protocol — Anthropic (2026)",
  "Claude Platform 101 — Anthropic (2026)",
  "Claude Code 101 — Anthropic (2026)",
  "Teaching the AI Fluency Framework — Anthropic / UCC (2026)",
  "Ethical Leadership Through Giving Voice to Values — University of Virginia / Coursera (Mar 2026)",
  "Introduction to Tableau — DataCamp (2025)",
  "Certificate in Data Analysis — Oxford Home Study Centre (May 2024)"
];

const BASE_SKILLS = [
  { label:"Lifecycle & Process",       items:"SDLC, PLC, Process Definition, Milestones & Workflow, Design Reviews, Systems Engineering" },
  { label:"Requirements & Validation", items:"Requirements Gathering & Translation, Test Management, Formal Validation, Bug/Defect Management, Traceability, UAT" },
  { label:"Tools & Data",              items:"Jira, SQL, Excel Macros, BI Reporting, Database Schema & Data Model Management" },
  { label:"Engineering",               items:"Solution Design & Architecture, Python, Java, C++, Data Quality, Reliability & Maintainability" },
  { label:"Analytics & BI",            items:"Power BI, Tableau, Star-Schema Data Modeling, DAX, Data Visualization, KPI Reporting" },
  { label:"Program & Risk",            items:"Program Planning, Schedules & Timelines, Risk Analysis, Gap Identification, Change Management" },
  { label:"Collaboration",             items:"Agile/Scrum, Stakeholder Management, Cross-Functional & Global Teams, Continuous Improvement" }
];

// ─── Stop words ───────────────────────────────────────────────────────────────
const SW = new Set(["the","a","an","to","for","in","of","and","or","with","at","by","from","as","is",
  "are","was","were","be","been","have","has","had","do","does","did","will","would","could","should",
  "may","might","must","not","but","if","when","where","who","what","which","this","that","these",
  "those","we","you","they","he","she","it","our","your","their","its","on","up","out","all","also",
  "more","other","than","so","into","over","after","while","both","through","before","about","such",
  "just","work","team","role","experience","strong","required","preferred","background","ability",
  "plus","years","year","new","high","including","using","within","across","between","ensure",
  "support","provide","help","build","join","looking","well","need","highly","key","primary","lead",
  "own","able","hands","including","must","seeking","ideal","minimum","equivalent","prefer","define",
  "perform","manage","system","product","service"]);

// ─── Role detection ───────────────────────────────────────────────────────────
function roleType(job) {
  const t = job.title.toLowerCase();
  if (/(data analyst|bi analyst|business intelligence)/.test(t)) return "data";
  if (/(test engineer|qa engineer|quality assurance|validation engineer|test manager)/.test(t)) return "qa";
  if (/(program manager|project manager|scrum master)/.test(t)) return "pm";
  if (/(solutions engineer|solutions consultant|pre-sales)/.test(t)) return "solutions";
  if (/implementation/.test(t)) return "consultant";
  if (/(systems engineer|requirements engineer|systems analyst)/.test(t)) return "systems";
  if (/(business analyst|business systems|product analyst|process analyst|it analyst|it business analyst|technical analyst|technical business)/.test(t)) return "ba";
  return "default";
}

// ─── Real ATS scoring — description keywords vs full resume text ──────────────
function atsScore(job) {
  const tagTerms   = (job.tags||[]).map(t => t.toLowerCase().trim()).filter(Boolean);
  const titleTerms = job.title.toLowerCase().split(/[\s|\-\/]+/).filter(w => w.length > 3 && !SW.has(w));

  // Extract real keywords from job description
  const descTerms = (job.description||"").toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 3 && !SW.has(w));
  const descUniq = [...new Set(descTerms)].slice(0, 50);

  // All candidate terms — tags first (most important)
  const terms = [...new Set([...tagTerms, ...titleTerms, ...descUniq])];

  // Full resume text — everything that ends up on the page
  const resumeText = [
    ...tagTerms,
    ...BASE_SKILLS.map(s => s.label + " " + s.items),
    ...BULLETS.map(b => b.t),
    ...PROJECTS.map(p => p.name + " " + p.sub + " " + p.bullet),
    ...EDU.map(e => e.deg + " " + e.school + " " + e.note),
    ...CERTS,
    "sdlc plc requirements validation jira sql python agile scrum stakeholder management",
    "traceability uat defect gap risk change management data modeling power bi tableau",
    "business analyst systems engineer solutions engineer program manager test management"
  ].join(" ").toLowerCase();

  const matched = terms.filter(k => resumeText.includes(k));
  const missing = terms.filter(k => !resumeText.includes(k));

  // Tags that match get extra weight — they're the core requirements
  const tagMatched = tagTerms.filter(k => resumeText.includes(k));
  const tagScore   = tagMatched.length / Math.max(tagTerms.length, 1);
  const allScore   = matched.length / Math.max(terms.length, 1);
  const score = Math.min(95, Math.round((tagScore * 0.55 + allScore * 0.45) * 100));

  return {
    score,
    matched: matched.slice(0, 16),
    missing: missing.slice(0, 8)
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function orderedBullets(job) {
  const r = roleType(job);
  return [...BULLETS].sort((a,b) => (b.w[r]||b.w.default) - (a.w[r]||a.w.default));
}

function orderedProjects(job) {
  const jt = [job.title,...(job.tags||[])].join(" ").toLowerCase();
  return [...PROJECTS].sort((a,b) =>
    b.tags.filter(t=>jt.includes(t)).length - a.tags.filter(t=>jt.includes(t)).length
  );
}

function companyBlurb(job) {
  const co = job.company.toLowerCase(), tg = (job.tags||[]).join(" ").toLowerCase();
  if (/(raytheon|bae|northrop|general dynamics|l3harris|draper|mitre|leidos|saic|spacex|general atomics)/.test(co) || /defense|aerospace/.test(tg))
    return "your commitment to engineering excellence on mission-critical systems";
  if (/(biogen|moderna|insulet|hologic|baxter|abbott|boston scientific|philips|illumina|thermo|takeda|vertex)/.test(co) || /medical|life sciences|biotech/.test(tg))
    return "your mission to advance patient care through innovative medical technology";
  if (/(state street|jpmorgan|fidelity|citizens|john hancock|morningstar|cme|northern trust|allstate|zurich|enova|santander|fiserv)/.test(co) || /financial|banking|fintech/.test(tg))
    return "your reputation for building reliable, high-performance financial technology";
  if (/(deloitte|accenture|pwc|kpmg|ey|mckinsey|booz allen|capgemini|cognizant|ibm)/.test(co))
    return "your reputation for delivering high-impact technology solutions to global clients";
  return "your culture of innovation and technical excellence";
}

function hl(job) {
  const h = {
    systems:    "Systems & Solutions Engineer | SDLC / PLC | Requirements & Validation | Test Management | Jira",
    ba:         "Business Analyst | Requirements & Validation | SDLC | Jira | SQL | BI Reporting | Agile",
    pm:         "Technical Program Manager | SDLC | Agile / Scrum | Risk & Dependency Management | Jira",
    qa:         "Test Manager / QA Engineer | Test Management | Formal Validation | Jira | Traceability | Python",
    data:       "Data Analyst & BI Developer | SQL | Power BI | Tableau | Star-Schema Modeling | Python",
    solutions:  "Solutions Engineer | Requirements Translation | Solution Design | SDLC | Stakeholder Management",
    consultant: "Technology Consultant | SDLC Delivery | Requirements | Process Improvement | Agile | Jira",
    default:    "Systems & Solutions Engineer | SDLC / PLC | Requirements & Validation | Test Management | Jira"
  };
  return h[roleType(job)] || h.default;
}

function summaryText(job) {
  const r = roleType(job), ti = job.title, co = job.company;
  const s = {
    systems:    `Systems and solutions engineer with four years of professional experience across the software and product development lifecycle (SDLC/PLC), backed by a Computer Science degree and an MBA in Business Analytics (Hult International Business School, Jul 2026). Hands-on with requirements engineering, traceability, formal test management, validation, defect management in Jira, and design review participation. Skilled at performing risk and gap analysis, managing database schemas as requirements engineering databases, and driving alignment across global cross-functional teams. Targeting the ${ti} role at ${co}.`,
    ba:         `Business analyst with four years translating complex customer requirements into scalable technical solutions across the full SDLC, backed by a Computer Science degree and an MBA in Business Analytics. Experienced in requirements gathering and documentation, gap and risk analysis, test case authoring, UAT coordination, defect tracking in Jira, and building Excel-macro and BI reporting solutions for stakeholder traceability. Drove ~30% reduction in manual processing effort through continuous process improvements. Bringing this background to the ${ti} role at ${co}.`,
    pm:         `Technical program manager with four years driving end-to-end SDLC delivery programs for Fortune 500 clients (PepsiCo, Morgan Stanley) at Wipro Technologies, backed by a Computer Science degree and an MBA in Business Analytics. Skilled in program planning, milestone tracking, risk and dependency management, Agile/Scrum facilitation, and leading global cross-functional stakeholders. Track record of driving ~30% delivery efficiency improvements. Targeting the ${ti} role at ${co}.`,
    qa:         `Test manager and validation engineer with four years owning formal test management and validation activities across the SDLC for Fortune 500 enterprise clients, backed by a Computer Science degree and an MBA in Business Analytics. Authored and executed test cases, tracked defects in Jira, drove resolution across validation cycles, and maintained requirements-test-defect traceability matrices. Python experience for scripting and automation. Targeting the ${ti} role at ${co}.`,
    data:       `Data analyst and BI developer with four years building dashboards, data models, and reporting solutions for Fortune 500 clients, backed by a Computer Science degree and an MBA in Business Analytics (coursework: Business Intelligence, Data Visualization). Skilled in SQL, Python, Power BI, Tableau, DAX, and star-schema data modeling. Built a multi-page BI dashboard over 15,000+ records with 25+ measures, cutting manual reporting effort by ~40%. Targeting the ${ti} role at ${co}.`,
    solutions:  `Solutions engineer with four years translating enterprise customer requirements into scalable technical solutions across the full SDLC, backed by a Computer Science degree and an MBA in Business Analytics. Led requirements discovery, solution design, validation and UAT delivery, and stakeholder alignment for Fortune 500 clients. Strong Python, SQL, and cross-functional coordination skills. Excited to contribute to ${co} as ${ti}.`,
    consultant: `Technology consultant and delivery specialist with four years managing end-to-end SDLC programs for Fortune 500 clients (PepsiCo, Morgan Stanley) at Wipro Technologies, backed by a Computer Science degree and an MBA in Business Analytics. Skilled in requirements gathering, solution design, test management, UAT coordination, BI reporting, and driving ~30% process efficiency improvements. Targeting the ${ti} role at ${co}.`,
    default:    `Systems and solutions engineer with four years of professional experience across the SDLC/PLC, backed by a Computer Science degree and an MBA in Business Analytics (Hult International Business School, Jul 2026). Hands-on with requirements gathering, test management, validation, Jira defect tracking, database schema management, and BI reporting. Skilled at translating customer needs into scalable technical solutions. Targeting the ${ti} role at ${co}.`
  };
  return s[r] || s.default;
}

// ─── Styles (shared by both preview and print) ────────────────────────────────
const DOC_CSS = `
*{box-sizing:border-box}
.doc-wrap{font-family:Georgia,'Times New Roman',serif;color:#111;max-width:820px;margin:0 auto}
/* ATS badge */
.ats-bar{display:flex;align-items:center;gap:16px;background:#f0fdf4;border:2px solid #4ade80;border-radius:10px;padding:14px 18px;margin-bottom:22px}
.ats-ring{flex-shrink:0}
.ats-info{}
.ats-score-txt{font-family:sans-serif;font-size:1.1rem;font-weight:800;margin-bottom:4px}
.ats-for{font-family:sans-serif;font-size:.78rem;color:#374151;margin-bottom:7px}
.ats-tags{display:flex;flex-wrap:wrap;gap:5px}
.ats-m{font-family:sans-serif;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:20px;background:#dcfce7;color:#15803d}
.ats-x{font-family:sans-serif;font-size:.7rem;padding:2px 8px;border-radius:20px;background:#fee2e2;color:#b91c1c}
/* Resume header */
.r-name{font-size:22pt;font-weight:900;text-align:center;text-transform:uppercase;letter-spacing:3px;margin-bottom:4px}
.r-hl{font-size:9.5pt;text-align:center;color:#333;margin-bottom:4px}
.r-contact{font-size:8.5pt;text-align:center;color:#555;margin-bottom:0}
.r-hdivider{border:none;border-top:2px solid #111;margin:10px 0 14px}
/* Sections */
.r-sec{margin-bottom:14px}
.r-sec-title{font-size:8.5pt;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#111;border-bottom:1.5px solid #111;padding-bottom:3px;margin-bottom:8px}
.r-summary{font-size:10pt;line-height:1.6;text-align:justify}
/* Skills */
.r-skill-row{display:flex;margin-bottom:5px;font-size:9.5pt;line-height:1.45}
.r-skill-label{font-weight:700;min-width:190px;flex-shrink:0;padding-right:8px}
.r-skill-items{color:#222}
.r-skill-row.highlight .r-skill-label{color:#1d4ed8}
.r-skill-row.highlight .r-skill-items{color:#1e3a8a;font-weight:600}
/* Experience */
.r-job{margin-bottom:12px}
.r-job-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1px}
.r-job-title{font-size:11pt;font-weight:700}
.r-job-dates{font-size:9pt;font-style:italic;color:#555}
.r-job-sub{font-size:9pt;color:#444;font-style:italic;margin-bottom:4px}
.r-bullets{margin:0 0 0 18px;padding:0}
.r-bullets li{font-size:9.5pt;line-height:1.55;margin-bottom:3px;text-align:justify}
/* Projects */
.r-proj{margin-bottom:9px}
.r-proj-header{display:flex;align-items:baseline;gap:6px;margin-bottom:2px}
.r-proj-name{font-size:10pt;font-weight:700}
.r-proj-sub{font-size:8.5pt;font-style:italic;color:#444}
.r-proj-year{font-size:9pt;font-style:italic;color:#555;margin-left:auto}
/* Education */
.r-edu{margin-bottom:8px}
.r-edu-note{font-size:9pt;color:#444;margin-top:2px}
/* Cover letter */
.l-wrap{font-family:Georgia,'Times New Roman',serif;color:#111;font-size:11pt;line-height:1.7;max-width:720px;margin:0 auto}
.l-sender{line-height:1.9;margin-bottom:22px;font-size:10pt}
.l-date{margin-bottom:16px;color:#333}
.l-to{line-height:1.8;margin-bottom:16px;font-size:10pt}
.l-subj{font-weight:700;margin-bottom:20px}
.l-body p{margin-bottom:14px;text-align:justify}
`;

// ─── Resume HTML ──────────────────────────────────────────────────────────────
function resumeHTML(job) {
  const bullets  = orderedBullets(job);
  const projects = orderedProjects(job);
  const tags     = (job.tags || []);

  return `<style>${DOC_CSS}</style>
<div class="doc-wrap">

  <div class="r-name">${CONTACT.name}</div>
  <div class="r-hl">${hl(job)}</div>
  <div class="r-contact">${CONTACT.phone} &nbsp;|&nbsp; ${CONTACT.email} &nbsp;|&nbsp; ${CONTACT.location} &nbsp;|&nbsp; ${CONTACT.linkedin} &nbsp;|&nbsp; ${CONTACT.status}</div>
  <hr class="r-hdivider">

  <div class="r-sec">
    <div class="r-sec-title">Professional Summary</div>
    <p class="r-summary">${summaryText(job)}</p>
  </div>

  <div class="r-sec">
    <div class="r-sec-title">Core Skills &amp; Competencies</div>
    ${tags.length ? `<div class="r-skill-row highlight"><span class="r-skill-label">Key Competencies:</span><span class="r-skill-items">${tags.join(", ")}</span></div>` : ""}
    ${BASE_SKILLS.map(s=>`<div class="r-skill-row"><span class="r-skill-label">${s.label}:</span><span class="r-skill-items">${s.items}</span></div>`).join("")}
  </div>

  <div class="r-sec">
    <div class="r-sec-title">Professional Experience</div>

    <div class="r-job">
      <div class="r-job-header">
        <span class="r-job-title">Software Engineer</span>
        <span class="r-job-dates">Jul 2021 – Jul 2024</span>
      </div>
      <div class="r-job-sub">Wipro Technologies &nbsp;|&nbsp; India &nbsp;|&nbsp; Fortune 500 clients (PepsiCo, Morgan Stanley) | Software &amp; Systems Delivery</div>
      <ul class="r-bullets">
        ${bullets.map(b=>`<li>${b.t}</li>`).join("")}
      </ul>
    </div>

    <div class="r-job">
      <div class="r-job-header">
        <span class="r-job-title">Data Analyst Intern</span>
        <span class="r-job-dates">Aug 2020 – Jul 2021</span>
      </div>
      <div class="r-job-sub">Amorin &nbsp;|&nbsp; Remote</div>
      <ul class="r-bullets">
        <li>Cleaned, organized, and validated datasets for analysis, supporting data collection and reporting workflows.</li>
        <li>Built reports and visualizations to surface trends and inform business decision-making.</li>
      </ul>
    </div>
  </div>

  <div class="r-sec">
    <div class="r-sec-title">Technical Projects</div>
    ${projects.map(p=>`
    <div class="r-proj">
      <div class="r-proj-header">
        <span class="r-proj-name">${p.name}</span>
        <span class="r-proj-sub">| ${p.sub}</span>
        <span class="r-proj-year">${p.year}</span>
      </div>
      <ul class="r-bullets"><li>${p.bullet}</li></ul>
    </div>`).join("")}
  </div>

  <div class="r-sec">
    <div class="r-sec-title">Education</div>
    ${EDU.map(e=>`
    <div class="r-edu">
      <div class="r-job-header">
        <span class="r-job-title">${e.deg}</span>
        <span class="r-job-dates">${e.year}</span>
      </div>
      <div class="r-job-sub">${e.school} &nbsp;|&nbsp; ${e.loc}</div>
      <div class="r-edu-note">${e.note}</div>
    </div>`).join("")}
  </div>

  <div class="r-sec">
    <div class="r-sec-title">Certifications</div>
    <ul class="r-bullets">
      ${CERTS.map(c=>`<li>${c}</li>`).join("")}
    </ul>
  </div>

  <div class="r-sec">
    <div class="r-sec-title">Additional</div>
    <ul class="r-bullets">
      <li>Co-Founder, Helvra (B2B solar marketplace): built demand-and-supply matching logic; placed 2nd of 23 teams in the Hult Prize competition with VC interest.</li>
      <li>Authorization: F-1 visa with OPT eligibility beginning July 2026; able to work on-site and collaborate across global teams.</li>
    </ul>
  </div>

</div>`;
}

// ─── Cover Letter HTML ────────────────────────────────────────────────────────
function coverHTML(job) {
  const r = roleType(job);
  const today = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  const tags  = (job.tags||[]).slice(0,4).join(", ");

  const para2 = {
    systems:    `In my role as a Software Engineer at Wipro Technologies, I supported Fortune 500 clients including PepsiCo and Morgan Stanley across the complete SDLC and PLC — from requirements gathering, process definition, and solution design through formal testing, validation, and release. I defined and managed database schemas that served as requirements engineering databases, maintained end-to-end requirements-test-defect traceability, participated in design reviews, and performed risk and gap analysis with formal mitigation plans.`,
    ba:         `At Wipro Technologies, I served as the primary point of contact for requirements gathering on Fortune 500 programs — translating complex business needs into technical specifications, facilitating stakeholder workshops, managing Jira workflows, authoring and executing test cases, coordinating UAT cycles, and building Excel-macro and BI reporting tools that gave leadership clear traceability across the product lifecycle. I consistently drove process improvements that reduced manual effort by approximately 30%.`,
    pm:         `At Wipro Technologies, I led program coordination activities for Fortune 500 client deliverables — building program plans, tracking schedules, milestones, resources, and dependencies, performing risk and gap analysis, and developing mitigation and change-management plans. I coordinated across global, cross-functional engineering and business teams and drove continuous process improvements that reduced manual effort by approximately 30%.`,
    qa:         `At Wipro Technologies, I owned test management and formal validation for Fortune 500 enterprise programs — authoring and executing test cases, tracking defects in Jira, driving issues to resolution across multiple validation cycles, and building requirements-test-defect traceability matrices that linked every deliverable end-to-end. I designed database schemas that functioned as requirements engineering databases, providing an auditable record from requirements through defect closure.`,
    data:       `At Wipro Technologies and during my MBA at Hult, I built a wide range of data and BI solutions: designing star-schema data models over 15,000+ records with 25+ measures, writing SQL queries for status reporting, building Excel-macro tools for executive stakeholders, and developing Power BI dashboards that reduced manual reporting effort by approximately 40%. I hold certifications in SQL, DAX/Power BI, and Tableau from DataCamp.`,
    solutions:  `At Wipro Technologies, I worked directly with Fortune 500 clients to gather and translate complex requirements into scalable technical solutions — leading discovery workshops, designing solution architectures, coordinating validation and UAT cycles, and managing cross-functional delivery teams from requirements through go-live.`,
    consultant: `At Wipro Technologies, I delivered end-to-end SDLC programs for Fortune 500 clients including PepsiCo and Morgan Stanley — gathering requirements, designing solutions, managing test content and UAT, building BI and Excel reporting for stakeholder visibility, and driving process improvements that reduced manual effort by approximately 30%.`,
    default:    `At Wipro Technologies, I worked across the full SDLC with Fortune 500 clients including PepsiCo and Morgan Stanley — gathering and translating requirements, owning test management and validation, managing Jira workflows, designing database schemas for requirements traceability, and building BI reporting solutions. I drove process improvements that reduced manual effort by approximately 30%.`
  }[r] || "";

  return `<style>${DOC_CSS}</style>
<div class="l-wrap">
  <div class="l-sender">
    <strong>${CONTACT.name}</strong><br>
    ${CONTACT.location}<br>
    ${CONTACT.email}<br>
    ${CONTACT.linkedin}<br>
    ${CONTACT.status}
  </div>
  <div class="l-date">${today}</div>
  <div class="l-to">
    Hiring Manager<br>
    ${job.company}<br>
    ${job.location}
  </div>
  <div class="l-subj">Re: ${job.title}</div>
  <div class="l-body">
    <p>Dear Hiring Manager,</p>
    <p>I am writing to express my strong interest in the <strong>${job.title}</strong> role at <strong>${job.company}</strong>. With four years of professional experience across the software and product development lifecycle (SDLC/PLC), backed by a Computer Science degree and an MBA in Business Analytics from Hult International Business School (graduating July 2026), I am confident my background aligns directly with what you are looking for.</p>
    <p>${para2}</p>
    <p>Beyond my professional experience, I bring a strong analytical foundation from my MBA coursework in Business Intelligence, Data Visualization, Operations Research, and Agile Project Management. My hands-on projects include a full-stack AI SaaS platform (Python/React), a fintech credit-scoring application, and a multi-page BI dashboard on a star-schema data model. My skills in <strong>${tags}</strong> are directly applicable to your team's work.</p>
    <p>I am particularly drawn to <strong>${job.company}</strong> because of ${companyBlurb(job)}. I would welcome the opportunity to bring my expertise to your team and contribute from day one.</p>
    <p>I have attached my resume for your review and would love to discuss how my background aligns with this role. Thank you for your time and consideration.</p>
    <p>Sincerely,<br><br>
    <strong>${CONTACT.name}</strong><br>
    ${CONTACT.location} &nbsp;|&nbsp; ${CONTACT.email}<br>
    ${CONTACT.linkedin} &nbsp;|&nbsp; ${CONTACT.github}<br>
    F-1 OPT Eligible July 2026</p>
  </div>
</div>`;
}

// ─── UI ───────────────────────────────────────────────────────────────────────
let _docJobId = null;
let _docTab   = "resume";

function openDocsPanel(jobId) {
  _docJobId = jobId;
  const job = (typeof allJobs !== "undefined" ? allJobs : []).find(j => j.id === jobId);
  if (!job) { console.error("openDocsPanel: job not found", jobId); return; }
  document.getElementById("docsPanelTitle").textContent = job.title + " — " + job.company;
  switchDocTab("resume");
  document.getElementById("docsOverlay").classList.add("open");
}

function closeDocsPanel() {
  document.getElementById("docsOverlay").classList.remove("open");
  _docJobId = null;
}

function switchDocTab(tab) {
  _docTab = tab;
  document.querySelectorAll(".doc-tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  const job = (typeof allJobs !== "undefined" ? allJobs : []).find(j => j.id === _docJobId);
  if (!job) return;

  const atsEl = document.getElementById("atsInfo");
  if (tab === "resume") {
    const { score, matched, missing } = atsScore(job);
    const sc = score >= 90 ? "#15803d" : score >= 75 ? "#b45309" : "#b91c1c";
    const rs = score >= 90 ? "#22c55e" : score >= 75 ? "#f59e0b" : "#ef4444";
    const r = 28, circ = +(2 * Math.PI * r).toFixed(1);
    const off = +(circ - (score / 100) * circ).toFixed(1);
    atsEl.style.cssText = "padding:0 20px 12px";
    atsEl.innerHTML = `<div style="display:flex;align-items:center;gap:14px;background:#f0fdf4;border:2px solid #4ade80;border-radius:10px;padding:12px 16px">
      <svg width="60" height="60" viewBox="0 0 72 72" style="flex-shrink:0">
        <circle cx="36" cy="36" r="${r}" fill="none" stroke="#d1fae5" stroke-width="8"/>
        <circle cx="36" cy="36" r="${r}" fill="none" stroke="${rs}" stroke-width="8"
          stroke-dasharray="${circ}" stroke-dashoffset="${off}"
          stroke-linecap="round" transform="rotate(-90 36 36)"/>
        <text x="36" y="40" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="900" fill="${sc}">${score}%</text>
      </svg>
      <div>
        <div style="font-family:sans-serif;font-size:.95rem;font-weight:800;color:${sc};margin-bottom:3px">ATS Score: ${score}% &nbsp;${score>=90?"✅ Excellent":score>=75?"🟡 Good":"🔴 Needs Work"}</div>
        <div style="font-family:sans-serif;font-size:.72rem;color:#374151;margin-bottom:5px">Tailored for: <strong>${job.title}</strong> at <strong>${job.company}</strong></div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${matched.map(k=>`<span style="font-family:sans-serif;font-size:.66rem;font-weight:700;padding:2px 7px;border-radius:20px;background:#dcfce7;color:#15803d">✓ ${k}</span>`).join("")}
          ${missing.map(k=>`<span style="font-family:sans-serif;font-size:.66rem;padding:2px 7px;border-radius:20px;background:#fee2e2;color:#b91c1c">✗ ${k}</span>`).join("")}
        </div>
      </div>
    </div>`;
  } else {
    atsEl.style.cssText = "";
    atsEl.innerHTML = "";
  }

  document.getElementById("docsBody").innerHTML = tab === "resume" ? resumeHTML(job) : coverHTML(job);
}

function printCurrentDoc() {
  const job = (typeof allJobs !== "undefined" ? allJobs : []).find(j => j.id === _docJobId);
  if (!job) return;
  const isResume = _docTab === "resume";
  const content  = isResume ? resumeHTML(job) : coverHTML(job);
  const title    = isResume
    ? `Resume_${job.company}_${job.title}`.replace(/\s+/g,"_")
    : `CoverLetter_${job.company}_${job.title}`.replace(/\s+/g,"_");

  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html><html><head><title>${title}</title><style>
    body{margin:.6in;background:#fff}
    .ats-bar{display:none !important}
    @page{margin:.55in}
  </style></head><body>${content}</body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 400);
}
