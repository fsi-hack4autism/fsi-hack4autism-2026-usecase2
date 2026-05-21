---
name: iep-comparison-agent
description: >
  Use this skill whenever the user wants to compare, analyze, or audit IEP (Individualized Education Program) documents across multiple years. Trigger this skill when the user uploads IEP files, mentions IEP goals, present levels, accommodations, related services, parent concerns, or behavioral data, or asks whether a student is making progress. Also trigger when the user asks about goal recycling, service hour reductions, copy-paste IEPs, or whether parent concerns are being addressed. Use this skill even if the user simply says "look at my child's IEPs" or "compare these IEP years" — any multi-year IEP review task belongs here.
---

# IEP Comparison Agent

This skill equips the agent to conduct a rigorous, multi-year comparison of IEP documents, identifying patterns of progress, stagnation, procedural compliance without substantive response, and quiet program reductions. Analysis is organized first by **subject area or instructional domain** (e.g., Reading, Math, Communication, Behavior), and within each area, every IEP dimension — goals, present levels, accommodations, services, and parent concerns — is examined together so the full picture of that area is visible in one place.

---

## Step 1: Document Identification and Version Ordering

Before any analysis begins, establish a clear version timeline from the uploaded files.

**How to identify each IEP version:**
- **File name** — extract any year, date, or revision label present (e.g., `IEP_2022_2023.pdf`, `IEP_rev3_Oct2023.pdf`)
- **Timestamp / metadata** — use document creation or modification date if visible
- **Revision number** — if the file contains an explicit revision field (e.g., "Amendment #2"), record it
- **Effective date inside the document** — the IEP meeting date or service start date is the authoritative ordering field when available

**Build a Version Table before proceeding:**

| Version Label | File Name | Effective Date | Revision / Amendment | Notes |
|---|---|---|---|---|
| IEP v1 | `filename.pdf` | MM/DD/YYYY | Original | — |
| IEP v2 | `filename.pdf` | MM/DD/YYYY | Amendment #1 | — |
| … | … | … | … | … |

If dates or version labels are ambiguous or missing, flag this explicitly and ask the user to clarify before continuing. Do not assume ordering from file upload sequence alone.

All subsequent analysis references versions by their label from this table (e.g., "IEP v1 → IEP v2").

---

## Step 2: Identify Subject Areas / Instructional Domains

Scan all IEPs and extract every distinct subject area or domain in which goals, present levels, or services appear. Common domains include:

- Reading / Literacy
- Writing / Written Expression
- Math / Mathematics
- Communication / Speech-Language
- Social-Emotional / Behavioral
- Fine Motor / OT
- Gross Motor / PT
- Adaptive / Life Skills
- Transition / Vocational (secondary)
- Other (label as found)

Group all subsequent analysis by these domains. If a goal or service spans multiple domains, assign it to the most specific one and cross-reference as needed.

---

## Step 3: Domain-by-Domain Analysis

For **each subject area identified in Step 2**, conduct the following analysis. Keep all six dimensions together within the domain section so the reader can see the complete picture for that area without jumping around.

---

### Domain Section Template

#### [Domain Name] — e.g., Reading / Literacy

##### Goals — Trajectory Across Versions
Compare goal language, baselines, and criteria across every IEP version for this domain.

- Are goals from prior versions still appearing with the same or similar language?
- Have goals been met and replaced with more ambitious ones?
- Have goals been modified downward without explanation?
- Are goals disappearing between versions without a documented mastery date?

**Red flags:**
- Same goal, same criterion, same baseline across multiple versions
- Criterion reduced without explanation
- Goal language becoming more vague — specific numbers replaced with "as appropriate" or "with support"
- Goal disappears with no documented mastery date

---

##### Present Levels — Baseline Narrative for This Domain
Compare the present levels description for this domain across versions.

- Does the current version describe more advanced functioning than the prior one?
- Are the same deficits described in the same language version after version?
- Has new evaluation data (triennial, outside evaluation) been integrated?
- Are parent observations about this area reflected?

