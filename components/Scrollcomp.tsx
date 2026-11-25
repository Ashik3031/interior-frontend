"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ConsultationDialog from "./Consultationdialog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Mobile browsers resize the viewport when the address bar hides/shows.
// Without this, ScrollTrigger recalculates mid-scroll and the animation jumps.
ScrollTrigger.config({ ignoreMobileResize: true });

/* ------------------------------------------------------------------ */
/*  ONE long image for the whole sequence. Hosted on Cloudinary        */
/* ------------------------------------------------------------------ */
const HERO_IMG =
    "https://res.cloudinary.com/dugtxybef/image/upload/v1795178756/Warm_Modern_Living_Room_Vignette_uegjn4.png";

const LEAF_TOP_LEFT =
    "https://res.cloudinary.com/img3p1wr/video/upload/v1794312057/IMG_6150.mp4";
const LEAF_BOTTOM_RIGHT =
    "https://res.cloudinary.com/img3p1wr/video/upload/v1794308962/IMG_6147.mp4";

const BIG_WORD = "INTERIORS";
const CAPTION =
    "WE DESIGN SPACES THAT REFLECT YOUR VISION, COMPLEMENT YOUR LIFESTYLE AND BRING TOGETHER TIMELESS AESTHETICS WITH EVERYDAY COMFORT.";
const CREDIT_BOLD = "RICHMAN INTERIORS";
const CREDIT_LIGHT = "THOUGHTFUL DESIGN. REFINED LIVING.";

const CREAM = "#f4f3ec";

/** Below this width we use the mobile layout (matches Tailwind's `sm`). */
const MOBILE_QUERY = "(max-width: 639px)";

/**
 * Scroll budget, in screens (1 = one window height of scrolling).
 * Mobile gets a slightly shorter intro so it doesn't feel endless on touch.
 */
const INTRO_SCREENS = 3.2;
const INTRO_SCREENS_MOBILE = 2.6;
const TAIL_SCREENS = 1.6;

/**
 * Window shapes. clip-path inset order: top right bottom left.
 * Heights use `svh` (small viewport height) so they stay stable when the
 * mobile address bar collapses.
 *
 * DESKTOP: two wide windows side by side, staggered.
 * MOBILE:  two tall, narrow windows (portrait-friendly), staggered.
 */
const WIN = {
    desktop: {
        l: "inset(23.1svh 50.5vw 13.5svh 22.25vw)",
        r: "inset(13svh 22.25vw 23.65svh 50.55vw)",
        alignL: "inset(18.05svh 50vw 18.55svh 22.25vw)",
        alignR: "inset(18.05svh 22.25vw 18.55svh 50vw)",
    },
    mobile: {
        l: "inset(24svh 51vw 10svh 8vw)",
        r: "inset(10svh 8vw 24svh 51vw)",
        alignL: "inset(17svh 50vw 17svh 8vw)",
        alignR: "inset(17svh 8vw 17svh 50vw)",
    },
};
const FULL = "inset(0svh 0vw 0svh 0vw)";

/**
 * Initial clip-paths as CSS classes (not inline styles) so the correct
 * layout paints on the very first frame on both phone and desktop,
 * before GSAP runs. Written out in full so Tailwind can see them.
 */
const WIN_CLASS = {
    l: "[clip-path:inset(23.1svh_50.5vw_13.5svh_22.25vw)] max-sm:[clip-path:inset(24svh_51vw_10svh_8vw)]",
    r: "[clip-path:inset(13svh_22.25vw_23.65svh_50.55vw)] max-sm:[clip-path:inset(10svh_8vw_24svh_51vw)]",
};

