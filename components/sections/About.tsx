import { profile } from "@/content/profile";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Frame } from "./Frame";

export function About() {
  return (
    <Frame id="about" index={2} title="About me" accent="var(--amber)">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <SketchBox fill="var(--note)" fillStyle="solid" stroke="var(--amber)" seed={21} radius={4} animate className="-rotate-1 p-7">
          {profile.about.map((p) => (
            <p key={p} className="mb-4 leading-relaxed last:mb-0">
              {p}
            </p>
          ))}
        </SketchBox>

        <div>
          <h3 className="font-hand text-2xl">How I work</h3>
          <ul className="mt-4 space-y-3">
            {profile.principles.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span aria-hidden className="font-hand text-xl leading-none text-green">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-3">
        {profile.stats.map((s, i) => (
          <SketchBox as="li" key={s.label} seed={30 + i} animate delay={i * 150} className="p-5 text-center">
            <p className="font-hand text-4xl text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </SketchBox>
        ))}
      </ul>
    </Frame>
  );
}
