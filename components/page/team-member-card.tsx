import Image from "next/image";
import type { TeamMember } from "@/lib/content";

type TeamMemberCardProps = {
  member: TeamMember;
  priority?: boolean;
};

export function TeamMemberCard({ member, priority = false }: TeamMemberCardProps) {
  const objectPosition = member.imagePosition ?? "center top";

  return (
    <article className="team-member-card group flex flex-col">
      <div className="team-member-card__photo relative aspect-[3/4] overflow-hidden bg-[color:var(--color-off)] mb-3">
        <Image
          src={member.image}
          alt={member.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ objectPosition }}
        />
      </div>
      <h3 className="font-serif italic text-[color:var(--color-rust)] text-base sm:text-lg leading-tight mb-1">
        {member.name}
      </h3>
      <p className="text-[10px] sm:text-xs tracking-[0.12em] uppercase text-[color:var(--color-mute)]">
        {member.role}
      </p>
    </article>
  );
}
