"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import ConsultationDialog from "./Consultationdialog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DAY_IMG =
    "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg";
const NIGHT_IMG =
    "https://res.cloudinary.com/dugtxybef/image/upload/v1791982338/Warm_Modern_Dining_by_the_Night_Pool_bqclvd.png";

/**
 * Small images around the white start screen (the Telha Clarke look).
 *
 * Layout rules, so nothing collides:
 *  - They sit only in the left and right bands, plus two on the bottom edge.
 *    The middle is kept clear for the title and the split image.
 *  - Heights are in vh, widths follow from the aspect ratio, so shapes stay
 *    consistent on any screen.
 *  - Sizes follow a small scale (large / medium / small) and the small ones are faded.
 *
 * TODO: replace `src` with real, different project photos. Until then the two
 * photos above are reused as tight detail crops: `focus` is the point being
 * zoomed into (it sets both object-position and transform-origin).
 *
 * left/right are CSS positions, `top`/`bottom` too. `h` is height in vh
 * (`mh` on mobile). `dx` (vw) / `dy` (vh) is the drift while fading out.
 * `op` is the resting opacity. `mobile: false` hides it on small screens.
 */
interface Scatter {
    src: string;
    focus: string;
    zoom: number;
    ratio: string;
    h: number;
    mh?: number;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    dx: number;
    dy: number;
    op: number;
    mobile: boolean;
}

const SCATTER: Scatter[] = [
    // left band
    { src: DAY_IMG, focus: "8% 45%", zoom: 2.2, ratio: "4/5", h: 26, mh: 13, left: "0%", top: "0%", dx: -5, dy: -3, op: 1, mobile: true },
    { src: NIGHT_IMG, focus: "60% 95%", zoom: 2.6, ratio: "3/4", h: 14, left: "13%", top: "30%", dx: -6, dy: 0, op: 0.4, mobile: false },
    { src: DAY_IMG, focus: "25% 60%", zoom: 1.8, ratio: "5/6", h: 32, left: "0%", top: "50%", dx: -6, dy: 3, op: 1, mobile: false },
    // right band
    { src: NIGHT_IMG, focus: "90% 30%", zoom: 2.4, ratio: "3/2", h: 20, mh: 11, right: "0%", top: "0%", dx: 5, dy: -3, op: 1, mobile: true },
    { src: DAY_IMG, focus: "55% 8%", zoom: 2.8, ratio: "3/4", h: 16, right: "6%", top: "26%", dx: 6, dy: 0, op: 0.4, mobile: false },
    { src: NIGHT_IMG, focus: "85% 75%", zoom: 2, ratio: "4/5", h: 22, right: "0%", top: "52%", dx: 6, dy: 3, op: 1, mobile: false },
    { src: DAY_IMG, focus: "30% 85%", zoom: 2.2, ratio: "1/1", h: 20, right: "10%", bottom: "-3%", dx: 5, dy: 5, op: 0.5, mobile: false },
    // bottom edge
    { src: NIGHT_IMG, focus: "40% 40%", zoom: 1.6, ratio: "3/2", h: 15, mh: 11, left: "24%", bottom: "-2%", dx: -3, dy: 5, op: 1, mobile: true },
    { src: DAY_IMG, focus: "75% 60%", zoom: 1.7, ratio: "4/3", h: 13, mh: 10, left: "62%", bottom: "-2%", dx: 3, dy: 5, op: 1, mobile: true },
];

