import React from "react";

/* ============================================================
   HANNSFREE OPS — Internal Containment Command Centre
   ------------------------------------------------------------
   One app, five surfaces: Diagnose (OECT) → Report (SNAPSHOT)
   → Validate (OVP) → Clients (pipeline) → Cases (content).

   ARCHITECTURE (edit the right layer, leave the rest alone):
     • TEMPLATE  — colours, fonts, spacing, labels, offers, copy.
                   This is the designer / tweak layer.
     • ENGINE    — deterministic maths. Matched to references.
     • RENDERER  — draws the 12-page audit from template + data.
     • GEMINI    — optional findings enrichment, with fallback.
     • SHELL     — the five-surface app, OECT → audit zero-paste.

   To restyle the audit: edit THEME / LAYOUT / TIERS in TEMPLATE.
   No engine changes required.
   ============================================================ */

/* ===== TEMPLATE LAYER (edit me to restyle) ===== */

/* ============================================================
   HANNSFREE — AUDIT TEMPLATE
   ------------------------------------------------------------
   THIS FILE IS THE DESIGN SPEC FOR THE SNAPSHOT AUDIT.
   Edit values here to restyle or restructure the audit.
   You do NOT need to touch engine code to change the look.

   Two blocks:
     THEME  — every colour, font, size, spacing value
     LAYOUT — section order, labels, page structure, copy

   A designer (Figma) hands back values that map onto THEME
   and LAYOUT fields. Paste them in. The renderer reads this.
   ============================================================ */

const THEME = {
  /* ---- palette ---- */
  color: {
    ink: "#0B0B0F",          // primary text on light
    inkSoft: "#3A3A44",      // secondary text
    inkFaint: "#73737F",     // captions / footnotes
    paper: "#FFFFFF",        // page background
    paperAlt: "#F6F5F9",     // panel background
    line: "#E3E1EA",         // hairlines / rules
    royal: "#4C2DB8",        // Hannsfree primary
    royalDeep: "#2E1A78",    // darker accent
    signal: "#6D4DF0",       // highlight
    // status colours
    critical: "#C8312E",
    exposed: "#C8791B",
    contained: "#2E8B6F",
    optimised: "#1F7A4D",
    coverBg: "#0B0B0F",      // dark cover page
    coverInk: "#F2F0FA",
  },

  /* ---- type ----
     Editorial consultancy register: serif authority in headings,
     clean grotesque body, mono for data/labels. */
  font: {
    display: "'Newsreader', Georgia, serif",
    body: "'Inter', -apple-system, system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  size: {
    coverTitle: "46px",
    h1: "30px",
    h2: "20px",
    label: "10px",
    body: "12.5px",
    data: "13px",
    bigStat: "64px",
    footnote: "9.5px",
  },
  weight: { reg: 400, med: 500, semi: 600, bold: 700 },
  tracking: { label: "1.8px", title: "-0.4px" },

  /* ---- spacing / layout metrics ---- */
  space: {
    pagePadV: "64px",
    pagePadH: "56px",
    block: "26px",
    tight: "12px",
    rule: "20px",
  },
  page: {
    width: "794px",   // A4 @ 96dpi
    minHeight: "1123px",
    radius: "0px",
  },
};

/* ------------------------------------------------------------
   VIABILITY FLOOR — the bottom gate of the offer ladder.
   Below this containment %, a business is in structural free-fall.
   It does NOT need operational containment — it needs to stabilise
   and survive first. Selling a Reset here is a bad outcome for them
   and a reputational liability for Hannsfree. The disciplined move
   is to decline, explain, and leave the door open.
   Edit the floor in one place. ------------------------------------ */
const VIABILITY_FLOOR = 20; // containment % below which = "Not Yet a Fit"
const VIABILITY = {
  label: "Stabilisation Required",
  subLabel: "Not Yet a Fit",
  instruction: "Decline — Stabilise First",
  color: "#8A2B2B", // deep, sober red — distinct from Critical
  offer: {
    name: "Stabilisation Required",
    price: "—",
    objective:
      "This operation is below the threshold where an Operational Exposure Reset can hold. The structural foundation is in free-fall — containment work would not take. The business needs to reach baseline operational stability before a Reset is viable: a functioning intake, predictable delivery, and an owner not single-handedly holding the operation together. We would re-diagnose once that foundation exists.",
  },
};

/* ------------------------------------------------------------
   STATUS TIERS — thresholds, labels, instruction, colours,
   and the OFFER LADDER (honest tiered recommendation).
   Edit prices / labels here in one place.
   ------------------------------------------------------------ */
const TIERS = [
  {
    key: "critical",
    min: 0, max: 39.999,
    label: "Critical Exposure",
    band: "CRITICAL",
    instruction: "Containment Required",
    color: THEME.color.critical,
    riskLevel: "HIGH",
    recoveryWindow: "3–6 operational cycles",
    interpretation: "Controls in this domain are failing or absent.",
    offer: {
      name: "Operational Exposure Reset",
      price: "£2,500",
      objective:
        "Restore containment in the priority domains identified in this diagnostic, stabilise throughput under load, and reduce operational exposure.",
    },
  },
  {
    key: "exposed",
    min: 40, max: 59.999,
    label: "Elevated Exposure",
    band: "EXPOSED",
    instruction: "Monitoring",
    color: THEME.color.exposed,
    riskLevel: "HIGH",
    recoveryWindow: "2–4 operational cycles",
    interpretation:
      "Controls exist but are inconsistent and likely to degrade under load.",
    offer: {
      name: "Operational Exposure Reset",
      price: "£2,500",
      objective:
        "Restore containment in the priority domains identified in this diagnostic, stabilise throughput under load, and reduce operational exposure.",
    },
  },
  {
    key: "contained",
    min: 60, max: 79.999,
    label: "Contained",
    band: "CONTAINED",
    instruction: "Monitoring",
    color: THEME.color.contained,
    riskLevel: "MODERATE",
    recoveryWindow: "1–2 operational cycles",
    interpretation:
      "Controls are largely stable but carry residual exposure in specific domains.",
    offer: {
      name: "Containment Tune-Up",          // EDITABLE placeholder offer
      price: "£750",
      objective:
        "Sharpen the one or two domains carrying residual exposure, without a full Reset. Targeted, single-cycle intervention.",
    },
  },
  {
    key: "optimised",
    min: 80, max: 100,
    label: "Optimised",
    band: "OPTIMISED",
    instruction: "Maintained",
    color: THEME.color.optimised,
    riskLevel: "LOW",
    recoveryWindow: "0–1 operational cycles",
    interpretation:
      "Controls are stable and resilient under normal operating conditions.",
    offer: {
      name: "Containment Retainer",          // EDITABLE placeholder offer
      price: "£250/mo",
      objective:
        "Light ongoing monitoring to hold containment at its current level and catch drift early. No Reset required.",
    },
  },
];

/* ------------------------------------------------------------
   DOMAIN COPY — fixed per-domain operational-effect language,
   keyed by status band. This is the deterministic fallback
   AND the scaffold Gemini enriches. Editable prose.
   ------------------------------------------------------------ */
/* ------------------------------------------------------------
   CONTAINMENT PLAYBOOK — the delivery IP.
   For each domain, the concrete build moves a solo operator
   executes to contain it. Stack: Google Workspace (Sheets/Forms),
   HubSpot free CRM, Make.com automation. Each move = one
   checklist item with: what to build, the steps, the artifact
   handed to the client, and the measurable it moves.
   Editable — this is the method, sharpen it with real reps.
   ------------------------------------------------------------ */
const PLAYBOOK = {
  Capture: [
    {
      id: "cap1", title: "Single intake funnel", effort: "M",
      build: "Consolidate every enquiry channel into one logged destination.",
      steps: [
        "Create a HubSpot free account; connect the client's enquiry email so inbound lands as contacts.",
        "Build a Google Form for web/phone enquiries that writes to a Sheet (or HubSpot form embed).",
        "Make.com scenario: any new enquiry (email/form) → create/upsert HubSpot contact, stamped with time + source.",
        "One place, every enquiry, auto-logged. Kill the scattered inbox/notebook habit.",
      ],
      artifact: "Live intake system: every enquiry logged, time-stamped, in one place.",
      measure: "Logged-enquiry completeness (target: 100% of inbound captured).",
    },
    {
      id: "cap2", title: "Response-time SLA + first-touch template", effort: "S",
      build: "Guarantee fast first contact without the owner being free.",
      steps: [
        "Agree a written response standard (target: under 1 hour, working hours).",
        "Write one templated first-reply (acknowledge, set expectation, next step).",
        "Make.com: new enquiry → auto-send the first-touch reply instantly.",
        "Owner now beats the clock automatically on every lead.",
      ],
      artifact: "Automated first-touch reply + written SLA.",
      measure: "Median first-response time (target: under 1 hour).",
    },
    {
      id: "cap3", title: "Source tagging", effort: "S",
      build: "Turn 'word of mouth, unsure' into a real source breakdown.",
      steps: [
        "Define 5–7 source categories with the owner (referral, web, social, repeat, etc).",
        "Add a required 'source' field to the form / HubSpot contact.",
        "Install the habit: every enquiry tagged at entry.",
      ],
      artifact: "Source-tagged enquiry data.",
      measure: "% of enquiries with a known source (target: 90%+).",
    },
  ],
  Conversion: [
    {
      id: "con1", title: "Follow-up cadence engine", effort: "L", flagship: true,
      build: "Every quote enters a fixed, automated follow-up sequence. Usually the single highest-leverage fix in the whole Reset.",
      steps: [
        "Map the cadence: day 1 send, day 3 nudge, day 7 check, day 14 close-or-park.",
        "Write the 3 follow-up message templates (nudge / check / close).",
        "HubSpot: create a deal stage pipeline (Quote Sent → Following Up → Won/Lost).",
        "Make.com: quote sent → create deal + schedule the cadence; auto-send or task each step.",
        "No quote is ever forgotten again.",
      ],
      artifact: "Working follow-up cadence engine with templated steps.",
      measure: "% of quotes receiving full follow-up (target: 100%); win-rate movement.",
    },
    {
      id: "con2", title: "Quote template + pricing structure", effort: "M",
      build: "Stop price being invented per client; protect margin.",
      steps: [
        "Build one clean quote template (Google Doc / HubSpot quote).",
        "Define pricing logic with the owner: tiers, rate card, or rules.",
        "Document the 'when do we discount' boundary.",
      ],
      artifact: "Reusable quote template + pricing rule sheet.",
      measure: "Pricing consistency; quote turnaround time.",
    },
    {
      id: "con3", title: "Win/loss logging", effort: "S",
      build: "Make the conversion leak visible.",
      steps: [
        "Add a required 'lost reason' field to the HubSpot Lost stage.",
        "Install the one-line logging habit on every closed deal.",
        "Review monthly: the real reason work is lost surfaces.",
      ],
      artifact: "Win/loss log with reasons.",
      measure: "% of closed deals with a logged reason.",
    },
  ],
  Delivery: [
    {
      id: "del1", title: "Delivery process map", effort: "L",
      build: "A documented, repeatable process per core job type — the spine that breaks owner-dependency.",
      steps: [
        "Pick the 1–2 most common job types.",
        "Walk the owner through every step start-to-finish; capture it in a Google Doc checklist.",
        "Convert to a reusable template (HubSpot task templates or a Sheet checklist per job).",
        "Now anyone can run the job to the same standard.",
      ],
      artifact: "Documented delivery process per job type.",
      measure: "Process adherence; reduced owner-only steps.",
    },
    {
      id: "del2", title: "Promised-date discipline", effort: "M",
      build: "Make slippage visible before it becomes a complaint.",
      steps: [
        "Add promised-date + status to each job (HubSpot deal / Sheet).",
        "Make.com: job approaching/past due date → alert the owner.",
        "Weekly: review at-risk jobs.",
      ],
      artifact: "Date-tracking system with slippage alerts.",
      measure: "% of jobs delivered by promised date.",
    },
    {
      id: "del3", title: "Owner-dependency break", effort: "M",
      build: "Make delivery survive the owner being away two weeks.",
      steps: [
        "List the tasks only the owner can currently do.",
        "For each: document it, or assign/delegate it with the process map.",
        "Test: could someone else hold delivery for two weeks?",
      ],
      artifact: "Delegation/documentation covering owner-only tasks.",
      measure: "Count of owner-only critical tasks (target: trending to zero).",
    },
  ],
  Retention: [
    {
      id: "ret1", title: "Post-delivery re-engagement sequence", effort: "M",
      build: "Turn one-off clients into repeat revenue with no new acquisition cost.",
      steps: [
        "Design the sequence: completion check-in → next-step offer → scheduled future touch.",
        "Write the templates for each.",
        "Make.com: job marked complete → fire the sequence over following weeks.",
      ],
      artifact: "Automated post-delivery re-engagement sequence.",
      measure: "Repeat-purchase rate.",
    },
    {
      id: "ret2", title: "Referral ask system", effort: "S",
      build: "Make referrals a process tied to peak goodwill, not luck.",
      steps: [
        "Define the moment to ask (just after successful delivery).",
        "Write the referral ask template.",
        "Make.com: completion + positive signal → send referral ask.",
      ],
      artifact: "Structured referral ask system.",
      measure: "Referrals generated per month.",
    },
    {
      id: "ret3", title: "Repeat-rate tracking + dormant contact", effort: "S",
      build: "Make retention a number, and reactivate paid-for relationships.",
      steps: [
        "Build a simple repeat vs one-off view (HubSpot report / Sheet).",
        "Set a cadence to re-contact dormant past clients.",
        "Install the schedule.",
      ],
      artifact: "Repeat-rate dashboard + dormant-client contact schedule.",
      measure: "Repeat rate %; dormant clients reactivated.",
    },
  ],
};

const DOMAIN_COPY = {
  Capture: {
    role: "Inbound demand intake and response integrity.",
    effect: {
      CRITICAL: "Inbound demand may be missed or delayed due to weak intake structure and limited visibility.",
      EXPOSED: "Inbound demand may be missed or delayed due to weak intake structure and limited visibility.",
      CONTAINED: "Intake is mostly reliable, with occasional leakage at entry under peak load.",
      OPTIMISED: "Inbound demand is captured reliably with limited leakage at entry.",
    },
  },
  Conversion: {
    role: "Quote-to-close progression and follow-up discipline.",
    effect: {
      CRITICAL: "Prospects may accumulate without progression due to inconsistent follow-up and process control.",
      EXPOSED: "Prospects may accumulate without progression due to inconsistent follow-up and process control.",
      CONTAINED: "Progression is broadly consistent, with some drop-off where follow-up cadence slips.",
      OPTIMISED: "Prospects progress with predictable cadence and reduced drop-off risk.",
    },
  },
  Delivery: {
    role: "Fulfilment consistency and load tolerance.",
    effect: {
      CRITICAL: "Delivery may become reactive under pressure, increasing friction and client-facing instability.",
      EXPOSED: "Delivery may become reactive under pressure, increasing friction and client-facing instability.",
      CONTAINED: "Delivery holds under normal load but shows strain at the margins.",
      OPTIMISED: "Delivery remains consistent with limited operational strain.",
    },
  },
  Retention: {
    role: "Repeat business and re-engagement structure.",
    effect: {
      CRITICAL: "Repeat business is likely constrained by weak post-delivery continuity and limited re-engagement structure.",
      EXPOSED: "Repeat business is likely constrained by weak post-delivery continuity and limited re-engagement structure.",
      CONTAINED: "Re-engagement functions but leaves repeat revenue partially uncaptured.",
      OPTIMISED: "Re-engagement systems support repeat revenue with low churn pressure.",
    },
  },
};

