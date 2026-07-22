"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { QUOTE_PAGE } from "@/lib/content";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  city: string;
  province: string;
  country: string;
  phone: string;
  details: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  city: "",
  province: "",
  country: "",
  phone: "",
  details: "",
};

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const fullName = [form.firstName, form.lastName].filter(Boolean).join(" ");

    const body = [
      `Name: ${fullName}`,
      `Company: ${form.company || "—"}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `City: ${form.city || "—"}`,
      `Province/State: ${form.province || "—"}`,
      `Country: ${form.country || "—"}`,
      "",
      "Project details:",
      form.details || "—",
    ].join("\n");

    const mailto = `mailto:${QUOTE_PAGE.email}?subject=${encodeURIComponent(
      `Quote Request — ${form.company || fullName}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quote-form quote-form--success">
        <p className="quote-form__eyebrow">Request sent</p>
        <h2 className="quote-form__thanks">
          Thank you, {form.firstName || "there"}.
        </h2>
        <p className="quote-form__note">
          Your email client should open with your brief pre-filled. Send it to
          complete the request — our team responds within one business day.
        </p>
        <a href={QUOTE_PAGE.phoneHref} className="btn-pill btn-pill-rust">
          Call {QUOTE_PAGE.phone}
          <ArrowUpRight size={16} strokeWidth={1.6} />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="quote-form" noValidate={false}>
      <div className="quote-form__grid">
        <div className="quote-form__field">
          <label htmlFor="quote-first-name" className="quote-form__label">
            First Name
          </label>
          <input
            id="quote-first-name"
            type="text"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className="quote-form__input"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="quote-last-name" className="quote-form__label">
            Last Name
          </label>
          <input
            id="quote-last-name"
            type="text"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className="quote-form__input"
          />
        </div>

        <div className="quote-form__field">
          <label htmlFor="quote-email" className="quote-form__label">
            Email
          </label>
          <input
            id="quote-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="quote-form__input"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="quote-company" className="quote-form__label">
            Company
          </label>
          <input
            id="quote-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="quote-form__input"
          />
        </div>

        <div className="quote-form__field">
          <label htmlFor="quote-city" className="quote-form__label">
            City
          </label>
          <input
            id="quote-city"
            type="text"
            autoComplete="address-level2"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="quote-form__input"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="quote-province" className="quote-form__label">
            Province/State
          </label>
          <input
            id="quote-province"
            type="text"
            autoComplete="address-level1"
            value={form.province}
            onChange={(e) => update("province", e.target.value)}
            className="quote-form__input"
          />
        </div>

        <div className="quote-form__field">
          <label htmlFor="quote-country" className="quote-form__label">
            Country
          </label>
          <input
            id="quote-country"
            type="text"
            autoComplete="country-name"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            className="quote-form__input"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="quote-phone" className="quote-form__label">
            Phone
          </label>
          <input
            id="quote-phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="quote-form__input"
          />
        </div>

        <div className="quote-form__field quote-form__field--full">
          <label htmlFor="quote-details" className="quote-form__label">
            Project details
          </label>
          <textarea
            id="quote-details"
            rows={3}
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
            className="quote-form__input quote-form__textarea"
          />
        </div>
      </div>

      <div className="quote-form__actions">
        <button type="submit" className="btn-pill btn-pill-rust">
          Submit quote request
          <ArrowUpRight size={16} strokeWidth={1.6} />
        </button>
      </div>
    </form>
  );
}
