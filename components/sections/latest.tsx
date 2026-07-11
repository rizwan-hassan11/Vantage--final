import Image from "next/image";
import { ArrowUpRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { LATEST } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Latest() {
  return (
    <section id="latest" className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: title + post list */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">/ Inklings</p>
              <h2 className="title-display mb-10 lg:mb-14">The Latest.</h2>
            </Reveal>

            <ul className="border-t border-[color:var(--color-hairline)]">
              {LATEST.map((post, i) => (
                <Reveal
                  key={post.title}
                  delay={i * 0.08}
                  className="border-b border-[color:var(--color-hairline)]"
                >
                  <div className="group flex items-start gap-6 py-6 lg:py-8">
                    <div className="shrink-0 w-24 lg:w-28">
                      <p className="tag-caps text-[10px] text-[color:var(--color-mute)]">
                        {post.category}
                      </p>
                      <p className="mt-1 text-[13px] text-[color:var(--color-mute)]">
                        {post.date}
                      </p>
                    </div>
                    <h3 className="serif-italic flex-1 text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.15] text-[color:var(--color-rust)]">
                      {post.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.4}
                      className="mt-1 shrink-0 -rotate-45 text-[color:var(--color-mute)]"
                      aria-hidden
                    />
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-6">
              <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-mute)]">
                View more
              </span>
              <span className="w-px h-3 bg-[color:var(--color-line)]" />
              <div className="flex items-center gap-3 text-[color:var(--color-mute)]">
                <span aria-hidden="true">
                  <Instagram size={16} strokeWidth={1.6} />
                </span>
                <span aria-hidden="true">
                  <Facebook size={16} strokeWidth={1.6} />
                </span>
                <span aria-hidden="true">
                  <Linkedin size={16} strokeWidth={1.6} />
                </span>
              </div>
            </div>
          </div>

          {/* Right: single feature thumbnail (Instagram-style) */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <p className="tag-caps text-[10px] text-[color:var(--color-mute)] mb-3">
                / Instagram
              </p>
              <div className="group relative block aspect-square overflow-hidden bg-[color:var(--color-off)]">
                <Image
                  src="/facility/showcase.webp"
                  alt="From the Vantage press floor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <span className="serif-italic text-lg leading-tight">
                    From the press floor
                  </span>
                  <Instagram size={16} strokeWidth={1.4} className="opacity-90" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
