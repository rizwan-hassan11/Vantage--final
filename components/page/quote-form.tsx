"use client";

import { useRef, useState } from "react";
import { QUOTE_PAGE } from "@/lib/content";

const PROJECT_TYPES = [
  "Cosmetics Packaging",
  "Perfume Packaging",
  "Pharmaceutical Packaging",
  "Home Textile Packaging",
  "Rigid Box",
  "Labels / Sleeves",
  "Annual Report",
  "Book / Publication",
  "Brochure / Catalogue",
  "Something Else",
] as const;

const STARTING_POINTS = [
  "I have production-ready artwork",
  "I have an existing sample",
  "I have a design or concept",
  "I need Vantage to help shape the idea",
] as const;

export function QuoteForm() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [startingPoints, setStartingPoints] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (
    value: string,
    values: string[],
    setValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setValues(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${name}`,
      `Company: ${company || "—"}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      "",
      `Creating: ${projectTypes.join(", ") || "—"}`,
      `Estimated quantity: ${quantity || "—"}`,
      `Starting from: ${startingPoints.join(", ") || "—"}`,
      `Files selected: ${files.map((file) => file.name).join(", ") || "None"}`,
      "",
      "Project details:",
      details || "—",
    ].join("\n");

    window.location.href = `mailto:${QUOTE_PAGE.email}?subject=${encodeURIComponent(
      `Project Brief — ${company || name}`
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <form className="project-brief" onSubmit={handleSubmit}>
      <fieldset className="project-brief__column">
        <legend className="project-brief__legend">
          What are you creating?
        </legend>
        <div className="project-brief__checks">
          {PROJECT_TYPES.map((item) => (
            <label className="project-check" key={item}>
              <input
                type="checkbox"
                checked={projectTypes.includes(item)}
                onChange={() => toggle(item, projectTypes, setProjectTypes)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <label className="project-brief__quantity">
          <span>Estimated quantity</span>
          <input
            type="text"
            inputMode="numeric"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
      </fieldset>

      <fieldset className="project-brief__column">
        <legend className="project-brief__legend">
          Where are you starting from?
        </legend>
        <div className="project-brief__checks project-brief__checks--starting">
          {STARTING_POINTS.map((item) => (
            <label className="project-check" key={item}>
              <input
                type="checkbox"
                checked={startingPoints.includes(item)}
                onChange={() =>
                  toggle(item, startingPoints, setStartingPoints)
                }
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="project-brief__upload">
          <span>Upload artwork, photographs or references</span>
          <input
            ref={fileInput}
            className="sr-only"
            type="file"
            multiple
            onChange={(event) =>
              setFiles(Array.from(event.target.files ?? []).slice(0, 5))
            }
          />
          <button type="button" onClick={() => fileInput.current?.click()}>
            {files.length
              ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
              : "Attach Files"}
          </button>
        </div>

        <textarea
          className="project-brief__details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Tell us anything useful about the project"
          aria-label="Project details"
        />
      </fieldset>

      <fieldset className="project-brief__column project-brief__column--contact">
        <legend className="project-brief__legend">How can we reach you?</legend>
        <div className="project-brief__fields">
          <input
            required
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            aria-label="Name"
          />
          <input
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company"
            aria-label="Company"
          />
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            aria-label="Email"
          />
          <input
            required
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone/Whatsapp"
            aria-label="Phone or WhatsApp"
          />
        </div>

        <button className="project-brief__submit" type="submit">
          Send Project Brief <span aria-hidden>→</span>
        </button>
        <p className="project-brief__response">
          We normally respond within one working day.
        </p>

        <div
          className={`project-brief__thanks${submitted ? " is-submitted" : ""}`}
          hidden={!submitted}
          aria-live="polite"
        >
          <h2>Thank you.</h2>
          <p>Your project brief is with us.</p>
          <p>We&apos;ll review the details and get back to you within one working day.</p>
        </div>
      </fieldset>
    </form>
  );
}
