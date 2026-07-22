"use client";

import { useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { QUOTE_PAGE } from "@/lib/content";

const INK_OPTIONS = [
  "CMYK",
  "CMYK + Spot",
  "Black only",
  "Pantone / Spot",
  "Other / TBD",
];

const FINISHING_OPTIONS = [
  "None",
  "Lamination (gloss / matte)",
  "UV / Spot UV",
  "Foil / Emboss",
  "Die-cut",
  "Perfect bind",
  "Saddle stitch",
  "Case bind",
  "Other / TBD",
];

type SpecsState = {
  productType: string;
  quantity: string;
  pageCount: string;
  size: string;
  paperStocks: string;
  inks: string;
  finishing: string;
  projectAbout: string;
};

const initialSpecs: SpecsState = {
  productType: "",
  quantity: "",
  pageCount: "",
  size: "",
  paperStocks: "",
  inks: "",
  finishing: "",
  projectAbout: "",
};

export function PrintSpecsForm() {
  const baseId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasSpecs, setHasSpecs] = useState(true);
  const [specs, setSpecs] = useState<SpecsState>(initialSpecs);
  const [files, setFiles] = useState<File[]>([]);

  const update = (key: keyof SpecsState, value: string) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list)
      .filter((file) => file.type === "application/pdf")
      .slice(0, 2);
    setFiles(next);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const body = [
      `Has print specifications: ${hasSpecs ? "Yes" : "No"}`,
      hasSpecs
        ? [
            `Product Type: ${specs.productType || "—"}`,
            `Quantity: ${specs.quantity || "—"}`,
            `Page Count: ${specs.pageCount || "—"}`,
            `Size: ${specs.size || "—"}`,
            `Paper Stocks: ${specs.paperStocks || "—"}`,
            `Inks: ${specs.inks || "—"}`,
            `Finishing/Bindery: ${specs.finishing || "—"}`,
          ].join("\n")
        : "",
      "",
      "About the project:",
      specs.projectAbout || "—",
      "",
      files.length
        ? `Attachments noted: ${files.map((f) => f.name).join(", ")} (please attach in email)`
        : "Attachments: none",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${QUOTE_PAGE.email}?subject=${encodeURIComponent(
      "Print Quote — Specifications"
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="print-specs">
      <div className="print-specs__toggle-block">
        <h2 className="print-specs__title">
          Already have your print specifications?
        </h2>
        <div className="print-specs__toggle-row">
          <button
            type="button"
            role="switch"
            aria-checked={hasSpecs}
            aria-label="Already have print specifications"
            className={`print-specs__switch${hasSpecs ? " is-on" : ""}`}
            onClick={() => setHasSpecs((v) => !v)}
          >
            <span className="print-specs__switch-knob" />
          </button>
          <span className="print-specs__switch-label">
            {hasSpecs ? "Yes" : "No"}
          </span>
        </div>
        <p className="print-specs__hint">
          Any additional information about your project that you may have would
          help us provide you with the best possible quote.
        </p>
      </div>

      {hasSpecs ? (
        <div className="print-specs__grid">
          <div className="quote-form__field">
            <label htmlFor={`${baseId}-product`} className="quote-form__label">
              Product Type
            </label>
            <input
              id={`${baseId}-product`}
              type="text"
              value={specs.productType}
              onChange={(e) => update("productType", e.target.value)}
              className="quote-form__input"
            />
          </div>
          <div className="quote-form__field">
            <label htmlFor={`${baseId}-qty`} className="quote-form__label">
              Quantity
            </label>
            <input
              id={`${baseId}-qty`}
              type="text"
              value={specs.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              className="quote-form__input"
            />
          </div>

          <div className="quote-form__field">
            <label htmlFor={`${baseId}-pages`} className="quote-form__label">
              Page Count
            </label>
            <input
              id={`${baseId}-pages`}
              type="text"
              value={specs.pageCount}
              onChange={(e) => update("pageCount", e.target.value)}
              className="quote-form__input"
            />
          </div>
          <div className="quote-form__field">
            <label htmlFor={`${baseId}-size`} className="quote-form__label">
              Size
            </label>
            <input
              id={`${baseId}-size`}
              type="text"
              value={specs.size}
              onChange={(e) => update("size", e.target.value)}
              className="quote-form__input"
            />
          </div>

          <div className="quote-form__field">
            <label htmlFor={`${baseId}-stock`} className="quote-form__label">
              Paper Stocks
            </label>
            <input
              id={`${baseId}-stock`}
              type="text"
              value={specs.paperStocks}
              onChange={(e) => update("paperStocks", e.target.value)}
              className="quote-form__input"
            />
          </div>
          <div className="quote-form__field print-specs__select-field">
            <label htmlFor={`${baseId}-inks`} className="quote-form__label">
              Inks
            </label>
            <select
              id={`${baseId}-inks`}
              value={specs.inks}
              onChange={(e) => update("inks", e.target.value)}
              className="quote-form__input print-specs__select"
            >
              <option value="">Select</option>
              {INK_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.75}
              className="print-specs__select-icon"
              aria-hidden
            />
          </div>

          <div className="quote-form__field print-specs__select-field">
            <label
              htmlFor={`${baseId}-finishing`}
              className="quote-form__label"
            >
              Finishing/Bindery
            </label>
            <select
              id={`${baseId}-finishing`}
              value={specs.finishing}
              onChange={(e) => update("finishing", e.target.value)}
              className="quote-form__input print-specs__select"
            >
              <option value="">Select</option>
              {FINISHING_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.75}
              className="print-specs__select-icon"
              aria-hidden
            />
          </div>
        </div>
      ) : null}

      <div className="print-specs__project">
        <h2 className="print-specs__title">Tell us about your project</h2>
        <textarea
          id={`${baseId}-about`}
          rows={6}
          value={specs.projectAbout}
          onChange={(e) => update("projectAbout", e.target.value)}
          className="print-specs__textarea"
          aria-label="Tell us about your project"
        />
      </div>

      <div className="print-specs__footer">
        <div className="print-specs__attach">
          <div className="print-specs__attach-copy">
            <p className="print-specs__attach-title">Attachments (Optional)</p>
            <p className="print-specs__attach-note">
              Max. 2 PDFs, less than 25MB each
              {files.length
                ? ` — ${files.map((f) => f.name).join(", ")}`
                : ""}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            type="button"
            className="print-specs__select-files"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Files
          </button>
        </div>

        <button type="submit" className="print-specs__submit">
          Get a Quote
        </button>
      </div>
    </form>
  );
}
