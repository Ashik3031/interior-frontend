"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceData, SERVICES } from "@/data/servicesData";

interface Props {
  service: ServiceData;
}

export default function ServiceDetailPage({ service }: Props) {
  // Find current index to determine next service
  const currentIndex = SERVICES.findIndex((s) => s.slug === service.slug);
  const nextService =
    SERVICES[(currentIndex + 1) % SERVICES.length] || SERVICES[0];

  // Interactive States
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [expandedDeliverable, setExpandedDeliverable] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string; alt: string } | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Scroll detection for parallax and floating bar
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollY(currentY);
          setShowFloatingBar(currentY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-anim-id");
            if (id) {
              setVisibleSections((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll("[data-anim-id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [service.slug]);

  // Curated technical specs for each material specimen
  const materialSpecs = [
    {
      finish: "800-Grit Diamond Honed / Silk Velvet",
      acoustic: "Reverberation Damping Rating 0.42",
      application: "Palatial Living Rooms & Master Bath Feature Slabs",
      stewardship: "In-House Micro-Penetrating Fluoropolymer Seal",
    },
    {
      finish: "Custom Deep-Wire Brushed & Fumed Matte",
      acoustic: "Class A Architectural Acoustic Wall Slats",
      application: "Private Executive Library & Walk-in Dressing Suites",
      stewardship: "Zero-VOC Natural Hardwax Oil Hand Rub",
    },
    {
      finish: "Hand-Scratched Satin Champagne Patina",
      acoustic: "Precision Mechanical Anti-Rattle Gaskets",
      application: "Frameless Pivot Door Trim, Reveals & Pocket Pulls",
      stewardship: "Clear Nanotech Baked Protective Topcoat",
    },
  ];

  // Specific milestone timelines for each execution phase
  const phaseTimelines = [
    {
      duration: "Weeks 1–3",
      milestone: "Laser 3D Spatial Audit & Dubai Authority Preliminary Filing",
      approvals: "Initial Emaar / Nakheel / DCD master clearance checks",
    },
    {
      duration: "Weeks 4–7",
      milestone: "8K Virtual Reality Simulation & Full Material Board Lock",
      approvals: "Client sign-off on stone cuts, timber veneers & MEP schemes",
    },
    {
      duration: "Weeks 8–18",
      milestone: "Factory Millwork Dry-Fit & On-Site Precision Assembly",
      approvals: "Dubai Civil Defence (DCD) interim site safety inspection",
    },
    {
      duration: "Weeks 19–22",
      milestone: "White-Glove Staging, Acoustic Tuning & Turnkey Key Handover",
      approvals: "Final Building Completion Certificate (BCC) & 10-Yr Atelier Warranty",
    },
  ];

  return (
    <main className="bg-[#FAF8F5] text-[#171816] selection:bg-[#BE9B59] selection:text-[#171816] relative">
      {/* 1. BREADCRUMBS & EDITORIAL HERO */}
      <section
        data-theme="light"
        className="relative pt-36 sm:pt-40 md:pt-44 pb-16 lg:pb-24 border-b border-[#171816]/10 overflow-hidden"
      >
        {/* Subtle architectural grid pattern in background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#17181608_1px,transparent_1px),linear-gradient(to_bottom,#17181608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-sans text-[#171816]/50 uppercase tracking-[0.2em] mb-6 animate-fade-in"
          >
            <Link href="/" className="hover:text-[#BE9B59] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#BE9B59] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[#BE9B59] font-medium">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8">
              {/* Discipline Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BE9B59]/15 border border-[#BE9B59]/30 text-[#8f7134] text-[11px] font-sans font-semibold tracking-wider uppercase mb-5 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE9B59] animate-pulse" />
                <span>DISCIPLINE {service.id} · {service.eyebrow}</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-light text-[#171816] tracking-tight leading-[1.05] mb-6 animate-fade-up-delay-1">
                {service.title}
              </h1>

              <div className="relative pl-6 border-l-2 border-[#BE9B59] mb-6 animate-fade-up-delay-2">
                <p className="font-editorial text-2xl sm:text-3xl text-[#171816]/90 font-light italic leading-snug">
                  &ldquo;{service.leadParagraph}&rdquo;
                </p>
              </div>

              <p className="font-sans text-base sm:text-lg text-[#171816]/75 font-light leading-relaxed max-w-3xl animate-fade-up-delay-3">
                {service.description}
              </p>

              {/* Fast Feature Tags */}
              <div className="mt-8 flex flex-wrap gap-2.5 pt-6 border-t border-[#171816]/10">
                <span className="px-3 py-1 rounded-full bg-white border border-[#171816]/10 text-xs font-sans text-[#171816]/70">
                  ✦ Single-Contract Turnkey
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#171816]/10 text-xs font-sans text-[#171816]/70">
                  ✦ In-House Joinery Atelier
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#171816]/10 text-xs font-sans text-[#171816]/70">
                  ✦ Dubai Statutory Clearance Guaranteed
                </span>
              </div>
            </div>

            {/* Quick Metrics & Booking Box with Glassmorphism Elevation */}
            <div className="lg:col-span-4 bg-white rounded-[20px] p-8 border border-[#171816]/10 shadow-[0_25px_60px_rgba(23,24,22,0.07)] hover:border-[#BE9B59]/40 transition-all duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-[#171816]/10 mb-6">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold">
                  PRACTICE CAPABILITIES
                </span>
                <span className="font-editorial text-sm text-[#171816]/40">
                  ATELIER STANDARDS
                </span>
              </div>

              <div className="space-y-4 pb-6 border-b border-[#171816]/10">
                {service.stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between items-baseline text-xs font-sans group">
                    <span className="text-[#171816]/65 group-hover:text-[#171816] transition-colors">
                      {stat.label}
                    </span>
                    <span className="font-editorial text-lg text-[#171816] font-medium text-right group-hover:text-[#BE9B59] transition-colors">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-col gap-3">
                <Link
                  href="/consultation"
                  className="w-full py-3.5 rounded-full bg-[#171816] hover:bg-[#BE9B59] hover:text-[#171816] text-[#F5F0E7] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Commission This Service</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>

                <Link
                  href="/services"
                  className="w-full py-2.5 text-center text-[11px] font-sans uppercase tracking-[0.18em] text-[#171816]/60 hover:text-[#BE9B59] transition-colors"
                >
                  &larr; View All 6 Disciplines
                </Link>

                <span className="block text-center text-[10px] font-sans text-[#171816]/50">
                  Complimentary 45-min Principal Architect Review
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CINEMATIC FULL-BLEED PHOTOGRAPHIC SHOWCASE WITH PARALLAX */}
      <section className="relative w-full h-[52vh] sm:h-[62vh] lg:h-[75vh] overflow-hidden bg-[#171816]">
        <div
          className="relative w-full h-[120%] -top-[10%] transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 80)}px) scale(1.02)`,
          }}
        >
          <Image
            src={service.heroImage}
            alt={`${service.title} architectural commission by RichMan Interiors`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-95"
          />
        </div>

        {/* Gradient overlays for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

        {/* Floating featured commission badge */}
        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 max-w-xl text-white z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BE9B59]" />
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold">
              FEATURED DISCIPLINE SHOWCASE
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-snug">
            {service.featuredProject.title}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-white/80 mt-1.5 flex items-center gap-2">
            <span>{service.featuredProject.location}</span>
            <span>·</span>
            <span>{service.featuredProject.area}</span>
            <span>·</span>
            <span className="text-[#BE9B59] font-medium">{service.featuredProject.scope}</span>
          </p>
        </div>

        {/* Architectural corner crosshairs */}
        <div className="absolute top-6 left-6 text-white/40 text-xs font-mono pointer-events-none">
          + 25°12'04"N 55°16'38"E [DXB]
        </div>
        <div className="absolute top-6 right-6 text-white/40 text-xs font-mono pointer-events-none">
          RICHMAN ATELIER ARCHIVE // 0{service.id}
        </div>
      </section>

      {/* 3. DELIVERABLES & TECHNICAL SCOPE WITH STAGGERED SCROLL REVEAL */}
      <section
        data-theme="light"
        data-anim-id="deliverables"
        className="py-20 lg:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div
          className={`max-w-3xl mb-16 transition-all duration-700 ${visibleSections.deliverables
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
            }`}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#BE9B59]" />
            <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold">
              SCOPE OF STEWARDSHIP
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#171816] tracking-tight">
            Detailed Atelier Deliverables
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#171816]/70 font-light mt-3 leading-relaxed">
            Every drawing package, material selection, and site coordination milestone is defined with millimeter tolerance and zero ambiguity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.deliverables.map((item, idx) => {
            const isExpanded = expandedDeliverable === idx;
            return (
              <div
                key={item.title}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`group relative bg-white rounded-[16px] p-8 border border-[#171816]/10 hover:border-[#BE9B59]/70 hover:shadow-[0_20px_50px_rgba(190,155,89,0.12)] transition-all duration-500 flex flex-col justify-between ${visibleSections.deliverables
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                  }`}
              >
                {/* Architectural corner drafting marks */}
                <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-[#BE9B59]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-[#BE9B59]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-[#BE9B59]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-[#BE9B59]/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#171816]/10">
                    <span className="font-editorial text-2xl text-[#BE9B59] font-light group-hover:translate-x-0.5 transition-transform">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#171816]/40">
                      MILESTONE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-[#171816] mb-3 leading-snug group-hover:text-[#BE9B59] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#171816]/70 leading-relaxed font-light mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Interactive Technical Submittals Drawer */}
                <div className="pt-4 border-t border-[#171816]/10">
                  <button
                    type="button"
                    onClick={() => setExpandedDeliverable(isExpanded ? null : idx)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.16em] text-[#BE9B59] font-semibold hover:text-[#8f7134] transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide Technical Protocol" : "View Technical Protocol"}</span>
                    <span className={`text-xs transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-3.5 bg-[#FAF8F5] rounded-lg border border-[#BE9B59]/20 text-[11px] font-sans text-[#171816]/80 space-y-1.5 animate-fade-in">
                      <div className="flex items-center gap-1.5 font-medium text-[#171816]">
                        <span className="text-[#BE9B59]">✓</span>
                        <span>CAD &amp; BIM Format: Autodesk Revit 2024 / AutoCAD DWG</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#BE9B59]">✓</span>
                        <span>Dubai Compliance: Full Emaar/Nakheel NOC Coordination</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#BE9B59]">✓</span>
                        <span>Site Verification: 3D Laser Scanning Verification Before Build</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE MATERIAL SPECIMEN LABORATORY (DARK CONTRAST) */}
      <section
        data-theme="dark"
        data-anim-id="materials"
        className="bg-[#171816] text-[#F5F0E7] py-24 sm:py-32 relative overflow-hidden"
      >
        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(190,155,89,0.09)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div
            className={`max-w-3xl mb-16 transition-all duration-700 ${visibleSections.materials
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#BE9B59] animate-pulse" />
              <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold">
                TACTILE LABORATORY &amp; PROVENANCE
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F0E7] tracking-tight leading-tight mb-4">
              Curated Material Specimens
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/65 font-light leading-relaxed">
              We travel directly to European quarries and master mills to inspect and harvest authentic, durable natural materials with zero synthetic veneers.
            </p>
          </div>

          {/* Interactive Specimen Selector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Selector List */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#BE9B59] font-semibold mb-1 block">
                SELECT SPECIMEN TO INSPECT
              </span>

              {service.materials.map((mat, idx) => {
                const isActive = activeMaterialIndex === idx;
                return (
                  <button
                    key={mat.name}
                    type="button"
                    onClick={() => setActiveMaterialIndex(idx)}
                    className={`text-left p-5 rounded-xl border transition-all duration-300 flex items-start justify-between cursor-pointer ${isActive
                      ? "bg-white/[0.08] border-[#BE9B59] shadow-[0_10px_30px_rgba(190,155,89,0.15)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                      }`}
                  >
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] block mb-1">
                        SPECIMEN 0{idx + 1} · {mat.origin}
                      </span>
                      <h3 className="font-editorial text-xl sm:text-2xl text-white font-light">
                        {mat.name}
                      </h3>
                      <p className="font-sans text-xs text-white/60 font-light mt-1 line-clamp-2">
                        {mat.description}
                      </p>
                    </div>

                    <span
                      className={`text-lg transition-transform duration-300 ${isActive ? "text-[#BE9B59] translate-x-1" : "text-white/20"
                        }`}
                    >
                      &rarr;
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Dossier Panel */}
            <div className="lg:col-span-7 bg-white/[0.03] border border-[#BE9B59]/30 rounded-2xl p-8 sm:p-10 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(ellipse_at_center,_rgba(190,155,89,0.12)_0%,_transparent_70%)] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block">
                      ARCHITECTURAL DOSSIER
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-white font-light mt-1">
                      {service.materials[activeMaterialIndex]?.name}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#BE9B59]/20 border border-[#BE9B59]/40 text-[#BE9B59] text-[10px] font-sans uppercase tracking-[0.2em]">
                    Provenance: {service.materials[activeMaterialIndex]?.origin}
                  </span>
                </div>

                <p className="font-sans text-sm text-white/80 font-light leading-relaxed mb-8">
                  {service.materials[activeMaterialIndex]?.description}
                </p>

                {/* 4 Technical Specification Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#BE9B59] block mb-1">
                      Surface Finish Profile
                    </span>
                    <span className="font-sans text-xs text-white/90">
                      {materialSpecs[activeMaterialIndex]?.finish}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#BE9B59] block mb-1">
                      Acoustic &amp; Thermal Rating
                    </span>
                    <span className="font-sans text-xs text-white/90">
                      {materialSpecs[activeMaterialIndex]?.acoustic}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#BE9B59] block mb-1">
                      Recommended Application
                    </span>
                    <span className="font-sans text-xs text-white/90">
                      {materialSpecs[activeMaterialIndex]?.application}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#BE9B59] block mb-1">
                      Atelier Stewardship Protocol
                    </span>
                    <span className="font-sans text-xs text-white/90">
                      {materialSpecs[activeMaterialIndex]?.stewardship}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Callout inside Dossier */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-sans text-white/60">
                  Physical sample presentation available during studio consultation.
                </span>

                <Link
                  href="/consultation"
                  className="px-6 py-2.5 rounded-full bg-[#BE9B59] hover:bg-[#d3b06e] text-[#171816] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-colors whitespace-nowrap shadow-md"
                >
                  Request Sample Box &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE 4-PHASE EXECUTION ROADMAP */}
      <section
        data-theme="light"
        data-anim-id="roadmap"
        className="py-20 lg:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${visibleSections.roadmap
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#BE9B59]" />
            <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold">
              METHODICAL STEWARDSHIP
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#171816] tracking-tight">
            How We Execute This Discipline
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#171816]/70 font-light mt-3">
            Click any milestone phase below to reveal timelines, mandatory Dubai authority sign-offs, and quality gates.
          </p>
        </div>

        {/* Phase Stepper Navigator */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.processSteps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                style={{ transitionDelay: `${idx * 120}ms` }}
                className={`relative p-6 sm:p-7 rounded-[18px] border transition-all duration-500 cursor-pointer flex flex-col justify-between ${isSelected
                  ? "bg-white border-[#BE9B59] shadow-[0_20px_50px_rgba(190,155,89,0.15)] ring-1 ring-[#BE9B59]/40"
                  : "bg-white/60 border-[#171816]/10 hover:bg-white hover:border-[#BE9B59]/40"
                  } ${visibleSections.roadmap
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                  }`}
              >
                {/* Connecting horizontal line for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-[2px] bg-[#BE9B59]/30 z-10" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-editorial text-4xl text-[#BE9B59] font-light">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-[#BE9B59]/10 text-[#8f7134] font-medium">
                      {phaseTimelines[idx]?.duration}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-[#171816] mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-[#171816]/70 leading-relaxed font-light mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Highlighted milestone on active */}
                <div className="pt-4 border-t border-[#171816]/10 text-[11px] font-sans space-y-1">
                  <div className="text-[#171816]/50 uppercase tracking-wider text-[9px] font-semibold">
                    REGULATORY GATEWAY
                  </div>
                  <div className="text-[#171816]/80 font-medium">
                    {phaseTimelines[idx]?.approvals}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. PERSPECTIVE GALLERY WITH LIGHTBOX / LENS HOVER */}
      <section
        data-theme="light"
        data-anim-id="gallery"
        className="py-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-[#171816]/10"
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 transition-all duration-700 ${visibleSections.gallery
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
            }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#BE9B59]" />
              <span className="text-[#BE9B59] uppercase tracking-[0.28em] text-xs font-sans font-semibold">
                PORTFOLIO PERSPECTIVES
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-light text-[#171816]">
              Realized Commission Perspectives
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#BE9B59] hover:text-[#8f7134] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Explore All 8 Dubai Projects</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.gallery.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxImage(img)}
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`group relative rounded-[16px] overflow-hidden aspect-[4/3] bg-neutral-200 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${visibleSections.gallery
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Architectural lens overlay with crosshair */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-sans text-white uppercase tracking-widest border border-white/20">
                    Click to Zoom
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#BE9B59] font-medium block mb-1">
                    PERSPECTIVE 0{i + 1}
                  </span>
                  <p className="font-sans text-xs text-white/95 font-light leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEXT DISCIPLINE HORIZON NAVIGATOR (DARK ATELIER BAR) */}
      <section className="bg-[#171816] text-[#F5F0E7] py-16 sm:py-20 border-t border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(ellipse_at_center,_rgba(190,155,89,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] block mb-2 font-semibold">
              NEXT DISCIPLINE IN CYCLE
            </span>
            <Link
              href={`/services/${nextService.slug}`}
              className="group inline-flex items-center gap-4"
            >
              <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-[#BE9B59] transition-colors font-light leading-tight">
                {nextService.title}
              </span>
              <span className="text-[#BE9B59] text-2xl group-hover:translate-x-2 transition-transform">
                &rarr;
              </span>
            </Link>
            <p className="font-sans text-xs text-white/60 font-light mt-1 max-w-md">
              {nextService.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="px-6 py-3 rounded-full border border-white/20 text-xs font-sans uppercase tracking-[0.2em] text-white hover:border-[#BE9B59] hover:text-[#BE9B59] transition-colors"
            >
              All Disciplines
            </Link>
            <Link
              href="/consultation"
              className="px-8 py-3.5 rounded-full bg-[#BE9B59] text-[#171816] text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#d3b06e] transition-colors shadow-lg"
            >
              Consult an Architect
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FLOATING STICKY ACTION PILL (Appears on Scroll) */}
      <aside
        aria-label="Floating Actions"
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${showFloatingBar
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-10 opacity-0 pointer-events-none"
          }`}
      >
        <div className="bg-[#141513]/95 backdrop-blur-xl border border-[#BE9B59]/40 rounded-full py-2.5 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 text-xs">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#BE9B59] hidden sm:inline">
            Discipline {service.id}
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <Link
            href="/consultation"
            className="px-3.5 py-1.5 rounded-full bg-[#BE9B59] hover:bg-[#d3b06e] text-[#171816] font-semibold uppercase tracking-wider text-[10px] transition-colors shadow-sm"
          >
            Commission Service &rarr;
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-1.5 text-white/70 hover:text-[#BE9B59] transition-colors focus:outline-none"
            aria-label="Scroll back to top"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* 9. LIGHTBOX MODAL FOR PERSPECTIVES */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#171816] rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-default"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:text-[#BE9B59] transition-colors border border-white/20"
              aria-label="Close image lightbox"
            >
              ✕
            </button>

            <div className="relative w-full aspect-[16/10]">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-[#171816] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BE9B59] font-semibold block mb-1">
                  RICHMAN ARCHITECTURAL PERSPECTIVE
                </span>
                <p className="font-sans text-sm text-white/90 font-light">
                  {lightboxImage.caption}
                </p>
              </div>

              <Link
                href="/portfolio"
                onClick={() => setLightboxImage(null)}
                className="px-5 py-2 rounded-full border border-white/20 hover:border-[#BE9B59] text-xs font-sans uppercase tracking-[0.18em] text-[#BE9B59] whitespace-nowrap transition-colors"
              >
                View in Portfolio &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
