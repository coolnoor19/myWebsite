import type { Accent } from "./types";

export const stack: { title: string; accent: Accent; items: string[] }[] = [
  {
    title: "Languages",
    accent: "violet",
    items: ["Python", "Go", "TypeScript", "SQL"],
  },
  {
    title: "Backend",
    accent: "blue",
    items: ["FastAPI", "Node.js", "gRPC", "REST", "GraphQL"],
  },
  {
    title: "Data & Queues",
    accent: "amber",
    items: ["PostgreSQL", "Redis", "Kafka", "RabbitMQ", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    accent: "green",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "AI / ML",
    accent: "red",
    items: ["LLM APIs", "RAG", "LangGraph", "pgvector", "Evals"],
  },
];
