"use client";

import rough from "roughjs";
import type { Drawable, Options } from "roughjs/bin/core";

export type Point = [number, number];

export const generator = rough.generator();

export function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  return [
    `M ${x + rr} ${y}`,
    `L ${x + w - rr} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + rr}`,
    `L ${x + w} ${y + h - rr}`,
    `Q ${x + w} ${y + h} ${x + w - rr} ${y + h}`,
    `L ${x + rr} ${y + h}`,
    `Q ${x} ${y + h} ${x} ${y + h - rr}`,
    `L ${x} ${y + rr}`,
    `Q ${x} ${y} ${x + rr} ${y}`,
    "Z",
  ].join(" ");
}

/** A line (straight or curved) with an optional Excalidraw-style arrowhead at the end. */
export function arrowDrawables(
  points: Point[],
  options: Options,
  { curve = false, head = true, headSize = 11 } = {},
): Drawable[] {
  const shaft = curve ? generator.curve(points, options) : generator.linearPath(points, options);
  if (!head || points.length < 2) return [shaft];

  const [tx, ty] = points[points.length - 1];
  const [px, py] = points[points.length - 2];
  const angle = Math.atan2(ty - py, tx - px);
  const wing = (offset: number): Point => [
    tx - headSize * Math.cos(angle + offset),
    ty - headSize * Math.sin(angle + offset),
  ];
  return [shaft, generator.linearPath([wing(0.45), [tx, ty], wing(-0.45)], options)];
}

/** Renders rough.js drawables as SVG paths that can be animated with `.sketch-animate`. */
export function RoughPaths({ drawables, delay = 0 }: { drawables: Drawable[]; delay?: number }) {
  return drawables.flatMap((drawable, i) =>
    generator.toPaths(drawable).map((p, j) => (
      <path
        key={`${i}-${j}`}
        className="sketch-path"
        pathLength={1}
        d={p.d}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          {
            stroke: p.stroke,
            strokeWidth: p.strokeWidth,
            fill: p.fill ?? "none",
            "--delay": `${delay}ms`,
          } as React.CSSProperties
        }
      />
    )),
  );
}
