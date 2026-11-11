"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export type IntroStage = "revealing" | "holding" | "traveling" | "complete";

interface LoadingScreenProps {
  onStageChange?: (stage: IntroStage) => void;
  onComplete?: () => void;
}

export default function LoadingScreen({
  onStageChange,
  onComplete,
}: LoadingScreenProps) {
  const [stage, setStage] = useState<IntroStage>("revealing");
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [targetMetrics, setTargetMetrics] = useState({
    deltaX: 0,
    deltaY: -350,
    scale: 0.46,
    baseWidth: 94,
    baseHeight: 120,
  });

  const centerLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion: skip travel animation immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setStage("complete");
      onStageChange?.("complete");
      onComplete?.();
      setIsUnmounted(true);
      return;
    }

    // Lock scrolling on mount during intro
    window.scrollTo(0, 0);
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Helper to calculate exact navbar logo destination
    const calculateGeometry = () => {
      const isDesktop = window.innerWidth >= 1024;
      const selector = isDesktop
        ? '[data-navbar-logo="desktop"]'
        : '[data-navbar-logo="mobile"]';

      const targetEl = document.querySelector(selector) as HTMLElement | null;
      const centerEl = centerLogoRef.current;

      const targetRect = targetEl?.getBoundingClientRect();
      const centerRect = centerEl?.getBoundingClientRect();

      const centerCenterX = centerRect
        ? centerRect.left + centerRect.width / 2
        : window.innerWidth / 2;
      const centerCenterY = centerRect
        ? centerRect.top + centerRect.height / 2
        : window.innerHeight / 2;

      const baseHeight = centerRect?.height || (window.innerWidth < 768 ? 96 : 120);

      if (targetRect && targetRect.width > 0 && targetRect.height > 0) {
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const scale = targetRect.height / baseHeight;
        return {
          deltaX: targetCenterX - centerCenterX,
          deltaY: targetCenterY - centerCenterY,
          scale,
        };
      }

      // Robust fallback if targetRect is not measured yet
      if (isDesktop) {
        return {
          deltaX: 0,
          deltaY: -(window.innerHeight / 2 - 48),
          scale: 48 / 120,
        };
      } else {
        return {
          deltaX: -(window.innerWidth / 2 - 40),
          deltaY: -(window.innerHeight / 2 - 40),
          scale: 40 / 96,
        };
      }
    };

    // Stage 2: Brief Hold (starts at 420ms)
    const tHold = setTimeout(() => {
      setStage("holding");
      onStageChange?.("holding");
    }, 420);

    // Stage 3 & 4: Background Fade & Travel (starts at 750ms)
    const tTravel = setTimeout(() => {
      const geo = calculateGeometry();
      setTargetMetrics((prev) => ({
        ...prev,
        deltaX: geo.deltaX,
        deltaY: geo.deltaY,
        scale: geo.scale,
      }));

      setStage("traveling");
      onStageChange?.("traveling");
    }, 750);

    // Stage 5: Reveal complete homepage & Seamless Hand-off (at 750 + 950 = 1700ms)
    const tComplete = setTimeout(() => {
      setStage("complete");
      onStageChange?.("complete");
      onComplete?.();

      // Restore scroll interaction
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    }, 1700);

    // Final unmount from DOM (at 1850ms)
    const tUnmount = setTimeout(() => {
      setIsUnmounted(true);
    }, 1850);

    return () => {
      clearTimeout(tHold);
      clearTimeout(tTravel);
      clearTimeout(tComplete);
      clearTimeout(tUnmount);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [onStageChange, onComplete]);

  if (isUnmounted) return null;

  const isTraveling = stage === "traveling";
  const isComplete = stage === "complete";

  // When traveling, glide to target destination.
  // When complete, hide overlay logo so navbar logo seamlessly takes over.
  // Otherwise, center logo is visible and animating/holding in place.
  let logoTransform = "translate3d(0, 0, 0) scale(1)";
  let logoOpacity = 1;

  if (isTraveling) {
    logoTransform = `translate3d(${targetMetrics.deltaX}px, ${targetMetrics.deltaY}px, 0) scale(${targetMetrics.scale})`;
    logoOpacity = 1;
  } else if (isComplete) {
    logoTransform = `translate3d(${targetMetrics.deltaX}px, ${targetMetrics.deltaY}px, 0) scale(${targetMetrics.scale})`;
    logoOpacity = 0;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden"
    >
      {/* 1. Solid Warm Ivory Background Overlay (#F5F0E7) */}
      <div
        className="absolute inset-0 bg-[#F5F0E7]"
        style={{
          opacity: isTraveling || isComplete ? 0 : 1,
          transition: isTraveling
            ? "opacity 950ms cubic-bezier(0.25, 1, 0.5, 1)"
            : "none",
          pointerEvents: isTraveling || isComplete ? "none" : "auto",
        }}
      />

      {/* 2. Centered Logo Stage with Dynamic Geometry Travel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={centerLogoRef}
          style={{
            width: `${targetMetrics.baseWidth}px`,
            height: `${targetMetrics.baseHeight}px`,
            transform: logoTransform,
            opacity: logoOpacity,
            transformOrigin: "center center",
            transition: isTraveling
              ? "transform 950ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease"
              : isComplete
              ? "opacity 100ms ease"
              : "none",
            willChange: "transform, opacity",
          }}
          className={`relative flex-shrink-0 ${
            stage === "revealing" ? "animate-intro-logo" : ""
          }`}
        >
          <Image
            src="/images/RM Interior - Logo Icon .png"
            alt="RichMan Interiors Crown and Monogram Emblem"
            width={120}
            height={160}
            priority
            className="w-full h-full object-contain filter drop-shadow-md brightness-105"
          />
        </div>
      </div>
    </div>
  );
}
