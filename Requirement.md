# The Lifelong Profile — IEP Companion

Business Requirements Document (BRD) — MVP
*FSI Hack4Autism 2026 — Use Case #2: AI-Assisted Program Development & Summarization*

---

## 1. Product Vision & Value Proposition

An AI companion that ingests a child's history of autism-related documents and helps families **understand, prepare for, and get more from the IEP process** — built strengths-first, with every claim traceable to a source, and designed to help people make better decisions rather than to replace them.

The objective is to build a high-fidelity MVP for an AI-driven advocacy tool that **balances the power dynamic between families and school districts** during the annual IEP process. The solution transforms unstructured historical behavioral data into clear, evidence-backed advocacy positions, ensuring parents never walk into a legal negotiation unprepared.

IEP = Individualized Education Program. It is a legally binding plan a school must produce each year for a child with special needs. It is negotiated in a single annual meeting, it is dense and jargon-heavy, and parents often do not see the draft before they walk in.

---

## 2. The Problem (from the parents on our team)

Two parents on the team live this process every year. The problem they described:

- **One short meeting decides the year.** All the data and opinions from parents, teachers, aides and behavior analysts get compressed into a single ~2-hour meeting. There is little room for oversight.
- **Parents go in blind.** The draft IEP is usually not shared in advance — families first see it across the table at the meeting itself.
- **It is legally binding and often contentious.** Once agreed, the school must follow it; revising or contesting it has legal consequences. Families sometimes bring advocates or lawyers.
- **It is hard to understand.** IEPs read like legal documents. Without years of experience, the terminology does not make sense to most parents.
- **A huge amount of useful data is lost.** Day-to-day session notes from RBTs/technicians, psychoeducational evaluations, school evaluations, even email threads — most of it never makes it into the plan, even though it could really help.

> *"When you bring a new provider on, you can't have them read 300 pages. They need to know: who is this child, and how do we help?"*

---

## 3. Core Functional Requirements

### 3.1 Multi-Source History Ingestion

- **Objective:** Centralize fragmented historical data to establish a single source of truth for the child's development.
- **Requirement:** The system must accept multiple raw input formats, including multi-page medical/psychological evaluation PDFs, digital text logs (RBT/technician daily notes), historical IEP documents, behavioral spreadsheets, school reports, and free-form text. Any file type tied to an individual's history is valid input.
- **Business Value:** Eliminates the administrative burden on parents and incoming providers who currently manually review hundreds of pages of unorganized records.

### 3.2 Chronological "Strengths-First" Profile Generation

- **Objective:** Synthesize raw medical and behavioral history into an actionable, asset-based human context.
- **Requirement:** The platform must automatically generate a living profile that prioritizes the student's documented strengths, effective accommodations, and successful learning styles over an aggregate timeline. This profile becomes the context the AI reasons against when supporting IEP development and family advocacy.
- **Business Value:** Reframes the narrative from a purely deficit-based view (common in legal school documentation) to a collaborative, capability-driven strategy.

### 3.3 IEP Automated Decoding & Translation

- **Objective:** Demystify the legal and educational jargon used in draft school documentation.
- **Requirement:** The tool must translate complex administrative and educational acronyms (e.g., FAPE, LRE, BIP) from a newly uploaded draft IEP into accessible, plain-English definitions contextually mapped to the child's profile.
- **Business Value:** Empowers parents to understand exactly what services are being offered or altered without requiring an expensive legal advocate.

### 3.4 Traceable Gap & Discrepancy Analysis

- **Objective:** Protect user trust by ensuring every AI claim is completely verifiable.
- **Requirement:** The system must cross-reference the proposed draft IEP against the historical corpus — with particular weight on the most recent formalized IEP and the parents' stated priority concerns — to flag omissions, service reductions, or contradictory behavioral claims. Every single insight must display a clickable source citation linking back to the exact origin document and page number. Output should include concrete, evidence-backed suggestions the family can bring into the negotiation meeting.
- **Business Value:** Guarantees absolute reliability, giving parents unassailable evidence to present to school boards or legal entities during disputes.

### 3.5 First-Time IEP Strategic Walkthrough

- **Objective:** Provide a clear entry point for families navigating the system for the first time.
- **Requirement:** The system must feature an interactive framework using curated, exemplary sample profiles — drawn from the same school district and from children with similar behavioral characteristics — to show new families what an optimized, legally sound IEP looks like and to walk them through building or requesting their child's first IEP document alongside the school.
- **Business Value:** Lowers the barrier to entry, expanding the addressable user base to families who do not yet possess an extensive historical record.

