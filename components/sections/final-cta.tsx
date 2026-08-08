import Link from "next/link";
import { HOME_CTA } from "@/lib/content";

/**
 * Closing rust block that sits directly on top of the footer, so the two read
 * as one orange slab. Mounted once in the root layout for every page.
 */
export function FinalCta({ id = "final-cta-title" }: { id?: string }) {
  return (
    <section className="home-final-cta" aria-labelledby={id}>
      <div className="container-x home-final-cta__inner">
        <div className="home-final-cta__copy">
          <p className="home-final-cta__badge">{HOME_CTA.eyebrow}</p>
          <h2 id={id} className="home-final-cta__title">
            {HOME_CTA.title}
          </h2>
          <p className="home-final-cta__body">{HOME_CTA.body}</p>
          <div className="home-final-cta__actions">
            <Link href={HOME_CTA.primaryCta.href} className="btn-pill">
              {HOME_CTA.primaryCta.label}
            </Link>
            <Link href={HOME_CTA.secondaryCta.href} className="btn-pill">
              {HOME_CTA.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
