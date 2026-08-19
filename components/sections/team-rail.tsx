"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { HOME_TEAM, TEAM } from "@/lib/content";
import { TeamWall } from "@/components/page/team-wall";

export function TeamRail() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headHeight, setHeadHeight] = useState(0);

  useEffect(() => {
    const head = headRef.current;
    if (!head) return;

    const updateHeight = () => setHeadHeight(head.offsetHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(head);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="team-rail"
      style={
        { "--team-head-height": `${headHeight}px` } as CSSProperties
      }
    >
      <div ref={headRef} className="team-rail__head">
        <Image
          src="/vantage-mobile-lockup-ink.svg"
          alt=""
          width={333}
          height={139}
          unoptimized
          className="team-rail__mobile-logo"
          aria-hidden
        />
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
