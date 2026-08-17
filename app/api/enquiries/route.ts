import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE = 15 * 1024 * 1024;

function text(formData: FormData, key: string, maxLength = 4_000) {
  return String(formData.get(key) ?? "").trim().slice(0, maxLength);
}

function list(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map(String)
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    if (text(formData, "website", 200)) {
      return NextResponse.json({ ok: true });
    }

    const kind = text(formData, "kind", 20);
    const name = text(formData, "name", 120);
    const company = text(formData, "company", 120);
    const email = text(formData, "email", 254);
    const phone = text(formData, "phone", 80);
    const message = text(formData, "message");

    if (!name || !isEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid name and email address." },
        { status: 400 }
      );
    }
    if (kind === "project" && !phone) {
      return NextResponse.json(
        { error: "Please provide a phone or WhatsApp number." },
        { status: 400 }
      );
    }
    if (kind === "general" && !message) {
      return NextResponse.json(
        { error: "Please write a message." },
        { status: 400 }
      );
    }
    if (kind !== "project" && kind !== "general") {
      return NextResponse.json({ error: "Invalid enquiry type." }, { status: 400 });
    }

    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Please attach no more than ${MAX_FILES} files.` },
        { status: 400 }
      );
    }
    if (files.some((file) => file.size > MAX_FILE_SIZE)) {
      return NextResponse.json(
        { error: "Each attachment must be 5 MB or smaller." },
        { status: 400 }
      );
    }
    if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        { error: "Attachments must total 15 MB or less." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    if (!host || !user || !pass || !from) {
      console.error("Enquiry email is not configured.");
      return NextResponse.json(
        { error: "Online enquiries are temporarily unavailable. Please email info@vantageprinters.com." },
        { status: 503 }
      );
    }

    const projectTypes = list(formData, "projectTypes");
    const startingPoints = list(formData, "startingPoints");
    const quantity = text(formData, "quantity", 120);
    const details = text(formData, "details");
    const body =
      kind === "project"
        ? [
            "New project brief",
            "",
            `Name: ${name}`,
            `Company: ${company || "—"}`,
            `Email: ${email}`,
            `Phone / WhatsApp: ${phone}`,
            "",
            `Creating: ${projectTypes.join(", ") || "—"}`,
            `Estimated quantity: ${quantity || "—"}`,
            `Starting from: ${startingPoints.join(", ") || "—"}`,
            "",
            "Project details:",
            details || "—",
          ].join("\n")
        : [
            "New general enquiry",
            "",
            `Name: ${name}`,
            `Company: ${company || "—"}`,
            `Email: ${email}`,
            `Phone / WhatsApp: ${phone || "—"}`,
            "",
            "Message:",
            message,
          ].join("\n");

    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from,
      to: process.env.ENQUIRY_TO || "info@vantageprinters.com",
      replyTo: cleanHeader(email),
      subject:
        kind === "project"
          ? `Project Brief — ${cleanHeader(company || name)}`
          : `Website Enquiry — ${cleanHeader(company || name)}`,
      text: body,
      attachments: await Promise.all(
        files.map(async (file) => ({
          filename: file.name.replace(/[^\w.\- ()]/g, "_").slice(0, 180),
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type || undefined,
        }))
      ),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to submit website enquiry:", error);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please try again or email info@vantageprinters.com." },
      { status: 500 }
    );
  }
}
