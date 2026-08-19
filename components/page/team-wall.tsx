"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { TeamMember } from "@/lib/content";

type TeamWallProps = {
  members: TeamMember[];
};

export function TeamWall({ members }: TeamWallProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="team-wall" role="list" aria-label="Vantage team">
      {members.map((member, index) => {
        const row = Math.floor(index / 4);
        const enterFrom = row % 2 === 0 ? 110 : -110;

        return (
        <motion.article
          key={member.name}
          className="team-wall__panel group"
          role="listitem"
          initial={reduceMotion ? false : { x: enterFrom, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { x: 0, opacity: 1 }}
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
              sizes="(min-width: 1024px) 17rem, (min-width: 768px) 30vw, (min-width: 360px) 46vw, 90vw"
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
    </div>
  );
}
