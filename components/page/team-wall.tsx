"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { TeamMember } from "@/lib/content";
import { MOBILE_TEAM_IMAGES } from "@/lib/mobile-assets";
import { ResponsiveImage } from "@/components/ui/responsive-image";

type TeamWallProps = {
  members: TeamMember[];
  mobileHeader?: ReactNode;
};

export function TeamWall({ members, mobileHeader }: TeamWallProps) {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -travel]
  );
  const smoothX = useSpring(rawX, {
    stiffness: 105,
    damping: 30,
    mass: 0.45,
    restDelta: 0.5,
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const updateMedia = () => setIsMobile(media.matches);
    updateMedia();
    media.addEventListener("change", updateMedia);
    return () => media.removeEventListener("change", updateMedia);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const updateTravel = () => {
      setTravel(Math.max(0, track.scrollWidth - stage.clientWidth));
    };
    updateTravel();

    const observer = new ResizeObserver(updateTravel);
    observer.observe(stage);
    observer.observe(track);
    return () => observer.disconnect();
  }, [members.length, isMobile]);

  return (
    <div
      ref={scrollRef}
      className={`team-wall-scroll${
        reduceMotion ? " team-wall-scroll--reduced" : ""
      }`}
      style={
        { "--team-scroll-distance": `${travel}px` } as CSSProperties
      }
    >
      <div
        ref={stageRef}
        className="team-wall-scroll__stage"
        data-nav-theme="solid"
      >
        {mobileHeader}
        <motion.div
          ref={trackRef}
          className="team-wall"
          role="list"
          aria-label="Vantage team"
          style={{ x: isMobile && !reduceMotion ? smoothX : 0 }}
        >
          {members.map((member, index) => {
            const row = Math.floor(index / 4);
            const enterFrom = row % 2 === 0 ? 110 : -110;

            return (
              <motion.article
                key={member.name}
                className="team-wall__panel group"
                role="listitem"
                initial={
                  reduceMotion || isMobile
                    ? false
                    : { x: enterFrom, opacity: 0 }
                }
                whileInView={
                  reduceMotion || isMobile
                    ? undefined
                    : { x: 0, opacity: 1 }
                }
                viewport={{ amount: 0.18 }}
                transition={{
                  duration: 0.72,
                  delay: (index % 4) * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="team-wall__photo">
                  <ResponsiveImage
                    src={member.image}
                    mobileSrc={MOBILE_TEAM_IMAGES[member.name]}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 17rem, 72vw"
                    quality={80}
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{
                      objectFit: member.imageFit ?? "cover",
                      objectPosition: member.imagePosition ?? "center top",
                      transform: `translateY(${member.imageOffsetY ?? 0}%) scale(${
                        member.imageScale ?? 1
                      })`,
                    }}
                  />
                </div>
                <div className="team-wall__meta">
                  <p className="team-wall__name">{member.name}</p>
                  <p className="team-wall__role">{member.role}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
