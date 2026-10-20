import type { Accent } from "./types";

// Placeholder experience — replace with your own.

export const experience: {
  role: string;
  company: string;
  period: string;
  points: string[];
  accent: Accent;
}[] = [
  {
    role: "Backend / AI Engineer",
    company: "Company Name",
    period: "2026 — now",
    points: [
      "Own the RAG platform and LLM services used by internal teams",
      "Cut p99 latency of the core API by 45% via caching and query tuning",
    ],
    accent: "violet",
  },
  {
    role: "Full-Stack Engineer",
    company: "Trackepay Pvt Ltd",
    period: "2025 Jul — 2026 Mar",
    points: [
      "Built the event ingestion pipeline processing 50k events/s",
      "Led migration from a monolith to independently deployed services",
    ],
    accent: "blue",
  },
  // {
  //   role: "Software Engineer Intern",
  //   company: "First Company",
  //   period: "2021 — 2022",
  //   points: [
  //     "Shipped REST endpoints and background jobs for the billing system",
  //   ],
  //   accent: "green",
  // },
];
