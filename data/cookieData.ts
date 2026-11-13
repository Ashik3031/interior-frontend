import { CookieCategoryDetail } from "@/types/cookieConsent";

export const COOKIE_CATEGORIES: CookieCategoryDetail[] = [
  {
    id: "essential",
    title: "Essential Cookies",
    badge: "Always Active",
    required: true,
    description:
      "These cookies are technically necessary for the secure operation, navigation, and core functionality of the RichMan Interiors website. They enable security tokens, prevent cross-site request forgery, preserve session states, and remember your cookie consent preferences. They cannot be disabled.",
    examples: [
      {
        name: "richman_cookie_consent",
        provider: "RichMan Interiors",
        purpose: "Stores your cookie consent preferences and category selections.",
        retention: "1 year",
      },
      {
        name: "next_session_token",
        provider: "RichMan Interiors",
        purpose: "Maintains navigation state and CSRF security across page transitions.",
        retention: "Session",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Performance",
    badge: "Optional",
    required: false,
    description:
      "Analytics cookies allow us to count visits, calculate traffic sources, and measure how visitors interact with our architectural monograph, portfolio gallery, and service disciplines. All collected information is aggregated and anonymized to help us optimize page load speed and Core Web Vitals.",
    examples: [
      {
        name: "_ga, _ga_*",
        provider: "Google Analytics 4",
        purpose: "Collects anonymous interaction metrics and page view sequences.",
        retention: "2 years",
      },
      {
        name: "cwv_performance",
        provider: "RichMan Interiors",
        purpose: "Monitors client-side Largest Contentful Paint (LCP) and render responsiveness.",
        retention: "30 days",
      },
    ],
  },
  {
    id: "functional",
    title: "Functional & Experience",
    badge: "Optional",
    required: false,
    description:
      "Functional cookies enable enriched capabilities and bespoke personalization, such as remembering your preferred studio location (Al Quoz Atelier vs Downtown Suite), preserving consultation form drafts, and maintaining video stream preferences.",
    examples: [
      {
        name: "richman_studio_pref",
        provider: "RichMan Interiors",
        purpose: "Remembers your preferred studio location and appointment venue preferences.",
        retention: "6 months",
      },
      {
        name: "media_volume_state",
        provider: "RichMan Interiors",
        purpose: "Maintains cinematic video reel audio state preferences.",
        retention: "Session",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Monograph Insights",
    badge: "Optional",
    required: false,
    description:
      "These cookies may be set through our site by our verified luxury media partners. They may be used to build a profile of your architectural interests and show you relevant editorial presentations and project monographs on other luxury platforms. They do not store directly personal information but uniquely identify your browser and internet device.",
    examples: [
      {
        name: "_fbp",
        provider: "Meta",
        purpose: "Attributes editorial monograph engagement from private client invitation campaigns.",
        retention: "90 days",
      },
      {
        name: "_li_insights",
        provider: "LinkedIn",
        purpose: "Enables private commercial fit-out campaign measurement.",
        retention: "90 days",
      },
    ],
  },
];

