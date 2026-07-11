import Image from "next/image";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { CERTIFICATIONS, COMPANY, FOOTER } from "@/lib/content";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="footer-link link-swipe text-[color:var(--color-rust)] text-[15px] leading-snug"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-[color:var(--color-off)]">
      {/* Certifications */}
      <section
        id="certifications"
        className="border-t border-[color:var(--color-hairline)]"
      >
        <div className="container-x py-16 lg:py-20">
          <h2 className="title-display text-[clamp(2rem,4vw,3.25rem)] mb-10 lg:mb-14">
            Certifications
          </h2>

          <div className="flex flex-wrap items-center gap-8 lg:gap-12">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-center h-16 lg:h-20 min-w-[100px]"
              >
                <span className="font-serif italic text-[color:var(--color-rust)] text-xl lg:text-2xl leading-none text-center">
                  {cert.name}
                </span>
                <span className="sr-only">
                  {cert.tag}: {cert.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer grid */}
      <div className="border-t border-[color:var(--color-hairline)]">
        <div className="container-x py-16 lg:py-24">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12 lg:gap-y-0">
            {/* Left — branding */}
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <p className="footer-label">{COMPANY.name}</p>
              <p className="mt-3 font-serif italic text-[color:var(--color-rust)] text-[clamp(1.25rem,2vw,1.6rem)] leading-tight">
                {COMPANY.tagline}
              </p>
              <p className="mt-4 text-[14px] text-[color:var(--color-rust)]/80 leading-relaxed max-w-[260px]">
                {COMPANY.address.line1}
                <br />
                {COMPANY.address.line2}
              </p>

              <div className="mt-14 lg:mt-auto lg:pt-20">
                <Image
                  src="/vantage-svg-logos/vantage-wordmark.svg"
                  alt="Vantage"
                  width={220}
                  height={56}
                  className="h-10 lg:h-12 w-auto"
                />
                <p className="mt-4 text-[12px] text-[color:var(--color-rust)]/80 tracking-wide">
                  © {COMPANY.copyrightYear} {COMPANY.legal} — Terms & Privacy
                </p>
              </div>
            </div>

            {/* Get in Touch */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-6">
              <p className="footer-label">Get in Touch</p>
              <ul className="mt-6 space-y-3">
                {FOOTER.getInTouch.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink href={COMPANY.phoneHref}>
                    {COMPANY.phone}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={COMPANY.emailHref}>
                    {COMPANY.email}
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Resources + socials */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-9 flex flex-col">
              <p className="footer-label">Resources</p>
              <ul className="mt-6 space-y-3">
                {FOOTER.resources.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>

              <div className="mt-12 lg:mt-auto lg:pt-16 flex items-center gap-4 text-[color:var(--color-rust)]">
                <span aria-hidden="true">
                  <Instagram size={17} strokeWidth={1.5} />
                </span>
                <span aria-hidden="true">
                  <Facebook size={17} strokeWidth={1.5} />
                </span>
                <span aria-hidden="true">
                  <Linkedin size={17} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
