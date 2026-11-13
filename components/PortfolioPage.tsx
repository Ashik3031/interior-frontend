"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hero background image (Unsplash link - replace later with portfolio photography)
const PORTFOLIO_HERO_BG =
  "https://res.cloudinary.com/dugtxybef/image/upload/v1794487057/pexels-s3t-koncepts-1636465088-28853362_gdbmsa.jpg";

const CATEGORIES = [
  "All Works",
  "Private Villas",
  "Penthouses & Duplexes",
  "Turnkey Renovations",
  "Bespoke Commercial",
] as const;

type Category = (typeof CATEGORIES)[number];

// Asymmetric rhythm for the grid (repeats every four projects).
const LAYOUT = [
  { col: "lg:col-span-7", ratio: "aspect-[4/3]", offset: "" },
  { col: "lg:col-span-5", ratio: "aspect-[4/5]", offset: "lg:mt-40" },
  { col: "lg:col-span-5 lg:col-start-2", ratio: "aspect-[4/5]", offset: "" },
  { col: "lg:col-span-6 lg:col-start-7", ratio: "aspect-[4/3]", offset: "lg:mt-28" },
];

const MARQUEE_TEXT = "Villas · Penthouses · Renovations · Commercial · ";

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/*  Cursor bubble: follows the pointer while hovering a project         */
/* ------------------------------------------------------------------ */

