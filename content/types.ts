export type Accent = "violet" | "blue" | "amber" | "green" | "red";

/** CSS variable for each accent colour, defined per theme in globals.css. */
export const accentVar: Record<Accent, string> = {
  violet: "var(--violet)",
  blue: "var(--blue)",
  amber: "var(--amber)",
  green: "var(--green)",
  red: "var(--red)",
};
