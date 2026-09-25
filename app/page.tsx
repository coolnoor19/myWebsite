import { HelpDialog } from "@/components/chrome/HelpDialog";
import { MainMenu } from "@/components/chrome/MainMenu";
import { Toolbar } from "@/components/chrome/Toolbar";
import { TopRight } from "@/components/chrome/TopRight";
import { ZoomControls } from "@/components/chrome/ZoomControls";
import { About } from "@/components/sections/About";
import { Architecture } from "@/components/sections/Architecture";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Frame } from "@/components/sections/Frame";
import { Hero } from "@/components/sections/Hero";
import { ProjectsBoard } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";

export default function Home() {
  return (
    <>
      <MainMenu />
      <Toolbar />
      <TopRight />
      <ZoomControls />
      <HelpDialog />

      <main>
        <Hero />
        <About />
        <Stack />
        <Architecture />
        <Frame
          id="projects"
          index={5}
          title="Selected projects"
          accent="var(--amber)"
          kicker="Click a card to open its details — the problem, what I built, and what changed."
        >
          <ProjectsBoard />
        </Frame>
        <Experience />
        <Contact />
      </main>

      <footer className="px-4 pt-4 pb-24 text-center font-hand text-sm text-muted sm:pb-10">
        sketched with rough.js · Virgil font by Excalidraw · © {new Date().getFullYear()}
      </footer>
    </>
  );
}
