"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface StudioLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  email: string;
  valet: string;
  mapQuery: string;
  image: string;
}

const STUDIOS: StudioLocation[] = [
  {
    id: "al-quoz",
    name: "Al Quoz Atelier & Workshops",
    tagline: "Primary Design Studio, Material Library & Joinery Atelier",
    address: "Warehouse 14, Street 18B, Al Quoz Industrial Area 3",
    city: "Dubai, United Arab Emirates",
    hours: "Monday – Saturday: 9:00 AM – 7:00 PM (By appointment)",
    phone: "+971 4 321 8899",
    email: "atelier@richmaninteriors.ae",
    valet: "Private atelier courtyard parking with complimentary valet",
    mapQuery: "Al+Quoz+Industrial+Area+3+Dubai",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
  },
  {
    id: "downtown",
    name: "Downtown Private Client Suite",
    tagline: "Private Salon for Villa & Penthouse Investors",
    address: "Level 42, Boulevard Plaza Tower 1, Sheikh Mohammed bin Rashid Blvd",
    city: "Downtown Dubai, UAE",
    hours: "Monday – Friday: 10:00 AM – 8:00 PM (Strictly by appointment)",
    phone: "+971 4 321 8890",
    email: "concierge@richmaninteriors.ae",
    valet: "Tower 1 VIP Valet with dedicated concierge escort",
    mapQuery: "Boulevard+Plaza+Tower+1+Downtown+Dubai",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi Client Suite",
    tagline: "Private Advisory for Capital Estates & Palaces",
    address: "Al Khatem Tower, Level 28, ADGM Square, Al Maryah Island",
    city: "Abu Dhabi, UAE",
    hours: "Tuesday – Saturday: 10:00 AM – 6:00 PM (By appointment)",
    phone: "+971 2 642 7700",
    email: "abudhabi@richmaninteriors.ae",
    valet: "ADGM Square North VIP Parking & Valet",
    mapQuery: "Al+Khatem+Tower+ADGM+Square+Abu+Dhabi",
    image:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791979419/pexels-shkrabaanthony-6322363_gbwg6f.jpg",
  },
];

const INQUIRY_TYPES = [
  "Residential Commission",
  "Commercial Architecture",
  "Private Atelier Tour",
  "Press & Media Feature",
  "Artisan & Trade Partnership",
  "General Inquiry",
];

