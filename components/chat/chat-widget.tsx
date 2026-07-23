"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react";
import { COMPANY, SERVICES, PORTFOLIO } from "@/lib/content";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  content: string;
  time: number;
  suggestions?: string[];
  cta?: { label: string; href: string };
};

const GREETING_SUGGESTIONS = [
  "What services do you offer?",
  "Show me your portfolio",
  "Request a quote",
  "How do I contact you?",
];

/**
 * Lightweight keyword-based reply engine. Fully client-side, no network calls.
 * Chooses the best canned reply based on the user's question.
 */
function generateReply(input: string): Omit<ChatMessage, "id" | "time" | "role"> {
  const q = input.trim().toLowerCase();

  if (!q) {
    return {
      content:
        "Please type a question — I can help with services, portfolio, quotes, or contact info.",
    };
  }

  // Quote / pricing intent
  if (/\b(quote|price|pricing|cost|estimate|budget|rate)\b/.test(q)) {
    return {
      content:
        "Happy to help with a quote. Share your project brief (product, quantity, deadline) and our team responds within one business day.",
      cta: { label: "Request a Quote", href: "/quote" },
      suggestions: ["Show me your portfolio", "What services do you offer?"],
    };
  }

  // Contact / location intent
  if (/\b(contact|reach|address|location|phone|call|email|whatsapp)\b/.test(q)) {
    return {
      content: `You can reach us on ${COMPANY.phone} or ${COMPANY.email}. Our press floor is at ${COMPANY.address.line1}, ${COMPANY.address.line2}.`,
      cta: { label: "Visit the Contact page", href: "/contact" },
      suggestions: ["Request a quote", "What are your working hours?"],
    };
  }

  // Hours intent
  if (/\b(hour|open|timing|when.*(open|available))\b/.test(q)) {
    return {
      content:
        "Studio & sales: Mon–Sat, 9am–6pm PKT. Production runs three shifts, so urgent jobs can move on any day.",
      suggestions: ["Request a quote", "How do I contact you?"],
    };
  }

  // Services intent — try to match a specific one first
  const service = SERVICES.find((s) => q.includes(s.slug.replace(/-/g, " ")) || q.includes(s.title.toLowerCase()));
  if (service) {
    return {
      content: `${service.title} — ${service.description}`,
      cta: { label: `Open ${service.title}`, href: `/services/${service.slug}` },
      suggestions: ["Show me your portfolio", "Request a quote"],
    };
  }
  if (/\b(service|offer|capab|print|offset|flexo|digital|screen|finish)/.test(q)) {
    return {
      content: `We run five services under one roof: ${SERVICES.map((s) => s.title).join(", ")}.`,
      cta: { label: "Browse Services", href: "/services" },
      suggestions: SERVICES.slice(0, 3).map((s) => `Tell me about ${s.title}`),
    };
  }

  // Portfolio intent — try to match a category
  const category = PORTFOLIO.find(
    (p) =>
      q.includes(p.slug.replace(/-/g, " ")) ||
      q.includes(p.title.toLowerCase()) ||
      p.title
        .toLowerCase()
        .split(/\s+/)
        .some((word) => word.length > 3 && q.includes(word))
  );
  if (category) {
    return {
      content: `${category.title} — ${category.short}`,
      cta: {
        label: `See ${category.title}`,
        href: `/portfolio/${category.slug}`,
      },
      suggestions: ["Request a quote", "Show all portfolio"],
    };
  }
  if (/\b(portfolio|work|project|sample|example|case|book|packag|brochure|label)/.test(q)) {
    return {
      content:
        "Our portfolio covers 10 categories — books, brochures, annual reports, packaging (cosmetic, pharma, perfume, gift), labels and more.",
      cta: { label: "Open the Portfolio", href: "/portfolio" },
      suggestions: PORTFOLIO.slice(0, 3).map((p) => `Show ${p.title}`),
    };
  }

  // Company / about intent
  if (/\b(about|company|team|history|since|found|who.*are|vantage)\b/.test(q)) {
    return {
      content: `${COMPANY.name} — an engineering-first printing house in Lahore, ${COMPANY.years}+ years on the press floor. One accountable team across prepress, print, finishing and dispatch.`,
      cta: { label: "About Vantage", href: "/company" },
      suggestions: ["What services do you offer?", "Request a quote"],
    };
  }

  // Greeting
  if (/\b(hi|hello|hey|salaam|salam|assalam|good\s(morning|afternoon|evening))\b/.test(q)) {
    return {
      content: `Hello — welcome to ${COMPANY.name}. How can I help today?`,
      suggestions: GREETING_SUGGESTIONS,
    };
  }

  // Fallback
  return {
    content:
      "I can help with services, portfolio, quotes, contact and company info. Try one of the suggestions below, or reach us directly.",
    cta: { label: "Talk to the team", href: "/quote" },
    suggestions: GREETING_SUGGESTIONS,
  };
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Seed the greeting on first open.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: makeId(),
          role: "bot",
          time: Date.now(),
          content: `Hi, I'm Vera — the ${COMPANY.name} assistant. Ask about our services, portfolio or start a quote.`,
          suggestions: GREETING_SUGGESTIONS,
        },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll to newest message
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // Focus the input when opening
  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      setUnread(false);
      return () => cancelAnimationFrame(frame);
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => openButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: makeId(),
      role: "user",
      time: Date.now(),
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate a natural thinking delay
    const delay = 500 + Math.min(1200, trimmed.length * 20);
    window.setTimeout(() => {
      const reply = generateReply(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "bot",
          time: Date.now(),
          ...reply,
        },
      ]);
      setTyping(false);
    }, delay);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const suggestionsForLatest = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.role === "bot");
    return last?.suggestions ?? [];
  }, [messages]);

  return (
    <>
      {/* Floating trigger button */}
      <button
        ref={openButtonRef}
        type="button"
        aria-label={open ? "Close chat" : "Open chat with Vera"}
        aria-expanded={open}
        aria-controls="vantage-chat-panel"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed z-[70] bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] sm:bottom-7 sm:right-7",
          "h-14 w-14 rounded-full inline-flex items-center justify-center",
          "bg-[color:var(--color-rust)] text-white",
          "shadow-[0_20px_45px_-10px_rgba(210,91,48,0.55)]",
          "transition-transform duration-300 ease-out",
          "hover:scale-[1.05] active:scale-95",
          open && "scale-90"
        )}
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            open ? "opacity-0 rotate-45 scale-50" : "opacity-100 rotate-0 scale-100"
          )}
        >
          <MessageCircle size={22} strokeWidth={1.7} />
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-50"
          )}
        >
          <X size={22} strokeWidth={1.7} />
        </span>

        {unread && !open && (
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-[color:var(--color-rust)]" />
        )}
      </button>

      {/* Backdrop for mobile */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[65] bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="vantage-chat-panel"
        role="dialog"
        aria-modal="false"
        aria-label={`Chat with ${COMPANY.name}`}
        className={cn(
          "fixed z-[66] bg-white flex flex-col overflow-hidden",
          "border border-[color:var(--color-hairline)]",
          "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]",
          // Mobile: bottom sheet
          "inset-x-2 bottom-[max(5.5rem,calc(5rem+env(safe-area-inset-bottom)))] top-auto h-[min(70dvh,560px)] max-h-[calc(100dvh-6.5rem)] rounded-2xl",
          // Desktop: floating card
          "sm:inset-auto sm:bottom-24 sm:right-7 sm:w-[min(380px,calc(100vw-2rem))] sm:h-[min(560px,calc(100dvh-8rem))] sm:max-h-none sm:rounded-xl",
          "transition-all duration-300 ease-out origin-bottom-right",
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-3 scale-[0.98] pointer-events-none"
        )}
      >
        {/* Header */}
        <header className="flex items-start gap-3 px-5 pt-5 pb-4 bg-[color:var(--color-rust)] text-white">
          <div className="h-10 w-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
            <span className="font-serif italic text-lg leading-none">V</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-serif italic text-lg leading-tight">Vera</p>
            <p className="text-[11px] tracking-[0.14em] uppercase text-white/75">
              {COMPANY.name} · Online
            </p>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="h-8 w-8 -mr-1 -mt-1 rounded-full inline-flex items-center justify-center text-white/85 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} strokeWidth={1.7} />
          </button>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-[color:var(--color-off)]"
        >
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} onSuggest={send} />
          ))}
          {typing && (
            <div className="flex items-center gap-2 text-[color:var(--color-mute)] pl-1">
              <div className="flex gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" style={{ animationDelay: "120ms" }} />
                <span className="typing-dot" style={{ animationDelay: "240ms" }} />
              </div>
              <span className="text-xs">Vera is typing…</span>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {!typing && suggestionsForLatest.length > 0 && (
          <div className="px-4 pt-2 pb-1 bg-white border-t border-[color:var(--color-hairline)] flex flex-wrap gap-2">
            {suggestionsForLatest.slice(0, 3).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="text-[12px] px-3 py-1.5 rounded-full border border-[color:var(--color-hairline)] text-[color:var(--color-ink-2)] hover:border-[color:var(--color-rust)] hover:text-[color:var(--color-rust)] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 px-3 py-3 bg-white border-t border-[color:var(--color-hairline)]"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Vera anything…"
            aria-label="Message input"
            className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-[color:var(--color-off)] border border-transparent focus:border-[color:var(--color-rust)] focus:bg-white rounded-lg outline-none transition-colors placeholder:text-[color:var(--color-mute-2)]"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim()}
            className={cn(
              "h-10 w-10 shrink-0 rounded-lg inline-flex items-center justify-center transition-all",
              input.trim()
                ? "bg-[color:var(--color-rust)] text-white hover:opacity-90"
                : "bg-[color:var(--color-off)] text-[color:var(--color-mute-2)] cursor-not-allowed"
            )}
          >
            <Send size={16} strokeWidth={1.7} />
          </button>
        </form>
      </div>

      <style jsx>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--color-rust);
          opacity: 0.35;
          animation: chat-typing 1.1s infinite ease-in-out;
        }
        @keyframes chat-typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.35;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

function MessageBubble({
  message,
  onSuggest,
}: {
  message: ChatMessage;
  onSuggest: (s: string) => void;
}) {
  const isBot = message.role === "bot";
  return (
    <div className={cn("flex", isBot ? "justify-start" : "justify-end")}>
      <div className={cn("max-w-[85%] flex flex-col gap-2", isBot ? "items-start" : "items-end")}>
        <div
          className={cn(
            "px-3.5 py-2.5 rounded-2xl text-[14px] leading-relaxed",
            isBot
              ? "bg-white text-[color:var(--color-ink)] border border-[color:var(--color-hairline)] rounded-tl-sm"
              : "bg-[color:var(--color-rust)] text-white rounded-tr-sm"
          )}
        >
          {message.content}
        </div>

        {isBot && message.cta && (
          <Link
            href={message.cta.href}
            onClick={() => onSuggest("")}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[color:var(--color-rust)] hover:opacity-80 transition-opacity"
          >
            {message.cta.label}
            <ArrowUpRight size={13} strokeWidth={1.8} />
          </Link>
        )}
      </div>
    </div>
  );
}
