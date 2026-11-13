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
import { ServiceData, SERVICES } from "@/data/servicesData";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/*  Content that is not in the data file                               */
/*  Dummy copy. TODO: replace with real details before publishing.     */
/* ------------------------------------------------------------------ */

// Fallback hero background image (Unsplash link - replace later with service photography)
const SERVICE_HERO_FALLBACK_BG =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85";

const FEATURES = [
  "Single-contract turnkey",
  "In-house joinery workshop",
  "Dubai approvals handled for you",
];

const PROTOCOL = [
  "Drawings supplied in Revit and AutoCAD formats",
  "Developer and authority approvals coordinated",
  "Site checked by 3D laser scan before the build",
];

// Shown beside each material; matched by position, repeats if there are more materials.
const MATERIAL_SPECS = [
  {
    finish: "Honed to 800 grit, silk-velvet touch",
    rating: "Sound-damping rating 0.42",
    use: "Living rooms and master bath feature slabs",
    care: "Sealed in-house with a fluoropolymer seal",
  },
  {
    finish: "Deep-wire brushed, fumed matte",
    rating: "Class A acoustic wall slats",
    use: "Private libraries and walk-in dressing rooms",
    care: "Zero-VOC natural hardwax oil, hand rubbed",
  },
  {
    finish: "Hand-scratched satin champagne patina",
    rating: "Mechanical anti-rattle gaskets",
    use: "Pivot-door trim, reveals and pocket pulls",
    care: "Baked clear nano protective topcoat",
  },
];

const SWATCHES = [
  "linear-gradient(135deg,#f4f1ea 0%,#e2ddd2 45%,#c9b99a 100%)",
  "linear-gradient(135deg,#b08f66 0%,#7a5a3a 100%)",
  "linear-gradient(135deg,#e8d9a8 0%,#b99a55 55%,#8a6d33 100%)",
];

// Matched by position to service.processSteps.
const PHASES = [
  {
    duration: "Weeks 1–3",
    milestone: "Laser 3D survey and preliminary filing with Dubai authorities",
    approvals: "Initial Emaar, Nakheel and Civil Defence clearance checks",
  },
  {
    duration: "Weeks 4–7",
    milestone: "Virtual reality walkthrough and final material board",
    approvals: "Your sign-off on stone cuts, timber veneers and MEP schemes",
  },
  {
    duration: "Weeks 8–18",
    milestone: "Factory dry-fit, then precise assembly on site",
    approvals: "Interim Civil Defence site safety inspection",
  },
  {
    duration: "Weeks 19–22",
    milestone: "Styling, acoustic tuning and key handover",
    approvals: "Building Completion Certificate and 10-year workshop warranty",
  },
];

const GALLERY_LAYOUT = [
  { col: "lg:col-span-7", ratio: "aspect-[4/3]", offset: "" },
  { col: "lg:col-span-5", ratio: "aspect-[4/5]", offset: "lg:mt-32" },
  { col: "lg:col-span-5 lg:col-start-2", ratio: "aspect-[4/5]", offset: "" },
  { col: "lg:col-span-6 lg:col-start-7", ratio: "aspect-[4/3]", offset: "lg:mt-24" },
];

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
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

function Arrow({ className = "h-3 w-6" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M0 10h56M47 1l9 9-9 9" />
    </svg>
  );
}

