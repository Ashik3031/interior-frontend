// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";

// interface SlideData {
//     id: number;
//     image: string;
//     alt: string;
//     eyebrow: string;
//     heading: string;
//     description: string;
// }

// const HERO_SLIDES: SlideData[] = [
//     {
//         id: 0,
//         image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877410/hero-1_ptfyjc.jpg",
//         alt: "Luxury Architectural Penthouse Interior in Dubai by RichMan Interiors",
//         eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
//         heading: "Elevate Your Living.",
//         description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
//     },
//     {
//         id: 1,
//         image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877394/pexels-hiba-q-omar-106562569-14614670_bnefru.jpg",
//         alt: "Bespoke Modern Residence Living Salon by RichMan Interiors",
//         eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
//         heading: "Elevate Your Living.",
//         description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
//     },
//     {
//         id: 2,
//         image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877392/pexels-raomubashir14-34754005_yt0ahq.jpg",
//         alt: "Contemporary Minimalist Villa Suite by RichMan Interiors",
//         eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
//         heading: "Elevate Your Living.",
//         description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
//     },
//     {
//         id: 3,
//         image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877393/pexels-chich-choe-design-328303649-13813464_qzkudx.jpg",
//         alt: "Warm Travertine and Fluted Wood Interior Architecture",
//         eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
//         heading: "Elevate Your Living.",
//         description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
//     },
//     {
//         id: 4,
//         image: "https://res.cloudinary.com/dugtxybef/image/upload/v1791877392/pexels-the-ghazi-2152398165-32177974_u79t4j.jpg",
//         alt: "High-End Master Lounge and Dining Area by RichMan Interiors",
//         eyebrow: "RICHMAN INTERIORS · DUBAI, UAE",
//         heading: "Elevate Your Living.",
//         description: "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.",
//     },
// ];

// export default function Hero() {
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const nextSlide = useCallback(() => {
//         setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
//     }, []);

//     // Automatic slide rotation every 5 seconds
//     useEffect(() => {
//         const timer = setInterval(() => {
//             nextSlide();
//         }, 5000);

//         return () => clearInterval(timer);
//     }, [nextSlide, currentSlide]);

//     return (
//         <section
//             id="home"
//             data-theme="dark"
//             aria-label="Hero Showcase"
//             className="relative w-full h-[100vh] min-h-[640px] max-h-screen overflow-hidden flex items-center justify-center select-none"
//             style={{ height: "100svh" }}
//         >
//             {/* BACKGROUND IMAGE SLIDES WITH SMOOTH TRANSITIONS */}
//             <div className="absolute inset-0 z-0">
//                 {HERO_SLIDES.map((slide, index) => {
//                     const isActive = currentSlide === index;
//                     return (
//                         <div
//                             key={slide.id}
//                             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
//                                 }`}
//                             style={{
//                                 transitionProperty: "opacity, transform",
//                                 transitionDuration: "1200ms",
//                                 transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
//                             }}
//                             aria-hidden={!isActive}
//                         >
//                             <Image
//                                 src={slide.image}
//                                 alt={slide.alt}
//                                 fill
//                                 priority={index === 0}
//                                 quality={90}
//                                 sizes="100vw"
//                                 className="object-cover object-center"
//                             />
//                         </div>
//                     );
//                 })}

//                 {/* SUBTLE UNIFORM DARK OVERLAY TO ENSURE OPTIMAL TYPOGRAPHY READABILITY (NO WHITE VEIL) */}
//                 <div
//                     className="absolute inset-0 bg-gradient-to-b from-[#171816]/50 via-[#171816]/30 to-[#171816]/60 z-10 pointer-events-none"
//                     aria-hidden="true"
//                 />

//                 {/* DELICATE RADIAL VIGNETTE FOR LUXURY EDITORIAL ATMOSPHERE */}
//                 <div
//                     className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,24,22,0.35)_100%)] z-10 pointer-events-none"
//                     aria-hidden="true"
//                 />
//             </div>

//             {/* HERO MAIN CONTENT - HORIZONTALLY & VERTICALLY CENTERED */}
//             <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center">
//                 {/* Eyebrow */}
//                 <div className="animate-fade-up">
//                     <p className="hero-eyebrow text-[#D9C9B3] uppercase tracking-[0.28em] font-medium mb-3 md:mb-5 drop-shadow-sm">
//                         {HERO_SLIDES[currentSlide].eyebrow}
//                     </p>
//                 </div>

//                 {/* Main Heading */}
//                 <div className="animate-fade-up-delay-1">
//                     <h1 className="hero-heading text-[#F5F0E7] font-light tracking-tight max-w-4xl mx-auto drop-shadow-md">
//                         {HERO_SLIDES[currentSlide].heading}
//                     </h1>
//                 </div>

//                 {/* Supporting Description */}
//                 <div className="animate-fade-up-delay-2">
//                     <p className="hero-description text-[#F5F0E7]/90 font-light max-w-xl md:max-w-2xl mx-auto mt-4 md:mt-6 drop-shadow-sm">
//                         {HERO_SLIDES[currentSlide].description}
//                     </p>
//                 </div>

//                 {/* Primary CTA Button - Clean Transparent Outline Button */}
//                 <div className="animate-fade-up-delay-3 mt-8 md:mt-11">
//                     <Link
//                         href="#portfolio"
//                         className="group relative inline-flex items-center justify-center px-8 md:px-11 py-3.5 md:py-4 border border-[#F5F0E7]/75 hover:border-[#BE9B59] bg-transparent hover:bg-[#BE9B59] text-[#F5F0E7] hover:text-[#171816] rounded-none transition-all duration-300 tracking-[0.24em] text-xs uppercase font-medium focus:outline-none focus:ring-1 focus:ring-[#BE9B59]"
//                     >
//                         <span className="relative z-10 flex items-center gap-3">
//                             <span>EXPLORE OUR PORTFOLIO</span>
//                             <svg
//                                 className="w-3.5 h-3.5 text-[#F5F0E7] group-hover:text-[#171816] group-hover:translate-x-1 transition-all duration-300"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth={1.5}
//                                 aria-hidden="true"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//                             </svg>
//                         </span>
//                     </Link>
//                 </div>
//             </div>

//             {/* BOTTOM SLIDE INDICATORS */}
//             <div
//                 className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
//                 role="tablist"
//                 aria-label="Hero image slides"
//             >
//                 {HERO_SLIDES.map((slide, index) => {
//                     const isActive = currentSlide === index;
//                     return (
//                         <button
//                             key={slide.id}
//                             type="button"
//                             role="tab"
//                             aria-selected={isActive}
//                             aria-label={`Go to slide ${index + 1}`}
//                             onClick={() => setCurrentSlide(index)}
//                             className="group py-2 focus:outline-none cursor-pointer"
//                         >
//                             <div
//                                 className={`relative h-[2px] overflow-hidden transition-all duration-500 rounded-full ${isActive
//                                     ? "w-10 md:w-14 bg-white/25"
//                                     : "w-6 md:w-8 bg-[#F5F0E7]/40 group-hover:bg-[#F5F0E7]/80"
//                                     }`}
//                             >
//                                 {isActive && (
//                                     <div
//                                         key={`fill-${currentSlide}`}
//                                         className="absolute inset-0 bg-[#BE9B59] rounded-full"
//                                         style={{
//                                             animation: "slideProgressFill 5000ms linear forwards",
//                                         }}
//                                     />
//                                 )}
//                             </div>
//                         </button>
//                     );
//                 })}
//             </div>
//         </section>
//     );
// }


import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";

const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["700"] });

