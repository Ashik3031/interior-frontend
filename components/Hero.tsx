"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigation } from "@/context/NavigationContext";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TOTAL_FRAMES = 94;

const getFramePath = (index: number) => {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `/Coastal_living_frames/frame-${frameNumber}.webp`;
};

/* ------------------------------------------------------------------ */
/*  Copy shown while you scroll through the frames                     */
/*  TODO: match the wording to what each part of the film shows.       */
/*  `from` / `to` are scroll progress (0 to 1) for when each appears.  */
/* ------------------------------------------------------------------ */

const EYEBROW = "RichMan Interiors · Dubai, UAE";
const DESCRIPTION =
  "Thoughtfully designed interiors. Timeless materials. Exceptional spaces tailored to you.";

const CHAPTERS = [
  {
    no: "01",
    title: "Light",
    text: "Every room begins with how the daylight moves through it.",
    from: 0.14,
    to: 0.38,
  },
  {
    no: "02",
    title: "Materials",
    text: "Stone, timber and metal, chosen to be touched.",
    from: 0.4,
    to: 0.64,
  },
  {
    no: "03",
    title: "Detail",
    text: "Joinery and finishes built to the last millimetre.",
    from: 0.66,
    to: 0.86,
  },
];

const FINAL_FROM = 0.9;

// 0 -> 1 over the first part of the window, held, then 1 -> 0 over the last part.
const windowFade = (p: number, a: number, b: number) => {
  if (p <= a || p >= b) return 0;
  const t = (p - a) / (b - a);
  const edge = 0.22;
  if (t < edge) return t / edge;
  if (t > 1 - edge) return (1 - t) / edge;
  return 1;
};

const textShadow = "[text-shadow:0_2px_28px_rgba(0,0,0,0.4)]";

