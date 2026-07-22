import Image from "next/image";
import type { TeamMember } from "@/lib/content";

type TeamWallProps = {
  members: TeamMember[];
};

export function TeamWall({ members }: TeamWallProps) {
  return (
    <div className="team-wall" role="list" aria-label="Vantage team">
      {members.map((member, index) => (
        <article
          key={member.name}
          className="team-wall__panel group"
          role="listitem"
        >
          <div className="team-wall__photo">
            <Image
              src={member.image}
              alt={member.name}
              fill
              unoptimized
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
              priority={index < 4}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ objectPosition: member.imagePosition ?? "center top" }}
            />
          </div>
          <div className="team-wall__meta">
            <p className="team-wall__name">{member.name}</p>
            <p className="team-wall__role">{member.role}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
