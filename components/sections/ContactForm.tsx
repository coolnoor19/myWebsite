"use client";

import { profile } from "@/content/profile";
import { SketchBox } from "@/components/sketch/SketchBox";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-island-border bg-island px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-primary";

/** No backend: composes an email in the visitor's mail client. */
export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Hello from ${name || "your website"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <SketchBox as="form" onSubmit={onSubmit} fill="var(--note)" fillStyle="solid" stroke="var(--amber)" seed={120} radius={4} className="-rotate-1 space-y-4 p-6 sm:p-8">
      <p className="font-hand text-2xl">Leave a note</p>
      <label className="block text-sm">
        Your name
        <input name="name" required autoComplete="name" className={fieldClass} placeholder="Ada Lovelace" />
      </label>
      <label className="block text-sm">
        Message
        <textarea name="message" required rows={4} className={fieldClass} placeholder="We're building something that needs to scale…" />
      </label>
      <SketchBox as="button" type="submit" fill="var(--primary-soft)" fillStyle="solid" stroke="var(--primary)" seed={121} className="px-5 py-2 font-hand text-lg text-primary">
        Send ✎
      </SketchBox>
    </SketchBox>
  );
}
