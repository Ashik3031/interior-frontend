"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Content & Configuration                                           */
/* ------------------------------------------------------------------ */

// Hero background image (Unsplash link - replace later with atelier photography)
const CONTACT_HERO_BG =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85";

const PHONE_DISPLAY = "+971 4 321 8899";
const PHONE_LINK = "tel:+97143218899";
const EMAIL_CONCIERGE = "concierge@richmaninteriors.ae";
const EMAIL_LINK = "mailto:concierge@richmaninteriors.ae";

interface StudioLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  district: string;
  city: string;
  hours: string;
  phone: string;
  email: string;
  valet: string;
  mapQuery: string;
  image: string;
  badge: string;
}

const STUDIOS: StudioLocation[] = [
  {
    id: "al-quoz",
    name: "Al Quoz Atelier & Workshops",
    tagline: "Primary Design Studio, Material Library & Joinery Atelier",
    address: "Warehouse 14, Street 18B, Al Quoz Industrial Area 3",
    district: "Al Quoz 3",
    city: "Dubai, United Arab Emirates",
    hours: "Monday – Saturday: 9:00 AM – 7:00 PM (By appointment)",
    phone: "+971 4 321 8899",
    email: "atelier@richmaninteriors.ae",
    valet: "Private atelier courtyard parking with complimentary valet",
    mapQuery: "Al+Quoz+Industrial+Area+3+Dubai",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    badge: "Primary Atelier & Workshop",
  },
  {
    id: "downtown",
    name: "Downtown Private Client Suite",
    tagline: "Private Salon for Villa & Penthouse Investors",
    address: "Level 42, Boulevard Plaza Tower 1, Sheikh Mohammed bin Rashid Blvd",
    district: "Downtown Dubai",
    city: "Dubai, United Arab Emirates",
    hours: "Monday – Friday: 10:00 AM – 8:00 PM (Strictly by appointment)",
    phone: "+971 4 321 8890",
    email: "concierge@richmaninteriors.ae",
    valet: "Tower 1 VIP Valet with dedicated concierge escort",
    mapQuery: "Boulevard+Plaza+Tower+1+Downtown+Dubai",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    badge: "Investor & VIP Suite",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi Client Suite",
    tagline: "Private Advisory for Capital Estates & Palaces",
    address: "Al Khatem Tower, Level 28, ADGM Square, Al Maryah Island",
    district: "Al Maryah Island",
    city: "Abu Dhabi, United Arab Emirates",
    hours: "Tuesday – Saturday: 10:00 AM – 6:00 PM (By appointment)",
    phone: "+971 2 642 7700",
    email: "abudhabi@richmaninteriors.ae",
    valet: "ADGM Square North VIP Parking & Valet",
    mapQuery: "Al+Khatem+Tower+ADGM+Square+Abu+Dhabi",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791979419/pexels-shkrabaanthony-6322363_gbwg6f.jpg",
    badge: "Capital Advisory",
  },
];

const HERO_FACTS = [
  { label: "Response", value: "Within 4 business hours" },
  { label: "Privacy", value: "Strict NDA guaranteed" },
  { label: "Locations", value: "Dubai · Abu Dhabi · Global" },
];

const DIRECT_CHANNELS = [
  {
    role: "Private Client Director",
    scope: "Villa Estates, Penthouses & Private Residences",
    desc: "Direct partner oversight for signature residential commissions, turnkey renovations, and bespoke architectural interior architecture.",
    email: "clientdirector@richmaninteriors.ae",
    phone: "+971 4 321 8899",
  },
  {
    role: "Technical & Fit-Out Director",
    scope: "MEP Execution, Municipality & Approvals",
    desc: "In-house engineering, Dubai Municipality / DDA / Civil Defence permit coordination, structural fit-out, and site execution.",
    email: "technical@richmaninteriors.ae",
    phone: "+971 4 321 8891",
  },
  {
    role: "Material & Joinery Procurement",
    scope: "Stone Quarries, French Oak & Bespoke Brass",
    desc: "Direct quarry sourcing in Carrara and Tivoli, European millwork, custom bronze casting, and master artisan trade partnerships.",
    email: "procurement@richmaninteriors.ae",
    phone: "+971 4 321 8892",
  },
  {
    role: "Press & Communications",
    scope: "Monograph Publications & Media Inquiries",
    desc: "High-resolution architectural photography, press dossiers, editorial interviews, and design monograph features.",
    email: "press@richmaninteriors.ae",
    phone: "+971 4 321 8895",
  },
];

