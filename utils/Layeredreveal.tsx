"use client";

import {
    useEffect,
    useLayoutEffect,
    useRef,
    type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
    /** The section that stays visible behind the incoming panel (e.g. <About />). */
    behind: ReactNode;
    /** The panel that slides up over it (e.g. <DesignProcess />). */
    children: ReactNode;
};

/**
 * Layered ("curtain") transition using CSS sticky, no pinning.
 *
 * - `behind` is `position: sticky`. Its `top` is set to
 *   min(0, viewportHeight - behindHeight), so once its bottom edge reaches the
 *   bottom of the viewport it stays put while the next panel scrolls over it.
 * - The panel is the next sibling in normal flow, so it starts directly below
 *   `behind` (no gap) and rises over it as the page scrolls. Nothing is
 *   removed from flow, so there are no layout shifts.
 * - When this wrapper ends, sticky releases on its own: the panel has fully
 *   covered `behind` by then, so the hand-off to the next section is seamless.
 *
 * IMPORTANT: no ancestor of this component may use `overflow: hidden|auto|scroll`
 * (it breaks sticky). If you need to clip horizontal overflow on <body>/<main>,
 * use `overflow-x: clip` instead.
 */
export default function LayeredReveal({ behind, children }: Props) {
    const behindRef = useRef<HTMLDivElement>(null);
    const dimRef = useRef<HTMLDivElement>(null);
    const panelWrapRef = useRef<HTMLDivElement>(null);

    // Keep the sticky offset in sync with the real heights (no hardcoded values).
    useIsoLayoutEffect(() => {
        const el = behindRef.current;
        if (!el) return;

        const update = () => {
            const h = el.getBoundingClientRect().height;
            el.style.top = `${Math.min(0, window.innerHeight - h)}px`;
        };

        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        window.addEventListener("resize", update);
        window.addEventListener("orientationchange", update);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
            window.removeEventListener("orientationchange", update);
        };
    }, []);

    // Gently darken the section behind as the panel covers it.
    useIsoLayoutEffect(() => {
        const dim = dimRef.current;
        const trigger = panelWrapRef.current;
        if (!dim || !trigger) return;

        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                dim,
                { opacity: 0 },
                {
                    opacity: 0.55,
                    ease: "none",
                    scrollTrigger: {
                        trigger,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    },
                }
            );
        });

        return () => mm.revert();
    }, []);

    return (
        <div className="relative">
            {/* Section that stays behind */}
            <div ref={behindRef} className="sticky z-0">
                {behind}
                <div
                    ref={dimRef}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-deep-charcoal opacity-0"
                />
            </div>

            {/* Panel that covers it */}
            <div ref={panelWrapRef} className="relative z-10">
                {children}
            </div>
        </div>
    );
}