"use client";
import { useRef, useState, type FormEvent } from "react";
import { contact, FORM_ENDPOINT } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = { kind: "idle" | "sending" | "success" | "error" | "mailto"; text?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact form.
 * - With NEXT_PUBLIC_FORM_ENDPOINT set: POSTs JSON to that endpoint (Formspree, Getform, etc.).
 * - Without it: validates, then opens the visitor's mail app with a pre-filled message (mailto fallback).
 * Spam protection: hidden honeypot field + minimum time-on-page before submit.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const started = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (d: FormData): Errors => {
    const e: Errors = {};
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const message = String(d.get("message") || "").trim();
    if (name.length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";
    if (message.length < 10) e.message = "Please write a message of at least 10 characters.";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const d = new FormData(form);
    const e = validate(d);
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus({ kind: "error", text: "Please check the highlighted fields." });
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    // Honeypot / too-fast submissions are silently accepted and dropped.
    if (d.get("company") || Date.now() - started.current < 2500) {
      setStatus({ kind: "success", text: "Thank you — your message has been sent." });
      return;
    }

    const payload = {
      name: String(d.get("name")).trim(),
      email: String(d.get("email")).trim(),
      subject: String(d.get("subject") || "").trim() || "Portfolio enquiry",
      message: String(d.get("message")).trim(),
    };

    if (!FORM_ENDPOINT) {
      const body = `${payload.message}\n\n— ${payload.name} (${payload.email})`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "mailto", text: `Your email app should open with the message ready to send. If it doesn’t, write to ${contact.email}.` });
      return;
    }

    setStatus({ kind: "sending", text: "Sending…" });
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _replyto: payload.email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      formRef.current?.reset();
      setStatus({ kind: "success", text: "Thank you — your message has been sent. Reda will get back to you soon." });
    } catch {
      setStatus({ kind: "error", text: `Something went wrong sending your message. Please email ${contact.email} directly.` });
    }
  };

  const field = (name: keyof Errors) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
    onInput: () => errors[name] && setErrors((x) => ({ ...x, [name]: undefined })),
  });

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby="form-status">
      <div className="form__row">
        <label htmlFor="f-name" className="label">Name</label>
        <input type="text" autoComplete="name" required {...field("name")} />
        {errors.name && <p className="form__err" id="f-name-err">{errors.name}</p>}
      </div>
      <div className="form__row">
        <label htmlFor="f-email" className="label">Email</label>
        <input type="email" autoComplete="email" inputMode="email" required {...field("email")} />
        {errors.email && <p className="form__err" id="f-email-err">{errors.email}</p>}
      </div>
      <div className="form__row">
        <label htmlFor="f-subject" className="label">Subject <span className="form__opt">(optional)</span></label>
        <input type="text" id="f-subject" name="subject" />
      </div>
      <div className="form__row">
        <label htmlFor="f-message" className="label">Message</label>
        <textarea rows={5} required {...field("message")} />
        {errors.message && <p className="form__err" id="f-message-err">{errors.message}</p>}
      </div>
      <div className="form__hp" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input type="text" id="f-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form__foot">
        <button type="submit" className="btn btn--accent" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
        </button>
        <p id="form-status" className={`form__status form__status--${status.kind}`} role="status" aria-live="polite">{status.text}</p>
      </div>
    </form>
  );
}
