# Hackathon Stories & Assignments

**Project:** The Lifelong Profile — IEP Companion
**Event:** FSI Hack4Autism 2026 — Use Case #2
**Duration:** 1 day (MVP)
**Source docs:** [Requirement.md](Requirement.md), [README.md](README.md)

---

## Guiding Principles (Read This First)

1. **Real uploads, real processing — no smoke and mirrors.** Users upload actual PDF files; the app processes them through GCS → Document AI → Gemini and returns live results. Synthetic documents serve as test fixtures, not pre-loaded answers.
2. **One golden path, two use cases.** Everything supports either (a) a new parent onboarding, or (b) an existing parent comparing IEPs year-over-year.
3. **Citations are the magic trick.** Every AI claim must trace back to the source file, section, and page. This is the single most important output.
4. **Skip production concerns.** No user auth, no multi-tenancy, no HIPAA hardening, no SLA. One student, one session. Cut anything that isn't core to the two use cases.

---

## App Flow (What We Are Building)

Two end-to-end user flows sharing a common upload + processing pipeline:

**Shared pipeline (all users):**
1. **Upload screen** → user drags and drops one or more PDFs (IEPs, evaluations, session notes).
2. **Processing** → files land in GCS → Document AI extracts text → Gemini builds the student profile.
3. **Student Profile screen** → strengths-first summary renders with clickable source citations.

**Use Case A — New Parent (Maya):**
4. Click a prompt chip ("What should I ask at my first IEP meeting?") → chat answers using the uploaded documents, cites source + page.
5. No prior IEPs needed — profile and chat are the deliverable.

**Use Case B — Returning Parent (David):**
4. Upload 2–3 historical IEPs alongside the new draft.
5. **IEP Comparison screen** → side-by-side view, red flags highlighted: recycled goal, unaddressed parent concern, service reduction.
6. **Meeting Script** → single-page summary with citations and suggested negotiation questions.

Every assignment below feeds one or both of these flows.

---

## Assignments by Role

### Charles & Erin — Requirements / User Stories

**Goal:** Lock the two user flows and personas so the rest of the team can build against a shared spec.

**Deliverables (today):**
- [ ] Finalize this `Stories.md` and walk the team through it at kickoff.
- [ ] Write 2 short persona one-pagers:
  - **Maya** — new parent, no prior IEP, child just diagnosed. Uploads one evaluation PDF.
  - **David** — returning parent, 3 prior IEPs, suspects services are being quietly reduced. Uploads 3 IEP PDFs + 1 draft.
- [ ] Write exact click-by-click acceptance criteria for each screen (upload → profile → chat / comparison → meeting script). Hanuja and Ryan build to this.
- [ ] Pick the 5–8 prompt chips. Include at least one that only makes sense after real documents are uploaded (e.g., "What are my child's documented strengths?" — answer must come from the uploaded file, not a canned response).

**Out of scope:** Full BRD coverage, edge cases, error states beyond a simple "upload failed" message.

---

### Charles & Bobby — Evaluate Chat Response

**Goal:** Verify that AI responses drawn from real uploaded documents are accurate, cited, and grounded — no hallucinations.

**Deliverables (today):**
- [ ] Upload the synthetic test documents (from Nihal/Bobby) and run each of the 5–8 prompt chips against the live pipeline 3 times. Record: did the answer reference content actually present in the uploaded file? Did it cite the right page?
- [ ] Build a 1-page "known good" cheat sheet — expected answer + expected citation for each prompt, derived from the actual test PDFs. Use during dry runs to catch regressions.
- [ ] Flag any prompt that fabricates data or cites the wrong page. Rewrite the prompt or cut it.
- [ ] **Hard rule:** Every answer shown must be traceable to a specific line in a specific uploaded document. If it cannot be verified, cut the prompt.

**Out of scope:** Automated eval harness, LLM-as-judge scoring, regression CI. Manual spot-check only.

---

### Tanuja — UI

**Goal:** Build the 5 screens users actually interact with. Fastest path: lightweight HTML/CSS or a simple React app wired to the real backend.

