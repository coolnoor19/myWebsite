import { architecture } from "@/content/architecture";
import { SketchBox } from "@/components/sketch/SketchBox";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Frame } from "./Frame";

export function Architecture() {
  return (
    <Frame
      id="architecture"
      index={4}
      title="How I design systems"
      accent="var(--green)"
      kicker={
        <>
          A simplified sketch of <span className="text-text">{architecture.title}</span> — the kind of
          system I build: async where it can be, cached where it counts, observable everywhere.
        </>
      }
    >
      <ArchitectureDiagram />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <ol className="space-y-4">
          {architecture.steps.map((step, i) => (
            <li key={step} className="flex gap-4">
              <SketchBox shape="ellipse" stroke="var(--green)" seed={60 + i} className="grid size-8 shrink-0 place-items-center font-hand">
                {i + 1}
              </SketchBox>
              <p className="pt-1 text-muted">{step}</p>
            </li>
          ))}
        </ol>
        <ul className="grid grid-cols-3 gap-3 self-start">
          {architecture.metrics.map((m, i) => (
            <SketchBox as="li" key={m.label} seed={70 + i} animate delay={i * 150} className="p-3 text-center">
              <p className="font-hand text-2xl text-green">{m.value}</p>
              <p className="mt-1 text-xs text-muted">{m.label}</p>
            </SketchBox>
          ))}
        </ul>
      </div>
    </Frame>
  );
}
