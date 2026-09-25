"use client";

import { useMemo } from "react";
import { useSketchTarget } from "@/lib/hooks";
import { arrowDrawables, RoughPaths, type Point } from "./rough";

/** A hand-drawn arrow in its own fixed-size SVG box (coordinates are in that box). */
export function SketchArrow({
  width,
  height,
  points,
  curve = true,
  color = "var(--muted)",
  strokeWidth = 1.6,
  seed = 7,
  delay = 0,
  className = "",
}: {
  width: number;
  height: number;
  points: Point[];
  curve?: boolean;
  color?: string;
  strokeWidth?: number;
  seed?: number;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useSketchTarget<SVGSVGElement>();

  const drawables = useMemo(
    () => arrowDrawables(points, { seed, stroke: color, strokeWidth, roughness: 1.2 }, { curve }),
    [points, seed, color, strokeWidth, curve],
  );

  return (
    <svg
      ref={ref}
      aria-hidden
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible sketch-animate${inView ? " is-drawn" : ""} ${className}`}
    >
      <RoughPaths drawables={drawables} delay={delay} />
    </svg>
  );
}
