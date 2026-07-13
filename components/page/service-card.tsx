import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/content";

type ServiceCardProps = {
  service: Service;
  priority?: boolean;
};

export function ServiceCard({ service, priority = false }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="service-card group">
      <div className="service-card__media relative aspect-[4/3] overflow-hidden bg-[color:var(--color-off)]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          quality={95}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="service-card__overlay" aria-hidden />
        <span className="service-card__cta">
          View service
          <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden />
        </span>
      </div>
      <div className="service-card__body">
        <div className="service-card__meta">
          <span className="numeral text-[color:var(--color-mute-2)]">
            {service.number}
          </span>
          <span className="service-card__count">
            {service.bullets.length} capabilities
          </span>
        </div>
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__short">{service.short}</p>
      </div>
    </Link>
  );
}
