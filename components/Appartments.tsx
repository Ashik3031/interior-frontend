"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

/* ---------- design tokens (inferred; tweak freely) ---------- */
const SERIF = "font-[family-name:var(--font-serif)]";
const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";
const SAND = "#EFEAE1";
const INK = "#1D1B18";

/* ---------- data ---------- */
type Typology = "Ground floor + basement" | "Ground Floor" | "Penthouse duplex";
interface Apt { id: string; typ: Typology; block: string; floor: number; beds: 2 | 3; area: number; terrace: number }
const GB: Typology = "Ground floor + basement", GF: Typology = "Ground Floor", PH: Typology = "Penthouse duplex";
const rows: [string, Typology, string, number, 2 | 3, number, number][] = [
    ["011", GB, "B1", 0, 3, 132, 29], ["012", GB, "B1", 0, 3, 132, 29],
    ["031", GB, "B3", 0, 3, 134, 44], ["032", GB, "B3", 0, 3, 134, 44],
    ["033", GB, "B3", 0, 3, 134, 44], ["034", GB, "B3", 0, 3, 134, 45],
    ["111", GF, "B1", 1, 2, 75, 29], ["112", GF, "B1", 1, 2, 75, 29], ["113", GF, "B1", 1, 2, 75, 29],
    ["114", PH, "B1", 1, 3, 89, 151],
    ["121", GF, "B2", 0, 2, 75, 29], ["122", GF, "B2", 0, 2, 75, 29],
    ["123", GF, "B2", 0, 2, 75, 29], ["124", GF, "B2", 0, 2, 75, 29],
    ["131", PH, "B3", 1, 2, 60, 64], ["132", PH, "B3", 1, 2, 60, 64],
    ["133", PH, "B3", 1, 2, 60, 64], ["134", PH, "B3", 1, 2, 67, 71],
    ["211", PH, "B1", 2, 2, 60, 61], ["212", PH, "B1", 2, 2, 60, 61], ["213", PH, "B1", 2, 2, 60, 62],
    ["221", PH, "B2", 1, 2, 60, 61], ["222", PH, "B2", 1, 2, 60, 61],
    ["223", PH, "B2", 1, 2, 60, 61], ["224", PH, "B2", 1, 2, 60, 62],
];
const APTS: Apt[] = rows.map(([id, typ, block, floor, beds, area, terrace]) => ({ id, typ, block, floor, beds, area, terrace }));
const TYPS = ["All", GB, GF, PH] as const;
const BEDS = ["All", "2", "3"] as const;
const SORTS = ["Relevant", "Smallest area", "Largest area"] as const;

const BLOCKS = [
    { t: "Boutique concept", d: "A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.", img: "/images/exterior-1.jpg" },
    { t: "Built to stay", d: "Drawing on the spirit of Marbella's golden age, the design blends modern architecture with natural materials, lush landscaping and thoughtfully crafted spaces.", img: "/images/terrace-view-2.jpg" },
    { t: "Industrial finishing", d: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.", img: "/images/ground-floor-2.webp" },
];

/* ---------- hooks ---------- */
function useInView<T extends HTMLElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return [ref, seen] as const;
}

