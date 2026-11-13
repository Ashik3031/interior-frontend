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
  tag: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    tag: "Design & Build",
    title: "Complete Turnkey Fit-Out",
    description:
      "Full-spectrum architectural delivery from shell and core to white-glove handover under one unified atelier roof.",
    cta: "Explore turnkey fit-out",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    href: "/services/complete-turnkey-fit-out",
  },
  {
    id: "02",
    tag: "Residential",
    title: "Villa & Apartment Renovations",
    description:
      "Transforming mature villas and luxury penthouses into contemporary, light-filled architectural sanctuaries.",
    cta: "Reimagine your residence",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    href: "/services/villa-apartment-renovations",
  },
  {
    id: "03",
    tag: "Commercial",
    title: "Office & Commercial Interiors",
    description:
      "Inspiring corporate headquarters, private family offices, and commercial spaces with STC-55+ acoustic isolation.",
    cta: "Discover commercial design",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    href: "/services/office-commercial-interiors",
  },
  {
    id: "04",
    tag: "Engineering",
    title: "MEP Works — Electrical, HVAC & Plumbing",
    description:
      "Whisper-quiet VRF/chilled air conditioning, frameless slot diffusers, DALI smart lighting, and precision plumbing.",
    cta: "View MEP capabilities",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    href: "/services/mep-works",
  },
  {
    id: "05",
    tag: "Compliance",
    title: "Authority Approval Coordination",
    description:
      "Direct expediting and fast-track permits across Dubai Municipality, Civil Defence (DCD), Emaar, Nakheel, and Trakhees.",
    cta: "Statutory approvals",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    href: "/services/authority-approval-coordination",
  },
  {
    id: "06",
    tag: "Delivery",
    title: "Project Management & Execution",
    description:
      "Continuous on-site superintendence, critical path milestone scheduling, and zero-tolerance QA/QC inspection regimes.",
    cta: "Project execution",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    href: "/services/project-management-execution",
  },
];