function CursorBubble({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only for mouse users.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden [@media(pointer:fine)]:block"
    >
      <div
        className={`flex h-24 w-24 items-center justify-center rounded-full bg-deep-charcoal font-sans text-sm font-medium text-warm-ivory transition-[opacity,transform] duration-300 ${active ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
      >
        View
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project card                                                       */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  index,
  onOpen,
  onHover,
}: {
  project: PortfolioProject;
  index: number;
  onOpen: () => void;
  onHover: (on: boolean) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const layout = LAYOUT[index % LAYOUT.length];

  // Scroll animation: the frame opens like a curtain, the text rises,
  // and the photo drifts slowly inside its frame.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const ctx = gsap.context(() => {
      const frame = el.querySelector(".pc-frame");
      const img = el.querySelector(".pc-img");
      const text = el.querySelectorAll(".pc-text > *");

      gsap.set(img, { scale: 1.15 });

      gsap.fromTo(
        frame,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
      gsap.from(text, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={ref}
      onClick={onOpen}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`group relative cursor-pointer ${layout.col} ${layout.offset}`}
    >
      <div
        className={`pc-frame relative overflow-hidden rounded-[4px] bg-sand-beige ${layout.ratio}`}
      >
        <div className="pc-img absolute inset-0 will-change-transform">
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(min-width:1024px) 55vw, 100vw"
            priority={index < 2}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <div className="pc-text mt-6">
        <div className="flex items-baseline justify-between gap-4 font-sans text-sm text-deep-charcoal/55">
          <span>
            {project.location.split(",")[0]} · {project.year}
          </span>
          <span className="tabular-nums">({pad(index + 1)})</span>
        </div>

        <h3 className="mt-2 font-serif text-3xl font-light leading-tight sm:text-4xl">
          {/* Keyboard and screen-reader entry point. Its click bubbles up to the card. */}
          <button
            type="button"
            className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {project.title}
            </span>
          </button>
        </h3>

        <p className="mt-3 max-w-md line-clamp-2 font-sans text-base leading-relaxed text-deep-charcoal/65">
          {project.excerpt}
        </p>

        <p className="mt-4 flex items-center gap-3 font-sans text-sm text-deep-charcoal/55 transition-colors group-hover:text-deep-charcoal">
          <span className="text-champagne-gold">{project.category}</span>
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">
            &rarr;
          </span>
        </p>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Project modal                                                      */
/* ------------------------------------------------------------------ */

function ProjectModal({
  project,
  index,
  total,
  prev,
  next,
  onClose,
  onPrev,
  onNext,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
  prev: PortfolioProject;
  next: PortfolioProject;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll, focus the dialog, and give focus back when it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  // Start at the top whenever the project changes.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  // Keyboard: Esc closes, arrows move between projects, Tab stays inside.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Tab") {
        const f = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  const stats = [
    { label: "Location", value: project.location.split(",")[0] },
    { label: "Total area", value: project.area },
    { label: "Build time", value: project.duration },
    { label: "Handover", value: String(project.year) },
  ];

  return (
    <div
      onClick={onClose}
      className="modal-overlay fixed inset-0 z-[60] flex items-center justify-center bg-deep-charcoal/70 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
        className="modal-panel relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[4px] bg-warm-ivory text-deep-charcoal shadow-2xl"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-deep-charcoal/10 bg-warm-ivory/90 px-6 py-4 backdrop-blur-md sm:px-10">
          <p className="font-sans text-sm text-deep-charcoal/60">
            <span className="tabular-nums text-deep-charcoal">
              ({pad(index + 1)} / {pad(total)})
            </span>
            <span className="mx-3">/</span>
            {project.category}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-3 font-sans text-sm transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
          >
            Close
            <svg aria-hidden viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Hero image */}
        <div className="relative h-[42vh] w-full overflow-hidden sm:h-[56vh]">
          <Image
            key={project.id}
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="(min-width:1024px) 72rem, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/75 via-deep-charcoal/10 to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-3xl text-white sm:bottom-10 sm:left-10">
            <p className="font-sans text-sm text-white/80">{project.location}</p>
            <h2
              id="project-title"
              className="mt-2 font-serif text-4xl font-light uppercase leading-[1] tracking-tight sm:text-6xl"
            >
              {project.title}
            </h2>
            <p className="mt-3 max-w-xl font-sans text-sm text-white/80 sm:text-base">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-16 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          {/* Stats */}
          <dl className="grid grid-cols-2 border-y border-deep-charcoal/15 sm:grid-cols-4 sm:divide-x sm:divide-deep-charcoal/15">
            {stats.map((s) => (
              <div key={s.label} className="px-0 py-6 sm:px-6 sm:first:pl-0">
                <dt className="font-sans text-sm text-deep-charcoal/50">{s.label}</dt>
                <dd className="mt-2 font-serif text-2xl font-light">{s.value}</dd>
              </div>
            ))}
          </dl>

          {/* Story + lists */}
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="font-serif text-3xl font-light sm:text-4xl">The brief</h3>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-deep-charcoal/75">
                {project.story}
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <div>
                <h4 className="font-sans text-sm text-deep-charcoal/50">Materials</h4>
                <ul className="mt-4 space-y-2 border-t border-deep-charcoal/15 pt-4 font-sans text-sm text-deep-charcoal/80">
                  {project.materials.map((m) => (
                    <li key={m} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-gold" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-sans text-sm text-deep-charcoal/50">What we delivered</h4>
                <ul className="mt-4 space-y-2 border-t border-deep-charcoal/15 pt-4 font-sans text-sm text-deep-charcoal/80">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {project.galleryImages.length > 0 && (
            <div>
              <h3 className="font-serif text-3xl font-light sm:text-4xl">In detail</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {project.galleryImages.map((img, i) => (
                  <div
                    key={img + i}
                    className="group relative aspect-[4/3] overflow-hidden rounded-[4px] bg-sand-beige"
                  >
                    <Image
                      src={img}
                      alt={`${project.title}, detail ${i + 1}`}
                      fill
                      sizes="(min-width:640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous / next + CTA */}
          <div className="border-t border-deep-charcoal/15 pt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <button
                type="button"
                onClick={onPrev}
                className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
              >
                <span className="font-sans text-sm text-deep-charcoal/50">
                  <span aria-hidden className="mr-2 inline-block transition-transform duration-500 group-hover:-translate-x-1.5">
                    &larr;
                  </span>
                  Previous
                </span>
                <span className="mt-1 block font-serif text-2xl font-light transition-colors group-hover:text-champagne-gold">
                  {prev.title}
                </span>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="group text-left sm:text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
              >
                <span className="font-sans text-sm text-deep-charcoal/50">
                  Next
                  <span aria-hidden className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                    &rarr;
                  </span>
                </span>
                <span className="mt-1 block font-serif text-2xl font-light transition-colors group-hover:text-champagne-gold">
                  {next.title}
                </span>
              </button>
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="font-sans text-sm text-deep-charcoal/60">
                Planning a home with similar standards?
              </p>
              <Link
                href="/consultation"
                onClick={onClose}
                className="inline-flex items-center gap-3 rounded-full bg-deep-charcoal px-8 py-4 font-sans text-sm font-medium text-warm-ivory transition-colors duration-300 hover:bg-champagne-gold hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
              >
                Start a similar project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PortfolioPage() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstCategoryRender = useRef(true);

  const [selectedCategory, setSelectedCategory] = useState<Category>("All Works");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [shownCount, setShownCount] = useState(PORTFOLIO_PROJECTS.length);

  const filteredProjects =
    selectedCategory === "All Works"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const countFor = (cat: Category) =>
    cat === "All Works"
      ? PORTFOLIO_PROJECTS.length
      : PORTFOLIO_PROJECTS.filter((p) => p.category === cat).length;

  const activeProject =
    activeIndex !== null ? filteredProjects[activeIndex] ?? null : null;

  /* ----- Page-level scroll animation ----- */
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReduced()) return;

    const ctx = gsap.context(() => {
      // Hero headline rises once on load
      gsap.from(".pf-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });
      gsap.from(".pf-fade", {
        opacity: 0,
        y: 16,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.5,
      });

      // Photo strip slides sideways as you scroll
      gsap.fromTo(
        ".pf-strip",
        { x: "10vw" },
        {
          x: "-28vw",
          ease: "none",
          scrollTrigger: {
            trigger: ".pf-strip-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Giant words slide sideways between the work and the call to action
      gsap.fromTo(
        ".pf-marquee",
        { xPercent: 0 },
        {
          xPercent: -33,
          ease: "none",
          scrollTrigger: {
            trigger: ".pf-marquee-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  /* ----- Count in the headline eases to the new number ----- */
  useEffect(() => {
    const target = filteredProjects.length;
    if (prefersReduced()) {
      setShownCount(target);
      return;
    }
    const obj = { v: shownCount };
    const tween = gsap.to(obj, {
      v: target,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => setShownCount(Math.round(obj.v)),
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects.length]);

  /* ----- Sliding underline under the active filter ----- */
  useIsoLayoutEffect(() => {
    const measure = () => {
      const idx = CATEGORIES.indexOf(selectedCategory);
      const el = tabRefs.current[idx];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedCategory]);

  /* ----- After a filter change: refresh triggers and bring the grid into view ----- */
  useEffect(() => {
    if (firstCategoryRender.current) {
      firstCategoryRender.current = false;
      return;
    }
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const top = gridRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) {
        window.scrollTo({
          top: window.scrollY + top - 160,
          behavior: prefersReduced() ? "auto" : "smooth",
        });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [selectedCategory]);

  /* ----- Modal navigation ----- */
  const close = useCallback(() => {
    setActiveIndex(null);
    setHovering(false);
  }, []);
  const goPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + filteredProjects.length) % filteredProjects.length
    );
  }, [filteredProjects.length]);
  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % filteredProjects.length));
  }, [filteredProjects.length]);

  const heroPhotos = PORTFOLIO_PROJECTS.slice(0, 6);
  const stripHeights = ["h-[34vh]", "h-[26vh]", "h-[38vh]", "h-[30vh]", "h-[36vh]", "h-[28vh]"];
  const stripWidths = ["w-[22vw]", "w-[18vw]", "w-[26vw]", "w-[20vw]", "w-[24vw]", "w-[18vw]"];

  return (
    <main
      ref={rootRef}
      className="bg-warm-ivory text-deep-charcoal selection:bg-champagne-gold selection:text-deep-charcoal"
    >
      <style>{`
        @keyframes overlayIn { from { opacity: 0; } }
        @keyframes panelIn { from { opacity: 0; transform: translateY(24px) scale(.985); } }
        @media (prefers-reduced-motion: no-preference) {
          .modal-overlay { animation: overlayIn .3s ease both; }
          .modal-panel { animation: panelIn .5s cubic-bezier(.22,1,.36,1) both; }
        }
      `}</style>

      <CursorBubble active={hovering && !activeProject} />

      {/* ============ 1. Hero ============ */}
      <section
        data-theme="dark"
        aria-labelledby="portfolio-heading"
        className="relative isolate overflow-hidden px-6 pb-12 pt-36 sm:px-10 lg:px-16 lg:pb-16 lg:pt-44 text-warm-ivory"
      >
        {/* Background Hero Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src={PORTFOLIO_HERO_BG}
            alt="RichMan Interiors Architectural Portfolio Dubai"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark Luxury Overlay matching Home Page Hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#171816]/75 via-[#171816]/55 to-[#171816]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,24,22,0.35)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1600px]">
          <p className="pf-fade flex items-center gap-2.5 font-sans text-sm text-warm-ivory/80">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            Portfolio
          </p>

          <h1
            id="portfolio-heading"
            className="mt-8 font-serif text-[clamp(56px,11vw,190px)] font-light uppercase leading-[0.92] tracking-tight text-warm-ivory"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="pf-line block">Selected</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] lg:ml-[8vw]">
              <span className="pf-line block">
                work
                <sup className="ml-3 align-super font-sans text-[.16em] font-normal tracking-normal tabular-nums text-champagne-gold">
                  ({pad(shownCount)})
                </sup>
              </span>
            </span>
          </h1>

          <p className="pf-fade mt-10 max-w-lg font-sans text-base leading-relaxed text-warm-ivory/85 lg:mt-14 lg:text-lg">
            Villas, penthouses and renovations designed and delivered across Dubai
            and Abu Dhabi, from the first sketch to the final styling.
          </p>
        </div>

        {/* Photo strip: decorative, slides sideways on scroll */}
        {heroPhotos.length > 0 && (
          <div className="pf-strip-wrap -mx-6 mt-16 overflow-hidden sm:-mx-10 lg:-mx-16 lg:mt-24" aria-hidden>
            <div className="pf-strip flex w-max items-end gap-4 px-6 will-change-transform sm:px-10 lg:px-16">
              {heroPhotos.map((p, i) => (
                <div
                  key={p.id}
                  className={`relative shrink-0 overflow-hidden rounded-[4px] bg-sand-beige ${stripHeights[i % stripHeights.length]} ${stripWidths[i % stripWidths.length]} min-w-[40vw] sm:min-w-0`}
                >
                  <Image
                    src={p.coverImage}
                    alt=""
                    fill
                    sizes="26vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ============ 2. Filters (static: scrolls away with the page) ============ */}
      <div className="border-y border-deep-charcoal/10 bg-warm-ivory">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
          <div className="scrollbar-none -mx-1 overflow-x-auto">
            <div className="relative flex w-max gap-8 px-1 sm:gap-12">
              {CATEGORIES.map((cat, i) => {
                const selected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap py-5 font-sans text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-champagne-gold ${selected
                      ? "text-deep-charcoal"
                      : "text-deep-charcoal/50 hover:text-deep-charcoal"
                      }`}
                  >
                    {cat}
                    <span className="ml-1.5 tabular-nums text-deep-charcoal/40">
                      ({pad(countFor(cat))})
                    </span>
                  </button>
                );
              })}
              <span
                aria-hidden
                className="absolute bottom-0 h-0.5 bg-champagne-gold transition-[left,width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
                style={{ left: indicator.left, width: indicator.width }}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {filteredProjects.length} projects in {selectedCategory}
      </p>

      {/* ============ 3. Projects ============ */}
      <section
        data-theme="light"
        aria-label="Projects"
        className="px-6 py-20 sm:px-10 lg:px-16 lg:py-32"
      >
        <div ref={gridRef} className="mx-auto max-w-[1600px]">
          {filteredProjects.length === 0 ? (
            <p className="py-24 text-center font-serif text-3xl font-light text-deep-charcoal/60">
              No projects in this category yet.
            </p>
          ) : (
            <div
              key={selectedCategory}
              className="grid gap-x-8 gap-y-20 lg:grid-cols-12 lg:gap-y-28"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpen={() => setActiveIndex(i)}
                  onHover={setHovering}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ 4. Giant sliding words ============ */}
      <section
        data-theme="light"
        aria-hidden
        className="pf-marquee-wrap overflow-hidden bg-white py-16 lg:py-28"
      >
        <div className="pf-marquee flex w-max whitespace-nowrap font-serif text-[16vw] font-light uppercase leading-none tracking-tight text-deep-charcoal will-change-transform">
          <span>{MARQUEE_TEXT}</span>
          <span>{MARQUEE_TEXT}</span>
          <span>{MARQUEE_TEXT}</span>
        </div>
      </section>

      {/* ============ 5. Call to action (dark) ============ */}
      <section
        data-theme="dark"
        aria-labelledby="portfolio-cta"
        className="bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1600px]">
          <h2
            id="portfolio-cta"
            className="max-w-5xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Have a project in mind?
          </h2>
          <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-warm-ivory/65">
            We take on a limited number of private residences at a time, so each
            one gets our full attention.
          </p>

          <ul className="mt-16 border-t border-warm-ivory/15 lg:mt-24">
            {[
              { label: "Book a consultation", href: "/consultation" },
              { label: "Contact the studio", href: "/contact" },
            ].map((l) => (
              <li key={l.href} className="border-b border-warm-ivory/15">
                <Link
                  href={l.href}
                  className="group flex items-center justify-between gap-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold lg:py-12"
                >
                  <span className="font-serif text-3xl font-light uppercase tracking-tight transition-colors duration-500 group-hover:text-champagne-gold sm:text-5xl lg:text-[5vw]">
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

      {/* ============ Project modal ============ */}
      {activeProject && activeIndex !== null && (
        <ProjectModal
          project={activeProject}
          index={activeIndex}
          total={filteredProjects.length}
          prev={
            filteredProjects[
            (activeIndex - 1 + filteredProjects.length) % filteredProjects.length
            ]
          }
          next={filteredProjects[(activeIndex + 1) % filteredProjects.length]}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </main>
  );
}