"use client";

import { useState } from "react";

export function GeneralEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState(
    "We aim to respond within one working day."
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("Sending your message…");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("kind", "general");
      const response = await fetch("/api/enquiries", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "We could not send your message.");
      }
      form.reset();
      setStatus("success");
      setMessage("Thank you. Your message has been sent.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send your message. Please try again."
      );
    }
  }

  return (
    <form className="project-contact__enquiry" onSubmit={handleSubmit}>
      <fieldset disabled={status === "submitting"}>
        <legend>General Enquiry</legend>
        <label className="sr-only" htmlFor="enquiry-name">
          Name
        </label>
        <input id="enquiry-name" name="name" placeholder="Name" required />
        <label className="sr-only" htmlFor="enquiry-company">
          Company
        </label>
        <input id="enquiry-company" name="company" placeholder="Company" />
        <label className="sr-only" htmlFor="enquiry-email">
          Email
        </label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <label className="sr-only" htmlFor="enquiry-phone">
          Phone / WhatsApp
        </label>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          placeholder="Phone / WhatsApp"
        />
      </fieldset>
      <fieldset className="project-contact__message" disabled={status === "submitting"}>
        <legend>Message</legend>
        <label className="sr-only" htmlFor="enquiry-message">
          Message
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          placeholder="Write a message"
          required
        />
        <button type="submit">
          {status === "submitting" ? "Sending…" : "Send Message"}{" "}
          <span aria-hidden>→</span>
        </button>
        <p aria-live="polite">{message}</p>
      </fieldset>

      <p className="universal-footer__copyright">
        © 2026 Vantage Printers Private Limited. All rights reserved.
      </p>
    </form>
  );
}
