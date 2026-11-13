"use client";

import React, { useEffect, useState } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { CookieCategory } from "@/types/cookieConsent";

interface CookieScriptGateProps {
  category: CookieCategory;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Gate that only renders children (e.g. analytics trackers, pixels, embeds)
 * when the visitor has explicitly consented to the specified cookie category.
 */
export default function CookieScriptGate({
  category,
  children,
  fallback = null,
}: CookieScriptGateProps) {
  const { preferences, isMounted } = useCookieConsent();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (!isMounted) return;
    setHasPermission(Boolean(preferences[category]));
  }, [preferences, category, isMounted]);

  if (!isMounted || !hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