### 3.6 Multi-Year IEP Comparison Framework

- **Objective:** Surface patterns across multiple IEP years that would otherwise be invisible in a single-year reading — including stagnation, quiet service reductions, and ignored parent concerns.
- **Requirement:** When two or more historical IEPs are available, the platform must perform a structured year-over-year comparison across six analytical dimensions (see Section 3.6.1–3.6.6 below). Each dimension produces its own findings with red-flag detection, plain-language explanations, and clickable citations to the exact IEP year, section, and page being referenced. Findings must be aggregated into a single "Meeting Script" view that the family can bring to the IEP meeting.
- **Business Value:** Equips families to identify multi-year patterns of procedural compliance without substantive progress — the most common and least visible failure mode in special-education programs.

#### 3.6.1 IEP Goal Trajectory — Progress, Stagnation, or Recycling

Compare goals across every IEP year and ask:

- Are goals from prior years still appearing with the same or similar language?
- Have goals been met and replaced with more ambitious ones?
- Have goals been modified downward without explanation?
- Are goals disappearing without a documented mastery date?

Recycled goals are one of the most common signs of a program managing a student rather than advancing one. When the same goal appears across multiple IEPs with minor wording changes it is evidence that meaningful progress has not been made — and that no one has been held accountable for that absence.

**Red flags the system must detect:**
- Same goal, same criterion, same baseline across multiple years.
- Criterion reduced without explanation.
- Goal language becoming more vague over time — specific numbers replaced with phrases like "as appropriate" or "with support."

#### 3.6.2 Present Levels — The Baseline Narrative

The Present Levels section is the evidentiary foundation of the entire IEP. Every goal should flow directly from it. The system must compare Present Levels across years and ask:

- Does the current section describe more advanced functioning than the prior year?
- Are the same deficits being described in the same language year after year?
- Has the most recent three-year evaluation been meaningfully integrated?
- Are parent/home observations reflected?

**Red flags the system must detect:**
- Copy-paste Present Levels nearly identical across years.
- Exclusive focus on deficits with no acknowledgment of growth.
- Parent observations absent.
- New evaluation data not integrated.

#### 3.6.3 Accommodations — Expansion or Contraction

The system must track how the accommodations section evolves across IEPs.

**Red flags the system must detect:**
- Accommodations removed without explanation.
- Same accommodations year after year with no evolution, despite documented growth or new needs.

#### 3.6.4 Related Services — Hours, Frequency, and Specificity

Compare speech, OT, PT, and counseling services across IEPs and ask whether changes correspond to documented progress or documented need. Service reductions are one of the most common ways programs quietly reduce commitment to a student without formally acknowledging it.

**Red flags the system must detect:**
- Service hours reduced without documented mastery of prior goals.
- Individual service converted to group without clinical justification.
- Direct service converted to consultative.
- Frequency reduced without explanation.

#### 3.6.5 Parent Concerns — Acknowledged or Ignored *(MOST IMPORTANT)*

This is one of the most revealing comparisons the system can produce. A concern that appears in three consecutive IEPs and is never reflected in goals or accommodations is a documented pattern of procedural compliance without substantive response.

The system must:

- Extract parent concerns from each historical IEP.
- Highlight the goals and accommodations that are directly related to addressing each concern.
- Show whether the student's progress on each concern is reflected in subsequent goal-setting.
- Surface concerns that repeat across years without being meaningfully addressed.

**Red flags the system must detect:**
- Same concerns appearing year after year without being addressed.
- Prior concerns not reflected in subsequent goals or accommodations.

**Meeting question the system should pre-draft for the family:** "Looking at our concerns from prior IEPs — can the team show us where each was addressed in the subsequent program? And can we confirm that our current concerns will be specifically reflected in this year's goals and accommodations rather than simply noted?"

#### 3.6.6 Behavioral Data — The Quantitative Trend

Behavioral data across IEP years is the most objective evidence available of whether the program is working. The system must extract and chart behavioral frequency, duration, or incident counts across IEPs where available, and flag the absence of such data as a finding in its own right.

**Red flags the system must detect:**
- No behavioral data in the IEP — absence of data is itself significant.
- Behavioral frequency flat or increasing across years despite intervention.

---

## 4. Recommended Workflow & Architecture

