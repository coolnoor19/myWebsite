import type { ReactNode } from "react";
import { SketchUnderline } from "@/components/sketch/SketchUnderline";

/** An Excalidraw-style frame: thin outline with its name floating above it. */
export function Frame({
  id,
  index,
  title,
  kicker,
  accent = "var(--primary)",
  children,
}: {
  id: string;
  index: number;
  title: string;
  kicker?: ReactNode;
  accent?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-4 px-4 py-12 sm:scroll-mt-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-1.5 pl-1 font-mono text-xs text-muted">
          Frame {index} · {id}
        </p>
        <div className="rounded-lg border border-frame bg-canvas/60 px-5 py-10 sm:px-10 sm:py-14">
          <h2 id={`${id}-title`} className="font-hand text-3xl sm:text-5xl">
            <SketchUnderline color={accent}>{title}</SketchUnderline>
          </h2>
          {kicker && <p className="mt-6 max-w-2xl text-muted">{kicker}</p>}
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
