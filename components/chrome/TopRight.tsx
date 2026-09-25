import { profile } from "@/content/profile";
import { Icon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

/** Top-right island: theme toggle + primary "Resume" action (Excalidraw's "Share" spot). */
export function TopRight() {
  return (
    <div className="fixed top-3 right-3 z-30 flex items-center gap-2">
      <ThemeToggle />
      <a
        href={profile.links.resume}
        className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-canvas shadow hover:opacity-90"
      >
        <Icon name="download" size={16} />
        <span className="hidden sm:inline">Resume</span>
      </a>
    </div>
  );
}
