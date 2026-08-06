import { ClientLogoWall } from "@/components/page/client-logo-wall";
import { ClosingFit } from "@/components/home/closing-fit";
import { FinalCta } from "@/components/sections/final-cta";
import { getClients } from "@/lib/clients.server";
import { HOME_CLIENTS } from "@/lib/content";

/**
 * Homepage closing block (below the Company chapter, above the footer):
 * a "Trusted across industries" intro + the client logo marquee strip,
 * followed by the closing call to action.
 */
export function HomeClosing() {
  const clients = getClients();

  return (
    <div className="home-closing">
      <ClosingFit />
      <section className="home-clients" aria-labelledby="home-clients-title">
        <div className="container-x">
          <div className="home-clients__head">
            <div className="home-clients__intro">
              <p className="home-clients__badge">{HOME_CLIENTS.eyebrow}</p>
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
        </div>

        <div className="home-clients__logos">
          <ClientLogoWall clients={clients} strips={3} variant="bare" />
        </div>
      </section>

      <FinalCta id="home-final-cta-title" />
    </div>
  );
}