export default function Hero() {
  const { introStage } = useNavigation();

  // DOM Refs
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Animation & Rendering state refs
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedFramesRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // Component UI State
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState<boolean>(false);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);

  // Helper to find the best available loaded frame (nearest neighbor)
  const getBestAvailableFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    const loaded = loadedFramesRef.current;

    if (loaded[targetIndex] && images[targetIndex]) {
      return images[targetIndex];
    }

    // Fast outward search for the closest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = targetIndex - offset;
      if (left >= 0 && loaded[left] && images[left]) {
        return images[left];
      }
      const right = targetIndex + offset;
      if (right < TOTAL_FRAMES && loaded[right] && images[right]) {
        return images[right];
      }
    }

    return null;
  }, []);

  // Cover-style aspect-ratio canvas drawing function with high-quality smoothing
  const drawCover = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvasWidth: number,
      canvasHeight: number
    ) => {
      if (!img.complete || img.naturalWidth === 0) return;

      const iWidth = img.naturalWidth || img.width;
      const iHeight = img.naturalHeight || img.height;

      if (!iWidth || !iHeight || !canvasWidth || !canvasHeight) return;

      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = iWidth / iHeight;

      let sWidth = iWidth;
      let sHeight = iHeight;
      let sx = 0;
      let sy = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (crop top and bottom)
        sHeight = iWidth / canvasRatio;
        sy = (iHeight - sHeight) / 2;
      } else {
        // Canvas is taller than image (crop left and right)
        sWidth = iHeight * canvasRatio;
        sx = (iWidth - sWidth) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    },
    []
  );

  // Core render loop using requestAnimationFrame
  const renderCurrentFrame = useCallback(() => {
    animationFrameIdRef.current = null;
    const targetIndex = targetFrameRef.current;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = getBestAvailableFrame(targetIndex);
    if (!img) return;

    drawCover(ctx, img, canvas.width, canvas.height);
    lastDrawnFrameRef.current = targetIndex;
  }, [drawCover, getBestAvailableFrame]);

  const requestRender = useCallback(() => {
    if (animationFrameIdRef.current === null) {
      animationFrameIdRef.current = requestAnimationFrame(renderCurrentFrame);
    }
  }, [renderCurrentFrame]);

  // Handle canvas resize with full DPR (minimum 2x for sharp Retina/4K rendering)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = pinRef.current;
    if (!canvas || !container) return;

    const dpr = typeof window !== "undefined" ? Math.max(window.devicePixelRatio || 1, 2) : 2;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      lastDrawnFrameRef.current = -1;
      requestRender();
    }
  }, [requestRender]);

  // 1. Initial Frame Priority Preload + Progressive Loading Queue
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Load Frame 0 immediately with top priority
    const firstImg = new window.Image();
    firstImg.src = getFramePath(0);

    const onFirstFrameLoaded = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      loadedFramesRef.current[0] = true;
      loadedCount++;
      setIsFirstFrameLoaded(true);
      setLoadPercentage(Math.round((loadedCount / TOTAL_FRAMES) * 100));

      resizeCanvas();
      requestRender();
      ScrollTrigger.refresh();
    };

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      onFirstFrameLoaded();
    } else {
      firstImg.onload = onFirstFrameLoaded;
      firstImg.onerror = () => {
        if (!isCancelled) {
          setIsFirstFrameLoaded(true);
        }
      };
    }

    // Progressive queue for remaining frames:
    // Milestone anchor frames spaced across the frames for instant scrub responsiveness
    const priorityIndices: number[] = [];
    const step = 10;
    for (let i = step; i < TOTAL_FRAMES; i += step) {
      priorityIndices.push(i);
    }
    if (!priorityIndices.includes(TOTAL_FRAMES - 1)) {
      priorityIndices.push(TOTAL_FRAMES - 1);
    }

    const prioritySet = new Set(priorityIndices);
    const remainingIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(
      (i) => i !== 0 && !prioritySet.has(i)
    );
    const loadQueue = [...priorityIndices, ...remainingIndices];

    const CONCURRENCY = 6;
    let activeWorkers = 0;

    const pumpQueue = () => {
      if (isCancelled) return;

      while (activeWorkers < CONCURRENCY && loadQueue.length > 0) {
        const nextIdx = loadQueue.shift()!;
        activeWorkers++;

        const img = new window.Image();
        img.src = getFramePath(nextIdx);

        img.onload = () => {
          activeWorkers--;
          if (!isCancelled) {
            imagesRef.current[nextIdx] = img;
            loadedFramesRef.current[nextIdx] = true;
            loadedCount++;
            setLoadPercentage(Math.round((loadedCount / TOTAL_FRAMES) * 100));

            if (targetFrameRef.current === nextIdx) {
              requestRender();
            }

            pumpQueue();
          }
        };

        img.onerror = () => {
          activeWorkers--;
          if (!isCancelled) {
            pumpQueue();
          }
        };
      }
    };

    pumpQueue();

    return () => {
      isCancelled = true;
      firstImg.onload = null;
      firstImg.onerror = null;
    };
  }, [resizeCanvas, requestRender]);

  // 2. Window Resize Handling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    window.visualViewport?.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [resizeCanvas]);

  // 3. GSAP ScrollTrigger Integration with Scrub and Sticky Pinning
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as {
          reduceMotion: boolean;
        };

        if (reduceMotion) {
          // Static fallback: show the final frame and the closing message, no scroll scrub
          targetFrameRef.current = TOTAL_FRAMES - 1;
          requestRender();
          gsap.set(container, { height: "100dvh" });
          if (finalRef.current) {
            finalRef.current.style.opacity = "1";
            finalRef.current.style.pointerEvents = "auto";
          }
          return;
        }

        const st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // 1. Calculate target frame index
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
            );

            targetFrameRef.current = frameIndex;
            requestRender();

            // 2. Smoothly fade out intro hero text as transformation begins
            if (introTextRef.current) {
              const textProgress = Math.min(1, Math.max(0, (progress - 0.02) / 0.16));
              const opacity = Math.max(0, 1 - textProgress);
              const translateY = -textProgress * 32;
              introTextRef.current.style.opacity = String(opacity);
              introTextRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
              introTextRef.current.style.pointerEvents = opacity < 0.15 ? "none" : "auto";
            }

            // 3. Fade out scroll prompt indicator
            if (scrollIndicatorRef.current) {
              const indProgress = Math.min(1, Math.max(0, progress / 0.06));
              scrollIndicatorRef.current.style.opacity = String(Math.max(0, 1 - indProgress));
            }

            // 4. Chapter captions appear and leave as the film plays
            chapterRefs.current.forEach((el, i) => {
              if (!el) return;
              const c = CHAPTERS[i];
              const v = windowFade(progress, c.from, c.to);
              el.style.opacity = String(v);
              el.style.transform = `translate3d(0, ${(1 - v) * 24}px, 0)`;
            });

            // 5. Closing message and call to action at the end
            if (finalRef.current) {
              const v = Math.min(1, Math.max(0, (progress - FINAL_FROM) / 0.07));
              finalRef.current.style.opacity = String(v);
              finalRef.current.style.transform = `translate3d(0, ${(1 - v) * 24}px, 0)`;
              finalRef.current.style.pointerEvents = v > 0.5 ? "auto" : "none";
            }

            // 6. Thin progress line along the bottom
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${progress})`;
            }
          },
        });

        return () => {
          st.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, [requestRender]);

  // 4. Refresh ScrollTrigger when intro loading finishes
  useEffect(() => {
    if (introStage === "complete") {
      const timer = setTimeout(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [introStage, resizeCanvas]);

  // 5. Intro text: hidden until the site intro is done, then the headline rises in.
  useIsoLayoutEffect(() => {
    const el = introTextRef.current;
    if (!el) return;
    gsap.set(el.querySelectorAll(".hr-word"), { yPercent: 110 });
    gsap.set(el.querySelectorAll(".hr-fade"), { opacity: 0, y: 16 });
  }, []);

  useEffect(() => {
    const el = introTextRef.current;
    if (!el) return;

    const play = () => {
      const quick = prefersReduced();
      gsap.to(el.querySelectorAll(".hr-word"), {
        yPercent: 0,
        duration: quick ? 0 : 1.3,
        ease: "power3.out",
        stagger: quick ? 0 : 0.12,
      });
      gsap.to(el.querySelectorAll(".hr-fade"), {
        opacity: 1,
        y: 0,
        duration: quick ? 0 : 1,
        ease: "power2.out",
        stagger: quick ? 0 : 0.12,
        delay: quick ? 0 : 0.5,
      });
    };

    if (introStage === "complete") {
      play();
      return;
    }
    // Safety net: never leave the headline hidden if the intro never reports "complete"
    const t = setTimeout(play, 6000);
    return () => clearTimeout(t);
  }, [introStage]);

  return (
    <section
      ref={containerRef}
      id="home"
      data-theme="dark"
      aria-label="Coastal Luxury Living Room Experience"
      className="relative h-[280dvh] w-full bg-[#121312] sm:h-[300vh] lg:h-[320vh]"
    >
      {/* STICKY VIEWPORT CONTAINER: Stays pinned while scrolling through the sequence */}
      <div
        ref={pinRef}
        className="sticky top-0 flex h-screen h-[100dvh] min-h-[100dvh] w-full select-none flex-col justify-between overflow-hidden bg-[#121312]"
      >
        {/* Instant Fallback Poster */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Coastal_living_frames/frame-0001.webp"
          alt="Coastal Luxury Living Room by RichMan Interiors"
          className={`pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${isFirstFrameLoaded ? "opacity-0" : "opacity-100"
            }`}
          loading="eager"
        />

        {/* MAIN RENDERING CANVAS - crisp, un-darkened frames */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
          style={{ imageRendering: "auto" }}
        />

        {/* Very light, thin black overlay to subtly enhance text contrast without dimming the scene */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-black/15"
        />

        {/* 1. INTRO: eyebrow, headline, line (fades out as the film starts) */}
        <div
          ref={introTextRef}
          className="relative z-20 mx-auto my-auto flex w-full max-w-5xl select-none flex-col items-center justify-center px-6 text-center transition-transform duration-75 ease-out"
        >
          {/* <p
            className={`hr-fade flex items-center gap-2.5 font-sans text-sm text-warm-ivory/90 ${textShadow}`}
          >
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            {EYEBROW}
          </p> */}

          <h1
            className={`mt-6 font-serif font-light uppercase text-warm-ivory ${textShadow}`}
          >
            <span className="hr-fade block text-[clamp(1rem,2.2vw,1.75rem)] tracking-[0.2em]">
              Elevate your
            </span>
            <span className="mt-2 block overflow-hidden pb-[0.1em]">
              <span className="hr-word block text-[clamp(4.2rem,12.5vw,10.5rem)] leading-[0.92] tracking-[-0.025em]">
                Living.
              </span>
            </span>
          </h1>

          <p
            className={`hr-fade mt-6 max-w-md font-sans text-base leading-relaxed text-warm-ivory/90 sm:mt-8 sm:text-lg ${textShadow}`}
          >
            {DESCRIPTION}
          </p>
        </div>

        {/* 2. CHAPTERS: short captions that follow the film (bottom left) */}
        <div className="pointer-events-none absolute bottom-24 left-6 z-20 h-40 w-[min(26rem,80vw)] sm:bottom-28 sm:left-10 lg:left-16">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.no}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className={`absolute bottom-0 left-0 text-warm-ivory opacity-0 ${textShadow}`}
            >
              <p className="font-sans text-sm tabular-nums text-champagne-gold">({c.no})</p>
              <p className="mt-2 font-serif text-[clamp(2rem,5vw,4.5rem)] font-light uppercase leading-none tracking-tight">
                {c.title}
              </p>
              <p className="mt-3 max-w-xs font-sans text-base leading-relaxed text-warm-ivory/90">
                {c.text}
              </p>
            </div>
          ))}
        </div>

        {/* 3. CLOSING MESSAGE: appears at the end of the film */}
        <div
          ref={finalRef}
          className={`pointer-events-none absolute inset-x-0 bottom-[12vh] z-20 px-6 text-center text-warm-ivory opacity-0 ${textShadow}`}
        >
          <p className="font-serif text-[clamp(2.25rem,6vw,6.5rem)] font-light uppercase leading-[0.98] tracking-tight">
            Designed around you.
          </p>
          <div className="mt-8 flex items-center justify-center [text-shadow:none] pointer-events-auto">
            <Link
              href="/consultation"
              className="group inline-flex items-center gap-3 rounded-full bg-[#BE9B59] px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider text-deep-charcoal transition-all duration-300 hover:bg-[#d3b06e] shadow-lg shadow-[#BE9B59]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
            >
              Book a consultation
              <svg
                aria-hidden
                viewBox="0 0 60 20"
                className="h-3 w-6 transition-transform duration-500 group-hover:translate-x-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M0 10h56M47 1l9 9-9 9" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 4. SCROLL PROMPT */}
        <div
          ref={scrollIndicatorRef}
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 select-none flex-col items-center gap-2 text-warm-ivory/85 transition-opacity duration-300 sm:bottom-8"
        >
          <span className="font-sans text-sm">Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-warm-ivory/30">
            <span className="hero-cue absolute inset-x-0 top-0 h-1/2 bg-warm-ivory" />
          </span>
        </div>

        {/* Thin line along the bottom: download progress first, then scroll progress */}
        {loadPercentage < 100 ? (
          <div
            className="absolute bottom-0 left-0 z-30 h-[2px] bg-champagne-gold/40 transition-all duration-300"
            style={{ width: `${loadPercentage}%` }}
            aria-hidden="true"
          />
        ) : (
          <div
            ref={progressRef}
            className="absolute inset-x-0 bottom-0 z-30 h-[2px] origin-left scale-x-0 bg-champagne-gold"
            aria-hidden="true"
          />
        )}
      </div>

      <style>{`
        @keyframes heroCue { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @media (prefers-reduced-motion: no-preference) {
          .hero-cue { animation: heroCue 1.8s cubic-bezier(.65,0,.35,1) infinite; }
        }
      `}</style>
    </section>
  );
}