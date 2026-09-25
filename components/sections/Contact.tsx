import { profile } from "@/content/profile";
import { Icon, type IconName } from "@/components/chrome/icons";
import { SketchArrow } from "@/components/sketch/SketchArrow";
import { ContactForm } from "./ContactForm";
import { Frame } from "./Frame";

const links: { label: string; value: string; href: string; icon: IconName }[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: "mail" },
  { label: "GitHub", value: profile.links.github.replace(/^https?:\/\/(www\.)?/, ""), href: profile.links.github, icon: "github" },
  { label: "LinkedIn", value: profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.links.linkedin, icon: "linkedin" },
  { label: "Resume", value: "Download PDF", href: profile.links.resume, icon: "download" },
];

export function Contact() {
  return (
    <Frame
      id="contact"
      index={7}
      title="Let's build something"
      accent="var(--red)"
      kicker="Have a system that needs to scale, or an AI feature that needs to be production-grade? I'd love to hear about it."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <ContactForm />
        <div>
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="island flex items-center gap-4 px-4 py-3 hover:bg-island-hover"
                >
                  <Icon name={l.icon} />
                  <span>
                    <span className="block text-xs text-muted">{l.label}</span>
                    <span className="text-sm">{l.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-start gap-2">
            <SketchArrow width={60} height={40} points={[[54, 36], [22, 30], [10, 4]]} seed={130} />
            <p className="font-hand text-muted">I usually reply within a day or two</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}
