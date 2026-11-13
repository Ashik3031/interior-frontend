"use client";

import React from "react";
import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieConsentBanner() {
  const { isBannerOpen, isMounted, acceptAll, rejectAll, openPreferences } =
    useCookieConsent();

  // Guard against SSR hydration mismatches
  if (!isMounted || !isBannerOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie consent banner"
      role="region"
      className="fixed bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 z-[60] pointer-events-none animate-fade-in"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto rounded-xl bg-[#171816]/95 text-[#F5F0E7] border border-white/10 px-5 py-3.5 sm:px-6 sm:py-3.5 shadow-2xl backdrop-blur-md transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Minimal Notice */}
          <p className="font-sans text-xs text-[#F5F0E7]/80 leading-relaxed font-light">
            We use cookies to refine your browsing experience and analyze site traffic. Read our{" "}
            <Link
              href="/cookie-policy"
              className="underline underline-offset-4 text-[#F5F0E7] hover:text-[#BE9B59] transition-colors"
            >
              Cookie Policy
            </Link>
            .
          </p>

          {/* Compact Minimal Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-[#BE9B59] px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.14em] font-semibold text-[#171816] transition-colors duration-200 hover:bg-[#d1b172] focus:outline-none cursor-pointer"
            >
              Accept All
            </button>

            <button
              type="button"
              onClick={rejectAll}
              className="rounded-full border border-white/20 bg-transparent px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-[0.14em] font-medium text-[#F5F0E7]/90 transition-colors duration-200 hover:bg-white/10 hover:border-white/40 focus:outline-none cursor-pointer"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={openPreferences}
              className="font-sans text-[11px] text-[#BE9B59] hover:underline underline-offset-4 transition-colors focus:outline-none cursor-pointer px-1 py-1"
            >
              Preferences
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
