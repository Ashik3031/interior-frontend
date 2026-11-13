"use client";

import React from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

interface CookieSettingsButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CookieSettingsButton({
  className,
  children,
}: CookieSettingsButtonProps) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      aria-label="Manage cookie settings and privacy preferences"
      className={
        className ??
        "hover:text-white/70 transition-colors cursor-pointer text-xs focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#BE9B59]"
      }
    >
      {children ?? "Cookie Settings"}
    </button>
  );
}

