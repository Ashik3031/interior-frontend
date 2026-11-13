export interface CookieConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp?: string;
  version?: string;
}

export type CookieCategory = keyof Omit<CookieConsentPreferences, "timestamp" | "version">;

export interface CookieCategoryDetail {
  id: CookieCategory;
  title: string;
  badge?: string;
  required?: boolean;
  description: string;
  examples: Array<{
    name: string;
    provider: string;
    purpose: string;
    retention: string;
  }>;
}

