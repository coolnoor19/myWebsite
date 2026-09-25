"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/content/projects";
import { accentVar } from "@/content/types";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Icon } from "@/components/chrome/icons";

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded-md bg-island-hover px-2 py-0.5 font-mono text-xs text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Excalidraw-style properties panel with a project's details. */
function ProjectPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const color = accentVar[project.accent];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <aside
      role="dialog"
      aria-labelledby="project-panel-title"
      className="island fixed top-16 right-3 bottom-16 z-40 w-[min(420px,calc(100vw-24px))] overflow-y-auto p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 id="project-panel-title" className="font-hand text-2xl" style={{ color }}>
          {project.title}
        </h3>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close project details"
          onClick={onClose}
          className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-island-hover"
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <p className="mt-6 text-xs font-semibold tracking-wide text-muted uppercase">Problem</p>
      <p className="mt-1.5 text-sm leading-relaxed">{project.problem}</p>

      <p className="mt-6 text-xs font-semibold tracking-wide text-muted uppercase">What I built</p>
      <ul className="mt-1.5 space-y-2 text-sm leading-relaxed">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden style={{ color }}>→</span>
            {h}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs font-semibold tracking-wide text-muted uppercase">Impact</p>
      <dl className="mt-2 grid grid-cols-3 gap-2">
        {project.metrics.map((m) => (
          <div key={m.label} className="flex flex-col-reverse rounded-lg border border-island-border p-2 text-center">
            <dt className="text-[11px] text-muted">{m.label}</dt>
            <dd className="font-hand text-xl" style={{ color }}>
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-xs font-semibold tracking-wide text-muted uppercase">Stack</p>
      <div className="mt-2">
        <Tags items={project.stack} />
      </div>

      {project.links && (
        <div className="mt-8 flex gap-3">
          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-island-border px-3 py-1.5 text-sm hover:bg-island-hover">
              <Icon name="github" size={16} /> Code
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-island-border px-3 py-1.5 text-sm hover:bg-island-hover">
              <Icon name="external" size={16} /> Live
            </a>
          )}
        </div>
      )}
    </aside>
  );
}

export function ProjectsBoard() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <ul className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => {
          const color = accentVar[p.accent];
          const isSelected = selected?.slug === p.slug;
          return (
            <li key={p.slug} className={i % 2 ? "md:rotate-[0.6deg]" : "md:-rotate-[0.6deg]"}>
              <SketchBox
                as="button"
                type="button"
                onClick={() => setSelected(p)}
                aria-haspopup="dialog"
                stroke={color}
                strokeWidth={isSelected ? 2.5 : 1.5}
                seed={80 + i}
                animate
                delay={i * 150}
                className="group flex h-full w-full flex-col p-6 text-left"
              >
                <h3 className="font-hand text-2xl" style={{ color }}>
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse">
                      <dt className="text-xs text-muted">{m.label}</dt>
                      <dd className="font-hand text-xl">{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-1 items-end justify-between gap-4">
                  <Tags items={p.stack} />
                  <span className="shrink-0 font-hand text-sm text-muted group-hover:text-text">details →</span>
                </div>
              </SketchBox>
            </li>
          );
        })}
      </ul>
      {selected && <ProjectPanel project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
