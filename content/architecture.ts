import type { Accent } from "./types";

// Placeholder system — replace with one you actually built.
// Coordinates are in a 1000 × 500 SVG viewBox.

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  shape?: "rect" | "ellipse" | "cylinder";
  accent?: Accent;
  info: string;
};

export type ArchEdge = {
  points: [number, number][];
  label?: string;
  labelAt?: [number, number];
  /** Animate request "packets" along this edge. */
  flow?: boolean;
};

export const architecture = {
  title: "Realtime analytics + RAG platform",
  nodes: [
    { id: "client", label: "Clients", sub: "web · mobile", x: 20, y: 235, w: 130, h: 70, shape: "ellipse", info: "Web and mobile apps send events and ask questions over HTTPS." },
    { id: "gateway", label: "API Gateway", sub: "auth · rate limit", x: 200, y: 230, w: 150, h: 80, accent: "violet", info: "Terminates TLS, validates JWTs, applies per-tenant token-bucket rate limits and attaches a trace ID." },
    { id: "ingest", label: "Ingest svc", sub: "Go", x: 400, y: 70, w: 160, h: 70, accent: "blue", info: "Validates events against the schema registry and publishes them to Kafka — the write path never touches the database directly." },
    { id: "query", label: "Query svc", sub: "FastAPI", x: 400, y: 235, w: 160, h: 70, accent: "blue", info: "Serves reads and questions. Checks Redis first, falls back to Postgres, and orchestrates RAG calls." },
    { id: "auth", label: "Auth svc", sub: "OIDC", x: 400, y: 400, w: 160, h: 70, accent: "blue", info: "Issues and rotates tokens; the gateway validates them locally so auth is off the hot path." },
    { id: "kafka", label: "Kafka", sub: "event stream", x: 630, y: 70, w: 160, h: 70, accent: "amber", info: "Durable, partitioned log. Absorbs traffic spikes and lets each consumer scale and replay independently." },
    { id: "redis", label: "Redis", sub: "cache", x: 630, y: 235, w: 160, h: 70, accent: "red", shape: "cylinder", info: "Read-through cache with short TTLs; serves ~90% of hot reads in under 2ms." },
    { id: "llm", label: "LLM", sub: "generation", x: 630, y: 400, w: 160, h: 70, accent: "violet", info: "Generates answers from retrieved context, streamed back to the client with citations." },
    { id: "workers", label: "Workers", sub: "consumers", x: 840, y: 70, w: 150, h: 70, accent: "amber", info: "Consumer groups that persist events, compute aggregates and embed new documents. Auto-scaled on consumer lag." },
    { id: "postgres", label: "Postgres", sub: "source of truth", x: 840, y: 235, w: 110, h: 70, accent: "green", shape: "cylinder", info: "Primary store with read replicas; partitioned tables for event history." },
    { id: "vector", label: "Vector DB", sub: "pgvector", x: 840, y: 400, w: 150, h: 70, accent: "green", shape: "cylinder", info: "Stores document embeddings for hybrid (keyword + semantic) retrieval." },
  ] satisfies ArchNode[],
  edges: [
    { points: [[150, 270], [198, 270]], flow: true },
    { points: [[350, 255], [375, 255], [375, 105], [398, 105]], flow: true },
    { points: [[350, 270], [398, 270]], flow: true },
    { points: [[350, 285], [375, 285], [375, 435], [398, 435]] },
    { points: [[560, 105], [628, 105]], label: "events", labelAt: [594, 95], flow: true },
    { points: [[790, 105], [838, 105]], label: "consume", labelAt: [814, 95], flow: true },
    { points: [[880, 140], [880, 233]], label: "persist", labelAt: [860, 190] },
    { points: [[970, 140], [970, 398]], label: "embed", labelAt: [968, 330] },
    { points: [[560, 270], [628, 270]], label: "cache", labelAt: [594, 260], flow: true },
    { points: [[790, 270], [838, 270]], label: "miss", labelAt: [814, 260] },
    { points: [[560, 290], [595, 290], [595, 435], [628, 435]], label: "RAG", labelAt: [612, 380] },
    { points: [[840, 435], [792, 435]], label: "context", labelAt: [816, 425] },
  ] satisfies ArchEdge[],
  steps: [
    "Every request passes the gateway: auth, rate limits and tracing happen once, at the edge.",
    "Writes go async through Kafka, so a traffic spike queues up instead of taking the API down.",
    "Reads hit Redis first and fall back to Postgres, keeping p99 latency low.",
    "Questions are answered with RAG: retrieve from the vector DB, generate with the LLM, stream back with citations.",
  ],
  metrics: [
    { value: "50k/s", label: "peak events" },
    { value: "<120ms", label: "p99 read" },
    { value: "99.95%", label: "availability" },
  ],
};