/* ------------------------------------------------------------
   LAYOUT — the 12-page section order and fixed copy.
   Reorder, rename, or rewrite headings here.
   ------------------------------------------------------------ */
const LAYOUT = {
  brand: "HannsFree",
  reportTitle: "Operational Exposure Diagnostic",
  reportSubtitle: "Operational Snapshot — Audit Report",
  framework: "Operational Exposure Containment Theory (OECT)",
  confidentialNote: "This report contains proprietary assessment data.",
  totalPages: 12,

  methodology: {
    heading: "Methodology",
    intro:
      "This assessment uses the Operational Exposure Containment Theory (OECT) framework to measure structural exposure across four operational domains: Capture, Conversion, Delivery, and Retention.",
    scaleIntro: "The OECT score ranges from 0 to 150, where:",
    containmentDef:
      "Containment represents the percentage of operational controls that are stable and resilient.",
    exposureDef:
      "Exposure represents the inverse: the percentage of operational risk that remains uncontrolled or inconsistent.",
    tierIntro: "Each operational domain is evaluated using a four-tier containment scale:",
    tierScale: [
      "Optimised (80–100%)",
      "Contained (60–79%)",
      "Exposed (40–59%)",
      "Critical (<40%)",
    ],
    closing:
      "The overall status is derived from the aggregate containment score and reflects the operational resilience of the business.",
  },

  /* revenue projection model knobs — editable */
  revenueModel: {
    // Leakage coefficient: caps how much exposure converts to lost
    // revenue. Exposure does NOT map 1:1 to revenue loss. Set so that
    // 100% exposure = 25% revenue loss — deliberately below the cited
    // IDC/Forbes operational-loss benchmark of 20–30%, for defensibility.
    // Tune here: 0.25 conservative · 0.30 middle · 0.35 bolder.
    leakageCoefficient: 0.25,
    conservativeMult: 0.5,
    expectedMult: 1.0,
    aggressiveMult: 1.25,
    recoveryPointGain: 30,      // +30 points over 90 days
    recoveryDays: 90,
  },

  pressureTest: {
    failureSequence: [
      "Inbound demand increases.",
      "Primary weakness constraints amplify.",
      "Downstream throughput misaligns.",
      "Client-facing instability becomes visible.",
    ],
  },
};

/* page order — the renderer walks this array.
   Reorder to change the document; each maps to a render block. */
const PAGE_ORDER = [
  "cover",
  "executiveSummary",
  "methodology",
  "containmentScore",
  "exposureMap",
  "domainBreakdown",
  "diagnosticFindings",
  "pressureTest",
  "revenueLeakage",
  "recoveryProjection",
  "priorityOrder",
  "recommendedIntervention",
];


/* ===== ENGINE LAYER (deterministic maths) ===== */

/* ============================================================
   HANNSFREE — AUDIT ENGINE (deterministic)
   ------------------------------------------------------------
   Pure computation. Takes an OECT result + client info,
   returns the complete audit data object the renderer draws.
   No styling here. No randomness. Same input → same output.
   Matched to the reference PDFs exactly.
   ============================================================ */

const DOMAINS = ["Capture", "Conversion", "Delivery", "Retention"];

/* tier lookup by a 0-100 percentage */
function tierForPct(pct) {
  const p = pct <= 1 ? pct * 100 : pct;
  return TIERS.find((t) => p >= t.min && p <= t.max) || TIERS[0];
}

/* round to whole percent the way the references do */
const pc = (n) => Math.round(n);
const gbp = (n) => "£" + Math.round(n).toLocaleString("en-GB");

/* ------------------------------------------------------------
   buildAudit(input)
   input = {
     client, business, date,
     monthlyRevenue,            // number (real, from the call)
     domains: { Capture: 0-100, Conversion, Delivery, Retention },
     // OR a raw OECT object with .perDomain
   }
   ------------------------------------------------------------ */
function buildAudit(input) {
  const dom = input.domains;

  // per-domain points out of 37.5
  const perDomain = DOMAINS.map((name) => {
    const pct = dom[name]; // 0-100
    const tier = tierForPct(pct);
    return {
      name,
      pct: pc(pct),
      points: +((pct / 100) * 37.5).toFixed(1),
      band: tier.band,
      color: tier.color,
      role: DOMAIN_COPY[name].role,
      interpretation: tier.interpretation,
      effect: DOMAIN_COPY[name].effect[tier.band],
    };
  });

  const totalPoints = +perDomain.reduce((s, d) => s + d.points, 0).toFixed(0);
  const containmentPct = pc((totalPoints / 150) * 100);
  const exposurePct = 100 - containmentPct;
  const overallTier = tierForPct(containmentPct);
  // viability floor: below it, the business is not yet a fit
  const viable = containmentPct >= VIABILITY_FLOOR;

  // primary weakness = lowest-scoring domain
  const sorted = [...perDomain].sort((a, b) => a.pct - b.pct);
  const primaryWeakness = sorted[0].name;
  const secondary = sorted[1].name;

  // priority order = ascending containment (worst first)
  const priorityOrder = sorted.map((d) => ({
    name: d.name,
    pct: d.pct,
    band: d.band,
    color: d.color,
  }));

  // ---- EXPOSURE CONCENTRATION (innovation #3) ----
  // Same average score can hide very different risk shapes. A business
  // at 50/50/50/50 is distributed; one at 80/80/80/0 is concentrated —
  // and a single collapsing domain sinks an operation faster than even
  // weakness everywhere. We measure the spread and flag the shape.
  const pcts = perDomain.map((d) => d.pct);
  const mean = pcts.reduce((s, p) => s + p, 0) / pcts.length;
  const variance = pcts.reduce((s, p) => s + (p - mean) ** 2, 0) / pcts.length;
  const stdev = Math.sqrt(variance);
  const spread = Math.max(...pcts) - Math.min(...pcts);
  // gap between weakest and the next-weakest: how isolated the failure is
  const isolationGap = sorted[1].pct - sorted[0].pct;
  let concentrationShape, concentrationNote;
  if (spread >= 30 && isolationGap >= 15) {
    concentrationShape = "Concentrated";
    concentrationNote = `Exposure is concentrated in ${primaryWeakness}, ${isolationGap} points below the next domain. A single isolated failure point is more dangerous than even weakness — it fails first and drags the rest down.`;
  } else if (spread >= 30) {
    concentrationShape = "Lopsided";
    concentrationNote = `Exposure is uneven — a ${spread}-point spread across domains. ${primaryWeakness} and ${secondary} carry disproportionate risk relative to the average.`;
  } else {
    concentrationShape = "Distributed";
    concentrationNote = `Exposure is spread evenly across domains (spread ${spread} points). No single failure point — weakness is systemic rather than isolated.`;
  }
  const concentration = {
    shape: concentrationShape,
    spread,
    stdev: +stdev.toFixed(1),
    isolationGap,
    note: concentrationNote,
    // concentrated risk is weighted as higher-severity even at equal score
    severityModifier: concentrationShape === "Concentrated" ? 1.15 : concentrationShape === "Lopsided" ? 1.07 : 1.0,
  };

  // revenue
  const rev = parseFloat(input.monthlyRevenue) || 0;
  const hasRevenue = rev > 0;
  const rm = LAYOUT.revenueModel;
  const leak = rm.leakageCoefficient ?? 1; // caps exposure→loss conversion
  const monthlyConstrained = rev * (exposurePct / 100) * leak;
  const annualConstrained = monthlyConstrained * 12;
  const impactRange = {
    conservative: {
      m: monthlyConstrained * rm.conservativeMult,
      a: monthlyConstrained * rm.conservativeMult * 12,
    },
    expected: { m: monthlyConstrained, a: annualConstrained },
    aggressive: {
      m: monthlyConstrained * rm.aggressiveMult,
      a: monthlyConstrained * rm.aggressiveMult * 12,
    },
  };

  // recovery projection (+30 pts capped at 150) — same coefficient applied
  const projectedPoints = Math.min(totalPoints + rm.recoveryPointGain, 150);
  const projectedContainment = pc((projectedPoints / 150) * 100);
  const projectedExposure = 100 - projectedContainment;
  const projectedMonthlyConstrained = rev * (projectedExposure / 100) * leak;
  const monthlyGain = monthlyConstrained - projectedMonthlyConstrained;

  // pressure test
  const pressure = {
    riskLevel: overallTier.riskLevel,
    breakdownPoint: primaryWeakness,
    recoveryWindow: overallTier.recoveryWindow,
    sequence: LAYOUT.pressureTest.failureSequence,
    impact: pressureImpactLine(overallTier.key, perDomain),
  };

  // ---- FALSIFIABLE PREDICTION (innovation #2) ----
  // The audit stakes a testable claim tied to the weakest domain. A later
  // re-diagnostic checks whether it held. An audit that predicts and then
  // verifies is a different trust object than one that merely asserts.
  const weakDomain = sorted[0];
  const predictionByDomain = {
    Capture: "enquiry response continues to slip and a meaningful share of inbound leads goes unactioned",
    Conversion: "quote follow-up stays inconsistent and win-rate drifts down by a measurable margin",
    Delivery: "delivery slips past promised dates more often and rework climbs under load",
    Retention: "repeat and referral revenue stays passive and at least one recoverable client lapses",
  };
  const horizonDays = weakDomain.band === "CRITICAL" ? 60 : weakDomain.band === "EXPOSED" ? 90 : 120;
  const prediction = {
    domain: weakDomain.name,
    claim: `If ${weakDomain.name} is left uncontained, ${predictionByDomain[weakDomain.name]}.`,
    horizonDays,
    thresholdPct: weakDomain.pct, // re-score at/below this = prediction held
    verdict: "pending",
    stakedAt: input.date || new Date().toISOString().slice(0, 10),
  };

  return {
    meta: {
      client: input.client || "",
      business: input.business || "",
      date: input.date || new Date().toISOString().slice(0, 10),
    },
    score: {
      points: totalPoints,
      containmentPct,
      exposurePct,
      status: viable ? overallTier.label : VIABILITY.label,
      band: overallTier.band,
      instruction: viable ? overallTier.instruction : VIABILITY.instruction,
      color: viable ? overallTier.color : VIABILITY.color,
      subLabel: viable ? null : VIABILITY.subLabel,
    },
    primaryWeakness,
    secondary,
    concentration,
    prediction,
    keyInsight: `Parallel containment restoration: ${primaryWeakness} and ${secondary}`,
    perDomain,
    priorityOrder,
    revenue: {
      hasRevenue,
      monthlyRevenue: rev,
      monthlyConstrained,
      annualConstrained,
      impactRange,
      // formatted
      fMonthly: hasRevenue ? gbp(monthlyConstrained) : "—",
      fAnnual: hasRevenue ? gbp(annualConstrained) : "—",
    },
    recovery: {
      currentPoints: totalPoints,
      currentContainment: containmentPct,
      projectedPoints,
      projectedContainment,
      fCurrentConstrained: hasRevenue ? gbp(monthlyConstrained) : "—",
      fProjectedConstrained: hasRevenue ? gbp(projectedMonthlyConstrained) : "—",
      fMonthlyGain: hasRevenue ? gbp(monthlyGain) : "—",
      days: rm.recoveryDays,
    },
    pressure,
    viable,
    recommendation: viable ? {
      name: overallTier.offer.name,
      price: overallTier.offer.price,
      objective: overallTier.offer.objective,
      priorityObjectives: [primaryWeakness, secondary],
      isReset: overallTier.offer.name.includes("Reset"),
      notAFit: false,
    } : {
      name: VIABILITY.offer.name,
      price: VIABILITY.offer.price,
      objective: VIABILITY.offer.objective,
      priorityObjectives: [],
      isReset: false,
      notAFit: true,
    },
    tierKey: viable ? overallTier.key : "notfit",
  };
}

function pressureImpactLine(tierKey, perDomain) {
  const names = perDomain.map((d) => d.name).join(", ");
  if (tierKey === "critical")
    return `Critical gaps in ${names} create immediate operational risk.`;
  if (tierKey === "exposed")
    return `Exposed controls in ${names} will degrade under sustained load.`;
  if (tierKey === "contained")
    return `Residual exposure in specific domains may surface under sustained load.`;
  return "Operational resilience is maintained under normal conditions.";
}

/* ---- RE-DIAGNOSTIC DELTA (innovation #1) ----
   Compares a baseline audit to a later one. The delta IS the deliverable:
   it makes invisible operational work visible and quantified, and it
   verifies the baseline's staked prediction. This is what converts a
   one-off Reset into provable, recurring value. */
function computeDelta(baseline, current) {
  if (!baseline || !current) return null;
  const domainDeltas = current.perDomain.map((c) => {
    const b = baseline.perDomain.find((x) => x.name === c.name);
    const change = b ? c.pct - b.pct : 0;
    return { name: c.name, from: b ? b.pct : null, to: c.pct, change, color: c.color };
  });
  const containmentChange = current.score.containmentPct - baseline.score.containmentPct;
  const constrainedChange = baseline.revenue.monthlyConstrained - current.revenue.monthlyConstrained; // positive = recovered

  // verify the baseline's prediction
  let predictionVerdict = "pending";
  if (baseline.prediction) {
    const cur = current.perDomain.find((d) => d.name === baseline.prediction.domain);
    if (cur) {
      // held = domain stayed at/below staked threshold (got worse or stagnated)
      // averted = domain rose above threshold (the client acted, exposure contained)
      predictionVerdict = cur.pct > baseline.prediction.thresholdPct ? "averted" : "held";
    }
  }

  return {
    domainDeltas,
    containmentChange,
    fContainmentChange: (containmentChange >= 0 ? "+" : "") + containmentChange + "%",
    constrainedChange,
    fConstrainedRecovered: "£" + Math.round(Math.abs(constrainedChange)).toLocaleString("en-GB"),
    recovered: constrainedChange >= 0,
    predictionVerdict,
    baselineDate: baseline.meta.date,
    currentDate: current.meta.date,
    headline: containmentChange >= 0
      ? `Containment improved ${containmentChange} points — ${baseline.revenue.hasRevenue ? "£" + Math.round(Math.abs(constrainedChange)).toLocaleString("en-GB") + "/mo recovered" : "measurable structural gain"}.`
      : `Containment fell ${Math.abs(containmentChange)} points since baseline.`,
  };
}