export default function ContactPage() {
  const [activeStudio, setActiveStudio] = useState<string>("al-quoz");
  const [inquiryType, setInquiryType] = useState<string>("Residential Commission");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dubaiTime, setDubaiTime] = useState("");

  // Live Dubai Time Clock
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury concierge SLA submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const currentStudio =
    STUDIOS.find((s) => s.id === activeStudio) || STUDIOS[0];

  return (
    <main className="bg-[#FAF8F5] text-[#171816] selection:bg-[#BE9B59] selection:text-[#171816]">
      {/* 1. EDITORIAL SPLIT HERO (White / Ivory luxury presentation) */}
      <section
        data-theme="light"
        className="relative pt-36 sm:pt-40 md:pt-44 pb-16 lg:pb-24 border-b border-[#171816]/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BE9B59] inline-block animate-pulse" />
            <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold">
              ATELIER &amp; GLOBAL CONCIERGE · DUBAI
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Headline Column */}
            <div className="lg:col-span-7">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-light text-[#171816] tracking-tight leading-[1.08] mb-6">
                Start a Conversation with the Atelier.
              </h1>
              <p className="font-sans text-base sm:text-lg text-[#171816]/75 leading-relaxed max-w-2xl font-light">
                Whether commissioning a bespoke private residence, exploring turnkey villa architectural transformations, or reserving a private material viewing, our dedicated client concierge ensures discretion and considered attention.
              </p>

              {/* Direct Quick Channels */}
              <div className="mt-10 pt-8 border-t border-[#171816]/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#171816]/50 mb-1">
                    Direct Client Desk
                  </span>
                  <a
                    href="tel:+97143218899"
                    className="font-editorial text-2xl text-[#171816] hover:text-[#BE9B59] transition-colors"
                  >
                    +971 4 321 8899
                  </a>
                  <span className="block text-xs font-sans text-[#171816]/60 mt-0.5">
                    Monday to Saturday, 9am – 7pm GST
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#171816]/50 mb-1">
                    Confidential Concierge Email
                  </span>
                  <a
                    href="mailto:concierge@richmaninteriors.ae"
                    className="font-editorial text-xl sm:text-2xl text-[#171816] hover:text-[#BE9B59] transition-colors break-words"
                  >
                    concierge@richmaninteriors.ae
                  </a>
                  <span className="block text-xs font-sans text-[#171816]/60 mt-0.5">
                    Direct review by a Studio Partner
                  </span>
                </div>
              </div>
            </div>

            {/* Right Live Atelier Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[12px] p-8 sm:p-10 border border-[#171816]/10 shadow-[0_20px_50px_rgba(23,24,22,0.06)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#BE9B59]/10 to-transparent pointer-events-none" />

                <div className="flex items-center justify-between pb-6 border-b border-[#171816]/10 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#171816]/50 font-sans block">
                      Local Time
                    </span>
                    <span className="font-editorial text-2xl text-[#171816]">
                      Dubai, UAE (GMT+4)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BE9B59]/15 text-[#8f7134] text-[11px] font-sans font-semibold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BE9B59]" />
                      {dubaiTime || "12:00 PM GST"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-sans text-[#171816]/80 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#BE9B59]/15 text-[#BE9B59] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <div>
                      <strong className="text-[#171816] block font-medium">
                        4-Hour Concierge Response SLA
                      </strong>
                      All private inquiries receive initial partner review within 4 business hours.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#BE9B59]/15 text-[#BE9B59] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <div>
                      <strong className="text-[#171816] block font-medium">
                        Full Non-Disclosure Guaranteed
                      </strong>
                      We execute non-disclosure agreements for private villa estates, royal residences, and VIP clients.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#BE9B59]/15 text-[#BE9B59] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <div>
                      <strong className="text-[#171816] block font-medium">
                        Material &amp; Joinery Library
                      </strong>
                      Over 1,200 curated natural stone, French oak, leather, and custom brass samples ready for inspection.
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#171816]/10 flex items-center justify-between">
                  <span className="text-xs font-sans text-[#171816]/60">
                    Ready for a tailored design proposal?
                  </span>
                  <Link
                    href="/consultation"
                    className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#BE9B59] hover:text-[#d3b06e] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Book Consultation</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ATELIER LOCATIONS INTERACTIVE SHOWCASE */}
      <section
        data-theme="light"
        className="py-20 lg:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold block mb-2">
              PHYSICAL PRESENCE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#171816] tracking-tight">
              Our Design Studios &amp; Suites
            </h2>
          </div>
          <p className="font-sans text-sm text-[#171816]/65 max-w-md font-light leading-relaxed">
            Experience materials firsthand and meet our partners in an architectural environment designed for creative clarity.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-[#171816]/10 mb-10">
          {STUDIOS.map((studio) => {
            const isActive = studio.id === activeStudio;
            return (
              <button
                key={studio.id}
                type="button"
                onClick={() => setActiveStudio(studio.id)}
                className={`px-5 sm:px-7 py-3 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#171816] text-[#F5F0E7] shadow-md"
                    : "bg-white text-[#171816]/70 hover:text-[#171816] border border-[#171816]/10 hover:border-[#BE9B59]/40"
                }`}
              >
                {studio.name.split(" ")[0]} · {studio.id === "al-quoz" ? "Al Quoz Atelier" : studio.name}
              </button>
            );
          })}
        </div>

        {/* Active Studio Card Display */}
        <div className="bg-white rounded-[16px] border border-[#171816]/10 overflow-hidden shadow-[0_30px_60px_rgba(23,24,22,0.06)] grid grid-cols-1 lg:grid-cols-12 transition-all duration-500">
          {/* Studio Image Column */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px]">
            <Image
              src={currentStudio.image}
              alt={currentStudio.name}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-1">
                RICHMAN INTERIORS ATELIER
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-light">
                {currentStudio.name}
              </h3>
              <p className="font-sans text-xs text-white/80 mt-1">
                {currentStudio.tagline}
              </p>
            </div>
          </div>

          {/* Studio Details Column */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-1">
                  Location &amp; Address
                </span>
                <p className="font-editorial text-xl sm:text-2xl text-[#171816] leading-snug">
                  {currentStudio.address}
                </p>
                <p className="font-sans text-xs text-[#171816]/65 mt-0.5">
                  {currentStudio.city}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-1">
                  Private Studio Hours
                </span>
                <p className="font-sans text-sm text-[#171816]/80">
                  {currentStudio.hours}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-1">
                  Arrival &amp; Valet
                </span>
                <p className="font-sans text-sm text-[#171816]/80">
                  {currentStudio.valet}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-1">
                  Direct Line &amp; Booking
                </span>
                <a
                  href={`tel:${currentStudio.phone}`}
                  className="font-sans text-sm font-semibold text-[#171816] hover:text-[#BE9B59] transition-colors block"
                >
                  {currentStudio.phone}
                </a>
                <a
                  href={`mailto:${currentStudio.email}`}
                  className="font-sans text-xs text-[#171816]/60 hover:text-[#BE9B59] transition-colors block mt-0.5"
                >
                  {currentStudio.email}
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#171816]/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  currentStudio.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#171816] text-[#F5F0E7] hover:bg-[#BE9B59] hover:text-[#171816] text-xs font-sans font-medium uppercase tracking-[0.2em] transition-colors shadow-sm"
              >
                <span>Google Maps Directions</span>
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              <Link
                href="/consultation"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#171816]/20 hover:border-[#BE9B59] text-[#171816] hover:text-[#BE9B59] text-xs font-sans font-medium uppercase tracking-[0.2em] transition-colors"
              >
                Reserve Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TACTILE INQUIRY CONSOLE FORM (Dark Charcoal Contrast Block) */}
      <section
        id="inquiry-form"
        data-theme="dark"
        className="bg-[#171816] text-[#F5F0E7] py-24 sm:py-32 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(190,155,89,0.08)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold block mb-3">
              CONFIDENTIAL INQUIRY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F0E7] tracking-tight leading-tight">
              Begin Your Commission or Private Inquiry
            </h2>
            <p className="font-sans text-sm text-[#F5F0E7]/65 mt-3 font-light leading-relaxed">
              Please share initial project parameters. Your details are reviewed with strict non-disclosure.
            </p>
          </div>

          {/* Form / Success State */}
          {isSubmitted ? (
            <div className="bg-white/[0.03] border border-[#BE9B59]/40 rounded-[16px] p-10 sm:p-14 text-center backdrop-blur-md animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#BE9B59]/20 text-[#BE9B59] mx-auto flex items-center justify-center text-2xl mb-6">
                ✓
              </div>
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-2">
                INQUIRY LOGGED WITH ATELIER DIRECTOR
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#F5F0E7] font-light mb-4">
                Thank You, {formData.fullName || "Esteemed Client"}.
              </h3>
              <p className="font-sans text-sm text-[#F5F0E7]/70 max-w-lg mx-auto leading-relaxed mb-8">
                Your dossier has been securely dispatched to our Client Director. We will review your requirements and reach out via phone or email within 4 business hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      location: "",
                      message: "",
                    });
                    setFileName(null);
                  }}
                  className="px-6 py-3 rounded-full border border-white/20 text-xs font-sans tracking-[0.2em] uppercase text-white hover:border-[#BE9B59] hover:text-[#BE9B59] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-full bg-[#BE9B59] text-[#171816] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#d3b06e] transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.02] border border-white/10 rounded-[16px] p-8 sm:p-12 backdrop-blur-sm shadow-2xl"
            >
              {/* 1. Inquiry Category Selectors */}
              <div className="mb-10">
                <label className="block text-[11px] font-sans uppercase tracking-[0.22em] text-[#BE9B59] mb-3 font-semibold">
                  1. Nature of Inquiry
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {INQUIRY_TYPES.map((type) => {
                    const isSelected = inquiryType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#BE9B59] text-[#171816] font-medium shadow-md shadow-[#BE9B59]/20"
                            : "bg-white/5 text-[#F5F0E7]/70 hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#F5F0E7]/70 mb-2 font-medium"
                  >
                    Your Full Name <span className="text-[#BE9B59]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Lord Alistair Vance / Dr. Maya Al Hashimi"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#BE9B59] rounded-[8px] px-4 py-3.5 text-sm text-[#F5F0E7] placeholder:text-[#F5F0E7]/25 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#F5F0E7]/70 mb-2 font-medium"
                  >
                    Confidential Email Address <span className="text-[#BE9B59]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#BE9B59] rounded-[8px] px-4 py-3.5 text-sm text-[#F5F0E7] placeholder:text-[#F5F0E7]/25 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#F5F0E7]/70 mb-2 font-medium"
                  >
                    Mobile / WhatsApp with Country Code
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+971 50 000 0000"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#BE9B59] rounded-[8px] px-4 py-3.5 text-sm text-[#F5F0E7] placeholder:text-[#F5F0E7]/25 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#F5F0E7]/70 mb-2 font-medium"
                  >
                    Property Area / City
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Palm Jumeirah Villa, Emirates Hills, London"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#BE9B59] rounded-[8px] px-4 py-3.5 text-sm text-[#F5F0E7] placeholder:text-[#F5F0E7]/25 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 3. Message */}
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#F5F0E7]/70 mb-2 font-medium"
                >
                  Project Scope or Message Overview
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share details regarding architectural scope, square footage, desired aesthetics, or timeline constraints..."
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-[#BE9B59] rounded-[8px] px-4 py-3.5 text-sm text-[#F5F0E7] placeholder:text-[#F5F0E7]/25 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* 4. Optional Attachment */}
              <div className="mb-10">
                <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#F5F0E7]/70 mb-2 font-medium">
                  Attach Architectural Plans / Moodboard (Optional · Up to 25MB)
                </label>
                <div className="border border-dashed border-white/20 hover:border-[#BE9B59]/50 rounded-[8px] p-6 text-center transition-colors relative">
                  <input
                    type="file"
                    id="plans"
                    name="plans"
                    accept=".pdf,.dwg,.jpg,.jpeg,.png,.zip"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <svg
                      className="w-6 h-6 text-[#BE9B59] mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <span className="text-xs text-[#F5F0E7]/75 font-sans font-medium">
                      {fileName ? (
                        <span className="text-[#BE9B59] font-semibold">
                          Selected: {fileName}
                        </span>
                      ) : (
                        "Click or drag PDF, CAD drawings, or moodboard files here"
                      )}
                    </span>
                    <span className="text-[10px] text-[#F5F0E7]/40 mt-1 uppercase tracking-wider">
                      PDF, PNG, JPG, DWG, ZIP
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Submit Button with Privacy Assurance */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#F5F0E7]/60">
                  <span className="text-[#BE9B59]">🔒</span>
                  <span>Discreet end-to-end encrypted communication</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#BE9B59] hover:bg-[#d3b06e] text-[#171816] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl shadow-[#BE9B59]/20 hover:shadow-[#BE9B59]/30 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Dispatching to Client Director...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. DIRECT ATELIER DEPARTMENTS (Minimalist Luxury Directory) */}
      <section
        data-theme="light"
        className="py-20 lg:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-b border-[#171816]/10"
      >
        <div className="text-left mb-12">
          <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold block mb-2">
            DIRECT DIRECTORY
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#171816] tracking-tight">
            Key Practice Contacts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[12px] border border-[#171816]/10 hover:border-[#BE9B59]/50 transition-colors">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-2">
              NEW RESIDENTIAL COMMISSIONS
            </span>
            <h3 className="font-editorial text-2xl text-[#171816] mb-2">
              Private Client Director
            </h3>
            <p className="font-sans text-xs text-[#171816]/65 leading-relaxed mb-4">
              Direct oversight for villa estates, penthouses, and private royal family residences.
            </p>
            <a
              href="mailto:clientdirector@richmaninteriors.ae"
              className="text-xs font-sans font-semibold text-[#171816] hover:text-[#BE9B59] transition-colors"
            >
              clientdirector@richmaninteriors.ae &rarr;
            </a>
          </div>

          <div className="bg-white p-8 rounded-[12px] border border-[#171816]/10 hover:border-[#BE9B59]/50 transition-colors">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-2">
              PRESS, PUBLICATIONS &amp; AWARDS
            </span>
            <h3 className="font-editorial text-2xl text-[#171816] mb-2">
              Media &amp; Communications
            </h3>
            <p className="font-sans text-xs text-[#171816]/65 leading-relaxed mb-4">
              Architectural digest features, interview requests, and monograph high-res photography requests.
            </p>
            <a
              href="mailto:press@richmaninteriors.ae"
              className="text-xs font-sans font-semibold text-[#171816] hover:text-[#BE9B59] transition-colors"
            >
              press@richmaninteriors.ae &rarr;
            </a>
          </div>

          <div className="bg-white p-8 rounded-[12px] border border-[#171816]/10 hover:border-[#BE9B59]/50 transition-colors">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-2">
              ARTISAN, MARBLE &amp; TIMBER SUPPLIERS
            </span>
            <h3 className="font-editorial text-2xl text-[#171816] mb-2">
              Material Procurement
            </h3>
            <p className="font-sans text-xs text-[#171816]/65 leading-relaxed mb-4">
              Specialized stone quarries, bespoke bronze casting, and master artisan trade inquiries.
            </p>
            <a
              href="mailto:procurement@richmaninteriors.ae"
              className="text-xs font-sans font-semibold text-[#171816] hover:text-[#BE9B59] transition-colors"
            >
              procurement@richmaninteriors.ae &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 5. CONCIERGE FAQ / COMMON QUESTIONS */}
      <section
        data-theme="light"
        className="py-20 lg:py-28 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="text-center mb-16">
          <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold block mb-2">
            FREQUENT QUESTIONS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#171816] tracking-tight">
            Visiting &amp; Commissioning Questions
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[10px] p-6 sm:p-8 border border-[#171816]/10">
            <h3 className="font-editorial text-xl sm:text-2xl text-[#171816] mb-2">
              Do I need an appointment to visit the Al Quoz Atelier?
            </h3>
            <p className="font-sans text-sm text-[#171816]/70 leading-relaxed font-light">
              Yes. Because we maintain client confidentiality and our partners personally host material reviews, atelier tours and material library sessions are strictly by appointment. You can book an appointment via our direct desk or consultation form.
            </p>
          </div>

          <div className="bg-white rounded-[10px] p-6 sm:p-8 border border-[#171816]/10">
            <h3 className="font-editorial text-xl sm:text-2xl text-[#171816] mb-2">
              Do you take residential commissions outside Dubai?
            </h3>
            <p className="font-sans text-sm text-[#171816]/70 leading-relaxed font-light">
              Yes. While Dubai and Abu Dhabi represent the core of our turnkey fit-out commissions, our architectural team regularly stewards private estates in Riyadh, Doha, London, and the South of France.
            </p>
          </div>

          <div className="bg-white rounded-[10px] p-6 sm:p-8 border border-[#171816]/10">
            <h3 className="font-editorial text-xl sm:text-2xl text-[#171816] mb-2">
              How quickly can an initial site inspection take place?
            </h3>
            <p className="font-sans text-sm text-[#171816]/70 leading-relaxed font-light">
              Following an initial introductory consultation, an on-site walkthrough with a Design Director is typically scheduled within 48 to 72 hours anywhere across Dubai and Abu Dhabi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

