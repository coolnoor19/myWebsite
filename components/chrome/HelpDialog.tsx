"use client";

import { useEffect, useRef } from "react";
import { sections } from "@/content/sections";
import { Icon } from "./icons";
import { isTypingTarget } from "./Toolbar";

const HELP_ID = "help-dialog";

export function openHelp() {
  (document.getElementById(HELP_ID) as HTMLDialogElement | null)?.showModal();
}

/** Bottom-right "?" button plus the keyboard-shortcuts dialog. */
export function HelpDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "?" && !isTypingTarget(e.target)) {
        e.preventDefault();
        dialogRef.current?.showModal();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shortcuts: [string, string][] = [
    ...sections.map((s, i): [string, string] => [String(i + 1), `Jump to ${s.label}`]),
    ["?", "Show this help"],
    ["Esc", "Close dialogs & panels"],
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Help and keyboard shortcuts"
        onClick={openHelp}
        className="island fixed right-3 bottom-3 z-30 hidden size-10 place-items-center hover:bg-island-hover sm:grid"
      >
        <Icon name="help" />
      </button>

      <dialog
        id={HELP_ID}
        ref={dialogRef}
        aria-labelledby="help-title"
        className="island m-auto w-[min(440px,calc(100vw-32px))] p-0 text-text backdrop:bg-black/50"
        onClick={(e) => {
          // Clicking the backdrop closes the dialog.
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 id="help-title" className="font-hand text-2xl">
              Keyboard shortcuts
            </h2>
            <button
              type="button"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
              className="grid size-8 place-items-center rounded-md hover:bg-island-hover"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            {shortcuts.map(([key, label]) => (
              <div key={key} className="contents">
                <dt>
                  <kbd className="inline-block min-w-7 rounded-md border border-island-border bg-canvas px-1.5 py-0.5 text-center font-mono text-xs">
                    {key}
                  </kbd>
                </dt>
                <dd className="text-muted">{label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 font-hand text-sm text-muted">
            psst — every box and arrow on this board is drawn live with rough.js ✎
          </p>
        </div>
      </dialog>
    </>
  );
}
