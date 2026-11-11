"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/*  Dummy copy for a Dubai studio. Replace figures, contact details    */
/*  and claims (marked TODO) with real ones before publishing.         */
/* ------------------------------------------------------------------ */

// Leave empty to run in demo mode (the form pretends to send).
// TODO: set this to your real endpoint, e.g. "/api/consultation".
const SUBMIT_ENDPOINT = "";

const PHONE_DISPLAY = "+971 4 321 8899"; // TODO
const PHONE_LINK = "tel:+97143218899"; // TODO

interface PropertyTypeOption {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const PROPERTY_TYPES: PropertyTypeOption[] = [
  {
    id: "villa",
    title: "Private villa or estate",
    subtitle: "Standalone residences, golf estates and beachfront villas.",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
  },
  {
    id: "penthouse",
    title: "Penthouse or sky duplex",
    subtitle: "High-floor panoramic residences, duplexes and private tower suites.",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
  },
  {
    id: "renovation",
    title: "Renovation and remodel",
    subtitle: "A complete structural, MEP and aesthetic transformation of an existing home.",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
  },
  {
    id: "joinery",
    title: "Bespoke joinery",
    subtitle: "Walk-in dressing rooms, kitchens and architectural panelling.",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
  },
  {
    id: "commercial",
    title: "Boutique commercial",
    subtitle: "Executive offices, private family offices and hospitality.",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
  },
];

const LOCATIONS = [
  "Palm Jumeirah",
  "Emirates Hills",
  "Dubai Hills Estate",
  "Jumeirah Bay Island",
  "Downtown Dubai / DIFC",
  "Al Barari",
  "Abu Dhabi (Al Maryah / Saadiyat)",
  "Other UAE / international",
];

const SCOPE_AREAS = [
  "Complete turnkey residence",
  "Living, dining and formal reception",
  "Master bedroom and ensuite",
  "Kitchen and back-prep kitchen",
  "Walk-in dressing rooms and wardrobes",
  "Private cinema and entertainment lounge",
  "Spa, hammam and wellness suite",
  "Outdoor terrace, pavilion and pool deck",
];

const INVESTMENT_TIERS = [
  {
    id: "tier-1",
    label: "AED 750,000 – 1,500,000",
    desc: "A master suite, a kitchen overhaul or a specialist joinery commission.",
  },
  {
    id: "tier-2",
    label: "AED 1,500,000 – 3,500,000",
    desc: "A complete apartment or penthouse interior, or a 4–5 bedroom villa renovation.",
  },
  {
    id: "tier-3",
    label: "AED 3,500,000 – 7,500,000",
    desc: "A full interior overhaul with imported marble, custom joinery and lighting.",
  },
  {
    id: "tier-4",
    label: "AED 7,500,000 +",
    desc: "A villa compound or signature fit-out with no compromise on materials or craft.",
  },
  {
    id: "discuss",
    label: "I would rather discuss this in the session",
    desc: "Perfectly fine. We will talk through ranges together.",
  },
];

const TIMELINES = [
  "Immediately (within 30 days)",
  "In 1–3 months (completing purchase or handover)",
  "In 3–6 months (off-plan or in design)",
  "Just exploring for now",
];

const MEETING_FORMATS = [
  {
    id: "atelier",
    title: "At our studio",
    desc: "Al Quoz 3, with our material library, joinery samples and coffee.",
  },
  {
    id: "onsite",
    title: "At your property",
    desc: "Our Design Director visits you anywhere in Dubai or Abu Dhabi.",
  },
  {
    id: "virtual",
    title: "By video call",
    desc: "A live review for international owners and anyone travelling.",
  },
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", sub: "10am – 1pm" },
  { id: "afternoon", label: "Afternoon", sub: "2pm – 5pm" },
  { id: "evening", label: "Evening", sub: "5pm – 8pm" },
];

const STEPS = ["Property", "Scope", "Budget", "Details"];

const HERO_FACTS = [
  { label: "Length", value: "45 minutes" },
  { label: "Cost", value: "Free, no obligation" },
  { label: "Reply", value: "Within one working day" }, // TODO: confirm
];

const SESSION = [
  {
    min: "0 – 10 min",
    span: 10,
    bar: "bg-deep-charcoal/15",
    title: "Your space",
    text: "We go through your plans, daylight, ceiling heights and how the home is used.",
  },
  {
    min: "10 – 25 min",
    span: 15,
    bar: "bg-deep-charcoal/30",
    title: "Materials",
    text: "You handle stone, timber, metal and fabric samples chosen for Dubai's climate.",
  },
  {
    min: "25 – 35 min",
    span: 10,
    bar: "bg-deep-charcoal/55",
    title: "Approvals",
    text: "Straightforward advice on developer permits and Dubai Municipality clearances.",
  },
  {
    min: "35 – 45 min",
    span: 10,
    bar: "bg-champagne-gold",
    title: "Budget and next steps",
    text: "An honest budget range and a phased plan, so you can decide with full visibility.",
  },
];

// TODO: confirm the sourcing claims below.
const MATERIALS = [
  {
    category: "Natural stone",
    name: "Calacatta Oro and Roman travertine",
    note: "Honed, bookmatched slabs from Carrara and Tivoli.",
    swatch: "linear-gradient(135deg,#f4f1ea 0%,#e2ddd2 45%,#c9b99a 100%)",
  },
  {
    category: "Hardwood joinery",
    name: "Fumed French white oak",
    note: "Wide architectural planks finished with natural wax oils.",
    swatch: "linear-gradient(135deg,#b08f66 0%,#7a5a3a 100%)",
  },
  {
    category: "Metals",
    name: "Brushed champagne brass",
    note: "Custom-cast, patinated hardware and inlay accents.",
    swatch: "linear-gradient(135deg,#e8d9a8 0%,#b99a55 55%,#8a6d33 100%)",
  },
  {
    category: "Textiles and leathers",
    name: "Italian nubuck and Belgian bouclé",
    note: "Upholstery fabrics that stand up to Dubai sun and glare.",
    swatch: "linear-gradient(135deg,#d9cdbb 0%,#a89880 100%)",
  },
];

/* ------------------------------------------------------------------ */
/*  Small form pieces                                                  */
/* ------------------------------------------------------------------ */

const focusRing =
  "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-champagne-gold";

function RadioRow({
  name,
  value,
  checked,
  onChange,
  title,
  desc,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  title: string;
  desc?: string;
}) {
  return (
    <label
      className={`group -mx-4 flex cursor-pointer items-start gap-5 border-t border-deep-charcoal/15 px-4 py-6 transition-colors duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-offset-[-2px] focus-within:outline-champagne-gold ${checked ? "bg-warm-ivory" : "hover:bg-warm-ivory/60"
        }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${checked
            ? "border-deep-charcoal"
            : "border-deep-charcoal/30 group-hover:border-deep-charcoal/60"
          }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full bg-champagne-gold transition-transform duration-300 ${checked ? "scale-100" : "scale-0"
            }`}
        />
      </span>
      <span className="flex-1">
        <span className="block font-serif text-xl font-light sm:text-2xl">{title}</span>
        {desc && (
          <span className="mt-1 block font-sans text-sm leading-relaxed text-deep-charcoal/60">
            {desc}
          </span>
        )}
      </span>
    </label>
  );
}

function Pill({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2.5 font-sans text-sm transition-colors duration-300 ${focusRing} ${checked
          ? "border-deep-charcoal bg-deep-charcoal text-warm-ivory"
          : "border-deep-charcoal/20 hover:border-deep-charcoal/50"
        }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 font-sans text-sm transition-colors duration-300 ${focusRing} ${checked
          ? "border-deep-charcoal bg-warm-ivory"
          : "border-deep-charcoal/15 hover:border-deep-charcoal/40"
        }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${checked ? "border-deep-charcoal bg-deep-charcoal" : "border-deep-charcoal/30"
          }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-champagne-gold" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 6.5l2.5 2.5L10 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

const fieldClass =
  "w-full border-0 border-b border-deep-charcoal/25 bg-transparent py-3 font-sans text-base text-deep-charcoal placeholder:text-deep-charcoal/35 transition-colors focus:border-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold";

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-sm text-deep-charcoal/70">
        {label}
        {required && <span className="text-champagne-gold"> *</span>}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-deep-charcoal/15 py-4">
      <dt className="font-sans text-sm text-deep-charcoal/50">{label}</dt>
      <dd className="mt-1 font-sans text-sm leading-relaxed text-deep-charcoal">{children}</dd>
    </div>
  );
}

function makeReference() {
  return `RM-${Math.floor(100000 + Math.random() * 900000)}`; // TODO: use the server's reference
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState("villa");
  const [location, setLocation] = useState("Palm Jumeirah");
  const [scopes, setScopes] = useState<string[]>(["Complete turnkey residence"]);
  const [tier, setTier] = useState("tier-2");
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [format, setFormat] = useState("atelier");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("morning");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", notes: "" });
  const [consent, setConsent] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reference, setReference] = useState("");
  const [minDate, setMinDate] = useState("");

