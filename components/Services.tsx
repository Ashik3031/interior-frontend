"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */

interface ServiceItem {
  id: string;
  lines: string[];
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  href: string;
  tag: string;
}

const IMG_A =
  "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg";
const IMG_B =
  "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg";
const IMG_C =
  "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg";
const IMG_D =
  "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg";

/** Premium white used for the section + pinned stage background */
const BG = "#FBFAF7";

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    tag: "Design & Build",
    title: "Complete Turnkey Fit-Out",
    lines: ["Complete", "Turnkey Fit-Out"],
    subtitle: "Shell and core to white-glove handover",
    description:
      "Full-spectrum architectural delivery from shell and core to white-glove handover under one unified atelier roof.",
    cta: "Explore turnkey fit-out",
    image: IMG_A,
    href: "/services/complete-turnkey-fit-out",
  },
  {
    id: "02",
    tag: "Residential",
    title: "Villa & Apartment Renovations",
    lines: ["Villa & Apartment", "Renovations"],
    subtitle: "Villas, penthouses and apartments",
    description:
      "Transforming mature villas and luxury penthouses into contemporary, light-filled architectural sanctuaries.",
    cta: "Reimagine your residence",
    image: IMG_B,
    href: "/services/villa-apartment-renovations",
  },
  {
    id: "03",
    tag: "Commercial",
    title: "Office & Commercial Interiors",
    lines: ["Office & Commercial", "Interiors"],
    subtitle: "Corporate HQ and family offices",
    description:
      "Inspiring corporate headquarters, private family offices, and commercial spaces with STC-55+ acoustic isolation.",
    cta: "Discover commercial design",
    image: IMG_C,
    href: "/services/office-commercial-interiors",
  },
  {
    id: "04",
    tag: "Engineering",
    title: "MEP Works — Electrical, HVAC & Plumbing",
    lines: ["MEP Works"],
    subtitle: "Electrical, HVAC & Plumbing",
    description:
      "Whisper-quiet VRF/chilled air conditioning, frameless slot diffusers, DALI smart lighting, and precision plumbing.",
    cta: "View MEP capabilities",
    image: IMG_D,
    href: "/services/mep-works",
  },
  {
    id: "05",
    tag: "Compliance",
    title: "Authority Approval Coordination",
    lines: ["Authority Approval", "Coordination"],
    subtitle: "Dubai Municipality, DCD, Emaar, Nakheel, Trakhees",
    description:
      "Direct expediting and fast-track permits across Dubai Municipality, Civil Defence (DCD), Emaar, Nakheel, and Trakhees.",
    cta: "Statutory approvals",
    image: IMG_B,
    href: "/services/authority-approval-coordination",
  },
  {
    id: "06",
    tag: "Delivery",
    title: "Project Management & Execution",
    lines: ["Project Management", "& Execution"],
    subtitle: "On-site superintendence and QA/QC",
    description:
      "Continuous on-site superintendence, critical path milestone scheduling, and zero-tolerance QA/QC inspection regimes.",
    cta: "Project execution",
    image: IMG_C,
    href: "/services/project-management-execution",
  },
];

/** Images used by the centre slider (scene 1–2). Index 0 MUST equal stage 01's image. */
const SLIDER_IMAGES = [IMG_A, IMG_B, IMG_C, IMG_D];

/** Scattered tilted cards around the slider (scene 1). x/y/w are in vw/vh/vw. */
const SCATTER = [
  { x: -3, y: 20, w: 26, ar: 1.5, rot: -4, img: IMG_B },
  { x: 3, y: 67, w: 21, ar: 1.55, rot: 3, img: IMG_C },
  { x: 50, y: 2, w: 17, ar: 1.4, rot: -7, img: IMG_D },
  { x: 72, y: 18, w: 29, ar: 1.65, rot: 8, img: IMG_A },
  { x: 75, y: 60, w: 21, ar: 1.15, rot: -6, img: IMG_B },
  { x: 26, y: 74, w: 22, ar: 1.5, rot: -2, img: IMG_C },
];

