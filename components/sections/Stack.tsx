import { stack } from "@/content/stack";
import { accentVar } from "@/content/types";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Frame } from "./Frame";

export function Stack() {
  return (
    <Frame
      id="stack"
      index={3}
      title="Tech stack"
      accent="var(--blue)"
      kicker="The tools I reach for — though the problem picks the tool, not the other way round."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => (
          <SketchBox as="li" key={group.title} stroke={accentVar[group.accent]} seed={40 + i} animate delay={i * 120} className="p-6">
            <h3 className="font-hand text-xl" style={{ color: accentVar[group.accent] }}>
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-island-border bg-island px-3 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </SketchBox>
        ))}
        <li className="grid place-items-center rounded-2xl border-2 border-dashed border-frame p-6 text-center font-hand text-lg text-muted">
          + whatever the problem needs next
        </li>
      </ul>
    </Frame>
  );
}
