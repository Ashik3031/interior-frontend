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
    "https://res.cloudinary.com/dugtxybef/image/upload/v1794571802/pexels-jonathanborba-19737866_bfgv7r.jpg"; // TODO: wide, cinematic interior shot (currently the same photo)

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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * About section. Deliberately different from the Design Process section:
 * it is dark, scrolls vertically, and has its own single scroll moment
 * (a framed photo that opens to full width) plus an accordion that responds
 * to the person's clicks.
 */
export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const [open, setOpen] = useState(0);

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

                // Reduced motion: the photo simply stays full width.
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
            className="relative overflow-hidden bg-white text-deep-charcoal"
        >
            {/* ============ 1. Headline over a tall photo ============ */}
            <div className="relative mx-auto max-w-[1600px] px-6 pb-20 pt-24 sm:px-10 lg:min-h-[92vh] lg:px-16 lg:pb-32 lg:pt-36">
                <div className="relative z-10">
                    <p className="font-sans text-sm text-champagne-gold">
                        About RichMan Interiors
                    </p>

                    <h2
                        id="about-heading"
                        className="mt-8 font-serif text-6xl font-light uppercase leading-[0.92] tracking-tight sm:text-8xl lg:text-[8vw]"
                    >
                        {HEADLINE.map((l) => (
                            <span key={l.text} className={`block ${l.indent}`}>
                                {l.text}
                            </span>
                        ))}
                    </h2>

                    <div className="mt-12 flex max-w-xl items-center gap-7 sm:gap-9 lg:mt-20">
                        <Badge />
                        <p className="font-sans text-base leading-relaxed text-deep-charcoal/75">
                            RichMan Interiors is a Dubai design and fit-out studio. We pair
                            considered design with exceptional craftsmanship, so each home
                            or workplace feels calm, personal and finished to the last
                            detail.
                        </p>
                    </div>
                </div>

                {/* Tall photo sits behind the headline on desktop */}
                <div className="relative mt-16 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[4px] lg:absolute lg:right-16 lg:top-36 lg:mt-0 lg:w-[30vw] lg:max-w-none">
                    <Image
                        src={PHOTO_MAIN}
                        alt="A RichMan Interiors living space with warm timber and stone finishes"
                        fill
                        sizes="(min-width:1024px) 30vw, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-transparent" />
                </div>
            </div>

            {/* ============ 2. Photo that opens to full width ============ */}
            <div
                className="expand relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]"
                style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            >
                <div className="expand-img absolute inset-0 will-change-transform">
                    <Image
                        src={PHOTO_WIDE}
                        alt="A finished RichMan Interiors residence"
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* ============ 3. What we stand for (accordion) ============ */}
            <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-3xl font-light leading-tight sm:text-4xl">
                            What we stand for
                        </h3>
                        <p className="mt-5 max-w-xs font-sans text-base leading-relaxed text-deep-charcoal/65">
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
                                            className="group flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                                        >
                                            <span
                                                className={`font-serif text-4xl font-light uppercase tracking-tight transition-colors duration-500 sm:text-5xl lg:text-6xl ${isOpen
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
                                            <p className="max-w-xl pb-8 font-sans text-base leading-relaxed text-deep-charcoal/70">
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
            <div className="mx-auto max-w-[1600px] px-6 pb-24 sm:px-10 lg:px-16 lg:pb-36">
                <ul className="border-t border-champagne-gold/25">
                    {LINKS.map((l) => (
                        <li key={l.href} className="border-b border-champagne-gold/25">
                            <Link
                                href={l.href}
                                className="group flex items-center justify-between gap-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold lg:py-12"
                            >
                                <span className="font-serif text-4xl font-light uppercase tracking-tight transition-colors duration-500 group-hover:text-champagne-gold sm:text-6xl lg:text-[6vw]">
                                    {l.label}
                                </span>
                                <svg
                                    aria-hidden
                                    viewBox="0 0 60 20"
                                    className="h-5 w-16 shrink-0 text-champagne-gold transition-transform duration-500 group-hover:translate-x-3 lg:w-24"
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
        <div className="relative h-36 w-36 sm:h-40 sm:w-40 shrink-0">
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
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <Image
                    src="/images/RM Interior - Logo Icon .png"
                    alt="RichMan Interiors Logo"
                    width={64}
                    height={64}
                    className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                />
            </div>
        </div>
    );
}