"use client";

import { Icon } from "./icons";

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage unavailable (private mode) — theme still applies for this visit.
  }
}

/** Sun/moon swap is pure CSS (via the `light:` variant), so no hydration mismatch. */
export function ThemeIcon() {
  return (
    <>
      <Icon name="sun" className="light:hidden" />
      <Icon name="moon" className="hidden light:block" />
    </>
  );
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light / dark theme"
      className="island grid size-10 place-items-center hover:bg-island-hover"
    >
      <ThemeIcon />
    </button>
  );
}
