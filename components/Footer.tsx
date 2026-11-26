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
      {/* ============ COMMISSIONS & INQUIRIES SESSION (Off-White) ============ */}
      <section
        id="commissions"
        data-theme="light"
        aria-label="Commissions and Inquiries"
        className="relative bg-[#FAF8F5] text-[#171816] border-t border-[#171816]/10 overflow-hidden"
      >
        {/* Subtle architectural ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[radial-gradient(ellipse_at_center,_rgba(190,155,89,0.12)_0%,_transparent_70%)] blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#BE9B59] uppercase font-sans font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE9B59]" />
                Commissions &amp; Inquiries
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#171816] leading-[1.15] max-w-2xl">
                Ready to craft a luxury interior that reflects quiet distinction?
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:justify-end">
              <Link
                href="/consultation"
                className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs tracking-[0.2em] font-medium uppercase text-[#171816] bg-[#BE9B59] hover:bg-[#d3b06e] transition-all duration-300 shadow-md shadow-[#BE9B59]/20 cursor-pointer"
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
                href="https://wa.me/971521934887"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs tracking-[0.18em] font-medium uppercase text-[#171816] hover:text-[#BE9B59] border border-[#171816]/20 hover:border-[#BE9B59]/60 hover:bg-[#BE9B59]/5 transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c1.004.551 1.766.818 2.806.818 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.767-5.768zm0-1.745c4.148 0 7.513 3.364 7.513 7.513 0 4.149-3.365 7.514-7.513 7.514-1.229 0-2.383-.306-3.411-.861l-4.62 1.212 1.233-4.502c-.657-1.077-1.015-2.316-1.015-3.613 0-4.149 3.365-7.513 7.513-7.513zm-1.848 4.298c-.144-.32-.296-.327-.433-.332-.112-.005-.24-.005-.368-.005s-.336.048-.512.24-.672.656-.672 1.6c0 .944.688 1.856.784 1.984.096.128 1.328 2.08 3.264 2.88 1.609.664 1.936.532 2.288.499.352-.032 1.136-.464 1.296-.912.16-.448.16-.832.112-.912-.048-.08-.176-.128-.368-.224s-1.136-.56-1.312-.624-.304-.096-.432.096c-.128.192-.496.624-.608.752s-.224.144-.416.048c-.192-.096-.811-.299-1.545-.953-.571-.51-1.004-1.144-1.116-1.336s-.012-.297.084-.393c.087-.086.192-.224.288-.336.096-.112.128-.192.192-.32.064-.128.032-.24-.016-.336-.048-.096-.426-1.047-.6-1.442z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAIN FOOTER LINKS & INFORMATION (Premium White) ============ */}
      <footer
        id="contact"
        data-theme="light"
        className="relative bg-white text-[#171816] border-t border-[#171816]/10 overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12 sm:pt-20 sm:pb-16">
          {/* Main Footer Links & Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 sm:pb-20 border-b border-[#171816]/10">
            {/* Column 1: Brand & Atelier identity */}
            <div className="lg:col-span-5 flex flex-col justify-between">
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
                    <span className="font-editorial text-xl tracking-[0.22em] font-light text-[#171816] group-hover:text-[#BE9B59] transition-colors leading-none mb-1">
                      RICHMAN
                    </span>
                    <span className="text-[9px] tracking-[0.38em] text-[#BE9B59] uppercase font-sans font-medium">
                      INTERIORS
                    </span>
                  </div>
                </Link>

                <p className="text-sm font-sans text-[#171816]/70 leading-relaxed max-w-sm">
                  Premier interior architecture and turnkey fit-out company based in Dubai.
                  Creating timeless, considered sanctuaries for villas, penthouses, and private estates.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-sans text-[#171816]/75">
                  <Link href="/about" className="hover:text-[#BE9B59] transition-colors font-medium">
                    About
                  </Link>
                  <span className="text-[#171816]/30">•</span>
                  <Link href="/portfolio" className="hover:text-[#BE9B59] transition-colors font-medium">
                    Portfolio
                  </Link>
                  <span className="text-[#171816]/30">•</span>
                  <Link href="/consultation" className="hover:text-[#BE9B59] transition-colors font-medium">
                    Consultation
                  </Link>
                  <span className="text-[#171816]/30">•</span>
                  <Link href="/contact" className="hover:text-[#BE9B59] transition-colors font-medium">
                    Contact
                  </Link>
                </div>
              </div>

              {/* Atelier Status & Time */}
              <div className="mt-8 pt-6 border-t border-[#171816]/10 flex items-center gap-3 text-xs text-[#171816]/60 font-sans">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BE9B59] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BE9B59]" />
                </span>
                <span>
                  Dubai Atelier • <span className="text-[#171816] font-medium">{currentTime || "GST"}</span> (GMT+4)
                </span>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="lg:col-span-3">
              <h3 className="text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#BE9B59] mb-5">
                Disciplines
              </h3>
              <ul className="space-y-3.5 text-sm font-sans text-[#171816]/75">
                <li>
                  <Link
                    href="/services/complete-turnkey-fit-out"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Complete Turnkey Fit-Out
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/villa-apartment-renovations"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Villa &amp; Apartment Renovations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/office-commercial-interiors"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Office &amp; Commercial Interiors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mep-works"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    MEP Works (HVAC, Electrical, Plumbing)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/authority-approval-coordination"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Authority Approval Coordination
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/project-management-execution"
                    className="hover:text-[#BE9B59] transition-colors inline-block"
                  >
                    Project Management &amp; Execution
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-[#BE9B59] hover:text-[#d3b06e] transition-colors inline-block pt-1 font-medium"
                  >
                    &rarr; All 6 Practice Disciplines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Private Gazette & Atelier Address */}
            <div className="md:col-span-2 lg:col-span-4">
              <h3 className="text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#BE9B59] mb-5">
                Private Gazette
              </h3>
              <p className="text-xs font-sans text-[#171816]/70 leading-relaxed mb-4">
                Receive private portfolio releases, material monographs, and architectural perspectives.
              </p>

              <form onSubmit={handleSubscribe} className="relative mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#FAF8F5] border border-[#171816]/15 focus:border-[#BE9B59] rounded-sm py-2.5 pl-3.5 pr-10 text-xs font-sans text-[#171816] placeholder-[#171816]/40 focus:outline-none transition-colors shadow-xs"
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
                <p className="text-xs text-[#BE9B59] mb-4 animate-fade-in font-sans font-medium">
                  Thank you. You have been added to our private dispatch.
                </p>
              )}

              {/* Atelier Contact */}
              <div className="space-y-1.5 text-xs font-sans text-[#171816]/60 pt-2 border-t border-[#171816]/10">
                <a
                  href="https://share.google/065EEIjbEAjtDciRe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9B59] transition-colors block"
                >
                  <p className="text-[#171816]/85 font-medium">The Tower Plaza Hotel - Office 2004 &amp; 2003A</p>
                  <p>Sheikh Zayed Rd - Trade Center First</p>
                  <p>Dubai - United Arab Emirates</p>
                </a>
                <p className="pt-1.5 flex flex-col gap-1">
                  <a
                    href="tel:+971521934887"
                    className="hover:text-[#BE9B59] transition-colors"
                  >
                    +971 52 193 4887
                  </a>
                  <a
                    href="mailto:info@richmaninterior.ae"
                    className="hover:text-[#BE9B59] transition-colors"
                  >
                    info@richmaninterior.ae
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Socials, Back to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans text-[#171816]/60">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center sm:text-left">
              <span>&copy; 2026 RichMan Interiors </span>
              <span className="hidden sm:inline text-[#171816]/20">•</span>
              <Link href="/cookie-policy" className="hover:text-[#BE9B59] transition-colors">
                Cookie Policy
              </Link>
              <span className="hidden sm:inline text-[#171816]/20">•</span>
              <span className="hover:text-[#BE9B59] transition-colors cursor-pointer">
                Terms of Commission
              </span>
            </div>

            {/* Socials & Back to Top */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-[#171816]/70">
                <a
                  href="https://www.instagram.com/richmaninteriorsuae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9B59] transition-colors tracking-widest text-[11px] uppercase font-medium"
                >
                  Instagram
                </a>
                <span className="text-[#171816]/20">/</span>
                <a
                  href="https://www.facebook.com/richmaninterior/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9B59] transition-colors tracking-widest text-[11px] uppercase font-medium"
                >
                  Facebook
                </a>
                <span className="text-[#171816]/20">/</span>
                <a
                  href="https://www.youtube.com/@RichmanInterior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9B59] transition-colors tracking-widest text-[11px] uppercase font-medium"
                >
                  YouTube
                </a>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="group flex items-center gap-2 pl-4 border-l border-[#171816]/10 hover:text-[#BE9B59] transition-colors cursor-pointer"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Top</span>
                <div className="w-6 h-6 rounded-full border border-[#171816]/20 group-hover:border-[#BE9B59] flex items-center justify-center transition-colors">
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
