"use client";

import { HOME_TEAM, TEAM } from "@/lib/content";
import { TeamWall } from "@/components/page/team-wall";

function TeamRailHead({ pinned = false }: { pinned?: boolean }) {
  return (
    <div
      className={
        pinned
          ? "team-rail__head team-rail__pinned-head"
          : "team-rail__head"
      }
    >
      <p className="team-rail__badge">{HOME_TEAM.eyebrow}</p>
      <h2 className="team-rail__title">
        {HOME_TEAM.heading.split("\n").map((line) => (
          <span key={line} className="team-rail__title-line">
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}

export function TeamRail() {
  return (
    <div className="team-rail">
      <TeamRailHead />

      <div className="team-rail__body-row">
        <p className="team-rail__copy">{HOME_TEAM.body}</p>
      </div>

      <div className="team-rail__wall">
        <TeamWall members={TEAM} mobileHeader={<TeamRailHead pinned />} />
      </div>
    </div>
  );
}
