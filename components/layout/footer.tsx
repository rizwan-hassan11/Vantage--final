import Image from "next/image";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[color:var(--color-charcoal)] text-[color:var(--color-cream)]"
    >
      {/* CTA band */}
      <div className="container-x pt-24 pb-16 border-b border-white/10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-white/50 mb-6">Start your project</p>
            <h2 className="headline-display text-white max-w-4xl">
              Let's engineer your next print
              <span className="text-[color:var(--color-rust-soft)] italic font-serif">
                {" "}vision{" "}
              </span>
              into reality.
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end gap-3">
            <a href={COMPANY.phoneHref} className="btn btn-inverse">
              Call the Desk
            </a>
            <a href={COMPANY.emailHref} className="btn btn-rust">
              Send a Brief
              <ArrowUpRight size={16} strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-x py-16 grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <Image
            src="/brand/vantage-wordmark-dark.png"
            alt="Vantage"
            width={260}
            height={70}
            className="h-10 w-auto invert brightness-0 mb-6"
          />
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            Pakistan's engineering-first printing house — offset, flexo, digital,
            screen and design printing crafted under one roof since 1992.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-white/80">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-3 hover:text-[color:var(--color-rust-soft)] transition"
            >
              <Phone size={14} strokeWidth={1.6} className="opacity-60" />
              {COMPANY.phone}
            </a>
            <a
              href={COMPANY.emailHref}
              className="flex items-center gap-3 hover:text-[color:var(--color-rust-soft)] transition"
            >
              <Mail size={14} strokeWidth={1.6} className="opacity-60" />
              {COMPANY.email}
            </a>
            <div className="flex items-start gap-3">
              <MapPin
                size={14}
                strokeWidth={1.6}
                className="opacity-60 mt-1 shrink-0"
              />
              <span>
                {COMPANY.address.line1}
                <br />
                {COMPANY.address.line2}
              </span>
            </div>
          </div>
        </div>

        {/* Group */}
        <div className="lg:col-span-3 lg:col-start-6">
          <p className="eyebrow text-white/50 mb-5">Vantage Group</p>
          <ul className="space-y-3 text-sm">
            {[
              "Vantage Printers",
              "Vantage Packaging",
              "Vantage Digital",
              "Vantage Design Studio",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-white/80 hover:text-[color:var(--color-rust-soft)] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nav */}
        <div className="lg:col-span-2">
          <p className="eyebrow text-white/50 mb-5">Get in Touch</p>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/80 hover:text-[color:var(--color-rust-soft)] transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="lg:col-span-2">
          <p className="eyebrow text-white/50 mb-5">Resources</p>
          <ul className="space-y-3 text-sm">
            {["Inklings Blog", "Prepare Files", "Sustainability", "FAQ", "Careers"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-[color:var(--color-rust-soft)] transition"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50 uppercase tracking-[0.16em]">
          <span>
            © {new Date().getFullYear()} {COMPANY.legal}
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[color:var(--color-rust-soft)]">
              Terms
            </a>
            <a href="#" className="hover:text-[color:var(--color-rust-soft)]">
              Privacy
            </a>
            <span className="hidden md:inline text-white/30">
              Think Beyond — {COMPANY.years} years of craft
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
