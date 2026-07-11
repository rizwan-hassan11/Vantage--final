import Image from "next/image";

const blockClass =
  "relative -mt-12 sm:-mt-20 md:-mt-28 lg:-mt-36 ml-0 md:ml-8 lg:ml-14 max-w-[640px] rust-block-strong on-rust";

function CtaContent() {
  return (
    <>
      <p className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.3] text-white">
        For examples of our recent work, head over to our{" "}
        <a href="#portfolio" className="link-swipe text-white underline-offset-4">
          Portfolio
        </a>
        , or contact one of our experts to start your next project.
      </p>
      <div className="mt-8">
        <a
          href="#contact"
          className="link-swipe text-white text-[13px] tracking-[0.14em] uppercase font-medium"
        >
          Get a Quote
        </a>
      </div>
    </>
  );
}

export function CtaBanner() {
  return (
    <section id="quote" className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="relative">
          <div className="relative w-full aspect-[16/9] lg:aspect-[16/6] overflow-hidden bg-[color:var(--color-off)]">
            <Image
              src="/facility/showcase.webp"
              alt="Vantage printed work"
              fill
              sizes="(min-width: 1440px) 1360px, calc(100vw - 2rem)"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          <div className={blockClass}>
            <CtaContent />
          </div>
        </div>
      </div>
    </section>
  );
}
