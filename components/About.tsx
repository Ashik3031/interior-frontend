"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const PHOTO_MAIN =
    "https://res.cloudinary.com/dugtxybef/image/upload/v1794551212/Warm_leather_rich_walnut_and_soft_brass_light_layered_to_create_a_bedroom_that_feels_calm_and_wxfyvh.jpg"; // TODO: your best residential shot (portrait)
const PHOTO_WIDE =
    "https://res.cloudinary.com/dugtxybef/image/upload/v1794812576/Sunlit_Coastal_Luxury_Living_Room_gfyzqx.png"; // TODO: wide, cinematic interior shot

/** Natural width / height of PHOTO_WIDE. Update if you swap the image. */
const WIDE_W = 1821;
const WIDE_H = 864;
const WIDE_RATIO = WIDE_W / WIDE_H;

const HEADLINE = [
    { text: "Spaces that", indent: "" },
    { text: "feel like you,", indent: "lg:ml-[7vw] italic" },
    { text: "built to last.", indent: "lg:ml-[2vw]" },
];

const PILLARS = [
    {
        title: "Design",
        text: "Every concept begins with how you live. We listen first, then shape layouts, light and furniture into a space that feels personal and effortless.",
    },
    {
        title: "Materials",
        text: "Natural stone, warm timber and refined metals, chosen to age beautifully and feel exceptional to the touch.",
    },
    {
        title: "Detail",
        text: "From joinery to lighting, we manage every finish ourselves so the result matches the vision exactly.",
    },
];

const LINKS = [
    { label: "Read our story", href: "/about" },
    { label: "See our work", href: "/portfolio" },
];

/**
 * Hotspots on the wide photo.
 * x / y are percentages of the PHOTO itself (0,0 = top-left, 100,100 = bottom-right),
 * not of the frame, so they stay on the furniture at every screen size.
 */
