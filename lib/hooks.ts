"use client";

import { useEffect, useRef, useState } from "react";

/** Tracks an element's border-box size and whether it has entered the viewport (once). */
export function useSketchTarget<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize?.[0];
      const width = Math.round(box ? box.inlineSize : entry.contentRect.width);
      const height = Math.round(box ? box.blockSize : entry.contentRect.height);
      setSize((s) => (s.width === width && s.height === height ? s : { width, height }));
    });
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [threshold]);

  return { ref, size, inView };
}
