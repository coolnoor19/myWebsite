import { profile } from "@/content/profile";
import { SketchArrow } from "@/components/sketch/SketchArrow";
import { SketchBox } from "@/components/sketch/SketchBox";
import { SketchUnderline } from "@/components/sketch/SketchUnderline";

function Role() {
  const [before, after] = profile.role.split(profile.roleHighlight);
  if (after === undefined) return <>{profile.role}</>;
  return (
    <>
      {before}
      <SketchBox as="span" shape="ellipse" stroke="var(--red)" strokeWidth={2} seed={11} animate delay={600} className="inline-block px-2">
        {profile.roleHighlight}
      </SketchBox>
      {after}
    </>
  );
}

export function Hero() {
  return (
    <section id="hero" aria-label="Intro" className="relative flex min-h-svh items-center px-4 pt-24 pb-28 sm:px-8">
      {/* Annotation pointing at the toolbar */}
      <div className="absolute top-16 left-1/2 hidden translate-x-6 items-end gap-2 sm:flex">
        <SketchArrow width={70} height={50} points={[[66, 46], [36, 38], [8, 4]]} delay={900} />
        <p className="max-w-40 font-hand text-sm leading-snug text-muted">pick a tool to jump around (or press 1–7)</p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-hand text-xl text-muted sm:text-2xl">Hi, I&apos;m</p>
          <h1 className="mt-2 font-hand text-6xl sm:text-8xl">
            <SketchUnderline strokeWidth={4}>{profile.name}</SketchUnderline>
          </h1>
          <p className="mt-8 font-hand text-2xl sm:text-4xl">
            <Role />
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <SketchBox as="a" href="#projects" fill="var(--primary-soft)" fillStyle="solid" stroke="var(--primary)" seed={4} className="px-5 py-2.5 font-hand text-lg text-primary">
              See my work →
            </SketchBox>
            <SketchBox as="a" href={profile.links.github} target="_blank" rel="noreferrer" seed={5} className="px-5 py-2.5 font-hand text-lg hover:text-primary">
              GitHub
            </SketchBox>
            <SketchBox as="a" href="#contact" seed={6} className="px-5 py-2.5 font-hand text-lg hover:text-primary">
              Say hi
            </SketchBox>
          </div>
        </div>

        {/* Sticky note */}
        <SketchBox fill="var(--note)" fillStyle="solid" stroke="var(--amber)" seed={9} radius={4} className="max-w-sm -rotate-2 p-6 lg:justify-self-end">
          <p className="font-hand text-sm text-muted">currently</p>
          <p className="mt-1 font-hand text-xl">{profile.currently}</p>
          <p className="mt-5 font-hand text-sm text-muted">open to</p>
          <p className="mt-1 font-hand text-xl">{profile.openTo}</p>
        </SketchBox>
      </div>

      <a href="#about" className="absolute bottom-20 left-1/2 -translate-x-1/2 font-hand text-sm text-muted hover:text-text sm:bottom-8">
        scroll ↓
      </a>
    </section>
  );
}
