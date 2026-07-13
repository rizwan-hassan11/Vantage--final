"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { QUOTE_PAGE, SERVICES } from "@/lib/content";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  quantity: string;
  deadline: string;
  details: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  quantity: "",
  deadline: "",
  details: "",
};

const fieldClass = "form-field";
const labelClass = "form-label";

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company || "—"}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service || "Not specified"}`,
      `Quantity: ${form.quantity || "—"}`,
      `Deadline: ${form.deadline || "—"}`,
      "",
      "Project details:",
      form.details,
    ].join("\n");

    const mailto = `mailto:${QUOTE_PAGE.email}?subject=${encodeURIComponent(
      `Quote Request — ${form.company || form.name}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rust-block-strong on-rust text-center py-12 sm:py-16 px-6">
        <p className="tag-caps text-white/70 mb-4">Request sent</p>
        <h2 className="font-serif italic text-2xl sm:text-3xl text-white mb-4">
          Thank you, {form.name.split(" ")[0]}.
        </h2>
        <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
          Your email client should open with your brief pre-filled. Send it to
          complete the request — our team responds within one business day.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={QUOTE_PAGE.phoneHref} className="btn-pill btn-pill-inverse">
            Call {QUOTE_PAGE.phone}
          </a>
          <a href="/contact" className="btn-pill btn-pill-outline border-white/40 text-white hover:bg-white hover:text-[color:var(--color-ink)]">
            Contact page
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label htmlFor="quote-name" className={labelClass}>
            Full name *
          </label>
          <input
            id="quote-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="quote-company" className={labelClass}>
            Company
          </label>
          <input
            id="quote-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={fieldClass}
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label htmlFor="quote-email" className={labelClass}>
            Email *
          </label>
          <input
            id="quote-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="quote-phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="quote-phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClass}
            placeholder="+92 ..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-service" className={labelClass}>
          Service
        </label>
        <select
          id="quote-service"
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          className={`${fieldClass} appearance-none cursor-pointer`}
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other">Other / Not sure</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label htmlFor="quote-quantity" className={labelClass}>
            Quantity / run size
          </label>
          <input
            id="quote-quantity"
            type="text"
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            className={fieldClass}
            placeholder="e.g. 5,000 units"
          />
        </div>
        <div>
          <label htmlFor="quote-deadline" className={labelClass}>
            Target deadline
          </label>
          <input
            id="quote-deadline"
            type="text"
            value={form.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            className={fieldClass}
            placeholder="e.g. 15 Aug 2026"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-details" className={labelClass}>
          Project details *
        </label>
        <textarea
          id="quote-details"
          required
          rows={5}
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
          className={`${fieldClass} resize-y min-h-[140px]`}
          placeholder="Format, size, paper/board, finishing, delivery location — the more detail, the faster we can quote."
        />
      </div>

      <p className="text-xs text-[color:var(--color-mute)] leading-relaxed">
        Attach artwork or spec sheets when your email client opens, or send
        them separately to{" "}
        <a
          href={QUOTE_PAGE.emailHref}
          className="text-[color:var(--color-rust)] hover:underline"
        >
          {QUOTE_PAGE.email}
        </a>
        .
      </p>

      <button type="submit" className="btn-pill btn-pill-rust w-full sm:w-auto">
        Submit quote request
        <ArrowUpRight size={16} strokeWidth={1.6} />
      </button>
    </form>
  );
}
