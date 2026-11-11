"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

// Decorative leaf videos (Cloudinary).
const LEAF_TOP_LEFT =
    "https://res.cloudinary.com/img3p1wr/video/upload/v1794312057/IMG_6150.mp4";
const LEAF_BOTTOM_CENTER =
    "https://res.cloudinary.com/img3p1wr/video/upload/v1794312052/IMG_6151.mp4";
const LEAF_BOTTOM_RIGHT =
    "https://res.cloudinary.com/img3p1wr/video/upload/v1794308962/IMG_6147.mp4";

const STAGES = [
    {
        no: "01",
        title: "Discover",
        text: "Understanding your vision, lifestyle and requirements before a single line is drawn. We visit the space, listen to how you live and agree the brief, budget and timeline together.",
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791979419/pexels-shkrabaanthony-6322363_gbwg6f.jpg", // TODO: consultation / material samples / sketches
        alt: "Designer reviewing material samples and plans with a client",
        // vertical offsets (desktop) so the row doesn't sit on one flat line
        lift: "[.hs-on_&]:-translate-y-[5vh]",
    },
    {
        no: "02",
        title: "Design",
        text: "Developing the concept, spatial planning and material direction into a clear, considered scheme. You see layouts, finishes and furniture together, and refine them with us until they feel right.",
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791979412/pexels-cottonbro-6580001_j5dxxv.jpg", // TODO: render / moodboard / plan
        alt: "Interior concept render with material palette",
        lift: "[.hs-on_&]:translate-y-[6vh]",
    },
    {
        no: "03",
        title: "Create",
        text: "Coordinating the agreed execution and installation, with every trade working to the same standard. You get regular progress updates and one point of contact from start to finish.",
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791979411/pexels-cottonbro-6143826_rvohtd.jpg", // TODO: joinery / fit-out in progress
        alt: "Bespoke joinery being installed in a residence",
        lift: "[.hs-on_&]:-translate-y-[5vh]",
    },
    {
        no: "04",
        title: "Complete",
        text: "Reviewing the finished work and every final detail together, until it is exactly right. We walk through the home with you, resolve any remaining points and hand over a space ready to live in.",
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791979410/pexels-ranamatloob567-34377945_czkakl.jpg", // TODO: finished, styled interior
        alt: "Finished living room with refined styling",
        lift: "[.hs-on_&]:translate-y-[6vh]",
    },
];

/* ------------------------------------------------------------------ */
/*  Decorative leaf video                                              */
/* ------------------------------------------------------------------ */

/**
 * Looping leaf video used as a corner decoration.
 *
 * - Plays only while on screen, and stays paused for reduced-motion users.
 * - `mix-blend-multiply` makes the video's WHITE background disappear against
 *   the ivory page (an MP4 has no real transparency). The small brightness /
 *   contrast filter pushes the light-grey checkerboard squares baked into the
 *   current clips up to white so they vanish too.
 *   This only works because the track below has its own background colour
 *   (the blend needs something to blend with inside the same layer).
 *   If you switch to true-alpha WebM files, delete the two blend classes.
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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * Design process section, modelled on the ERA Residence scroll:
 * the section pins to the screen and the person's vertical scroll pans a
 * long horizontal track (intro, four stages, closing call to action).
 * The huge stage titles and the photos move at different speeds, so each
 * panel has depth as it passes.
 *
 * Desktop with motion allowed -> pinned horizontal scroll (class `hs-on`).
 * Mobile, tablet or reduced motion -> a plain vertical stack, no pinning.
 */