const ABOUT_WORDS =
  "We craft interiors where design, engineering and delivery come together as one seamless process.".split(
    " "
  );

const ABOUT_TEXT =
  "RichMan Interiors is a Dubai design-and-build atelier shaped around considered spaces, refined materials, and the feeling of living within them.";

/* -------------------------------------------------------------------------- */
/*  TIMELINE (all in "scroll units"; 1 unit ≈ VH_PER_UNIT viewport heights)   */
/* -------------------------------------------------------------------------- */

const TOTAL = SERVICES_DATA.length;
const STAGE_START = 4.2; // P at which stage 01 is full-screen
const HOLD = 0.4; // extra scroll after the last stage
const U = STAGE_START + (TOTAL - 1) + HOLD;
const VH_PER_UNIT = 80;

/** Keyframe times for the single "hero media" element */
const KT = [0, 0.4, 1.2, 1.4, 2.2, 2.8, 3.4, 3.6, STAGE_START];

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const resetScroll = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
};

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // hero media (the one element that morphs through every scene)
  const mediaRef = useRef<HTMLDivElement>(null);
  const stage0ImgRef = useRef<HTMLDivElement>(null);
  const stage0InnerRef = useRef<HTMLDivElement>(null);
  const mediaDimRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  // scene 1
  const scatterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  // scene 2 (about)
  const aboutRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ruleRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);
  const aboutLabelRef = useRef<HTMLDivElement>(null);

  // scene 3 (marquee)
  const marqueeRef = useRef<HTMLDivElement>(null);

  // stages
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doorLRef = useRef<HTMLDivElement>(null);
  const doorRRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const gradBottomRef = useRef<HTMLDivElement>(null);
  const gradTopRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(-1);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { v: 0 };
    const cur = { v: 0 };
    let raf = 0;
    let activeIdx = -2;

    // measured layout
    let keyframes: Box[] = [];
    const aboutOffset = { v: 0 };

    // Where the empty slot before "We" currently sits (relative to the pinned stage)
    const measureSpacer = (): Box | null => {
      const st = stickyRef.current;
      const sp = spacerRef.current;
      if (!st || !sp) return null;
      const a = st.getBoundingClientRect();
      const b = sp.getBoundingClientRect();
      if (b.width <= 0) return null;
      return {
        x: b.left - a.left,
        y: b.top - a.top - aboutOffset.v,
        w: b.width,
        h: b.height,
        r: 12,
      };
    };

    const layout = () => {
      const st = stickyRef.current;
      if (!st) return;
      const a = st.getBoundingClientRect();
      const vw = a.width || window.innerWidth;
      const vh = Math.max(a.height, window.innerHeight);
      const m = vw < 768;

      const centered = (w: number, h: number, r: number, dy = 0): Box => ({
        x: (vw - w) / 2,
        y: (vh - h) / 2 + dy,
        w,
        h,
        r,
      });

      const k0w = m ? vw * 0.86 : Math.min(vw * 0.46, 880);
      const K0 = centered(k0w, k0w * (m ? 0.62 : 0.38), 20, vh * 0.04);
      const K1 = centered(vw * (m ? 0.94 : 0.92), vh * (m ? 0.6 : 0.8), 28);

      const K2: Box = measureSpacer() ?? centered(170, 84, 12);

      const k3w = m ? vw * 0.8 : Math.min(vw * 0.41, 780);
      const K3 = centered(k3w, k3w * 0.57, 4);
      const K4: Box = { x: 0, y: 0, w: vw, h: vh, r: 0 };

      keyframes = [K0, K0, K1, K1, K2, K2, K3, K3, K4];
    };

    const boxAt = (P: number): Box => {
      if (!keyframes.length) return { x: 0, y: 0, w: 0, h: 0, r: 0 };
      if (P <= KT[0]) return keyframes[0];
      if (P >= KT[KT.length - 1]) return keyframes[keyframes.length - 1];
      let i = 0;
      while (i < KT.length - 2 && P > KT[i + 1]) i++;
      const u = easeInOutCubic(clamp((P - KT[i]) / (KT[i + 1] - KT[i])));
      const A = keyframes[i];
      const B = keyframes[i + 1];
      const l = (p: number, q: number) => p + (q - p) * u;
      return { x: l(A.x, B.x), y: l(A.y, B.y), w: l(A.w, B.w), h: l(A.h, B.h), r: l(A.r, B.r) };
    };

    const render = (P: number) => {
      const S = P - STAGE_START; // stage progress

      // re-measure the thumbnail slot live so the image always lands before "We"
      if (P > 1.0 && P < 3.5 && keyframes.length) {
        const k2 = measureSpacer();
        if (k2) {
          keyframes[4] = k2;
          keyframes[5] = k2;
        }
      }

      // ---------------- theme / chrome ----------------
      const light = P < 3.9;
      if (sectionRef.current) {
        sectionRef.current.setAttribute("data-theme", light ? "light" : "dark");
        sectionRef.current.style.backgroundColor = light ? BG : "#0c0d0b";
      }
      if (stickyRef.current) {
        stickyRef.current.style.backgroundColor = light ? BG : "#0c0d0b";
      }
      const g = clamp((P - 3.8) / 0.6);
      if (gradBottomRef.current) gradBottomRef.current.style.opacity = String(g);
      if (gradTopRef.current) gradTopRef.current.style.opacity = String(g);

      // ---------------- scene 1: scattered gallery ----------------
      const sc = easeInOutCubic(clamp(P / 0.6));
      SCATTER.forEach((c, i) => {
        const el = scatterRefs.current[i];
        if (!el) return;
        const cx = c.x + c.w / 2;
        const cy = c.y + (c.w / c.ar) * (16 / 9) * 0.5; // rough vh centre
        const vx = (cx - 50) * 0.9 * sc;
        const vy = (cy - 50) * 0.9 * sc;
        el.style.transform = `translate3d(${vx}vw, ${vy}vh, 0) rotate(${c.rot + c.rot * 0.6 * sc}deg) scale(${1 - 0.15 * sc})`;
        el.style.opacity = String(1 - sc);
        el.style.visibility = sc >= 1 ? "hidden" : "visible";
      });
      if (heroTitleRef.current) {
        heroTitleRef.current.style.opacity = String(1 - clamp(P / 0.5));
        heroTitleRef.current.style.transform = `translate3d(0, ${-clamp(P / 0.5) * 30}px, 0)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - clamp(P / 0.3));

      // ---------------- hero media morph ----------------
      const box = boxAt(P);
      const media = mediaRef.current;
      if (media) {
        media.style.left = `${box.x}px`;
        media.style.top = `${box.y}px`;
        media.style.width = `${box.w}px`;
        media.style.height = `${box.h}px`;
        media.style.borderRadius = `${box.r}px`;
      }
      // slider buttons live only in scenes 1
      const btnOp = 1 - clamp((P - 1.1) / 0.3);
      if (btnRef.current) {
        btnRef.current.style.opacity = String(btnOp);
        btnRef.current.style.pointerEvents = btnOp > 0.5 ? "auto" : "none";
      }
      // swap to the stage-01 image while it is the marquee card
      const swap = clamp((P - 3.0) / 0.6);
      if (stage0ImgRef.current) stage0ImgRef.current.style.opacity = String(swap);
      const push0 = clamp(S - 0);
      if (stage0InnerRef.current) {
        stage0InnerRef.current.style.transform = `scale(${1 + 0.07 * push0}) rotateX(calc(var(--py, 0) * -1.5deg)) rotateY(calc(var(--px, 0) * 2deg))`;
      }
      if (mediaDimRef.current) {
        // stage 01 darkens as stage 02's doorway opens over it
        mediaDimRef.current.style.opacity = String(0.55 * clamp(S - 0));
      }

      // ---------------- scene 2: about text ----------------
      const aboutIn = clamp((P - 1.3) / 0.3);
      const aboutOut = clamp((P - 2.8) / 0.4);
      let offY = 0;
      if (aboutRef.current) {
        offY = -aboutOut * 60;
        aboutOffset.v = offY;
        aboutRef.current.style.opacity = String(aboutIn * (1 - aboutOut));
        aboutRef.current.style.transform = `translate3d(0, ${offY}px, 0)`;
        aboutRef.current.style.visibility = aboutIn * (1 - aboutOut) <= 0 ? "hidden" : "visible";
      }
      if (aboutLabelRef.current) {
        aboutLabelRef.current.style.opacity = String(clamp((P - 1.4) / 0.3));
      }
      const n = ABOUT_WORDS.length;
      ABOUT_WORDS.forEach((_, w) => {
        const el = wordRefs.current[w];
        if (!el) return;
        const start = 1.5 + 0.55 * (w / n);
        const vv = easeInOutCubic(clamp((P - start) / 0.25));
        el.style.opacity = String(vv);
        el.style.transform = `translate3d(0, ${(1 - vv) * 0.45}em, 0)`;
      });
      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${easeInOutCubic(clamp((P - 2.0) / 0.4))})`;
      }
      if (aboutTextRef.current) {
        const t = easeInOutCubic(clamp((P - 2.2) / 0.4));
        aboutTextRef.current.style.opacity = String(t);
        aboutTextRef.current.style.transform = `translate3d(0, ${(1 - t) * 14}px, 0)`;
      }

      // ---------------- scene 3: marquee behind the card ----------------
      if (marqueeRef.current) {
        const mi = clamp((P - 2.7) / 0.5);
        const mo = clamp((P - 3.8) / 0.4);
        marqueeRef.current.style.opacity = String(mi * (1 - mo));
        marqueeRef.current.style.transform = `translate3d(${-20 - (P - 2.6) * 38}vw, -50%, 0)`;
        marqueeRef.current.style.visibility = mi * (1 - mo) <= 0 ? "hidden" : "visible";
      }

      // ---------------- stages ----------------
      // doorway hairlines for whichever stage is opening
      const sClamped = clamp(S, 0, TOTAL - 1);
      const k = Math.min(TOTAL - 2, Math.floor(sClamped));
      const rOpen = S >= TOTAL - 1 ? 1 : S <= 0 ? 0 : S - k;
      const eOpen = easeInOutCubic(rOpen);
      const edge = `${(1 - eOpen) * 50}%`;
      const edgeOpacity =
        rOpen > 0 && rOpen < 1 ? String(Math.sin(Math.PI * rOpen) * 0.75) : "0";
      if (doorLRef.current) {
        doorLRef.current.style.left = edge;
        doorLRef.current.style.opacity = edgeOpacity;
      }
      if (doorRRef.current) {
        doorRRef.current.style.right = edge;
        doorRRef.current.style.opacity = edgeOpacity;
      }

      for (let j = 0; j < TOTAL; j++) {
        // stage 0 is the hero media itself; stages ≥1 open as doorways
        if (j >= 1) {
          const r = clamp(S - (j - 1));
          const e = easeInOutCubic(r);
          const push = clamp(S - j);
          const layer = layerRefs.current[j];
          const inner = innerRefs.current[j];
          const dim = dimRefs.current[j];

          if (layer) {
            const inset = (1 - e) * 50;
            layer.style.clipPath = `inset(0 ${inset}% 0 ${inset}%)`;
            layer.style.visibility = r <= 0 ? "hidden" : "visible";
          }
          if (inner) {
            // pseudo-3D "camera": the room swings in from an angle and settles
            const side = j % 2 === 0 ? 1 : -1;
            inner.style.transform = `scale(${1.28 - 0.28 * e + 0.07 * push}) rotateY(${side * (1 - e) * 7}deg) rotateX(calc(var(--py, 0) * -1.5deg)) rotateY(calc(var(--px, 0) * 2deg))`;
          }
          if (dim) dim.style.opacity = j < TOTAL - 1 ? String(0.55 * push) : "0";
        }

        // text
        const d = S - j;
        const v = clamp(1 - (Math.abs(d) - 0.15) / 0.35);
        const dir = d < 0 ? 1 : -1;

        const chapter = chapterRefs.current[j];
        if (chapter) chapter.style.visibility = v <= 0 ? "hidden" : "visible";

        const tag = tagRefs.current[j];
        if (tag) {
          tag.style.opacity = String(v);
          tag.style.transform = `translate3d(0, ${dir * (1 - v) * 16}px, 0)`;
        }

        const lineCount = SERVICES_DATA[j].lines.length;
        for (let l = 0; l < lineCount; l++) {
          const el = lineRefs.current[j * 4 + l];
          if (!el) continue;
          const vv = clamp(v * 1.3 - l * 0.18);
          el.style.transform = `translate3d(0, ${dir * (1 - vv) * 112}%, 0)`;
        }

        const info = infoRefs.current[j];
        if (info) {
          info.style.opacity = String(clamp(v * 1.2 - 0.2));
          info.style.transform = `translate3d(0, ${dir * (1 - v) * 20}px, 0)`;
          info.style.pointerEvents = v > 0.7 ? "auto" : "none";
        }

        const num = numRefs.current[j];
        if (num) {
          num.style.opacity = String(v);
          num.style.transform = `translate3d(0, ${dir * (1 - v) * 24}px, 0)`;
        }
      }

      // chrome (progress line / rail) only during stages
      const chromeOp = clamp((P - 3.9) / 0.4);
      if (chromeRef.current) chromeRef.current.style.opacity = String(chromeOp);
      const prog = clamp(S / (TOTAL - 1));
      if (barRef.current) barRef.current.style.transform = `scaleX(${prog})`;
      if (dotRef.current) dotRef.current.style.left = `${prog * 100}%`;

      const idx = S < -0.3 ? -1 : Math.min(TOTAL - 1, Math.max(0, Math.round(S)));
      if (idx !== activeIdx) {
        activeIdx = idx;
        setActive(idx);
      }
    };

    const computeTarget = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      target.v = clamp(-rect.top / total) * U;
    };

    const loop = () => {
      const kk = reduced ? 1 : 0.14;
      cur.v += (target.v - cur.v) * kk;
      if (Math.abs(target.v - cur.v) < 0.0005) {
        cur.v = target.v;
        render(cur.v);
        raf = 0;
        return;
      }
      render(cur.v);
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      computeTarget();
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      layout();
      kick();
    };

    const onMove = (e: MouseEvent) => {
      const st = stickyRef.current;
      if (!st) return;
      const r = st.getBoundingClientRect();
      st.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
      st.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    layout();
    computeTarget();
    cur.v = target.v;
    render(cur.v);
    // fonts change the headline wrap → re-measure the inline thumbnail slot
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        layout();
        render(cur.v);
      });
    }

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = useCallback((j: number) => {
    const el = containerRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + ((STAGE_START + j) / U) * total,
      behavior: "smooth",
    });
  }, []);

  const prev = () => setSlide((s) => (s - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  const next = () => setSlide((s) => (s + 1) % SLIDER_IMAGES.length);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme="light"
      aria-label="Our services"
      className="relative text-[#F5F0E7] transition-colors duration-500"
      style={{ backgroundColor: BG }}
    >
      <style>{`
        @keyframes svc-cue {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          #services .svc-cue-bar { animation: none !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative"
        style={{ height: `calc(100dvh + ${U * VH_PER_UNIT}dvh)` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen h-[100dvh] min-h-[100dvh] w-full overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: BG }}
        >
          {/* ======================= SCENE 3: marquee (behind media) ======================= */}
          <div
            ref={marqueeRef}
            aria-hidden="true"
            className="absolute left-0 top-1/2 z-[2] whitespace-nowrap select-none pointer-events-none text-[#171816] font-sans font-semibold tracking-[-0.06em] leading-none text-[clamp(110px,17vw,300px)]"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="inline-block pr-[0.35em]">
                RICHMAN INTERIORS
              </span>
            ))}
          </div>

          {/* ======================= SCENE 2: about (behind media) ======================= */}
          <div
            ref={aboutRef}
            className="absolute inset-x-0 top-[20%] z-[3] text-[#2B2927] will-change-transform"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <div className="relative px-6 sm:px-8 lg:pl-[18.7%] lg:pr-[3.5%]">
              {/* small section label, far left */}
              <div
                ref={aboutLabelRef}
                className="hidden lg:block absolute left-[50px] top-[0.55rem] font-sans text-[10.5px] uppercase tracking-[0.3em] text-[#2B2927]"
                style={{ opacity: 0 }}
              >
                Services
              </div>

              <h2 className="font-sans font-light tracking-[-0.045em] leading-[0.92] text-[clamp(28px,4.7vw,96px)]">
                {/* empty slot — the hero image lands here */}
                <span
                  ref={spacerRef}
                  aria-hidden="true"
                  className="inline-block mr-[0.14em]"
                  style={{ width: "1.95em", height: "0.92em", verticalAlign: "-0.06em" }}
                />
                {ABOUT_WORDS.map((w, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="inline-block mr-[0.2em] will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    {w}
                  </span>
                ))}
              </h2>

              {/* full-width rule under the headline */}
              <div
                ref={ruleRef}
                className="mt-4 h-px w-full origin-left bg-[#2B2927]"
                style={{ transform: "scaleX(0)" }}
              />

              {/* supporting paragraph */}
              <p
                ref={aboutTextRef}
                className="mt-8 max-w-[440px] font-sans text-[15px] sm:text-[17px] font-light leading-[1.55] tracking-[-0.01em] text-[#2B2927] will-change-transform"
                style={{ opacity: 0 }}
              >
                {ABOUT_TEXT}
              </p>
            </div>
          </div>

          {/* ======================= SCENE 1: scattered gallery ======================= */}
          <div
            ref={heroTitleRef}
            className="absolute left-[27%] top-[7%] z-[4] font-editorial font-light tracking-tight leading-[1.04] text-[clamp(34px,4.4vw,76px)] text-[#171816] pointer-events-none"
          >
            Interiors,
            <br />
            <em className="italic text-[#BE9B59]">considered.</em>
          </div>

          {SCATTER.map((c, i) => (
            <div
              key={i}
              ref={(el) => {
                scatterRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute z-[4] overflow-hidden rounded-[22px] shadow-[0_18px_50px_-18px_rgba(23,24,22,0.35)] will-change-transform pointer-events-none"
              style={{
                left: `${c.x}vw`,
                top: `${c.y}vh`,
                width: `${c.w}vw`,
                aspectRatio: String(c.ar),
                transform: `rotate(${c.rot}deg)`,
              }}
            >
              <Image
                src={c.img}
                alt=""
                fill
                sizes="30vw"
                quality={80}
                className="object-cover"
              />
            </div>
          ))}

          {/* scroll cue */}
          <div
            ref={cueRef}
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[6] flex items-center gap-4 pointer-events-none"
          >
            <span className="relative block h-12 w-px overflow-hidden bg-[#171816]/15">
              <span
                className="svc-cue-bar absolute inset-x-0 top-0 h-1/2 bg-[#BE9B59]"
                style={{ animation: "svc-cue 2.2s cubic-bezier(.65,0,.25,1) infinite" }}
              />
            </span>
            <span className="font-sans text-[10.5px] uppercase tracking-[0.3em] text-[#171816]/50">
              Scroll
            </span>
          </div>

          {/* ============ HERO MEDIA: slider → big → thumbnail → card → full screen ============ */}
          <div
            ref={mediaRef}
            className="absolute z-[9] overflow-hidden will-change-[left,top,width,height]"
            style={{ left: 0, top: 0, width: 0, height: 0, perspective: "1600px" }}
          >
            {/* slider images */}
            {SLIDER_IMAGES.map((src, i) => (
              <div
                key={i}
                aria-hidden={slide !== i}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: slide === i ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt={`RichMan Interiors Dubai project ${i + 1}`}
                  fill
                  sizes="100vw"
                  quality={90}
                  priority={i === 0}
                  className="object-cover object-center"
                />
              </div>
            ))}

            {/* stage 01 image — fades in while the media is the marquee card */}
            <div ref={stage0ImgRef} aria-hidden="true" className="absolute inset-0" style={{ opacity: 0 }}>
              <div ref={stage0InnerRef} className="absolute inset-0 will-change-transform">
                <Image
                  src={SERVICES_DATA[0].image}
                  alt={`${SERVICES_DATA[0].title} by RichMan Interiors Dubai`}
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div
              ref={mediaDimRef}
              className="absolute inset-0 bg-[#0c0d0b] pointer-events-none"
              style={{ opacity: 0 }}
            />

            {/* slider arrows */}
            <div
              ref={btnRef}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-3"
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F0E7] text-[#171816] transition-transform duration-300 hover:scale-105"
              >
                <ArrowIcon className="w-4 h-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F0E7] text-[#171816] transition-transform duration-300 hover:scale-105"
              >
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ======================= STAGES 02–06: doorway rooms ======================= */}
          {SERVICES_DATA.map((s, j) =>
            j === 0 ? null : (
              <div
                key={s.id}
                ref={(el) => {
                  layerRefs.current[j] = el;
                }}
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  zIndex: 10 + j,
                  clipPath: "inset(0 50% 0 50%)",
                  visibility: "hidden",
                  perspective: "1600px",
                }}
              >
                <div
                  ref={(el) => {
                    innerRefs.current[j] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: "scale(1.28)" }}
                >
                  <Image
                    src={s.image}
                    alt={`${s.title} by RichMan Interiors Dubai`}
                    fill
                    sizes="100vw"
                    quality={90}
                    className="object-cover object-center"
                  />
                </div>
                <div
                  ref={(el) => {
                    dimRefs.current[j] = el;
                  }}
                  className="absolute inset-0 bg-[#0c0d0b]"
                  style={{ opacity: 0 }}
                />
              </div>
            )
          )}

          {/* Door edge hairlines */}
          <div
            ref={doorLRef}
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px bg-[#BE9B59] z-[18] pointer-events-none"
            style={{ left: "50%", opacity: 0 }}
          />
          <div
            ref={doorRRef}
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px bg-[#BE9B59] z-[18] pointer-events-none"
            style={{ right: "50%", opacity: 0 }}
          />

          {/* Legibility gradients */}
          <div
            ref={gradBottomRef}
            aria-hidden="true"
            className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#0c0d0b]/80 via-[#0c0d0b]/10 to-transparent"
            style={{ opacity: 0 }}
          />
          <div
            ref={gradTopRef}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1/3 z-20 pointer-events-none bg-gradient-to-b from-[#0c0d0b]/45 to-transparent"
            style={{ opacity: 0 }}
          />

          {/* ======================= Chapters (text per stage) ======================= */}
          {SERVICES_DATA.map((s, j) => {
            const isActive = active === j;
            return (
              <div
                key={s.id}
                ref={(el) => {
                  chapterRefs.current[j] = el;
                }}
                aria-hidden={!isActive}
                className="absolute inset-0 z-30 pointer-events-none"
                style={{ visibility: "hidden" }}
              >
                <div className="absolute inset-x-0 bottom-0 px-6 sm:px-8 lg:px-[50px] pb-[72px]">
                  <div className="flex items-end justify-between gap-8">
                    {/* Left: tag, title, subtitle */}
                    <div className="min-w-0">
                      <div
                        ref={(el) => {
                          tagRefs.current[j] = el;
                        }}
                        className="mb-4 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F5F0E7]/75"
                      >
                        <span className="h-px w-8 bg-[#F5F0E7]/60" />
                        <span>{s.tag}</span>
                      </div>

                      <h3 className="font-sans font-normal tracking-[-0.035em] leading-[1.02] text-[#F5F0E7] text-[clamp(36px,4.6vw,84px)]">
                        {s.lines.map((ln, l) => (
                          <span key={l} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                            <span
                              ref={(el) => {
                                lineRefs.current[j * 4 + l] = el;
                              }}
                              className="block will-change-transform"
                              style={{ transform: "translate3d(0,112%,0)" }}
                            >
                              {ln}
                            </span>
                          </span>
                        ))}
                      </h3>

                      <div
                        ref={(el) => {
                          infoRefs.current[j] = el;
                        }}
                        style={{ opacity: 0 }}
                      >
                        <p className="mt-5 font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-[#F5F0E7]/85">
                          {s.subtitle}
                        </p>
                        {/* full description stays in the DOM for SEO / screen readers */}
                        <p className="sr-only">{s.description}</p>
                        <Link
                          href={s.href}
                          onClick={resetScroll}
                          tabIndex={isActive ? 0 : -1}
                          className="group/cta mt-4 inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.22em] text-[#F5F0E7] hover:text-[#BE9B59] transition-colors duration-300 focus:outline-none focus-visible:text-[#BE9B59]"
                        >
                          <span className="border-b border-current pb-0.5">{s.cta}</span>
                          <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-500 group-hover/cta:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: big stage number */}
                    <div
                      ref={(el) => {
                        numRefs.current[j] = el;
                      }}
                      aria-hidden="true"
                      className="shrink-0 text-right text-[#F5F0E7]"
                    >
                      <div className="font-sans font-light tabular-nums tracking-[-0.05em] leading-[0.85] text-[clamp(64px,7.2vw,140px)]">
                        {s.id}
                      </div>
                      <div className="mt-3 font-sans text-[10.5px] uppercase tracking-[0.25em] text-[#F5F0E7]/70">
                        of {pad(TOTAL)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ======================= Chrome: progress line + right dot rail ======================= */}
          <div ref={chromeRef} className="absolute inset-0 z-40 pointer-events-none" style={{ opacity: 0 }}>
            {/* right vertical rail */}
            <nav
              aria-label="Services index"
              className="hidden lg:flex absolute right-[50px] top-1/2 -translate-y-1/2 flex-col items-center gap-[26px]"
              style={{ pointerEvents: active >= 0 ? "auto" : "none" }}
            >
              <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#F5F0E7]/25" />
              {SERVICES_DATA.map((s, j) => {
                const on = active === j;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(j)}
                    aria-label={`Go to ${s.title}`}
                    aria-current={on ? "true" : undefined}
                    className="relative flex h-5 w-5 items-center justify-center cursor-pointer focus:outline-none"
                  >
                    <span
                      className="block rounded-full transition-all duration-500"
                      style={{
                        width: on ? 18 : 9,
                        height: on ? 18 : 9,
                        background: on ? "#F5F0E7" : "rgba(12,13,11,0.35)",
                        border: on ? "1px solid #F5F0E7" : "1px solid rgba(245,240,231,0.6)",
                        boxShadow: on ? "0 0 14px rgba(245,240,231,0.55)" : "none",
                      }}
                    />
                  </button>
                );
              })}
            </nav>

            {/* bottom progress line with ticks and a moving dot */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-7 px-6 sm:px-8 lg:px-[50px]">
              <div className="relative h-3">
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#F5F0E7]/25" />
                <div
                  ref={barRef}
                  className="absolute inset-x-0 top-1/2 h-px origin-left bg-[#F5F0E7]"
                  style={{ transform: "scaleX(0)" }}
                />
                {SERVICES_DATA.map((s, j) => (
                  <span
                    key={s.id}
                    className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-[#F5F0E7]/45"
                    style={{ left: `${(j / (TOTAL - 1)) * 100}%` }}
                  />
                ))}
                <div
                  ref={dotRef}
                  className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5F0E7] shadow-[0_0_10px_rgba(245,240,231,0.6)]"
                  style={{ left: "0%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}