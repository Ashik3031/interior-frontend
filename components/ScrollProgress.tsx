"use client";

import React, { useState, useEffect, useRef } from "react";

interface ScrollProgressProps {
  onSectionChange?: (section: string) => void;
}

export default function ScrollProgress({ onSectionChange }: ScrollProgressProps) {
  // Target and smoothly animated counter (whole numbers, formatted as 2-digit e.g. 00, 41, 72, 99)
  const targetPercentRef = useRef(0);
  const currentPercentRef = useRef(0);
  const [displayCounter, setDisplayCounter] = useState("00");

  // Track progress ratio (0 to 1) for the line and moving number
  const [progressRatio, setProgressRatio] = useState(0);

  // Viewport height tracking for responsive layout calculation
  const [viewportHeight, setViewportHeight] = useState(900);

  // Active theme: "dark" (white on dark/blue photo sections) or "light" (deep navy on cream/white sections)
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">("dark");

  const rafIdRef = useRef<number | null>(null);

  // Smooth lerp animation loop for the numeric counter
  useEffect(() => {
    const animateCounter = () => {
      const diff = targetPercentRef.current - currentPercentRef.current;
      if (Math.abs(diff) > 0.08) {
        currentPercentRef.current += diff * 0.18;
      } else {
        currentPercentRef.current = targetPercentRef.current;
      }

      const rounded = Math.min(100, Math.max(0, Math.round(currentPercentRef.current)));
      setDisplayCounter(String(rounded).padStart(2, "0"));

      rafIdRef.current = requestAnimationFrame(animateCounter);
    };

    rafIdRef.current = requestAnimationFrame(animateCounter);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Track viewport height on resize for accurate geometry
  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

        targetPercentRef.current = Math.round(ratio * 100);
        setProgressRatio(ratio);

        // Section theme detection based on the moving number's current viewport position
        const topStart = Math.max(140, window.innerHeight * 0.2);
        const bottomMargin = Math.max(36, window.innerHeight * 0.05);
        const maxNumberY = window.innerHeight - bottomMargin - 24 - 12 - 44 - 20 - 16;
        const travelDistance = Math.max(100, maxNumberY - topStart);
        const currentNumberY = topStart + ratio * travelDistance;

        const themedElements = document.querySelectorAll("[data-theme]");

        let detectedTheme: "dark" | "light" = "dark";
        let activeSectionId = "home";

        themedElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Check if this section spans across the number's current position
          if (rect.top <= currentNumberY && rect.bottom >= currentNumberY) {
            const theme = el.getAttribute("data-theme");
            if (theme === "light" || theme === "cream") {
              detectedTheme = "light";
            } else {
              detectedTheme = "dark";
            }
            if (el.id) {
              activeSectionId = el.id;
            }
          }
        });

        // Fallback: Also check if <html> has rail-invert class set by section scroll triggers
        if (detectedTheme === "dark" && document.documentElement.classList.contains("rail-invert")) {
          detectedTheme = "light";
          if (activeSectionId === "home") {
            activeSectionId = "process";
          }
        }

        setActiveTheme(detectedTheme);
        if (onSectionChange) {
          onSectionChange(activeSectionId);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onSectionChange]);

  const scrollToNext = () => {
    const sections = Array.from(document.querySelectorAll("section[id], main > div[id]"));
    const scrollY = window.scrollY;
    let nextTarget: Element | null = null;

    for (const section of sections) {
      const top = section.getBoundingClientRect().top + scrollY;
      if (top > scrollY + 80) {
        nextTarget = section;
        break;
      }
    }

    if (nextTarget) {
      nextTarget.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  // Theme color styles
  const isLight = activeTheme === "light";
  const foregroundColor = isLight ? "#171816" : "#FFFFFF"; // Deep Charcoal on cream/ivory, pure white on dark
  const trackColor = isLight ? "rgba(23, 24, 22, 0.75)" : "rgba(255, 255, 255, 0.75)";
  const labelColor = isLight ? "#171816" : "#FFFFFF";

  // Position and geometry calculations matching the reference
  const topStart = Math.max(140, viewportHeight * 0.2); // starts below header area (~20% from top)
  const bottomMargin = Math.max(36, viewportHeight * 0.05); // bottom margin (~5% from bottom)
  const arrowHeight = 24;
  const arrowGap = 12;
  const scrollLabelHeight = 44;
  const scrollLabelGap = 20;

  // Bottom boundary where the moving number stops before the "SCROLL" label
  const maxNumberY = viewportHeight - bottomMargin - arrowHeight - arrowGap - scrollLabelHeight - scrollLabelGap - 16;
  const travelDistance = Math.max(100, maxNumberY - topStart);

  // Current position of the moving number along the vertical track
  const currentNumberY = topStart + progressRatio * travelDistance;
  // Height of the line extending from topStart down to just above the number
  const lineHeight = Math.max(0, currentNumberY - topStart - 8);

  return (
    <aside
      aria-label="Vertical scroll progress"
      className="fixed inset-y-0 z-40 hidden md:flex flex-col select-none pointer-events-none transition-colors duration-500 ease-out"
      style={{
        right: "26px",
        color: foregroundColor,
      }}
    >
      {/* 1. EXTENDING VERTICAL LINE (from topStart down to just above the moving number) */}
      <div
        className="absolute w-[1px] transition-colors duration-500 ease-out"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          top: `${topStart}px`,
          height: `${lineHeight}px`,
          backgroundColor: trackColor,
        }}
        aria-hidden="true"
      />

      {/* 2. SMOOTHLY MOVING NUMBER (rides directly at the tip of the extending line) */}
      <div
        className="absolute w-8 flex items-center justify-center font-sans font-bold text-[11px] md:text-[12px] tracking-tight tabular-nums transition-colors duration-500 ease-out leading-none"
        style={{
          left: "50%",
          transform: `translateX(-50%)`,
          top: `${currentNumberY}px`,
          color: foregroundColor,
        }}
        aria-live="polite"
        title={`Scroll Progress: ${displayCounter}%`}
      >
        {displayCounter}
      </div>

      {/* 3. FIXED BOTTOM GROUP: "SCROLL" LABEL & DOWNWARD ARROW */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          bottom: `${bottomMargin}px`,
        }}
      >
        {/* "SCROLL" label - oriented vertically top-to-bottom as in reference */}
        <div className="mb-3 flex items-center justify-center">
          <span
            className="font-sans font-bold text-[9px] md:text-[10px] tracking-[0.24em] uppercase transition-colors duration-500 ease-out"
            style={{
              color: labelColor,
              writingMode: "vertical-rl",
            }}
          >
            SCROLL
          </span>
        </div>

        {/* Minimalist Downward Arrow: vertical stem with arrowhead */}
        <button
          type="button"
          onClick={scrollToNext}
          aria-label="Scroll down to next section"
          className="group p-1 focus:outline-none pointer-events-auto cursor-pointer transition-colors duration-500"
          style={{ color: foregroundColor }}
        >
          <svg
            className="w-2.5 h-[24px] transform group-hover:translate-y-1 transition-all duration-300"
            viewBox="0 0 8 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <line x1="4" y1="0" x2="4" y2="22" strokeLinecap="round" />
            <polyline points="1,17 4,22 7,17" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