const BG_IMAGE =
    "https://res.cloudinary.com/dugtxybef/image/upload/v1794830852/Skyline_Villa_Retreat_with_Pool_c8kaby.png";

export default function Hero() {
    return (
        <section
            className={`${sans.className} relative h-[185svh] bg-neutral-900 text-white`}
        >
            <style>{`
        @keyframes hero-fade-up {
          from {
            opacity: 0;
            transform: translateY(32px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .hero-headline {
          animation: hero-fade-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-headline {
            animation: none;
          }
        }
      `}</style>

            {/* Fixed background: stays put while the content scrolls over it.
          clip: rect() limits the fixed layer to this section without scroll jitter. */}
            <div
                className="absolute inset-0"
                style={{ clip: "rect(0, auto, auto, 0)" }}
            >
                <div className="fixed left-0 top-0 h-lvh w-full overflow-hidden">
                    <Image
                        src={BG_IMAGE}
                        alt="Sunlit neutral luxury living room"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    {/* Base dim so white text stays readable on a bright photo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/55" />
                </div>
            </div>

            {/* Extra darkening that scrolls in with the second screen */}
            <div className="pointer-events-none absolute inset-x-0 top-[60svh] bottom-0 bg-gradient-to-b from-transparent to-black/50" />

            {/* Content layer (scrolls over the fixed background) */}
            <div className="absolute inset-0 z-10">
                {/* Top right link */}


                {/* Headline */}
                <h1 className="hero-headline absolute inset-x-0 top-[62svh] mx-auto max-w-5xl px-6 text-center text-[clamp(2.4rem,5.5vw,5rem)] font-normal leading-[1.05] tracking-[-0.04em] text-balance">
                    Precision glazing for those who build with intent.
                </h1>

                {/* Second screen: divider, label, paragraph */}
                <div className="absolute inset-x-0 top-[112svh]">
                    <div className="mx-6 border-t border-white/30 md:ml-[43%] md:mr-12">
                        <div className="flex flex-col justify-between gap-6 pt-7 md:flex-row">
                            <p
                                className={`${mono.className} flex items-center gap-2.5 text-[15px] uppercase tracking-[0.12em]`}
                            >
                                <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
                                    <path d="M4.5 0 9 4.5 4.5 9 0 4.5z" fill="currentColor" />
                                </svg>
                                Glazing specialists
                            </p>
                            <p className="max-w-[22.5rem] text-xl leading-[1.4]">
                                We design and install bespoke glass systems for ambitious
                                architectural projects. Every pane reflects our commitment to
                                clarity, quality and collaboration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}