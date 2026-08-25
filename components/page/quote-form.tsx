"use client";

import { useRef, useState } from "react";

const PROJECT_TYPES = [
  "Cosmetics Packaging",
  "Perfume Packaging",
  "Pharmaceutical Packaging",
  "Home Textile Packaging",
  "Product / Gift Box",
  "Labels & Sleeves",
  "Annual Reports",
  "Books & Publications",
  "Brochures & Catalogues",
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
  const honeypotInput = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef(0);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [startingPoints, setStartingPoints] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");
  const markFormStarted = () => {
    if (!startedAtRef.current) startedAtRef.current = Date.now();
  };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    const formData = new FormData();
    formData.set("kind", "project");
    formData.set("name", name);
    formData.set("company", company);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("quantity", quantity);
    formData.set("details", details);
    formData.set("website", honeypotInput.current?.value || "");
    formData.set("startedAt", String(startedAtRef.current));
    projectTypes.forEach((value) => formData.append("projectTypes", value));
    startingPoints.forEach((value) => formData.append("startingPoints", value));
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "X-Vantage-Form": "enquiry-v1" },
        body: formData,
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "We could not send your project brief.");
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "We could not send your project brief. Please try again."
      );
    }
  };

  return (
    <form
      className="project-brief"
      onSubmit={handleSubmit}
      onFocusCapture={markFormStarted}
      onPointerDownCapture={markFormStarted}
    >
      <input
        ref={honeypotInput}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px" }}
      />
      <fieldset className="project-brief__column">
        <legend className="project-brief__legend">
          What are you creating?
        </legend>
        <div className="project-brief__checks">
          {PROJECT_TYPES.map((item) => (
            <label className="project-check" key={item}>
              <input
                name="projectTypes"
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
            name="quantity"
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
                name="startingPoints"
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
            name="files"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp,.tif,.tiff,.psd,.ai,.eps,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            onChange={(event) => {
              const selected = Array.from(event.target.files ?? []).slice(0, 5);
              const oversized = selected.find((file) => file.size > 5 * 1024 * 1024);
              if (oversized) {
                event.target.value = "";
                setFiles([]);
                setStatus("error");
                setStatusMessage("Each attachment must be 5 MB or smaller.");
                return;
              }
              setFiles(selected);
              setStatus("idle");
              setStatusMessage("");
            }}
          />
          <button type="button" onClick={() => fileInput.current?.click()}>
            {files.length
              ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
              : "Attach Files"}
          </button>
        </div>

        <textarea
          name="details"
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
            name="name"
            required
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            aria-label="Name"
          />
          <input
            name="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company"
            aria-label="Company"
          />
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            aria-label="Email"
          />
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone / WhatsApp"
            aria-label="Phone or WhatsApp"
          />
        </div>

        <button
          className="project-brief__submit"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send Project Brief"}{" "}
          <span aria-hidden>→</span>
        </button>
        <p className="project-brief__response" aria-live="polite">
          {status === "error"
            ? statusMessage
            : "We normally respond within one working day."}
        </p>

        <div
          className={`project-brief__thanks${status === "success" ? " is-submitted" : ""}`}
          hidden={status !== "success"}
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
