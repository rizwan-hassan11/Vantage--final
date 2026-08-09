import Image from "next/image";
import Link from "next/link";
import { SlideIn } from "@/components/motion/slide-in";

type CapabilityRowProps = {
  slug: string;
  label: string;
  tagline: string;
  image: string;
  ctaLabel: string;
  index: number;
};

/**
 * One capability on /services. Rows lead with the image on alternating sides and
 * slide in from that side, so the page reads as a zig-zag rather than a column.
 */
export function CapabilityRow({
  slug,
  label,
  tagline,
  image,
  ctaLabel,
  index,
}: CapabilityRowProps) {
  const reverse = index % 2 === 1;

  return (
    <SlideIn
      from={reverse ? "left" : "right"}
      className={`svc-row${reverse ? " svc-row--reverse" : ""}`}
    >
      <Link
        href={`/services/${slug}`}
        className="svc-row__media"
        aria-label={label}
        tabIndex={-1}
      >
        <Image
          src={image}
          alt={label}
          fill
          sizes="(min-width: 900px) 58vw, 100vw"
          quality={90}
          priority={index === 0}
          className="svc-row__image"
        />
      </Link>

      <div className="svc-row__copy">
        <h3 className="svc-row__title">{label}</h3>
        <p className="svc-row__body">{tagline}</p>
        <Link href={`/services/${slug}`} className="svc-row__link">
          <span className="svc-row__link-arrow" aria-hidden>
            →
          </span>
          {ctaLabel}
        </Link>
      </div>
    </SlideIn>
  );
}
