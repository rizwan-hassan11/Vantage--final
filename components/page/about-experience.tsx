"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { MOBILE_ABOUT } from "@/lib/mobile-assets";

const HISTORY = [
  {
    image: "/about/history/design-studio.jpg",
    mobileImage: MOBILE_ABOUT["design-studio"],
    alt: "Vantage Design Studio 2011",
    caption: ["Vantage Design Studio 2011"],
  },
  {
    image: "/about/history/celebration.jpg",
    mobileImage: MOBILE_ABOUT.celebration,
    alt: "Creative Manager's birthday, Vantage Studio, Lahore 2012",
    caption: ["Creative Manager's birthday Vantage Studio, Lahore 2012"],
  },
  {
    image: "/about/history/production.jpg",
    mobileImage: MOBILE_ABOUT.production,
    alt: "Production Team, Vantage 2008",
    caption: ["Production Team, Vantage 2008"],
  },
  {
    image: "/about/history/offset.jpg",
    mobileImage: MOBILE_ABOUT.offset,
    alt: "Offset Operators, Vantage 2005",
    caption: ["Offset Operators, Vantage 2005"],
  },
  {
    image: "/about/history/master-binder.jpg",
    mobileImage: MOBILE_ABOUT["master-binder"],
    alt: "Asif Khan, Master Binder Vantage 2004",
    caption: ["Asif Khan, Master Binder Vantage 2004"],
  },
  {
    image: "/about/history/green-day.jpg",
    mobileImage: MOBILE_ABOUT["green-day"],
    alt: "Environment Day, Vantage 2004",
    caption: ["Environment Day, Vantage 2004"],
  },
] as const;

const PIONEERS = [
  {
    image: "/about/pioneers/manzoor-ahmed.jpg",
    mobileImage: MOBILE_ABOUT["manzoor-ahmed"],
    name: "Manzoor Ahmed",
    role: "Master Operator",
    since: "With Vantage since 1992",
  },
  {
    image: "/about/pioneers/asif-khan.jpg",
    mobileImage: MOBILE_ABOUT["asif-khan"],
    name: "Asif Khan",
    role: "Manual Binder",
    since: "With Vantage since 1992",
  },
  {
    image: "/about/pioneers/muhammad-hafeez.jpg",
    mobileImage: MOBILE_ABOUT["muhammad-hafeez"],
    name: "Muhammad Hafeez",
    role: "Admin",
    since: "With Vantage since 1994",
  },
  {
    image: "/about/pioneers/aqeel-haider.jpg",
    mobileImage: MOBILE_ABOUT["aqeel-haider"],
    name: "Aqeel Haider",
    role: "Production on Offset KBA",
    since: "With Vantage since 1995",
  },
  {
    image: "/about/pioneers/muhammad-shahid.jpg",
    mobileImage: MOBILE_ABOUT["muhammad-shahid"],
    name: "Muhammad Shahid",
    role: "Production Officer (Binding & Finishing)",
    since: "With Vantage since 2001",
  },
  {
    image: "/about/pioneers/zaheer-ahmed.jpg",
    mobileImage: MOBILE_ABOUT["zaheer-ahmed"],
    name: "Zaheer Ahmed",
    role: "Asst. Manager Production",
    since: "With Vantage since 2002",
  },
] as const;

function ThinkBeyondSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
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
  const signatureOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.16, 1],
    [0, 0, 1, 1]
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
    scrollYProgress,
    [0, 0.12, 0.38, 1],
    [1, 1, 0, 0]
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
          <ResponsiveImage
            src="/about/studio.jpg"
            mobileSrc={MOBILE_ABOUT.studio}
            alt="CEO office at Vantage"
            fill
            sizes="100vw"
            quality={80}
          />
        </motion.div>
        <motion.div
          className="about-belief__signature"
          style={{
            scale: smoothSignatureScale,
            y: smoothSignatureY,
            opacity: signatureOpacity,
          }}
          role="img"
          aria-label="Think Beyond"
        >
          <svg
            className="about-belief__signature-art about-belief__signature-art--orange"
            viewBox="95 43 237.5 96.1"
            aria-hidden
          >
            <use href="/Vantage_latest.svg#think-beyond-signature" />
          </svg>
          <motion.svg
            className="about-belief__signature-art about-belief__signature-art--white"
            viewBox="95 43 237.5 96.1"
            style={{ opacity: whiteSignatureOpacity }}
            aria-hidden
          >
            <use href="/Vantage_latest.svg#think-beyond-signature" />
          </motion.svg>
        </motion.div>

        <motion.div className="about-belief__panel" style={{ y: panelY }}>
          <LiquidMetalButton href="/work" label="Explore Our Work" />
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
        <ResponsiveImage
          src="/about/crowd.jpg"
          mobileSrc={MOBILE_ABOUT.hero}
          alt="Vantage about page landing photo"
          fill
          priority
          sizes="100vw"
          quality={80}
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
                <ResponsiveImage
                  src={item.image}
                  mobileSrc={item.mobileImage}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 50vw, 23vw"
                  quality={80}
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
          initial={reduceMotion ? false : { x: -140, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.12, once: true }}
          transition={{
            duration: reduceMotion ? 0 : 1.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="about-bar">People Who Built Vantage</p>
          <h2>
            Some journeys are
            <br />
            measured in years.
          </h2>
          <p className="about-pioneers__lead">
            <span className="about-pioneers__lead-second">
              Ours is measured
              <br />
              in people.
            </span>
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
                <ResponsiveImage
                  src={person.image}
                  mobileSrc={person.mobileImage}
                  alt={person.name}
                  fill
                  sizes="(max-width: 767px) 50vw, 17vw"
                  quality={80}
                  style={
                    person.name === "Muhammad Hafeez"
                      ? { transform: "scale(1.2)" }
                      : person.name === "Zaheer Ahmed"
                        ? { transform: "scale(1.1)" }
                      : undefined
                  }
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
