"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { ClientLogo } from "@/lib/clients-data";

type ClientLogoWallProps = {
  clients: ClientLogo[];
};

const STRIP_COUNT = 5;
const HOVER_MULTIPLIER = 1.75;
/** Ease factor — higher = snappier hover speed change, still smooth */
const SPEED_LERP = 4.2;

function splitIntoStrips(clients: ClientLogo[], stripCount: number): ClientLogo[][] {
  const strips: ClientLogo[][] = Array.from({ length: stripCount }, () => []);
  clients.forEach((client, index) => {
    strips[index % stripCount].push(client);
  });
  return strips;
}

function padStrip(clients: ClientLogo[], minCount = 14): ClientLogo[] {
  if (clients.length === 0) return clients;
  const padded = [...clients];
  while (padded.length < minCount) {
    padded.push(...clients);
  }
  return padded;
}

/** Different speed + direction per row so strips feel random */
function stripMotion(index: number) {
  const speeds = [18, 24, 15, 28, 20];
  const directions = [-1, 1, -1, 1, -1] as const;
  return {
    baseSpeed: speeds[index % speeds.length] ?? 20,
    direction: directions[index % directions.length] ?? -1,
  };
}

function startOffsetRatio(speed: number, direction: number) {
  return ((speed * 17 + (direction < 0 ? 3 : 11)) % 100) / 100;
}

function ClientLogoStrip({
  clients,
  baseSpeed,
  direction,
}: {
  clients: ClientLogo[];
  baseSpeed: number;
  direction: 1 | -1;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(baseSpeed);
  const targetSpeedRef = useRef(baseSpeed);
  const baseSpeedRef = useRef(baseSpeed);
  const dirRef = useRef(direction);

  const padded = useMemo(() => padStrip(clients), [clients]);
  const loop = useMemo(() => [...padded, ...padded], [padded]);

  useEffect(() => {
    baseSpeedRef.current = baseSpeed;
    targetSpeedRef.current = baseSpeed;
    speedRef.current = baseSpeed;
    dirRef.current = direction;
  }, [baseSpeed, direction]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let frame = 0;
    let last = performance.now();
    let halfWidth = 0;

    const measure = () => {
      halfWidth = track.scrollWidth / 2;
    };

    const wrap = () => {
      if (halfWidth <= 1) return;
      while (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
      while (offsetRef.current > 0) offsetRef.current -= halfWidth;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const target = targetSpeedRef.current;
      speedRef.current +=
        (target - speedRef.current) * Math.min(1, SPEED_LERP * dt);

      if (halfWidth > 1) {
        offsetRef.current += dirRef.current * speedRef.current * dt;
        wrap();
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => {
      const prev = halfWidth;
      measure();
      if (prev > 1 && halfWidth > 1) {
        offsetRef.current = (offsetRef.current / prev) * halfWidth;
        wrap();
      }
    });
    ro.observe(track);

    frame = requestAnimationFrame(() => {
      measure();
      offsetRef.current = -(
        startOffsetRatio(baseSpeed, direction) * Math.max(halfWidth, 1)
      );
      wrap();
      last = performance.now();
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [baseSpeed, direction]);

  return (
    <div
      className="client-logo-strip"
      onMouseEnter={() => {
        targetSpeedRef.current = baseSpeedRef.current * HOVER_MULTIPLIER;
      }}
      onMouseLeave={() => {
        targetSpeedRef.current = baseSpeedRef.current;
      }}
    >
      <div ref={trackRef} className="client-logo-strip__track">
        {loop.map((client, index) => (
          <div
            key={`${client.slug}-${index}`}
            className="client-logo-strip__item"
            title={client.name}
          >
            <div className="client-logo-strip__media">
              <Image
                src={client.logo}
                alt={client.name}
                fill
                sizes="140px"
                className="client-logo-strip__image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientLogoWall({ clients }: ClientLogoWallProps) {
  const strips = useMemo(
    () => splitIntoStrips(clients, STRIP_COUNT),
    [clients]
  );

  return (
    <div
      className="client-logo-strips"
      role="region"
      aria-label={`Client logos — ${clients.length} brands`}
    >
      <p className="sr-only">
        Showing all {clients.length} client logos across {STRIP_COUNT} scrolling
        strips.
      </p>
      {strips.map((strip, index) => {
        const motion = stripMotion(index);
        return (
          <ClientLogoStrip
            key={`strip-${index}`}
            clients={strip}
            baseSpeed={motion.baseSpeed}
            direction={motion.direction}
          />
        );
      })}
    </div>
  );
}
