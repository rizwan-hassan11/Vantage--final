import Link from "next/link";
import { HOME_TEAM, TEAM } from "@/lib/content";
import { TeamWall } from "@/components/page/team-wall";

export function TeamRail() {
  return (
    <div className="team-rail">
      <div className="team-rail__head">
        <h2 className="team-rail__title">
          {HOME_TEAM.heading.split("\n").map((line) => (
            <span key={line} className="team-rail__title-line">
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="team-rail__lede-row">
        <span className="team-rail__marker" aria-hidden />
        <p className="team-rail__lede">{HOME_TEAM.lede}</p>
      </div>

      <div className="team-rail__body-row">
        <p className="team-rail__copy">{HOME_TEAM.body}</p>
        <Link href={HOME_TEAM.cta.href} className="btn-pill team-rail__cta">
          {HOME_TEAM.cta.label}
        </Link>
      </div>

      <div className="team-rail__wall">
        <TeamWall members={TEAM} />
      </div>
    </div>
  );
}