**Deliverables (today):**
- [ ] **Screen 0 — Upload:** Drag-and-drop zone for PDFs. Progress indicator while GCS + Document AI + Gemini process. Simple error state ("upload failed, try again"). This is the entry point for both use cases.
- [ ] **Screen 1 — Student Profile:** Strengths-first summary card, list of needs, timeline strip. Each item has a "source" chip (filename + page) that expands on click.
- [ ] **Screen 2 — Chat Workspace:** Prompt chips along the top, chat thread below, citation panel on the right that populates when the model responds.
- [ ] **Screen 3 — IEP Comparison (split screen):** Two columns (IEP Year A vs IEP Year B), inline red-flag highlights, side panel listing flags by category (Goals / Present Levels / Accommodations / Services / Parent Concerns / Behavioral Data).
- [ ] **Screen 4 — Meeting Script:** Single scrollable page. Sections: "Questions to Ask", "Red Flags", "Evidence" — each item shows its source citation.
- [ ] 1 color palette, top nav with 3–4 links, no login UI. Keep it functional over polished.

**Out of scope:** Mobile responsive, dark mode, animations, accessibility audit, multi-student switching.

---

### Nihal & Bobby — Synthetic Data Generation

**Goal:** Produce realistic test-fixture PDFs that exercise the real processing pipeline. These are the documents the team uploads to validate the app end-to-end — not pre-loaded demo data.

**Deliverables (today):**
- [ ] **One synthetic student** (use "David's child" persona from Charles/Erin). All documents key off this one student.
- [ ] **3 historical IEPs** (e.g., 2023, 2024, 2025) as machine-readable PDFs (not scanned images). Deliberately seed across these 3 documents:
  - A recycled goal appearing in all 3 years with near-identical wording.
  - A parent concern appearing in 2024 and 2025 that is never reflected in goals or accommodations.
  - A speech service reduction between 2024 and 2025 with no documented clinical justification.
- [ ] **2 supporting docs:** one psychoeducational evaluation (~8 pages), one batch of RBT session notes (~5 pages).
- [ ] Upload all 5 files to the `student-data` GCS bucket via the upload screen once Hanuja has it wired. Validate the files successfully reach GCS.
- [ ] Produce a **seed map** (a simple table): filename → page number → what red flag is seeded there. Hand to Chaitali (comparison engine) and Charles/Bobby (eval). This is what lets everyone verify the pipeline found the right things.

**Out of scope:** Multiple students, scanned/handwritten PDFs, Maya's documents (new-parent use case needs only 1 evaluation PDF, which Nihal/Bobby should also produce as a bonus if time allows).

---

### Ryan Cheng — Backend Pipeline & Prompt Chips

**Goal:** Own the end-to-end processing pipeline (upload → GCS → Document AI → Gemini → structured output) and wire up the prompt chips against it.

**Pipeline deliverables (today):**
- [ ] **Upload endpoint:** Accept PDF(s) from the UI, write to `student-data` GCS bucket, return a job/session ID.
- [ ] **Document AI step:** Trigger Document AI on each uploaded file. Extract structured text with page numbers preserved (needed for citations). Store output back to GCS or in-memory for the session.
- [ ] **Gemini — profile generation:** Given extracted text, call Gemini to produce the strengths-first profile (strengths, needs, timeline). Each field in the response must include `source_file` and `page_number`. Return as JSON consumed by the UI.
- [ ] **Gemini — chat Q&A:** Accept a user question + session context. Call Gemini with the extracted document text as context. Response must include cited passages with `source_file` + `page_number`.
- [ ] Expose these as simple REST endpoints (or Cloud Run functions) that Hanuja's UI calls.

**Prompt chip deliverables (today):**
- [ ] Build the 5–8 chips Charles/Erin specify. Suggested set:
  - "What are my child's documented strengths?"
  - "What questions should I ask at the IEP meeting?"
  - "What does FAPE mean for my child?"
  - "Has anything changed since last year's IEP?"
  - "What red flags do you see in this draft?"
