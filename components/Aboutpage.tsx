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
/*                                                                    */
/*  Everything below is DUMMY content written for a Dubai interior     */
/*  studio. Replace the story, numbers, names, projects and contact    */
/*  details with real ones before publishing.                          */
/* ------------------------------------------------------------------ */

// Hero corner video. This clip has its leaves in the TOP-LEFT of the frame, so it is
// mirrored (flipX) to sit in the top-RIGHT corner. If the leaves ever look wrong,
// change flipX / flipY (flipY turns a plant that grows UP into one that hangs DOWN).
const HERO_VIDEO = {
    src: "https://res.cloudinary.com/img3p1wr/video/upload/v1794312057/IMG_6150.mp4",
    flipY: false,
    flipX: true,
};
const heroVideoFlip =
    HERO_VIDEO.flipX && HERO_VIDEO.flipY
        ? "-scale-100"
        : HERO_VIDEO.flipY
            ? "-scale-y-100"
            : HERO_VIDEO.flipX
                ? "-scale-x-100"
                : "";

const IMG = {
    wide: "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    story: "https://res.cloudinary.com/dugtxybef/image/upload/v1791979419/pexels-shkrabaanthony-6322363_gbwg6f.jpg",
    p1: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    p2: "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
    p3: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    craft: "https://res.cloudinary.com/dugtxybef/image/upload/v1791979411/pexels-cottonbro-6143826_rvohtd.jpg",
    team: "https://res.cloudinary.com/dugtxybef/image/upload/v1791979412/pexels-cottonbro-6580001_j5dxxv.jpg",
};

const HERO_LINES = [
    { text: "Interiors", indent: "" },
    { text: "shaped around", indent: "lg:ml-[7vw]" },
    { text: "the way you live.", indent: "lg:ml-[2vw]" },
];

const FACTS = [
    { label: "Founded", value: "2012" },
    { label: "Studio", value: "Dubai, UAE" },
    { label: "Team", value: "24 people" },
];

const STATS = [
    { value: 12, suffix: "+", label: "Years designing in the UAE" },
    { value: 250, suffix: "+", label: "Homes and spaces delivered" },
    { value: 24, suffix: "", label: "Designers, makers and site managers" },
    { value: 2, suffix: "", label: "Emirates: Dubai and Abu Dhabi" },
];

const BELIEFS = [
    {
        title: "Listen first",
        img: IMG.story,
        alt: "A designer reviewing material samples and plans with a client",
        text: "We spend time in your space before we draw anything. How the light moves, how you host, where the family gathers: the design starts from there.",
    },
    {
        title: "Craft over catalogue",
        img: IMG.craft,
        alt: "Bespoke joinery being installed in a residence",
        text: "Joinery, stone and furniture are made or specified for each home. Fewer off-the-shelf pieces, more things that fit.",
    },
    {
        title: "One accountable team",
        img: IMG.team,
        alt: "Interior concept render with material palette",
        text: "Design, authority approvals, procurement and fit-out sit under one roof, so there is a single point of contact and no hand-over gaps.",
    },
    {
        title: "Designed for the climate",
        img: IMG.wide,
        alt: "A sunlit villa interior opening onto a pool",
        text: "Heat, glare, dust and humidity shape every material and detail we choose, so spaces still look right years after handover.",
    },
];

const PROJECTS = [
    {
        img: IMG.p1,
        place: "Emirates Hills",
        title: "The Courtyard Villa",
        meta: "Residential, 2025",
        offset: "",
    },
    {
        img: IMG.p2,
        place: "Palm Jumeirah",
        title: "Sandstone Residence",
        meta: "Residential, 2024",
        offset: "lg:mt-20",
    },
    {
        img: IMG.p3,
        place: "Downtown Dubai",
        title: "Skyline Penthouse",
        meta: "Residential, 2024",
        offset: "lg:mt-8",
    },
];