export default function DesignProcess() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    // Flag <html> while this ivory section is on screen so the fixed side scroll
    // rail can switch colour (see the note at the bottom of this file).
    useIsoLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.registerPlugin(ScrollTrigger);
        const root = document.documentElement;

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => root.classList.toggle("rail-invert", self.isActive),
            onRefresh: (self) => root.classList.toggle("rail-invert", self.isActive),
        });

        return () => {
            st.kill();
            root.classList.remove("rail-invert");
        };
    }, []);

    // Scroll-driven behaviour.
    useIsoLayoutEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        const track = trackRef.current;
        if (!section || !pin || !track) return;

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

                /* Headline lines rise once when the section arrives */
                if (!reduce) {
                    gsap.from(q(".h-line"), {
                        yPercent: 110,
                        duration: 1.1,
                        ease: "power3.out",
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            once: true,
                        },
                    });
                }

                // Mobile and reduced motion keep the simple vertical stack.
                if (!isDesktop || reduce) return;

                section.classList.add("hs-on");

                /* Vertical scroll -> horizontal travel */
                const distance = () =>
                    Math.max(0, track.scrollWidth - window.innerWidth);

                const pan = gsap.to(track, {
                    x: () => -distance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: pin,
                        start: "top top",
                        end: () => "+=" + distance(),
                        pin: true,
                        scrub: 0.6,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (st) => {
                            if (counterRef.current) {
                                counterRef.current.textContent = String(
                                    Math.round(st.progress * 100)
                                ).padStart(2, "0");
                            }
                        },
                    },
                });

                /* Progress bar */
                gsap.fromTo(
                    q(".hs-progress-fill"),
                    { scaleX: 0, transformOrigin: "left" },
                    {
                        scaleX: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: pin,
                            start: "top top",
                            end: () => "+=" + distance(),
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                );

                /* Depth: title and photo drift at different speeds per stage */
                q(".stage").forEach((stage) => {
                    const title = stage.querySelector(".stage-title");
                    const img = stage.querySelector(".stage-img");

                    const trigger = {
                        trigger: stage,
                        containerAnimation: pan,
                        start: "left right",
                        end: "right left",
                        scrub: true,
                    };

                    gsap.fromTo(
                        title,
                        { x: "7vw" },
                        { x: "-7vw", ease: "none", scrollTrigger: trigger }
                    );
                    gsap.fromTo(
                        img,
                        { xPercent: -7, scale: 1.2 },
                        { xPercent: 7, scale: 1.2, ease: "none", scrollTrigger: trigger }
                    );
                });

                return () => {
                    section.classList.remove("hs-on");
                };
            }
        );

        // Re-measure once web fonts have loaded (headings change width).
        let cancelled = false;
        document.fonts?.ready.then(() => {
            if (!cancelled) ScrollTrigger.refresh();
        });

        return () => {
            cancelled = true;
            mm.revert(); // kills tweens + ScrollTriggers, restores inline styles
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            data-theme="light"
            aria-labelledby="process-heading"
            className="relative bg-warm-ivory text-deep-charcoal"
        >
            {/* Pinned viewport (desktop) / normal block (mobile) */}
            <div
                ref={pinRef}
                className="relative [.hs-on_&]:h-screen [.hs-on_&]:overflow-hidden"
            >
                {/* Track: vertical stack by default, horizontal row when pinned.
                    It has its own background so the leaf videos can blend with it. */}
                <div
                    ref={trackRef}
                    className="flex flex-col gap-24 bg-warm-ivory px-6 py-24 sm:px-10 md:gap-32 md:py-32 [.hs-on_&]:h-full [.hs-on_&]:w-max [.hs-on_&]:flex-row [.hs-on_&]:items-center [.hs-on_&]:gap-0 [.hs-on_&]:p-0 will-change-transform"
                >
                    {/* ---------------- Intro panel ---------------- */}
                    <header className="process-header relative flex flex-col items-center gap-6 pb-40 text-center sm:pb-52 [.hs-on_&]:h-full [.hs-on_&]:w-screen [.hs-on_&]:shrink-0 [.hs-on_&]:justify-center [.hs-on_&]:px-[9vw] [.hs-on_&]:pb-0">
                        {/* Leaves hanging from the top-left corner */}
                        <LeafVideo
                            src={LEAF_TOP_LEFT}
                            className="left-0 top-0 w-[80vw] sm:w-[66vw]"
                        />
                        {/* Leaves rising from the bottom, straddling the join between the
                            intro panel and the first stage (centred on the intro's right
                            edge on desktop, bottom-centre when stacked on mobile) */}
                        <LeafVideo
                            src={LEAF_BOTTOM_CENTER}
                            className="bottom-0 left-1/2 z-[5] w-[90vw] -translate-x-1/2 sm:w-[52vw] [.hs-on_&]:left-auto [.hs-on_&]:right-0 [.hs-on_&]:w-[50vw] [.hs-on_&]:translate-x-1/2"
                        />

                        <p className="relative z-10 font-sans text-sm text-champagne-gold">
                            Our design process
                        </p>

                        <h2
                            id="process-heading"
                            className="relative z-10 max-w-[82vw] font-serif text-2xl font-light uppercase leading-[1.05] tracking-tight sm:text-3xl [.hs-on_&]:max-w-[56vw] [.hs-on_&]:text-[2.4vw]"
                        >
                            <span className="block overflow-hidden pb-[0.08em]">
                                <span className="h-line block">
                                    Every residence we design follows one considered journey,
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-[0.08em]">
                                <span className="h-line block">
                                    from the first conversation to the final detail,
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-[0.08em]">
                                <span className="h-line block">
                                    shaped around your privacy, wellbeing and way of living
                                </span>
                            </span>
                        </h2>

                        <p className="relative z-10 max-w-sm font-sans text-sm leading-relaxed text-deep-charcoal/70">
                            Four clear stages take an idea from a first sketch to a finished
                            home. At each one you know what is happening, what has been
                            decided and what comes next, so the result reflects your vision
                            rather than a template.
                        </p>
                    </header>

                    {/* ---------------- Stage panels ---------------- */}
                    {STAGES.map((s) => (
                        <article
                            key={s.no}
                            className="stage flex flex-col gap-8 [.hs-on_&]:h-full [.hs-on_&]:w-max [.hs-on_&]:shrink-0 [.hs-on_&]:flex-row [.hs-on_&]:items-center [.hs-on_&]:gap-0 [.hs-on_&]:px-[5vw]"
                        >
                            {/* Photo */}
                            <div
                                className={`relative aspect-[4/5] overflow-hidden rounded-[4px] bg-sand-beige sm:aspect-[5/4] [.hs-on_&]:aspect-auto [.hs-on_&]:h-[66vh] [.hs-on_&]:w-[30vw] [.hs-on_&]:shrink-0 ${s.lift}`}
                            >
                                <div className="stage-img absolute inset-0 will-change-transform">
                                    <Image
                                        src={s.src}
                                        alt={s.alt}
                                        fill
                                        sizes="(min-width:1024px) 30vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Oversized title, overlapping the photo edge like ERA */}
                            <h3 className="stage-title relative z-10 font-serif text-6xl font-light uppercase leading-none tracking-tight [.hs-on_&]:-ml-[9vw] [.hs-on_&]:text-[14vw] [.hs-on_&]:whitespace-nowrap">
                                {s.title}
                            </h3>

                            {/* Copy */}
                            <div className="[.hs-on_&]:ml-[3vw] [.hs-on_&]:w-[25vw] [.hs-on_&]:shrink-0 [.hs-on_&]:self-end [.hs-on_&]:pb-[10vh]">
                                <p className="font-sans text-sm text-champagne-gold">
                                    {s.no}{" "}
                                    <span className="text-deep-charcoal/40">
                                        / 0{STAGES.length}
                                    </span>
                                </p>
                                <span className="my-5 block h-px w-16 bg-champagne-gold" />
                                <p className="max-w-sm font-sans text-base leading-relaxed text-deep-charcoal/70">
                                    {s.text}
                                </p>
                            </div>
                        </article>
                    ))}

                    {/* ---------------- Closing panel ---------------- */}
                    <div className="relative flex flex-col items-start gap-10 border-t border-champagne-gold/30 pb-44 pt-12 sm:pb-56 [.hs-on_&]:h-full [.hs-on_&]:w-[100vw] [.hs-on_&]:shrink-0 [.hs-on_&]:flex-row [.hs-on_&]:items-center [.hs-on_&]:justify-center [.hs-on_&]:gap-[6vw] [.hs-on_&]:border-0 [.hs-on_&]:pb-0 [.hs-on_&]:pt-0">
                        {/* Leaves rising from the bottom-right corner */}
                        <LeafVideo
                            src={LEAF_BOTTOM_RIGHT}
                            className="bottom-0 right-0 w-[90vw] sm:w-[53vw]"
                        />

                        <p className="relative z-10 max-w-xl font-serif text-4xl font-light uppercase leading-tight tracking-tight sm:text-5xl [.hs-on_&]:text-[4.5vw]">
                            A short conversation is enough to start with step one.
                        </p>
                        <a
                            href="#contact"
                            className="relative z-10 flex h-56 w-56 shrink-0 items-center justify-center rounded-full border border-deep-charcoal/20 p-8 text-center font-sans text-sm font-medium text-deep-charcoal transition-colors duration-300 hover:bg-deep-charcoal hover:text-warm-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold [.hs-on_&]:h-64 [.hs-on_&]:w-64"
                        >
                            Schedule a consultation
                        </a>
                    </div>
                </div>

                {/* Progress (only while pinned) */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-center gap-4 px-[5vw] pb-6 font-sans text-sm text-deep-charcoal [.hs-on_&]:flex"
                >
                    <span ref={counterRef}>00</span>
                    <span className="relative h-px flex-1 bg-champagne-gold/25">
                        <span className="hs-progress-fill absolute inset-0 origin-left bg-champagne-gold" />
                    </span>
                    <span>100</span>
                </div>
            </div>
        </section>
    );
}

/*
 * SIDE SCROLL RAIL (the fixed "53 / line / SCROLL / arrow" indicator):
 * while this section is on screen, <html> has the class `rail-invert`.
 * Add this to the rail's fixed wrapper so it inverts per pixel over the ivory
 * background and stays white over the dark sections:
 *
 *   className="... [html.rail-invert_&]:mix-blend-difference"
 *
 * Its text, line and arrow should be pure white (#fff).
 */