const HOTSPOTS = [
    {
        id: "pendants",
        x: 27,
        y: 27,
        title: "Sculpted light",
        text: "Hand-finished alabaster pendants soften the room with a warm, diffused glow, acting as sculpture by day and ambient light by night.",
    },
    {
        id: "stone",
        x: 6,
        y: 38,
        title: "Natural stone",
        text: "Book-matched marble wraps the fireplace and floor, chosen for its timeless veining and the way it ages beautifully over time.",
    },
    {
        id: "sofa",
        x: 41,
        y: 71,
        title: "Made to gather",
        text: "A deep modular sofa in textured linen, sized around how you actually live, relax and entertain.",
    },
    {
        id: "table",
        x: 53,
        y: 83,
        title: "Brass & marble",
        text: "A solid brass base carries a marble top, bringing refined metal and stone together in one considered centrepiece.",
    },
    {
        id: "chair",
        x: 81,
        y: 80,
        title: "Soft statement",
        text: "A sculptural bouclé armchair adds curves and tactile warmth, balancing the room's clean architectural lines.",
    },
    {
        id: "view",
        x: 90,
        y: 56,
        title: "Framed by the view",
        text: "Floor-to-ceiling glass and sheer drapes let the horizon become part of the interior, with layouts planned around the light.",
    },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * About section. Deliberately different from the Design Process section:
 * it is light, scrolls vertically, and has its own single scroll moment
 * (a framed photo that opens to full width, with clickable hotspots) plus an
 * accordion that responds to the person's clicks.
 */
export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const [open, setOpen] = useState(0);
    const [spot, setSpot] = useState<string | null>(null);
    const activeSpot = HOTSPOTS.find((h) => h.id === spot) ?? null;

    // Close the hotspot card with Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSpot(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useIsoLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.registerPlugin(ScrollTrigger);
        const q = gsap.utils.selector(section);
        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: "(min-width: 1024px)",
                reduce: "(prefers-reduced-motion: reduce)",
            },
            (self) => {
                const { isDesktop, reduce } = self.conditions as {
                    isDesktop: boolean;
                    reduce: boolean;
                };

                // Reduced motion: the photo stays full width, dots stay visible.
                if (reduce) return;

                const side = isDesktop ? 26 : 10;
                const trigger = {
                    trigger: q(".expand")[0],
                    start: "top 85%",
                    end: "center 45%",
                    scrub: true,
                };

                gsap.fromTo(
                    q(".expand"),
                    { clipPath: `inset(0% ${side}% 0% ${side}% round 4px)` },
                    {
                        clipPath: "inset(0% 0% 0% 0% round 0px)",
                        ease: "none",
                        scrollTrigger: trigger,
                    }
                );
                gsap.fromTo(
                    q(".expand-img"),
                    { scale: 1.25 },
                    { scale: 1, ease: "none", scrollTrigger: trigger }
                );

                // Dots fade in only as the photo finishes opening.
                // autoAlpha also disables clicks while they are hidden.
                gsap.fromTo(
                    q(".hotspot-layer"),
                    { autoAlpha: 0 },
                    {
                        autoAlpha: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: q(".expand")[0],
                            start: "center 65%",
                            end: "center 45%",
                            scrub: true,
                        },
                    }
                );
            }
        );

        let cancelled = false;
        document.fonts?.ready.then(() => {
            if (!cancelled) ScrollTrigger.refresh();
        });

        return () => {
            cancelled = true;
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            data-theme="light"
            aria-labelledby="about-heading"
            className="relative overflow-hidden bg-[#FAF8F5] text-deep-charcoal border-t border-deep-charcoal/5"
        >
            {/* Card entrance animation (kept here so this file is self-contained) */}
            <style>{`
                @keyframes aboutCardIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* ============ 1. Headline over a tall photo ============ */}
            <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-28 lg:min-h-[92vh] lg:px-16 lg:pb-32 lg:pt-36">
                <div className="relative z-10">
                    <p className="font-sans text-sm text-champagne-gold">
                        About RichMan Interiors
                    </p>

                    <h2
                        id="about-heading"
                        className="mt-6 font-serif text-[11vw] font-light uppercase leading-[0.95] tracking-tight sm:mt-8 sm:text-[9.5vw] lg:text-[8vw] lg:leading-[0.92]"
                    >
                        {HEADLINE.map((l) => (
                            <span key={l.text} className={`block ${l.indent}`}>
                                {l.text}
                            </span>
                        ))}
                    </h2>

                    <div className="mt-10 flex max-w-xl flex-col items-start gap-6 sm:mt-12 sm:flex-row sm:items-center sm:gap-9 lg:mt-20">
                        <Badge />
                        <p className="font-sans text-base leading-relaxed text-deep-charcoal/75">
                            RichMan Interiors is a Dubai design and fit-out studio. We pair
                            considered design with exceptional craftsmanship, so each home
                            or workplace feels calm, personal and finished to the last
                            detail.
                        </p>
                    </div>
                </div>

                {/* Tall photo: stacked below text on mobile/tablet, behind the headline on desktop */}
                <div className="relative mt-14 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[4px] sm:max-w-lg lg:absolute lg:right-16 lg:top-36 lg:mt-0 lg:w-[30vw] lg:max-w-none">
                    <Image
                        src={PHOTO_MAIN}
                        alt="A RichMan Interiors living space with warm timber and stone finishes"
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 512px, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-transparent" />
                </div>
            </div>

            {/* ============ 2. Photo that opens to full width, with hotspots ============ */}
            <div className="relative">
                <div
                    className="expand relative aspect-[1821/864] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[21/9]"
                    style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                >
                    {/* Scaling layer: image and dots move together */}
                    <div className="expand-img absolute inset-0 will-change-transform [container-type:size]">
                        {/* Box with the photo's own ratio that always covers the frame */}
                        <div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                                aspectRatio: `${WIDE_RATIO}`,
                                width: `max(100cqw, calc(100cqh * ${WIDE_RATIO}))`,
                            }}
                        >
                            <Image
                                src={PHOTO_WIDE}
                                alt="A finished RichMan Interiors residence"
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />

                            <div className="hotspot-layer absolute inset-0">
                                {HOTSPOTS.map((h) => {
                                    const isActive = spot === h.id;
                                    return (
                                        <button
                                            key={h.id}
                                            type="button"
                                            aria-label={h.title}
                                            aria-pressed={isActive}
                                            onClick={() => setSpot(isActive ? null : h.id)}
                                            style={{ left: `${h.x}%`, top: `${h.y}%` }}
                                            className="group absolute z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gold sm:h-11 sm:w-11"
                                        >
                                            {/* pulse */}
                                            {!isActive && (
                                                <span
                                                    aria-hidden
                                                    className="absolute h-6 w-6 animate-ping rounded-full border border-white/70 motion-reduce:animate-none sm:h-8 sm:w-8"
                                                />
                                            )}
                                            {/* ring */}
                                            <span
                                                aria-hidden
                                                className={`absolute h-6 w-6 rounded-full border border-white/90 bg-white/10 backdrop-blur-[2px] transition-all duration-500 group-hover:scale-125 group-hover:bg-white/25 sm:h-8 sm:w-8 ${isActive ? "scale-125 bg-white/30" : ""
                                                    }`}
                                            />
                                            {/* dot */}
                                            <span
                                                aria-hidden
                                                className={`relative h-1.5 w-1.5 rounded-full bg-white transition-transform duration-500 ${isActive ? "scale-0" : ""
                                                    }`}
                                            />
                                            {/* close icon when active */}
                                            <span
                                                aria-hidden
                                                className={`absolute text-[10px] leading-none text-white transition-opacity duration-300 sm:text-xs ${isActive ? "opacity-100" : "opacity-0"
                                                    }`}
                                            >
                                                ✕
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/*
                  Info card. Outside the scaling layer so it never zooms.
                  Below lg: sits under the photo in normal flow so it never hides the dots.
                  lg and up: floats over the photo on the side opposite the clicked dot.
                */}
                {activeSpot && (
                    <div
                        key={activeSpot.id}
                        role="dialog"
                        aria-label={activeSpot.title}
                        style={{
                            animation:
                                "aboutCardIn .5s cubic-bezier(.22,1,.36,1) both",
                        }}
                        className={`px-5 pt-5 sm:px-10 sm:pt-6 motion-reduce:!animate-none lg:absolute lg:top-[8%] lg:z-20 lg:w-[min(360px,28vw)] lg:p-0 ${activeSpot.x > 50 ? "lg:left-[5%]" : "lg:right-[5%]"
                            }`}
                    >
                        <div className="relative rounded-[4px] bg-white p-5 text-deep-charcoal shadow-xl sm:p-6 lg:flex lg:min-h-[260px] lg:flex-col lg:justify-between lg:shadow-2xl">
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={() => setSpot(null)}
                                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-deep-charcoal/60 transition-colors hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne-gold"
                            >
                                ✕
                            </button>
                            <h4 className="pr-10 font-serif text-2xl font-light uppercase tracking-tight sm:text-3xl">
                                {activeSpot.title}
                            </h4>
                            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-deep-charcoal/75 lg:mt-10">
                                {activeSpot.text}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* ============ 3. What we stand for (accordion) ============ */}
            <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-36">
                <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-3xl font-light leading-tight sm:text-4xl">
                            What we stand for
                        </h3>
                        <p className="mt-4 max-w-xs font-sans text-base leading-relaxed text-deep-charcoal/65 sm:mt-5">
                            Three commitments shape every home we deliver.
                        </p>
                    </div>

                    <ul className="border-t border-champagne-gold/25 lg:col-span-8">
                        {PILLARS.map((p, i) => {
                            const isOpen = open === i;
                            return (
                                <li
                                    key={p.title}
                                    className="border-b border-champagne-gold/25"
                                >
                                    <h4>
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={`pillar-${i}`}
                                            onClick={() => setOpen(isOpen ? -1 : i)}
                                            className="group flex w-full items-center justify-between gap-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold sm:gap-6 sm:py-7"
                                        >
                                            <span
                                                className={`min-w-0 font-serif text-[9vw] font-light uppercase leading-none tracking-tight transition-colors duration-500 sm:text-5xl lg:text-6xl ${isOpen
                                                    ? "text-deep-charcoal"
                                                    : "text-deep-charcoal/40 group-hover:text-deep-charcoal/80"
                                                    }`}
                                            >
                                                {p.title}
                                            </span>
                                            <span
                                                aria-hidden
                                                className={`relative h-5 w-5 shrink-0 text-champagne-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""
                                                    }`}
                                            >
                                                <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                                                <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                                            </span>
                                        </button>
                                    </h4>

                                    <div
                                        id={`pillar-${i}`}
                                        role="region"
                                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="max-w-xl pb-7 font-sans text-base leading-relaxed text-deep-charcoal/70 sm:pb-8">
                                                {p.text}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* ============ 4. Large link rows ============ */}
            <div className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-36">
                <ul className="border-t border-champagne-gold/25">
                    {LINKS.map((l) => (
                        <li key={l.href} className="border-b border-champagne-gold/25">
                            <Link
                                href={l.href}
                                className="group flex items-center justify-between gap-4 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold sm:gap-6 sm:py-8 lg:py-12"
                            >
                                <span className="min-w-0 font-serif text-[8.5vw] font-light uppercase leading-none tracking-tight transition-colors duration-500 group-hover:text-champagne-gold sm:text-[7vw] lg:text-[6vw]">
                                    {l.label}
                                </span>
                                <svg
                                    aria-hidden
                                    viewBox="0 0 60 20"
                                    className="h-4 w-10 shrink-0 text-champagne-gold transition-transform duration-500 group-hover:translate-x-3 sm:h-5 sm:w-16 lg:w-24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                >
                                    <path d="M0 10h56M47 1l9 9-9 9" />
                                </svg>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/** Slowly rotating circular text, like ERA's circular logo mark. */
function Badge() {
    return (
        <div className="relative h-28 w-28 shrink-0 sm:h-40 sm:w-40">
            <svg
                viewBox="0 0 120 120"
                aria-hidden
                className="h-full w-full animate-[spin_36s_linear_infinite] motion-reduce:animate-none"
            >
                <defs>
                    <path
                        id="about-badge-circle"
                        d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                    />
                </defs>
                <text
                    className="fill-deep-charcoal font-sans"
                    fontSize="8"
                    textLength="285"
                    lengthAdjust="spacing"
                >
                    <textPath href="#about-badge-circle">
                        RICHMAN · DUBAI · DESIGN & FIT-OUT ·
                    </textPath>
                </text>
            </svg>
            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <Image
                    src="/images/RM Interior - Logo Icon .png"
                    alt="RichMan Interiors Logo"
                    width={64}
                    height={64}
                    className="h-11 w-11 object-contain sm:h-16 sm:w-16"
                />
            </div>
        </div>
    );
}