// Dummy distances from the studio. `x`/`y` place the dot on the schematic map (600 x 520);
// `lx`/`ly`/`anchor` position its label.
const PLACES = [
    { name: "Palm Jumeirah", area: "Dubai", min: "25 min", x: 215, y: 335, lx: -14, ly: 4, anchor: "end" },
    { name: "Emirates Hills", area: "Dubai", min: "20 min", x: 285, y: 415, lx: 14, ly: 4, anchor: "start" },
    { name: "Dubai Hills", area: "Dubai", min: "15 min", x: 400, y: 335, lx: 14, ly: 20, anchor: "start" },
    { name: "Jumeirah Bay", area: "Dubai", min: "15 min", x: 345, y: 270, lx: -14, ly: 4, anchor: "end" },
    { name: "Downtown", area: "Dubai", min: "10 min", x: 440, y: 255, lx: 14, ly: -8, anchor: "start" },
    { name: "Saadiyat Island", area: "Abu Dhabi", min: "80 min", x: 70, y: 455, lx: 12, ly: -12, anchor: "start" },
];
const STUDIO = { x: 385, y: 292 };

const TEAM = [
    { name: "Layla Haddad", role: "Founder & Principal Designer", initials: "LH" },
    { name: "Omar Al Suwaidi", role: "Design Director", initials: "OS" },
    { name: "Priya Nair", role: "Head of Fit-Out", initials: "PN" },
    { name: "Daniel Moreau", role: "Joinery & Procurement Lead", initials: "DM" },
];

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

/** Sets `inView` once the element enters the viewport. */
function useInView<T extends HTMLElement>(threshold = 0.3) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);

    return { ref, inView };
}

/** Counts from 0 to `end` when `start` is true (jumps to the end for reduced motion). */
function useCountUp(end: number, start: boolean, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValue(end);
            return;
        }
        let raf = 0;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [end, start, duration]);

    return value;
}

/**
 * Decorative looping vine video. Plays only while on screen and stays paused for
 * reduced-motion users. `mix-blend-multiply` + the small filter hide the white
 * background of the MP4 against a white section (the parent needs `isolate`).
 * If you switch to a true-alpha WebM, delete those two classes.
 */
function LeafVideo({ src, className = "" }: { src: string; className?: string }) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            video.pause();
            return;
        }
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) video.play().catch(() => { });
            else video.pause();
        });
        io.observe(video);
        return () => io.disconnect();
    }, []);

    return (
        <video
            ref={ref}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
            tabIndex={-1}
            disablePictureInPicture
            className={`pointer-events-none absolute select-none mix-blend-multiply [filter:brightness(1.12)_contrast(1.1)] ${className}`}
        />
    );
}

/** Small gold-dot label used above section headings. */
function Label({ children, light = false }: { children: string; light?: boolean }) {
    return (
        <p
            className={`flex items-center gap-2.5 font-sans text-sm ${light ? "text-warm-ivory/70" : "text-deep-charcoal/70"
                }`}
        >
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            {children}
        </p>
    );
}