const TOTAL = SERVICES_DATA.length;

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);

  // Measure the real track width so the pinned scroll ends exactly on the last card
  const updateMeasurements = useCallback(() => {
    if (typeof window === "undefined") return;
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);

    if (!mobile && trackRef.current) {
      const total = trackRef.current.scrollWidth;
      setMaxTranslate(Math.max(0, total - window.innerWidth));
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

  // Re-measure once the track mounts (isMobile flips from null to false)
  useEffect(() => {
    if (isMobile === false) {
      const id = requestAnimationFrame(updateMeasurements);
      return () => cancelAnimationFrame(id);
    }
  }, [isMobile, updateMeasurements]);

  // Desktop pinned horizontal scroll
  useEffect(() => {
    if (isMobile !== false) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let rafId: number | null = null;
    let lastActive = -1;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current || !trackRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

        const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

        trackRef.current.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
        trackRef.current.style.setProperty("--p", progress.toFixed(4));

        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }

        const idx = Math.min(TOTAL - 1, Math.round(progress * (TOTAL - 1)));
        if (idx !== lastActive) {
          lastActive = idx;
          setActive(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, maxTranslate]);

  const desktopContainerHeight =
    maxTranslate > 0 ? `calc(100vh + ${Math.round(maxTranslate)}px)` : "200vh";

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="services"
      data-theme="light"
      className="relative bg-white text-[#171816] select-none"
    >
      <div
        ref={containerRef}
        className="relative"
        style={{ height: isMobile === false ? desktopContainerHeight : "auto" }}
      >
        <div
          className={
            isMobile === false
              ? "sticky top-0 h-screen w-full overflow-hidden flex flex-col"
              : "relative pt-20 pb-16"
          }
        >
          {/* Soft ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full bg-[#BE9B59]/10 blur-[140px]"
          />

          {/* TOP BAR: eyebrow + live counter (desktop) */}
          {isMobile === false && (
            <div className="relative z-30 flex items-center justify-between px-[4vw] pt-8 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#BE9B59]" />
                <span className="text-[#BE9B59] uppercase tracking-[0.32em] text-[11px] font-sans font-semibold">
                  Our Services
                </span>
              </div>
              <div className="font-editorial flex items-baseline gap-2 tabular-nums">
                <span className="text-3xl font-light text-[#171816]">
                  {pad(active + 1)}
                </span>
                <span className="text-sm text-[#171816]/40">/ {pad(TOTAL)}</span>
              </div>
            </div>
          )}

          {isMobile === true ? (
            /* MOBILE */
            <>
              <div className="px-6 sm:px-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-[#BE9B59]" />
                  <span className="text-[#BE9B59] uppercase tracking-[0.32em] text-[11px] font-sans font-semibold">
                    Our Services
                  </span>
                </div>
                <h2 className="font-editorial text-[34px] sm:text-5xl font-light leading-[1.08] tracking-tight">
                  Luxury interiors in Dubai,{" "}
                  <em className="italic text-[#BE9B59]">crafted end to end.</em>
                </h2>
                <p className="font-sans mt-5 text-sm text-[#171816]/60 leading-relaxed max-w-md">
                  From first sketch to final handover, one team designs, engineers
                  and delivers your space.
                </p>
              </div>

              <div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 sm:px-8 pb-4 scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {SERVICES_DATA.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    isMobile
                  />
                ))}
              </div>
            </>
          ) : isMobile === false ? (
            /* DESKTOP PINNED TRACK */
            <div className="relative flex-1 flex items-center overflow-hidden">
              <div
                ref={trackRef}
                className="flex items-center flex-nowrap will-change-transform gap-5 pl-[4vw] pr-[6vw]"
                style={{ transition: "none", ["--p" as string]: 0 }}
              >
                {/* INTRO PANEL travels with the track */}
                <div className="flex-shrink-0 w-[34vw] max-w-[560px] min-w-[380px] pr-[3vw]">
                  <h2 className="font-editorial text-[clamp(40px,4.4vw,72px)] font-light leading-[1.04] tracking-tight">
                    Luxury interiors
                    <br />
                    in Dubai,{" "}
                    <em className="italic text-[#BE9B59]">
                      crafted
                      <br />
                      end to end.
                    </em>
                  </h2>
                  <p className="font-sans mt-7 text-[14px] text-[#171816]/60 leading-relaxed max-w-sm">
                    From first sketch to final handover, one team designs,
                    engineers and delivers your space.
                  </p>
                  <div className="mt-10 flex items-center gap-3 text-[#171816]/50">
                    <span className="font-sans uppercase tracking-[0.3em] text-[10px]">
                      Scroll to explore
                    </span>
                    <svg
                      className="w-8 h-3 text-[#BE9B59]"
                      viewBox="0 0 32 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      aria-hidden="true"
                    >
                      <path d="M0 6h30M25 1l5 5-5 5" />
                    </svg>
                  </div>
                </div>

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
          ) : null}

          {/* BOTTOM PROGRESS RAIL (desktop) */}
          {isMobile === false && (
            <div className="relative z-30 px-[4vw] pb-8 flex-shrink-0">
              <div className="relative h-px w-full bg-[#171816]/15">
                <div
                  ref={barRef}
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[#BE9B59] will-change-transform"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <div className="mt-3 flex justify-between font-sans text-[10px] uppercase tracking-[0.25em] text-[#171816]/40">
                <span>Design</span>
                <span>Engineer</span>
                <span>Approve</span>
                <span>Deliver</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// INDIVIDUAL SERVICE CARD
function ServiceCard({
  service,
  index,
  isMobile,
}: {
  service: ServiceItem;
  index: number;
  isMobile: boolean;
}) {
  // Staggered vertical rhythm on desktop for an editorial feel
  const offset = !isMobile && index % 2 === 1 ? "mt-16" : !isMobile ? "-mt-6" : "";

  return (
    <article
      aria-label={`${service.title} Service`}
      className={`group relative flex-shrink-0 overflow-hidden bg-[#1c1d1a] ring-1 ring-white/5 ${offset} ${isMobile
          ? "w-[78vw] max-w-[330px] h-[62vh] min-h-[420px] max-h-[520px] snap-start"
          : "w-[26vw] min-w-[330px] max-w-[440px] h-[62vh] min-h-[430px] max-h-[600px]"
        }`}
    >
      {/* IMAGE with inner scroll parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-y-0 -left-[10%] w-[120%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          style={
            isMobile
              ? undefined
              : { transform: "translate3d(calc((var(--p, 0) - 0.5) * -60px), 0, 0)" }
          }
        >
          <Image
            src={service.image}
            alt={`${service.title} by RichMan Interiors Dubai`}
            fill
            sizes="(max-width: 1024px) 78vw, 26vw"
            priority={index < 2}
            quality={90}
            className="object-cover object-center"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0c0d0b] via-[#0c0d0b]/45 to-[#0c0d0b]/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#BE9B59]/0 group-hover:bg-[#BE9B59]/10 transition-colors duration-700"
        />
      </div>

      {/* TOP: tag + outlined numeral */}
      <div className="relative z-10 flex items-start justify-between p-6">
        <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#F5F0E7]/85 border border-[#F5F0E7]/30 backdrop-blur-sm bg-black/20 px-3 py-1.5">
          {service.tag}
        </span>
        <span
          className="font-editorial text-[64px] leading-none font-light text-transparent"
          style={{ WebkitTextStroke: "1px rgba(245,240,231,0.55)" }}
        >
          {service.id}
        </span>
      </div>

      {/* BOTTOM: content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7">
        <span className="block h-px w-10 bg-[#BE9B59] mb-5 transition-all duration-500 group-hover:w-20" />
        <h3 className="font-editorial text-[26px] lg:text-[30px] font-light leading-[1.12] tracking-tight text-[#F5F0E7]">
          {service.title}
        </h3>
        <p className="font-sans mt-3 text-[13px] leading-relaxed text-[#F5F0E7]/70 max-w-sm lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
          {service.description}
        </p>

        <Link
          href={service.href}
          scroll={true}
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }
          }}
          className="group/cta mt-5 inline-flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.22em] font-medium text-[#F5F0E7] hover:text-[#BE9B59] transition-colors duration-300 focus:outline-none focus-visible:text-[#BE9B59]"
        >
          <span>{service.cta}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5F0E7]/35 group-hover/cta:border-[#BE9B59] group-hover/cta:bg-[#BE9B59] transition-all duration-300">
            <svg
              className="w-3.5 h-3.5 text-[#F5F0E7] group-hover/cta:text-[#121311] transition-colors duration-300"
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
          </span>
        </Link>
      </div>
    </article>
  );
}