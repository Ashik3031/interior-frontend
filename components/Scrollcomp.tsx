"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ConsultationDialog from "./Consultationdialog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/*  ONE long image for the whole sequence. Hosted on Cloudinary        */
/*  (needs res.cloudinary.com allowed if you ever switch to next/image)*/
/* ------------------------------------------------------------------ */
const HERO_IMG =
    "https://res.cloudinary.com/dugtxybef/image/upload/v1795178756/Warm_Modern_Living_Room_Vignette_uegjn4.png";

// Foreground leaves on the start screen (replace the flowers in the reference)
const LEAF_TOP_LEFT =
    "https://res.cloudinary.com/img3p1wr/video/upload/v1794312057/IMG_6150.mp4";
const LEAF_BOTTOM_RIGHT =
    "https://res.cloudinary.com/img3p1wr/video/upload/v1794308962/IMG_6147.mp4";

const BIG_WORD = "INTERIORS";
const CAPTION =
    "WE DESIGN SPACES THAT REFLECT YOUR VISION, COMPLEMENT YOUR LIFESTYLE AND BRING TOGETHER TIMELESS AESTHETICS WITH EVERYDAY COMFORT.";
const CREDIT_BOLD = "RICHMAN INTERIORS";
const CREDIT_LIGHT = "THOUGHTFUL DESIGN. REFINED LIVING.";

const NAVY = "#1b2540";
const CREAM = "#f4f3ec";

/**
 * Scroll budget, in screens (1 = one window height of scrolling).
 * The long image itself is NOT in this budget: once the windows have opened,
 * the image moves 1:1 with your scroll for its WHOLE natural height.
 */
const INTRO_SCREENS = 3.2; // windows level out, open up, headline appears
const TAIL_SCREENS = 1.6; // after the image reaches its bottom: caption + button

/**
 * The two start windows, measured from the reference (1901x871 screen).
 * clip-path inset order: top right bottom left.
 * Both windows cut into the SAME photo, so when they open up nothing jumps.
 */
