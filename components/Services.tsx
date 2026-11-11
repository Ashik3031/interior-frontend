"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  href: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    title: "Complete Turnkey Fit-Out",
    description:
      "Full-spectrum architectural delivery from shell and core to white-glove handover under one unified atelier roof.",
    cta: "EXPLORE TURNKEY FIT-OUT",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    href: "/services/complete-turnkey-fit-out",
  },
  {
    id: "02",
    title: "Villa & Apartment Renovations",
    description:
      "Transforming mature villas and luxury penthouses into contemporary, light-filled architectural sanctuaries.",
    cta: "REIMAGINE YOUR RESIDENCE",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    href: "/services/villa-apartment-renovations",
  },
  {
    id: "03",
    title: "Office & Commercial Interiors",
    description:
      "Inspiring corporate headquarters, private family offices, and commercial spaces with STC-55+ acoustic isolation.",
    cta: "DISCOVER COMMERCIAL DESIGN",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    href: "/services/office-commercial-interiors",
  },
  {
    id: "04",
    title: "MEP Works — Electrical, HVAC & Plumbing",
    description:
      "Whisper-quiet VRF/chilled air conditioning, frameless slot diffusers, DALI smart lighting, and precision plumbing.",
    cta: "VIEW MEP CAPABILITIES",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    href: "/services/mep-works",
  },
  {
    id: "05",
    title: "Authority Approval Coordination",
    description:
      "Direct expediting and fast-track permits across Dubai Municipality, Civil Defence (DCD), Emaar, Nakheel, and Trakhees.",
    cta: "STATUTORY APPROVALS",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    href: "/services/authority-approval-coordination",
  },
  {
    id: "06",
    title: "Project Management & Execution",
    description:
      "Continuous on-site superintendence, critical path milestone scheduling, and zero-tolerance QA/QC inspection regimes.",
    cta: "PROJECT EXECUTION",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    href: "/services/project-management-execution",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Measure dynamic dimensions for horizontal desktop scroll based on real DOM positions
  const updateMeasurements = useCallback(() => {
    if (typeof window === "undefined") return;
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);

    if (!mobile && trackRef.current) {
      const cards = trackRef.current.querySelectorAll("article");
      if (cards.length > 0) {
        const lastCard = cards[cards.length - 1] as HTMLElement;
        const lastCardRightRelativeToTrack =
          lastCard.offsetLeft + lastCard.offsetWidth;

        // Allow a generous end gap so the last card rests fully on screen before unpinning
        const endGap = Math.max(60, window.innerWidth * 0.06);
        const targetTranslate = Math.max(
          0,
          lastCardRightRelativeToTrack - window.innerWidth + endGap
        );

        setMaxTranslate(targetTranslate);
      } else {
        const trackScrollWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setMaxTranslate(Math.max(0, trackScrollWidth - viewportWidth + 80));
      }
    }
  }, []);

  useEffect(() => {
    updateMeasurements();
    window.addEventListener("resize", updateMeasurements, { passive: true });
    window.addEventListener("load", updateMeasurements, { passive: true });
    return () => {
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("load", updateMeasurements);
    };
  }, [updateMeasurements]);

  // Desktop pinned horizontal scroll animation with resting buffer at the end
  useEffect(() => {
    if (isMobile) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current || !trackRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable <= 0) return;

        // Progress strictly bounded between 0 and 1
        const rawProgress = -rect.top / totalScrollable;
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        // Horizontal movement completes at 80% of scroll progress,
        // leaving the remaining 20% as a stationary buffer runway so the final card
        // is fully visible, comfortable, and readable before the section unpins
        const travelProgress = Math.min(progress / 0.8, 1);
        const currentX = travelProgress * maxTranslate;
        trackRef.current.style.transform = `translate3d(-${currentX}px, 0, 0)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, maxTranslate]);

  // Outer container scroll height for desktop: 100vh + travel distance + buffer
  const desktopContainerHeight =
    maxTranslate > 0
      ? `calc(100vh + ${Math.round(maxTranslate * 1.6)}px)`
      : "340vh";

  return (
    <section
      id="services"
      data-theme="light"
      className="relative bg-white text-[#171816] select-none"
    >
      {/* 1. DEDICATED SECTION HEADER (Zero overlap with cards, clean luxury typography) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-14 flex-shrink-0">
        {/* Section Marker & Label */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#BE9B59] inline-block shadow-sm" />
          <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold">
            OUR SERVICES
          </span>
        </div>

        {/* Large Serif Headline */}
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-light text-[#171816] tracking-tight leading-[1.14] max-w-4xl">
          Get the Luxury Interior Design in Dubai You&apos;ve Been Dreaming Of.
        </h2>
      </div>

      {/* 2. PINNED HORIZONTAL CARDS SHOWCASE */}
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: isMobile ? "auto" : desktopContainerHeight,
        }}
      >
        <div
          className={`${isMobile
            ? "relative px-6 sm:px-8 pb-16"
            : "sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white"
            }`}
        >
          {isMobile ? (
            /* MOBILE NATIVE TOUCH CARDS TRACK */
            <div
              className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 -mx-6 px-6 scrollbar-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {SERVICES_DATA.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isMobile={true}
                />
              ))}
            </div>
          ) : (
            /* DESKTOP / TABLET HORIZONTALLY PINNED CARDS TRACK */
            <div className="relative w-full overflow-hidden flex items-center">
              <div
                ref={trackRef}
                className="flex gap-[18px] lg:gap-[20px] flex-nowrap will-change-transform pl-[4vw] pr-[6vw]"
                style={{
                  transition: "none",
                }}
              >
                {SERVICES_DATA.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    isMobile={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// INDIVIDUAL SERVICE CARD COMPONENT
function ServiceCard({
  service,
  index,
  isMobile,
}: {
  service: ServiceItem;
  index: number;
  isMobile: boolean;
}) {
  return (
    <article
      aria-label={`${service.title} Service`}
      className={`group relative flex-shrink-0 rounded-[8px] md:rounded-[10px] overflow-hidden border border-black/10 hover:border-[#BE9B59]/60 transition-colors duration-500 shadow-2xl bg-[#1c1d1a] ${isMobile
        ? "w-[85vw] max-w-[360px] h-[65vh] min-h-[460px] max-h-[580px] snap-start"
        : "w-[44vw] min-w-[440px] max-w-[850px] h-[78vh] min-h-[520px] max-h-[820px]"
        }`}
    >
      {/* CARD PHOTOGRAPHIC BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} by RichMan Interiors Dubai`}
          fill
          sizes="(max-width: 768px) 85vw, 44vw"
          priority={index < 2}
          quality={90}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* SUBTLE TOP VIGNETTE FOR TOP-LEFT TITLE LEGIBILITY */}
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* SUBTLE BOTTOM VIGNETTE FOR DESCRIPTION & CTA */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* REFINED GOLD GLOW ACCENT ON HOVER */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#BE9B59]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* CARD FOREGROUND CONTENT */}
      <div className="relative z-20 h-full flex flex-col justify-between p-8 sm:p-10 lg:p-12">
        {/* TOP-LEFT TITLE (MATCHING REFERENCE SCREENSHOT) */}
        <div className="flex flex-col items-start text-left">
          <h3 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal text-[#F5F0E7] tracking-normal leading-tight drop-shadow-md">
            {service.title}
          </h3>
        </div>

        {/* BOTTOM CONTENT: DESCRIPTION AND UNDERSTATED CTA */}
        <div className="flex flex-col mt-auto text-left">
          <p className="font-sans text-xs sm:text-sm text-[#F5F0E7]/80 leading-relaxed max-w-md mb-4 font-normal drop-shadow-sm">
            {service.description}
          </p>

          <Link
            href={service.href}
            className="group/cta inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase font-medium text-[#F5F0E7] hover:text-[#BE9B59] transition-colors duration-300 w-fit focus:outline-none"
          >
            <span className="border-b border-[#F5F0E7]/35 group-hover/cta:border-[#BE9B59] pb-0.5 transition-colors duration-300">
              {service.cta}
            </span>
            <svg
              className="w-3.5 h-3.5 text-[#BE9B59] transform group-hover/cta:translate-x-1.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
