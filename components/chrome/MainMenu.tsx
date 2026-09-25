"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { Icon, type IconName } from "./icons";
import { ThemeIcon, toggleTheme } from "./ThemeToggle";
import { openHelp } from "./HelpDialog";

const links: { label: string; href: string; icon: IconName }[] = [
  { label: "Download resume", href: profile.links.resume, icon: "download" },
  { label: "GitHub", href: profile.links.github, icon: "github" },
  { label: "LinkedIn", href: profile.links.linkedin, icon: "linkedin" },
  { label: "Email me", href: `mailto:${profile.email}`, icon: "mail" },
];

const itemClass =
  "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm hover:bg-island-hover";

/** Top-left hamburger menu, like Excalidraw's main menu. */
export function MainMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed top-3 left-3 z-40">
      <button
        type="button"
        aria-label="Main menu"
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen((o) => !o)}
        className={`island grid size-10 place-items-center ${open ? "bg-primary-soft text-primary" : "hover:bg-island-hover"}`}
      >
        <Icon name="menu" />
      </button>

      {open && (
        <div id="main-menu" className="island mt-2 w-60 p-2">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={itemClass}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <Icon name={l.icon} size={16} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <hr className="my-2 border-island-border" />
          <button type="button" className={itemClass} onClick={toggleTheme}>
            <ThemeIcon />
            Toggle theme
          </button>
          <button
            type="button"
            className={itemClass}
            onClick={() => {
              setOpen(false);
              openHelp();
            }}
          >
            <Icon name="keyboard" size={16} />
            Keyboard shortcuts
            <kbd className="ml-auto text-xs text-muted">?</kbd>
          </button>
        </div>
      )}
    </div>
  );
}
