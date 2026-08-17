import { HOME_TEAM, TEAM_LEADERSHIP } from "@/lib/content";
import { TeamWall } from "@/components/page/team-wall";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

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
        <LiquidMetalButton
          href={HOME_TEAM.cta.href}
          label={HOME_TEAM.cta.label}
        />
      </div>

      <div className="team-rail__wall">
        <TeamWall members={TEAM_LEADERSHIP} />
      </div>
    </div>
  );
}