const FAQS = [
  {
    question: "Do I need an advance appointment to visit the Al Quoz Atelier?",
    answer:
      "Yes. Because we maintain strict client confidentiality and our senior partners personally host material reviews, atelier tours and material library sessions are scheduled by appointment. You can request a visit through this page or by contacting our concierge desk.",
  },
  {
    question: "Do you undertake residential commissions outside Dubai?",
    answer:
      "Yes. While Dubai and Abu Dhabi represent the core of our turnkey fit-out commissions, our design and project management teams regularly steward private villas, estates, and penthouses in Riyadh, Doha, London, and Southern Europe.",
  },
  {
    question: "How quickly can an initial on-site walkthrough be scheduled?",
    answer:
      "Following your introductory consultation or inquiry review, an on-site walkthrough with a Design Director is typically scheduled within 48 to 72 hours across Dubai and Abu Dhabi.",
  },
  {
    question: "How do you handle confidential projects and non-disclosure agreements?",
    answer:
      "Discretion is fundamental to our practice. We routinely execute bilateral non-disclosure agreements prior to reviewing architectural drawings, floor plans, or property addresses for private families, royal offices, and prominent figures.",
  },
];

/* ------------------------------------------------------------------ */
/*  Form Helper Components                                            */
/* ------------------------------------------------------------------ */

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-deep-charcoal/15 py-3.5 font-sans text-sm">
      <dt className="text-deep-charcoal/50">{label}</dt>
      <dd className="text-right font-medium text-deep-charcoal">{children}</dd>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 20"
      className="h-3 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M0 10h56M47 1l9 9-9 9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [activeStudio, setActiveStudio] = useState<string>("al-quoz");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dubaiTime, setDubaiTime] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formTopRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Live Dubai Time Clock (GST / GMT+4)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setDubaiTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate swift submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      formTopRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => headingRef.current?.focus(), 250);
    }, 700);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    formTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const currentStudio = STUDIOS.find((s) => s.id === activeStudio) || STUDIOS[0];

  const primaryBtn =
    "inline-flex items-center gap-3 rounded-full bg-deep-charcoal px-8 py-4 font-sans text-sm font-medium text-warm-ivory transition-colors duration-300 hover:bg-champagne-gold hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold disabled:opacity-50 cursor-pointer";
  const backBtn =
    "font-sans text-sm text-deep-charcoal/70 underline-offset-4 transition-colors hover:text-deep-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold cursor-pointer";

  return (
    <main className="bg-white text-deep-charcoal selection:bg-champagne-gold selection:text-deep-charcoal">
      {/* Keyframe Animations */}
      <style>{`
        @keyframes lineIn { from { transform: translateY(110%); } }
        @keyframes stepIn { from { opacity: 0; transform: translateY(12px); } }
        @media (prefers-reduced-motion: no-preference) {
          .line-in { animation: lineIn 1.1s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
          .step-in { animation: stepIn .5s cubic-bezier(.22,1,.36,1) both; }
        }
      `}</style>

      {/* ============ 1. HERO SECTION ============ */}
      <section
        data-theme="dark"
        aria-labelledby="contact-heading"
        className="relative isolate overflow-hidden px-6 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-24 lg:pt-44 text-warm-ivory"
      >
        {/* Background Hero Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src={CONTACT_HERO_BG}
            alt="RichMan Interiors Atelier & Concierge Dubai"
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

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <p className="flex items-center gap-2.5 font-sans text-sm text-warm-ivory/80">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            Atelier &amp; Concierge
          </p>

          <h1
            id="contact-heading"
            className="mt-8 font-serif text-[clamp(44px,7vw,120px)] font-light uppercase leading-[0.95] tracking-tight text-warm-ivory"
          >
            {[
              { t: "Start a", indent: "" },
              { t: "conversation", indent: "lg:ml-[6vw]" },
              { t: "with us", indent: "lg:ml-[2vw]" },
            ].map((l, i) => (
              <span key={l.t} className={`block overflow-hidden pb-[0.08em] ${l.indent}`}>
                <span
                  className="line-in block"
                  style={{ "--d": `${100 + i * 120}ms` } as React.CSSProperties}
                >
                  {l.t}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
            <div className="max-w-xl font-sans text-base leading-relaxed text-warm-ivory/85 lg:col-span-5 lg:text-lg">
              <p>
                Whether planning a bespoke private residence, exploring a turnkey villa renovation or arranging a private material library consultation, our team is ready to guide you through every stage with personalised attention and complete discretion.
              </p>

              {/* Direct channels */}
              <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-white/15 text-sm">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-warm-ivory/60">
                    Direct Client Desk
                  </span>
                  <a
                    href={PHONE_LINK}
                    className="font-serif text-xl text-warm-ivory hover:text-champagne-gold transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div className="h-8 w-px bg-white/15 hidden sm:block" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-warm-ivory/60">
                    Confidential Concierge
                  </span>
                  <a
                    href={EMAIL_LINK}
                    className="font-serif text-xl text-warm-ivory hover:text-champagne-gold transition-colors"
                  >
                    {EMAIL_CONCIERGE}
                  </a>
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              {HERO_FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="font-sans text-sm text-warm-ivory/60">{f.label}</dt>
                  <dd className="mt-2 font-serif text-xl sm:text-2xl text-warm-ivory">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 2. SIMPLE INQUIRY FORM & LIVE ATELIER SIDEBAR (White) ============ */}
      <section
        data-theme="light"
        aria-label="Direct inquiry console"
        className="bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-32"
      >
        <div ref={formTopRef} className="mx-auto max-w-[1400px] scroll-mt-28">
          {isSubmitted ? (
            /* ----- Confirmation Message ----- */
            <div className="step-in mx-auto max-w-xl py-6">
              <p className="font-sans text-sm text-champagne-gold">Message sent</p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-4 font-serif text-4xl font-light uppercase leading-[1] tracking-tight outline-none sm:text-5xl"
              >
                Thank you{formData.fullName ? `, ${formData.fullName.split(" ")[0]}` : ""}.
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-deep-charcoal/75">
                We have received your message. A member of our concierge team will reach out to you within four business hours.
              </p>

              <dl className="mt-8 border-b border-deep-charcoal/15">
                <SummaryRow label="Name">{formData.fullName}</SummaryRow>
                <SummaryRow label="Email">{formData.email}</SummaryRow>
                {formData.phone && <SummaryRow label="Phone">{formData.phone}</SummaryRow>}
                {formData.subject && <SummaryRow label="Subject">{formData.subject}</SummaryRow>}
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button type="button" onClick={resetForm} className={primaryBtn}>
                  Send another message
                </button>
                <Link href="/" className={backBtn}>
                  Return to home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-16 items-start">
              {/* ----- Form Column (7 cols) - CLEAN & SIMPLE ----- */}
              <div className="lg:col-span-7">
                <div className="border-b border-deep-charcoal/15 pb-8 mb-8">
                  <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">
                    Send us a message
                  </h2>
                  <p className="mt-3 font-sans text-base text-deep-charcoal/65">
                    Have a project in mind or an inquiry for our team? Leave your details below and we will be in touch shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block font-sans text-xs uppercase tracking-wider text-deep-charcoal/80 font-medium mb-2"
                      >
                        Your Name <span className="text-champagne-gold">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full border-b border-deep-charcoal/35 bg-transparent py-3 font-sans text-base text-deep-charcoal font-medium placeholder:text-deep-charcoal/60 placeholder:font-normal focus:border-deep-charcoal focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-sans text-xs uppercase tracking-wider text-deep-charcoal/80 font-medium mb-2"
                      >
                        Email Address <span className="text-champagne-gold">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@domain.com"
                        className="w-full border-b border-deep-charcoal/35 bg-transparent py-3 font-sans text-base text-deep-charcoal font-medium placeholder:text-deep-charcoal/60 placeholder:font-normal focus:border-deep-charcoal focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-sans text-xs uppercase tracking-wider text-deep-charcoal/80 font-medium mb-2"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+971 50 000 0000"
                        className="w-full border-b border-deep-charcoal/35 bg-transparent py-3 font-sans text-base text-deep-charcoal font-medium placeholder:text-deep-charcoal/60 placeholder:font-normal focus:border-deep-charcoal focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block font-sans text-xs uppercase tracking-wider text-deep-charcoal/80 font-medium mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Villa Renovation, Atelier Tour"
                        className="w-full border-b border-deep-charcoal/35 bg-transparent py-3 font-sans text-base text-deep-charcoal font-medium placeholder:text-deep-charcoal/60 placeholder:font-normal focus:border-deep-charcoal focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-sans text-xs uppercase tracking-wider text-deep-charcoal/80 font-medium mb-2"
                    >
                      Message <span className="text-champagne-gold">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, space, or question..."
                      className="w-full border-b border-deep-charcoal/35 bg-transparent py-3 font-sans text-base text-deep-charcoal font-medium placeholder:text-deep-charcoal/60 placeholder:font-normal focus:border-deep-charcoal focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button & Response Note */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-deep-charcoal/15">
                    <button type="submit" disabled={isSubmitting} className={primaryBtn}>
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Arrow />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 text-xs font-sans text-deep-charcoal/50">
                      <span className="text-champagne-gold">✓</span>
                      <span>Replies within 4 business hours</span>
                    </div>
                  </div>
                </form>
              </div>

              {/* ----- Sticky Concierge Sidebar (5 cols) ----- */}
              <aside className="lg:col-span-5 lg:sticky lg:top-32">
                <div className="rounded-2xl border border-deep-charcoal/15 bg-warm-ivory/60 p-8 sm:p-10">
                  {/* Live Dubai Time Header */}
                  <div className="flex items-center justify-between border-b border-deep-charcoal/15 pb-6">
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-deep-charcoal/50">
                        Atelier Local Time
                      </span>
                      <p className="mt-1 font-serif text-2xl text-deep-charcoal">
                        Dubai, UAE (GMT+4)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-2 rounded-full bg-champagne-gold/20 px-3 py-1 font-sans text-xs font-semibold text-deep-charcoal">
                        <span className="h-1.5 w-1.5 rounded-full bg-champagne-gold animate-pulse" />
                        {dubaiTime || "Active"}
                      </span>
                    </div>
                  </div>

                  {/* Studio Photo */}
                  <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl border border-deep-charcoal/10">
                    <Image
                      src={currentStudio.image}
                      alt={currentStudio.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="block font-sans text-[10px] uppercase tracking-widest text-champagne-gold font-semibold">
                        {currentStudio.badge}
                      </span>
                      <p className="font-serif text-lg leading-tight mt-0.5">
                        {currentStudio.name}
                      </p>
                    </div>
                  </div>

                  {/* Studio Switcher Tabs */}
                  <div className="mt-6 flex gap-1.5 border-b border-deep-charcoal/15 pb-4 overflow-x-auto">
                    {STUDIOS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveStudio(s.id)}
                        className={`rounded-full px-3.5 py-1.5 font-sans text-xs transition-colors duration-200 cursor-pointer whitespace-nowrap ${s.id === activeStudio
                          ? "bg-deep-charcoal text-warm-ivory"
                          : "bg-white/80 text-deep-charcoal/70 hover:bg-white hover:text-deep-charcoal"
                          }`}
                      >
                        {s.district}
                      </button>
                    ))}
                  </div>

                  {/* Active Studio Details */}
                  <div className="mt-6 space-y-4 font-sans text-sm text-deep-charcoal/80">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-deep-charcoal/50">Address</dt>
                      <dd className="mt-1 font-medium text-deep-charcoal">{currentStudio.address}</dd>
                    </div>

                    <div>
                      <dt className="text-xs uppercase tracking-wider text-deep-charcoal/50">Hours</dt>
                      <dd className="mt-1">{currentStudio.hours}</dd>
                    </div>

                    <div>
                      <dt className="text-xs uppercase tracking-wider text-deep-charcoal/50">Valet &amp; Parking</dt>
                      <dd className="mt-1 leading-relaxed">{currentStudio.valet}</dd>
                    </div>

                    <div className="pt-2 border-t border-deep-charcoal/15 flex items-center justify-between text-xs">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          currentStudio.mapQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-deep-charcoal hover:text-champagne-gold transition-colors"
                      >
                        <span>Open in Google Maps</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>

                      <a
                        href={PHONE_LINK}
                        className="font-semibold text-deep-charcoal hover:text-champagne-gold transition-colors"
                      >
                        {currentStudio.phone}
                      </a>
                    </div>
                  </div>

                  {/* Quick consultation promo */}
                  <div className="mt-8 rounded-xl bg-white p-5 border border-deep-charcoal/10 flex items-center justify-between">
                    <div>
                      <p className="font-serif text-base text-deep-charcoal font-medium">
                        Looking for a 45-min design review?
                      </p>
                      <p className="font-sans text-xs text-deep-charcoal/60 mt-0.5">
                        Free session with a senior designer
                      </p>
                    </div>
                    <Link
                      href="/consultation"
                      className="shrink-0 rounded-full bg-deep-charcoal px-4 py-2 font-sans text-xs font-medium text-warm-ivory transition-colors hover:bg-champagne-gold hover:text-deep-charcoal"
                    >
                      Book Session
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* ============ 3. PHYSICAL STUDIOS & WORKSHOPS (Warm Ivory) ============ */}
      <section
        data-theme="light"
        aria-labelledby="studios-heading"
        className="bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="flex items-center gap-2.5 font-sans text-sm text-deep-charcoal/70">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            Physical presence
          </p>
          <h2
            id="studios-heading"
            className="mt-6 max-w-4xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Our studios, workshops &amp; suites
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-deep-charcoal/75 lg:text-lg">
            Experience our material library firsthand and review architectural drawings with our partners in environments conceived for clarity and contemplation.
          </p>

          <div className="mt-16 grid gap-10 lg:mt-24 md:grid-cols-2 lg:grid-cols-3">
            {STUDIOS.map((s) => (
              <article
                key={s.id}
                className="group flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-deep-charcoal/10 shadow-[0_10px_30px_rgba(23,24,22,0.04)] transition-all duration-300 hover:shadow-xl hover:border-champagne-gold/40"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-deep-charcoal/80 backdrop-blur-sm px-3 py-1 font-sans text-[11px] font-medium text-warm-ivory">
                      {s.badge}
                    </div>
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-light sm:text-3xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 font-sans text-xs text-deep-charcoal/60 leading-relaxed">
                    {s.tagline}
                  </p>

                  <dl className="mt-6 space-y-3.5 border-t border-deep-charcoal/15 pt-5 font-sans text-xs text-deep-charcoal/75">
                    <div>
                      <dt className="text-deep-charcoal/45">Location</dt>
                      <dd className="mt-0.5 font-medium text-deep-charcoal">{s.address}</dd>
                    </div>
                    <div>
                      <dt className="text-deep-charcoal/45">Hours</dt>
                      <dd className="mt-0.5">{s.hours}</dd>
                    </div>
                    <div>
                      <dt className="text-deep-charcoal/45">Arrival &amp; Valet</dt>
                      <dd className="mt-0.5 leading-relaxed">{s.valet}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 pt-5 border-t border-deep-charcoal/15 flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      s.mapQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs font-semibold text-deep-charcoal hover:text-champagne-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Directions</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>

                  <a
                    href={`tel:${s.phone.replace(/\s+/g, "")}`}
                    className="font-sans text-xs text-deep-charcoal/65 hover:text-champagne-gold transition-colors"
                  >
                    {s.phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. DIRECT CHANNELS (Dark Charcoal) ============ */}
      <section
        data-theme="dark"
        aria-labelledby="channels-heading"
        className="bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="flex items-center gap-2.5 font-sans text-sm text-warm-ivory/70">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            Direct practice channels
          </p>
          <h2
            id="channels-heading"
            className="mt-6 max-w-4xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Direct contact with our team
          </h2>

          <ul className="mt-16 border-t border-warm-ivory/15 lg:mt-24">
            {DIRECT_CHANNELS.map((ch) => (
              <li
                key={ch.role}
                className="group grid items-center gap-x-8 gap-y-4 border-b border-warm-ivory/15 py-8 transition-colors duration-500 hover:bg-warm-ivory/[0.03] lg:grid-cols-[18rem_1fr_16rem] lg:py-10"
              >
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-champagne-gold font-semibold block mb-1">
                    {ch.scope}
                  </span>
                  <h3 className="font-serif text-2xl font-light sm:text-3xl text-warm-ivory group-hover:text-champagne-gold transition-colors">
                    {ch.role}
                  </h3>
                </div>

                <p className="font-sans text-sm leading-relaxed text-warm-ivory/65 max-w-xl">
                  {ch.desc}
                </p>

                <div className="lg:text-right font-sans text-sm space-y-1">
                  <a
                    href={`mailto:${ch.email}`}
                    className="block text-warm-ivory hover:text-champagne-gold transition-colors font-medium"
                  >
                    {ch.email}
                  </a>
                  <a
                    href={`tel:${ch.phone.replace(/\s+/g, "")}`}
                    className="block text-warm-ivory/55 hover:text-champagne-gold transition-colors text-xs"
                  >
                    {ch.phone}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12 border-t border-warm-ivory/15 pt-12">
            <h3 className="font-serif text-4xl font-light uppercase leading-[1] tracking-tight sm:text-5xl lg:col-span-6 lg:text-6xl">
              Prefer to call directly?
            </h3>
            <dl className="grid gap-8 font-sans text-sm text-warm-ivory/70 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
              <div>
                <dt className="text-warm-ivory/45 uppercase tracking-wider text-xs">Telephone</dt>
                <dd className="mt-2">
                  <a
                    href={PHONE_LINK}
                    className="font-serif text-2xl text-warm-ivory transition-colors hover:text-champagne-gold"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <span className="block text-xs text-warm-ivory/50 mt-1">
                    Monday to Saturday, 9am – 7pm GST
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-warm-ivory/45 uppercase tracking-wider text-xs">Primary Atelier</dt>
                <dd className="mt-2 leading-relaxed">
                  Warehouse 14, Street 18B, Al Quoz 3, Dubai
                  <br />
                  Complimentary valet parking on site
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 5. VISITING PROTOCOLS & FAQ (White) ============ */}
      <section
        data-theme="light"
        aria-labelledby="faq-heading"
        className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2.5 font-sans text-sm text-deep-charcoal/70">
              <span className="h-2 w-2 rounded-full bg-champagne-gold" />
              Frequently asked questions
            </p>
            <h2
              id="faq-heading"
              className="mt-6 font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Visiting &amp; commissioning
            </h2>
            <p className="mt-4 font-sans text-base text-deep-charcoal/65">
              Everything you need to know about scheduling a visit, confidentiality, and our engagement terms.
            </p>
          </div>

          <div className="mt-16 divide-y divide-deep-charcoal/15 border-y border-deep-charcoal/15 lg:mt-20">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question} className="py-6 sm:py-8">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold cursor-pointer"
                  >
                    <span className="font-serif text-2xl font-light sm:text-3xl text-deep-charcoal hover:text-champagne-gold transition-colors">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-deep-charcoal/20 transition-transform duration-300 ${isOpen ? "rotate-45 border-champagne-gold text-champagne-gold" : "text-deep-charcoal"
                        }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="step-in mt-4 max-w-3xl font-sans text-base leading-relaxed text-deep-charcoal/70">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
