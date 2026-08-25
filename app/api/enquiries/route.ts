import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE = 15 * 1024 * 1024;
const MAX_REQUEST_SIZE = 16 * 1024 * 1024;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MIN_FORM_AGE_MS = 1_500;
const MAX_FORM_AGE_MS = 6 * 60 * 60 * 1000;

type RateBucket = { count: number; resetAt: number };

const globalRateLimit = globalThis as typeof globalThis & {
  vantageEnquiryRateLimit?: Map<string, RateBucket>;
};
const memoryRateLimit =
  globalRateLimit.vantageEnquiryRateLimit ?? new Map<string, RateBucket>();
globalRateLimit.vantageEnquiryRateLimit = memoryRateLimit;

const FILE_RULES: Record<string, readonly string[]> = {
  pdf: ["pdf"],
  jpg: ["jpeg"],
  jpeg: ["jpeg"],
  png: ["png"],
  webp: ["webp"],
  tif: ["tiff"],
  tiff: ["tiff"],
  psd: ["psd"],
  ai: ["pdf", "postscript"],
  eps: ["postscript"],
  doc: ["ole"],
  xls: ["ole"],
  ppt: ["ole"],
  docx: ["zip"],
  xlsx: ["zip"],
  pptx: ["zip"],
};

const ALLOWED_MIME_TYPES = new Set([
  "application/octet-stream",
  "application/pdf",
  "application/postscript",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/tiff",
  "image/vnd.adobe.photoshop",
]);

function requestOriginIsAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const allowed = new Set<string>([new URL(request.url).origin]);
  for (const configured of [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ]) {
    if (!configured) continue;
    const url = configured.startsWith("http") ? configured : `https://${configured}`;
    try {
      allowed.add(new URL(url).origin);
    } catch {
      // Ignore malformed optional environment values.
    }
  }

  try {
    return allowed.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function memoryRateLimitResult(ip: string) {
  const now = Date.now();
  const current = memoryRateLimit.get(ip);
  const bucket =
    !current || current.resetAt <= now
      ? { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS }
      : { ...current, count: current.count + 1 };
  memoryRateLimit.set(ip, bucket);

  if (memoryRateLimit.size > 500) {
    for (const [key, value] of memoryRateLimit) {
      if (value.resetAt <= now) memoryRateLimit.delete(key);
    }
  }

  return {
    allowed: bucket.count <= RATE_LIMIT_MAX,
    retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

async function rateLimitResult(ip: string) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return memoryRateLimitResult(ip);

  const windowSeconds = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
  const key = `vantage:enquiry:${ip}:${Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS)}`;
  try {
    const response = await fetch(`${redisUrl}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, windowSeconds],
      ]),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Rate-limit store unavailable.");
    const result = (await response.json()) as Array<{ result?: number }>;
    const count = Number(result[0]?.result ?? 1);
    return {
      allowed: count <= RATE_LIMIT_MAX,
      retryAfter: windowSeconds,
    };
  } catch (error) {
    console.error("Persistent enquiry rate limit failed:", error);
    return memoryRateLimitResult(ip);
  }
}

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

function detectFileKind(bytes: Uint8Array) {
  const ascii = new TextDecoder("latin1").decode(bytes);
  if (ascii.startsWith("%PDF-")) return "pdf";
  if (ascii.startsWith("%!PS")) return "postscript";
  if (ascii.startsWith("8BPS")) return "psd";
  if (
    ascii.startsWith("RIFF") &&
    ascii.slice(8, 12) === "WEBP"
  ) {
    return "webp";
  }
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "jpeg";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return "png";
  }
  if (
    startsWith(bytes, [0x49, 0x49, 0x2a, 0x00]) ||
    startsWith(bytes, [0x4d, 0x4d, 0x00, 0x2a])
  ) {
    return "tiff";
  }
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04])) return "zip";
  if (startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) {
    return "ole";
  }
  return null;
}

async function fileIsAllowed(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const expectedKinds = FILE_RULES[extension];
  if (!expectedKinds) return false;
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) return false;

  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const detectedKind = detectFileKind(bytes);
  return Boolean(detectedKind && expectedKinds.includes(detectedKind));
}

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
    const contentType = request.headers.get("content-type") || "";
    const contentLength = Number(request.headers.get("content-length") || 0);
    const fetchSite = request.headers.get("sec-fetch-site");
    if (
      request.headers.get("x-vantage-form") !== "enquiry-v1" ||
      !requestOriginIsAllowed(request) ||
      fetchSite === "cross-site"
    ) {
      return NextResponse.json({ error: "Request origin was rejected." }, { status: 403 });
    }
    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      return NextResponse.json({ error: "Unsupported request format." }, { status: 415 });
    }
    if (!Number.isFinite(contentLength) || contentLength <= 0 || contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }

    const rateLimit = await rateLimitResult(clientIp(request));
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many enquiries. Please wait before trying again." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        }
      );
    }

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
    const startedAt = Number(text(formData, "startedAt", 20));
    const formAge = Date.now() - startedAt;

    if (!name || !isEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid name and email address." },
        { status: 400 }
      );
    }
    if (
      !Number.isFinite(startedAt) ||
      formAge < MIN_FORM_AGE_MS ||
      formAge > MAX_FORM_AGE_MS
    ) {
      return NextResponse.json(
        { error: "Please reload the page and try again." },
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
    if (kind !== "project" && files.length > 0) {
      return NextResponse.json(
        { error: "Attachments are only accepted with project briefs." },
        { status: 400 }
      );
    }
    const fileChecks = await Promise.all(files.map(fileIsAllowed));
    if (fileChecks.some((allowed) => !allowed)) {
      return NextResponse.json(
        {
          error:
            "Unsupported attachment. Please use PDF, JPG, PNG, WebP, TIFF, PSD, AI, EPS or Microsoft Office files.",
        },
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
