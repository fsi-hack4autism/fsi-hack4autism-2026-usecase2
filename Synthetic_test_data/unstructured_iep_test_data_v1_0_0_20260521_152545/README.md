# Unstructured Synthetic IEP Test Data Package

Version: v1_0_0  
Generated: 20260521_152545  
Synthetic data: true

## Purpose
This package contains unstructured and semi-structured synthetic special-education/IEP-style documents for GCP hackathon testing. It is designed for Cloud Storage ingestion, Document AI parsing, Vertex AI Search / RAG, BigQuery metadata extraction, and Gemini summarization workflows.

## Folder Contents
- `parent_emails/`: free-text parent concerns and priorities
- `iep_narratives/`: markdown-style IEP summaries with goals, supports, and risk flags
- `service_logs/`: JSONL service note records
- `behavior_incidents/`: JSONL ABC-style incident narratives
- `transition_notes/`: post-14/post-22 transition planning notes
- `assessment_summaries/`: assessment-like narrative summaries
- `ocr_messy_notes/`: OCR-noisy text files for extraction robustness testing
- `rag_eval_questions/`: sample retrieval/evaluation questions
- `metadata/`: manifest and dataset metadata

## Suggested GCP Use Cases
1. Upload to Cloud Storage bucket.
2. Parse text files using Document AI or simple Cloud Run parser.
3. Store extracted metadata in BigQuery.
4. Create embeddings with Vertex AI text embeddings.
5. Index chunks in Vertex AI Search, AlloyDB, BigQuery vector search, or Matching Engine.
6. Use Gemini to summarize student needs, flag missing supports, and answer RAG questions.

## Privacy Notice
All records are synthetic. Do not treat these files as real educational records.