export default function ScrollHero() {
    const track = useRef<HTMLElement>(null);
    const wordRef = useRef<HTMLSpanElement>(null);
    const [open, setOpen] = useState(false);

    // Fit the big word to ~94% of the viewport width, whatever font you use.
    useEffect(() => {
        const fit = () => {
            const el = wordRef.current;
            if (!el) return;
            el.style.fontSize = "100px";
            const w = el.getBoundingClientRect().width;
            if (w) el.style.fontSize = `${(100 * window.innerWidth * 0.94) / w}px`;
        };
        fit();
        document.fonts?.ready.then(fit);
        window.addEventListener("resize", fit);
        return () => window.removeEventListener("resize", fit);
    }, []);

    // Re-measure scroll positions when layout above the section shifts.
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
            const img = track.current?.querySelector<HTMLImageElement>("[data-bgimg]");

            const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

            // Scroll distances (px), all derived from the real rendered image height
            const introPx = () =>
                (isMobile() ? INTRO_SCREENS_MOBILE : INTRO_SCREENS) * window.innerHeight;
            const tailPx = () => TAIL_SCREENS * window.innerHeight;
            const panPx = () => Math.max(0, (img?.offsetHeight ?? 0) - window.innerHeight);

            const sizeTrack = () => {
                if (track.current)
                    track.current.style.height = `${introPx() + panPx() + tailPx() + window.innerHeight}px`;
            };

            // Re-runs automatically when the breakpoint or motion preference changes
            // (rotating a phone, resizing a window), with the right window shapes.
            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    mobile: MOBILE_QUERY,
                    reduce: "(prefers-reduced-motion: reduce)",
                },
                (ctx) => {
                    const { motion, mobile, reduce } = ctx.conditions as {
                        motion: boolean;
                        mobile: boolean;
                        reduce: boolean;
                    };
                    const w = mobile ? WIN.mobile : WIN.desktop;

                    if (reduce) {
                        // Reduced motion: show the final scene only.
                        gsap.set("[data-win]", { clipPath: FULL });
                        gsap.set("[data-word],[data-leaf-tl],[data-leaf-br]", { display: "none" });
                        gsap.set("[data-bgwrap]", { y: () => -panPx() });
                        gsap.set("[data-shade],[data-copy],[data-credit],[data-cta]", { opacity: 1 });
                        gsap.set("[data-chrome]", { color: "#ffffff" });
                        gsap.set(track.current, { height: "100svh" });
                        return;
                    }

                    if (!motion) return;

                    sizeTrack();
                    ScrollTrigger.addEventListener("refreshInit", sizeTrack);

                    gsap.set('[data-win="l"]', { clipPath: w.l });
                    gsap.set('[data-win="r"]', { clipPath: w.r });
                    gsap.set("[data-cta]", { scale: 0.7 });

                    // A. Intro: windows level out, open to full screen, headline appears
                    gsap
                        .timeline({
                            defaults: { ease: "power2.inOut" },
                            scrollTrigger: {
                                trigger: track.current,
                                start: "top top",
                                end: () => `+=${introPx()}`,
                                scrub: 1,
                                invalidateOnRefresh: true,
                            },
                        })
                        .to('[data-win="l"]', { clipPath: w.alignL, duration: 2 }, 0)
                        .to('[data-win="r"]', { clipPath: w.alignR, duration: 2 }, 0)
                        // Leaves exit completely: they only exist on the start screen
                        .to("[data-leaf-tl]", { xPercent: -130, yPercent: -130, autoAlpha: 0, duration: 2.2, ease: "power2.in" }, 0)
                        .to("[data-leaf-br]", { xPercent: 130, yPercent: 130, autoAlpha: 0, duration: 2.2, ease: "power2.in" }, 0)
                        .to("[data-win]", { clipPath: FULL, duration: 2.4 }, 2)
                        .to("[data-chrome]", { color: "#ffffff", duration: 0.8, ease: "none" }, 3.2)
                        .fromTo("[data-word]", { opacity: 0, y: "8svh" }, { opacity: 1, y: 0, duration: 1.1 }, 4.4)
                        .to({}, { duration: 0.6 });

                    // B. The long image travels its FULL height, 1:1 with scroll.
                    gsap.to("[data-bgwrap]", {
                        y: () => -panPx(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: track.current,
                            start: () => `top+=${introPx()} top`,
                            end: () => `+=${Math.max(1, panPx())}`,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    });

                    // C. Image has reached its bottom: shade, caption, credit, button
                    gsap
                        .timeline({
                            defaults: { ease: "power2.out" },
                            scrollTrigger: {
                                trigger: track.current,
                                start: () => `top+=${introPx() + panPx()} top`,
                                end: () => `+=${tailPx()}`,
                                scrub: 1,
                                invalidateOnRefresh: true,
                            },
                        })
                        .fromTo("[data-word]", { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "none", immediateRender: false }, 0)
                        .fromTo("[data-shade]", { opacity: 0 }, { opacity: 1, duration: 1, ease: "none" }, 0)
                        .fromTo("[data-copy]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.4)
                        .fromTo("[data-credit]", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.8)
                        .to("[data-cta]", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, 0.6)
                        .to({}, { duration: 0.8 });

                    return () => ScrollTrigger.removeEventListener("refreshInit", sizeTrack);
                }
            );
        },
        { scope: track }
    );

    return (
        <>
            {/* Height is set by script; this is just a fallback */}
            <section ref={track} className="relative h-[900svh]">
                <div
                    className="sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-[100svh]"
                    style={{ background: CREAM }}
                >
                    {/* ---------- One long photo, seen through two windows ---------- */}
                    {(["l", "r"] as const).map((side) => (
                        <div
                            key={side}
                            data-win={side}
                            className={`absolute inset-0 z-[2] will-change-[clip-path] ${WIN_CLASS[side]}`}
                        >
                            <div data-bgwrap className="absolute left-0 top-0 w-full will-change-transform">
                                {/* Full width, natural height. On phones the image can be shorter than the
                                    screen, so min-h + object-cover guarantees it always fills the viewport. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    {...(side === "l" ? { "data-bgimg": "" } : {})}
                                    src={HERO_IMG}
                                    alt=""
                                    decoding="async"
                                    fetchPriority="high"
                                    onLoad={() => ScrollTrigger.refresh()}
                                    className="block h-auto min-h-[100svh] w-full max-w-none select-none object-cover"
                                    draggable={false}
                                />

                                {/* Giant headline: lives ON the image and scrolls away with it */}
                                {side === "r" && (
                                    <div className="pointer-events-none absolute inset-x-0 top-[6svh] z-10 flex justify-center max-sm:top-[12svh]">
                                        <span
                                            ref={wordRef}
                                            data-word
                                            className="inline-block whitespace-nowrap font-display font-normal uppercase leading-[.85] text-white opacity-0"
                                        >
                                            {BIG_WORD}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Foreground leaf videos, top-left and bottom-right of the start screen. */}
                    <video
                        data-leaf-tl
                        src={LEAF_TOP_LEFT}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden
                        className="pointer-events-none absolute left-0 top-0 z-[5] h-[55svh] w-[36vw] object-cover mix-blend-multiply [filter:brightness(1.12)_contrast(1.1)] will-change-transform max-sm:h-[34svh] max-sm:w-[58vw]"
                        style={{
                            WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, #000 50%, transparent 82%)",
                            maskImage: "radial-gradient(ellipse at 0% 0%, #000 50%, transparent 82%)",
                        }}
                    />
                    <video
                        data-leaf-br
                        src={LEAF_BOTTOM_RIGHT}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden
                        className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[60svh] w-[34vw] object-cover mix-blend-multiply [filter:brightness(1.12)_contrast(1.1)] will-change-transform max-sm:h-[36svh] max-sm:w-[56vw]"
                        style={{
                            WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, #000 50%, transparent 82%)",
                            maskImage: "radial-gradient(ellipse at 100% 100%, #000 50%, transparent 82%)",
                        }}
                    />

                    {/* Dark gradient shade so the caption, credit and button stay readable */}
                    <div
                        data-shade
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_40%,transparent_75%)] opacity-0 max-sm:bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.25)_100%)]"
                    />

                    {/* ---------- Caption ---------- */}
                    <div
                        data-copy
                        className="pointer-events-none absolute left-[12.5vw] top-[34svh] z-[6] w-[min(46vw,800px)] text-white opacity-0 [text-shadow:0_2px_24px_rgba(0,0,0,0.85)] max-sm:left-[6vw] max-sm:top-[26svh] max-sm:w-[88vw]"
                    >
                        <h2 className="font-display text-[clamp(22px,2.1vw,40px)] font-bold uppercase leading-[1.12] text-white [text-indent:9.5vw] max-sm:text-[clamp(16px,5vw,22px)] max-sm:leading-[1.2] max-sm:[text-indent:0]">
                            {CAPTION}
                        </h2>
                    </div>
                    <div
                        data-credit
                        className="pointer-events-none absolute left-[22vw] top-[64svh] z-[6] text-[13px] uppercase leading-[1.5] tracking-[.04em] text-white opacity-0 [text-shadow:0_2px_16px_rgba(0,0,0,0.85)] max-sm:bottom-[16svh] max-sm:left-[6vw] max-sm:top-auto max-sm:max-w-[52vw] max-sm:text-[11px]"
                    >
                        <b className="block font-bold tracking-[.06em] text-white">{CREDIT_BOLD}</b>
                        <span className="block font-medium text-white/95">{CREDIT_LIGHT}</span>
                    </div>

                    {/* Circular call-to-action */}
                    <button
                        data-cta
                        type="button"
                        onClick={() => setOpen(true)}
                        className="group absolute left-[62.7vw] top-[59.6svh] z-[7] flex aspect-square w-[clamp(150px,13.1vw,260px)] cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-center text-[13px] font-bold uppercase leading-[1.35] tracking-[.04em] text-white opacity-0 backdrop-blur-[6px] transition-all [text-shadow:0_2px_14px_rgba(0,0,0,0.9)] hover:scale-105 hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-sm:bottom-[14svh] max-sm:left-auto max-sm:right-[6vw] max-sm:top-auto max-sm:w-[clamp(110px,34vw,140px)] max-sm:text-[11px]"
                    >
                        {/* Thin ring, strong at top-left and bottom-right, fading in between */}
                        <svg viewBox="0 0 100 100" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
                            <defs>
                                <linearGradient id="ctaRing" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0" stopColor="#fff" stopOpacity=".95" />
                                    <stop offset=".3" stopColor="#fff" stopOpacity=".15" />
                                    <stop offset=".7" stopColor="#fff" stopOpacity=".15" />
                                    <stop offset="1" stopColor="#fff" stopOpacity=".95" />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="49.6" fill="none" stroke="url(#ctaRing)" strokeWidth=".6" />
                        </svg>
                        <span className="relative z-10 flex flex-col items-center justify-center px-4 text-center font-bold text-white">
                            <span>Book a call</span>
                            <span>now</span>
                        </span>
                    </button>
                </div>
            </section>

            <ConsultationDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
}