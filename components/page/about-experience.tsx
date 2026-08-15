"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const HISTORY = [
  {
    image: "/about/history/design-studio.jpg",
    alt: "Vantage design studio",
    caption: ["Design Studio,", "Vantage 2011"],
  },
  {
    image: "/about/history/celebration.jpg",
    alt: "Vantage creative team celebration",
    caption: ["Creative Manager's birthday, 2012", "Vantage studio, Lahore"],
  },
  {
    image: "/about/history/production.jpg",
    alt: "Vantage production team",
    caption: ["Team Production,", "Vantage 2008"],
  },
  {
    image: "/about/history/offset.jpg",
    alt: "Vantage offset operators",
    caption: ["Offset Operators", "Vantage 2008"],
  },
  {
    image: "/about/history/master-binder.jpg",
    alt: "Vantage master binder",
    caption: ["Master Binder,", "Vantage 2005"],
  },
  {
    image: "/about/history/green-day.jpg",
    alt: "Vantage Environment Day celebration",
    caption: ["Environment Day celebration", "Vantage 2004"],
  },
] as const;

const PIONEERS = [
  {
    image: "/about/pioneers/manzoor-ahmed.jpg",
    name: "Manzoor Ahmed",
    role: "Master Operator",
    since: "With Vantage since 1992",
  },
  {
    image: "/about/pioneers/asif-khan.jpg",
    name: "Asif Khan",
    role: "Manual Binder",
    since: "With Vantage since 1992",
  },
  {
    image: "/about/pioneers/aqeel-haider.jpg",
    name: "Aqeel Haider",
    role: "Production on Offset KBA",
    since: "With Vantage since 1995",
  },
  {
    image: "/about/pioneers/muhammad-shahid.jpg",
    name: "Muhammad Shahid",
    role: "Production Officer (Binding & Finishing)",
    since: "With Vantage since 2001",
  },
  {
    image: "/about/pioneers/zameer-ahmed.jpg",
    name: "Zameer Ahmed",
    role: "Asst. Manager Production",
    since: "With Vantage since 2002",
  },
  {
    image: "/about/pioneers/muhammad-hafeez.jpg",
    name: "Muhammad Hafeez",
    role: "Admin",
    since: "With Vantage since 1994",
  },
] as const;

function ThinkBeyondSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const signatureScale = useTransform(
    scrollYProgress,
    [0, 0.58, 1],
    reduceMotion ? [1, 1, 1] : [2.7, 1, 1]
  );
  const signatureY = useTransform(
    scrollYProgress,
    [0, 0.58, 1],
    reduceMotion ? [0, 0, 0] : [45, -5, -5]
  );
  const panelY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9, 1],
    reduceMotion ? ["0%", "0%", "0%", "0%"] : ["100%", "100%", "0%", "0%"]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.08, 1]
  );
  const whiteSignatureOpacity = useTransform(
    scrollY,
    (currentScroll) => {
      if (reduceMotion || typeof window === "undefined") return 0;

      const section = sectionRef.current;
      if (!section) return 1;

      const sectionTop =
        currentScroll + section.getBoundingClientRect().top;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = (currentScroll - sectionTop) / travel;

      if (progress <= 0.12) return 1;
      if (progress >= 0.38) return 0;
      return 1 - (progress - 0.12) / 0.26;
    }
  );
  const smoothSignatureScale = useSpring(signatureScale, {
    stiffness: 90,
    damping: 28,
    mass: 0.55,
  });
  const smoothSignatureY = useSpring(signatureY, {
    stiffness: 95,
    damping: 27,
    mass: 0.5,
  });

  return (
    <section
      ref={sectionRef}
      className="about-belief"
      data-nav-theme="over-media"
    >
      <div className="about-belief__stage">
        <motion.div
          className="about-belief__image"
          style={{ scale: imageScale }}
        >
          <Image
            src="/about/studio.png"
            alt="Vantage studio displaying decades of work"
            fill
            sizes="100vw"
            quality={95}
          />
        </motion.div>
        <motion.div
          className="about-belief__signature"
          style={{
            scale: smoothSignatureScale,
            y: smoothSignatureY,
          }}
          role="img"
          aria-label="Think Beyond"
        >
          <div className="about-belief__signature-art about-belief__signature-art--orange" />
          <motion.div
            className="about-belief__signature-art about-belief__signature-art--white"
            style={{ opacity: whiteSignatureOpacity }}
            aria-hidden
          />
        </motion.div>

        <motion.div className="about-belief__panel" style={{ y: panelY }}>
          <Link href="/work" className="about-belief__work-link">
            <span>Explore Our Work</span>
            <span aria-hidden>↗</span>
          </Link>
          <div>
            <h2>More than a tagline.</h2>
            <p>
              Since the beginning, Think Beyond has meant looking past the
              obvious, at the brief, the process and the possibilities, to find
              a better way forward.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutExperience() {
  const reduceMotion = useReducedMotion();
  const slideTransition = {
    duration: reduceMotion ? 0 : 1,
    ease: "easeOut" as const,
  };

  return (
    <div className="about-page">
      <section
        className="about-hero"
        data-scroll-section="hero"
        data-nav-theme="over-media"
      >
        <Image
          src="/about/crowd.jpg"
          alt="Vantage team gathered for the company's 25th anniversary"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="about-hero__image"
        />
        <div className="about-hero__band">
          <motion.div
            className="about-shell"
            initial={reduceMotion ? false : { x: "-100vw", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...slideTransition, duration: reduceMotion ? 0 : 1.25 }}
          >
            <p className="about-bar">About Vantage</p>
            <h1>
              <span>We started with ideas.</span>
              <span>We built the means to make them real.</span>
            </h1>
            <p className="about-hero__body">
              Since 1992, Vantage has evolved from a design house into an
              integrated print and packaging company, bringing creative
              thinking, colour management, production technology and finishing
              together under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="about-history" data-nav-theme="solid">
        <div className="about-history__intro">
          <motion.div
            className="about-history__origin"
            initial={reduceMotion ? false : { x: -180, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.35, once: true }}
            transition={slideTransition}
          >
            <Image
              src="/about/year.png"
              alt="1992"
              width={990}
              height={355}
              className="about-history__year"
            />
            <p className="about-history__location">
              Lahore, Pakistan
              <br />
              Vantage begins as a design house
            </p>
          </motion.div>

          <motion.div
            className="about-history__beginning"
            initial={reduceMotion ? false : { x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ ...slideTransition, delay: reduceMotion ? 0 : 0.12 }}
          >
            <p className="about-bar">Our Beginning</p>
            <h2>Design came first.</h2>
            <p>
              Vantage began as a design house with a belief that has stayed with
              us ever since: the best production begins with the finished
              product in mind.
            </p>
          </motion.div>
        </div>

        <div className="about-history__gallery">
          {HISTORY.map((item, index) => (
            <motion.figure
              key={item.image}
              initial={reduceMotion ? false : { x: 130, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ amount: 0.22, once: true }}
              transition={{
                ...slideTransition,
                delay: reduceMotion ? 0 : index * 0.07,
              }}
            >
              <div className="about-history__photo">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 50vw, 23vw"
                  quality={90}
                />
              </div>
              <figcaption>
                {item.caption.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section
        id="our-team"
        className="about-pioneers scroll-mt-20"
        data-nav-theme="solid"
      >
        <motion.div
          className="about-pioneers__copy"
          initial={reduceMotion ? false : { x: -180, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.25, once: true }}
          transition={{ ...slideTransition, duration: reduceMotion ? 0 : 1.1 }}
        >
          <p className="about-bar">People Who Built Vantage</p>
          <h2>
            Some things
            <br />
            take decades
            <br />
            to build.
          </h2>
          <p className="about-pioneers__lead">
            Technology has changed many times since 1992. Many of the people
            behind our work have not.
          </p>
          <p className="about-pioneers__body">
            We are proud to have colleagues who have spent more than two
            decades growing with Vantage, carrying knowledge, standards and
            experience from one generation to the next.
          </p>
        </motion.div>

        <div className="about-pioneers__grid">
          {PIONEERS.map((person, index) => (
            <motion.figure
              key={person.name}
              initial={reduceMotion ? false : { y: 120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ amount: 0.18, once: true }}
              transition={{
                ...slideTransition,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
            >
              <div className="about-pioneers__photo">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 767px) 50vw, 17vw"
                  quality={90}
                />
              </div>
              <figcaption>
                <strong>{person.name}</strong>
                <span>{person.role}</span>
                <span>{person.since}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <ThinkBeyondSection />
    </div>
  );
}
