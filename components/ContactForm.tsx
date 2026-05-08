"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle, Send } from "lucide-react";

type FormState = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-[#1a2c22] placeholder:text-[#aab8b0] outline-none focus:ring-2 focus:ring-[#4a7255]/30 focus:border-[#4a7255] transition-all";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [status, setStatus] = useState<FormState>("idle");

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on type
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="rounded-[32px] bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl p-8 md:p-10 flex flex-col items-center justify-center gap-5 min-h-[360px] text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4a7255]/10">
          <CheckCircle className="h-10 w-10 text-[#4a7255]" />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-[#1a2c22]">
            Message Sent! 🌿
          </h3>
          <p className="mt-3 text-[#5c6e64] leading-relaxed">
            Thanks for reaching out! We&apos;ve sent a confirmation to your
            email and will get back to you within 24 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-[#1a2c22]/20 px-6 py-2.5 text-sm font-semibold text-[#1a2c22] hover:bg-[#1a2c22] hover:text-white transition-all"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form state ───────────────────────────────────────────────────────────
  return (
    <div className="rounded-[32px] bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl p-8 md:p-10">
      <h3 className="text-xl font-bold text-[#1a2c22] mb-6">Send a Message</h3>

      {status === "error" && (
        <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-600">
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
            >
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
          >
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us anything…"
            className={`${inputClass} resize-none`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="contact-submit-btn"
          disabled={status === "sending"}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1a2c22] py-3 font-bold text-white hover:bg-[#4a7255] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
