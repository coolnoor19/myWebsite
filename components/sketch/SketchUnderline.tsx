"use client";

import { useMemo, type ReactNode } from "react";
import { useSketchTarget } from "@/lib/hooks";
import { generator, RoughPaths } from "./rough";

/** Wraps inline text with a marker-style underline that draws itself in. */
export function SketchUnderline({
  children,
  color = "var(--primary)",
  strokeWidth = 3,
  seed = 3,
  delay = 200,
}: {
  children: ReactNode;
  color?: string;
  strokeWidth?: number;
  seed?: number;
  delay?: number;
}) {
  const { ref, size, inView } = useSketchTarget<HTMLSpanElement>();
  const w = size.width;

  const drawables = useMemo(() => {
    if (!w) return [];
    const opts = { seed, stroke: color, strokeWidth, roughness: 1.4, bowing: 2 };
    return [
      generator.curve(
        [
          [2, 9],
          [w * 0.35, 6],
          [w * 0.7, 8],
          [w - 2, 5],
        ],
        opts,
      ),
    ];
  }, [w, color, strokeWidth, seed]);

  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <svg
        aria-hidden
        className={`pointer-events-none absolute left-0 -bottom-2 overflow-visible sketch-animate${inView ? " is-drawn" : ""}`}
        width={w}
        height={14}
      >
        <RoughPaths drawables={drawables} delay={delay} />
      </svg>
    </span>
  );
}
