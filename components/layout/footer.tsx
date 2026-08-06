import Image from "next/image";
import Link from "next/link";
import { COMPANY, FOOTER } from "@/lib/content";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
} from "@/components/icons/hero-card-icons";

const SOCIAL_ICONS = {
  Instagram: IconInstagram,
  LinkedIn: IconLinkedIn,
  Facebook: IconFacebook,
} as const;

/* Wordmark and script are separate files, so the lockup is rebuilt here with
   the script tucked under the wordmark's right shoulder. */
const WORDMARK_SRC = "/vantage-svg-logos/vantage-mark.svg";
const SIGNATURE_SRC = "/vantage-svg-logos/Vantage Identity-01 copy-03.svg";

export function Footer() {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="container-x site-footer__inner">
        <div className="site-footer__left">
          <p className="site-footer__legal">{COMPANY.legal}</p>

          <nav aria-label="Footer">
            <ul className="site-footer__nav">
              {FOOTER.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="site-footer__contact">
            <p className="site-footer__address">
              {FOOTER.address.line1}
              <br />
              {FOOTER.address.line2}
            </p>
            <p>
              <a href={FOOTER.phoneHref}>Tel : {FOOTER.phone}</a>
            </p>
            <p>
              <a href={FOOTER.emailHref}>{FOOTER.email}</a>
            </p>
          </address>
        </div>

        <div className="site-footer__right">
          <Link
            href="/"
            className="site-footer__lockup"
            aria-label={`${COMPANY.name} — Home`}
          >
            <Image
              src={WORDMARK_SRC}
              alt={COMPANY.name}
              width={360}
              height={101}
              className="site-footer__wordmark"
            />
            <Image
              src={SIGNATURE_SRC}
              alt={COMPANY.tagline}
              width={292}
              height={118}
              className="site-footer__signature"
            />
          </Link>

          <div className="site-footer__end">
            <div className="site-footer__socials">
              {COMPANY.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="site-footer__social"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            <p className="site-footer__copyright">
              © {COMPANY.copyrightYear} {COMPANY.legal}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
