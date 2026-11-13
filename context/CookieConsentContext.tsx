"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CookieConsentPreferences } from "@/types/cookieConsent";
import {
  DEFAULT_PREFERENCES,
  ACCEPT_ALL_PREFERENCES,
  REJECT_ALL_PREFERENCES,
  getStoredConsent,
  storeConsent,
  removeStoredConsent,
} from "@/lib/cookieConsent";

interface CookieConsentContextType {
  preferences: CookieConsentPreferences;
  hasDecided: boolean;
  isBannerOpen: boolean;
  isModalOpen: boolean;
  isMounted: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (newPrefs: Partial<CookieConsentPreferences>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  closeBanner: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  preferences: DEFAULT_PREFERENCES,
  hasDecided: false,
  isBannerOpen: false,
  isModalOpen: false,
  isMounted: false,
  acceptAll: () => {},
  rejectAll: () => {},
  savePreferences: () => {},
  openPreferences: () => {},
  closePreferences: () => {},
  closeBanner: () => {},
  resetConsent: () => {},
});

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(DEFAULT_PREFERENCES);
  const [hasDecided, setHasDecided] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Check stored consent on client mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const existing = getStoredConsent();

    if (existing) {
      setPreferences(existing);
      setHasDecided(true);
      setIsBannerOpen(false);
    } else {
      // First visit: Show banner after a brief, subtle entrance delay
      const timer = setTimeout(() => {
        setIsBannerOpen(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const updated = { ...ACCEPT_ALL_PREFERENCES, timestamp: new Date().toISOString() };
    setPreferences(updated);
    setHasDecided(true);
    setIsBannerOpen(false);
    setIsModalOpen(false);
    storeConsent(updated);
  }, []);

  const rejectAll = useCallback(() => {
    const updated = { ...REJECT_ALL_PREFERENCES, timestamp: new Date().toISOString() };
    setPreferences(updated);
    setHasDecided(true);
    setIsBannerOpen(false);
    setIsModalOpen(false);
    storeConsent(updated);
  }, []);

  const savePreferences = useCallback(
    (newPrefs: Partial<CookieConsentPreferences>) => {
      const updated: CookieConsentPreferences = {
        ...preferences,
        ...newPrefs,
        essential: true, // Always locked to true
        timestamp: new Date().toISOString(),
      };
      setPreferences(updated);
      setHasDecided(true);
      setIsBannerOpen(false);
      setIsModalOpen(false);
      storeConsent(updated);
    },
    [preferences]
  );

  const openPreferences = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const closeBanner = useCallback(() => {
    setIsBannerOpen(false);
  }, []);

  const resetConsent = useCallback(() => {
    removeStoredConsent();
    setPreferences(DEFAULT_PREFERENCES);
    setHasDecided(false);
    setIsBannerOpen(true);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasDecided,
        isBannerOpen,
        isModalOpen,
        isMounted,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
        closeBanner,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