  const formTopRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Move focus and view to the new step (skipped on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    formTopRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, completed]);

  const property = PROPERTY_TYPES.find((p) => p.id === propertyType) ?? PROPERTY_TYPES[0];
  const tierInfo = INVESTMENT_TIERS.find((t) => t.id === tier) ?? INVESTMENT_TIERS[1];
  const formatInfo = MEETING_FORMATS.find((f) => f.id === format) ?? MEETING_FORMATS[0];
  const slotInfo = TIME_SLOTS.find((s) => s.id === slot) ?? TIME_SLOTS[0];
  const dateLabel = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "";

  const goTo = (n: number) => {
    setError("");
    setStep(n);
  };

  const next = () => {
    if (step === 2 && scopes.length === 0) {
      setError("Please choose at least one space.");
      return;
    }
    goTo(step + 1);
  };

  const toggleScope = (scope: string) => {
    setError("");
    setScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const onField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please confirm that we may contact you about this request.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        propertyType: property.title,
        location,
        scopes,
        budget: tierInfo.label,
        timeline,
        meetingFormat: formatInfo.title,
        preferredDate: date || null,
        preferredTime: slotInfo.label,
        ...form,
      };

      if (SUBMIT_ENDPOINT) {
        const res = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json().catch(() => null);
        setReference(data?.reference ?? makeReference());
      } else {
        // Demo mode: pretend to send.
        await new Promise((r) => setTimeout(r, 900));
        setReference(makeReference());
      }
      setCompleted(true);
    } catch {
      setError(`Something went wrong. Please try again, or call us on ${PHONE_DISPLAY}.`);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setCompleted(false);
    setStep(1);
    setForm({ fullName: "", email: "", phone: "", notes: "" });
    setConsent(false);
    setDate("");
  };

  const primaryBtn =
    "inline-flex items-center gap-3 rounded-full bg-deep-charcoal px-8 py-4 font-sans text-sm font-medium text-warm-ivory transition-colors duration-300 hover:bg-champagne-gold hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold disabled:opacity-50";
  const backBtn =
    "font-sans text-sm text-deep-charcoal/70 underline-offset-4 transition-colors hover:text-deep-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold";

  return (
    <main className="bg-white text-deep-charcoal selection:bg-champagne-gold selection:text-deep-charcoal">
      {/* Motion is limited to this load-in and the step change; both are off for reduced motion. */}
      <style>{`
        @keyframes lineIn { from { transform: translateY(110%); } }
        @keyframes stepIn { from { opacity: 0; transform: translateY(12px); } }
        @media (prefers-reduced-motion: no-preference) {
          .line-in { animation: lineIn 1.1s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
          .step-in { animation: stepIn .5s cubic-bezier(.22,1,.36,1) both; }
        }
      `}</style>

      {/* ============ 1. Hero ============ */}
      <section
        data-theme="light"
        aria-labelledby="consult-heading"
        className="bg-warm-ivory px-6 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-24 lg:pt-44"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="flex items-center gap-2.5 font-sans text-sm text-deep-charcoal/70">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            Consultation
          </p>

          <h1
            id="consult-heading"
            className="mt-8 font-serif text-[clamp(44px,7vw,120px)] font-light uppercase leading-[0.95] tracking-tight"
          >
            {[
              { t: "Book a", indent: "" },
              { t: "design", indent: "lg:ml-[6vw]" },
              { t: "consultation", indent: "lg:ml-[2vw]" },
            ].map((l, i) => (
              <span key={l.t} className={`block overflow-hidden pb-[0.08em] ${l.indent}`}>
                <span className="line-in block" style={{ "--d": `${100 + i * 120}ms` } as React.CSSProperties}>
                  {l.t}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
            <p className="max-w-md font-sans text-base leading-relaxed text-deep-charcoal/75 lg:col-span-5 lg:text-lg">
              A free 45-minute session with a senior designer. Bring your plans or
              just your ideas. We will review the space, look at materials together
              and talk honestly about budget and timing. Everything you share stays
              in confidence.
            </p>

            <dl className="grid grid-cols-1 gap-6 border-t border-deep-charcoal/15 pt-6 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              {HERO_FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="font-sans text-sm text-deep-charcoal/50">{f.label}</dt>
                  <dd className="mt-2 font-serif text-xl sm:text-2xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 2. Form (white) ============ */}
      <section
        data-theme="light"
        aria-label="Consultation request"
        className="bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-32"
      >
        <div ref={formTopRef} className="mx-auto max-w-[1400px] scroll-mt-28">
          {completed ? (
            /* ----- Confirmation ----- */
            <div className="step-in mx-auto max-w-3xl">
              <p className="font-sans text-sm text-champagne-gold">Request received</p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-4 font-serif text-5xl font-light uppercase leading-[1] tracking-tight outline-none sm:text-6xl lg:text-7xl"
              >
                Thank you{form.fullName ? `, ${form.fullName.split(" ")[0]}` : ""}.
              </h2>
              <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-deep-charcoal/75">
                Your reference is{" "}
                <strong className="font-semibold text-deep-charcoal">{reference}</strong>.
                We will confirm your session by email or WhatsApp within one working
                day.
              </p>

              <dl className="mt-12 border-b border-deep-charcoal/15">
                <SummaryRow label="Property">{property.title}</SummaryRow>
                <SummaryRow label="Location">{location}</SummaryRow>
                <SummaryRow label="Meeting">
                  {formatInfo.title}
                  {dateLabel && `, ${dateLabel}`}, {slotInfo.label.toLowerCase()}
                </SummaryRow>
                <SummaryRow label="Contact">
                  {form.fullName}, {form.phone}
                </SummaryRow>
              </dl>

              <ol className="mt-12 space-y-5 font-sans text-base leading-relaxed text-deep-charcoal/75">
                <li>
                  <span className="mr-3 text-champagne-gold">(01)</span>
                  We confirm the date and place with you.
                </li>
                <li>
                  <span className="mr-3 text-champagne-gold">(02)</span>
                  A designer calls to settle any details.
                </li>
                <li>
                  <span className="mr-3 text-champagne-gold">(03)</span>
                  You bring floor plans, photos or inspiration if you have them.
                </li>
              </ol>

              <div className="mt-14 flex flex-wrap items-center gap-8">
                <Link href="/" className={primaryBtn}>
                  Back to home
                </Link>
                <button type="button" onClick={reset} className={backBtn}>
                  Request another consultation
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-16 lg:grid-cols-12 lg:gap-12">
              {/* ----- Wizard ----- */}
              <div className="lg:col-span-7">
                {/* Progress */}
                <nav aria-label="Progress">
                  <ol className="grid grid-cols-4 gap-3">
                    {STEPS.map((label, i) => {
                      const n = i + 1;
                      const current = n === step;
                      return (
                        <li key={label}>
                          <button
                            type="button"
                            disabled={n > step}
                            onClick={() => goTo(n)}
                            aria-current={current ? "step" : undefined}
                            className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold disabled:cursor-default"
                          >
                            <span
                              className={`block h-0.5 w-full transition-colors duration-500 ${n <= step ? "bg-deep-charcoal" : "bg-deep-charcoal/15"
                                }`}
                            />
                            <span
                              className={`mt-3 block font-sans text-sm tabular-nums ${current ? "text-deep-charcoal" : "text-deep-charcoal/40"
                                }`}
                            >
                              ({String(n).padStart(2, "0")})
                              <span className="ml-2 hidden sm:inline">{label}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </nav>

                <p className="sr-only" aria-live="polite">
                  Step {step} of {STEPS.length}: {STEPS[step - 1]}
                </p>

                <div key={step} className="step-in mt-14">
                  {/* ----- Step 1 ----- */}
                  {step === 1 && (
                    <fieldset>
                      <legend className="w-full">
                        <h2
                          ref={headingRef}
                          tabIndex={-1}
                          className="font-serif text-4xl font-light leading-[1.05] tracking-tight outline-none sm:text-5xl"
                        >
                          What are we designing?
                        </h2>
                      </legend>
                      <p className="mt-4 max-w-md font-sans text-base text-deep-charcoal/65">
                        Choose the option closest to your project.
                      </p>
                      <div className="mt-10 border-b border-deep-charcoal/15">
                        {PROPERTY_TYPES.map((t) => (
                          <RadioRow
                            key={t.id}
                            name="property"
                            value={t.id}
                            checked={propertyType === t.id}
                            onChange={setPropertyType}
                            title={t.title}
                            desc={t.subtitle}
                          />
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {/* ----- Step 2 ----- */}
                  {step === 2 && (
                    <div>
                      <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="font-serif text-4xl font-light leading-[1.05] tracking-tight outline-none sm:text-5xl"
                      >
                        Where is it, and what do you need?
                      </h2>

                      <fieldset className="mt-10">
                        <legend className="font-sans text-sm text-deep-charcoal/70">
                          Location
                        </legend>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {LOCATIONS.map((loc) => (
                            <Pill
                              key={loc}
                              name="location"
                              value={loc}
                              checked={location === loc}
                              onChange={setLocation}
                            >
                              {loc}
                            </Pill>
                          ))}
                        </div>
                      </fieldset>

                      <fieldset className="mt-12">
                        <legend className="font-sans text-sm text-deep-charcoal/70">
                          Spaces to design (choose all that apply)
                        </legend>
                        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {SCOPE_AREAS.map((s) => (
                            <CheckRow
                              key={s}
                              label={s}
                              checked={scopes.includes(s)}
                              onChange={() => toggleScope(s)}
                            />
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {/* ----- Step 3 ----- */}
                  {step === 3 && (
                    <div>
                      <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="font-serif text-4xl font-light leading-[1.05] tracking-tight outline-none sm:text-5xl"
                      >
                        What budget and timing do you have in mind?
                      </h2>
                      <p className="mt-4 max-w-lg font-sans text-base text-deep-charcoal/65">
                        A rough range helps us bring the right samples and numbers.
                        Choose the last option if you would rather not say yet.
                      </p>

                      <fieldset className="mt-10">
                        <legend className="sr-only">Estimated turnkey budget</legend>
                        <div className="border-b border-deep-charcoal/15">
                          {INVESTMENT_TIERS.map((t) => (
                            <RadioRow
                              key={t.id}
                              name="budget"
                              value={t.id}
                              checked={tier === t.id}
                              onChange={setTier}
                              title={t.label}
                              desc={t.desc}
                            />
                          ))}
                        </div>
                      </fieldset>

                      <fieldset className="mt-12">
                        <legend className="font-sans text-sm text-deep-charcoal/70">
                          When would you like to start?
                        </legend>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {TIMELINES.map((t) => (
                            <Pill
                              key={t}
                              name="timeline"
                              value={t}
                              checked={timeline === t}
                              onChange={setTimeline}
                            >
                              {t}
                            </Pill>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {/* ----- Step 4 ----- */}
                  {step === 4 && (
                    <div>
                      <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="font-serif text-4xl font-light leading-[1.05] tracking-tight outline-none sm:text-5xl"
                      >
                        How would you like to meet?
                      </h2>

                      <fieldset className="mt-10">
                        <legend className="sr-only">Meeting format</legend>
                        <div className="border-b border-deep-charcoal/15">
                          {MEETING_FORMATS.map((f) => (
                            <RadioRow
                              key={f.id}
                              name="format"
                              value={f.id}
                              checked={format === f.id}
                              onChange={setFormat}
                              title={f.title}
                              desc={f.desc}
                            />
                          ))}
                        </div>
                      </fieldset>

                      <div className="mt-12 grid gap-10 sm:grid-cols-2">
                        <Field id="preferredDate" label="Preferred date">
                          <input
                            type="date"
                            id="preferredDate"
                            min={minDate}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={fieldClass}
                          />
                        </Field>

                        <fieldset>
                          <legend className="font-sans text-sm text-deep-charcoal/70">
                            Preferred time
                          </legend>
                          <div className="mt-3 flex flex-wrap gap-2.5">
                            {TIME_SLOTS.map((s) => (
                              <Pill
                                key={s.id}
                                name="slot"
                                value={s.id}
                                checked={slot === s.id}
                                onChange={setSlot}
                              >
                                {s.label}
                                <span className="ml-2 opacity-60">{s.sub}</span>
                              </Pill>
                            ))}
                          </div>
                        </fieldset>
                      </div>

                      <h3 className="mt-16 font-serif text-3xl font-light tracking-tight">
                        Your details
                      </h3>

                      <div className="mt-8 grid gap-10 sm:grid-cols-2">
                        <Field id="fullName" label="Full name" required>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            autoComplete="name"
                            value={form.fullName}
                            onChange={onField}
                            placeholder="Tariq Al Mansoori"
                            className={fieldClass}
                          />
                        </Field>
                        <Field id="phone" label="Mobile or WhatsApp, with country code" required>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            autoComplete="tel"
                            value={form.phone}
                            onChange={onField}
                            placeholder="+971 50 123 4567"
                            className={fieldClass}
                          />
                        </Field>
                      </div>

                      <div className="mt-10">
                        <Field id="email" label="Email" required>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={onField}
                            placeholder="you@example.com"
                            className={fieldClass}
                          />
                        </Field>
                      </div>

                      <div className="mt-10">
                        <Field id="notes" label="Anything else we should know? (optional)">
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            value={form.notes}
                            onChange={onField}
                            placeholder="Developer or community, plans you already have, specific questions..."
                            className={`${fieldClass} resize-none`}
                          />
                        </Field>
                      </div>

                      <label className={`mt-10 flex cursor-pointer items-start gap-3 font-sans text-sm leading-relaxed text-deep-charcoal/75 ${focusRing}`}>
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            setError("");
                          }}
                          className="mt-1 h-4 w-4 shrink-0 accent-[#BE9B59]"
                        />
                        <span>
                          I agree that RichMan Interiors may contact me about this request.
                          Your details are used only for this consultation (see our{" "}
                          <Link href="/privacy" className="underline underline-offset-4">
                            privacy policy
                          </Link>
                          ).
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Error + navigation */}
                <p role="alert" className="mt-8 min-h-[1.5rem] font-sans text-sm text-red-700">
                  {error}
                </p>

                <div className="mt-4 flex items-center justify-between gap-6 border-t border-deep-charcoal/15 pt-8">
                  {step > 1 ? (
                    <button type="button" onClick={() => goTo(step - 1)} className={backBtn}>
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length ? (
                    <button type="button" onClick={next} className={primaryBtn}>
                      Continue
                      <Arrow />
                    </button>
                  ) : (
                    <button type="submit" disabled={submitting} className={primaryBtn}>
                      {submitting ? "Sending..." : "Request consultation"}
                      {!submitting && <Arrow />}
                    </button>
                  )}
                </div>
              </div>

              {/* ----- Live summary ----- */}
              <aside aria-label="Your request" className="lg:col-span-4 lg:col-start-9">
                <div className="lg:sticky lg:top-28">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-warm-ivory">
                    {PROPERTY_TYPES.map((p) => (
                      <div
                        key={p.id}
                        className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${p.id === propertyType ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="(min-width:1024px) 30vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <h3 className="mt-8 font-serif text-2xl font-light">Your request</h3>
                  <dl className="mt-4 border-b border-deep-charcoal/15">
                    <SummaryRow label="Property">{property.title}</SummaryRow>
                    <SummaryRow label="Location">{location}</SummaryRow>
                    <SummaryRow label={`Spaces (${scopes.length})`}>
                      {scopes.length === 0 ? (
                        <span className="text-deep-charcoal/45">None chosen yet</span>
                      ) : (
                        <>
                          {scopes.slice(0, 3).join(", ")}
                          {scopes.length > 3 && (
                            <span className="text-deep-charcoal/55"> and {scopes.length - 3} more</span>
                          )}
                        </>
                      )}
                    </SummaryRow>
                    <SummaryRow label="Budget">{tierInfo.label}</SummaryRow>
                    <SummaryRow label="Start">{timeline}</SummaryRow>
                    <SummaryRow label="Meeting">
                      {formatInfo.title}
                      {dateLabel && `, ${dateLabel}`}, {slotInfo.label.toLowerCase()}
                    </SummaryRow>
                  </dl>

                  <p className="mt-6 font-sans text-sm leading-relaxed text-deep-charcoal/60">
                    Prefer to talk it through?{" "}
                    <a
                      href={PHONE_LINK}
                      className="text-deep-charcoal underline underline-offset-4 transition-colors hover:text-champagne-gold"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </aside>
            </form>
          )}
        </div>
      </section>

      {/* ============ 3. What happens in the session ============ */}
      <section
        data-theme="light"
        aria-labelledby="session-heading"
        className="bg-warm-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="flex items-center gap-2.5 font-sans text-sm text-deep-charcoal/70">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            The session
          </p>
          <h2
            id="session-heading"
            className="mt-6 max-w-4xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Forty-five minutes, well spent
          </h2>

          {/* Timeline bar */}
          <div className="mt-16 lg:mt-24" aria-hidden>
            <div className="flex h-2 w-full gap-1">
              {SESSION.map((s) => (
                <div
                  key={s.title}
                  className={`h-full ${s.bar}`}
                  style={{ width: `${(s.span / 45) * 100}%` }}
                />
              ))}
            </div>
          </div>

          <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {SESSION.map((s) => (
              <li key={s.title}>
                <p className="font-sans text-sm tabular-nums text-champagne-gold">{s.min}</p>
                <h3 className="mt-3 font-serif text-3xl font-light">{s.title}</h3>
                <p className="mt-4 max-w-xs font-sans text-base leading-relaxed text-deep-charcoal/70">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 4. Materials + contact (dark) ============ */}
      <section
        data-theme="dark"
        aria-labelledby="materials-heading"
        className="bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="flex items-center gap-2.5 font-sans text-sm text-warm-ivory/70">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            In the studio
          </p>
          <h2
            id="materials-heading"
            className="mt-6 max-w-4xl font-serif text-5xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Materials ready for you to touch
          </h2>

          <ul className="mt-16 border-t border-warm-ivory/15 lg:mt-24">
            {MATERIALS.map((m) => (
              <li
                key={m.name}
                className="group grid items-center gap-x-8 gap-y-3 border-b border-warm-ivory/15 py-8 transition-colors duration-500 hover:bg-warm-ivory/[0.03] sm:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_14rem_1fr_20rem] lg:py-10"
              >
                <span
                  aria-hidden
                  className="h-14 w-14 rounded-full ring-1 ring-warm-ivory/25 transition-transform duration-500 group-hover:scale-110"
                  style={{ background: m.swatch }}
                />
                <p className="font-sans text-sm text-warm-ivory/55">{m.category}</p>
                <h3 className="font-serif text-2xl font-light sm:text-3xl lg:text-4xl">
                  {m.name}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-warm-ivory/60 sm:col-start-2 lg:col-start-auto">
                  {m.note}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12">
            <h3 className="font-serif text-4xl font-light uppercase leading-[1] tracking-tight sm:text-5xl lg:col-span-6 lg:text-6xl">
              Prefer to talk first?
            </h3>
            <dl className="grid gap-8 font-sans text-sm text-warm-ivory/70 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
              <div>
                <dt className="text-warm-ivory/45">Call us</dt>
                <dd className="mt-2">
                  <a
                    href={PHONE_LINK}
                    className="font-serif text-2xl text-warm-ivory transition-colors hover:text-champagne-gold"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-warm-ivory/45">Studio</dt>
                <dd className="mt-2 leading-relaxed">
                  Al Quoz Industrial Area 3, Dubai
                  <br />
                  Sunday to Thursday, 9am – 6pm {/* TODO: confirm hours */}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
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