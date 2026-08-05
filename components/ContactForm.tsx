"use client";

import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = "Name is required.";
    if (!formData.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) next.subject = "Subject is required.";
    if (!formData.message.trim()) next.message = "Message is required.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-200 outline-none transition-colors duration-200 focus:border-zinc-700";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className={inputClasses}
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-2 text-sm text-rose-400">{errors.name}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={inputClasses}
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isSubmitting}
        />
        {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className={inputClasses}
          placeholder="What’s this about?"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          disabled={isSubmitting}
        />
        {errors.subject && <p className="mt-2 text-sm text-rose-400">{errors.subject}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          maxLength={1000}
          className="h-40 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 outline-none transition-colors duration-200 focus:border-zinc-700"
          placeholder="Tell me what you’re thinking..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={isSubmitting}
        />
        <div className="mt-2 flex items-center justify-between">
          <div>
            {errors.message && <p className="text-sm text-rose-400">{errors.message}</p>}
          </div>
          <p className="text-xs text-zinc-600">{formData.message.length}/1000</p>
        </div>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d7ff54] px-6 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_36px_rgba(215,255,84,0.22)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>

        {status === "success" && (
          <div className="mt-4 rounded-xl border border-[#d7ff54]/20 bg-[#d7ff54]/10 p-4 text-sm text-[#d7ff54] animate-fade-in-up">
            ✓ Message sent successfully. I’ll get back to you as soon as I can.
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-400 animate-fade-in-up">
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </form>
  );
}
