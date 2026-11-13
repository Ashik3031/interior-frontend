"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { COOKIE_CATEGORIES } from "@/data/cookieData";
import { CookieCategory, CookieConsentPreferences } from "@/types/cookieConsent";

export default function CookiePreferencesModal() {
  const {
    isModalOpen,
    preferences,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useCookieConsent();

  // Local draft state for toggles while modal is open
  const [draft, setDraft] = useState<CookieConsentPreferences>(preferences);
  const [expandedCategory, setExpandedCategory] = useState<CookieCategory | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync draft when preferences change or modal opens
  useEffect(() => {
    if (isModalOpen) {
      setDraft(preferences);
    }
  }, [isModalOpen, preferences]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePreferences();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closePreferences]);

  // Prevent background body scroll while modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  const handleToggle = (category: CookieCategory) => {
    if (category === "essential") return; // Essential is always locked
    setDraft((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSaveDraft = () => {
    savePreferences(draft);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={closePreferences}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-[#171816] text-[#F5F0E7] border border-white/15 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-[#BE9B59]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#BE9B59] font-semibold">
                RichMan Interiors · Privacy Center
              </span>
            </div>
            <h2
              id="cookie-modal-title"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-tight text-[#F5F0E7]"
            >
              Cookie Preferences
            </h2>
          </div>

          <button
            type="button"
            onClick={closePreferences}
            aria-label="Close cookie preferences modal"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE9B59] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content / Category List (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 scrollbar-none">
          <p className="font-sans text-xs sm:text-sm text-[#F5F0E7]/75 leading-relaxed font-light">
            When you visit RichMan Interiors, information may be stored through cookies on your
            browser. We value your digital privacy. You can adjust which non-essential cookies you
            consent to below. Your choices will be stored for 12 months.
          </p>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {COOKIE_CATEGORIES.map((cat) => {
              const isEnabled = draft[cat.id];
              const isRequired = cat.required;
              const isExpanded = expandedCategory === cat.id;

              return (
                <div key={cat.id} className="py-5 sm:py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F5F0E7]">
                          {cat.title}
                        </h3>
                        {cat.badge && (
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans uppercase tracking-widest font-semibold ${
                              isRequired
                                ? "bg-[#BE9B59]/20 text-[#BE9B59] border border-[#BE9B59]/40"
                                : isEnabled
                                ? "bg-white/15 text-white/90"
                                : "bg-white/5 text-white/40"
                            }`}
                          >
                            {cat.badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 font-sans text-xs sm:text-sm text-[#F5F0E7]/70 leading-relaxed font-light">
                        {cat.description}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCategory(isExpanded ? null : cat.id)
                        }
                        className="mt-3 font-sans text-xs text-[#BE9B59] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#BE9B59] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {isExpanded ? "Hide detailed cookies" : "View cookie details"}
                        </span>
                        <span aria-hidden="true">{isExpanded ? "↑" : "↓"}</span>
                      </button>
                    </div>

                    {/* Toggle Switch */}
                    <div className="shrink-0 pt-1">
                      {isRequired ? (
                        <div
                          className="w-12 h-6 flex items-center bg-[#BE9B59]/40 rounded-full p-1 cursor-not-allowed opacity-80"
                          title="Essential cookies are strictly required for website operation"
                        >
                          <div className="bg-[#BE9B59] w-4 h-4 rounded-full shadow-md transform translate-x-6" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isEnabled}
                          onClick={() => handleToggle(cat.id)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE9B59] cursor-pointer ${
                            isEnabled ? "bg-[#BE9B59]" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                              isEnabled ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expandable Cookie Details Table */}
                  {isExpanded && (
                    <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 text-xs font-sans text-[#F5F0E7]/80 animate-fade-in">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase tracking-wider">
                              <th className="pb-2 pr-4 font-medium">Cookie Name</th>
                              <th className="pb-2 pr-4 font-medium">Provider</th>
                              <th className="pb-2 pr-4 font-medium">Purpose</th>
                              <th className="pb-2 font-medium">Retention</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {cat.examples.map((item) => (
                              <tr key={item.name} className="font-light">
                                <td className="py-2.5 pr-4 text-[#BE9B59] font-mono">
                                  {item.name}
                                </td>
                                <td className="py-2.5 pr-4 text-white/90">{item.provider}</td>
                                <td className="py-2.5 pr-4">{item.purpose}</td>
                                <td className="py-2.5 text-white/60">{item.retention}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs text-white/50 font-sans">
            Read our full privacy disclosures in our{" "}
            <Link
              href="/cookie-policy"
              onClick={closePreferences}
              className="text-[#BE9B59] underline hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
            .
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 sm:p-8 border-t border-white/10 bg-[#141513] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={rejectAll}
            className="px-5 py-3 rounded-full border border-white/20 text-xs font-sans uppercase tracking-[0.16em] text-[#F5F0E7] hover:bg-white/10 hover:border-white/40 transition-colors text-center cursor-pointer"
          >
            Reject Non-Essential
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={acceptAll}
              className="px-6 py-3 rounded-full border border-[#BE9B59]/40 bg-[#BE9B59]/10 text-xs font-sans uppercase tracking-[0.16em] text-[#BE9B59] hover:bg-[#BE9B59]/20 transition-colors text-center cursor-pointer"
            >
              Accept All
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-8 py-3 rounded-full bg-[#BE9B59] hover:bg-[#d3b06e] text-xs font-sans uppercase tracking-[0.16em] font-semibold text-[#171816] transition-colors shadow-lg text-center cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

