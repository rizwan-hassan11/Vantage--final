"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import {
  CLIENT_CATEGORIES,
  type ClientCategory,
  type ClientLogo,
} from "@/lib/clients-data";

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
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ClientCategory>("All");

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesCategory =
        activeCategory === "All" || client.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        client.name.toLowerCase().includes(normalizedQuery) ||
        client.category.toLowerCase().includes(normalizedQuery) ||
        client.slug.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, clients, query]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<ClientCategory, number>();
    counts.set("All", clients.length);

    for (const category of CLIENT_CATEGORIES) {
      if (category === "All") continue;
      counts.set(
        category,
        clients.filter((client) => client.category === category).length
      );
    }

    return counts;
  }, [clients]);

  return (
    <div className="client-logo-wall">
      <div className="client-logo-wall__toolbar">
        <div className="client-logo-wall__search">
          <Search
            size={16}
            strokeWidth={1.6}
            className="client-logo-wall__search-icon"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clients or industries…"
            className="client-logo-wall__search-input"
            aria-label="Search clients"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="client-logo-wall__search-clear"
              aria-label="Clear search"
            >
              <X size={14} strokeWidth={1.8} />
            </button>
          ) : null}
        </div>

        <div
          className="client-logo-wall__filters"
          role="tablist"
          aria-label="Filter clients by industry"
        >
          {CLIENT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts.get(category) ?? 0;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`client-logo-wall__filter${isActive ? " is-active" : ""}`}
              >
                <span>{category}</span>
                <span className="client-logo-wall__filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="client-logo-wall__summary">
        <p className="text-sm text-[color:var(--color-mute)]">
          Showing{" "}
          <span className="font-medium text-[color:var(--color-ink)]">
            {filteredClients.length}
          </span>{" "}
          of {clients.length} clients
          {activeCategory !== "All" ? (
            <>
              {" "}
              in{" "}
              <span className="font-medium text-[color:var(--color-ink)]">
                {activeCategory}
              </span>
            </>
          ) : null}
        </p>
      </div>

      {filteredClients.length > 0 ? (
        <div className="client-logo-wall__grid">
          {filteredClients.map((client) => (
            <ClientLogoCard key={client.slug} client={client} />
          ))}
        </div>
      ) : (
        <div className="client-logo-wall__empty">
          <p className="font-serif italic text-xl text-[color:var(--color-ink)] mb-2">
            No clients found
          </p>
          <p className="text-sm text-[color:var(--color-mute)] mb-5">
            Try a different search term or browse another industry.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="btn-pill btn-pill-outline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
