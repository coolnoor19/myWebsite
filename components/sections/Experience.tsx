import { experience } from "@/content/experience";
import { accentVar } from "@/content/types";
import { SketchArrow } from "@/components/sketch/SketchArrow";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Frame } from "./Frame";

export function Experience() {
  return (
    <Frame id="experience" index={6} title="Experience" accent="var(--violet)">
      <ol className="max-w-3xl">
        {experience.map((job, i) => {
          const color = accentVar[job.accent];
          return (
            <li key={`${job.company}-${job.period}`}>
              <div className="grid gap-3 sm:grid-cols-[150px_1fr] sm:gap-6">
                <p className="pt-5 font-hand text-lg" style={{ color }}>
                  {job.period}
                </p>
                <SketchBox stroke={color} seed={90 + i} animate className="p-5">
                  <h3 className="font-hand text-xl">{job.role}</h3>
                  <p className="text-sm text-muted">{job.company}</p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span aria-hidden className="text-muted">–</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </SketchBox>
              </div>
              {i < experience.length - 1 && (
                <div className="py-2 pl-[calc(150px+1.5rem+2rem)] max-sm:pl-8">
                  <SketchArrow width={40} height={44} points={[[20, 2], [8, 22], [20, 40]]} seed={95 + i} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </Frame>
  );
}
