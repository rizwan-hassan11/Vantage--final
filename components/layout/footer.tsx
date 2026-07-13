import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/content";

const NAVIGATE = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/company" },
  { label: "Clients", href: "/clients" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/quote" },
];

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="bg-white border-t border-[color:var(--color-hairline)] text-[color:var(--color-ink)]"
    >
      <div className="container-x py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-8 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" aria-label="Vantage — Home" className="inline-block">
              <Image
                src="/vantage-svg-logos/vantage-wordmark.svg"
                alt="Vantage — Think Beyond"
                width={360}
                height={118}
                className="h-[clamp(3.75rem,5.5vw,5rem)] w-auto max-w-[min(360px,88vw)]"
              />
            </Link>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-serif italic text-[color:var(--color-rust)] text-xl sm:text-2xl mb-4 sm:mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAVIGATE.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-[color:var(--color-ink)] hover:text-[color:var(--color-rust)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-serif italic text-[color:var(--color-rust)] text-xl sm:text-2xl mb-4 sm:mb-6">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-[15px] text-[color:var(--color-ink)]">
              <p>
                {COMPANY.address.line1}
                <br />
                {COMPANY.address.line2}
              </p>
              <p>
                <a
                  href={COMPANY.phoneHref}
                  className="hover:text-[color:var(--color-rust)] transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p>
                <a
                  href={COMPANY.emailHref}
                  className="hover:text-[color:var(--color-rust)] transition-colors"
                >
                  {COMPANY.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[color:var(--color-hairline)] flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Image
            src="/vantage-svg-logos/vantage-wordmark.svg"
            alt="Vantage"
            width={110}
            height={30}
            className="h-6 w-auto"
          />
          <p className="text-[13px] text-[color:var(--color-mute)]">
            © {COMPANY.copyrightYear} Vantage Printers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
