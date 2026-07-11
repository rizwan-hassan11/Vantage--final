import Image from "next/image";
import { CERTIFICATIONS } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

const PARTNERS = [
  { name: "Heidelberg", src: "/partners/heidelberg.svg" },
  { name: "BOBST", src: "/partners/bobst.svg" },
  { name: "Xerox", src: "/partners/xerox.svg" },
  { name: "Konica Minolta", src: "/partners/konica-minolta.svg" },
  { name: "GMG", src: "/partners/gmg.svg" },
  { name: "Longhua", src: "/partners/longhua.png" },
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative bg-[color:var(--color-paper-2)] py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="numeral text-[color:var(--color-rust)] text-sm">
                  07 /
                </span>
                <span className="eyebrow">Certifications & Partners</span>
              </div>
              <h2 className="headline-display">
                Measured against
                <br />
                <span className="italic font-serif text-[color:var(--color-rust)]">
                  global standards.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-[color:var(--text-secondary)] max-w-xl">
                Every job runs against colour, quality and process standards
                audited internationally — so what leaves Lahore matches what
                lands anywhere in the world.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-[color:var(--border-primary)]">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal
              key={cert.id}
              delay={i * 0.08}
              className="border-b border-[color:var(--border-primary)] lg:border-b-0 lg:border-r border-[color:var(--border-primary)] last:border-r-0 p-6 lg:p-8"
            >
              <div className="numeral text-xs text-[color:var(--color-rust)] mb-4">
                0{i + 1}
              </div>
              <h3 className="font-display text-3xl tracking-[-0.02em] leading-none">
                {cert.name}
              </h3>
              <div className="mt-2 eyebrow">{cert.tag}</div>
              <p className="mt-6 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                {cert.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Machinery partners */}
        <div className="mt-16 lg:mt-20 pt-10 border-t border-[color:var(--border-primary)]">
          <p className="eyebrow mb-8">Press-floor partners</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="relative h-14 opacity-70 hover:opacity-100 transition"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="120px"
                  className="object-contain object-left"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