/* ===== GEMINI ENRICHMENT (optional, has fallback) ===== */

/* ============================================================
   GEMINI ENRICHMENT — findings deepener
   ------------------------------------------------------------
   ENHANCEMENT, NOT DEPENDENCY.
   The audit is complete without this. When a key + network are
   available, this returns richer per-domain interpretation/effect
   prose. On any failure it returns null and the renderer falls
   back to the deterministic template copy. Never throws upward.
   ============================================================ */

export async function enrichFindings(apiKey, audit) {
  if (!apiKey) return null;
  try {
    const domainLines = audit.perDomain
      .map((d) => `${d.name}: ${d.pct}% (${d.band})`)
      .join("\n");

    const prompt = `You are the diagnostic engine for Hannsfree, an operational containment consultancy. For each of the four domains below, write two short sentences: an "interpretation" (what the score means structurally) and an "operational effect" (the concrete consequence for the business). Tone: forensic, sober, premium, British English. No fluff, no exclamation marks, no marketing language. Each sentence under 24 words.

BUSINESS: ${audit.meta.business || "the business"}
OVERALL CONTAINMENT: ${audit.score.containmentPct}% (${audit.score.status})
PRIMARY WEAKNESS: ${audit.primaryWeakness}

DOMAINS:
${domainLines}

Return STRICT JSON only, no markdown fences, exactly:
{
  "Capture": {"interpretation":"...","effect":"..."},
  "Conversion": {"interpretation":"...","effect":"..."},
  "Delivery": {"interpretation":"...","effect":"..."},
  "Retention": {"interpretation":"...","effect":"..."}
}`;

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      encodeURIComponent(apiKey);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    // validate shape; if any domain missing, bail to fallback
    const ok = ["Capture", "Conversion", "Delivery", "Retention"].every(
      (k) => parsed[k]?.interpretation && parsed[k]?.effect
    );
    return ok ? parsed : null;
  } catch {
    return null;
  }
}


/* ===== RENDERER LAYER (12-page audit) ===== */

/* ============================================================
   AUDIT RENDERER
   ------------------------------------------------------------
   Draws the 12-page SNAPSHOT from (audit data + template).
   Pure presentation. Reads THEME/LAYOUT — never hard-codes
   style values, so the template file controls the look.
   Register: premium consultancy, light pages, royal accents.
   ============================================================ */

/* ---- shared primitives ---- */
const Page = ({ n, children, accent }) => (
  <section
    className="hf-page"
    style={{
      width: T.page.width,
      minHeight: T.page.minHeight,
      background: T.color.paper,
      color: T.color.ink,
      padding: `${T.space.pagePadV} ${T.space.pagePadH}`,
      position: "relative",
      fontFamily: T.font.body,
      fontSize: T.size.body,
      lineHeight: 1.6,
      margin: "0 auto 28px",
      boxShadow: "0 1px 0 rgba(0,0,0,.04), 0 24px 60px rgba(11,11,15,.10)",
      display: "flex",
      flexDirection: "column",
      borderTop: accent ? `3px solid ${T.color.royal}` : "none",
    }}
  >
    <RunningHead />
    <div style={{ flex: 1 }}>{children}</div>
    <Footer n={n} />
  </section>
);

const RunningHead = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 10,
      marginBottom: 28,
      borderBottom: `1px solid ${T.color.line}`,
      fontFamily: T.font.mono,
      fontSize: T.size.footnote,
      letterSpacing: T.tracking.label,
      textTransform: "uppercase",
      color: T.color.inkFaint,
    }}
  >
    <span style={{ fontWeight: 700, color: T.color.royal }}>{LAYOUT.brand}</span>
    <span>{LAYOUT.reportTitle}</span>
  </div>
);

const Footer = ({ n }) => (
  <div
    style={{
      marginTop: 32,
      paddingTop: 10,
      borderTop: `1px solid ${T.color.line}`,
      display: "flex",
      justifyContent: "space-between",
      fontFamily: T.font.mono,
      fontSize: T.size.footnote,
      color: T.color.inkFaint,
      letterSpacing: "0.5px",
    }}
  >
    <span>{LAYOUT.framework}</span>
    <span>
      Page {n} / {LAYOUT.totalPages}
    </span>
  </div>
);

const Label = ({ children, color }) => (
  <div
    style={{
      fontFamily: T.font.mono,
      fontSize: T.size.label,
      letterSpacing: T.tracking.label,
      textTransform: "uppercase",
      color: color || T.color.inkFaint,
      fontWeight: 600,
      marginBottom: 8,
    }}
  >
    {children}
  </div>
);

const H1 = ({ children }) => (
  <h1
    style={{
      fontFamily: T.font.display,
      fontSize: T.size.h1,
      fontWeight: 500,
      letterSpacing: T.tracking.title,
      margin: "0 0 24px",
      lineHeight: 1.1,
    }}
  >
    {children}
  </h1>
);

const H2 = ({ children }) => (
  <h2
    style={{
      fontFamily: T.font.display,
      fontSize: T.size.h2,
      fontWeight: 500,
      margin: "0 0 10px",
    }}
  >
    {children}
  </h2>
);

const Bar = ({ pct, color, height = 8 }) => (
  <div
    style={{
      height,
      background: T.color.paperAlt,
      borderRadius: 999,
      overflow: "hidden",
      border: `1px solid ${T.color.line}`,
    }}
  >
    <div
      style={{
        width: `${pct}%`,
        height: "100%",
        background: color,
        borderRadius: 999,
      }}
    />
  </div>
);

const BandTag = ({ band, color }) => (
  <span
    style={{
      fontFamily: T.font.mono,
      fontSize: 9.5,
      letterSpacing: "1.2px",
      fontWeight: 700,
      color: "#fff",
      background: color,
      padding: "3px 8px",
      borderRadius: 4,
    }}
  >
    {band}
  </span>
);

/* ============================================================
   PAGE 1 — COVER
   ============================================================ */
const Cover = ({ a }) => (
  <section
    className="hf-page"
    style={{
      width: T.page.width,
      minHeight: T.page.minHeight,
      background: T.color.paper,
      padding: `${T.space.pagePadV} ${T.space.pagePadH}`,
      margin: "0 auto 28px",
      boxShadow: "0 24px 60px rgba(11,11,15,.10)",
      display: "flex",
      flexDirection: "column",
      borderTop: `4px solid ${T.color.royal}`,
      position: "relative",
    }}
  >
    <div
      style={{
        fontFamily: T.font.mono,
        fontSize: T.size.label,
        letterSpacing: T.tracking.label,
        textTransform: "uppercase",
        color: T.color.royal,
        fontWeight: 700,
      }}
    >
      {LAYOUT.brand}
    </div>

    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: T.font.mono,
          fontSize: T.size.label,
          letterSpacing: T.tracking.label,
          textTransform: "uppercase",
          color: T.color.inkFaint,
          marginBottom: 16,
        }}
      >
        {LAYOUT.reportSubtitle}
      </div>
      <h1
        style={{
          fontFamily: T.font.display,
          fontSize: T.size.coverTitle,
          fontWeight: 500,
          letterSpacing: T.tracking.title,
          lineHeight: 1.05,
          margin: "0 0 40px",
          maxWidth: 560,
        }}
      >
        {LAYOUT.reportTitle}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          rowGap: 12,
          fontSize: T.size.data,
          maxWidth: 480,
          borderTop: `1px solid ${T.color.line}`,
          paddingTop: 24,
        }}
      >
        <CoverRow k="Client" v={a.meta.client || "—"} />
        <CoverRow k="Business" v={a.meta.business || "—"} />
        <CoverRow k="Assessment" v={a.meta.date} />
      </div>
    </div>

    <div
      style={{
        borderTop: `1px solid ${T.color.line}`,
        paddingTop: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: T.font.mono,
            fontSize: T.size.label,
            letterSpacing: "1.5px",
            fontWeight: 700,
            color: T.color.ink,
          }}
        >
          CONFIDENTIAL
        </div>
        <div style={{ fontSize: T.size.footnote, color: T.color.inkFaint, marginTop: 4, maxWidth: 320 }}>
          {LAYOUT.confidentialNote}
        </div>
      </div>
      <div style={{ fontFamily: T.font.mono, fontSize: T.size.footnote, color: T.color.inkFaint }}>
        Page 1 / {LAYOUT.totalPages}
      </div>
    </div>
  </section>
);

const CoverRow = ({ k, v }) => (
  <>
    <div
      style={{
        fontFamily: T.font.mono,
        fontSize: T.size.label,
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: T.color.inkFaint,
        paddingTop: 2,
      }}
    >
      {k}
    </div>
    <div style={{ fontWeight: 500 }}>{v}</div>
  </>
);

/* ============================================================
   PAGE 2 — EXECUTIVE SUMMARY
   ============================================================ */
const ExecutiveSummary = ({ a }) => (
  <Page n={2} accent>
    <Label>Executive Summary</Label>
    <H1>Containment at a glance</H1>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 28 }}>
      <SummaryStat label="Containment Level" big={`${a.score.containmentPct}%`} sub={a.score.status} subColor={a.score.color} />
      <SummaryStat label="Instruction" big={a.score.instruction} bigSize="22px" />
    </div>

    <div style={{ marginBottom: 24 }}>
      <Label>Primary Operational Risk</Label>
      <div style={{ fontFamily: T.font.display, fontSize: 19 }}>
        {a.primaryWeakness} instability.
      </div>
    </div>

    <div style={{ marginBottom: 24 }}>
      <Label>Exposure Snapshot</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
        {a.perDomain.map((d) => (
          <div key={d.name} style={{ display: "grid", gridTemplateColumns: "110px 1fr 120px", alignItems: "center", gap: 14 }}>
            <span style={{ fontWeight: 500 }}>{d.name}</span>
            <Bar pct={d.pct} color={d.color} />
            <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: T.font.mono, fontWeight: 600 }}>{d.pct}%</span>
              <BandTag band={d.band} color={d.color} />
            </span>
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        background: T.color.paperAlt,
        border: `1px solid ${T.color.line}`,
        borderRadius: 8,
        padding: "18px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Label>Estimated Constrained Revenue</Label>
        <div style={{ fontSize: T.size.footnote, color: T.color.inkFaint }}>
          {a.revenue.hasRevenue ? "Monthly · directional estimate" : "Monthly revenue not supplied"}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: T.font.display, fontSize: 30, color: a.score.color, lineHeight: 1 }}>
          {a.revenue.fMonthly}
        </div>
        {a.revenue.hasRevenue && (
          <div style={{ fontFamily: T.font.mono, fontSize: T.size.footnote, color: T.color.inkFaint, marginTop: 4 }}>
            {a.revenue.fAnnual} / year
          </div>
        )}
      </div>
    </div>
  </Page>
);

const SummaryStat = ({ label, big, sub, subColor, bigSize }) => (
  <div>
    <Label>{label}</Label>
    <div style={{ fontFamily: T.font.display, fontSize: bigSize || "44px", lineHeight: 1, marginTop: 4 }}>
      {big}
    </div>
    {sub && (
      <div style={{ marginTop: 8, fontWeight: 600, color: subColor || T.color.ink, fontFamily: T.font.mono, fontSize: 12, letterSpacing: "0.5px" }}>
        {sub}
      </div>
    )}
  </div>
);

/* ============================================================
   PAGE 3 — METHODOLOGY
   ============================================================ */
const Methodology = ({ a }) => {
  const m = LAYOUT.methodology;
  return (
    <Page n={3}>
      <Label>Section 01</Label>
      <H1>{m.heading}</H1>
      <p style={{ maxWidth: 600, marginBottom: 20 }}>{m.intro}</p>
      <p style={{ marginBottom: 6, fontWeight: 500 }}>{m.scaleIntro}</p>
      <ul style={{ margin: "0 0 22px", paddingLeft: 18, color: T.color.inkSoft }}>
        <li style={{ marginBottom: 6 }}>{m.containmentDef}</li>
        <li>{m.exposureDef}</li>
      </ul>
      <p style={{ marginBottom: 10, fontWeight: 500 }}>{m.tierIntro}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 520 }}>
        {TIERS.slice().reverse().map((t) => (
          <div key={t.key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1px solid ${T.color.line}`, borderRadius: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.color }} />
            <span style={{ fontFamily: T.font.mono, fontSize: 12 }}>
              {t.label} ({t.min === 80 ? "80–100" : t.min === 60 ? "60–79" : t.min === 40 ? "40–59" : "<40"}%)
            </span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 24, maxWidth: 600, color: T.color.inkSoft }}>{m.closing}</p>
    </Page>
  );
};

/* ============================================================
   PAGE 4 — CONTAINMENT SCORE
   ============================================================ */
const ContainmentScore = ({ a }) => (
  <Page n={4}>
    <Label>Section 02</Label>
    <H1>Containment Score</H1>
    <div style={{ display: "flex", alignItems: "center", gap: 48, margin: "20px 0 32px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: T.font.display, fontSize: T.size.bigStat, color: a.score.color, lineHeight: 1 }}>
          {a.score.containmentPct}%
        </div>
        <div style={{ fontFamily: T.font.mono, fontSize: 14, color: T.color.inkSoft, marginTop: 8 }}>
          {a.score.points} / 150
        </div>
        <div style={{ fontFamily: T.font.mono, fontSize: T.size.footnote, color: T.color.inkFaint, marginTop: 4 }}>
          {a.score.exposurePct}% Exposure
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Bar pct={a.score.containmentPct} color={a.score.color} height={14} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22 }}>
          <Field label="Overall Status" value={a.score.status} color={a.score.color} />
          <Field label="Instruction Label" value={a.score.instruction} />
        </div>
      </div>
    </div>
  </Page>
);

const Field = ({ label, value, color }) => (
  <div>
    <Label>{label}</Label>
    <div style={{ fontWeight: 600, color: color || T.color.ink, fontSize: 16 }}>{value}</div>
  </div>
);

/* ============================================================
   PAGE 5 — EXPOSURE MAP
   ============================================================ */
const ExposureMap = ({ a }) => (
  <Page n={5}>
    <Label>Section 03</Label>
    <H1>Exposure Map</H1>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 12 }}>
      {a.perDomain.map((d) => (
        <div key={d.name} style={{ border: `1px solid ${T.color.line}`, borderRadius: 10, padding: 22, borderTop: `3px solid ${d.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <H2>{d.name}</H2>
            <BandTag band={d.band} color={d.color} />
          </div>
          <div style={{ fontFamily: T.font.display, fontSize: 40, color: d.color, lineHeight: 1, margin: "8px 0 12px" }}>
            {d.pct}%
          </div>
          <Bar pct={d.pct} color={d.color} />
          <div style={{ fontSize: T.size.footnote, color: T.color.inkFaint, marginTop: 12 }}>{d.role}</div>
        </div>
      ))}
    </div>
  </Page>
);

/* ============================================================
   PAGE 6 — DOMAIN BREAKDOWN
   ============================================================ */
const DomainBreakdown = ({ a }) => (
  <Page n={6}>
    <Label>Section 04</Label>
    <H1>Domain Breakdown</H1>
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: T.size.data }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${T.color.ink}` }}>
          <Th>Domain</Th><Th align="right">Percent</Th><Th align="right">Label</Th>
        </tr>
      </thead>
      <tbody>
        {a.perDomain.map((d) => (
          <tr key={d.name} style={{ borderBottom: `1px solid ${T.color.line}` }}>
            <td style={{ padding: "14px 8px", fontWeight: 500 }}>{d.name}</td>
            <td style={{ padding: "14px 8px", textAlign: "right", fontFamily: T.font.mono }}>{d.pct}%</td>
            <td style={{ padding: "14px 8px", textAlign: "right" }}><BandTag band={d.band} color={d.color} /></td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 28 }}>
      <div style={{ background: T.color.paperAlt, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 18 }}>
        <Label>Primary Weakness</Label>
        <div style={{ fontFamily: T.font.display, fontSize: 22, color: a.score.color }}>{a.primaryWeakness}</div>
      </div>
      <div style={{ background: T.color.paperAlt, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 18 }}>
        <Label>Key Insight</Label>
        <div style={{ fontSize: 13, color: T.color.inkSoft }}>{a.keyInsight}</div>
      </div>
    </div>

    {a.concentration && (
      <div style={{ marginTop: 18, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 18, borderLeft: `3px solid ${a.score.color}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <Label>Exposure Concentration</Label>
          <span style={{ fontFamily: T.font.mono, fontSize: 13, fontWeight: 700, color: a.score.color }}>
            {a.concentration.shape} · {a.concentration.spread}pt spread
          </span>
        </div>
        <div style={{ fontSize: 12.5, color: T.color.inkSoft, marginTop: 6 }}>{a.concentration.note}</div>
      </div>
    )}
  </Page>
);

