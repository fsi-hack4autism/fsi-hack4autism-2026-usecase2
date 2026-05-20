# The Lifelong Profile — IEP Companion

Project working document — FSI Hack4Autism 2026
*Use Case #2 — AI-Assisted Program Development & Summarization*

---

## 1. What we are building (in one line)

An AI companion that ingests a child's history of autism-related documents and helps families **understand, prepare for, and get more from the IEP process** — built strengths-first, with every claim traceable to a source, and designed to help people make better decisions rather than to replace them.

IEP = Individualized Education Program. It is a legally binding plan a school must produce each year for a child with special needs. It is negotiated in a single annual meeting, it is dense and jargon-heavy, and parents often do not see the draft before they walk in.

---

## 2. The problem (from the parents on our team)

Two parents on the team live this process every year. The problem they described:

- **One short meeting decides the year.** All the data and opinions from parents, teachers, aides and behavior analysts get compressed into a single ~2-hour meeting. There is little room for oversight.
- **Parents go in blind.** The draft IEP is usually not shared in advance — families first see it across the table at the meeting itself.
- **It is legally binding and often contentious.** Once agreed, the school must follow it; revising or contesting it has legal consequences. Families sometimes bring advocates or lawyers.
- **It is hard to understand.** IEPs read like legal documents. Without years of experience, the terminology does not make sense to most parents.
- **A huge amount of useful data is lost.** Day-to-day session notes from RBTs/technicians, psychoeducational evaluations, school evaluations, even email threads — most of it never makes it into the plan, even though it could really help.

> *"When you bring a new provider on, you can't have them read 300 pages. They need to know: who is this child, and how do we help?"*

---
Upload Records
      ↓
Cloud Storage
      ↓
Document AI
      ↓
Text Extraction + Structuring
      ↓
Chunking
      ↓
Vertex AI Embeddings
      ↓
Vertex AI Vector Search
      ↓
RAG Layer using Vertex AI / LangChain
      ↓
Gemini Summary + Recommendations
      ↓
Firestore / BigQuery Storage
      ↓
Cloud Run App
      ↓
Dashboard / Timeline

## 3. Our key insight: build the person, not the deficit

The biggest mistake these systems make is becoming a **deficit-only medical timeline** — a year-by-year list of what is "wrong." The highest-value systems instead capture capabilities, regulation patterns, and the environments where a person thrives versus struggles.

So the profile we build should capture, for one individual:
