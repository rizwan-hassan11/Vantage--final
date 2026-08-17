"use client";

import {
  liquidMetalFragmentShader,
  ShaderMount,
} from "@paper-design/shaders";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label: string;
  href: string;
  className?: string;
}

type ShaderController = {
  destroy?: () => void;
  setSpeed?: (speed: number) => void;
};

export function LiquidMetalButton({
  label,
  href,
  className = "",
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<ShaderController | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const rippleId = useRef(0);

  useEffect(() => {
    const styleId = "vantage-liquid-metal-button-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .liquid-metal-button__shader canvas {
          position: absolute !important;
          inset: 0 !important;
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: inherit !important;
        }
        @keyframes liquid-metal-ripple {
          from {
            transform: translate(-50%, -50%) scale(0);
            opacity: .65;
          }
          to {
            transform: translate(-50%, -50%) scale(5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    if (!shaderRef.current) return;

    shaderMount.current = new ShaderMount(
      shaderRef.current,
      liquidMetalFragmentShader,
      {
        u_repetition: 4,
        u_softness: 0.55,
        u_shiftRed: 0.28,
        u_shiftBlue: 0.18,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 45,
        u_scale: 8,
        u_shape: 1,
        u_offsetX: 0.1,
        u_offsetY: -0.1,
      },
      undefined,
      0.6,
    );

    return () => {
      shaderMount.current?.destroy?.();
      shaderMount.current = null;
    };
  }, []);

  const handlePointerEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    shaderMount.current?.setSpeed?.(2.4);
    window.setTimeout(() => {
      shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6);
    }, 300);

    const rect = linkRef.current?.getBoundingClientRect();
    if (!rect) return;

    const ripple = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: rippleId.current++,
    };
    setRipples((current) => [...current, ripple]);
    window.setTimeout(() => {
      setRipples((current) =>
        current.filter((currentRipple) => currentRipple.id !== ripple.id),
      );
    }, 600);
  };

  return (
    <div
      className={`liquid-metal-button relative inline-block ${className}`}
      style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
    >
      <div
        className="absolute inset-0 z-30 flex items-center justify-center"
        style={{
          color: "#ffffff",
          fontFamily: "var(--font-onest), var(--font-sans)",
          fontSize: "clamp(0.56rem, 0.72vw, 0.656rem)",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textShadow: "0 1px 3px rgba(67, 18, 5, 0.55)",
          textTransform: "uppercase",
          transform: "translateZ(20px)",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>

      <div
        className="absolute inset-[2px] z-20 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-rust) 88%, white), var(--color-rust-2))",
          boxShadow: isPressed
            ? "inset 0 3px 6px rgba(74, 18, 4, 0.42)"
            : "inset 0 1px 1px rgba(255,255,255,0.36)",
          transform: `translateZ(10px) ${
            isPressed ? "translateY(1px) scale(.985)" : ""
          }`,
          transition: "transform 180ms ease, box-shadow 180ms ease",
        }}
      />

      <div
        className="absolute inset-0 z-10 rounded-full"
        style={{
          boxShadow: isPressed
            ? "0 1px 3px rgba(66, 16, 4, .32)"
            : isHovered
              ? "0 10px 18px rgba(91, 27, 8, .28), 0 2px 5px rgba(68, 18, 5, .22)"
              : "0 7px 14px rgba(91, 27, 8, .22), 0 2px 4px rgba(68, 18, 5, .18)",
          transform: isPressed ? "scale(.985)" : "scale(1)",
          transition: "transform 180ms ease, box-shadow 220ms ease",
        }}
      >
        <div
          ref={shaderRef}
          className="liquid-metal-button__shader relative h-full w-full overflow-hidden rounded-full"
          style={{
            filter:
              "sepia(.72) saturate(2.35) hue-rotate(326deg) brightness(1.08)",
          }}
        />
      </div>

      <a
        ref={linkRef}
        href={href}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerCancel={() => setIsPressed(false)}
        className="absolute inset-0 z-40 overflow-hidden rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        style={{ transform: "translateZ(25px)" }}
        aria-label={label}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute h-5 w-5 rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              background:
                "radial-gradient(circle, rgba(255,255,255,.62), rgba(255,255,255,0) 70%)",
              animation: "liquid-metal-ripple .6s ease-out",
            }}
          />
        ))}
      </a>
    </div>
  );
}
