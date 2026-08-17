import { ClientLogoWall } from "@/components/page/client-logo-wall";
import { RevealFromRight } from "@/components/ui/reveal";
import { getHomeClients } from "@/lib/clients.server";
import { HOME_CLIENTS } from "@/lib/content";

/**
 * Homepage closing block (below the Company chapter):
 * "Trusted across industries" intro + client logo marquee.
 * The final CTA + footer live in the root layout on every page.
 */
export function HomeClosing() {
  const clients = getHomeClients();

  return (
    <div className="home-closing">
      <section className="home-clients" aria-labelledby="home-clients-title">
        <div className="container-x">
          <div className="home-clients__head">
            <div className="home-clients__intro">
              <RevealFromRight className="home-clients__badge-reveal">
                <p className="home-clients__badge">{HOME_CLIENTS.eyebrow}</p>
              </RevealFromRight>
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
    </div>
  );
}
