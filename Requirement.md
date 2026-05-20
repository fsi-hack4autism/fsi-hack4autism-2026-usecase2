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

---

## 4. Scope Boundaries (Hackathon Constraints)

### In-Scope for MVP

- Processing a single, comprehensive mock-student document history pipeline.
- Displaying the split-screen comparison workspace (Draft IEP text vs. AI-generated insights).
- Clickable data provenance (source document names and page references).

### Out-of-Scope for MVP

- HIPAA-compliant production user authentication or user account data isolation.
- Real-time audio recording, transcription, or live translation of active IEP meetings.
- Live scraping engines for multi-state or multi-district legal databases.

---

## 5. MVP Success Criteria

- **Accuracy & Trust:** Zero hallucinated data points. Every discrepancy flagged must map directly to a verified uploaded source file.
- **Time-to-Insight:** A user must be able to upload a complex 40-page draft document and receive a structured "Meeting Script" containing actionable negotiation points in under two minutes.
