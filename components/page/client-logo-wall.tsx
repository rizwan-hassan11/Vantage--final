import Image from "next/image";
import type { ClientLogo } from "@/lib/clients-data";

type ClientLogoWallProps = {
  clients: ClientLogo[];
};

function ClientLogoCard({ client }: { client: ClientLogo }) {
  return (
    <article className="client-logo-card group">
      <div className="client-logo-card__media">
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          fill
          sizes="(max-width: 640px) 140px, 160px"
          className="client-logo-card__image"
        />
      </div>
      <div className="client-logo-card__meta">
        <p className="client-logo-card__name">{client.name}</p>
        <p className="client-logo-card__category">{client.category}</p>
      </div>
    </article>
  );
}

export function ClientLogoWall({ clients }: ClientLogoWallProps) {
  return (
    <div className="client-logo-wall">
      <div className="client-logo-wall__grid">
        {clients.map((client) => (
          <ClientLogoCard key={client.slug} client={client} />
        ))}
      </div>
    </div>
  );
}
