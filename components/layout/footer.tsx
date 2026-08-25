import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FOOTER } from "@/lib/content";
import { GeneralEnquiryForm } from "@/components/page/general-enquiry-form";
import { RevealFromRight } from "@/components/ui/reveal";

const VANTAGE_WORDMARK = "/vantage-svg-logos/vantage-mark.svg";
const VANTAGE_SIGNATURE =
  "/vantage-svg-logos/Vantage Identity-01 copy-03.svg";

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="project-contact universal-footer"
      data-nav-theme="solid"
    >
      <div className="project-shell">
        <RevealFromRight className="project-contact__badge-reveal">
          <p className="project-bar project-bar--footer">Contact Vantage</p>
        </RevealFromRight>
        <h2 className="project-contact__title">
          Let&apos;s talk about what comes next.
        </h2>

        <div className="project-contact__feature">
          <div className="project-contact__image">
            <Image
              src="/home/contact/vantage-building-night.jpg"
              alt="Vantage Printers building in Lahore"
              fill
              sizes="(max-width: 767px) 100vw, 70vw"
              quality={80}
            />
          </div>
          <nav aria-label="Footer">
            {FOOTER.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                <span>{item.label}</span>
                <ArrowRight
                  className="project-contact__nav-arrow"
                  strokeWidth={1.7}
                  aria-hidden
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="project-contact__details">
          <div className="project-contact__address">
            <p>
              For general questions, visits and
              <br />
              correspondence, contact Vantage below.
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
              <div className="project-contact__address-links">
                <a href={FOOTER.phoneHref}>Tel: {FOOTER.phone}</a>
                <a href={FOOTER.emailHref}>{FOOTER.email}</a>
                <a
                  className="project-contact__directions"
                  href="https://www.google.com/maps/search/?api=1&query=28-N+Gulberg+II+Lahore+Pakistan"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
              </div>
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

          <GeneralEnquiryForm />

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
          </div>
        </div>
      </div>
    </footer>
  );
}