const Th = ({ children, align }) => (
  <th style={{ padding: "8px", textAlign: align || "left", fontFamily: T.font.mono, fontSize: T.size.label, letterSpacing: "1px", textTransform: "uppercase", color: T.color.inkFaint, fontWeight: 600 }}>
    {children}
  </th>
);

/* ============================================================
   PAGE 7 — DIAGNOSTIC FINDINGS (Gemini-enriched or fallback)
   ============================================================ */
const DiagnosticFindings = ({ a, findings }) => (
  <Page n={7}>
    <Label>Section 05</Label>
    <H1>Diagnostic Findings</H1>
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {a.perDomain.map((d) => {
        const f = findings?.[d.name];
        return (
          <div key={d.name} style={{ borderLeft: `3px solid ${d.color}`, paddingLeft: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <H2>{d.name}</H2>
              <BandTag band={d.band} color={d.color} />
            </div>
            <FindingRow k="Observation" v={`${d.name} containment is ${d.band} (${d.pct}%).`} />
            <FindingRow k="Interpretation" v={f?.interpretation || d.interpretation} />
            <FindingRow k="Operational Effect" v={f?.effect || d.effect} />
          </div>
        );
      })}
    </div>
    <div style={{ marginTop: 24, background: T.color.paperAlt, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 16 }}>
      <Label>Primary Weakness — {a.primaryWeakness}</Label>
      <div style={{ fontSize: 12.5, color: T.color.inkSoft }}>
        Containment restoration should begin here to prevent downstream instability.
      </div>
    </div>
  </Page>
);

const FindingRow = ({ k, v }) => (
  <div style={{ marginBottom: 6 }}>
    <span style={{ fontFamily: T.font.mono, fontSize: 10.5, letterSpacing: "0.8px", textTransform: "uppercase", color: T.color.inkFaint, fontWeight: 600 }}>
      {k}:{" "}
    </span>
    <span style={{ fontSize: 12.5 }}>{v}</span>
  </div>
);

/* ============================================================
   PAGE 8 — SYSTEM PRESSURE TEST
   ============================================================ */
const PressureTest = ({ a }) => (
  <Page n={8}>
    <Label>Section 06</Label>
    <H1>System Pressure Test</H1>
    <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
      <Pill label="Risk Level" value={a.pressure.riskLevel} color={a.score.color} />
      <Pill label="Likely Breakdown Point" value={a.pressure.breakdownPoint} />
      <Pill label="Recovery Window" value={a.pressure.recoveryWindow} />
    </div>
    <Label>Failure Sequence</Label>
    <ol style={{ margin: "8px 0 24px", paddingLeft: 20 }}>
      {a.pressure.sequence.map((s, i) => (
        <li key={i} style={{ marginBottom: 8, fontSize: 13 }}>{s}</li>
      ))}
    </ol>
    <div style={{ background: T.color.paperAlt, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 18 }}>
      <Label>Operational Impact</Label>
      <div style={{ fontSize: 13, color: T.color.inkSoft }}>{a.pressure.impact}</div>
    </div>
  </Page>
);

const Pill = ({ label, value, color }) => (
  <div style={{ flex: 1, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 16 }}>
    <Label>{label}</Label>
    <div style={{ fontWeight: 600, fontSize: 16, color: color || T.color.ink }}>{value}</div>
  </div>
);

/* ============================================================
   PAGE 9 — REVENUE LEAKAGE
   ============================================================ */
const RevenueLeakage = ({ a }) => (
  <Page n={9}>
    <Label>Section 07</Label>
    <H1>Revenue Leakage</H1>
    <p style={{ maxWidth: 600, marginBottom: 20, color: T.color.inkSoft }}>
      Exposure represents the percentage of operational capacity constrained by uncontrolled or inconsistent processes. Applied to revenue, this gives the estimated constrained revenue — the portion at risk due to operational exposure.
    </p>

    {a.revenue.hasRevenue ? (
      <>
        <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
          <BigFig label={`Exposure`} value={`${a.score.exposurePct}%`} />
          <BigFig label="Constrained / month" value={a.revenue.fMonthly} color={a.score.color} />
          <BigFig label="Constrained / year" value={a.revenue.fAnnual} color={a.score.color} />
        </div>
        <Label>Impact Range</Label>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: T.size.data }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${T.color.ink}` }}>
              <Th>Scenario</Th><Th align="right">Monthly</Th><Th align="right">Annual</Th>
            </tr>
          </thead>
          <tbody>
            <RangeRow k="Conservative" m={a.revenue.impactRange.conservative.m} an={a.revenue.impactRange.conservative.a} />
            <RangeRow k="Expected" m={a.revenue.impactRange.expected.m} an={a.revenue.impactRange.expected.a} bold />
            <RangeRow k="Aggressive" m={a.revenue.impactRange.aggressive.m} an={a.revenue.impactRange.aggressive.a} />
          </tbody>
        </table>
        <div style={{ fontSize: T.size.footnote, color: T.color.inkFaint, marginTop: 14 }}>
          Estimate based on containment gap. Directional indicator, not a guarantee.
        </div>
      </>
    ) : (
      <div style={{ background: T.color.paperAlt, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 24, color: T.color.inkSoft }}>
        Revenue estimate omitted — monthly revenue was not supplied during assessment.
      </div>
    )}
  </Page>
);

const BigFig = ({ label, value, color }) => (
  <div style={{ flex: 1, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 18 }}>
    <Label>{label}</Label>
    <div style={{ fontFamily: T.font.display, fontSize: 26, color: color || T.color.ink, lineHeight: 1.1 }}>{value}</div>
  </div>
);

const RangeRow = ({ k, m, an, bold }) => {
  const f = (n) => "£" + Math.round(n).toLocaleString("en-GB");
  return (
    <tr style={{ borderBottom: `1px solid ${T.color.line}`, background: bold ? T.color.paperAlt : "transparent" }}>
      <td style={{ padding: "12px 8px", fontWeight: bold ? 700 : 500 }}>{k}</td>
      <td style={{ padding: "12px 8px", textAlign: "right", fontFamily: T.font.mono, fontWeight: bold ? 700 : 400 }}>{f(m)}</td>
      <td style={{ padding: "12px 8px", textAlign: "right", fontFamily: T.font.mono, fontWeight: bold ? 700 : 400 }}>{f(an)}</td>
    </tr>
  );
};

/* ============================================================
   PAGE 10 — RECOVERY PROJECTION
   ============================================================ */
const RecoveryProjection = ({ a }) => (
  <Page n={10}>
    <Label>Section 08</Label>
    <H1>Recovery Projection</H1>
    <p style={{ maxWidth: 600, marginBottom: 24, color: T.color.inkSoft }}>
      With containment improvements implemented systematically, the following recovery is achievable within {a.recovery.days} days.
    </p>
    <div style={{ display: "flex", alignItems: "stretch", gap: 16, marginBottom: 24 }}>
      <StateCard label="Current State" pts={`${a.recovery.currentPoints}/150`} pct={`${a.recovery.currentContainment}%`} color={T.color.inkSoft} />
      <div style={{ display: "flex", alignItems: "center", fontFamily: T.font.display, fontSize: 28, color: T.color.royal }}>→</div>
      <StateCard label={`Projected (+${LAYOUT.revenueModel.recoveryPointGain} pts)`} pts={`${a.recovery.projectedPoints}/150`} pct={`${a.recovery.projectedContainment}%`} color={T.color.contained} />
    </div>
    {a.revenue.hasRevenue && (
      <div style={{ border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 20 }}>
        <Label>Revenue Impact</Label>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <MiniStat k="Current constrained" v={`${a.recovery.fCurrentConstrained}/mo`} />
          <MiniStat k="Projected constrained" v={`${a.recovery.fProjectedConstrained}/mo`} />
          <MiniStat k="Monthly gain" v={a.recovery.fMonthlyGain} color={T.color.contained} />
        </div>
      </div>
    )}
  </Page>
);

const StateCard = ({ label, pts, pct, color }) => (
  <div style={{ flex: 1, border: `1px solid ${T.color.line}`, borderRadius: 8, padding: 20, textAlign: "center" }}>
    <Label>{label}</Label>
    <div style={{ fontFamily: T.font.display, fontSize: 34, color, lineHeight: 1.1, marginTop: 4 }}>{pct}</div>
    <div style={{ fontFamily: T.font.mono, fontSize: 12, color: T.color.inkFaint, marginTop: 4 }}>{pts}</div>
  </div>
);

const MiniStat = ({ k, v, color }) => (
  <div>
    <Label>{k}</Label>
    <div style={{ fontFamily: T.font.mono, fontWeight: 600, fontSize: 15, color: color || T.color.ink }}>{v}</div>
  </div>
);

/* ============================================================
   PAGE 11 — CONTAINMENT PRIORITY ORDER
   ============================================================ */
const PriorityOrder = ({ a }) => (
  <Page n={11}>
    <Label>Section 09</Label>
    <H1>Containment Priority Order</H1>
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
      {a.priorityOrder.map((d, i) => (
        <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 20px", border: `1px solid ${T.color.line}`, borderRadius: 8, borderLeft: `4px solid ${d.color}` }}>
          <span style={{ fontFamily: T.font.display, fontSize: 28, color: T.color.inkFaint, width: 30 }}>{i + 1}</span>
          <span style={{ flex: 1, fontWeight: 600, fontSize: 16 }}>{d.name}</span>
          <span style={{ fontFamily: T.font.mono, fontWeight: 600 }}>{d.pct}%</span>
          <BandTag band={d.band} color={d.color} />
        </div>
      ))}
    </div>
  </Page>
);

/* ============================================================
   PAGE 12 — RECOMMENDED INTERVENTION (tiered offer)
   ============================================================ */
const RecommendedIntervention = ({ a }) => (
  <Page n={12} accent>
    <Label>Section 10</Label>
    <H1>Recommended Intervention</H1>
    <div style={{ background: T.color.paperAlt, border: `1px solid ${T.color.line}`, borderRadius: 10, padding: 28, borderTop: `3px solid ${T.color.royal}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: T.font.display, fontSize: 26 }}>{a.recommendation.name}</div>
        <div style={{ fontFamily: T.font.mono, fontSize: 20, fontWeight: 700, color: T.color.royal }}>{a.recommendation.price}</div>
      </div>
      <p style={{ marginTop: 14, color: T.color.inkSoft, maxWidth: 600 }}>{a.recommendation.objective}</p>

      {!a.recommendation.notAFit && (
        <div style={{ marginTop: 20 }}>
          <Label>Priority Objectives</Label>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            {a.recommendation.priorityObjectives.map((p) => (
              <span key={p} style={{ fontFamily: T.font.mono, fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 999, border: `1px solid ${T.color.royal}`, color: T.color.royal }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
    {a.prediction && !a.recommendation.notAFit && (
      <div style={{ marginTop: 18, border: `1px solid ${T.color.line}`, borderRadius: 10, padding: 22, background: T.color.paper }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <Label color={T.color.royal}>Staked Prediction</Label>
          <span style={{ fontFamily: T.font.mono, fontSize: 11, color: T.color.inkFaint }}>
            Verifiable in {a.prediction.horizonDays} days
          </span>
        </div>
        <p style={{ fontFamily: T.font.display, fontSize: 18, lineHeight: 1.45, margin: "8px 0 0" }}>
          {a.prediction.claim}
        </p>
        <div style={{ fontSize: T.size.footnote, color: T.color.inkFaint, marginTop: 10 }}>
          This is a testable claim. A re-diagnostic at {a.prediction.horizonDays} days measures whether it held — the instrument is accountable to its own findings.
        </div>
      </div>
    )}
    {a.recommendation.notAFit ? (
      <div style={{ marginTop: 16, fontSize: T.size.footnote, color: T.color.inkFaint, lineHeight: 1.6 }}>
        This diagnostic does not lead to an engagement at this time. The operation must reach baseline stability before an Operational Exposure Reset can be effective. A re-diagnostic is offered once that foundation is in place.
      </div>
    ) : !a.recommendation.isReset && (
      <div style={{ marginTop: 16, fontSize: T.size.footnote, color: T.color.inkFaint }}>
        This business does not require a full Operational Exposure Reset. The recommendation above reflects its current containment level.
      </div>
    )}
  </Page>
);

/* ============================================================
   MASTER RENDERER
   ============================================================ */
const PAGE_COMPONENTS = {
  cover: Cover,
  executiveSummary: ExecutiveSummary,
  methodology: Methodology,
  containmentScore: ContainmentScore,
  exposureMap: ExposureMap,
  domainBreakdown: DomainBreakdown,
  diagnosticFindings: DiagnosticFindings,
  pressureTest: PressureTest,
  revenueLeakage: RevenueLeakage,
  recoveryProjection: RecoveryProjection,
  priorityOrder: PriorityOrder,
  recommendedIntervention: RecommendedIntervention,
};

function AuditDocument({ audit, findings, pageOrder }) {
  if (!audit) return null;
  return (
    <div className="hf-audit-doc" style={{ background: "#EDECF1", padding: "28px 0" }}>
      {pageOrder.map((key) => {
        const Comp = PAGE_COMPONENTS[key];
        return Comp ? <Comp key={key} a={audit} findings={findings} /> : null;
      })}
    </div>
  );
}


/* ===== APP SHELL HELPERS ===== */

/* ============================================================
   APP SHELL — Hannsfree Ops command centre
   Five surfaces. OECT → Report with zero paste.
   (This file is concatenated below the audit modules at build.)
   ============================================================ */

const UI = {
  void: "#08070C", surface: "#0F0D16", surface2: "#16121F",
  line: "#241E38", lineGlow: "#352B58", royal: "#5B3DD6", royalLit: "#7C5CFF",
  signal: "#B9A7FF", text: "#ECEAF4", mute: "#8783A0",
  faint: "#5A5670", crit: "#E0476B", warn: "#E0922E", ok: "#3BC99A",
};
const UIMONO = "'JetBrains Mono', ui-monospace, monospace";

/* OECT instrument — feeds the engine directly (no paste) */
/* Each item: q = spoken question, cue = scoring reference,
   w = weight, a = four answer labels in FIXED order:
   [strong(1.0), partial(0.5), weak(0), unknown(0,flag)].
   Words flex to the question; positions and scores never move. */
const OECT_DOMAINS = [
  { key: "Capture", blurb: "How demand comes in and gets caught", qs: [
    { id: "c1", w: 1, q: "When a new enquiry comes in, walk me through what happens to it — where does it land?", cue: "Strong: one system, every enquiry logged. Weak: scattered across inbox, phone, memory.", a: ["One system", "Couple of places", "Scattered", "Not sure"] },
    { id: "c2", w: 1.2, q: "If someone enquires at 9am, when do they typically hear back?", cue: "Strong: under an hour, consistently. Weak: 'depends', hours, or next day.", a: ["Under 1hr", "Same day", "Slower", "Don't know"] },
    { id: "c3", w: 1, q: "Off the top of your head — out of ten enquiries, how many turn into a booked call?", cue: "Strong: a confident number. Weak: a guess, or 'no idea'.", a: ["Knows it", "Rough idea", "A guess", "No idea"] },
    { id: "c4", w: 0.8, q: "Do you know where your enquiries actually come from — which sources?", cue: "Strong: tracked by source. Weak: 'word of mouth, mostly' / untracked.", a: ["Tracked", "Some of it", "Word of mouth", "Untracked"] },
  ]},
  { key: "Conversion", blurb: "How enquiries become paying work", qs: [
    { id: "v1", w: 1.2, q: "After you send a quote and don't hear back — what happens next?", cue: "Strong: a fixed follow-up cadence. Weak: 'I wait', or it depends on memory.", a: ["Set follow-up", "Sometimes", "I wait", "Nothing"] },
    { id: "v2", w: 1, q: "Of the quotes you send, roughly what share do you win?", cue: "Strong: knows it within ~10%. Weak: can't say.", a: ["Knows it", "Ballpark", "Unsure", "No idea"] },
    { id: "v3", w: 1, q: "How do you land on a price — is it consistent, or worked out each time?", cue: "Strong: consistent, structured. Weak: ad hoc, negotiated per client.", a: ["Consistent", "Mostly", "Case by case", "Ad hoc"] },
    { id: "v4", w: 0.8, q: "When you lose a deal, do you capture why?", cue: "Strong: recorded with a reason. Weak: not tracked.", a: ["Recorded", "Sometimes", "Rarely", "Never"] },
  ]},
  { key: "Delivery", blurb: "How the work actually gets done", qs: [
    { id: "d1", w: 1.2, q: "When a new job starts, does it follow a set process or is each one figured out fresh?", cue: "Strong: documented, repeatable. Weak: reinvented each time.", a: ["Set process", "Loosely", "Each fresh", "No process"] },
    { id: "d2", w: 1, q: "How often does work slip past the date you promised?", cue: "Strong: rarely, and known. Weak: often, or 'sometimes'.", a: ["Rarely", "Occasionally", "Often", "Don't track"] },
    { id: "d3", w: 0.8, q: "Do you track how much work has to be redone or fixed?", cue: "Strong: rework rate measured. Weak: not tracked.", a: ["Measured", "Roughly", "Rarely", "Never"] },
    { id: "d4", w: 1, q: "If your key person was off for two weeks, would delivery hold?", cue: "Strong: not dependent on one person. Weak: it would stall.", a: ["Holds fine", "Mostly", "Strained", "Would stall"] },
  ]},
  { key: "Retention", blurb: "How clients come back and refer", qs: [
    { id: "r1", w: 1.2, q: "After a job's done well, is there a deliberate step to win repeat business?", cue: "Strong: a built-in step. Weak: 'they come back if they need us'.", a: ["Built-in step", "Sometimes", "Ad hoc", "None"] },
    { id: "r2", w: 1, q: "How do referrals happen — do you ask, or do they just turn up?", cue: "Strong: asked for systematically. Weak: luck / passive.", a: ["Asked for", "Now and then", "Just turn up", "Never ask"] },
    { id: "r3", w: 1, q: "Do you know what share of clients are repeat versus one-off?", cue: "Strong: knows churn/repeat rate. Weak: no idea.", a: ["Knows it", "Rough idea", "Unsure", "No idea"] },
    { id: "r4", w: 0.8, q: "Are past clients contacted on any kind of schedule?", cue: "Strong: scheduled re-engagement. Weak: never, or only when quiet.", a: ["Scheduled", "Occasionally", "When quiet", "Never"] },
  ]},
];
const OECT_ANSWERS = [
  { v: "yes", label: "Yes", score: 1 },
  { v: "partial", label: "Partial", score: 0.5 },
  { v: "no", label: "No", score: 0 },
  { v: "unknown", label: "Not tracked", score: 0, flag: true },
];

/* convert OECT responses → 0-100 per domain for the engine */
function oectToDomains(responses) {
  const out = {};
  OECT_DOMAINS.forEach((d) => {
    const tw = d.qs.reduce((s, q) => s + q.w, 0);
    let earned = 0;
    d.qs.forEach((q) => {
      const r = responses[q.id];
      if (!r) return;
      earned += OECT_ANSWERS.find((a) => a.v === r).score * q.w;
    });
    out[d.key] = tw ? Math.round((earned / tw) * 100) : 0;
  });
  return out;
}

async function SG(k, f) { try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : f; } catch { return f; } }
async function SS(k, v) { try { await window.storage.set(k, JSON.stringify(v)); } catch (e) {} }


/* ===== ROOT COMPONENT ===== */

/* ============================================================
   ROOT COMPONENT — assembled on top of the modules above.
   ============================================================ */
function HannsfreeOps() {
  const [tab, setTab] = React.useState("diagnose");
  const [apiKey, setApiKey] = React.useState("");
  const [clients, setClients] = React.useState([]);
  const [cases, setCases] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);

  const [meta, setMeta] = React.useState({ client: "", business: "", date: new Date().toISOString().slice(0, 10), monthlyRevenue: "" });
  const [responses, setResponses] = React.useState({});
  const [findings, setFindings] = React.useState(null);
  const [fitNote, setFitNote] = React.useState("");
  const [enriching, setEnriching] = React.useState(false);
  // when re-diagnosing an existing client, this holds their id so the
  // result deltas against their baseline automatically (no manual apply)
  const [reDxClientId, setReDxClientId] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      setApiKey(await SG("hf_key", ""));
      setClients(await SG("hf_clients", []));
      setCases(await SG("hf_cases", []));
      setLoaded(true);
    })();
  }, []);
  React.useEffect(() => { if (loaded) SS("hf_key", apiKey); }, [apiKey, loaded]);
  React.useEffect(() => { if (loaded) SS("hf_clients", clients); }, [clients, loaded]);
  React.useEffect(() => { if (loaded) SS("hf_cases", cases); }, [cases, loaded]);

  const totalQ = OECT_DOMAINS.reduce((s, d) => s + d.qs.length, 0);
  const answered = Object.keys(responses).length;

  // live audit object — engine runs continuously from OECT (zero paste)
  const audit = React.useMemo(() => {
    const domains = oectToDomains(responses);
    return buildAudit({
      client: meta.client, business: meta.business, date: meta.date,
      monthlyRevenue: meta.monthlyRevenue, domains,
    });
  }, [responses, meta]);

  const runEnrich = async () => {
    setEnriching(true);
    const f = await enrichFindings(apiKey, audit);
    setFindings(f); // null → renderer uses deterministic fallback
    setEnriching(false);
  };

  const setResp = (id, v) => setResponses((r) => ({ ...r, [id]: v }));

  // start a re-diagnostic: load the client's identity + last-known answers
  // into the live diagnostic, mark which client we're updating, jump to Diagnose.
  const startReDiagnose = (client) => {
    setMeta({
      client: client.name,
      business: client.business || "",
      date: new Date().toISOString().slice(0, 10),
      monthlyRevenue: client.baseline?.revenue?.monthlyRevenue
        ? String(client.baseline.revenue.monthlyRevenue)
        : (client.baseline?.monthlyRevenue || ""),
    });
    // pre-fill answers from baseline so you ADJUST what changed, not restart
    setResponses(client.baseline?.responses ? { ...client.baseline.responses } : {});
    setReDxClientId(client.id);
    setFindings(null);
    setTab("diagnose");
  };

  // apply the completed re-diagnostic back to its client (delta vs baseline)
  const applyReDiagnose = () => {
    if (!reDxClientId) return;
    setClients((p) => p.map((c) => {
      if (c.id !== reDxClientId) return c;
      const delta = computeDelta(
        { ...c.baseline, prediction: c.baseline?.prediction },
        audit
      );
      const entry = { date: audit.meta.date, containmentPct: audit.score.containmentPct, delta, createdAt: Date.now() };
      return {
        ...c,
        contained: audit.score.containmentPct / 100,
        rediagnostics: [...(c.rediagnostics || []), entry],
      };
    }));
    setReDxClientId(null);
    setTab("cases");
  };

  const nav = [
    ["diagnose", "Diagnose", "OECT"],
    ["report", "Report", "SNAPSHOT"],
    ["validate", "Validate", "OVP"],
    ["cases", "Metrics", "PERFORMANCE"],
  ];

  return (
    <div style={{ minHeight: "100vh", background: UI.void, color: UI.text, fontFamily: UIMONO, fontSize: 14 }}>
      <style>{APP_CSS}</style>

      <header style={sx.head}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={32} />
          <div>
            <div style={{ fontWeight: 700, letterSpacing: 3.5, fontSize: 14, fontFamily: UIMONO }}>HANNSFREE</div>
            <div style={{ color: UI.faint, fontSize: 9.5, letterSpacing: 2.5, fontFamily: UIMONO, textTransform: "uppercase", marginTop: 1 }}>Containment Command</div>
          </div>
        </div>
        <button style={sx.keyBadge} onClick={() => setTab("settings")}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: apiKey ? UI.ok : UI.faint, boxShadow: apiKey ? `0 0 8px ${UI.ok}` : "none" }} />
          {apiKey ? "Gemini linked" : "Findings: template mode"}
        </button>
      </header>

      <nav style={sx.nav} className="hf-nav-scroll">
        {nav.map(([k, label, code]) => (
          <button key={k} onClick={() => setTab(k)} className="hf-tap" style={{ ...sx.navBtn, ...(tab === k ? sx.navOn : {}) }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
            <span style={{ fontSize: 9, letterSpacing: 1.5, color: UI.faint }}>{code}</span>
          </button>
        ))}
      </nav>

      <main style={{ padding: "28px 24px 80px", maxWidth: 1180, margin: "0 auto" }}>
        <div key={tab} className="hf-tab-panel">
        {tab === "diagnose" && (
          <DiagnoseSurface
            meta={meta} setMeta={setMeta} responses={responses} setResp={setResp}
            audit={audit} answered={answered} totalQ={totalQ}
            onReport={() => { runEnrich(); setTab("report"); }}
            reDxClientId={reDxClientId} clients={clients}
            onApplyReDx={applyReDiagnose}
            onCancelReDx={() => { setReDxClientId(null); }}
          />
        )}
        {tab === "report" && (
          <ReportSurface
            audit={audit} findings={findings} enriching={enriching}
            answered={answered} totalQ={totalQ} apiKey={apiKey}
            responses={responses}
            onEnrich={runEnrich}
            onSaveClient={(c) => setClients((p) => [c, ...p])}
            onMakeCase={(cs) => setCases((p) => [cs, ...p])}
            goSettings={() => setTab("settings")}
          />
        )}
        {tab === "validate" && <ValidateSurface audit={audit} answered={answered} totalQ={totalQ} fitNote={fitNote} setFitNote={setFitNote} />}
        {tab === "cases" && <MetricsSurface clients={clients} setClients={setClients} onStartReDx={startReDiagnose} cases={cases} setCases={setCases} />}
        {tab === "settings" && <SettingsSurface apiKey={apiKey} setApiKey={setApiKey} back={() => setTab("diagnose")} />}
        </div>
      </main>
    </div>
  );
}

/* ---------- DIAGNOSE ---------- */
/* Call-mode spine: four beats. Copy is read aloud / glanced at.
   Edit this freely — it's call scaffolding, not the model. */
const CALL_BEATS = [
  { key: "open", label: "Open", code: "FRAME" },
  { key: "walk", label: "Walk", code: "4 DOMAINS" },
  { key: "cost", label: "Cost", code: "REVEAL" },
  { key: "close", label: "Close", code: "RECOMMEND" },
];

const OPEN_SCRIPT = [
  "Thanks for making the time. This won't feel like a sales call — it's a diagnostic.",
  "I'm going to walk through four areas of how the business runs operationally: how demand comes in, how it converts, how the work gets delivered, and how clients come back.",
  "There are no wrong answers. I'm mapping where the operational exposure sits — the gaps that quietly cost you. At the end I'll show you a number, and what to do about it.",
];

function closeScript(audit) {
  const r = audit.recommendation;
  if (r.notAFit) {
    return [
      `I'm going to be straight with you, because it's more useful than a pitch. You're at ${audit.score.containmentPct}% containment — and that's below the level where the work I do would actually hold.`,
      `The issue isn't a weak domain I can fix. The foundation itself is in free-fall, and a Reset on an unstable base doesn't take — I'd be taking your money for something that wouldn't stick. I won't do that.`,
      `What you need first is to stabilise: a functioning way to capture work, predictable delivery, and the business not resting entirely on you holding it together. Get to that baseline, and I'll happily re-diagnose — no charge for the re-look. But today, the honest answer is not yet.`,
    ];
  }
  if (r.isReset) {
    return [
      `So here's where it lands. You're at ${audit.score.containmentPct}% containment — ${audit.score.status}. The exposure is concentrated in ${audit.primaryWeakness}.`,
      `That exposure is constraining roughly ${audit.revenue.fMonthly} a month. Over a year, ${audit.revenue.fAnnual}.`,
      `What I'd recommend is the ${r.name}. It's ${r.price}, fixed. We isolate the exposure, contain it, and stabilise the domains dragging you down — starting with ${audit.primaryWeakness}.`,
    ];
  }
  if (r.name.includes("Tune-Up")) {
    return [
      `Good news first: you're at ${audit.score.containmentPct}% — ${audit.score.status}. You don't need a full Reset.`,
      `There's residual exposure in ${audit.primaryWeakness}, constraining around ${audit.revenue.fMonthly} a month. Worth sharpening, not overhauling.`,
      `What fits is a ${r.name} — ${r.price}. Targeted work on ${audit.primaryWeakness}, single cycle. No more than you need.`,
    ];
  }
  return [
    `Honestly? You're in strong shape — ${audit.score.containmentPct}%, ${audit.score.status}. You don't need an intervention from me.`,
    `There's minor drift worth watching in ${audit.primaryWeakness}, but nothing structural.`,
    `If you want, a ${r.name} at ${r.price} keeps a light eye on it so it doesn't slip. No pressure — you're already running well.`,
  ];
}

function DiagnoseSurface({ meta, setMeta, responses, setResp, audit, answered, totalQ, onReport, reDxClientId, clients, onApplyReDx, onCancelReDx }) {
  const reDxClient = reDxClientId ? clients.find((c) => c.id === reDxClientId) : null;
  const [beat, setBeat] = React.useState("open");
  const setupDone = meta.client && meta.business;

  return (
    <div style={sx.grid} className="hf-grid">
      <section style={{ minWidth: 0 }}>
        <div style={sx.eyebrow}>Operational Exposure Containment Theory · Live call</div>
        <h1 style={sx.h1}>{reDxClient ? "Re-diagnose" : "Conduct the diagnostic"}</h1>

        {reDxClient && (
          <div style={{ background: UI.surface, border: `1px solid ${UI.signal}`, borderRadius: 10, padding: 14, marginBottom: 18 }} className="hf-noprint">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, color: UI.signal, textTransform: "uppercase", fontWeight: 600 }}>Re-diagnostic · {reDxClient.name}</div>
                <div style={{ fontSize: 12, color: UI.mute, marginTop: 4 }}>
                  Baseline {reDxClient.baseline?.score?.containmentPct}% on {reDxClient.baseline?.meta?.date}. Answers below are pre-filled from last time — adjust only what changed.
                </div>
              </div>
              <button style={{ ...sx.tiny, color: UI.crit }} onClick={onCancelReDx}>Cancel</button>
            </div>
          </div>
        )}

        {/* beat rail */}
        <div style={sx.beatRail} className="hf-noprint">
          {CALL_BEATS.map((b, i) => {
            const active = beat === b.key;
            const done = CALL_BEATS.findIndex((x) => x.key === beat) > i;
            return (
              <button key={b.key} onClick={() => setBeat(b.key)} style={{ ...sx.beat, ...(active ? sx.beatOn : {}), ...(done ? sx.beatDone : {}) }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{i + 1}. {b.label}</span>
                <span style={{ fontSize: 9, letterSpacing: 1.2, opacity: 0.7 }}>{b.code}</span>
              </button>
            );
          })}
        </div>

        {/* OPEN */}
        {beat === "open" && (
          <div style={sx.domain}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
              <Inp label="Client name" value={meta.client} onChange={(v) => setMeta((m) => ({ ...m, client: v }))} ph="e.g. John Smith" />
              <Inp label="Business name" value={meta.business} onChange={(v) => setMeta((m) => ({ ...m, business: v }))} ph="e.g. Meridian Ltd" />
              <Inp label="Monthly revenue (£)" value={meta.monthlyRevenue} onChange={(v) => setMeta((m) => ({ ...m, monthlyRevenue: v.replace(/[^0-9.]/g, "") }))} ph="e.g. 60000" />
            </div>
            <div style={sx.scriptLabel}>Read to open the call</div>
            {OPEN_SCRIPT.map((line, i) => (
              <p key={i} style={sx.scriptLine}>{line}</p>
            ))}
            <button style={{ ...sx.primary, marginTop: 12, ...(setupDone ? {} : sx.dim) }} onClick={() => setBeat("walk")}>
              Begin the walk →
            </button>
            {!setupDone && <div style={{ fontSize: 11, color: UI.faint, marginTop: 8 }}>Add client and business name to begin.</div>}
          </div>
        )}

        {/* WALK */}
        {beat === "walk" && (
          <>
            <div style={sx.listenNudge} className="hf-noprint">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: UI.signal }} />
              Let them talk. You're listening more than speaking — score from what they tell you.
            </div>
            {OECT_DOMAINS.map((d) => {
              const dd = audit.perDomain.find((x) => x.name === d.key);
              const dAnswered = d.qs.filter((q) => responses[q.id]).length;
              return (
                <div key={d.key} style={sx.domain}>
                  <div style={sx.domainHead}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{d.key}</div>
                      <div style={{ color: UI.mute, fontSize: 12 }}>{d.blurb}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: dd.color }}>{dd.pct}%</div>
                      <div style={{ fontSize: 10, color: UI.faint }}>{dAnswered}/{d.qs.length}</div>
                    </div>
                  </div>
                  {d.qs.map((q) => (
                    <div key={q.id} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 14.5, marginBottom: 4, lineHeight: 1.45 }}>{q.q}</div>
                      <div style={sx.cue}>{q.cue}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                        {OECT_ANSWERS.map((ans, idx) => {
                          const on = responses[q.id] === ans.v;
                          const label = q.a ? q.a[idx] : ans.label;
                          return (
                            <button key={ans.v} onClick={() => setResp(q.id, ans.v)}
                              style={{ ...sx.ans, ...(on ? sx.ansOn : {}), ...(on && ans.flag ? sx.ansFlag : {}) }}>
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            <button style={{ ...sx.primary, ...(answered < totalQ ? sx.dim : {}) }} onClick={() => setBeat("cost")}>
              {answered < totalQ ? `${totalQ - answered} questions remaining` : "To the cost reveal →"}
            </button>
          </>
        )}

        {/* COST REVEAL */}
        {beat === "cost" && (
          <div className="hf-scan" style={{ ...sx.domain, textAlign: "center", padding: "40px 24px" }}>
            <div style={sx.scriptLabel}>Turn the screen. Let it land.</div>
            <div style={{ fontSize: 13, color: UI.mute, marginTop: 16 }}>{meta.business || "This business"} is currently leaking</div>
            <div key={audit.revenue.monthlyConstrained} className="hf-rise" style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 64, color: UI.crit, lineHeight: 1.1, margin: "8px 0", textShadow: `0 0 30px ${UI.crit}44` }}>
              {audit.revenue.hasRevenue ? <CountUp value={audit.revenue.monthlyConstrained} duration={900} format={(v) => "£" + Math.round(v).toLocaleString("en-GB")} /> : "—"}
            </div>
            <div style={{ fontSize: 13, color: UI.mute }}>every month — {audit.revenue.fAnnual} a year — to operational exposure.</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
              <div style={sx.costChip}>{audit.score.containmentPct}% contained</div>
              <div style={sx.costChip}>{audit.score.exposurePct}% exposed</div>
              <div style={sx.costChip}>Weakest: {audit.primaryWeakness}</div>
            </div>
            {!audit.revenue.hasRevenue && <div style={{ fontSize: 11, color: UI.faint, marginTop: 16 }}>No revenue entered — add it in the Open beat to show a figure.</div>}
            <button className="hf-btn" style={{ ...sx.primary, marginTop: 28, maxWidth: 280 }} onClick={() => setBeat("close")}>
              To the close →
            </button>
          </div>
        )}

        {/* CLOSE */}
        {beat === "close" && (
          <div style={sx.domain}>
            {reDxClient ? (
              <>
                <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 22, marginBottom: 12 }}>Re-diagnostic result</div>
                {(() => {
                  const d = computeDelta({ ...reDxClient.baseline, prediction: reDxClient.baseline?.prediction }, audit);
                  if (!d) return null;
                  return (
                    <div>
                      <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 18, color: d.containmentChange >= 0 ? UI.ok : UI.crit, marginBottom: 12 }}>
                        {d.headline}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
                        {d.domainDeltas.map((dd) => (
                          <div key={dd.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span style={{ color: UI.mute }}>{dd.name}</span>
                            <span style={{ fontFamily: UIMONO }}>{dd.from}% → {dd.to}% <span style={{ color: dd.change >= 0 ? UI.ok : UI.crit }}>({dd.change >= 0 ? "+" : ""}{dd.change})</span></span>
                          </div>
                        ))}
                      </div>
                      {d.predictionVerdict !== "pending" && (
                        <div style={{ fontSize: 12.5, padding: "8px 0", borderTop: `1px solid ${UI.line}` }}>
                          <span style={{ color: UI.faint }}>Prediction: </span>
                          <span style={{ color: d.predictionVerdict === "averted" ? UI.ok : UI.warn, fontWeight: 600 }}>
                            {d.predictionVerdict === "averted" ? "Averted — they acted, exposure contained" : "Held — the warning proved accurate"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}
                <button style={{ ...sx.primary, marginTop: 12, ...(answered < totalQ ? sx.dim : {}) }} onClick={onApplyReDx}>
                  Save re-diagnostic to {reDxClient.name} →
                </button>
                <div style={{ fontSize: 11, color: UI.faint, marginTop: 8, textAlign: "center" }}>
                  Logged to the client's timeline as proof of change.
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 22 }}>{audit.recommendation.name}</div>
                  <div style={{ fontFamily: UIMONO, fontSize: 18, fontWeight: 700, color: UI.signal }}>{audit.recommendation.price}</div>
                </div>
                <div style={sx.scriptLabel}>Read to close</div>
                {closeScript(audit).map((line, i) => (
                  <p key={i} style={sx.scriptLine}>{line}</p>
                ))}
                <button style={{ ...sx.primary, marginTop: 12 }} onClick={onReport}>
                  Generate SNAPSHOT →
                </button>
                <div style={{ fontSize: 11, color: UI.faint, marginTop: 8, textAlign: "center" }}>
                  The 12-page audit builds automatically from this call.
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* live rail — always visible */}
      <aside className="hf-rail hf-noprint">
        <div style={{ position: "sticky", top: 20 }}>
          <div style={sx.eyebrow}>Live containment</div>
          <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 68, lineHeight: 1, color: audit.score.color }}>
            <CountUp value={audit.score.containmentPct} duration={500} /><span style={{ fontSize: 26, color: UI.mute }}>%</span>
          </div>
          <div style={{ ...sx.statusPill, color: audit.score.color, borderColor: audit.score.color }}>{audit.score.status}</div>

          <Row k="Score" v={`${audit.score.points} / 150`} />
          <Row k="Exposure" v={`${audit.score.exposurePct}%`} c={UI.crit} />
          <Row k="Answered" v={`${answered} / ${totalQ}`} />
          <Row k="Primary risk" v={audit.primaryWeakness} />

          <div style={sx.constrainedBox}>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: UI.mute, textTransform: "uppercase" }}>Constrained / month</div>
            <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 30, color: UI.crit, margin: "4px 0" }}>
              {audit.revenue.fMonthly}
            </div>
            <div style={{ fontSize: 11, color: UI.faint }}>Monthly revenue × exposure.</div>
          </div>

          <div style={{ fontSize: 11, color: UI.faint, lineHeight: 1.5 }}>
            Recommendation: <span style={{ color: UI.signal }}>{audit.recommendation.name}</span> · {audit.recommendation.price}
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ---------- REPORT ---------- */
function ReportSurface({ audit, findings, enriching, answered, totalQ, apiKey, responses, onEnrich, onSaveClient, onMakeCase, goSettings }) {
  const ready = answered === totalQ && audit.meta.client;
  const printDoc = () => window.print();

  if (!ready) {
    return <EmptyState title="No completed diagnostic yet"
      body="Finish all OECT questions and name the client on the Diagnose tab. The SNAPSHOT renders here automatically — no copy-paste." />;
  }

  return (
    <div>
      <div style={sx.reportBar} className="hf-noprint">
        <div>
          <div style={sx.eyebrow}>SNAPSHOT · 12-page diagnostic</div>
          <h1 style={{ ...sx.h1, margin: 0 }}>{audit.meta.client}</h1>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button style={sx.ghost} onClick={onEnrich} disabled={enriching}>
            {enriching ? "Enriching…" : apiKey ? "Re-enrich findings" : "Template findings"}
          </button>
          <button style={sx.primary} onClick={printDoc}>Export PDF</button>
        </div>
      </div>

      <div style={sx.statusStrip} className="hf-noprint">
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: findings ? UI.ok : UI.warn }} />
        {findings ? "Findings enriched by Gemini" : "Findings in deterministic template mode (always presentable)"}
      </div>

      <div className="hf-noprint" style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button style={sx.ghost} onClick={() => onSaveClient({
          id: Date.now(), name: audit.meta.client, business: audit.meta.business,
          contained: audit.score.containmentPct / 100, constrained: audit.revenue.monthlyConstrained,
          status: audit.score.status, recommendation: audit.recommendation.name,
          stage: "Audited", createdAt: Date.now(),
          // baseline snapshot for re-diagnostic delta (innovation #1 & #2)
          baseline: {
            meta: audit.meta,
            score: { containmentPct: audit.score.containmentPct },
            perDomain: audit.perDomain.map((d) => ({ name: d.name, pct: d.pct })),
            revenue: { monthlyConstrained: audit.revenue.monthlyConstrained, monthlyRevenue: audit.revenue.monthlyRevenue, hasRevenue: audit.revenue.hasRevenue },
            prediction: audit.prediction,
            responses: responses ? { ...responses } : {}, // for re-diagnostic pre-fill
          },
          rediagnostics: [], // each re-score appended here
        })}>Save to pipeline</button>
        <button style={sx.ghost} onClick={() => onMakeCase({
          id: Date.now(), client: audit.meta.client, before: audit.score.containmentPct,
          headline: `${audit.score.status} — primary risk ${audit.primaryWeakness}`,
          createdAt: Date.now(),
        })}>Capture as case</button>
      </div>

      <AuditDocument audit={audit} findings={findings} pageOrder={PAGE_ORDER} />
    </div>
  );
}

/* ---------- VALIDATE (OVP) — automatic read-out from the audit ----------
   No questions. The verdict is derived from the audit the call
   already produced. One optional fit-note for the human read the
   score can't see (budget, attitude, decisiveness). */
function deriveOVP(audit) {
  // viability floor first: below it, hard decline regardless of exposure
  if (audit.viable === false) {
    return {
      verdict: "Not a Fit", score: audit.score.exposurePct, color: "#8A2B2B",
      note: "Below the viability floor. This operation must stabilise before any engagement — taking it on would not hold, and a failed engagement damages the proof you're building. Decline, explain, leave the door open to re-diagnose.",
      proceed: false,
    };
  }
  const k = audit.tierKey;
  const score = audit.score.exposurePct; // exposure = the case for engaging
  if (k === "critical" || k === "exposed") {
    return {
      verdict: "Confirmed", score, color: UI.crit,
      note: `Exposure substantiated. Prospect qualifies for the ${audit.recommendation.name}.`,
      proceed: true,
    };
  }
  if (k === "contained") {
    return {
      verdict: "Partial", score, color: UI.warn,
      note: `Real but contained exposure. Qualifies for the ${audit.recommendation.name}, not a full Reset. Clarify ${audit.primaryWeakness} before proposing.`,
      proceed: true,
    };
  }
  return {
    verdict: "Not Confirmed", score, color: UI.ok,
    note: `Operation is optimised. A full Reset is not warranted — the honest move is the ${audit.recommendation.name}, or no engagement.`,
    proceed: false,
  };
}

function ValidateSurface({ audit, answered, totalQ, fitNote, setFitNote }) {
  const ready = answered === totalQ && audit.meta.client;
  if (!ready) {
    return <EmptyState title="No audit to validate yet"
      body="OVP now reads the audit automatically — no extra questions. Complete a diagnostic on the Diagnose tab and the qualification verdict appears here." />;
  }
  const ovp = deriveOVP(audit);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={sx.eyebrow}>Operational Validation Protocol · Automatic</div>
      <h1 style={sx.h1}>Qualification verdict</h1>
      <p style={{ color: UI.mute, marginBottom: 20 }}>
        Derived from {audit.meta.client}'s diagnostic. No re-entry — the gate reads the call you just conducted.
      </p>

      <div style={{ ...sx.verdict, borderColor: ovp.color }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 28, color: ovp.color }}>{ovp.verdict}</div>
          <div style={{ fontFamily: UIMONO, fontSize: 12, color: ovp.proceed ? UI.ok : UI.mute }}>
            {ovp.proceed ? "✓ Proceed" : "⃠ Don't proceed to Reset"}
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <Row k="Exposure (case to engage)" v={`${ovp.score}/100`} />
          <Row k="Containment" v={`${audit.score.containmentPct}%`} />
          <Row k="Status" v={audit.score.status} c={audit.score.color} />
          <Row k="Primary weakness" v={audit.primaryWeakness} />
          <Row k="Recommendation" v={`${audit.recommendation.name} · ${audit.recommendation.price}`} />
        </div>
        <div style={{ color: UI.mute, fontSize: 13, marginTop: 14, lineHeight: 1.6 }}>{ovp.note}</div>

        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {audit.perDomain.map((d) => (
              <span key={d.name} style={{ fontFamily: UIMONO, fontSize: 11, padding: "5px 10px", borderRadius: 999, border: `1px solid ${d.color}`, color: d.color }}>
                {d.name} {d.pct}%
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: UI.signal, textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
          Fit note · optional
        </div>
        <div style={{ fontSize: 12, color: UI.faint, marginBottom: 8 }}>
          The score can't see budget, attitude, or whether they own the decision. Capture your read here — qualifying out a bad-fit prospect is sometimes the sharpest call you make early.
        </div>
        <textarea
          style={sx.testimonial}
          placeholder="e.g. Decisive owner, owns the budget, ready to move. / Haggled hard, may be difficult to work with."
          value={fitNote}
          onChange={(e) => setFitNote(e.target.value)}
        />
      </div>
    </div>
  );
}

/* ---------- CLIENTS — pipeline + re-diagnostic proof hub ---------- */
const STAGES = ["Audited", "Proposed", "Reset Active", "Closed"];

/* ---------- DELIVERY — per-client Reset work plan ---------- */
function DeliverySurface({ clients, setClients }) {
  const [activeId, setActiveId] = React.useState(null);
  // clients who've proceeded (have a baseline) are deliverable
  const deliverable = clients.filter((c) => c.baseline);
  const active = deliverable.find((c) => c.id === activeId) || null;

  if (deliverable.length === 0) {
    return (
      <div>
        <div style={sx.eyebrow}>Delivery · Reset execution</div>
        <h1 style={sx.h1}>Delivery</h1>
        <EmptyState title="No clients in delivery yet" body="When a client proceeds and you save their audit to the pipeline, their Reset work plan appears here — exactly what to build, in priority order." />
      </div>
    );
  }

  if (!active) {
    return (
      <div>
        <div style={sx.eyebrow}>Delivery · Reset execution</div>
        <h1 style={sx.h1}>Delivery</h1>
        <p style={{ color: UI.mute, marginBottom: 20 }}>Pick a client to see exactly what to build to contain them.</p>
        {deliverable.map((c) => {
          const weak = (c.baseline.perDomain || []).filter((d) => d.pct < 60).length;
          const prog = deliveryProgress(c);
          return (
            <div key={c.id} style={{ ...sx.card, cursor: "pointer" }} onClick={() => setActiveId(c.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: UI.mute }}>{c.baseline.score.containmentPct}% contained · {weak} domain{weak !== 1 ? "s" : ""} to fix</div>
                </div>
                <div style={{ fontFamily: UIMONO, fontSize: 13, color: prog.pct === 100 ? UI.ok : UI.signal }}>{prog.done}/{prog.total}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // active client work plan — weak domains, priority order (worst first)
  const weakDomains = [...(active.baseline.perDomain || [])]
    .filter((d) => d.pct < 60)
    .sort((a, b) => a.pct - b.pct);
  const doneSet = new Set(active.delivery?.done || []);

  const toggle = (moveId) => {
    setClients((p) => p.map((c) => {
      if (c.id !== active.id) return c;
      const done = new Set(c.delivery?.done || []);
      done.has(moveId) ? done.delete(moveId) : done.add(moveId);
      return { ...c, delivery: { ...(c.delivery || {}), done: [...done] } };
    }));
  };

  const prog = deliveryProgress(active);

  return (
    <div>
      <button style={{ ...sx.tiny, marginBottom: 12 }} onClick={() => setActiveId(null)}>← All clients</button>
      <div style={sx.eyebrow}>Reset work plan</div>
      <h1 style={{ ...sx.h1, marginBottom: 8 }}>{active.name}</h1>
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: UI.mute }}>Baseline {active.baseline.score.containmentPct}% · fixing worst domains first</span>
        <span style={{ fontFamily: UIMONO, fontSize: 13, color: prog.pct === 100 ? UI.ok : UI.signal }}>{prog.done}/{prog.total} built · {prog.pct}%</span>
      </div>
      <div style={{ height: 5, background: UI.surface2, borderRadius: 3, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ width: `${prog.pct}%`, height: "100%", background: prog.pct === 100 ? UI.ok : UI.signal }} />
      </div>

      {weakDomains.length === 0 && (
        <EmptyState title="Nothing below the containment line" body="Every domain is already at 60%+. This client doesn't need a Reset build — consider the Retainer instead." />
      )}

      {weakDomains.map((d, i) => {
        const moves = PLAYBOOK[d.name] || [];
        return (
          <div key={d.name} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 22 }}>{i + 1}. {d.name}</span>
              <span style={{ fontFamily: UIMONO, fontSize: 12, color: d.pct < 40 ? UI.crit : UI.warn }}>{d.pct}% — {d.pct < 40 ? "CRITICAL" : "EXPOSED"}</span>
            </div>
            {moves.map((mv) => {
              const done = doneSet.has(mv.id);
              return (
                <div key={mv.id} style={{ ...sx.card, borderColor: done ? UI.ok : UI.line, opacity: done ? 0.7 : 1 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <button onClick={() => toggle(mv.id)} style={{ marginTop: 2, width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${done ? UI.ok : UI.faint}`, background: done ? UI.ok : "transparent", color: "#fff", cursor: "pointer", flexShrink: 0, fontSize: 13, lineHeight: 1 }}>{done ? "✓" : ""}</button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 600, fontSize: 15, textDecoration: done ? "line-through" : "none" }}>{mv.title}</span>
                        {mv.flagship && <span style={{ fontFamily: UIMONO, fontSize: 9, letterSpacing: 1, color: UI.signal, border: `1px solid ${UI.signal}`, borderRadius: 4, padding: "2px 6px" }}>HIGHEST LEVERAGE</span>}
                        <span style={{ fontFamily: UIMONO, fontSize: 10, color: UI.faint }}>{mv.effort === "L" ? "larger build" : mv.effort === "M" ? "medium" : "quick"}</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: UI.mute, margin: "4px 0 10px" }}>{mv.build}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 10 }}>
                        {mv.steps.map((s, si) => (
                          <div key={si} style={{ display: "flex", gap: 8, fontSize: 12.5 }}>
                            <span style={{ color: UI.signal, fontFamily: UIMONO, fontSize: 11 }}>{si + 1}</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 11.5 }}>
                        <span style={{ color: UI.faint }}>Artifact: <span style={{ color: UI.text }}>{mv.artifact}</span></span>
                        <span style={{ color: UI.faint }}>Measure: <span style={{ color: UI.ok }}>{mv.measure}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {weakDomains.length > 0 && (
        <div style={{ ...sx.statusStrip }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: prog.pct === 100 ? UI.ok : UI.warn }} />
          {prog.pct === 100
            ? "All build moves complete. Hand over the artifacts, then re-diagnose to prove the lift."
            : "What the client receives: the built systems (their digital product), the audit, and your call. Nothing else."}
        </div>
      )}
    </div>
  );
}

// progress across weak-domain moves for a client
function deliveryProgress(c) {
  const weak = (c.baseline?.perDomain || []).filter((d) => d.pct < 60);
  let total = 0;
  weak.forEach((d) => { total += (PLAYBOOK[d.name] || []).length; });
  const done = (c.delivery?.done || []).length;
  return { done: Math.min(done, total), total, pct: total ? Math.round(Math.min(done, total) / total * 100) : 0 };
}

/* ---------- CASES ---------- */
// Latest re-diagnostic score for a client (the "after"), or null if none yet
function latestScore(c) {
  const rd = c.rediagnostics || [];
  if (rd.length) return rd[rd.length - 1].containmentPct;
  return null;
}
function baselineScore(c) {
  return c.baseline?.score?.containmentPct ?? null;
}

function MetricsSurface({ clients, setClients, onStartReDx, cases, setCases }) {
  const [expanded, setExpanded] = React.useState(null);

  // ---- aggregate performance, computed from real client data ----
  const withBaseline = clients.filter((c) => baselineScore(c) != null);
  const delivered = withBaseline.filter((c) => latestScore(c) != null); // has a re-diagnostic = Reset proven
  const lifts = delivered.map((c) => latestScore(c) - baselineScore(c)).filter((n) => !isNaN(n));
  const avgLift = lifts.length ? Math.round(lifts.reduce((a, b) => a + b, 0) / lifts.length) : null;
  const activeClients = withBaseline.length;

  const RETAINER = 300, SETUP = 2500;
  const mrr = delivered.length * RETAINER;
  const setupBanked = delivered.length * SETUP;

  const advance = (id) => setClients((p) => p.map((c) => c.id !== id ? c : { ...c, stage: STAGES[Math.min(STAGES.indexOf(c.stage) + 1, STAGES.length - 1)] }));
  const remove = (id) => setClients((p) => p.filter((c) => c.id !== id));

  const upd = (id, patch) => setCases((p) => p.map((c) => c.id === id ? { ...c, ...patch } : c));
  const rm = (id) => setCases((p) => p.filter((c) => c.id !== id));

  return (
    <div>
      <div style={sx.eyebrow}>Performance · pipeline · proof</div>
      <h1 style={sx.h1}>Metrics</h1>

      {/* ---- aggregate strip ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <MetricCard label="Active clients" value={activeClients} sub="with a locked baseline" color={UI.text} />
        <MetricCard label="Resets proven" value={delivered.length} sub="with a re-diagnostic on file" color={UI.signal} />
        <MetricCard label="Avg OII lift" value={avgLift == null ? "—" : `+${avgLift}`} sub={avgLift == null ? "no re-diagnostics yet" : "points, baseline → latest"} color={avgLift == null ? UI.mute : UI.ok} />
        <MetricCard label="Recurring / mo" value={`£${mrr.toLocaleString()}`} sub={`${delivered.length} × £${RETAINER} retainer`} color={UI.ok} />
      </div>
      <div style={{ ...sx.card, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: UI.faint, textTransform: "uppercase" }}>Setup fees banked</div>
          <div style={{ fontSize: 12, color: UI.mute, marginTop: 3 }}>{delivered.length} Reset{delivered.length !== 1 ? "s" : ""} delivered × £{SETUP.toLocaleString()}</div>
        </div>
        <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 30, color: UI.text }}>£{setupBanked.toLocaleString()}</div>
      </div>

      {/* ---- CLIENTS (merged in) ---- */}
      <div style={{ ...sx.eyebrow, marginBottom: 10 }}>Clients · pipeline &amp; re-diagnostics</div>
      {clients.length === 0 ? (
        <EmptyState title="Pipeline empty" body="Completed SNAPSHOTs save here with a baseline. Re-diagnose later and the delta becomes your proof of work." />
      ) : clients.map((c) => {
        const last = c.rediagnostics?.[c.rediagnostics.length - 1];
        const isOpen = expanded === c.id;
        return (
          <div key={c.id} style={sx.card}>
            <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : c.id)}>
              <div>
                <div style={{ fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: UI.mute }}>
                  {Math.round((c.contained || 0) * 100)}% contained · {c.recommendation}
                  {last?.delta && <span style={{ color: last.delta.containmentChange >= 0 ? UI.ok : UI.crit }}>  ·  {last.delta.fContainmentChange} since baseline</span>}
                </div>
              </div>
              <div style={{ fontSize: 11, letterSpacing: 1, color: c.stage === "Closed" ? UI.ok : UI.signal }}>{c.stage}</div>
            </div>

            {isOpen && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${UI.line}`, paddingTop: 14 }}>
                {c.baseline && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: UI.faint, textTransform: "uppercase", marginBottom: 6 }}>Baseline · {c.baseline.meta.date}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {c.baseline.perDomain.map((d) => (
                        <span key={d.name} style={{ fontFamily: UIMONO, fontSize: 11, padding: "4px 9px", borderRadius: 999, border: `1px solid ${UI.line}`, color: UI.mute }}>
                          {d.name} {d.pct}%
                        </span>
                      ))}
                    </div>
                    {c.baseline.prediction && (
                      <div style={{ fontSize: 12, color: UI.mute, marginTop: 10, fontStyle: "italic", lineHeight: 1.5 }}>
                        Staked: "{c.baseline.prediction.claim}"
                      </div>
                    )}
                  </div>
                )}

                {last?.delta && (
                  <div style={{ background: UI.surface2, border: `1px solid ${UI.line}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: UI.signal, textTransform: "uppercase", marginBottom: 8 }}>Re-diagnostic · {last.date}</div>
                    <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 18, color: last.delta.containmentChange >= 0 ? UI.ok : UI.crit, marginBottom: 8 }}>
                      {last.delta.headline}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {last.delta.domainDeltas.map((d) => (
                        <div key={d.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                          <span style={{ color: UI.mute }}>{d.name}</span>
                          <span style={{ fontFamily: UIMONO }}>
                            {d.from}% → {d.to}% <span style={{ color: d.change >= 0 ? UI.ok : UI.crit }}>({d.change >= 0 ? "+" : ""}{d.change})</span>
                          </span>
                        </div>
                      ))}
                    </div>
                    {last.delta.predictionVerdict !== "pending" && (
                      <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${UI.line}`, fontSize: 12 }}>
                        <span style={{ color: UI.faint }}>Prediction: </span>
                        <span style={{ color: last.delta.predictionVerdict === "averted" ? UI.ok : UI.warn, fontWeight: 600 }}>
                          {last.delta.predictionVerdict === "averted" ? "Averted — client acted, exposure contained" : "Held — the warning proved accurate"}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={{ ...sx.tiny, ...(c.baseline ? { borderColor: UI.signal, color: UI.signal } : sx.dim) }} onClick={() => onStartReDx(c)} disabled={!c.baseline}>
                    Re-diagnose ↻
                  </button>
                  <button style={sx.tiny} onClick={() => advance(c.id)}>Advance →</button>
                  <button style={{ ...sx.tiny, color: UI.crit }} onClick={() => remove(c.id)}>Remove</button>
                </div>
                {!c.baseline && (
                  <div style={{ fontSize: 11, color: UI.faint, marginTop: 8 }}>No baseline stored for this client (saved before re-diagnostics existed).</div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* ---- CASES sub-section ---- */}
      <div style={{ ...sx.eyebrow, marginTop: 28, marginBottom: 10 }}>Cases · proof &amp; content</div>
      {cases.length === 0 ? (
        <EmptyState title="No cases captured" body="From a generated SNAPSHOT, tap 'Capture as case' to file it for testimonials and marketing content." />
      ) : cases.map((c) => (
        <div key={c.id} style={sx.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{c.client}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: UI.crit }}>{c.before}%</span><span style={{ color: UI.mute }}>→</span>
              <input style={sx.afterInput} type="number" placeholder="after" value={c.after ?? ""} onChange={(e) => upd(c.id, { after: e.target.value })} />
              <span style={{ color: UI.ok }}>%</span>
            </div>
          </div>
          <div style={{ color: UI.mute, fontSize: 13, marginBottom: 10 }}>{c.headline}</div>
          <textarea style={sx.testimonial} placeholder="Client testimonial / pull-quote…" value={c.quote ?? ""} onChange={(e) => upd(c.id, { quote: e.target.value })} />
          <button style={{ ...sx.tiny, color: UI.crit, marginTop: 8 }} onClick={() => rm(c.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div style={sx.card}>
      <div style={{ fontSize: 10, letterSpacing: 1.5, color: UI.faint, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 32, lineHeight: 1, color }}>{value}</div>
      <div style={{ fontSize: 11, color: UI.mute, marginTop: 6 }}>{sub}</div>
    </div>
  );
}

/* ---------- SETTINGS ---------- */
function SettingsSurface({ apiKey, setApiKey, back }) {
  const [val, setVal] = React.useState(apiKey);
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={sx.eyebrow}>Configuration</div>
      <h1 style={sx.h1}>Settings</h1>
      <p style={{ color: UI.mute, marginBottom: 20 }}>
        The audit is fully functional without a key — findings use deterministic templates. Add a Google Gemini key to enrich the findings prose. Stored on this device only.
      </p>
      <Inp label="Gemini API key" value={val} onChange={setVal} ph="AIza…" mono />
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 12 }}>
        <button style={sx.primary} onClick={() => { setApiKey(val.trim()); back(); }}>Save key</button>
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: UI.signal, fontSize: 12, textDecoration: "none" }}>Get a key →</a>
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */
// Hannsfree mark — containment-bracket H with signal pulse. Ownable.
function Logo({ size = 30, framed = true }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 180 180" style={{ display: "block" }} aria-label="Hannsfree">
      <defs>
        <linearGradient id="hfg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={UI.royalLit} />
          <stop offset="1" stopColor={UI.royal} />
        </linearGradient>
      </defs>
      {framed && <>
        <rect width="180" height="180" rx="40" fill={UI.surface} />
        <rect x="0.75" y="0.75" width="178.5" height="178.5" rx="39.5" fill="none" stroke={UI.line} strokeWidth="1.5" />
      </>}
      <g stroke={UI.lineGlow} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M44 56 L44 44 L56 44" /><path d="M124 44 L136 44 L136 56" />
        <path d="M136 124 L136 136 L124 136" /><path d="M56 136 L44 136 L44 124" />
      </g>
      <g fill="url(#hfg)">
        <rect x="62" y="58" width="13" height="64" rx="6.5" />
        <rect x="105" y="58" width="13" height="64" rx="6.5" />
      </g>
      <path d="M62 90 L78 90 L84 78 L90 102 L96 84 L102 90 L118 90" fill="none" stroke={UI.signal} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// animated count-up for scores / figures (Vestige energy)
function CountUp({ value, duration = 650, suffix = "", prefix = "", format }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(0);
  React.useEffect(() => {
    const from = ref.current;
    const to = Number(value) || 0;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      const cur = from + (to - from) * eased;
      setN(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
      else ref.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  const display = format ? format(n) : Math.round(n).toLocaleString();
  return <>{prefix}{display}{suffix}</>;
}

function Inp({ label, value, onChange, ph, mono }) {
  return (
    <label style={{ flex: 1, minWidth: 180 }}>
      <span style={{ display: "block", fontSize: 11, color: UI.mute, marginBottom: 6 }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={ph}
        style={{ width: "100%", background: UI.surface, border: `1px solid ${UI.line}`, color: UI.text, fontFamily: mono ? UIMONO : UIMONO, fontSize: 14, padding: "11px 13px", borderRadius: 8 }} />
    </label>
  );
}
const Row = ({ k, v, c }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${UI.line}` }}>
    <span style={{ color: UI.mute, fontSize: 12 }}>{k}</span>
    <span style={{ fontWeight: 600, color: c || UI.text }}>{v}</span>
  </div>
);
const Metric = ({ label, value, c }) => (
  <div style={{ border: `1px solid ${UI.line}`, borderRadius: 12, padding: 16, background: UI.surface }}>
    <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 26, color: c || UI.text }}>{value}</div>
    <div style={{ fontSize: 11, color: UI.mute, marginTop: 2 }}>{label}</div>
  </div>
);
const EmptyState = ({ title, body }) => (
  <div style={{ textAlign: "center", padding: "60px 20px", border: `1px dashed ${UI.line}`, borderRadius: 14 }}>
    <div style={{ fontSize: 16, marginBottom: 6 }}>{title}</div>
    <div style={{ color: UI.mute, fontSize: 13, maxWidth: 380, margin: "0 auto" }}>{body}</div>
  </div>
);

const APP_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html, body {
    margin: 0;
    -webkit-overflow-scrolling: touch;        /* momentum scroll on iOS */
    overscroll-behavior-y: none;               /* kill the rubber-band white flash */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  /* tappable elements: no grey/white flash, no text selection on tap, snappy */
  button, a, [role="button"], .hf-tap {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;                /* removes 300ms delay + double-tap zoom */
  }
  /* inputs still need selection + caret */
  input, textarea { user-select: text; -webkit-user-select: text; }
  input:focus, textarea:focus { outline: 2px solid ${UI.royalLit}; outline-offset: 1px; }
  input::placeholder, textarea::placeholder { color: ${UI.faint}; }
  button { transition: transform .18s cubic-bezier(.16,1,.3,1), box-shadow .2s, border-color .2s, background .2s, opacity .2s; }
  button:not(:disabled):active { transform: scale(.985); }
  button:focus { outline: none; }
  button:focus-visible { outline: 2px solid ${UI.royalLit}; outline-offset: 2px; }  /* keyboard users still get a ring */

  /* horizontal nav: smooth momentum, hide the scrollbar so it never looks clunky */
  .hf-nav-scroll {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
  }
  .hf-nav-scroll::-webkit-scrollbar { display: none; height: 0; }

  /* Vestige motion */
  @keyframes hfRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes hfFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes hfScan { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
  .hf-rise { animation: hfRise .5s cubic-bezier(.16,1,.3,1) both; }
  .hf-fade { animation: hfFade .4s ease both; }
  .hf-tab-panel { animation: hfRise .42s cubic-bezier(.16,1,.3,1) both; }
  .hf-stagger > * { animation: hfRise .5s cubic-bezier(.16,1,.3,1) both; }
  .hf-stagger > *:nth-child(1){animation-delay:.02s}
  .hf-stagger > *:nth-child(2){animation-delay:.06s}
  .hf-stagger > *:nth-child(3){animation-delay:.10s}
  .hf-stagger > *:nth-child(4){animation-delay:.14s}
  .hf-stagger > *:nth-child(5){animation-delay:.18s}
  /* forensic hairline + spring buttons */
  .hf-btn { transition: transform .18s cubic-bezier(.16,1,.3,1), box-shadow .2s, border-color .2s, background .2s; }
  .hf-btn:hover { transform: translateY(-1px); }
  .hf-btn:active { transform: translateY(0) scale(.98); }
  .hf-card { transition: border-color .2s, transform .2s cubic-bezier(.16,1,.3,1); }
  /* scanline texture on the cost reveal */
  .hf-scan { position: relative; overflow: hidden; }
  .hf-scan::after { content:""; position:absolute; left:0; right:0; height:40%; top:0; background: linear-gradient(${UI.royalLit}11, transparent); animation: hfScan 3.2s linear infinite; pointer-events:none; }

  @media (max-width: 860px) { .hf-grid { grid-template-columns: 1fr !important; } .hf-rail > div { position: static !important; } }
  @media (prefers-reduced-motion: reduce) {
    *, .hf-rise, .hf-fade, .hf-tab-panel, .hf-stagger > * { animation: none !important; transition: none !important; }
    .hf-scan::after { display: none; }
  }
  @media print {
    .hf-noprint, header, nav { display: none !important; }
    body { background: #fff; }
    .hf-audit-doc { background: #fff !important; padding: 0 !important; }
    .hf-page { box-shadow: none !important; margin: 0 !important; page-break-after: always; break-after: page; }
    .hf-tab-panel, .hf-rise, .hf-stagger > * { animation: none !important; }
  }
`;

const sx = {
  head: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: `1px solid ${UI.line}`, position: "sticky", top: 0, background: UI.void, zIndex: 10 },
  keyBadge: { display: "flex", alignItems: "center", gap: 8, background: UI.surface, border: `1px solid ${UI.line}`, color: UI.mute, fontFamily: UIMONO, fontSize: 11, padding: "7px 12px", borderRadius: 20, cursor: "pointer" },
  nav: { display: "flex", gap: 2, padding: "0 18px", borderBottom: `1px solid ${UI.line}`, overflowX: "auto", position: "sticky", top: 59, background: UI.void, zIndex: 9 },
  navBtn: { background: "none", border: "none", borderBottom: "2px solid transparent", color: UI.mute, fontFamily: UIMONO, cursor: "pointer", padding: "13px 15px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2, whiteSpace: "nowrap" },
  navOn: { color: UI.text, borderBottomColor: UI.royalLit },
  grid: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" },
  eyebrow: { fontSize: 10, letterSpacing: 2.5, color: UI.signal, textTransform: "uppercase", marginBottom: 8 },
  h1: { fontFamily: "'Newsreader', Georgia, serif", fontSize: 38, fontWeight: 500, margin: "0 0 22px", lineHeight: 1.05 },
  domain: { border: `1px solid ${UI.line}`, borderRadius: 12, padding: 18, marginBottom: 16, background: UI.surface },
  domainHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${UI.line}` },
  ans: { background: UI.surface2, border: `1px solid ${UI.line}`, color: UI.mute, fontFamily: UIMONO, fontSize: 11.5, padding: "7px 11px", borderRadius: 7, cursor: "pointer" },
  ansOn: { background: UI.royal, borderColor: UI.royalLit, color: "#fff" },
  ansFlag: { background: "#3A2A10", borderColor: UI.warn, color: UI.warn },
  statusPill: { display: "inline-block", border: "1px solid", borderRadius: 20, padding: "4px 12px", fontSize: 11, letterSpacing: 1, margin: "10px 0 18px" },
  constrainedBox: { background: UI.surface, border: `1px solid ${UI.line}`, borderRadius: 12, padding: 16, margin: "18px 0" },
  primary: { width: "100%", background: UI.royal, border: `1px solid ${UI.royalLit}`, color: "#fff", fontFamily: UIMONO, fontWeight: 600, fontSize: 13, padding: "13px", borderRadius: 9, cursor: "pointer", boxShadow: `0 0 24px ${UI.royal}44` },
  dim: { opacity: 0.45, boxShadow: "none", cursor: "default" },
  ghost: { background: "none", border: `1px solid ${UI.line}`, color: UI.text, fontFamily: UIMONO, fontSize: 12, padding: "10px 14px", borderRadius: 8, cursor: "pointer" },
  reportBar: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 16 },
  statusStrip: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: UI.mute, padding: "10px 14px", border: `1px solid ${UI.line}`, borderRadius: 8, marginBottom: 16 },
  verdict: { border: "2px solid", borderRadius: 14, padding: 22, marginTop: 24, background: UI.surface },
  card: { border: `1px solid ${UI.line}`, borderRadius: 12, padding: 16, background: UI.surface, marginBottom: 12 },
  tiny: { background: "none", border: `1px solid ${UI.line}`, color: UI.mute, fontFamily: UIMONO, fontSize: 11, padding: "6px 10px", borderRadius: 6, cursor: "pointer" },
  afterInput: { width: 56, background: UI.surface2, border: `1px solid ${UI.line}`, color: UI.ok, fontFamily: UIMONO, padding: "4px 6px", borderRadius: 6, fontSize: 13 },
  testimonial: { width: "100%", minHeight: 60, background: UI.surface2, border: `1px solid ${UI.line}`, color: UI.text, fontFamily: UIMONO, fontSize: 13, padding: 10, borderRadius: 8, resize: "vertical" },
  beatRail: { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" },
  beat: { flex: 1, minWidth: 110, background: UI.surface, border: `1px solid ${UI.line}`, color: UI.mute, fontFamily: UIMONO, cursor: "pointer", padding: "12px 14px", borderRadius: 10, display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" },
  beatOn: { background: UI.royal, borderColor: UI.royalLit, color: "#fff" },
  beatDone: { borderColor: UI.ok, color: UI.text },
  scriptLabel: { fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: UI.signal, marginBottom: 10, fontWeight: 600 },
  scriptLine: { fontSize: 15, lineHeight: 1.6, color: UI.text, marginBottom: 12, paddingLeft: 14, borderLeft: `2px solid ${UI.royal}` },
  cue: { fontSize: 11.5, color: UI.faint, lineHeight: 1.4, fontStyle: "italic" },
  listenNudge: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: UI.mute, padding: "10px 14px", border: `1px solid ${UI.line}`, borderRadius: 8, marginBottom: 16, background: UI.surface },
  costChip: { fontFamily: UIMONO, fontSize: 12, color: UI.text, background: UI.surface, border: `1px solid ${UI.line}`, borderRadius: 999, padding: "8px 16px" },
};




export default HannsfreeOps;
