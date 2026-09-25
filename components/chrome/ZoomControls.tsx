"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";

const MIN = 0.8;
const MAX = 1.3;
const STEP = 0.1;

/** Bottom-left zoom island. Scales the root font size, so every rem-based size follows. */
export function ZoomControls() {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    document.documentElement.style.fontSize = zoom === 1 ? "" : `${zoom * 100}%`;
  }, [zoom]);

  const change = (delta: number) =>
    setZoom((z) => Math.round(Math.min(MAX, Math.max(MIN, z + delta)) * 10) / 10);

  const btn = "grid size-10 place-items-center hover:bg-island-hover disabled:opacity-40";

  return (
    <div
      role="group"
      aria-label="Zoom"
      className="island fixed bottom-3 left-3 z-30 hidden items-center overflow-hidden sm:flex"
    >
      <button type="button" aria-label="Zoom out" className={btn} disabled={zoom <= MIN} onClick={() => change(-STEP)}>
        <Icon name="minus" size={16} />
      </button>
      <button
        type="button"
        aria-label="Reset zoom"
        className="h-10 min-w-14 px-1 text-xs tabular-nums hover:bg-island-hover"
        onClick={() => setZoom(1)}
      >
        {Math.round(zoom * 100)}%
      </button>
      <button type="button" aria-label="Zoom in" className={btn} disabled={zoom >= MAX} onClick={() => change(STEP)}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