```text
PDF / Document Upload
        ↓
Google Cloud Storage
        ↓
Document AI — extracts text from scanned & mixed-format PDFs
        ↓
Gemini — summarizes history
        ↓
Gemini — generates strengths, needs, timeline, recommendations
        ↓
Gemini — multi-year IEP comparison (goals, present levels,
          accommodations, services, parent concerns, behavioral data)
        ↓
Cloud Run — displays dashboard (incl. split-screen + Meeting Script)
```

### Architecture Notes

- **Document Upload:** Families and providers submit existing evaluations, IEPs, session notes, and reports without changing their current workflow.
- **Google Cloud Storage:** Acts as durable, scalable document storage and a clean handoff point for downstream processing.
- **Document AI:** Converts scanned and mixed-format PDFs into structured text so key educational and clinical details are machine-readable.
- **Gemini (history summary):** Produces a concise, chronological view of the child's background to reduce prep time for IEP conversations.
- **Gemini (profile generation):** Turns extracted evidence into actionable, strengths-first planning inputs aligned with IEP preparation — including strengths, needs, timeline, and meeting recommendations.
- **Gemini (multi-year comparison):** Runs the six-dimension comparison defined in Section 3.6 across all available historical IEPs, emitting findings with citations and red-flag classifications.
- **Cloud Run dashboard:** Hosts a lightweight, secure web dashboard that presents outputs to families and team members in one place, including the split-screen IEP comparison workspace and the aggregated Meeting Script view.

---

## 5. Non-Functional Requirements

- **Privacy & compliance:** All child and family data must be encrypted in transit and at rest. Access must follow least-privilege principles and support FERPA-aligned handling practices.
- **Consent & access control:** Only authorized users (parent/guardian and approved providers) can view a profile. The system must support role-based access and clear permission boundaries.
- **Traceability:** Every generated summary, strength, need, recommendation, and comparison finding must include source references to original documents and page numbers — including the specific IEP year and section being cited in multi-year comparisons.
- **Explainability:** AI outputs must be presented in plain language with confidence signals or uncertainty notes where applicable. Red-flag classifications must explain *why* a pattern was flagged, not just *that* it was.
- **Latency targets:**
  - Document ingestion to extracted text: under 2 minutes for typical PDFs.
  - Profile summary generation after extraction: under 30 seconds.
  - Multi-year comparison across all six dimensions: under 60 seconds for up to five historical IEPs.
  - Dashboard page load: under 3 seconds on standard broadband.
- **Reliability:** Core workflow availability target of 99.9% monthly uptime for upload, processing, and dashboard access.
- **Scalability:** The platform must support concurrent uploads and processing jobs without significant degradation in user-facing response times.
- **Observability & audit:** Maintain audit logs for uploads, processing events, model output generation, and user access actions.
- **Data retention & deletion:** Define configurable retention windows and support secure deletion on request.
- **Human-in-the-loop safety:** The system provides decision support only; final educational and clinical decisions remain with families and professionals.

---

## 6. Scope Boundaries (Hackathon Constraints)

### In-Scope for MVP

- Processing a single, comprehensive mock-student document history pipeline including at least three historical IEPs to demonstrate multi-year comparison.
- Displaying the split-screen comparison workspace (Draft IEP text vs. AI-generated insights).
- The six-dimension multi-year comparison from Section 3.6, rendered in the dashboard with red-flag highlights.
- Clickable data provenance (source document names, IEP year, section, and page references).
- A consolidated "Meeting Script" output drawn from all comparison dimensions.

### Out-of-Scope for MVP

- HIPAA-compliant production user authentication or user account data isolation.
- Real-time audio recording, transcription, or live translation of active IEP meetings.
- Live scraping engines for multi-state or multi-district legal databases.

---

## 7. MVP Success Criteria

- **Accuracy & Trust:** Zero hallucinated data points. Every discrepancy or red flag must map directly to a verified uploaded source file, with the specific IEP year and page cited.
- **Time-to-Insight:** A user must be able to upload a complex 40-page draft document and receive a structured "Meeting Script" containing actionable negotiation points in under two minutes.
- **Multi-Year Signal:** Given three or more historical IEPs, the system must correctly surface at least one recycled goal, one unaddressed parent concern, and one service or accommodation change — each with citation back to the source IEPs.
- **Parent-Concern Fidelity:** Every parent concern extracted from a prior IEP must be explicitly traced — either to the goal/accommodation that addresses it, or to a red flag noting that it was not addressed.
