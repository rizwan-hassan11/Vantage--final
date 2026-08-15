import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/page/quote-form";
import { FOOTER } from "@/lib/content";

const VANTAGE_WORDMARK = "/vantage-svg-logos/vantage-mark.svg";
const VANTAGE_SIGNATURE =
  "/vantage-svg-logos/Vantage Identity-01 copy-03.svg";

export const metadata: Metadata = {
  title: "Start a Project — Vantage Printers",
  description:
    "Tell Vantage about your next print or packaging project. Our team responds within one working day.",
};

export default function QuotePage() {
  return (
    <div className="project-page">
      <section
        className="project-hero"
        data-scroll-section="hero"
        data-nav-theme="over-media"
      >
        <video
          className="project-hero__media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Detailed folding package made from textured paper"
        >
          <source src="/start-project/hero.mp4" type="video/mp4" />
        </video>
        <span className="project-hero__wash" aria-hidden />
        <div className="project-shell project-hero__content">
          <div>
            <p className="project-bar">Start a Project</p>
            <h1>Tell us what you are making.</h1>
          </div>
          <p className="project-hero__intro">
            From an early idea to production-ready artwork, this is a good place
            to begin.
          </p>
        </div>
      </section>

      <section
        id="project-brief"
        className="project-form-section"
        data-nav-theme="solid"
      >
        <div className="project-shell">
          <p className="project-bar">Start a Project</p>
          <h2 className="project-section-title">A few details to get us started.</h2>
          <QuoteForm />
        </div>
      </section>

      <section
        id="contact-vantage"
        className="project-contact"
        data-nav-theme="solid"
      >
        <div className="project-shell">
          <p className="project-bar">Contact Vantage</p>
          <h2 className="project-contact__title">
            Let&apos;s talk about what comes next.
          </h2>

          <div className="project-contact__feature">
            <div className="project-contact__image">
              <Image
                src="/start-project/building.jpg"
                alt="Vantage Printers building in Lahore"
                fill
                sizes="(max-width: 767px) 100vw, 70vw"
                quality={95}
              />
            </div>
            <nav aria-label="Start a Project page links">
              {FOOTER.nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="project-contact__details">
            <div className="project-contact__address">
              <p>
                For general questions, visits and
                <br />
                correspondence, contact us below.
              </p>
              <p className="project-contact__visit">
                <span>Visit</span>
                <Image
                  src={VANTAGE_WORDMARK}
                  alt="Vantage"
                  width={360}
                  height={101}
                  className="project-contact__visit-logo"
                />
              </p>
              <address>
                {FOOTER.address}
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=28-N+Gulberg+II+Lahore+Pakistan"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
              </address>
              <iframe
                className="project-contact__map"
                title="Vantage Printers location on Google Maps"
                src="https://www.google.com/maps?q=28-N%20Gulberg%20II%2C%20Lahore%2054660%2C%20Pakistan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <form
              className="project-contact__enquiry"
              action={`mailto:${FOOTER.email}`}
              method="post"
              encType="text/plain"
            >
              <fieldset>
                <legend>General Enquiry</legend>
                <input name="name" placeholder="Name" aria-label="Name" />
                <input name="company" placeholder="Company" aria-label="Company" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone/Whatsapp"
                  aria-label="Phone or WhatsApp"
                />
              </fieldset>
              <fieldset className="project-contact__message">
                <legend>Message</legend>
                <textarea
                  name="message"
                  placeholder="Write a message"
                  aria-label="Message"
                />
                <button type="submit">Send enquiry →</button>
                <p>We aim to respond within one working day.</p>
              </fieldset>
            </form>

            <div className="project-contact__brand">
              <Link
                href="/"
                className="project-contact__wordmark"
                aria-label="Vantage — Think Beyond"
              >
                <Image
                  src={VANTAGE_WORDMARK}
                  alt="Vantage"
                  width={360}
                  height={101}
                  className="project-contact__brand-mark"
                />
                <Image
                  src={VANTAGE_SIGNATURE}
                  alt="Think Beyond"
                  width={292}
                  height={118}
                  className="project-contact__brand-signature"
                />
              </Link>
              <p>{FOOTER.address}</p>
              <a href={FOOTER.phoneHref}>Tel: {FOOTER.phone}</a>
              <a href={FOOTER.emailHref}>{FOOTER.email}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
