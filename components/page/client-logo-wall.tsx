"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { ClientLogo } from "@/lib/clients-data";

type ClientLogoWallProps = {
  clients: ClientLogo[];
  /** Number of marquee rows */
  strips?: number;
  /** `bare` = no boxes, full B/W → color on hover, white bg (homepage) */
  variant?: "default" | "bare";
};

const DEFAULT_STRIP_COUNT = 3;
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

/* A row needs enough marks to outrun the widest viewport before it loops;
   below that we repeat the row, which is why the threshold stays low. */
function padStrip(clients: ClientLogo[], minCount = 12): ClientLogo[] {
  if (clients.length === 0) return clients;
  const padded = [...clients];
  while (padded.length < minCount) {
    padded.push(...clients);
  }
  return padded;
}

/** Different speed + direction per row so strips feel random */
function stripMotion(index: number) {
  const speeds = [18, 26, 15, 28, 20];
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
    let running = false;

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

      if (running) frame = requestAnimationFrame(tick);
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

    measure();
    offsetRef.current = -(
      startOffsetRatio(baseSpeed, direction) * Math.max(halfWidth, 1)
    );
    wrap();
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: "120px 0px" }
    );
    visibilityObserver.observe(track);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (
        track.getBoundingClientRect().bottom >= -120 &&
        track.getBoundingClientRect().top <= window.innerHeight + 120
      ) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      ro.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
            title={index < padded.length ? client.name : undefined}
            aria-hidden={index >= padded.length}
          >
            <div className="client-logo-strip__media">
              <Image
                src={client.logo}
                alt={index < padded.length ? client.name : ""}
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

export function ClientLogoWall({
  clients,
  strips: stripCount = DEFAULT_STRIP_COUNT,
  variant = "default",
}: ClientLogoWallProps) {
  const strips = useMemo(
    () => splitIntoStrips(clients, stripCount),
    [clients, stripCount]
  );

  return (
    <div
      className={
        variant === "bare"
          ? "client-logo-strips client-logo-strips--bare"
          : "client-logo-strips"
      }
      role="region"
      aria-label={`Client logos — ${clients.length} brands`}
    >
      <p className="sr-only">
        Showing all {clients.length} client logos across {stripCount} scrolling
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
