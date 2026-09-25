"use client";

import { useMemo, useState } from "react";
import type { Drawable, Options } from "roughjs/bin/core";
import { architecture, type ArchNode } from "@/content/architecture";
import { accentVar } from "@/content/types";
import { arrowDrawables, generator, RoughPaths, roundedRectPath } from "@/components/sketch/rough";
import { useSketchTarget } from "@/lib/hooks";

const { nodes, edges } = architecture;

function nodeDrawables(n: ArchNode, seed: number, active: boolean): Drawable[] {
  const color = n.accent ? accentVar[n.accent] : "var(--stroke)";
  const o: Options = {
    seed,
    stroke: color,
    strokeWidth: active ? 2.4 : 1.5,
    roughness: 1.1,
    fill: color,
    fillStyle: "hachure",
    fillWeight: 0.6,
    hachureGap: active ? 5 : 9,
    hachureAngle: -41,
  };
  const { x, y, w, h } = n;
  if (n.shape === "ellipse") return [generator.ellipse(x + w / 2, y + h / 2, w, h, o)];
  if (n.shape === "cylinder") {
    const cx = x + w / 2;
    const ry = 9;
    const outline = { ...o, fill: undefined };
    return [
      generator.path(`M ${x} ${y + ry} L ${x} ${y + h - ry} A ${w / 2} ${ry} 0 0 0 ${x + w} ${y + h - ry} L ${x + w} ${y + ry}`, o),
      generator.ellipse(cx, y + ry, w, ry * 2, outline),
    ];
  }
  return [generator.path(roundedRectPath(x, y, w, h, 12), o)];
}

const toD = (points: [number, number][]) =>
  points.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");

export function ArchitectureDiagram() {
  const { ref, inView } = useSketchTarget<HTMLDivElement>(0.3);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = nodes.find((n) => n.id === activeId);

  const edgeDrawables = useMemo(
    () =>
      edges.map((e, i) =>
        arrowDrawables(e.points, { seed: 100 + i, stroke: "var(--muted)", strokeWidth: 1.4, roughness: 0.9 }, { headSize: 9 }),
      ),
    [],
  );

  const nodeDrawn = useMemo(
    () => nodes.map((n, i) => nodeDrawables(n, 200 + i, n.id === activeId)),
    [activeId],
  );

  return (
    <div ref={ref} className={`sketch-animate${inView ? " is-drawn" : ""}`}>
      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <svg viewBox="0 55 1000 425" className="w-full min-w-180" role="img" aria-label={`System diagram: ${architecture.title}`}>
          {/* Edges */}
          {edges.map((e, i) => (
            <g key={i}>
              <RoughPaths drawables={edgeDrawables[i]} delay={700 + i * 90} />
              {e.label && e.labelAt && (
                <text
                  x={e.labelAt[0]}
                  y={e.labelAt[1]}
                  textAnchor="middle"
                  className="fade-node fill-muted font-hand text-[12px]"
                  style={{ "--delay": `${900 + i * 90}ms` } as React.CSSProperties}
                >
                  {e.label}
                </text>
              )}
            </g>
          ))}

          {/* Request packets */}
          {edges.flatMap((e, i) =>
            e.flow
              ? [0, 1].map((k) => (
                  <circle
                    key={`${i}-${k}`}
                    r={3.5}
                    className="packet fill-primary"
                    style={
                      {
                        offsetPath: `path("${toD(e.points)}")`,
                        "--delay": `${(i * 0.35 + k * 1.2).toFixed(2)}s`,
                        "--dur": "2.4s",
                      } as React.CSSProperties
                    }
                  />
                ))
              : [],
          )}

          {/* Nodes */}
          {nodes.map((n, i) => (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${n.label}: ${n.info}`}
              aria-pressed={n.id === activeId}
              className="cursor-pointer outline-none"
              onMouseEnter={() => setActiveId(n.id)}
              onFocus={() => setActiveId(n.id)}
              onClick={() => setActiveId(n.id)}
            >
              <RoughPaths drawables={nodeDrawn[i]} delay={i * 90} />
              {/* Opaque label plate keeps text readable over the hachure fill */}
              <rect
                x={n.x + n.w / 2 - 52}
                y={n.y + n.h / 2 - 20}
                width={104}
                height={n.sub ? 40 : 26}
                rx={6}
                className="fade-node fill-canvas"
                style={{ "--delay": `${i * 90 + 300}ms`, fillOpacity: 0.85 } as React.CSSProperties}
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 - (n.sub ? 2 : -4)}
                textAnchor="middle"
                className="fade-node fill-text font-hand text-[17px]"
                style={{ "--delay": `${i * 90 + 300}ms` } as React.CSSProperties}
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + 14}
                  textAnchor="middle"
                  className="fade-node fill-muted font-sans text-[11px]"
                  style={{ "--delay": `${i * 90 + 300}ms` } as React.CSSProperties}
                >
                  {n.sub}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <p aria-live="polite" className="mt-4 min-h-14 rounded-lg border border-dashed border-frame px-4 py-3 text-sm">
        {active ? (
          <>
            <span className="font-hand text-base text-primary">{active.label}: </span>
            {active.info}
          </>
        ) : (
          <span className="font-hand text-base text-muted">↑ hover or tap any box to see what it does</span>
        )}
      </p>
    </div>
  );
}
