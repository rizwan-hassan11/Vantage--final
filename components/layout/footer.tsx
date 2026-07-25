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

export function Footer() {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="container-x site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__left">
            <p className="site-footer__legal">{COMPANY.legal}</p>

            <div className="site-footer__meta">
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
                <p>
                  {COMPANY.address.line1}
                  <br />
                  {COMPANY.address.line2}
                </p>
                <p>
                  <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
                </p>
                <p>
                  <a href={COMPANY.emailHref}>{COMPANY.email}</a>
                </p>
              </address>
            </div>
          </div>

          <div className="site-footer__right">
            <Link href="/" className="site-footer__brand" aria-label="Vantage — Home">
              <Image
                src="/vantage-svg-logos/vantage-wordmark.svg"
                alt="Vantage — Think Beyond"
                width={360}
                height={118}
                className="site-footer__logo"
              />
            </Link>
            <p className="site-footer__promise">{COMPANY.promise}</p>

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
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>

            <div className="site-footer__rule" aria-hidden />
          </div>
        </div>
      </div>
    </footer>
  );
}
