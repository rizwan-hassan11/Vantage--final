import type { Metadata } from "next";
import { QuoteForm } from "@/components/page/quote-form";
import { ProjectHeroVideo } from "@/components/page/project-hero-video";

export const metadata: Metadata = {
  title: "Start a Project — Vantage Printers",
  description:
    "Tell Vantage about your next print or packaging project. Our team responds within one working day.",
};

export default function StartProjectPage() {
  return (
    <div className="project-page">
      <section
        className="project-hero"
        data-scroll-section="hero"
        data-nav-theme="over-media"
      >
        <ProjectHeroVideo />
        <span className="project-hero__wash" aria-hidden />
        <div className="project-shell project-hero__content">
          <div>
            <p className="project-bar">Start a Project</p>
            <h1>Tell us what you are making.</h1>
          </div>
          <p className="project-hero__intro">
            From an early idea to production-ready artwork, this is a good place
            to begin.
          </p>
        </div>
      </section>

      <section
        id="project-brief"
        className="project-form-section"
        data-nav-theme="solid"
      >
        <div className="project-shell">
          <p className="project-bar">Start a Project</p>
          <h2 className="project-section-title">A few details to get us started.</h2>
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
