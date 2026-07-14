import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type PageCtaProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
};

export function PageCta({ eyebrow, title, body, ctaLabel, ctaHref }: PageCtaProps) {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="container-x">
        <div className="rust-block-strong on-rust grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end border border-[color:var(--color-rust-2)]">
          <div className="lg:col-span-8">
            {eyebrow ? (
              <p className="tag-caps text-white/70 mb-4">{eyebrow}</p>
            ) : null}
            <h2 className="font-serif text-3xl lg:text-5xl leading-tight mb-4 max-w-3xl font-medium">
              {title}
            </h2>
            {body ? (
              <p className="text-white/85 text-base lg:text-lg leading-relaxed max-w-xl">
                {body}
              </p>
            ) : null}
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link
              href={ctaHref}
              className="btn-pill btn-pill-inverse inline-flex"
            >
              {ctaLabel}
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
