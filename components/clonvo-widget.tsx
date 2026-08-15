import Script from "next/script";

/**
 * Clonvo web chat for Vantage Printers.
 * The public widget key can be rotated without code changes.
 */
export function ClonvoWidget() {
  const key = process.env.NEXT_PUBLIC_CLONVO_WIDGET_KEY;

  if (!key) return null;

  return (
    <Script
      src="https://app.clonvo.chat/widget.js"
      data-key={key}
      data-base="https://app.clonvo.chat"
      data-title="Vantage Printers"
      data-subtitle="Print · packaging · project help"
      data-greeting="Hi! Ask about packaging, print capabilities, lead times, or starting a project. We are here to help."
      data-suggestions="What print technologies do you offer?|Can you help with packaging design?|How do I start a project?|Talk to the team"
      data-color="#E85D04"
      data-position="bottom-right"
      strategy="lazyOnload"
    />
  );
}
