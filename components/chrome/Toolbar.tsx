"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/sections";
import { Icon } from "./icons";

export function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));
}

/** Excalidraw-style tool island. Each "tool" jumps to a board section (keys 1–7). */
export function Toolbar() {
  const [active, setActive] = useState(sections[0].id);

  // Scroll-spy: the section crossing the middle band of the viewport is active.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      const section = sections[Number(e.key) - 1];
      if (section) {
        document.getElementById(section.id)?.scrollIntoView();
        history.replaceState(null, "", `#${section.id}`);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="island fixed bottom-3 left-1/2 z-30 -translate-x-1/2 p-1 sm:top-3 sm:bottom-auto"
    >
      <ul className="flex items-center gap-0.5">
        {sections.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="group relative">
              <a
                href={`#${s.id}`}
                aria-label={`${s.label} (${i + 1})`}
                aria-current={isActive ? "location" : undefined}
                className={`relative grid size-10 place-items-center rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-text hover:bg-island-hover"
                }`}
              >
                <Icon name={s.icon} />
                <span className="absolute right-1 bottom-0.5 text-[9px] leading-none text-muted">
                  {i + 1}
                </span>
              </a>
              <span className="island pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 px-2 py-1 text-xs whitespace-nowrap group-hover:block sm:top-full sm:bottom-auto sm:mt-2 sm:mb-0">
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
