import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

const rowA = CLIENT_LOGOS.slice(0, 14);
const rowB = CLIENT_LOGOS.slice(14, 28);
const rowC = CLIENT_LOGOS.slice(28);

function LogoRow({
  logos,
  reverse = false,
}: {
  logos: readonly string[];
  reverse?: boolean;
}) {
  const doubled = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden py-6 border-y border-[color:var(--border-primary)]">
      <div
        className="marquee-track gap-12 lg:gap-16 items-center"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {doubled.map((slug, i) => (
          <div
            key={`${slug}-${i}`}
            className="relative w-[130px] h-[52px] shrink-0 opacity-60 hover:opacity-100 transition"
          >
            <Image
              src={`/clients/${slug}.png`}
              alt={slug}
              fill
              sizes="130px"
              className="object-contain grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  return (
    <section className="relative bg-[color:var(--color-paper)] py-24 lg:py-32">
      <div className="container-x mb-12 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="numeral text-[color:var(--color-rust)] text-sm">
                06 /
              </span>
              <span className="eyebrow">Trusted by</span>
            </div>
            <h2 className="headline-display">
              500+ brands.
              <br />
              <span className="italic font-serif text-[color:var(--color-rust)]">
                One press floor.
              </span>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 flex items-end">
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-[color:var(--text-secondary)] max-w-xl">
              From heritage fashion houses to national industrial groups, Vantage
              is the print partner of choice for Pakistan's most demanding
              brands — and a growing roster of export names.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="space-y-1">
        <LogoRow logos={rowA} />
        <LogoRow logos={rowB} reverse />
        <LogoRow logos={rowC} />
      </div>
    </section>
  );
}
