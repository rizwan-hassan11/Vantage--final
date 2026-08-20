"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { TeamMember } from "@/lib/content";

type TeamWallProps = {
  members: TeamMember[];
};

export function TeamWall({ members }: TeamWallProps) {
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
    [0, 0.86, 1],
    [0, -travel, -travel]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
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
        <motion.div
          ref={trackRef}
          className="team-wall"
          role="list"
          aria-label="Vantage team"
          style={{ x: isMobile && !reduceMotion ? rawX : 0 }}
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
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 17rem, (min-width: 768px) 30vw, 72vw"
                    quality={95}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{
                      objectPosition: member.imagePosition ?? "center top",
                      transform: `scale(${member.imageScale ?? 1})`,
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
