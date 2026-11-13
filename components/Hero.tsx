"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface SlideData {
  id: number;
  image: string;
  alt: string;
  eyebrow: string;
  heading: string;
  description: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 0,
    image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877410/hero-1_ptfyjc.jpg",
    alt: "Luxury Architectural Penthouse Interior in Dubai by RichMan Interiors",
    eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
    heading: "Elevate Your Living.",
    description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
  },
  {
    id: 1,
    image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877394/pexels-hiba-q-omar-106562569-14614670_bnefru.jpg",
    alt: "Bespoke Modern Residence Living Salon by RichMan Interiors",
    eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
    heading: "Elevate Your Living.",
    description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877392/pexels-raomubashir14-34754005_yt0ahq.jpg",
    alt: "Contemporary Minimalist Villa Suite by RichMan Interiors",
    eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
    heading: "Elevate Your Living.",
    description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877393/pexels-chich-choe-design-328303649-13813464_qzkudx.jpg",
    alt: "Warm Travertine and Fluted Wood Interior Architecture",
    eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
    heading: "Elevate Your Living.",
    description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877392/pexels-the-ghazi-2152398165-32177974_u79t4j.jpg",
    alt: "High-End Master Lounge and Dining Area by RichMan Interiors",
    eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
    heading: "Elevate Your Living.",
    description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Automatic slide rotation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, currentSlide]);

  return (
    <section
      id="home"
      data-theme="dark"
      aria-label="Hero Showcase"
      className="relative w-full h-[100vh] min-h-[640px] max-h-screen overflow-hidden flex items-center justify-center select-none"
      style={{ height: "100svh" }}
    >
      {/* BACKGROUND IMAGE SLIDES WITH SMOOTH TRANSITIONS */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "1200ms",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* SUBTLE UNIFORM DARK OVERLAY TO ENSURE OPTIMAL TYPOGRAPHY READABILITY (NO WHITE VEIL) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#171816]/50 via-[#171816]/30 to-[#171816]/60 z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* DELICATE RADIAL VIGNETTE FOR LUXURY EDITORIAL ATMOSPHERE */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,24,22,0.35)_100%)] z-10 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* HERO MAIN CONTENT - HORIZONTALLY & VERTICALLY CENTERED */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center">
        {/* Eyebrow */}
        <div className="animate-fade-up">
          <p className="hero-eyebrow text-[#D9C9B3] uppercase tracking-[0.28em] font-medium mb-3 md:mb-5 drop-shadow-sm">
            {HERO_SLIDES[currentSlide].eyebrow}
          </p>
        </div>

        {/* Main Heading */}
        <div className="animate-fade-up-delay-1">
          <h1 className="hero-heading text-[#F5F0E7] font-light tracking-tight max-w-4xl mx-auto drop-shadow-md">
            {HERO_SLIDES[currentSlide].heading}
          </h1>
        </div>

        {/* Supporting Description */}
        <div className="animate-fade-up-delay-2">
          <p className="hero-description text-[#F5F0E7]/90 font-light max-w-xl md:max-w-2xl mx-auto mt-4 md:mt-6 drop-shadow-sm">
            {HERO_SLIDES[currentSlide].description}
          </p>
        </div>

        {/* Primary CTA Button - Clean Transparent Outline Button */}
        <div className="animate-fade-up-delay-3 mt-8 md:mt-11">
          <Link
            href="#portfolio"
            className="group relative inline-flex items-center justify-center px-8 md:px-11 py-3.5 md:py-4 border border-[#F5F0E7]/75 hover:border-[#BE9B59] bg-transparent hover:bg-[#BE9B59] text-[#F5F0E7] hover:text-[#171816] rounded-none transition-all duration-300 tracking-[0.24em] text-xs uppercase font-medium focus:outline-none focus:ring-1 focus:ring-[#BE9B59]"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>EXPLORE OUR PORTFOLIO</span>
              <svg
                className="w-3.5 h-3.5 text-[#F5F0E7] group-hover:text-[#171816] group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* BOTTOM SLIDE INDICATORS */}
      <div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
        role="tablist"
        aria-label="Hero image slides"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className="group py-2 focus:outline-none cursor-pointer"
            >
              <div
                className={`relative h-[2px] overflow-hidden transition-all duration-500 rounded-full ${isActive
                  ? "w-10 md:w-14 bg-white/25"
                  : "w-6 md:w-8 bg-[#F5F0E7]/40 group-hover:bg-[#F5F0E7]/80"
                  }`}
              >
                {isActive && (
                  <div
                    key={`fill-${currentSlide}`}
                    className="absolute inset-0 bg-[#BE9B59] rounded-full"
                    style={{
                      animation: "slideProgressFill 5000ms linear forwards",
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
