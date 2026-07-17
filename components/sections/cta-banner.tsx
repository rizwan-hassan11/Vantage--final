import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/content";

const blockClass =
  "relative -mt-10 sm:-mt-16 md:-mt-24 lg:-mt-36 mx-4 sm:mx-6 md:ml-8 md:mr-0 lg:ml-14 max-w-[640px] rust-block-strong on-rust";

function CtaContent() {
  return (
    <>
      <p className="font-serif text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.3] text-white">
        For examples of our recent work, head over to our{" "}
        <Link
          href="/portfolio"
          className="link-swipe text-white underline-offset-4"
        >
          Portfolio
        </Link>
        , or contact one of our experts to start your next project.
      </p>
      <div className="mt-6 sm:mt-8">
        <Link
          href="/contact"
          className="link-swipe text-white text-[13px] tracking-[0.14em] uppercase font-medium"
        >
          Contact Us
        </Link>
      </div>
    </>
  );
}

export function CtaBanner() {
  return (
    <section id="quote" className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="relative">
          <div className="relative w-full aspect-[16/9] lg:aspect-[16/6] overflow-hidden bg-[color:var(--color-off)] border border-[color:var(--color-hairline)]">
            <Image
              src={IMG.showcase}
              alt="Vantage printed work"
              fill
              sizes="(min-width: 1440px) 1360px, calc(100vw - 2rem)"
              quality={95}
              className="object-cover contrast-[1.04] saturate-[0.96]"
            />
            <div className="absolute inset-0 bg-black/12" />
          </div>

          <div className={blockClass}>
            <CtaContent />
          </div>
        </div>
      </div>
    </section>
  );
}