function useCountTo(target: number, duration = 700) {
    const [v, setV] = useState(target);
    const from = useRef(target);
    useEffect(() => {
        const start = performance.now(), a = from.current;
        let raf = 0;
        const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            setV(Math.round(a + (target - a) * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick); else from.current = target;
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);
    return v;
}

/* ---------- small parts ---------- */
function Dropdown<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);
    return (
        <div ref={ref} className="relative min-w-[180px]">
            <p className="era-eyebrow mb-2">{label}</p>
            <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between border-b border-[#1D1B18]/30 pb-2 text-left text-sm">
                {value}
                <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" />
                </svg>
            </button>
            <ul className={`absolute left-0 top-full z-20 mt-2 w-full origin-top bg-[#EFEAE1] shadow-xl ring-1 ring-[#1D1B18]/15 transition-all duration-300 ${EASE} ${open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"}`}>
                {options.map((o) => (
                    <li key={o}>
                        <button onClick={() => { onChange(o); setOpen(false); }}
                            className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#1D1B18] hover:text-[#EFEAE1] ${o === value ? "opacity-40" : ""}`}>{o}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Card({ a, i }: { a: Apt; i: number }) {
    const [ref, seen] = useInView<HTMLAnchorElement>(0.1);
    return (
        <Link ref={ref} href={`/apartments/${a.id}`} style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            className={`group relative flex min-h-[320px] flex-col justify-between border border-[#1D1B18]/15 p-6 transition-all duration-[900ms] ${EASE}
      hover:bg-[#1D1B18] hover:text-[#EFEAE1] ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="flex items-start justify-between">
                <span className="era-eyebrow !opacity-100">{a.typ}</span>
                <span className="era-eyebrow">Completion: 4Q 2026</span>
            </div>
            {/* floor-plan placeholder: replace with your plan image */}
            <div className="my-6 flex flex-1 items-center justify-center">
                <div className={`h-24 w-36 border border-current opacity-20 transition-all duration-700 ${EASE} group-hover:scale-110 group-hover:opacity-50`} />
            </div>
            <div>
                <div className="flex items-end justify-between">
                    <h3 className={`${SERIF} text-5xl font-light`}>№{a.id}</h3>
                    <div className="text-right text-xs opacity-70"><p>Block {a.block}</p><p>{a.floor} floor</p></div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-current/20 pt-4 text-sm">
                    <span>{a.beds} bed / {a.area} m²</span>
                    <span className="opacity-70">+ {a.terrace} M² Terrace</span>
                </div>
            </div>
            <span className={`absolute right-6 top-1/2 -translate-y-1/2 translate-x-3 text-2xl opacity-0 transition-all duration-500 ${EASE} group-hover:translate-x-0 group-hover:opacity-100`}>→</span>
        </Link>
    );
}

function InfoBlock({ b, i }: { b: (typeof BLOCKS)[number]; i: number }) {
    const [ref, seen] = useInView<HTMLDivElement>(0.2);
    return (
        <div ref={ref} className={`grid items-center gap-8 md:grid-cols-2 md:gap-20 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="overflow-hidden">
                <div className={`aspect-[4/5] w-full bg-[#B9A98F]/40 bg-cover bg-center transition-all duration-[1400ms] ${EASE} ${seen ? "scale-100 [clip-path:inset(0)]" : "scale-110 [clip-path:inset(100%_0_0_0)]"}`}
                    style={{ backgroundImage: `url(${b.img})` }} />
            </div>
            <div className={`transition-all delay-200 duration-1000 ${EASE} ${seen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <h3 className={`${SERIF} text-4xl font-light md:text-6xl`}>{b.t}</h3>
                <p className="mt-6 max-w-md text-sm leading-relaxed opacity-70">{b.d}</p>
            </div>
        </div>
    );
}

function Preloader() {
    const [phase, setPhase] = useState<"in" | "out" | "done">("in");
    useEffect(() => {
        const a = setTimeout(() => setPhase("out"), 1800), b = setTimeout(() => setPhase("done"), 2600);
        return () => { clearTimeout(a); clearTimeout(b); };
    }, []);
    if (phase === "done") return null;
    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#1D1B18] px-6 py-10 text-[#EFEAE1] transition-transform duration-[800ms] ${EASE} ${phase === "out" ? "-translate-y-full" : ""}`}>
            <div className="era-eyebrow flex w-full justify-between !opacity-70"><span>Costa</span><span>Estepona</span><span>del Sol</span></div>
            <div className="text-center">
                <h1 className={`era-rise ${SERIF} text-6xl font-light leading-[.95] md:text-8xl`}>Era<br />Residence</h1>
                <p className="era-rise mt-6 text-sm opacity-70" style={{ animationDelay: ".4s" }}>A place to return to.</p>
            </div>
            <div className="h-px w-40 overflow-hidden bg-[#EFEAE1]/20"><div className="era-bar h-full w-full origin-left bg-[#EFEAE1]" /></div>
        </div>
    );
}

function Header({ onBook }: { onBook: () => void }) {
    const [menu, setMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 20);
        on(); window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, []);
    useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);
    const links = [{ l: "Home", h: "/" }, { l: "Select an Apartment", h: "/apartments" }, { l: "Book a call", h: "#" }, { l: "Contact", h: "/contact" }];
    return (
        <>
            <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "bg-[#EFEAE1]/90 backdrop-blur" : ""}`}>
                <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
                    <Link href="/" className={`${SERIF} text-2xl tracking-wide`}>Era</Link>
                    <div className="hidden items-center gap-8 text-sm md:flex">
                        <Link href="/apartments" className="era-link">Select an Apartment</Link>
                        <button onClick={onBook} className="era-link">Book a call</button>
                    </div>
                    <button onClick={() => setMenu(true)} className="text-sm uppercase tracking-widest">Menu</button>
                </div>
            </header>
            <div className={`fixed inset-0 z-50 bg-[#1D1B18] text-[#EFEAE1] transition-[clip-path] duration-[900ms] ${EASE} ${menu ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}>
                <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
                    <span className={`${SERIF} text-2xl`}>Era</span>
                    <button onClick={() => setMenu(false)} className="text-sm uppercase tracking-widest">Close</button>
                </div>
                <nav className="flex h-[calc(100%-4rem)] flex-col justify-center gap-2 px-5 md:px-10">
                    {links.map((it, i) => (
                        <div key={it.l} className="overflow-hidden">
                            <Link href={it.h} onClick={(e) => { setMenu(false); if (it.l === "Book a call") { e.preventDefault(); onBook(); } }}
                                style={{ transitionDelay: menu ? `${300 + i * 80}ms` : "0ms" }}
                                className={`${SERIF} block text-5xl font-light transition-transform duration-[900ms] ${EASE} hover:italic md:text-8xl ${menu ? "translate-y-0" : "translate-y-full"}`}>{it.l}</Link>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
}

function BookModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
    useEffect(() => {
        const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose]);
    useEffect(() => { if (!open) { const t = setTimeout(() => setStatus("idle"), 500); return () => clearTimeout(t); } }, [open]);
    async function submit(e: React.FormEvent) {
        e.preventDefault(); setStatus("sending");
        try { await new Promise((r) => setTimeout(r, 900)); /* TODO: call your API */ setStatus("ok"); } catch { setStatus("error"); }
    }
    const f = "w-full border-b border-[#1D1B18]/30 bg-transparent py-3 text-sm outline-none transition-colors focus:border-[#1D1B18]";
    return (
        <div className={`fixed inset-0 z-[60] transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            <div className="absolute inset-0 bg-[#1D1B18]/50" onClick={onClose} />
            <aside className={`absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto bg-[#EFEAE1] p-8 transition-transform duration-[800ms] ${EASE} md:p-12 ${open ? "translate-x-0" : "translate-x-full"}`}>
                <button onClick={onClose} className="absolute right-6 top-6 text-sm uppercase tracking-widest">Close</button>
                {status === "ok" ? (
                    <div className="era-fade flex h-full flex-col justify-center">
                        <h2 className={`${SERIF} text-5xl font-light`}>Thank you</h2>
                        <p className={`${SERIF} mt-2 text-2xl italic`}>We’ve received your request</p>
                        <p className="mt-6 text-sm opacity-70">Our sales manager will review your message and respond personally. We typically reply within one business day.</p>
                    </div>
                ) : (
                    <form onSubmit={submit} className="mt-10 space-y-8">
                        <div>
                            <h2 className={`${SERIF} text-5xl font-light`}>Book a call</h2>
                            <p className="mt-3 text-sm opacity-70">Leave your details and we will get back to you within 24 hours.</p>
                        </div>
                        <label className="block"><span className="era-eyebrow">Name:</span><input required name="name" className={f} /></label>
                        <label className="block"><span className="era-eyebrow">Email:</span><input required type="email" name="email" className={f} /></label>
                        <label className="block"><span className="era-eyebrow">Phone:</span><input required type="tel" name="phone" className={f} /></label>
                        <label className="block"><span className="era-eyebrow">Message:</span><textarea name="message" rows={3} className={f} /></label>
                        <p className="text-xs opacity-60">By submitting, you agree to our <a className="era-link" href="#">Privacy policy</a>,</p>
                        <button disabled={status === "sending"} className="w-full bg-[#1D1B18] py-4 text-sm text-[#EFEAE1] transition-opacity hover:opacity-85 disabled:opacity-50">
                            {status === "sending" ? "Sending…" : "Submit"}
                        </button>
                        {status === "error" && <p className="text-sm text-red-700">Oops! Something went wrong while submitting the form.</p>}
                    </form>
                )}
            </aside>
        </div>
    );
}

function Cookies() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        try { if (localStorage.getItem("era-cookies")) return; } catch { }
        const t = setTimeout(() => setShow(true), 3000);
        return () => clearTimeout(t);
    }, []);
    const choose = (v: string) => { try { localStorage.setItem("era-cookies", v); } catch { } setShow(false); };
    return (
        <div className={`fixed bottom-4 left-4 z-30 w-[calc(100%-2rem)] max-w-sm bg-[#1D1B18] p-5 text-[#EFEAE1] transition-all duration-700 ${EASE} ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}>
            <p className="era-eyebrow !opacity-100">Cookies</p>
            <p className="mt-2 text-sm opacity-80">This website uses cookies to ensure you get the best experience on website.</p>
            <div className="mt-4 flex gap-3 text-sm">
                <button onClick={() => choose("accept")} className="bg-[#EFEAE1] px-4 py-2 text-[#1D1B18]">Accept</button>
                <span className="self-center opacity-40">/</span>
                <button onClick={() => choose("decline")} className="era-link">Decline</button>
            </div>
        </div>
    );
}

/* ---------- page ---------- */
export default function Apartments() {
    const [typ, setTyp] = useState<(typeof TYPS)[number]>("All");
    const [beds, setBeds] = useState<(typeof BEDS)[number]>("All");
    const [sort, setSort] = useState<(typeof SORTS)[number]>("Relevant");
    const [booking, setBooking] = useState(false);
    const [ctaRef, ctaSeen] = useInView<HTMLElement>(0.2);

    const list = useMemo(() => {
        let r = APTS.filter((a) => (typ === "All" || a.typ === typ) && (beds === "All" || String(a.beds) === beds));
        if (sort === "Smallest area") r = [...r].sort((a, b) => a.area - b.area);
        if (sort === "Largest area") r = [...r].sort((a, b) => b.area - a.area);
        return r;
    }, [typ, beds, sort]);
    const count = useCountTo(list.length);
    const dirty = typ !== "All" || beds !== "All" || sort !== "Relevant";

    return (
        <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#EFEAE1] font-[family-name:var(--font-sans)] text-[#1D1B18] antialiased`}>
            <style>{`
        .era-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.18em;opacity:.6}
        .era-link{position:relative;display:inline-block}
        .era-link::after{content:"";position:absolute;left:0;bottom:-2px;height:1px;width:100%;background:currentColor;transform:scaleX(0);transform-origin:right;transition:transform .5s cubic-bezier(.22,1,.36,1)}
        .era-link:hover::after{transform:scaleX(1);transform-origin:left}
        @keyframes era-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes era-fade{from{opacity:0}to{opacity:1}}
        @keyframes era-bar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        .era-rise{animation:era-rise .9s cubic-bezier(.22,1,.36,1) both}
        .era-fade{animation:era-fade .6s ease both}
        .era-bar{animation:era-bar 1.7s ease-out forwards}
        html{scroll-behavior:smooth}
      `}</style>

            <Preloader />
            <Header onBook={() => setBooking(true)} />

            {/* Title + filters */}
            <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-32 md:px-10">
                <nav className="era-eyebrow mb-8 flex gap-2"><Link href="/" className="era-link">Home</Link> / <span>Select an Apartment</span></nav>
                <div className="flex items-start gap-3">
                    <h1 className={`era-rise ${SERIF} text-6xl font-light md:text-9xl`}>Apartments</h1>
                    <sup className={`${SERIF} mt-3 text-2xl md:text-4xl`}>{count}</sup>
                </div>
                <div className="mt-12 flex flex-wrap items-end gap-8 md:gap-12">
                    <Dropdown label="Typology" value={typ} options={TYPS} onChange={setTyp} />
                    <Dropdown label="Bedrooms" value={beds} options={BEDS} onChange={setBeds} />
                    <Dropdown label="Sort by" value={sort} options={SORTS} onChange={setSort} />
                    <button onClick={() => { setTyp("All"); setBeds("All"); setSort("Relevant"); }} disabled={!dirty}
                        className="era-link pb-2 text-sm transition-opacity disabled:pointer-events-none disabled:opacity-30">Reset</button>
                </div>
            </section>

            {/* Grid */}
            <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
                {list.length ? (
                    <div key={`${typ}-${beds}-${sort}`} className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                        {list.map((a, i) => <Card key={a.id} a={a} i={i} />)}
                    </div>
                ) : (
                    <div className="era-fade py-32 text-center">
                        <p className={`${SERIF} text-4xl`}>nothing found</p>
                        <p className="mt-3 text-sm opacity-60">We didn&apos;t find anything for your request. Please, try changing your search settings</p>
                    </div>
                )}
            </section>

            {/* Info blocks */}
            <section className="mx-auto flex max-w-[1600px] flex-col gap-24 px-5 py-24 md:gap-40 md:px-10">
                {BLOCKS.map((b, i) => <InfoBlock key={b.t} b={b} i={i} />)}
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="relative overflow-hidden bg-[#1D1B18] px-5 py-32 text-[#EFEAE1] md:px-10">
                <video className="absolute inset-0 h-full w-full object-cover opacity-30" src="/flowers/bougainvillea-flowers_05.webm" autoPlay muted loop playsInline />
                <div className={`relative mx-auto max-w-3xl text-center transition-all duration-1000 ${EASE} ${ctaSeen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                    <p className="mx-auto max-w-xl text-sm leading-relaxed opacity-80">A short conversation is enough to understand which apartment fits your use case — whether it is a family second home, a longer stay, or a place to return to year after year.</p>
                    <h2 className={`${SERIF} mt-12 text-5xl font-light md:text-8xl`}>Perfect sea views</h2>
                    <h3 className={`${SERIF} mt-3 text-2xl italic opacity-70 md:text-3xl`}>From rooftop terraces</h3>
                    <Link href="/apartments" className="mt-12 inline-block border border-[#EFEAE1]/60 px-8 py-4 text-sm transition-colors duration-500 hover:bg-[#EFEAE1] hover:text-[#1D1B18]">View available apartments</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
                <div className="grid gap-12 md:grid-cols-3">
                    <div>
                        <a href="tel:+34655408648" className={`era-link ${SERIF} text-3xl`}>+34 (655) 408-648</a>
                        <div className="mt-6 flex gap-5 text-sm">
                            <a className="era-link" href="https://www.linkedin.com/company/eraresidenceestepona/">LinkedIn</a>
                            <a className="era-link" href="https://www.facebook.com/era.residence.estepona">Facebook</a>
                            <a className="era-link" href="https://www.instagram.com/era.residence.estepona">Instagram</a>
                        </div>
                    </div>
                    <div>
                        <p className="era-eyebrow">Sales Office</p>
                        <a className="era-link mt-3 text-sm" href="https://maps.app.goo.gl/EzyfT2M6vR5aBdMu9">Avenida Litoral, 29680 Estepona, Málaga, Spain</a>
                    </div>
                    <div className={`${SERIF} text-6xl font-light md:text-right`}>Era Residence.</div>
                </div>
                <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-[#1D1B18]/15 pt-6 text-xs opacity-70">
                    <span>©2026 All rights reserved</span>
                    <span className="flex gap-3"><a className="era-link" href="#">Privacy policy</a>,<a className="era-link" href="#">Terms of Use</a></span>
                    <span>Made by <a className="era-link" href="https://thefirstthelast.agency/">Thefirstthelast</a></span>
                </div>
            </footer>

            <BookModal open={booking} onClose={() => setBooking(false)} />
            <Cookies />
        </div>
    );
}