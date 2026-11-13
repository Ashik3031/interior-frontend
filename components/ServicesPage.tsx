"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/servicesData";

// One background colour per panel (cycled if you add more services)
const PANEL_COLORS = ["#C3CDD9", "#B794A1", "#7F937F", "#E39562", "#EDEBE6", "#CDB88E"];

const shortTitle = (t: string) => t.split("—")[0].trim();

export default function ServicesPage() {
  const total = SERVICES.length;
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);

  const colorOf = (i: number) => PANEL_COLORS[i % PANEL_COLORS.length];

  // Looping navigation (buttons / strips / numbers only): after the last card it returns to the first, and vice versa
  const goTo = useCallback(
    (next: number) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setIndex(((next % total) + total) % total);
      setTimeout(() => {
        lockRef.current = false;
      }, 800);
    },
    [total]
  );

  const active = SERVICES[index];
  const upcoming = Array.from({ length: Math.min(2, total - 1) }, (_, i) => {
    const realIndex = (index + 1 + i) % total;
    return { service: SERVICES[realIndex], realIndex, width: i === 0 ? "15vw" : "5vw" };
  });

  return (
    <main className="bg-[#FAF8F5] text-[#171816] selection:bg-[#BE9B59] selection:text-[#171816]">
      <style>{`
        @keyframes svcUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes svcReveal { from { clip-path: inset(0 0 0 100%); opacity: .4; } to { clip-path: inset(0 0 0 0); opacity: 1; } }
        .svc-up { animation: svcUp .8s cubic-bezier(.22,1,.36,1) both; }
        .svc-up-1 { animation-delay: .08s; }
        .svc-up-2 { animation-delay: .16s; }
        .svc-up-3 { animation-delay: .24s; }
        .svc-reveal { animation: svcReveal .9s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      {/* 1. FULL-SCREEN SERVICE SLIDER */}
      <section
        data-theme="light"
        className="relative min-h-[100svh] lg:h-[100svh] lg:min-h-[680px] overflow-hidden transition-colors duration-700 ease-out"
        style={{ backgroundColor: colorOf(index) }}
      >
        {/* ================= MOBILE / TABLET VIEW (< lg) ================= */}
        <div className="lg:hidden flex flex-col justify-between min-h-[100svh] px-6 sm:px-10 pt-28 pb-10">
          <div key={`mob-content-${index}`} className="flex flex-col">
            <h1 className="svc-up font-editorial font-light tracking-tight leading-[0.95] text-[#171816] text-5xl sm:text-6xl">
              Services
            </h1>

            <h2 className="svc-up svc-up-1 font-editorial font-light text-[#171816] mt-4 text-2xl sm:text-3xl leading-snug">
              {shortTitle(active.title)}
            </h2>

            <ul className="svc-up svc-up-2 mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {active.deliverables.map((d) => (
                <li
                  key={d.title}
                  className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.06em] font-medium text-[#171816]"
                >
                  <span className="text-[#171816]/50 mr-1">/</span>
                  {d.title}
                </li>
              ))}
            </ul>

            {/* Responsive Hero Image */}
            <div className="svc-reveal relative w-full aspect-[16/10] sm:aspect-[16/9] my-6 rounded-sm overflow-hidden bg-neutral-200 shadow-md">
              <Image
                src={active.heroImage}
                alt={`${active.title} by RichMan Interiors`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Action Buttons Row */}
            <div className="svc-up svc-up-3 flex items-center justify-between gap-3">
              <Link
                href={`/services/${active.slug}`}
                className="group inline-flex items-center justify-between gap-4 h-12 px-6 rounded-full border border-[#171816] text-[11px] font-sans uppercase tracking-[0.06em] font-medium text-[#171816] hover:bg-[#171816] hover:text-[#F5F0E7] transition-colors duration-300"
              >
                <span>See the expertise</span>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </Link>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous service"
                  className="w-11 h-11 rounded-full border border-[#171816]/60 flex items-center justify-center text-base hover:bg-[#171816] hover:text-[#F5F0E7] transition-colors cursor-pointer"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next service"
                  className="w-11 h-11 rounded-full bg-[#171816] text-[#F5F0E7] flex items-center justify-center text-base hover:bg-[#BE9B59] hover:text-[#171816] transition-colors cursor-pointer"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar on Mobile */}
          <div className="mt-8 pt-4 border-t border-[#171816]/15 flex items-center justify-between">
            <span className="font-sans text-xs font-semibold tracking-widest text-[#171816]">
              {active.id} / 0{total}
            </span>
            <div className="flex-1 mx-4 h-[2px] bg-[#171816]/15 relative overflow-hidden">
              <div
                className="h-full bg-[#171816] transition-all duration-700 ease-out"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#171816]/75 truncate max-w-[130px]">
              {shortTitle(active.title)}
            </span>
          </div>
        </div>

        {/* ================= DESKTOP VIEW (lg+) ================= */}
        <div className="hidden lg:block relative z-20 h-full">
          {/* Right-hand strips: the next panels waiting in line */}
          <div className="flex absolute inset-y-0 right-0 z-10">
            {upcoming.map(({ service, realIndex, width }) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => goTo(realIndex)}
                aria-label={`Go to ${shortTitle(service.title)}`}
                className="relative h-full cursor-pointer transition-all duration-700 ease-out hover:brightness-95"
                style={{ width, backgroundColor: colorOf(realIndex) }}
              >
                <div className="absolute inset-x-0 bottom-[15%] h-[27%] overflow-hidden">
                  <Image
                    src={service.heroImage}
                    alt=""
                    fill
                    sizes="15vw"
                    className="object-cover object-center"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Left text block */}
          <div
            key={`text-${index}`}
            className="absolute left-[11%] top-[16%] max-w-[40%]"
          >
            <h1 className="svc-up font-editorial font-light tracking-tight leading-[0.95] text-[#171816] text-[clamp(52px,8.5vw,128px)]">
              Services
            </h1>

            <h2 className="svc-up svc-up-1 font-editorial font-light text-[#171816] mt-8 text-[40px] leading-tight">
              {shortTitle(active.title)}
            </h2>

            <ul className="svc-up svc-up-2 mt-8 flex flex-wrap gap-x-7 gap-y-1.5 max-w-[34rem]">
              {active.deliverables.map((d) => (
                <li
                  key={d.title}
                  className="font-sans text-xs uppercase tracking-[0.06em] font-medium text-[#171816]"
                >
                  <span className="text-[#171816]/50 mr-1.5">/</span>
                  {d.title}
                </li>
              ))}
            </ul>

            <div className="svc-up svc-up-3 mt-12 flex items-center gap-3">
              <Link
                href={`/services/${active.slug}`}
                className="group inline-flex items-center justify-between gap-8 h-[72px] min-w-[220px] px-8 rounded-full border border-[#171816] text-[11px] font-sans uppercase tracking-[0.06em] font-medium text-[#171816] hover:bg-[#171816] hover:text-[#F5F0E7] transition-colors duration-300"
              >
                <span>See the expertise</span>
                <span className="w-2 h-2 rounded-full bg-current" />
              </Link>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous service"
                  className="w-14 h-14 rounded-full border border-[#171816]/60 flex items-center justify-center text-lg hover:bg-[#171816] hover:text-[#F5F0E7] transition-colors cursor-pointer"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next service"
                  className="w-14 h-14 rounded-full bg-[#171816] text-[#F5F0E7] flex items-center justify-center text-lg hover:bg-[#BE9B59] hover:text-[#171816] transition-colors cursor-pointer"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Main image */}
          <div
            key={`img-${index}`}
            className="svc-reveal absolute overflow-hidden bg-neutral-200 left-[46%] w-[34vw] top-[31%] bottom-[15%]"
          >
            <Image
              src={active.heroImage}
              alt={`${active.title} by RichMan Interiors`}
              fill
              priority
              sizes="34vw"
              className="object-cover object-center"
            />
          </div>

          {/* Bottom numbered progress nav */}
          <div className="absolute left-[11%] right-[20vw] bottom-[6%]">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
              {SERVICES.map((s, i) => {
                const reached = i <= index;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    className="flex items-start gap-5 text-left pb-3 cursor-pointer"
                  >
                    <span className="font-sans text-[11px] font-medium text-[#171816]">{s.id}</span>
                    <span
                      className={`font-sans text-[11px] uppercase tracking-[0.02em] font-medium text-[#171816] transition-opacity duration-500 ${reached ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      {shortTitle(s.title)}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="relative h-px bg-[#171816]/15">
              <div
                className="absolute left-0 top-0 h-[2px] -translate-y-px bg-[#171816] transition-all duration-700 ease-out"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE IN-HOUSE ADVANTAGE (Why Turnkey Matters in Dubai) */}

    </main>
  );
}