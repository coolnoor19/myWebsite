import type { IconName } from "@/components/chrome/icons";

/** Board sections, in order. Each maps to a toolbar "tool" and a number key. */
export const sections: { id: string; label: string; icon: IconName }[] = [
  { id: "hero", label: "Home", icon: "pointer" },
  { id: "about", label: "About", icon: "rect" },
  { id: "stack", label: "Tech stack", icon: "diamond" },
  { id: "architecture", label: "Architecture", icon: "arrow" },
  { id: "projects", label: "Projects", icon: "circle" },
  { id: "experience", label: "Experience", icon: "line" },
  { id: "contact", label: "Contact", icon: "text" },
];
