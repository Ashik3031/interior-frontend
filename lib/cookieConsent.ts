import { CookieConsentPreferences } from "@/types/cookieConsent";

export const COOKIE_CONSENT_NAME = "richman_cookie_consent";
export const COOKIE_EXPIRY_DAYS = 365;
export const CURRENT_CONSENT_VERSION = "1.0";

export const DEFAULT_PREFERENCES: CookieConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const ACCEPT_ALL_PREFERENCES: CookieConsentPreferences = {
  essential: true,
  analytics: true,
  marketing: true,
  functional: true,
};

export const REJECT_ALL_PREFERENCES: CookieConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

/**
 * Safely parse a cookie string from document.cookie
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Safely set a cookie with SameSite and Max-Age attributes
 */
export function setCookie(name: string, value: string, days = COOKIE_EXPIRY_DAYS): void {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

/**
 * Retrieve stored consent from cookie or localStorage fallback
 */
export function getStoredConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Try reading from cookie first
    const cookieVal = getCookie(COOKIE_CONSENT_NAME);
    if (cookieVal) {
      const parsed = JSON.parse(cookieVal) as CookieConsentPreferences;
      if (parsed && typeof parsed.essential === "boolean") {
        return {
          essential: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          functional: Boolean(parsed.functional),
          timestamp: parsed.timestamp,
          version: parsed.version,
        };
      }
    }

    // 2. Fallback to localStorage
    const localVal = localStorage.getItem(COOKIE_CONSENT_NAME);
    if (localVal) {
      const parsed = JSON.parse(localVal) as CookieConsentPreferences;
      if (parsed && typeof parsed.essential === "boolean") {
        return {
          essential: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          functional: Boolean(parsed.functional),
          timestamp: parsed.timestamp,
          version: parsed.version,
        };
      }
    }
  } catch {
    // Graceful fallback if JSON parsing fails
    return null;
  }

  return null;
}

/**
 * Save user consent preferences to both cookie and localStorage
 */
export function storeConsent(preferences: CookieConsentPreferences): void {
  if (typeof window === "undefined") return;

  const dataToSave: CookieConsentPreferences = {
    essential: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
    functional: Boolean(preferences.functional),
    timestamp: new Date().toISOString(),
    version: CURRENT_CONSENT_VERSION,
  };

  const serialized = JSON.stringify(dataToSave);

  // 1. Set persistent HTTP cookie
  setCookie(COOKIE_CONSENT_NAME, serialized, COOKIE_EXPIRY_DAYS);

  // 2. Set localStorage for instant client reading
  try {
    localStorage.setItem(COOKIE_CONSENT_NAME, serialized);
  } catch {
    // Local storage might be blocked by browser private mode
  }

  // 3. Dispatch global custom event for any analytics/marketing script listeners
  window.dispatchEvent(
    new CustomEvent("richman_cookie_consent_updated", {
      detail: dataToSave,
    })
  );
}

/**
 * Reset / clear stored consent
 */
export function removeStoredConsent(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(COOKIE_CONSENT_NAME)}=; path=/; max-age=0; SameSite=Lax`;
  try {
    localStorage.removeItem(COOKIE_CONSENT_NAME);
  } catch {}
}