- [ ] Each chip submits via the chat endpoint above — responses must come from the uploaded documents, not hardcoded strings.
- [ ] Coordinate with Charles/Bobby: once the pipeline is live, they validate each chip's response against the seed map.

**Out of scope:** Free-form chat beyond the chips, multi-turn conversation memory, streaming responses, auth middleware.

---

### Chaitali Ladikkar — IEP Comparison / Progress Analysis

**Goal:** Build the multi-year comparison feature against real uploaded IEP documents — the MVP's most distinctive capability.

**Deliverables (today):**
- [ ] **Comparison endpoint:** Accept 2–3 IEP documents (by GCS path or session ID from Ryan's pipeline). Call Gemini to compare them across the 3 required dimensions below. Return structured JSON with findings.
- [ ] **Required findings** — the 3 seeded in Nihal/Bobby's test PDFs must be detected:
  - Recycled goal (Section 3.6.1 in [Requirement.md](Requirement.md)) — same goal text across ≥2 IEP years.
  - Unaddressed parent concern (Section 3.6.5 — most important) — concern appears in prior IEPs but is absent from goals/accommodations.
  - Service reduction (Section 3.6.4) — hours or frequency decreased without documented justification.
- [ ] Each finding in the JSON must include: `iep_year`, `section`, `page_number`, `flag_type`, `plain_english_explanation`, `suggested_question`.
- [ ] Wire the JSON output into Hanuja's Screen 3 (split-screen comparison) and Screen 4 (Meeting Script).
- [ ] Validate against the seed map from Nihal/Bobby — every seeded red flag must appear in output with the correct page citation.
- [ ] **Stretch (only if time):** add findings for Present Levels (3.6.2), Accommodations (3.6.3), and Behavioral Data (3.6.6).

**Out of scope:** Comparing more than 3 IEPs, handling scanned/poor-OCR documents, statistical charts.

---

### Ratish — Presentation

**Goal:** Build the deck and run the live MVP walkthrough cleanly.

**Deliverables (today):**
- [ ] ~8 slide deck:
  1. Problem (use parent quotes from [Requirement.md](Requirement.md) §2)
  2. Who it helps (Maya + David personas)
  3. What it does (3 bullets: upload real docs → build profile → compare IEPs)
  4. Architecture (1 diagram from [Requirement.md](Requirement.md) §4 — label what is live vs. what is out-of-scope for today)
  5. Live MVP walkthrough handoff
  6. (Walkthrough runs — upload a PDF live, show the profile, run a prompt chip, show a red flag)
  7. What is fully live vs. what we would add next
  8. What's next / ask
- [ ] Rehearse the full walkthrough with Charles/Erin once mid-day, once before final. Use the real upload flow — not a slide screenshot.
- [ ] Have a **screen-recorded backup** of the complete flow in case the network or live app fails during presentation.

**Out of scope:** Animated slides, brand polish, speaker notes for every slide.

---

## Cross-Team Action Items (from [README.md](README.md))

- [ ] **Unique scenario combinations** — Charles + Jeff to confirm before Nihal/Bobby finalize synthetic data.
- [ ] **Agent designer not working** — Anjali to investigate. Blocking? If yes, fall back to AI Studio for prototyping (per [README.md](README.md) implementation options).

---

## Definition of Done for the MVP

- [ ] A real PDF can be uploaded through the UI, processed by Document AI + Gemini, and produce a student profile — end-to-end, no hardcoded bypass.
- [ ] Every AI answer on a prompt chip cites a specific file name and page number from the uploaded document.
- [ ] The IEP comparison engine detects all 3 seeded red flags from Nihal/Bobby's test PDFs (recycled goal, unaddressed parent concern, service reduction) with correct page citations.
- [ ] The Meeting Script screen renders with at least 3 cited findings drawn from the real comparison output.
- [ ] Screen-recorded backup of the full flow exists and plays without errors.

If all 5 boxes are checked, the MVP ships. Nothing else is required.
