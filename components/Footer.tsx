"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ConsultationDialog from "./Consultationdialog";

export default function Footer() {
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live Dubai Time (GST, UTC+4)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer
        id="contact"
        data-theme="dark"
        className="relative bg-[#121312] text-[#F5F0E7] border-t border-white/[0.08] overflow-hidden"
      >
        {/* Subtle architectural ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[radial-gradient(ellipse_at_center,_rgba(190,155,89,0.08)_0%,_transparent_70%)] blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12 sm:pt-24 sm:pb-16">
          {/* Top Invitation Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 sm:pb-20 border-b border-white/[0.07] items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#BE9B59] uppercase font-sans font-medium mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE9B59]" />
                Commissions & Inquiries
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E7] leading-[1.15] max-w-2xl">
                Ready to craft a home that reflects quiet distinction?
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:justify-end">
              <Link
                href="/consultation"
                className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs tracking-[0.2em] font-medium uppercase text-[#171816] bg-[#BE9B59] hover:bg-[#d3b06e] transition-all duration-300 shadow-lg shadow-[#BE9B59]/10 hover:shadow-[#BE9B59]/20 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <svg
                  className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <a
                href="mailto:concierge@richmaninteriors.com"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs tracking-[0.18em] font-medium uppercase text-white/85 hover:text-white border border-white/20 hover:border-[#BE9B59]/50 hover:bg-white/[0.03] transition-all duration-300"
              >
                Direct Concierge
              </a>
            </div>
          </div>

          {/* Main Footer Links & Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16 sm:py-20 border-b border-white/[0.07]">
            {/* Column 1: Brand & Atelier identity */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3.5 group mb-6"
                  aria-label="RichMan Interiors Homepage"
                >
                  <div className="relative w-9 h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/RM Interior - Logo Icon .png"
                      alt="RichMan Interiors Emblem"
                      width={36}
                      height={44}
                      className="w-full h-full object-contain filter brightness-105"
                    />
                  </div>
                  <div className="flex flex-col select-none">
                    <span className="font-editorial text-xl tracking-[0.22em] font-light text-[#F5F0E7] group-hover:text-[#BE9B59] transition-colors leading-none mb-1">
                      RICHMAN
                    </span>
                    <span className="text-[9px] tracking-[0.38em] text-[#BE9B59] uppercase font-sans font-medium">
                      INTERIORS
                    </span>
                  </div>
                </Link>

                <p className="text-sm font-sans text-white/60 leading-relaxed max-w-sm">
                  Premier interior architecture and turnkey renovation studio based in Dubai.
                  Creating timeless, considered sanctuaries for villas, penthouses, and private estates.
                </p>
              </div>

              {/* Atelier Status & Time */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-3 text-xs text-white/50 font-sans">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BE9B59] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BE9B59]" />
                </span>
                <span>
                  Dubai Studio • <span className="text-white/80 font-medium">{currentTime || "GST"}</span> (GMT+4)
                </span>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="lg:col-span-3">
              <h3 className="text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#BE9B59] mb-5">
                Disciplines
              </h3>
              <ul className="space-y-3.5 text-sm font-sans text-white/70">
                <li>
                  <Link
                    href="/#interior-architecture"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Interior Architecture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#luxury-renovation"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Villa & Penthouse Renovation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#bespoke-joinery"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Bespoke Joinery & Millwork
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Turnkey Project Stewardship
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Art & Furniture Curation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Studio & Navigation */}
            <div className="lg:col-span-2">
              <h3 className="text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#BE9B59] mb-5">
                Studio
              </h3>
              <ul className="space-y-3.5 text-sm font-sans text-white/70">
                <li>
                  <Link href="/About" className="hover:text-[#BE9B59] transition-colors inline-block">
                    About the Atelier
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="hover:text-[#BE9B59] transition-colors inline-block">
                    Design Process
                  </Link>
                </li>
                <li>
                  <Link href="/#portfolio" className="hover:text-[#BE9B59] transition-colors inline-block">
                    Selected Works
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-[#BE9B59] transition-colors inline-block">
                    Frequently Asked
                  </Link>
                </li>
                <li>
                  <Link
                    href="/consultation"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Book a Consultation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Private Lookbook & Atelier Address */}
            <div className="lg:col-span-3">
              <h3 className="text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#BE9B59] mb-5">
                Private Gazette
              </h3>
              <p className="text-xs font-sans text-white/60 leading-relaxed mb-4">
                Receive private portfolio releases, material monographs, and architectural perspectives.
              </p>

              <form onSubmit={handleSubscribe} className="relative mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-[#BE9B59] rounded-sm py-2.5 pl-3.5 pr-10 text-xs font-sans text-white placeholder-white/30 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Private Gazette"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-[#BE9B59] hover:text-[#d3b06e] transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>

              {subscribed && (
                <p className="text-xs text-[#BE9B59] mb-4 animate-fade-in font-sans">
                  Thank you. You have been added to our private dispatch.
                </p>
              )}

              {/* Studio Contact */}
              <div className="space-y-1.5 text-xs font-sans text-white/50 pt-2 border-t border-white/[0.06]">
                <p className="text-white/70">Dubai Design District (d3), Building 6</p>
                <p>Dubai, United Arab Emirates</p>
                <p className="pt-1">
                  <a
                    href="mailto:concierge@richmaninteriors.com"
                    className="hover:text-[#BE9B59] transition-colors"
                  >
                    concierge@richmaninteriors.com
                  </a>
                </p>
              </div>
            </div>
          </div>


          {/* Bottom Bar: Copyright, Socials, Back to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans text-white/45">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center sm:text-left">
              <span>&copy; {new Date().getFullYear()} RichMan Interiors FZ-LLC.</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="hover:text-white/70 transition-colors cursor-pointer">
                Privacy & Data Policy
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="hover:text-white/70 transition-colors cursor-pointer">
                Terms of Commission
              </span>
            </div>

            {/* Socials & Back to Top */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-white/60">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9B59] transition-colors tracking-widest text-[11px] uppercase"
                >
                  Instagram
                </a>
                <span className="text-white/20">/</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9B59] transition-colors tracking-widest text-[11px] uppercase"
                >
                  LinkedIn
                </a>
                <span className="text-white/20">/</span>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9B59] transition-colors tracking-widest text-[11px] uppercase"
                >
                  Pinterest
                </a>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="group flex items-center gap-2 pl-4 border-l border-white/10 hover:text-[#BE9B59] transition-colors cursor-pointer"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase">Top</span>
                <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-[#BE9B59] flex items-center justify-center transition-colors">
                  <svg
                    className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Consultation Dialog */}
      <ConsultationDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
