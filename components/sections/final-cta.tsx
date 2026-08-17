import { HOME_CTA } from "@/lib/content";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

/**
 * Closing rust block that sits directly on top of the footer, so the two read
 * as one orange slab. Mounted once in the root layout for every page.
 */
export function FinalCta({ id = "final-cta-title" }: { id?: string }) {
  return (
    <section className="home-final-cta" aria-labelledby={id}>
      <div className="container-x home-final-cta__inner">
        <div className="home-final-cta__copy">
          <h2 id={id} className="home-final-cta__title">
            {HOME_CTA.title}
          </h2>
          <p className="home-final-cta__body">{HOME_CTA.body}</p>
          <div className="home-final-cta__actions">
            <LiquidMetalButton
              href={HOME_CTA.primaryCta.href}
              label={HOME_CTA.primaryCta.label}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
