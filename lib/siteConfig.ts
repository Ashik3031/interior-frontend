/**
 * Production Site Configuration
 *
 * Configures the canonical site URL for sitemaps, robots.txt, and technical SEO.
 * Can be overridden via NEXT_PUBLIC_SITE_URL or SITE_URL in environment variables.
 * Default: https://richmaninteriors.com
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://richmaninteriors.com"
).replace(/\/$/, "");
