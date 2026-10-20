// Placeholder content — replace with your own details.

export const profile = {
  name: "Noor",
  role: "Backend & AI Engineer",
  /** Word in `role` that gets a hand-drawn circle. */
  roleHighlight: "AI",
  currently: "Scaling RAG pipelines & event-driven services",
  openTo: "Backend / AI engineering roles",
  tagline:
    "I design and build scalable backends and AI systems that stay fast, observable and boring under load.",
  email: "nooralam192001@gmail.com",
  links: {
    github: "https://github.com/coolnoor19",
    linkedin: "https://www.linkedin.com/in/noor192001",
    resume: "https://drive.google.com/file/d/1mGpNxO7iOrPhAAK_plT6dR0Ct2kouPk3/view",
  },
  about: [
    "I'm a software engineer focused on the unglamorous parts that make products work: APIs, data pipelines, queues, caches and the infrastructure that keeps them running.",
    "Lately I've been building AI-powered services — retrieval pipelines, LLM orchestration and evaluation — with the same bar for reliability as any other production system.",
  ],
  principles: [
    "Design for the 10x traffic day",
    "Measure before optimising",
    "Make failure modes explicit",
    "Ship small, observe, iterate",
  ],
  stats: [
    { value: "2+", label: "years shipping backends" },
    { value: "10M+", label: "requests / day served" },
    { value: "15+", label: "services in production" },
  ],
};

export type Profile = typeof profile;