function formatClock(totalMinutes: number) {
    const h24 = Math.floor(totalMinutes / 60) % 24;
    const m = Math.round(totalMinutes % 60);
    const h12 = h24 % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${h24 >= 12 ? "PM" : "AM"}`;
}

/**
 * One caption style for both full-bleed scenes (day and night), so they read
 * as a pair: uppercase headline, short paragraph, small credit line.
 */
function Caption({
    as: Heading,
    title,
    body,
    credit,
}: {
    as: "h1" | "h2";
    title: string;
    body: string;
    credit: string;
}) {
    return (
        <div className="max-w-[min(560px,72vw)]">
            <Heading className="font-display text-[clamp(28px,3.9vw,56px)] font-normal uppercase leading-[1.04]">
                {title}
            </Heading>
            <p className="mt-[2.2vh] max-w-[44ch] text-sm leading-relaxed">{body}</p>
            <small className="mt-[3vh] block text-xs font-bold tracking-[.1em]">{credit}</small>
        </div>
    );
}

export default function ScrollHero() {
    const track = useRef<HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [dubaiTime, setDubaiTime] = useState("");

    // Live Dubai time for the start screen (set after mount to avoid hydration mismatch).
    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timeZone: "Asia/Dubai",
        });
        const tick = () => setDubaiTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 30_000);
        return () => clearInterval(id);
    }, []);

    // The scroll positions GSAP measured go stale when content above the section
    // (header, images, fonts) finishes loading and shifts the layout. A stale start
    // point makes the animation look already in progress when you reach the section.
    // Re-measure whenever the page height changes, once everything has loaded, and
    // when web fonts are ready.
    useEffect(() => {
        let t: ReturnType<typeof setTimeout>;
        const refresh = () => {
            clearTimeout(t);
            t = setTimeout(() => ScrollTrigger.refresh(), 150);
        };
        const ro = new ResizeObserver(refresh);
        ro.observe(document.body);
        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh);
        return () => {
            clearTimeout(t);
            ro.disconnect();
            window.removeEventListener("load", refresh);
        };
    }, []);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set('[data-half="l"]', { y: "5vh" });
                gsap.set('[data-half="r"]', { y: "-5vh" });
                gsap.set("[data-frame]", { opacity: 1, filter: "brightness(1) saturate(1) sepia(0)" });
                gsap.set("[data-cta]", { scale: 0.6 });

                const clock = { m: 16 * 60 + 10 }; // 4:10 PM -> 8:40 PM across the day-to-night change
                const clockEl = track.current?.querySelector("[data-clock-time]");

                gsap
                    .timeline({
                        defaults: { ease: "power2.inOut" },
                        scrollTrigger: {
                            trigger: track.current,
                            start: "top+=120 top",
                            invalidateOnRefresh: true,
                            end: "bottom bottom",
                            scrub: 1,
                        },
                    })
                    // 0. White start screen: the small images drift outward and fade,
                    //    the title and labels fade, while the halves come together
                    .to(
                        "[data-scatter]",
                        {
                            opacity: 0,
                            scale: 0.94,
                            x: (_i: number, el: HTMLElement) => `${el.dataset.dx}vw`,
                            y: (_i: number, el: HTMLElement) => `${el.dataset.dy}vh`,
                            duration: 2.4,
                            stagger: 0.04,
                            ease: "power2.in",
                        },
                        0
                    )
                    .to("[data-intro]", { opacity: 0, y: -16, duration: 1.2 }, 0)
                    // 1. Halves align and close the gap
                    .to("[data-half]", { y: 0, duration: 2.8 }, 0)
                    .to("[data-frame]", { gap: 0, duration: 2.8 }, 0)
                    // 2. Frame expands to full bleed
                    .to("[data-frame]", { width: "100vw", height: "100vh", duration: 2.4 }, 2.8)
                    // 3. Day caption over the full image (reveals and settles)
                    .fromTo("[data-hero]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, 5.0)
                    .to("[data-hero]", { opacity: 0, y: -30, duration: 0.9 }, 7.2)
                    // Clock chip appears with the caption, then runs from afternoon to evening
                    .fromTo("[data-clock]", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 5.4)
                    .to(
                        clock,
                        {
                            m: 20 * 60 + 40,
                            duration: 3.6,
                            ease: "none",
                            onUpdate: () => {
                                if (clockEl) clockEl.textContent = formatClock(clock.m);
                            },
                        },
                        7.2
                    )
                    // 4. Smooth cinematic Day-to-Night transition:
                    // Step 4a: Golden hour warmth gently sets over the day scene
                    .to(
                        "[data-frame]",
                        {
                            filter: "brightness(0.92) saturate(1.2) sepia(0.22)",
                            duration: 1.6,
                            ease: "sine.inOut",
                        },
                        7.2
                    )
                    // Step 4b: Atmospheric sunset/dusk glow rises softly
                    .fromTo(
                        "[data-dusk]",
                        { opacity: 0 },
                        { opacity: 0.8, duration: 1.5, ease: "sine.in" },
                        7.3
                    )
                    // Step 4c: Deepening twilight - Day image dims and smoothly dissolves away
                    .to(
                        "[data-frame]",
                        {
                            opacity: 0,
                            filter: "brightness(0.62) saturate(1.1) sepia(0.35)",
                            duration: 2.4,
                            ease: "power1.inOut",
                        },
                        8.5
                    )
                    // Step 4d: Night image smoothly dissolves in as daylight fades
                    .fromTo(
                        "[data-night]",
                        { opacity: 0 },
                        { opacity: 1, duration: 2.4, ease: "power1.inOut" },
                        8.4
                    )
                    // Step 4e: Subtle cinematic zoom settling on the night scene
                    .fromTo(
                        "[data-night-img]",
                        { scale: 1.03 },
                        { scale: 1, duration: 2.6, ease: "sine.out" },
                        8.4
                    )
                    // Step 4f: Dusk glow softly fades as deep night settles
                    .to(
                        "[data-dusk]",
                        { opacity: 0, duration: 1.6, ease: "sine.out" },
                        8.8
                    )
                    // 5. Night caption gently rises into view (same style as the day caption)
                    .fromTo(
                        "[data-copy]",
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                        10.6
                    )
                    // 6. Call-to-action button emerges
                    .to(
                        "[data-cta]",
                        { opacity: 1, scale: 1, duration: 1.1, ease: "back.out(1.5)" },
                        11.3
                    )
                    // 7. Comfortable scroll buffer zone to comfortably view and click
                    .to({}, { duration: 1.5 });

                // Thin progress line along the bottom edge for the whole story
                gsap.to("[data-progress]", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: track.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                });
            });

            // Reduced motion: skip the scroll story, show the final scene.
            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(
                    "[data-frame],[data-hero],[data-dusk],[data-scatter],[data-intro],[data-clock],[data-progress]",
                    { display: "none" }
                );
                gsap.set("[data-night]", { opacity: 1 });
                gsap.set("[data-copy],[data-cta]", { opacity: 1 });
                gsap.set(track.current, { height: "100vh" });
            });
        },
        { scope: track }
    );

    return (
        <>
            {/* Load-in: images and title ease up once. Uses the CSS `translate`
                property and `backwards` fill, so it never fights GSAP's transforms. */}
            <style>{`
                @keyframes heroIn { from { opacity: 0; translate: 0 24px; } }
                @media (prefers-reduced-motion: no-preference) {
                    .hero-in { animation: heroIn 1.2s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }
                }
            `}</style>

            <section ref={track} className="relative h-[880vh]">
                <div className="sticky top-0 h-screen overflow-hidden bg-white">
                    {/* ---------- White start screen ---------- */}

                    {SCATTER.map((s, i) => (
                        <div
                            key={i}
                            data-scatter
                            data-dx={s.dx}
                            data-dy={s.dy}
                            aria-hidden
                            className={`absolute z-[1] h-[var(--h)] will-change-[transform,opacity] max-sm:h-[var(--mh)] ${s.mobile ? "" : "max-sm:hidden"
                                }`}
                            style={
                                {
                                    left: s.left,
                                    right: s.right,
                                    top: s.top,
                                    bottom: s.bottom,
                                    aspectRatio: s.ratio,
                                    opacity: s.op,
                                    "--h": `${s.h}vh`,
                                    "--mh": `${s.mh ?? s.h}vh`,
                                } as CSSProperties
                            }
                        >
                            {/* The load-in lives on this inner layer so GSAP never reads
                                a half-faded opacity from the layer it animates. */}
                            <div
                                className="hero-in relative h-full w-full overflow-hidden bg-neutral-100"
                                style={{ "--d": `${200 + i * 70}ms` } as CSSProperties}
                            >
                                <Image
                                    src={s.src}
                                    alt=""
                                    fill
                                    sizes="20vw"
                                    className="object-cover"
                                    style={{
                                        objectPosition: s.focus,
                                        transformOrigin: s.focus,
                                        transform: `scale(${s.zoom})`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}

                    {/* Title above the split image, like "All Work (31)" in the reference */}
                    <div
                        data-intro
                        className="pointer-events-none absolute inset-x-0 top-[5vh] z-[3] flex justify-center text-[#171816]"
                    >
                        <p
                            className="hero-in font-editorial text-[clamp(32px,5vw,80px)] font-normal leading-none tracking-[-.02em] text-[#171816]"
                            style={{ "--d": "100ms" } as CSSProperties}
                        >
                            Selected Homes
                            <sup className="ml-1 align-super text-[.4em] tracking-normal text-[#171816]/60">(Dubai)</sup>
                        </p>
                    </div>

                    {/* Small labels: live local time and a scroll cue */}
                    <div
                        data-intro
                        className="absolute bottom-[4vh] left-[3vw] z-[3] max-sm:left-[6vw]"
                    >
                        <p
                            className="hero-in text-[13px] font-medium text-[#171816]"
                            style={{ "--d": "700ms" } as CSSProperties}
                        >
                            Dubai, UAE
                            {dubaiTime && <span className="ml-3 text-[#171816]/60">{dubaiTime}</span>}
                        </p>
                    </div>
                    <div
                        data-intro
                        className="pointer-events-none absolute bottom-[4vh] left-1/2 z-[3] -translate-x-1/2"
                    >
                        <p
                            className="hero-in rounded-sm bg-[#171816] px-4 py-2 text-[13px] font-medium text-white"
                            style={{ "--d": "800ms" } as CSSProperties}
                        >
                            Scroll to discover <span aria-hidden>+</span>
                        </p>
                    </div>

                    {/* ---------- Image story ---------- */}

                    {/* Two halves of one image, merged on scroll */}
                    <div
                        data-frame
                        className="@container absolute left-1/2 top-1/2 z-[2] flex h-[56vh] w-[55.6vw] -translate-x-1/2 -translate-y-1/2 gap-[1vw] max-sm:w-[84vw] max-sm:gap-[2vw] will-change-[transform,opacity,filter]"
                    >
                        <div data-half="l" style={{ transform: "translateY(5vh)" }} className="relative flex-1 overflow-hidden">
                            <div className="absolute left-0 top-0 h-full w-[100cqw]">
                                <Image src={DAY_IMG} alt="Villa interior daylight view" fill priority sizes="100vw" className="object-cover" />
                            </div>
                        </div>
                        <div data-half="r" style={{ transform: "translateY(-5vh)" }} className="relative flex-1 overflow-hidden">
                            <div className="absolute right-0 top-0 h-full w-[100cqw]">
                                <Image src={DAY_IMG} alt="Villa interior daylight view" fill priority sizes="100vw" className="object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Day caption */}
                    <div
                        data-hero
                        className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(to_top,rgba(16,41,44,.62),rgba(16,41,44,.05)_65%)] text-white opacity-0"
                    >
                        <div className="absolute bottom-[16vh] left-[14vw] max-sm:bottom-[24vh] max-sm:left-[6vw]">
                            <Caption
                                as="h1"
                                title="Rooms made to be lived in"
                                body="Considered interiors for villas, apartments and penthouses across Dubai, shaped around how you live and the light you have."
                                credit="Maison Noor, interior design studio in Dubai"
                            />
                        </div>
                    </div>

                    {/* Evening scene */}
                    <div data-night className="absolute inset-0 z-[3] opacity-0 will-change-[opacity]">
                        <div data-night-img className="absolute inset-0 will-change-transform">
                            <Image src={NIGHT_IMG} alt="Warm modern dining room at night by the pool" fill priority sizes="100vw" className="object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,41,44,.6),transparent_60%)]" />
                    </div>
                    <div
                        data-dusk
                        className="pointer-events-none absolute inset-0 z-[4] opacity-0 will-change-[opacity] mix-blend-soft-light bg-[radial-gradient(circle_at_50%_35%,rgba(255,145,60,0.6)_0%,rgba(215,85,60,0.38)_40%,rgba(35,25,60,0.7)_100%)]"
                    />

                    {/* Time-of-day chip: runs from afternoon to evening during the transition */}
                    <p
                        data-clock
                        aria-hidden
                        className="pointer-events-none absolute left-[14vw] top-[14vh] z-[6] flex items-center gap-3 text-[13px] font-medium text-white opacity-0 max-sm:left-[6vw]"
                    >
                        <span>Dubai</span>
                        <span className="h-px w-8 bg-white/60" />
                        <span data-clock-time className="tabular-nums">
                            4:10 PM
                        </span>
                    </p>

                    {/* Night caption: same position and style as the day caption */}
                    <div
                        data-copy
                        className="pointer-events-none absolute bottom-[16vh] left-[14vw] z-[5] text-white opacity-0 max-sm:bottom-[24vh] max-sm:left-[6vw]"
                    >
                        <Caption
                            as="h2"
                            title="Design that balances clean lines with Gulf warmth and light"
                            body="We design and furnish villas, apartments and penthouses across Dubai and Abu Dhabi, from the first sketch to the final styling."
                            credit="Founded by Layla Haddad, interior architect"
                        />
                    </div>

                    <button
                        data-cta
                        type="button"
                        onClick={() => setOpen(true)}
                        className="absolute bottom-[9vh] right-[12vw] z-[7] aspect-square w-[clamp(120px,14vw,200px)] cursor-pointer rounded-full border border-white/75 bg-ink/35 text-[13px] font-bold leading-[1.35] tracking-[.06em] text-white opacity-0 backdrop-blur-md transition-colors hover:bg-brass focus-visible:bg-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-sm:bottom-[6vh] max-sm:right-[6vw]"
                    >
                        Book a free
                        <br />
                        consultation
                    </button>

                    {/* Progress line: white blended so it reads on both white and photo */}
                    <div
                        data-progress
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[2px] origin-left scale-x-0 bg-white mix-blend-difference"
                    />
                </div>
            </section>

            <ConsultationDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
}