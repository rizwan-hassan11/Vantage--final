type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24">
      <div className="container-x">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="title-hero mb-6 max-w-4xl">{title}</h1>
        {intro ? (
          <p className="text-lg lg:text-xl leading-relaxed text-[color:var(--color-mute)] max-w-2xl">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
