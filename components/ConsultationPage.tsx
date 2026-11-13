"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/*  Dummy copy for a Dubai studio. Replace figures, contact details    */
/*  and claims (marked TODO) with real ones before publishing.         */
/* ------------------------------------------------------------------ */

// Hero background image (Unsplash link - replace later with studio photography)
const CONSULTATION_HERO_BG =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85";

// Leave empty to run in demo mode (the form pretends to send).
// TODO: set this to your real endpoint, e.g. "/api/consultation".
const SUBMIT_ENDPOINT = "";

const PHONE_DISPLAY = "+971 4 321 8899"; // TODO
const PHONE_LINK = "tel:+97143218899"; // TODO

const PROPERTY_TYPES = [
  "Complete Turnkey Fit-Out",
  "Villa & Apartment Renovations",
  "Office & Commercial Interiors",
  "MEP Works — Electrical, HVAC & Plumbing",
  "Authority Approval Coordination",
  "Project Management & Execution",
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

const MEETING_FORMATS = [
  {
    id: "atelier",
    title: "At our office",
    desc: "Al Quoz 3, with our material library, joinery samples and coffee.",
  },
  {
    id: "onsite",
    title: "At your property",
    desc: "Our Design Director visits you anywhere in Dubai or Abu Dhabi.",
  },
  {
    id: "virtual",
    title: "By online meeting",
    desc: "A live review for international owners and anyone travelling.",
  },
];

/* ---- Booking calendar ----
   TODO: connect to your real calendar. `isBooked` below is demo data only. */
const SESSION_MINUTES = 45;
const OPEN_DAYS = [0, 1, 2, 3, 4]; // Sunday to Thursday (0 = Sunday)
const DAYS_AHEAD = 14;
const LEAD_MINUTES = 120; // earliest bookable time today is now + 2 hours
const SLOT_TIMES = Array.from({ length: 16 }, (_, i) => {
  const total = 9 * 60 + 30 + i * 30; // 09:30 to 17:00, every 30 minutes
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
});

interface Day {
  iso: string;
  weekday: string;
  day: number;
  month: string;
  open: boolean;
  isToday: boolean;
}

const pad2 = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

function fmt12(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${pad2(m)} ${h >= 12 ? "PM" : "AM"}`;
}

// Demo availability: a stable pseudo-random handful of slots are "taken".
function isBooked(iso: string, time: string) {
  let n = 0;
  for (const c of iso + time) n += c.charCodeAt(0);
  return n % 7 === 0;
}

function buildDays(now: Date): Day[] {
  const out: Day[] = [];
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      iso: toIso(d),
      weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-GB", { month: "short" }),
      open: OPEN_DAYS.includes(d.getDay()),
      isToday: i === 0,
    });
  }
  return out;
}

function slotUnavailable(day: Day, time: string, now: Date) {
  if (isBooked(day.iso, time)) return true;
  if (day.isToday) {
    const [h, m] = time.split(":").map(Number);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    if (h * 60 + m < nowMinutes + LEAD_MINUTES) return true;
  }
  return false;
}

// Builds a calendar file for the chosen slot (Dubai is UTC+4, so we convert to UTC).
function buildIcs(iso: string, time: string, title: string, where: string) {
  const [y, mo, d] = iso.split("-").map(Number);
  const [h, m] = time.split(":").map(Number);
  const start = new Date(Date.UTC(y, mo - 1, d, h - 4, m));
  const end = new Date(start.getTime() + SESSION_MINUTES * 60000);
  const stamp = (dt: Date) =>
    `${dt.getUTCFullYear()}${pad2(dt.getUTCMonth() + 1)}${pad2(dt.getUTCDate())}T${pad2(
      dt.getUTCHours()
    )}${pad2(dt.getUTCMinutes())}00Z`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RichMan Interiors//Consultation//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(start)}-richman@consultation`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${where}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

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

function Pill({
  name,
  value,
  checked,
  onChange,
  required,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2.5 font-sans text-sm transition-colors duration-300 ${focusRing} ${checked
        ? "border-deep-charcoal bg-deep-charcoal text-warm-ivory font-medium shadow-sm"
        : "border-deep-charcoal/30 text-deep-charcoal/85 hover:border-deep-charcoal hover:text-deep-charcoal bg-white/40"
        }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        required={required}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

const fieldClass =
  "w-full border-0 border-b border-deep-charcoal/35 bg-transparent py-3 font-sans text-base text-deep-charcoal font-medium placeholder:text-deep-charcoal/60 placeholder:font-normal transition-colors focus:border-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold";

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
      <label htmlFor={id} className="block font-sans text-sm font-medium text-deep-charcoal/85 mb-1.5">
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

function SectionHeading({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-sans text-sm tabular-nums text-champagne-gold">({no})</span>
      <h2 className="font-serif text-3xl font-light leading-[1.05] tracking-tight sm:text-4xl">
        {children}
      </h2>
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
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState("atelier");

  const [now, setNow] = useState<Date | null>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [flexible, setFlexible] = useState(false);

  const [form, setForm] = useState({ fullName: "", email: "", phone: "", notes: "" });
  const [consent, setConsent] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reference, setReference] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Build the calendar after mount so the server and browser agree.
  useEffect(() => {
    const n = new Date();
    setNow(n);
    setDays(buildDays(n));
  }, []);

  // After sending, bring the confirmation into view and focus it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [completed]);

  const formatInfo = MEETING_FORMATS.find((f) => f.id === format) ?? MEETING_FORMATS[0];
  const selectedDay = days.find((d) => d.iso === date);
  const dayLabel = selectedDay
    ? `${selectedDay.weekday} ${selectedDay.day} ${selectedDay.month}`
    : "";
  const whenLabel = flexible
    ? "Flexible: we will call to arrange a time"
    : date && time
      ? `${dayLabel}, ${fmt12(time)}`
      : "";

  const pickDay = (iso: string) => {
    setError("");
    setDate(iso);
    // Clear the time if it is not free on the new day
    const day = days.find((d) => d.iso === iso);
    if (day && time && now && slotUnavailable(day, time, now)) setTime("");
  };

  const onField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flexible && (!date || !time)) {
      setError("Please choose a day and a time, or tick the flexible option.");
      return;
    }
    if (!consent) {
      setError("Please confirm that we may contact you about this request.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        propertyType,
        location: location || null,
        meetingFormat: formatInfo.title,
        flexible,
        preferredDate: flexible ? null : date,
        preferredTime: flexible ? null : time,
        durationMinutes: SESSION_MINUTES,
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
    setForm({ fullName: "", email: "", phone: "", notes: "" });
    setConsent(false);
    setDate("");
    setTime("");
    setFlexible(false);
    setPropertyType("");
    setLocation("");
  };

  const downloadIcs = () => {
    if (!date || !time) return;
    const ics = buildIcs(
      date,
      time,
      "Design consultation with RichMan Interiors",
      formatInfo.id === "atelier" ? "RichMan Interiors, Al Quoz Industrial Area 3, Dubai" : formatInfo.title
    );
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "richman-consultation.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const primaryBtn =
    "inline-flex items-center gap-3 rounded-full bg-deep-charcoal px-8 py-4 font-sans text-sm font-medium text-warm-ivory transition-colors duration-300 hover:bg-champagne-gold hover:text-deep-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold disabled:opacity-50";
  const textBtn =
    "font-sans text-sm text-deep-charcoal/70 underline-offset-4 transition-colors hover:text-deep-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold";

  return (
    <main className="bg-white text-deep-charcoal selection:bg-champagne-gold selection:text-deep-charcoal">
      {/* Motion is limited to this load-in and the confirmation; both are off for reduced motion. */}
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
        data-theme="dark"
        aria-labelledby="consult-heading"
        className="relative isolate overflow-hidden px-6 pb-16 pt-36 text-warm-ivory sm:px-10 lg:px-16 lg:pb-24 lg:pt-44"
      >
        {/* Background Hero Image */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={CONSULTATION_HERO_BG}
            alt="RichMan Interiors Private Consultation Suite Dubai"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#171816]/75 via-[#171816]/55 to-[#171816]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,24,22,0.35)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <p className="flex items-center gap-2.5 font-sans text-sm text-warm-ivory/80">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            Consultation
          </p>

          <h1
            id="consult-heading"
            className="mt-8 font-serif text-[clamp(44px,7vw,120px)] font-light uppercase leading-[0.95] tracking-tight text-warm-ivory"
          >
            {[
              { t: "Book a", indent: "" },
              { t: "design", indent: "lg:ml-[6vw]" },
              { t: "consultation", indent: "lg:ml-[2vw]" },
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
            <p className="max-w-md font-sans text-base leading-relaxed text-warm-ivory/85 lg:col-span-5 lg:text-lg">
              A free 45-minute session with a senior designer. Bring your plans or
              just your ideas. We will review the space, look at materials together
              and talk honestly about budget and timing. Everything you share stays
              in confidence.
            </p>

            <dl className="grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              {HERO_FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="font-sans text-sm text-warm-ivory/60">{f.label}</dt>
                  <dd className="mt-2 font-serif text-xl text-warm-ivory sm:text-2xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 2. Booking form (white, one page) ============ */}
      <section
        data-theme="light"
        aria-label="Book your consultation"
        className="bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-32"
      >
        <div ref={topRef} className="mx-auto max-w-[1400px] scroll-mt-28">
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
                <strong className="font-semibold text-deep-charcoal">{reference}</strong>.{" "}
                {flexible
                  ? "We will call you within one working day to find a time that suits you."
                  : "We will confirm your session by email or WhatsApp within one working day."}
              </p>

              <dl className="mt-12 border-b border-deep-charcoal/15">
                <SummaryRow label="Project">
                  {propertyType}
                  {location && `, ${location}`}
                </SummaryRow>
                <SummaryRow label="Meeting">{formatInfo.title}</SummaryRow>
                <SummaryRow label="When">{whenLabel}</SummaryRow>
                <SummaryRow label="Contact">
                  {form.fullName}, {form.phone}
                </SummaryRow>
              </dl>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
                {!flexible && date && time && (
                  <button type="button" onClick={downloadIcs} className={primaryBtn}>
                    Add to calendar
                  </button>
                )}
                <Link href="/" className={textBtn}>
                  Back to home
                </Link>
                <button type="button" onClick={reset} className={textBtn}>
                  Request another consultation
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="grid gap-16 lg:grid-cols-12 lg:gap-12"
              noValidate={false}
            >
              <div className="space-y-20 lg:col-span-7">
                {/* ----- 1. Project ----- */}
                <fieldset>
                  <legend className="w-full">
                    <SectionHeading no="01">What are you planning?</SectionHeading>
                  </legend>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {PROPERTY_TYPES.map((t, i) => (
                      <Pill
                        key={t}
                        name="property"
                        value={t}
                        checked={propertyType === t}
                        onChange={setPropertyType}
                        required={i === 0}
                      >
                        {t}
                      </Pill>
                    ))}
                  </div>

                  <div className="mt-10 max-w-sm">
                    <Field id="location" label="Where is it? (optional)">
                      <select
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`${fieldClass} cursor-pointer ${location ? "text-deep-charcoal" : "text-deep-charcoal/60"}`}
                      >
                        <option value="" className="text-deep-charcoal/60">Choose a community</option>
                        {LOCATIONS.map((l) => (
                          <option key={l} value={l} className="text-deep-charcoal bg-white py-1">
                            {l}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </fieldset>

                {/* ----- 2. Time ----- */}
                <fieldset>
                  <legend className="w-full">
                    <SectionHeading no="02">Pick a time</SectionHeading>
                  </legend>

                  {/* Format */}
                  <div className="mt-8">
                    <p className="font-sans text-sm font-medium text-deep-charcoal/85">How would you like to meet?</p>
                    <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Meeting format">
                      {MEETING_FORMATS.map((f) => (
                        <Pill
                          key={f.id}
                          name="format"
                          value={f.id}
                          checked={format === f.id}
                          onChange={setFormat}
                        >
                          {f.title}
                        </Pill>
                      ))}
                    </div>
                    <p className="mt-3 font-sans text-sm text-deep-charcoal/70">{formatInfo.desc}</p>
                  </div>

                  {/* Day */}
                  <div className="mt-10">
                    <p className="font-sans text-sm font-medium text-deep-charcoal/85">Choose a day</p>
                    {days.length === 0 ? (
                      <p className="mt-3 font-sans text-sm text-deep-charcoal/55">Loading days...</p>
                    ) : (
                      <div
                        role="radiogroup"
                        aria-label="Day"
                        className="scrollbar-none -mx-6 mt-3 flex snap-x gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
                      >
                        {days.map((d) => {
                          const on = date === d.iso;
                          return (
                            <label
                              key={d.iso}
                              className={`flex w-[4.75rem] shrink-0 snap-start flex-col items-center rounded-[4px] border py-3 text-center transition-colors duration-300 ${focusRing} ${d.open
                                ? on
                                  ? "cursor-pointer border-deep-charcoal bg-deep-charcoal text-warm-ivory font-medium shadow-sm"
                                  : "cursor-pointer border-deep-charcoal/30 text-deep-charcoal hover:border-deep-charcoal bg-white/40"
                                : "cursor-not-allowed border-deep-charcoal/15 text-deep-charcoal/40 bg-deep-charcoal/5"
                                }`}
                            >
                              <input
                                type="radio"
                                name="day"
                                value={d.iso}
                                checked={on}
                                disabled={!d.open}
                                onChange={() => pickDay(d.iso)}
                                className="sr-only"
                              />
                              <span className="font-sans text-xs">{d.weekday}</span>
                              <span className="mt-1 font-serif text-2xl font-light leading-none">
                                {d.day}
                              </span>
                              <span className="mt-1 font-sans text-xs opacity-70">
                                {d.isToday ? "Today" : d.month}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                    <p className="mt-2 font-sans text-xs text-deep-charcoal/60">
                      {/* TODO: confirm opening days */}
                      Open Sunday to Thursday.
                    </p>
                  </div>

                  {/* Time */}
                  <div className="mt-10" aria-live="polite">
                    <p className="font-sans text-sm font-medium text-deep-charcoal/85">
                      {selectedDay ? `Times on ${dayLabel}` : "Choose a day to see times"}
                    </p>

                    {selectedDay && now && (
                      <div
                        role="radiogroup"
                        aria-label="Time"
                        className="step-in mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4"
                      >
                        {SLOT_TIMES.map((t) => {
                          const taken = slotUnavailable(selectedDay, t, now);
                          const on = time === t;
                          return (
                            <label
                              key={t}
                              className={`rounded-[4px] border px-2 py-2.5 text-center font-sans text-sm tabular-nums transition-colors duration-300 ${focusRing} ${taken
                                ? "cursor-not-allowed border-deep-charcoal/15 text-deep-charcoal/35 line-through bg-deep-charcoal/5"
                                : on
                                  ? "cursor-pointer border-deep-charcoal bg-deep-charcoal text-warm-ivory font-medium shadow-sm"
                                  : "cursor-pointer border-deep-charcoal/30 text-deep-charcoal hover:border-deep-charcoal bg-white/40"
                                }`}
                            >
                              <input
                                type="radio"
                                name="time"
                                value={t}
                                checked={on}
                                disabled={taken}
                                onChange={() => {
                                  setError("");
                                  setTime(t);
                                }}
                                className="sr-only"
                              />
                              {fmt12(t)}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    <label className={`mt-6 flex cursor-pointer items-start gap-3 font-sans text-sm text-deep-charcoal/85 ${focusRing}`}>
                      <input
                        type="checkbox"
                        checked={flexible}
                        onChange={(e) => {
                          setFlexible(e.target.checked);
                          setError("");
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#BE9B59]"
                      />
                      <span>None of these work? I am flexible, please call me to find a time.</span>
                    </label>
                  </div>
                </fieldset>

                {/* ----- 3. Details ----- */}
                <fieldset>
                  <legend className="w-full">
                    <SectionHeading no="03">Your details</SectionHeading>
                  </legend>

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
                        placeholder="Budget range, timing, the spaces you want designed, plans you already have..."
                        className={`${fieldClass} resize-none`}
                      />
                    </Field>
                  </div>

                  <label className={`mt-10 flex cursor-pointer items-start gap-3 font-sans text-sm leading-relaxed text-deep-charcoal/85 ${focusRing}`}>
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
                      I agree that RichMan Interiors may contact me about this request. Your
                      details are used only for this consultation (see our{" "}
                      <Link href="/privacy" className="underline underline-offset-4">
                        privacy policy
                      </Link>
                      ).
                    </span>
                  </label>

                  <p role="alert" className="mt-6 min-h-[1.5rem] font-sans text-sm text-red-700">
                    {error}
                  </p>

                  <button type="submit" disabled={submitting} className={`${primaryBtn} mt-2`}>
                    {submitting ? "Sending..." : "Request consultation"}
                    {!submitting && (
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
                    )}
                  </button>
                </fieldset>
              </div>

              {/* ----- Your session (updates as you choose) ----- */}
              <aside aria-label="Your session" className="lg:col-span-4 lg:col-start-9">
                <div className="lg:sticky lg:top-28">
                  <div className="rounded-[4px] bg-warm-ivory p-8">
                    <p className="font-sans text-sm text-deep-charcoal/55">Your session</p>
                    <p className="mt-3 font-serif text-3xl font-light leading-tight">
                      {flexible
                        ? "We will call you"
                        : date && time
                          ? `${dayLabel}`
                          : "Pick a day and time"}
                    </p>
                    {!flexible && date && time && (
                      <p className="mt-1 font-serif text-3xl font-light leading-tight text-champagne-gold">
                        {fmt12(time)}
                      </p>
                    )}

                    <dl className="mt-8 border-b border-deep-charcoal/15">
                      <SummaryRow label="Meeting">{formatInfo.title}</SummaryRow>
                      <SummaryRow label="Length">{SESSION_MINUTES} minutes, free</SummaryRow>
                      {propertyType && <SummaryRow label="Project">{propertyType}</SummaryRow>}
                    </dl>
                  </div>

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