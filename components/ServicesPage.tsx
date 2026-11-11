"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/data/servicesData";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/*  TODO: confirm every claim below (sizes, years, sourcing, permits). */
/* ------------------------------------------------------------------ */

const HERO_LINES = [
  { text: "From blueprint", indent: "" },
  { text: "to handover,", indent: "lg:ml-[7vw]" },
  { text: "under one roof.", indent: "lg:ml-[2vw]" },
];

const HERO_STATS = [
  { value: 100, suffix: "%", label: "In-house turnkey" },
  { value: 35, suffix: "k", label: "sq ft millwork facility" },
  { value: 250, suffix: "+", label: "Private spaces delivered" },
  { value: 12, suffix: "", label: "Years crafting in the UAE" },
];

const STAGES = [
  "Concept design",
  "Engineering drawings",
  "Material sourcing",
  "Permits and approvals",
  "Manufacturing",
  "Site installation",
];
const TYPICAL_OWNERS = [
  "Designer",
  "Engineer",
  "Supplier",
  "Consultant",
  "Workshop",
  "Contractor",
];

const ADVANTAGES = [
  {
    title: "One accountable partner",
    desc: "No finger-pointing between a designer and a separate contractor. We carry the design, cost and timeline together.",
  },
  {
    title: "Direct stone sourcing",
    desc: "We import marble slabs directly from Carrara and Tivoli, then dry-lay and bookmatch them in our warehouse before they reach site.",
  },
  {
    title: "Permits handled in-house",
    desc: "Our own team secures NOCs and building permits with Emaar, Nakheel, Trakhees and Dubai Civil Defence.",
  },
  {
    title: "Factory dry-fit precision",
    desc: "Every dressing room, kitchen and pivot door is built and inspected in our 35,000 sq ft workshop before it ships.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

function useCountUp(end: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReduced()) {
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
    <div className="py-8 sm:px-6 sm:first:pl-0">
      <p className="font-serif text-5xl font-light leading-none tabular-nums sm:text-6xl">
        {n}
        <span className="text-champagne-gold">{suffix}</span>
      </p>
      <p className="mt-4 max-w-[14rem] font-sans text-sm leading-relaxed text-deep-charcoal/65">
        {label}
      </p>
    </div>
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

/* ------------------------------------------------------------------ */
/*  Index: a photo follows the cursor while you hover a service        */
/* ------------------------------------------------------------------ */

function IndexPreview({ active }: { active: string | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX + 40);
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
        className={`relative h-[36vh] w-[27vh] overflow-hidden rounded-[4px] bg-sand-beige transition-[opacity,transform] duration-300 ${active ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
      >
        {SERVICES.map((s) => (
          <div
            key={s.slug}
            className={`absolute inset-0 transition-opacity duration-300 ${active === s.slug ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image src={s.heroImage} alt="" fill sizes="20vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compare: a typical project versus one team                         */
/* ------------------------------------------------------------------ */

function Compare() {
  const [mode, setMode] = useState<"typical" | "ours">("typical");
  const [handoffs, setHandoffs] = useState(STAGES.length - 1);

  useEffect(() => {
    const target = mode === "typical" ? STAGES.length - 1 : 0;
    if (prefersReduced()) {
      setHandoffs(target);
      return;
    }
    const obj = { v: handoffs };
    const tween = gsap.to(obj, {
      v: target,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => setHandoffs(Math.round(obj.v)),
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const ours = mode === "ours";

  return (
    <div>
      <div
        role="group"
        aria-label="Compare project models"
        className="inline-flex rounded-full border border-warm-ivory/20 p-1"
      >
        {[
          { id: "typical" as const, label: "A typical project" },
          { id: "ours" as const, label: "With RichMan" },
        ].map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={mode === o.id}
            onClick={() => setMode(o.id)}
            className={`rounded-full px-5 py-2.5 font-sans text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gold ${mode === o.id
              ? "bg-warm-ivory text-deep-charcoal"
              : "text-warm-ivory/70 hover:text-warm-ivory"
              }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <ol className="mt-10 grid border-l border-t border-warm-ivory/15 sm:grid-cols-2 lg:grid-cols-6">
        {STAGES.map((stage, i) => (
          <li
            key={stage}
            className="border-b border-r border-warm-ivory/15 p-6 lg:min-h-[13rem]"
          >
            <p className="font-sans text-sm tabular-nums text-warm-ivory/45">
              ({pad(i + 1)})
            </p>
            <p className="mt-4 font-serif text-xl font-light leading-snug sm:text-2xl">
              {stage}
            </p>
            <span
              key={mode}
              className={`chip-in mt-6 inline-block rounded-full border px-3 py-1 font-sans text-sm transition-colors duration-500 ${ours
                ? "border-champagne-gold bg-champagne-gold text-deep-charcoal"
                : "border-warm-ivory/30 text-warm-ivory/70"
                }`}
            >
              {ours ? "RichMan" : TYPICAL_OWNERS[i]}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
        <p className="font-serif text-6xl font-light leading-none tabular-nums">
          {handoffs}
          <span className="ml-3 font-sans text-base text-warm-ivory/55">
            handovers between parties
          </span>
        </p>
        <p
          key={mode}
          className="chip-in max-w-md font-sans text-base leading-relaxed text-warm-ivory/70"
        >
          {ours
            ? "One team carries the design through to site, so what is drawn is what is built."
            : "Every handover between parties is a chance for delays, redesign and finger-pointing."}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>(0.4);
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          tall: "(min-height: 721px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (c) => {
          const { isDesktop, tall, reduce } = c.conditions as {
            isDesktop: boolean;
            tall: boolean;
            reduce: boolean;
          };
          if (reduce) return;

          /* Hero: headline rises on load */
          gsap.from(".sv-line", {
            yPercent: 110,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.1,
          });
          gsap.from(".sv-fade", {
            opacity: 0,
            y: 16,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.5,
          });

          /* Index rows rise as they arrive */
          gsap.from(".ix-row", {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".ix-list", start: "top 80%", once: true },
          });

          /* Advantage points rise */
          gsap.from(".adv-item", {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".adv-list", start: "top 85%", once: true },
          });

          // Stacking chapters only on tall desktop screens
          if (!isDesktop || !tall) return;

          const panels = gsap.utils.toArray<HTMLElement>(".chapter");
          panels.forEach((panel, i) => {
            const img = panel.querySelector(".ch-img");
            // The photo settles from a zoom as the chapter arrives
            gsap.fromTo(
              img,
              { scale: 1.2 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              }
            );

            // The chapter underneath shrinks and darkens as the next one slides over it
            const next = panels[i + 1];
            if (next) {
              const trigger = {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
              };
              gsap.to(panel.querySelector(".stack-inner"), {
                scale: 0.93,
                transformOrigin: "50% 0%",
                ease: "none",
                scrollTrigger: trigger,
              });
              gsap.to(panel.querySelector(".stack-dim"), {
                opacity: 0.55,
                ease: "none",
                scrollTrigger: trigger,
              });
            }
          });
        }
      );
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
  }, []);

  const goTo = (slug: string) => {
    document.getElementById(slug)?.scrollIntoView({
      behavior: prefersReduced() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main
      ref={rootRef}
      className="bg-warm-ivory text-deep-charcoal selection:bg-champagne-gold selection:text-deep-charcoal"
    >
      <style>{`
        @keyframes chipIn { from { opacity: 0; transform: translateY(6px); } }
        @media (prefers-reduced-motion: no-preference) {
          .chip-in { animation: chipIn .45s cubic-bezier(.22,1,.36,1) both; }
        }
      `}</style>

      <IndexPreview active={activeIndex} />

      {/* ============ 1. Hero ============ */}
      <section
        data-theme="light"
        aria-labelledby="services-heading"
        className="px-6 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-24 lg:pt-44"
      >
        <div className="mx-auto max-w-[1600px]">
          <p className="sv-fade flex items-center gap-2.5 font-sans text-sm text-deep-charcoal/70">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            Services
          </p>

          <h1
            id="services-heading"
            className="mt-8 font-serif text-[clamp(44px,7.4vw,128px)] font-light uppercase leading-[0.95] tracking-tight"
          >
            {HERO_LINES.map((l) => (
              <span key={l.text} className={`block overflow-hidden pb-[0.08em] ${l.indent}`}>
                <span className="sv-line block">{l.text}</span>
              </span>
            ))}
          </h1>

          <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="sv-fade max-w-md font-sans text-base leading-relaxed text-deep-charcoal/75 lg:text-lg">
                We do not hand concept drawings to third-party contractors.
                RichMan Interiors designs, engineers, manufactures and builds
                every space under one roof in Dubai.
              </p>
              <Link
                href="/consultation"
                className="sv-fade mt-8 inline-flex items-center gap-3 rounded-full bg-deep-charcoal px-8 py-4 font-sans text-sm font-medium text-warm-ivory transition-colors duration-300 hover:bg-champagne-gold hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
              >
                Book a consultation
                <Arrow />
              </Link>
            </div>

            <div
              ref={statsRef}
              className="sv-fade grid grid-cols-2 divide-deep-charcoal/15 border-t border-deep-charcoal/15 sm:divide-x lg:col-span-6 lg:col-start-7"
            >
              {HERO_STATS.map((s) => (
                <Stat key={s.label} {...s} start={statsInView} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. Index (hover a service, a photo follows the cursor) ============ */}
      <section
        data-theme="light"
        aria-labelledby="index-heading"
        className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Label>What we do</Label>
              <h2
                id="index-heading"
                className="mt-6 font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
              >
                {SERVICES.length === 6 ? "Six" : pad(SERVICES.length)} services
              </h2>
            </div>
            <p className="max-w-xs font-sans text-base leading-relaxed text-deep-charcoal/65">
              Each one stands alone or joins the others in a single turnkey
              contract.
            </p>
          </div>

          <ul
            className="ix-list group/list mt-16 border-t border-deep-charcoal/15 lg:mt-24"
            onMouseLeave={() => setActiveIndex(null)}
          >
            {SERVICES.map((s, i) => (
              <li
                key={s.slug}
                className="ix-row border-b border-deep-charcoal/15 transition-opacity duration-500 group-hover/list:opacity-35 hover:!opacity-100"
                onMouseEnter={() => setActiveIndex(s.slug)}
              >
                <a
                  href={`#${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(s.slug);
                  }}
                  onFocus={() => setActiveIndex(s.slug)}
                  onBlur={() => setActiveIndex(null)}
                  className="group flex items-baseline justify-between gap-6 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-champagne-gold lg:py-9"
                >
                  <span className="flex items-baseline gap-5 lg:gap-10">
                    <span className="font-sans text-sm tabular-nums text-deep-charcoal/45">
                      ({pad(i + 1)})
                    </span>
                    <span className="font-serif text-3xl font-light uppercase leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-5xl lg:text-[4.5vw]">
                      {s.title}
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-4 font-sans text-sm text-deep-charcoal/55 sm:flex">
                    {s.eyebrow}
                    <span className="text-champagne-gold transition-transform duration-500 group-hover:translate-x-1.5">
                      <Arrow />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 3. Chapters (each service slides over the last) ============ */}
      <div aria-label="Services in detail">
        {SERVICES.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              data-theme="light"
              aria-labelledby={`chapter-${s.slug}`}
              className={`chapter relative ${i % 2 === 0 ? "bg-warm-ivory" : "bg-white"
                } ${i > 0
                  ? "lg:rounded-t-[28px] lg:shadow-[0_-24px_60px_rgba(23,24,22,0.10)]"
                  : ""
                } lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden [@media(max-height:720px)]:!static [@media(max-height:720px)]:!h-auto [@media(max-height:720px)]:min-h-screen motion-reduce:!static motion-reduce:!h-auto motion-reduce:min-h-screen`}
            >
              <div className="stack-inner mx-auto flex h-full max-w-[1600px] items-center px-6 py-20 sm:px-10 lg:px-16 lg:py-0">
                <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Photo */}
                  <div
                    className={`group/img relative aspect-[4/3] overflow-hidden rounded-[4px] bg-sand-beige lg:col-span-7 lg:aspect-auto lg:h-[76vh] ${flip ? "lg:order-2" : ""
                      }`}
                  >
                    <div className="ch-img absolute inset-0 will-change-transform">
                      <Image
                        src={s.heroImage}
                        alt={`${s.title} by RichMan Interiors`}
                        fill
                        sizes="(min-width:1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                    <p className="flex items-baseline justify-between gap-4 font-sans text-sm text-deep-charcoal/55">
                      <span className="text-champagne-gold">{s.eyebrow}</span>
                      <span className="tabular-nums">
                        ({pad(i + 1)} / {pad(SERVICES.length)})
                      </span>
                    </p>

                    <h2
                      id={`chapter-${s.slug}`}
                      className="mt-5 font-serif text-[clamp(34px,4.4vw,72px)] font-light uppercase leading-[0.98] tracking-tight"
                    >
                      <Link
                        href={`/services/${s.slug}`}
                        className="transition-colors duration-500 hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                      >
                        {s.title}
                      </Link>
                    </h2>

                    <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-deep-charcoal/70">
                      {s.description}
                    </p>

                    <ul className="mt-8 max-w-md border-t border-deep-charcoal/15">
                      {s.deliverables.slice(0, 3).map((d) => (
                        <li
                          key={d.title}
                          className="flex items-center gap-3 border-b border-deep-charcoal/15 py-3 font-sans text-sm text-deep-charcoal/80"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-gold" />
                          {d.title}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <p className="font-sans text-sm text-deep-charcoal/55">
                        Featured:{" "}
                        <span className="text-deep-charcoal">{s.featuredProject.title}</span>
                      </p>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group/link inline-flex items-center gap-3 border-b border-champagne-gold pb-1 font-sans text-sm font-medium transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
                      >
                        Explore this service
                        <span className="text-champagne-gold transition-transform duration-500 group-hover/link:translate-x-1.5">
                          <Arrow />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Darkens while the next chapter slides over it */}
              <div
                aria-hidden
                className="stack-dim pointer-events-none absolute inset-0 bg-deep-charcoal opacity-0"
              />
            </section>
          );
        })}
      </div>

      {/* ============ 4. The in-house advantage (dark) ============ */}
      <section
        data-theme="dark"
        aria-labelledby="advantage-heading"
        className="relative z-10 bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1600px]">
          <Label light>Why turnkey</Label>
          <h2
            id="advantage-heading"
            className="mt-6 max-w-5xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Why one team beats five
          </h2>
          <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-warm-ivory/65">
            Interior projects often fail when a concept cannot be built the way it
            was drawn. With one accountable team, what we sketch is what we build.
            Try the toggle to see where the handovers happen.
          </p>

          <div className="mt-16 lg:mt-20">
            <Compare />
          </div>

          <ul className="adv-list mt-24 grid gap-x-8 gap-y-12 border-t border-warm-ivory/15 pt-12 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
            {ADVANTAGES.map((a, i) => (
              <li key={a.title} className="adv-item">
                <p className="font-sans text-sm tabular-nums text-champagne-gold">
                  ({pad(i + 1)})
                </p>
                <h3 className="mt-4 font-serif text-2xl font-light leading-snug">
                  {a.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-warm-ivory/65">
                  {a.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 5. Call to action ============ */}
      <section
        data-theme="light"
        aria-labelledby="services-cta"
        className="relative z-10 bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2
              id="services-cta"
              className="font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
            >
              Discuss your space with a senior designer
            </h2>
            <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-deep-charcoal/70">
              Book a free 45-minute consultation. Look at real stone and joinery
              samples, go through your plans and get an honest view of timing and
              budget.
            </p>
            <Link
              href="/portfolio"
              className="mt-8 inline-block border-b border-champagne-gold pb-1 font-sans text-sm font-medium transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
            >
              See selected work
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
    </main>
  );
}