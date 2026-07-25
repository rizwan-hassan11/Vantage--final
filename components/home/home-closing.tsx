import Link from "next/link";
import { getClients } from "@/lib/clients.server";
import { ClientLogoWall } from "@/components/page/client-logo-wall";
import { HOME_CLIENTS, HOME_CTA } from "@/lib/content";

/**
 * Homepage closing block (below the Company chapter, above the footer):
 * a "Trusted by leading brands" intro + the client logo marquee strip,
 * followed by the final "Let's create what comes next" call to action.
 */
export function HomeClosing() {
  const clients = getClients();

  return (
    <div className="home-closing">
      <section className="home-clients" aria-labelledby="home-clients-title">
        <div className="container-x">
          <div className="home-clients__head">
            <p className="tag-caps home-clients__eyebrow">
              {HOME_CLIENTS.eyebrow}
            </p>
            <h2 id="home-clients-title" className="home-clients__title">
              {HOME_CLIENTS.heading.split("\n").map((line) => (
                <span key={line} className="home-clients__title-line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="home-clients__body">{HOME_CLIENTS.body}</p>
          </div>
        </div>

        <div className="home-clients__logos">
          <ClientLogoWall clients={clients} strips={5} variant="bare" />
        </div>
      </section>

      <section className="home-final-cta" aria-labelledby="home-final-cta-title">
        <div className="container-x">
          <h2 id="home-final-cta-title" className="home-final-cta__title">
            {HOME_CTA.title}
          </h2>
          <p className="home-final-cta__subhead">{HOME_CTA.subhead}</p>
          <p className="home-final-cta__body">{HOME_CTA.body}</p>
          <div className="home-final-cta__actions">
            <Link
              href={HOME_CTA.primaryCta.href}
              className="btn-pill btn-pill-outline"
            >
              {HOME_CTA.primaryCta.label}
            </Link>
            <Link
              href={HOME_CTA.secondaryCta.href}
              className="btn-pill btn-pill-outline"
            >
              {HOME_CTA.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
