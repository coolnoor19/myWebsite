"use client";

import { useMemo, type AllHTMLAttributes, type ElementType, type ReactNode } from "react";
import type { Options } from "roughjs/bin/core";
import { useSketchTarget } from "@/lib/hooks";
import { generator, RoughPaths, roundedRectPath } from "./rough";

type OwnProps = {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  shape?: "rect" | "ellipse";
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fillStyle?: Options["fillStyle"];
  roughness?: number;
  seed?: number;
  radius?: number;
  /** Draw the outline stroke-by-stroke when scrolled into view. */
  animate?: boolean;
  delay?: number;
};

type SketchBoxProps = OwnProps & Omit<AllHTMLAttributes<HTMLElement>, keyof OwnProps>;

/** A container with a hand-drawn outline sized to its content. */
export function SketchBox({
  children,
  className = "",
  as: Tag = "div",
  shape = "rect",
  stroke = "var(--stroke)",
  strokeWidth = 1.5,
  fill,
  fillStyle = "hachure",
  roughness = 1.1,
  seed = 1,
  radius = 14,
  animate = false,
  delay = 0,
  ...rest
}: SketchBoxProps) {
  const { ref, size, inView } = useSketchTarget<HTMLElement>();
  const { width: w, height: h } = size;

  const drawables = useMemo(() => {
    if (!w || !h) return [];
    const options: Options = {
      seed,
      stroke,
      strokeWidth,
      roughness,
      bowing: 1,
      fill,
      fillStyle,
      fillWeight: 1,
      hachureGap: 7,
      hachureAngle: -41,
    };
    if (shape === "ellipse") {
      // Slightly oversized so the ellipse wraps the content rather than cutting it.
      return [generator.ellipse(w / 2, h / 2, w * 1.08, h * 1.25, options)];
    }
    return [generator.path(roundedRectPath(2, 2, w - 4, h - 4, radius), options)];
  }, [w, h, shape, stroke, strokeWidth, fill, fillStyle, roughness, seed, radius]);

  const animClass = animate ? `sketch-animate${inView ? " is-drawn" : ""}` : "";

  return (
    <Tag ref={ref} {...rest} className={`relative isolate ${className}`}>
      <svg
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 overflow-visible ${animClass}`}
        width={w}
        height={h}
      >
        <RoughPaths drawables={drawables} delay={delay} />
      </svg>
      {children}
    </Tag>
  );
}