function Stat({
    value,
    suffix,
    label,
    start,
}: {
    value: number;
    suffix: string;
    label: string;
    start: boolean;
}) {
    const n = useCountUp(value, start);
    return (
        <div className="px-0 py-10 sm:px-8 sm:first:pl-0 lg:py-14">
            <p className="font-serif text-6xl font-light leading-none tabular-nums sm:text-7xl lg:text-8xl">
                {n}
                <span className="text-champagne-gold">{suffix}</span>
            </p>
            <p className="mt-5 max-w-[16rem] font-sans text-sm leading-relaxed text-deep-charcoal/65">
                {label}
            </p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  How we work: sticky photo that follows the active belief           */
/* ------------------------------------------------------------------ */

function Beliefs() {
    const [active, setActive] = useState(0);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    // On desktop the belief that crosses the middle of the screen becomes active.
    // Hovering a belief also activates it.
    useEffect(() => {
        if (!window.matchMedia("(min-width: 1024px)").matches) return;
        const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setActive(Number((e.target as HTMLElement).dataset.index));
                    }
                });
            },
            { rootMargin: "-45% 0px -45% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <section
            data-theme="dark"
            aria-labelledby="beliefs-heading"
            className="mt-24 bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:mt-40 lg:px-16 lg:py-40"
        >
            <div className="mx-auto max-w-[1600px]">
                <Label light>How we work</Label>
                <h2
                    id="beliefs-heading"
                    className="mt-6 max-w-4xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
                >
                    What we believe
                </h2>

                <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
                    {/* Sticky photo (desktop): crossfades as the active belief changes */}
                    <div className="hidden lg:col-span-5 lg:block">
                        <div className="sticky top-28 h-[min(72vh,720px)]">
                            <div className="relative h-full overflow-hidden rounded-[4px] bg-warm-ivory/5">
                                {BELIEFS.map((b, i) => (
                                    <div
                                        key={b.title}
                                        className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                                            }`}
                                    >
                                        <Image
                                            src={b.img}
                                            alt={b.alt}
                                            fill
                                            sizes="40vw"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                <p
                                    aria-hidden
                                    className="absolute bottom-5 left-5 rounded-full bg-deep-charcoal/60 px-4 py-2 font-sans text-sm text-white backdrop-blur"
                                >
                                    ({String(active + 1).padStart(2, "0")}) {BELIEFS[active].title}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Beliefs */}
                    <ol className="lg:col-span-7">
                        {BELIEFS.map((b, i) => {
                            const on = active === i;
                            return (
                                <li
                                    key={b.title}
                                    ref={(el) => {
                                        itemRefs.current[i] = el;
                                    }}
                                    data-index={i}
                                    onMouseEnter={() => setActive(i)}
                                    className="border-t border-warm-ivory/15 py-12 last:border-b lg:flex lg:min-h-[60vh] lg:flex-col lg:justify-center lg:py-0"
                                >
                                    {/* Photo for small screens */}
                                    <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[4px] bg-warm-ivory/5 lg:hidden">
                                        <Image
                                            src={b.img}
                                            alt={b.alt}
                                            fill
                                            sizes="100vw"
                                            className="object-cover"
                                        />
                                    </div>

                                    <p
                                        className={`font-sans text-sm tabular-nums transition-colors duration-500 ${on ? "text-champagne-gold" : "text-champagne-gold lg:text-warm-ivory/35"
                                            }`}
                                    >
                                        ({String(i + 1).padStart(2, "0")})
                                    </p>
                                    <h3
                                        className={`mt-4 font-serif text-4xl font-light uppercase leading-[1] tracking-tight transition-colors duration-500 sm:text-5xl lg:text-6xl ${on ? "text-warm-ivory" : "text-warm-ivory lg:text-warm-ivory/30"
                                            }`}
                                    >
                                        {b.title}
                                    </h3>
                                    <p
                                        className={`mt-6 max-w-md font-sans text-base leading-relaxed transition-colors duration-500 ${on ? "text-warm-ivory/75" : "text-warm-ivory/75 lg:text-warm-ivory/30"
                                            }`}
                                    >
                                        {b.text}
                                    </p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Where we work: schematic map + list that highlight each other      */
/* ------------------------------------------------------------------ */

function WhereWeWork() {
    const { ref, inView } = useInView<HTMLDivElement>(0.25);
    const [active, setActive] = useState<number | null>(null);
    const target = active === null ? null : PLACES[active];

    return (
        <section
            data-theme="light"
            aria-labelledby="where-heading"
            className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
        >
            <div ref={ref} className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12 lg:gap-12">
                {/* Text + list */}
                <div className="lg:col-span-5">
                    <Label>Where we work</Label>
                    <h2
                        id="where-heading"
                        className="mt-6 font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        Across Dubai and Abu Dhabi
                    </h2>
                    {/* TODO: confirm the studio location and the travel times */}
                    <p className="mt-8 max-w-sm font-sans text-base leading-relaxed text-deep-charcoal/70">
                        Our studio sits in Al Quoz, close to the workshops, stone yards and
                        showrooms we use every week. Most of our homes are within half an
                        hour.
                    </p>

                    <ul
                        className="mt-12 border-t border-deep-charcoal/15"
                        onMouseLeave={() => setActive(null)}
                    >
                        {PLACES.map((pl, i) => {
                            const dim = active !== null && active !== i;
                            return (
                                <li
                                    key={pl.name}
                                    tabIndex={0}
                                    onMouseEnter={() => setActive(i)}
                                    onFocus={() => setActive(i)}
                                    onBlur={() => setActive(null)}
                                    className="flex cursor-default items-baseline justify-between gap-6 border-b border-deep-charcoal/15 py-5 outline-none focus-visible:bg-deep-charcoal/[0.03]"
                                >
                                    <span
                                        className={`font-serif text-2xl font-light transition-all duration-500 sm:text-3xl ${dim ? "text-deep-charcoal/30" : "text-deep-charcoal"
                                            } ${active === i ? "translate-x-2" : ""}`}
                                    >
                                        {pl.name}
                                        <span className="ml-3 font-sans text-sm text-deep-charcoal/45">
                                            {pl.area}
                                        </span>
                                    </span>
                                    <span
                                        className={`font-sans text-sm tabular-nums transition-colors duration-500 ${dim ? "text-deep-charcoal/25" : "text-deep-charcoal/60"
                                            }`}
                                    >
                                        {pl.min}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Schematic map */}
                <div className="lg:col-span-7">
                    <figure className="relative">
                        <svg
                            viewBox="0 0 600 520"
                            role="img"
                            aria-label="Schematic map of the Dubai and Abu Dhabi coast with our project areas"
                            className="h-auto w-full text-deep-charcoal"
                        >
                            {/* Sea label */}
                            <text
                                x="70"
                                y="120"
                                className="fill-current font-serif italic"
                                fontSize="20"
                                opacity="0.3"
                            >
                                Arabian Gulf
                            </text>

                            {/* Coastline, drawn in once when the map scrolls into view */}
                            <path
                                d="M10 480 C120 450 190 410 250 355 S380 230 470 170 S560 90 590 60"
                                pathLength={1}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="1"
                                strokeDashoffset={inView ? 0 : 1}
                                style={{ transition: "stroke-dashoffset 2.4s cubic-bezier(.22,1,.36,1)" }}
                                className="motion-reduce:!transition-none"
                            />

                            {/* Route from the studio to the hovered area */}
                            {target && (
                                <line
                                    x1={STUDIO.x}
                                    y1={STUDIO.y}
                                    x2={target.x}
                                    y2={target.y}
                                    stroke="#BE9B59"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 6"
                                />
                            )}

                            {/* Areas */}
                            {PLACES.map((pl, i) => {
                                const on = active === i;
                                const dim = active !== null && !on;
                                return (
                                    <g
                                        key={pl.name}
                                        onMouseEnter={() => setActive(i)}
                                        onMouseLeave={() => setActive(null)}
                                        className="cursor-default"
                                        opacity={dim ? 0.3 : 1}
                                        style={{ transition: "opacity .4s" }}
                                    >
                                        {on && (
                                            <circle
                                                cx={pl.x}
                                                cy={pl.y}
                                                r="9"
                                                fill="none"
                                                stroke="#BE9B59"
                                                strokeWidth="1.5"
                                                className="animate-ping motion-reduce:animate-none"
                                                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                                            />
                                        )}
                                        <circle
                                            cx={pl.x}
                                            cy={pl.y}
                                            r={on ? 7 : 5}
                                            fill={on ? "#BE9B59" : "currentColor"}
                                            style={{ transition: "r .3s, fill .3s" }}
                                        />
                                        <text
                                            x={pl.x + pl.lx}
                                            y={pl.y + pl.ly}
                                            textAnchor={pl.anchor as "start" | "end"}
                                            className="fill-current font-sans"
                                            fontSize="15"
                                            fontWeight={on ? 600 : 400}
                                        >
                                            {pl.name}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Studio marker */}
                            <g>
                                <circle
                                    cx={STUDIO.x}
                                    cy={STUDIO.y}
                                    r="11"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <circle cx={STUDIO.x} cy={STUDIO.y} r="4" fill="#BE9B59" />
                                <text
                                    x={STUDIO.x - 18}
                                    y={STUDIO.y + 26}
                                    textAnchor="end"
                                    className="fill-current font-sans"
                                    fontSize="14"
                                    fontWeight={600}
                                >
                                    Our studio, Al Quoz
                                </text>
                            </g>
                        </svg>
                        <figcaption className="mt-4 font-sans text-sm text-deep-charcoal/50">
                            Schematic map, not to scale.
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

/**
 * About page. Assumes your site header and footer come from the layout.
 *
 * Rhythm (alternating light and dark, one scroll idea per section):
 *  1 hero (white, vine video, headline reveal)   2 photo that opens to full width
 *  3 story (ivory, sticky title)                 4 numbers (white, count-up)
 *  5 beliefs (dark, 2x2 grid)                    6 selected work (ivory, staggered)
 *  7 where we work (white type strip)            8 team (white, monogram cards)
 *  9 closing call to action (dark)
 */
export default function AboutPage() {
    const rootRef = useRef<HTMLElement>(null);
    const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>(0.35);

    useIsoLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        gsap.registerPlugin(ScrollTrigger);
        const q = gsap.utils.selector(root);
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
                if (reduce) return;

                /* Hero headline: lines rise once on load */
                gsap.from(q(".h-line"), {
                    yPercent: 110,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.12,
                    delay: 0.1,
                });
                gsap.from(q(".hero-fade"), {
                    opacity: 0,
                    y: 16,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                    delay: 0.6,
                });

                /* Photo that opens from a framed strip to full width */
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
                    { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: trigger }
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
        <main ref={rootRef} className="bg-white text-deep-charcoal">
            {/* ============ 1. Hero ============ */}
            <section
                data-theme="light"
                aria-labelledby="about-hero-heading"
                className="relative isolate overflow-hidden bg-white px-6 pb-20 pt-36 sm:px-10 lg:px-16 lg:pb-28 lg:pt-44"
            >
                <LeafVideo
                    src={HERO_VIDEO.src}
                    className={`right-0 top-0 w-[80vw] sm:w-[62vw] ${heroVideoFlip}`}
                />

                <div className="relative z-10 mx-auto max-w-[1600px]">
                    <p className="hero-fade flex items-center gap-2.5 font-sans text-sm text-deep-charcoal/70">
                        <span className="h-2 w-2 rounded-full bg-champagne-gold" />
                        About RichMan Interiors
                    </p>

                    <h1
                        id="about-hero-heading"
                        className="mt-8 font-serif text-[clamp(44px,7.4vw,128px)] font-light uppercase leading-[0.95] tracking-tight"
                    >
                        {HERO_LINES.map((l) => (
                            <span key={l.text} className={`block overflow-hidden pb-[0.08em] ${l.indent}`}>
                                <span className="h-line block">{l.text}</span>
                            </span>
                        ))}
                    </h1>

                    <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12">
                        <p className="hero-fade max-w-md font-sans text-base leading-relaxed text-deep-charcoal/75 lg:col-span-5 lg:text-lg">
                            We are a Dubai design and fit-out studio. We create calm, personal
                            homes and workplaces across the UAE, and we look after every step
                            from the first sketch to the final styling.
                        </p>

                        <dl className="hero-fade grid grid-cols-3 gap-6 border-t border-deep-charcoal/15 pt-6 lg:col-span-6 lg:col-start-7">
                            {FACTS.map((f) => (
                                <div key={f.label}>
                                    <dt className="font-sans text-sm text-deep-charcoal/50">{f.label}</dt>
                                    <dd className="mt-2 font-serif text-xl sm:text-2xl">{f.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* ============ 2. Photo that opens to full width ============ */}
            <section aria-label="Studio photograph" className="bg-white pb-6">
                <div
                    className="expand relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]"
                    style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                >
                    <div className="expand-img absolute inset-0 will-change-transform">
                        <Image
                            src={IMG.wide}
                            alt="A finished villa interior designed by RichMan Interiors"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 pt-4 font-sans text-sm text-deep-charcoal/55 sm:px-10 lg:px-16">
                    <span>Villa interior, Dubai Hills</span>
                    <span>(01)</span>
                </div>
            </section>

            {/* ============ 3. Story ============ */}
            <section
                data-theme="light"
                aria-labelledby="story-heading"
                className="bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
            >
                <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <Label>Our story</Label>
                            <h2
                                id="story-heading"
                                className="mt-6 font-serif text-5xl font-light uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                            >
                                Built on one belief
                            </h2>
                        </div>
                    </div>

                    <div className="lg:col-span-7 lg:col-start-6">
                        <p className="font-serif text-2xl font-light leading-snug sm:text-3xl lg:text-4xl">
                            RichMan Interiors began in 2012 with a single villa in Jumeirah and a
                            simple idea: a home should feel like the person who lives in it.
                        </p>

                        <div className="mt-12 max-w-xl space-y-6 font-sans text-base leading-relaxed text-deep-charcoal/75">
                            <p>
                                Dubai moves fast. Briefs change, skylines shift and many clients
                                split their lives between two countries. We built the studio
                                around that reality, with one team that handles design, approvals,
                                joinery and installation, so projects stay calm even when the city
                                is not.
                            </p>
                            <p>
                                Today we work across Dubai and Abu Dhabi on villas, penthouses and
                                a small number of commercial spaces. Every project still starts
                                the same way: we sit in the space, watch how the light moves and
                                listen before we draw.
                            </p>
                        </div>

                        <div className="relative mt-16 aspect-[4/3] overflow-hidden rounded-[4px] bg-sand-beige">
                            <Image
                                src={IMG.story}
                                alt="A designer reviewing material samples and plans with a client"
                                fill
                                sizes="(min-width:1024px) 55vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        <p className="mt-8 font-sans text-sm text-deep-charcoal/60">
                            <span className="font-serif text-lg text-deep-charcoal">Layla Haddad</span>
                            <span className="mx-3">/</span>
                            Founder and Principal Designer
                        </p>
                    </div>
                </div>
            </section>

            {/* ============ 4. Numbers ============ */}
            <section
                data-theme="light"
                aria-label="RichMan Interiors in numbers"
                className="bg-white px-6 sm:px-10 lg:px-16"
            >
                <div
                    ref={statsRef}
                    className="mx-auto grid max-w-[1600px] divide-y divide-deep-charcoal/15 border-y border-deep-charcoal/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
                >
                    {STATS.map((s) => (
                        <Stat key={s.label} {...s} start={statsInView} />
                    ))}
                </div>
            </section>

            {/* ============ 5. Beliefs (dark) ============ */}
            <Beliefs />

            {/* ============ 6. Selected work ============ */}
            <section
                data-theme="light"
                aria-labelledby="work-heading"
                className="bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
            >
                <div className="mx-auto max-w-[1600px]">
                    <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
                        <div>
                            <Label>Selected work</Label>
                            <h2
                                id="work-heading"
                                className="mt-6 font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
                            >
                                Recent homes
                                <sup className="ml-2 align-super font-sans text-[.2em] tracking-normal text-deep-charcoal/50">
                                    (0{PROJECTS.length})
                                </sup>
                            </h2>
                        </div>
                        <Link
                            href="/portfolio"
                            className="group inline-flex w-fit items-center gap-3 border-b border-champagne-gold pb-1 font-sans text-sm font-medium transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                        >
                            See all work
                            <Arrow />
                        </Link>
                    </div>

                    <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-8">
                        {PROJECTS.map((p) => (
                            <article key={p.title} className={`group ${p.offset}`}>
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-sand-beige">
                                    <Image
                                        src={p.img}
                                        alt={`${p.title}, ${p.place}`}
                                        fill
                                        sizes="(min-width:1024px) 32vw, (min-width:640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <p className="mt-5 font-sans text-sm text-deep-charcoal/55">
                                    {p.place}
                                </p>
                                <h3 className="mt-1 font-serif text-2xl font-light sm:text-3xl">
                                    {p.title}
                                </h3>
                                <p className="mt-1 font-sans text-sm text-deep-charcoal/55">
                                    {p.meta}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ 7. Where we work ============ */}
            <WhereWeWork />

            {/* ============ 8. Team ============ */}
            <section
                data-theme="light"
                aria-labelledby="team-heading"
                className="bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
            >
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <Label>The team</Label>
                            <h2
                                id="team-heading"
                                className="mt-6 font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
                            >
                                The people behind the work
                            </h2>
                        </div>
                        <p className="max-w-sm self-end font-sans text-base leading-relaxed text-deep-charcoal/70 lg:col-span-4 lg:col-start-9">
                            Designers, makers and site managers who have worked together for
                            years, so each project starts with a team that already trusts one
                            another.
                        </p>
                    </div>

                    {/* TODO: replace the monogram blocks with real portraits */}
                    <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 lg:mt-24 lg:grid-cols-4 lg:gap-x-6">
                        {TEAM.map((m) => (
                            <li key={m.name} className="group">
                                <div className="flex aspect-[3/4] items-center justify-center rounded-[4px] bg-white transition-colors duration-500 group-hover:bg-champagne-gold/25">
                                    <span className="font-serif text-6xl font-light text-deep-charcoal/60 sm:text-7xl lg:text-8xl">
                                        {m.initials}
                                    </span>
                                </div>
                                <p className="mt-5 font-serif text-xl sm:text-2xl">{m.name}</p>
                                <p className="mt-1 font-sans text-sm text-deep-charcoal/60">
                                    {m.role}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ============ 9. Closing call to action (dark) ============ */}
            <section
                data-theme="dark"
                aria-labelledby="cta-heading"
                className="bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:px-16 lg:py-40"
            >
                <div className="mx-auto max-w-[1600px]">
                    <h2
                        id="cta-heading"
                        className="max-w-5xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
                    >
                        Let&rsquo;s talk about your space
                    </h2>

                    <ul className="mt-16 border-t border-warm-ivory/15 lg:mt-24">
                        {[
                            { label: "Book a consultation", href: "#contact" },
                            { label: "See our work", href: "/portfolio" },
                        ].map((l) => (
                            <li key={l.href} className="border-b border-warm-ivory/15">
                                <Link
                                    href={l.href}
                                    className="group flex items-center justify-between gap-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold lg:py-12"
                                >
                                    <span className="font-serif text-3xl font-light uppercase tracking-tight transition-colors duration-500 group-hover:text-champagne-gold sm:text-5xl lg:text-[5vw]">
                                        {l.label}
                                    </span>
                                    <span className="text-champagne-gold transition-transform duration-500 group-hover:translate-x-3">
                                        <Arrow large />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* TODO: replace with the real studio details */}
                    <dl className="mt-16 grid gap-8 font-sans text-sm text-warm-ivory/70 sm:grid-cols-3">
                        <div>
                            <dt className="text-warm-ivory/45">Studio</dt>
                            <dd className="mt-2">Al Quoz Industrial Area 3, Dubai, UAE</dd>
                        </div>
                        <div>
                            <dt className="text-warm-ivory/45">Phone</dt>
                            <dd className="mt-2">+971 4 000 0000</dd>
                        </div>
                        <div>
                            <dt className="text-warm-ivory/45">Email</dt>
                            <dd className="mt-2">hello@richmaninteriors.ae</dd>
                        </div>
                    </dl>
                </div>
            </section>
        </main>
    );
}

function Arrow({ large = false }: { large?: boolean }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 60 20"
            className={`${large ? "h-5 w-16 lg:w-24" : "h-3 w-5"} text-champagne-gold`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
        >
            <path d="M0 10h56M47 1l9 9-9 9" />
        </svg>
    );
}