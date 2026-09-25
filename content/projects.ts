import type { Accent } from "./types";

// Placeholder projects — replace with your own.

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  accent: Accent;
  links?: { code?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "event-pipeline",
    title: "Realtime Event Pipeline",
    summary:
      "Ingests product events from web and mobile clients and fans them out to analytics, billing and alerting.",
    problem:
      "A synchronous write path meant traffic spikes took down the API and dropped events.",
    highlights: [
      "Moved writes behind Kafka with idempotent producers and consumer groups per downstream",
      "Back-pressure and dead-letter queues so a slow consumer never blocks ingestion",
      "Schema registry to evolve event contracts without breaking consumers",
    ],
    metrics: [
      { value: "50k/s", label: "peak events" },
      { value: "<80ms", label: "p99 ingest" },
      { value: "0", label: "lost events" },
    ],
    stack: ["Go", "Kafka", "PostgreSQL", "Kubernetes"],
    accent: "amber",
    links: { code: "https://github.com/your-handle" },
  },
  {
    slug: "rag-assistant",
    title: "RAG Knowledge Assistant",
    summary:
      "An internal assistant that answers questions over thousands of documents with cited sources.",
    problem:
      "Teams spent hours searching scattered docs; a naive chatbot hallucinated answers.",
    highlights: [
      "Chunking + hybrid search (BM25 + pgvector) with a re-ranking step",
      "Streaming responses with source citations and a feedback loop",
      "Offline eval suite to catch regressions before each prompt/model change",
    ],
    metrics: [
      { value: "92%", label: "answer accuracy" },
      { value: "1.2s", label: "time to first token" },
      { value: "40%", label: "fewer support tickets" },
    ],
    stack: ["Python", "FastAPI", "pgvector", "LLM APIs"],
    accent: "violet",
    links: { code: "https://github.com/your-handle" },
  },
  {
    slug: "api-platform",
    title: "Multi-tenant API Platform",
    summary:
      "A shared platform for auth, rate limiting and usage metering across customer-facing APIs.",
    problem:
      "Every team re-implemented auth and quotas, inconsistently and with gaps.",
    highlights: [
      "Gateway with JWT auth, per-tenant rate limits and request tracing",
      "Token-bucket limiter in Redis shared across regions",
      "Usage metering pipeline feeding billing",
    ],
    metrics: [
      { value: "99.99%", label: "uptime" },
      { value: "30+", label: "APIs onboarded" },
      { value: "5ms", label: "gateway overhead" },
    ],
    stack: ["Node.js", "Redis", "PostgreSQL", "AWS"],
    accent: "blue",
  },
  {
    slug: "job-scheduler",
    title: "Distributed Job Scheduler",
    summary:
      "Runs millions of scheduled and retryable background jobs with exactly-once semantics.",
    problem:
      "Cron jobs on single boxes silently failed and double-ran after deploys.",
    highlights: [
      "Leader election and leases so each job runs once, even across restarts",
      "Exponential backoff, retries and a dashboard for stuck jobs",
      "Horizontal workers auto-scaled on queue depth",
    ],
    metrics: [
      { value: "3M", label: "jobs / day" },
      { value: "99.9%", label: "on-time runs" },
      { value: "-60%", label: "infra cost" },
    ],
    stack: ["Python", "PostgreSQL", "Redis", "Docker"],
    accent: "green",
  },
];