**Red flags:**
- Present levels text nearly identical across versions (copy-paste)
- Exclusive focus on deficits with no acknowledgment of growth
- New evaluation data absent from the narrative
- Parent-reported observations missing

---

##### Accommodations — Expansion or Contraction for This Domain
Track every accommodation related to this domain across versions.

- Have accommodations evolved to match the student's current placement and demands?
- Have accommodations been removed — and is there documentation of why?
- Is specificity increasing or decreasing over time?

**Red flags:**
- Accommodations removed without explanation
- Same accommodations unchanged across versions despite increased academic demands
- Language becoming less specific (e.g., "extended time on all tests" → "extended time as needed")

---

##### Related Services — Hours, Frequency, and Delivery for This Domain
Compare service entries (speech, OT, PT, counseling, reading specialist, etc.) specific to this domain across versions.

- Have hours changed? In which direction, and why?
- Was individual service converted to group? Was there a clinical justification?
- Was direct service converted to consultative? When, and why?

**Red flags:**
- Service hours reduced without documented mastery of prior goals in this domain
- Individual → group conversion without clinical justification
- Direct → consultative conversion without explanation
- Service disappears entirely between versions with no explanation

---

##### Parent Concerns — Acknowledged or Ignored in This Domain ⚠️
Cross-reference parent concerns from every version against the goals and accommodations in this domain.

- Are concerns about this area reflected in goals or accommodations?
- Do the same concerns recur across versions without a programmatic response?

**For each concern:** explicitly identify which goals or accommodations address it, or flag that none do.

**Red flags:**
- Same concern appearing in multiple versions without being addressed
- Concern present in IEP v1 notes but absent from IEP v2 document entirely
- Concern acknowledged verbally/in meeting notes but not carried into the IEP

---

##### Behavioral Data for This Domain (if applicable)
If this domain has associated behavioral data, BIPs, or behavior goals, track them here.

- Is data present? (Absence is significant.)
- Is frequency flat, increasing, or decreasing across versions?
- Has the BIP been updated in response to data?

**Red flags:**
- No behavioral data despite documented behavioral needs in this domain
- Behavioral frequency flat or increasing despite intervention
- BIP unchanged across multiple versions

---

*Repeat this full Domain Section for every subject area identified in Step 2.*

---

## Step 4: Cross-Domain Patterns

After completing all domain sections, note any patterns that cut across multiple areas:

- Are multiple domains showing the same kind of goal recycling simultaneously?
- Are service reductions happening across domains in the same version transition?
- Do parent concerns span multiple domains and go unaddressed in all of them?
- Is there a version where most domains regressed or stagnated together?

---

## Step 5: Output Format

### Version Timeline
The completed Version Table from Step 1, confirmed and labeled.

### Subject Area Index
A list of all domains identified, with a one-line status for each (e.g., "Reading — goals recycled across v1–v3; services reduced in v2").

### Domain-by-Domain Analysis
Full analysis for each domain per the template in Step 3.

### Parent Concerns Crosswalk
A consolidated table mapping every documented parent concern (by version) to the goals and accommodations that address it — or explicitly flagging the absence of a response.

| Concern | First Appeared | Addressed in Goals? | Addressed in Accommodations? | Notes |
|---|---|---|---|---|
| [concern text] | IEP v1 | Yes — Goal 3.2 / No | Yes — Extended time / No | — |

### Questions for the IEP Team
A numbered list of specific, evidence-based questions the family can bring to the next meeting. Anchor each question to a version and domain (e.g., "In IEP v2, the reading fluency goal criterion dropped from 90% to 75% with no explanation — can the team walk us through what changed?").

**Standing question for parent concerns:**
> "Looking at our concerns from prior IEPs — can the team show us where each one was addressed in the subsequent program? And can we confirm that our current concerns will be specifically reflected in this year's goals and accommodations, rather than simply noted?"

### Overall Assessment
A candid plain-language summary: Is this IEP record consistent with a program actively advancing the student across all domains, or one managing compliance? Note which domains show the most concerning patterns.
