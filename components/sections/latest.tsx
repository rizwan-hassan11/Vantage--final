import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LATEST } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Latest() {
  return (
    <section
      id="latest"
      className="relative bg-[color:var(--color-cream)] py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="flex items-end justify-between mb-14 lg:mb-20 gap-8 flex-wrap">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="numeral text-[color:var(--color-rust)] text-sm">
                  05 /
                </span>
                <span className="eyebrow">The Latest — Inklings</span>
              </div>
              <h2 className="headline-display max-w-2xl">
                Notes from the
                <br />
                <span className="italic font-serif text-[color:var(--color-rust)]">
                  press floor.
                </span>
              </h2>
            </Reveal>
          </div>
          <a href="#" className="btn btn-ghost">
            View more
            <ArrowUpRight size={16} strokeWidth={1.6} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {LATEST.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.1}>
              <a
                href={post.href}
                className="group block h-full border border-[color:var(--border-primary)] bg-[color:var(--color-paper)] hover:bg-white transition-colors duration-500"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-bone)]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-7">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--text-secondary)]">
                    <span>{post.category}</span>
                    <span className="w-4 h-px bg-[color:var(--border-primary)]" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl lg:text-[1.65rem] leading-[1.1] tracking-[-0.01em] group-hover:text-[color:var(--color-rust)] transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-6 pt-4 border-t border-[color:var(--border-primary)] flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">
                    <span>Read the piece</span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.6}
                      className="-rotate-45 group-hover:rotate-0 group-hover:text-[color:var(--color-rust)] transition-all duration-500"
                    />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
