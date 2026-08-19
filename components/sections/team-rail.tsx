import { HOME_TEAM, TEAM } from "@/lib/content";
import { TeamWall } from "@/components/page/team-wall";

export function TeamRail() {
  return (
    <div className="team-rail">
      <div className="team-rail__head">
        <p className="team-rail__badge">{HOME_TEAM.eyebrow}</p>
        <h2 className="team-rail__title">
          {HOME_TEAM.heading.split("\n").map((line) => (
            <span key={line} className="team-rail__title-line">
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="team-rail__body-row">
        <p className="team-rail__copy">{HOME_TEAM.body}</p>
      </div>

      <div className="team-rail__wall">
        <TeamWall members={TEAM} />
      </div>
    </div>
  );
}