function CursorBubble({ active, label }: { active: boolean; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer()) return;
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
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery card                                                       */
/* ------------------------------------------------------------------ */

function GalleryCard({
  image,
  index,
  onOpen,
  onHover,
}: {
  image: ServiceData["gallery"][number];
  index: number;
  onOpen: () => void;
  onHover: (on: boolean) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const layout = GALLERY_LAYOUT[index % GALLERY_LAYOUT.length];

  // Curtain reveal, rising caption and a slow drift of the photo inside its frame.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const ctx = gsap.context(() => {
      const frame = el.querySelector(".gc-frame");
      const img = el.querySelector(".gc-img");
      const text = el.querySelectorAll(".gc-text > *");

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
        y: 20,
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
    <figure
      ref={ref}
      onClick={onOpen}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`group cursor-pointer ${layout.col} ${layout.offset}`}
    >
      <div
        className={`gc-frame relative overflow-hidden rounded-[4px] bg-sand-beige ${layout.ratio}`}
      >
        <div className="gc-img absolute inset-0 will-change-transform">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width:1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <figcaption className="gc-text mt-5 flex items-start justify-between gap-6">
        <span className="max-w-md font-sans text-base leading-relaxed text-deep-charcoal/70">
          {/* Keyboard entry point; its click bubbles up to the figure. */}
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open photo ${index + 1}: ${image.caption}`}
            className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold cursor-pointer"
          >
            {image.caption}
          </button>
        </span>
        <span className="shrink-0 font-sans text-sm tabular-nums text-deep-charcoal/45">
          ({pad(index + 1)})
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: ServiceData["gallery"];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Tab") {
        const f = panelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])"
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

  if (!image) return null;

  return (
    <div
      onClick={onClose}
      className="modal-overlay fixed inset-0 z-[60] flex items-center justify-center bg-deep-charcoal/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl text-warm-ivory"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-sans text-sm tabular-nums text-warm-ivory/60">
            ({pad(index + 1)} / {pad(images.length)})
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

        <div key={index} className="lb-in relative h-[62vh] w-full sm:h-[70vh]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width:1280px) 72rem, 100vw"
            className="object-contain"
          />
        </div>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-sans text-base text-warm-ivory/80">{image.caption}</p>
          <div className="flex items-center gap-8 font-sans text-sm">
            <button
              type="button"
              onClick={onPrev}
              className="group inline-flex items-center gap-2 transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
            >
              <span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1.5">
                &larr;
              </span>
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="group inline-flex items-center gap-2 transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
            >
              Next
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </button>
            <Link
              href="/portfolio"
              onClick={onClose}
              className="border-b border-champagne-gold pb-0.5 transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
            >
              See the portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface Props {
  service: ServiceData;
}

export default function ServiceDetailPage({ service }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const delRefs = useRef<(HTMLLIElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentIndex = SERVICES.findIndex((s) => s.slug === service.slug);
  const nextService = SERVICES[(currentIndex + 1) % SERVICES.length] || SERVICES[0];

  const [activeDel, setActiveDel] = useState(0);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [showFloating, setShowFloating] = useState(false);

  const words = service.title.split(" ");
  const material = service.materials[activeMaterial];
  const spec = MATERIAL_SPECS[activeMaterial % MATERIAL_SPECS.length];
  const swatch = SWATCHES[activeMaterial % SWATCHES.length];
  const step = service.processSteps[activeStep];
  const phase =
    step && (step.timing || step.milestone || step.approvals)
      ? {
        duration: step.timing || PHASES[activeStep % PHASES.length]?.duration,
        milestone: step.milestone || PHASES[activeStep % PHASES.length]?.milestone,
        approvals: step.approvals || PHASES[activeStep % PHASES.length]?.approvals,
      }
      : PHASES[activeStep % PHASES.length];

  // Start fresh when moving between services.
  useEffect(() => {
    setActiveDel(0);
    setActiveMaterial(0);
    setActiveStep(0);
    setLightboxIdx(null);
  }, [service.slug]);

  /* ----- Show the floating action pill once the hero has scrolled away ----- */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setShowFloating(!entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, [service.slug]);

  /* ----- On desktop, the deliverable crossing the middle of the screen becomes active ----- */
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const els = delRefs.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveDel(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [service.slug]);

  /* ----- Force scroll to top on mount / slug navigation ----- */
  useIsoLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      ScrollTrigger.clearScrollMemory();
    }
  }, [service.slug]);

  /* ----- Page-level scroll animation ----- */
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      ScrollTrigger.clearScrollMemory();
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero: title words rise, the rest fades in
        gsap.from(".dt-word", {
          yPercent: 110,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.1,
        });
        gsap.from(".dt-fade", {
          opacity: 0,
          y: 16,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.5,
        });

        // Reading progress along the top edge
        gsap.fromTo(
          ".dt-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
          }
        );

        // Photo band opens from a framed strip to full width
        const side = window.matchMedia("(min-width: 1024px)").matches ? 24 : 8;
        const bandTrigger = {
          trigger: ".band-frame",
          start: "top 88%",
          end: "center 45%",
          scrub: true,
        };
        gsap.fromTo(
          ".band-frame",
          { clipPath: `inset(0% ${side}% 0% ${side}% round 4px)` },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: bandTrigger }
        );
        gsap.fromTo(
          ".band-img",
          { scale: 1.25 },
          { scale: 1, ease: "none", scrollTrigger: bandTrigger }
        );

        // Line beside the deliverables fills as you read
        gsap.fromTo(
          ".del-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".del-list",
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );

        // Material rows and phase tabs rise once
        gsap.from(".mat-row", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".mat-list", start: "top 85%", once: true },
        });
        gsap.from(".pr-tab", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".pr-tabs", start: "top 88%", once: true },
        });

        // Next-service photo drifts
        gsap.fromTo(
          ".nx-img",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ".nx-band", start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, root);

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
      ctx.revert();
    };
  }, [service.slug]);

  /* ----- Lightbox navigation ----- */
  const total = service.gallery.length;
  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    setHovering(false);
  }, []);
  const prevImage = useCallback(() => {
    setLightboxIdx((i) => (i === null ? i : (i - 1 + total) % total));
  }, [total]);
  const nextImage = useCallback(() => {
    setLightboxIdx((i) => (i === null ? i : (i + 1) % total));
  }, [total]);

  /* ----- Phase tabs: arrow keys move between phases ----- */
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = service.processSteps.length;
    let target = i;
    if (e.key === "ArrowRight") target = (i + 1) % n;
    else if (e.key === "ArrowLeft") target = (i - 1 + n) % n;
    else return;
    e.preventDefault();
    setActiveStep(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <main
      ref={rootRef}
      className="relative bg-warm-ivory text-deep-charcoal selection:bg-champagne-gold selection:text-deep-charcoal"
    >
      <style>{`
        @keyframes chipIn { from { opacity: 0; transform: translateY(8px); } }
        @keyframes overlayIn { from { opacity: 0; } }
        @keyframes lbIn { from { opacity: 0; transform: scale(.985); } }
        @media (prefers-reduced-motion: no-preference) {
          .chip-in { animation: chipIn .5s cubic-bezier(.22,1,.36,1) both; }
          .modal-overlay { animation: overlayIn .3s ease both; }
          .lb-in { animation: lbIn .5s cubic-bezier(.22,1,.36,1) both; }
        }
      `}</style>

      {/* Reading progress */}
      <div
        aria-hidden
        className="dt-progress pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left scale-x-0 bg-champagne-gold"
      />

      <CursorBubble active={hovering && lightboxIdx === null} label="Zoom" />

      {/* ============ 1. Hero ============ */}
      <section
        ref={heroRef}
        data-theme="dark"
        aria-labelledby="service-heading"
        className="relative isolate overflow-hidden px-6 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-24 lg:pt-44 text-warm-ivory"
      >
        {/* Background Hero Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src={service.heroImage || SERVICE_HERO_FALLBACK_BG}
            alt={service.title}
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

        <div className="mx-auto max-w-[1600px]">
          <nav
            aria-label="Breadcrumb"
            className="dt-fade flex items-center gap-2 font-sans text-sm text-warm-ivory/60"
          >
            <Link href="/" className="transition-colors hover:text-champagne-gold">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="transition-colors hover:text-champagne-gold">
              Services
            </Link>
            <span aria-hidden>/</span>
            <span className="text-warm-ivory">{service.title}</span>
          </nav>

          <div className="dt-fade mt-10">
            <Label light>
              Service {service.id} · {service.eyebrow}
            </Label>
          </div>

          <h1
            id="service-heading"
            className="mt-6 font-serif text-[clamp(44px,8vw,140px)] font-light uppercase leading-[0.95] tracking-tight text-warm-ivory"
          >
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom"
              >
                <span className="dt-word inline-block">{w}</span>
              </span>
            ))}
          </h1>

          <div className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12">
            <p className="dt-fade font-serif text-2xl font-light leading-snug sm:text-3xl text-warm-ivory lg:col-span-7 lg:text-4xl">
              {service.leadParagraph}
            </p>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="dt-fade font-sans text-base leading-relaxed text-warm-ivory/80">
                {service.description}
              </p>

              <ul className="dt-fade mt-8 space-y-2 border-t border-white/15 pt-6 font-sans text-sm text-warm-ivory/85">
                {(service.features || FEATURES).map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-gold" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="dt-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-3 rounded-full bg-champagne-gold px-8 py-4 font-sans text-sm font-medium text-deep-charcoal transition-colors duration-300 hover:bg-warm-ivory hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                >
                  Book a consultation
                  <Arrow />
                </Link>
                <Link
                  href="/services"
                  className="border-b border-champagne-gold pb-1 font-sans text-sm font-medium text-warm-ivory transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                >
                  All services
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <dl className="dt-fade mt-16 grid grid-cols-2 border-t border-white/15 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] lg:mt-24">
            {service.stats.map((s) => (
              <div key={s.label} className="py-6 pr-6">
                <dt className="font-sans text-sm text-warm-ivory/60">{s.label}</dt>
                <dd className="mt-2 font-serif text-2xl font-light text-warm-ivory sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ 2. Photo band that opens to full width ============ */}
      <section data-theme="light" aria-label="Featured project" className="bg-warm-ivory pb-6">
        <div className="band-frame relative h-[60vh] w-full overflow-hidden sm:h-[70vh] lg:h-[88vh]">
          <div className="band-img absolute inset-0 will-change-transform">
            <Image
              src={service.heroImage}
              alt={`${service.title} by RichMan Interiors`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-deep-charcoal/10 to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-2xl text-white sm:bottom-10 sm:left-10 lg:bottom-14 lg:left-16">
            <p className="font-sans text-sm text-white/75">Featured project</p>
            <p className="mt-2 font-serif text-3xl font-light uppercase leading-[1.02] tracking-tight sm:text-5xl">
              {service.featuredProject.title}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 font-sans text-sm text-white/80">
              <span>{service.featuredProject.location}</span>
              <span aria-hidden>·</span>
              <span>{service.featuredProject.area}</span>
              <span aria-hidden>·</span>
              <span className="text-champagne-gold">{service.featuredProject.scope}</span>
            </p>
            <div className="mt-5">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-champagne-gold hover:text-champagne-gold"
              >
                <span>View in Portfolio</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. Deliverables (the line fills as you scroll) ============ */}
      <section
        data-theme="light"
        aria-labelledby="deliverables-heading"
        className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Label>What is included</Label>
              <h2
                id="deliverables-heading"
                className="mt-6 font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl"
              >
                Every deliverable, defined
              </h2>
              <p className="mt-6 max-w-sm font-sans text-base leading-relaxed text-deep-charcoal/65">
                {service.deliverablesSummary ||
                  "Drawings, material choices and site milestones are agreed in detail before work begins, so there is no ambiguity later."}
              </p>
            </div>
          </div>

          <div className="relative lg:col-span-8 lg:pl-14">
            <div
              aria-hidden
              className="absolute left-0 top-0 hidden h-full w-px bg-deep-charcoal/15 lg:block"
            >
              <div className="del-fill h-full w-full origin-top scale-y-0 bg-champagne-gold" />
            </div>

            <ol className="del-list">
              {service.deliverables.map((d, i) => {
                const on = activeDel === i;
                return (
                  <li
                    key={d.title}
                    ref={(el) => {
                      delRefs.current[i] = el;
                    }}
                    data-index={i}
                    className="border-t border-deep-charcoal/15 py-12 last:border-b lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-0"
                  >
                    <p
                      className={`font-sans text-sm tabular-nums transition-colors duration-500 ${on ? "text-champagne-gold" : "text-champagne-gold lg:text-deep-charcoal/35"
                        }`}
                    >
                      ({pad(i + 1)})
                    </p>
                    <h3
                      className={`mt-4 font-serif text-4xl font-light uppercase leading-[1] tracking-tight transition-colors duration-500 sm:text-5xl lg:text-6xl ${on ? "text-deep-charcoal" : "text-deep-charcoal lg:text-deep-charcoal/30"
                        }`}
                    >
                      {d.title}
                    </h3>
                    <p
                      className={`mt-6 max-w-lg font-sans text-base leading-relaxed transition-colors duration-500 ${on ? "text-deep-charcoal/75" : "text-deep-charcoal/75 lg:text-deep-charcoal/30"
                        }`}
                    >
                      {d.description}
                    </p>
                    <ul
                      className={`mt-8 max-w-lg space-y-2 border-t border-deep-charcoal/15 pt-5 font-sans text-sm transition-colors duration-500 ${on ? "text-deep-charcoal/80" : "text-deep-charcoal/80 lg:text-deep-charcoal/25"
                        }`}
                    >
                      {(d.points || PROTOCOL).map((p) => (
                        <li key={p} className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-gold" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>

            <div className="mt-12 flex flex-wrap items-center gap-6 pt-8 border-t border-deep-charcoal/15">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-3 rounded-full bg-deep-charcoal px-8 py-4 font-sans text-sm font-medium text-warm-ivory transition-colors duration-300 hover:bg-champagne-gold hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
              >
                <span>Commission this scope</span>
                <Arrow />
              </Link>
              <Link
                href="/contact"
                className="border-b border-deep-charcoal/40 pb-1 font-sans text-sm font-medium text-deep-charcoal hover:border-champagne-gold hover:text-champagne-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
              >
                Inquire with Client Director &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. Materials (dark selector) ============ */}
      {/* <section
        data-theme="dark"
        aria-labelledby="materials-heading"
        className="bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1600px]">
          <Label light>Materials</Label>
          <h2
            id="materials-heading"
            className="mt-6 max-w-4xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Chosen to be touched
          </h2>
          <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-warm-ivory/65">
            We visit European quarries and master mills ourselves and choose
            natural materials, never synthetic veneers. Select a specimen to read
            its story.
          </p>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            
            <ul className="mat-list border-t border-warm-ivory/15 lg:col-span-5">
              {service.materials.map((m, i) => {
                const on = activeMaterial === i;
                return (
                  <li key={m.name} className="mat-row border-b border-warm-ivory/15">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setActiveMaterial(i)}
                      className="group flex w-full items-center gap-5 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-champagne-gold"
                    >
                      <span
                        aria-hidden
                        className={`h-12 w-12 shrink-0 rounded-full ring-1 transition-all duration-500 ${on ? "scale-110 ring-champagne-gold" : "ring-warm-ivory/25 group-hover:scale-105"
                          }`}
                        style={{ background: SWATCHES[i % SWATCHES.length] }}
                      />
                      <span className="flex-1">
                        <span className="block font-sans text-sm text-warm-ivory/50">
                          ({pad(i + 1)}) {m.origin}
                        </span>
                        <span
                          className={`mt-1 block font-serif text-2xl font-light transition-colors duration-500 sm:text-3xl ${on ? "text-warm-ivory" : "text-warm-ivory/45 group-hover:text-warm-ivory/80"
                            }`}
                        >
                          {m.name}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`text-champagne-gold transition-all duration-500 ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                          }`}
                      >
                        <Arrow />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul> */}

      {/* Detail */}
      {/* <div className="lg:col-span-7" aria-live="polite">
              {material && (
                <div key={activeMaterial} className="chip-in">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-sans text-sm text-champagne-gold">
                        From {material.origin}
                      </p>
                      <h3 className="mt-3 font-serif text-4xl font-light uppercase leading-[1] tracking-tight sm:text-5xl lg:text-6xl">
                        {material.name}
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="hidden h-24 w-24 shrink-0 rounded-full ring-1 ring-warm-ivory/25 sm:block"
                      style={{ background: swatch }}
                    />
                  </div>

                  <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-warm-ivory/75">
                    {material.description}
                  </p>

                  <dl className="mt-10 grid border-t border-warm-ivory/15 sm:grid-cols-2">
                    {[
                      { k: "Finish", v: spec.finish },
                      { k: "Performance", v: spec.rating },
                      { k: "Best used for", v: spec.use },
                      { k: "Care", v: spec.care },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="border-b border-warm-ivory/15 py-5 sm:odd:pr-8 sm:even:pl-8"
                      >
                        <dt className="font-sans text-sm text-warm-ivory/45">{row.k}</dt>
                        <dd className="mt-2 font-sans text-base text-warm-ivory/90">{row.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                    <p className="max-w-xs font-sans text-sm text-warm-ivory/55">
                      Physical samples are available at your studio consultation.
                    </p>
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-3 rounded-full bg-champagne-gold px-8 py-4 font-sans text-sm font-medium text-deep-charcoal transition-colors duration-300 hover:bg-warm-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-ivory"
                    >
                      Request a sample box
                      <Arrow />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section> */}

      {/* ============ 5. Process (tabs with a filling line) ============ */}
      <section
        data-theme="light"
        aria-labelledby="process-heading"
        className="bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1600px]">
          <Label>How we run it</Label>
          <h2
            id="process-heading"
            className="mt-6 max-w-4xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Four phases, one team
          </h2>
          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-deep-charcoal/65">
            Choose a phase to see its timing, its milestone and the approvals
            needed before it can move on.
          </p>

          <div
            role="tablist"
            aria-label="Execution phases"
            className="pr-tabs mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-24 lg:grid-cols-4"
          >
            {service.processSteps.map((s, i) => {
              const on = activeStep === i;
              return (
                <button
                  key={s.number}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`phase-tab-${i}`}
                  aria-selected={on}
                  aria-controls="phase-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActiveStep(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="pr-tab group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                >
                  <span className="relative block h-0.5 w-full overflow-hidden bg-deep-charcoal/15">
                    <span
                      className={`absolute inset-0 origin-left bg-champagne-gold transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i <= activeStep ? "scale-x-100" : "scale-x-0"
                        }`}
                    />
                  </span>
                  <span className="mt-4 block font-sans text-sm tabular-nums text-deep-charcoal/50">
                    ({s.number})
                  </span>
                  <span
                    className={`mt-1 block font-serif text-xl font-light transition-colors duration-500 sm:text-2xl ${on ? "text-deep-charcoal" : "text-deep-charcoal/40 group-hover:text-deep-charcoal/75"
                      }`}
                  >
                    {s.title}
                  </span>
                  <span className="mt-1 block font-sans text-sm text-deep-charcoal/50">
                    {s.timing || PHASES[i % PHASES.length]?.duration}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="phase-panel"
            role="tabpanel"
            aria-labelledby={`phase-tab-${activeStep}`}
            className="mt-14 border-t border-deep-charcoal/15 pt-12 lg:mt-20"
          >
            {step && (
              <div key={activeStep} className="chip-in grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="font-serif text-8xl font-light leading-none text-champagne-gold lg:text-[10rem]">
                    {step.number}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl font-light uppercase tracking-tight sm:text-4xl">
                    {step.title}
                  </h3>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="max-w-lg font-sans text-lg leading-relaxed text-deep-charcoal/75">
                    {step.description}
                  </p>
                  {phase && (
                    <dl className="mt-10 border-t border-deep-charcoal/15">
                      <div className="border-b border-deep-charcoal/15 py-5">
                        <dt className="font-sans text-sm text-deep-charcoal/50">Timing</dt>
                        <dd className="mt-2 font-serif text-2xl font-light">{phase.duration}</dd>
                      </div>
                      <div className="border-b border-deep-charcoal/15 py-5">
                        <dt className="font-sans text-sm text-deep-charcoal/50">Milestone</dt>
                        <dd className="mt-2 font-sans text-base text-deep-charcoal/85">
                          {phase.milestone}
                        </dd>
                      </div>
                      <div className="border-b border-deep-charcoal/15 py-5">
                        <dt className="font-sans text-sm text-deep-charcoal/50">Approvals</dt>
                        <dd className="mt-2 font-sans text-base text-deep-charcoal/85">
                          {phase.approvals}
                        </dd>
                      </div>
                    </dl>
                  )}
                  <div className="mt-8">
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-2 rounded-full border border-deep-charcoal/30 px-6 py-3 font-sans text-xs uppercase tracking-[0.16em] font-medium text-deep-charcoal transition-colors hover:bg-deep-charcoal hover:text-warm-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                    >
                      <span>Plan phase {step.number} with our design director</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ 6. Gallery ============ */}
      {total > 0 && (
        <section
          data-theme="light"
          aria-labelledby="gallery-heading"
          className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
        >
          <div className="mx-auto max-w-[1600px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <Label>Completed work</Label>
                <h2
                  id="gallery-heading"
                  className="mt-6 font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
                >
                  From the portfolio
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="group inline-flex w-fit items-center gap-3 border-b border-champagne-gold pb-1 font-sans text-sm font-medium transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
              >
                See all projects
                <span className="text-champagne-gold transition-transform duration-500 group-hover:translate-x-1.5">
                  <Arrow />
                </span>
              </Link>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-16 lg:mt-24 lg:grid-cols-12 lg:gap-y-24">
              {service.gallery.map((img, i) => (
                <GalleryCard
                  key={img.src}
                  image={img}
                  index={i}
                  onOpen={() => setLightboxIdx(i)}
                  onHover={setHovering}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 7. Next service ============ */}
      <section data-theme="dark" aria-label="Next service">
        <Link
          href={`/services/${nextService.slug}`}
          className="nx-band group relative block h-[70vh] overflow-hidden bg-deep-charcoal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne-gold lg:h-[85vh]"
        >
          <div className="nx-img absolute -inset-y-[10%] inset-x-0 will-change-transform">
            <Image
              src={nextService.heroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-deep-charcoal/55 transition-colors duration-700 group-hover:bg-deep-charcoal/40" />

          <div className="relative flex h-full flex-col justify-end px-6 pb-10 sm:px-10 lg:px-16 lg:pb-16">
            <p className="font-sans text-sm text-white/70">Next service</p>
            <div className="mt-4 flex items-end justify-between gap-8">
              <span className="font-serif text-[clamp(40px,8vw,140px)] font-light uppercase leading-[0.95] tracking-tight transition-transform duration-700 group-hover:translate-x-3">
                {nextService.title}
              </span>
              <span className="mb-2 hidden shrink-0 text-champagne-gold transition-transform duration-500 group-hover:translate-x-3 sm:block">
                <Arrow className="h-5 w-16 lg:w-28" />
              </span>
            </div>
            {nextService.subtitle && (
              <p className="mt-5 max-w-md font-sans text-base text-white/75">
                {nextService.subtitle}
              </p>
            )}
          </div>
        </Link>
      </section>

      {/* ============ 8. Call to action ============ */}
      <section
        data-theme="light"
        aria-labelledby="detail-cta"
        className="bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2
              id="detail-cta"
              className="font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
            >
              Talk to us about this service
            </h2>
            <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-deep-charcoal/70">
              Book a free 45-minute session with a senior designer to look at
              samples, review your plans and get an honest view of timing and
              budget.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-block border-b border-champagne-gold pb-1 font-sans text-sm font-medium transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
            >
              See all services
            </Link>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link
              href="/consultation"
              className="flex h-56 w-56 items-center justify-center rounded-full border border-deep-charcoal/20 p-8 text-center font-sans text-sm font-medium transition-colors duration-300 hover:bg-deep-charcoal hover:text-warm-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold lg:h-64 lg:w-64"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Floating action pill (after the hero scrolls away) ============ */}
      <aside
        aria-label="Quick actions"
        className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${showFloating && lightboxIdx === null
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
          }`}
      >
        <div className="flex items-center gap-3 rounded-full border border-warm-ivory/15 bg-deep-charcoal/95 py-2 pl-5 pr-2 text-warm-ivory shadow-xl backdrop-blur-md">
          <span className="hidden font-sans text-sm text-warm-ivory/70 sm:inline">
            {service.title}
          </span>
          <Link
            href="/consultation"
            tabIndex={showFloating ? 0 : -1}
            className="rounded-full bg-champagne-gold px-5 py-2.5 font-sans text-sm font-medium text-deep-charcoal transition-colors hover:bg-warm-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-ivory"
          >
            Book a consultation
          </Link>
          <button
            type="button"
            tabIndex={showFloating ? 0 : -1}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" })
            }
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full text-warm-ivory/80 transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gold"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ============ Lightbox ============ */}
      {lightboxIdx !== null && (
        <Lightbox
          images={service.gallery}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </main>
  );
}