const WIN_L = "inset(23.1vh 50.5vw 13.5vh 22.25vw)"; // lower window
const WIN_R = "inset(13vh 22.25vw 23.65vh 50.55vw)"; // higher window
const ALIGN_L = "inset(18.05vh 50vw 18.55vh 22.25vw)"; // same height, gap closed
const ALIGN_R = "inset(18.05vh 22.25vw 18.55vh 50vw)";
const FULL = "inset(0vh 0vw 0vh 0vw)";

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

            // Scroll distances (px), all derived from the real rendered image height
            const introPx = () => INTRO_SCREENS * window.innerHeight;
            const tailPx = () => TAIL_SCREENS * window.innerHeight;
            const panPx = () => Math.max(0, (img?.offsetHeight ?? 0) - window.innerHeight);

            // The section is exactly as tall as the scroll needs: intro + the image's full height + tail
            const sizeTrack = () => {
                if (track.current)
                    track.current.style.height = `${introPx() + panPx() + tailPx() + window.innerHeight}px`;
            };

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                sizeTrack();
                ScrollTrigger.addEventListener("refreshInit", sizeTrack);

                gsap.set('[data-win="l"]', { clipPath: WIN_L });
                gsap.set('[data-win="r"]', { clipPath: WIN_R });
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
                    .to('[data-win="l"]', { clipPath: ALIGN_L, duration: 2 }, 0)
                    .to('[data-win="r"]', { clipPath: ALIGN_R, duration: 2 }, 0)
                    // leaves drift out of the corners as the windows open
                    // They exit completely (off-screen and hidden): leaves only exist on the start screen
                    .to("[data-leaf-tl]", { xPercent: -130, yPercent: -130, autoAlpha: 0, duration: 2.2, ease: "power2.in" }, 0)
                    .to("[data-leaf-br]", { xPercent: 130, yPercent: 130, autoAlpha: 0, duration: 2.2, ease: "power2.in" }, 0)
                    .to("[data-win]", { clipPath: FULL, duration: 2.4 }, 2)
                    .to("[data-chrome]", { color: "#ffffff", duration: 0.8, ease: "none" }, 3.2)
                    .fromTo("[data-word]", { opacity: 0, y: "8vh" }, { opacity: 1, y: 0, duration: 1.1 }, 4.4)
                    .to({}, { duration: 0.6 });

                // B. The long image travels its FULL height, 1:1 with scroll.
                //    The headline sits on the image, so it scrolls away with it.
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
                    .fromTo("[data-shade]", { opacity: 0 }, { opacity: 1, duration: 1, ease: "none" }, 0)
                    .fromTo("[data-copy]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.4)
                    .fromTo("[data-credit]", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.8)
                    .to("[data-cta]", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, 0.6)
                    .to({}, { duration: 0.8 });

                return () => ScrollTrigger.removeEventListener("refreshInit", sizeTrack);
            });

            // Reduced motion: show the final scene only.
            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set("[data-win]", { clipPath: FULL });
                gsap.set("[data-word],[data-leaf-tl],[data-leaf-br]", { display: "none" });
                gsap.set("[data-bgwrap]", { y: () => -panPx() });
                gsap.set("[data-shade],[data-copy],[data-credit],[data-cta]", { opacity: 1 });
                gsap.set("[data-chrome]", { color: "#ffffff" });
                gsap.set(track.current, { height: "100vh" });
            });
        },
        { scope: track }
    );

    return (
        <>
            {/* Height is set by script to (intro + full image height + tail); this is just a fallback */}
            <section ref={track} className="relative h-[900vh]">
                <div className="sticky top-0 h-screen overflow-hidden" style={{ background: CREAM }}>
                    {/* ---------- One long photo, seen through two windows ---------- */}
                    {(["l", "r"] as const).map((side) => (
                        <div
                            key={side}
                            data-win={side}
                            className="absolute inset-0 z-[2] will-change-[clip-path]"
                            style={{ clipPath: side === "l" ? WIN_L : WIN_R }}
                        >
                            <div data-bgwrap className="absolute left-0 top-0 w-full will-change-transform">
                                {/* Plain <img>: full width, natural height. next/image `fill` would crop it. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    {...(side === "l" ? { "data-bgimg": "" } : {})}
                                    src={HERO_IMG}
                                    alt=""
                                    decoding="async"
                                    fetchPriority="high"
                                    onLoad={() => ScrollTrigger.refresh()}
                                    className="block h-auto w-full max-w-none select-none"
                                    draggable={false}
                                />

                                {/* Giant headline: lives ON the image (only in the top window layer,
                                    so it isn't drawn twice) and scrolls away with it */}
                                {side === "r" && (
                                    <div className="pointer-events-none absolute inset-x-0 top-[6vh] z-10 flex justify-center">
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

                    {/* Foreground leaf videos, top-left and bottom-right of the start screen.
                        mix-blend-multiply makes a white/cream video background disappear on the cream page;
                        the brightness/contrast filter pushes the light-grey checkerboard squares baked into
                        these clips up to white so they vanish too (same trick as DesignProcess);
                        the mask feathers the rectangle edges. If you switch to true-alpha WebM, delete the
                        blend + filter classes. */}
                    <video
                        data-leaf-tl
                        src={LEAF_TOP_LEFT}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden
                        className="pointer-events-none absolute left-0 top-0 z-[5] h-[55vh] w-[36vw] object-cover mix-blend-multiply [filter:brightness(1.12)_contrast(1.1)] will-change-transform max-sm:w-[60vw]"
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
                        className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[60vh] w-[34vw] object-cover mix-blend-multiply [filter:brightness(1.12)_contrast(1.1)] will-change-transform max-sm:w-[58vw]"
                        style={{
                            WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, #000 50%, transparent 82%)",
                            maskImage: "radial-gradient(ellipse at 100% 100%, #000 50%, transparent 82%)",
                        }}
                    />

                    {/* Dark gradient shade so the caption, credit and button are clearly visible over the bright render */}
                    <div
                        data-shade
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_40%,transparent_75%)] opacity-0"
                    />

                    {/* ---------- Caption ---------- */}
                    <div
                        data-copy
                        className="pointer-events-none absolute left-[12.5vw] top-[34vh] z-[6] w-[min(46vw,800px)] text-white opacity-0 max-sm:left-[6vw] max-sm:w-[88vw] [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]"
                    >
                        <h2 className="font-display text-[clamp(22px,2.1vw,40px)] font-bold uppercase leading-[1.12] [text-indent:9.5vw] max-sm:[text-indent:0] text-white">
                            {CAPTION}
                        </h2>
                    </div>
                    <div
                        data-credit
                        className="pointer-events-none absolute left-[22vw] top-[64vh] z-[6] text-[13px] uppercase leading-[1.5] tracking-[.04em] text-white opacity-0 max-sm:left-[6vw] [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]"
                    >
                        <b className="block font-bold tracking-[.06em] text-white">{CREDIT_BOLD}</b>
                        <span className="block font-medium text-white/95">{CREDIT_LIGHT}</span>
                    </div>

                    {/* Circular call-to-action */}
                    <button
                        data-cta
                        type="button"
                        onClick={() => setOpen(true)}
                        className="group absolute left-[62.7vw] top-[59.6vh] z-[7] aspect-square w-[clamp(150px,13.1vw,260px)] cursor-pointer rounded-full bg-black/40 text-center text-[13px] font-bold uppercase leading-[1.35] tracking-[.04em] text-white opacity-0 backdrop-blur-[6px] transition-all [text-shadow:0_2px_14px_rgba(0,0,0,0.9)] hover:bg-black/60 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-sm:bottom-[8vh] max-sm:left-auto max-sm:right-[6vw] max-sm:top-auto flex items-center justify-center border border-white/20"
                    >
                        {/* Thin ring that is strong at the top-left and bottom-right and fades out in between, like the reference */}
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
                        {/* Centered bold text in middle of circle */}
                        <span className="relative z-10 flex flex-col items-center justify-center text-center font-bold text-white px-4">
                            <span>Book a call</span>
                            <span>now</span>
                        </span>
                    </button>

                    {/* ---------- Left: SCROLL cue + arrow ---------- */}
                    {/* <div data-chrome className="pointer-events-none absolute inset-0 z-[20] max-sm:hidden" style={{ color: NAVY }}>
                        <div className="absolute left-[7.3vw] top-[76vh] flex -translate-x-1/2 flex-col items-center gap-[3vh]">
                            <span className="text-[11px] font-bold uppercase tracking-[.22em] [writing-mode:vertical-rl]">
                                Scroll
                            </span>
                            <span className="block h-[5vh] w-px bg-current opacity-80" />
                            <span aria-hidden className="-mt-[2.4vh] text-[14px] leading-none">
                                ↓
                            </span>
                        </div>
                    </div> */}
                </div>
            </section>

            <ConsultationDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
}