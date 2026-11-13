import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COOKIE_CATEGORIES } from "@/data/cookieData";
import CookieSettingsButton from "@/components/cookie-consent/CookieSettingsButton";

// Hero background image (Unsplash link - replace later with architectural photography)
const COOKIE_HERO_BG =
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85";

export const metadata: Metadata = {
  title: "Cookie Policy | RichMan Interiors Luxury Atelier Dubai",
  description:
    "Learn about how RichMan Interiors uses cookies and related technologies to protect privacy, analyze site performance, and curate architectural experiences.",
  keywords: [
    "RichMan Interiors Cookie Policy",
    "Privacy and Cookies Dubai",
    "Luxury Interior Design Cookie Preferences",
  ],
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-white text-deep-charcoal selection:bg-champagne-gold selection:text-deep-charcoal">
      {/* 1. EDITORIAL HERO */}
      <section
        data-theme="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-24 lg:pt-44 border-b border-white/10 text-warm-ivory"
      >
        {/* Background Hero Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src={COOKIE_HERO_BG}
            alt="RichMan Interiors Atelier Architecture"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark Luxury Overlay matching Home Page Hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#171816]/75 via-[#171816]/55 to-[#171816]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,24,22,0.35)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="flex items-center gap-2.5 font-sans text-sm text-warm-ivory/80 mb-4">
            <span className="h-2 w-2 rounded-full bg-champagne-gold" />
            <span>Legal &amp; Privacy Disclosures</span>
          </div>

          <h1 className="font-serif text-[clamp(40px,6vw,96px)] font-light uppercase leading-[0.98] tracking-tight text-warm-ivory">
            Cookie Policy
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/15 max-w-4xl text-sm font-sans text-warm-ivory/80">
            <div>
              <span className="block text-xs uppercase tracking-wider text-warm-ivory/60">
                Effective Date
              </span>
              <span className="font-medium text-warm-ivory">January 2026 · Version 1.0</span>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-warm-ivory/60">
                Jurisdiction
              </span>
              <span className="font-medium text-warm-ivory">Dubai, UAE &amp; Global Compliance</span>
            </div>

            <div>
              <CookieSettingsButton className="inline-flex items-center gap-2 rounded-full bg-champagne-gold px-5 py-2 font-sans text-xs uppercase tracking-[0.16em] font-medium text-deep-charcoal transition-colors hover:bg-warm-ivory">
                <span>Manage Preferences</span>
                <span aria-hidden="true">&rarr;</span>
              </CookieSettingsButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POLICY BODY (White) */}
      <section
        data-theme="light"
        className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28 max-w-[1200px] mx-auto font-sans"
      >
        <div className="space-y-16">
          {/* Section 1: Introduction */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-deep-charcoal mb-5">
              1. Introduction &amp; Commitment to Discretion
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-deep-charcoal/80 font-light">
              <p>
                At <strong>RichMan Interiors FZ-LLC</strong> (&ldquo;RichMan Interiors&rdquo;, &ldquo;we&rdquo;,
                &ldquo;our&rdquo;, or &ldquo;us&rdquo;), discretion and uncompromising quality define our
                practice. This Cookie Policy explains how and why cookies, pixel tags, local storage,
                and similar tracking technologies are used when you visit our website (
                <Link href="/" className="underline text-deep-charcoal hover:text-champagne-gold">
                  richmaninteriors.com
                </Link>
                ) or interact with our digital atelier.
              </p>
              <p>
                We adhere to international digital privacy standards, including the UAE Federal Decree-Law
                No. 45 of 2021 regarding Personal Data Protection (PDPL), and where applicable, the EU
                General Data Protection Regulation (GDPR).
              </p>
            </div>
          </div>

          {/* Section 2: What are Cookies? */}
          <div className="border-t border-deep-charcoal/15 pt-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-deep-charcoal mb-5">
              2. What Are Cookies?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-deep-charcoal/80 font-light">
              <p>
                Cookies are small alphanumeric text files stored on your computer, tablet, or mobile device
                by web browsers when you visit a website. They serve as reliable digital memory: recognizing
                your browser across visits, authenticating secure sessions, preserving language and studio
                location preferences, and assessing website performance without accessing personal documents.
              </p>
              <p>
                Cookies set by the website owner (RichMan Interiors) are called &ldquo;first-party cookies&rdquo;.
                Cookies set by parties other than the website owner are called &ldquo;third-party cookies&rdquo;
                (such as trusted analytics providers or embedded high-definition video hosts).
              </p>
            </div>
          </div>

          {/* Section 3: Categories of Cookies We Use */}
          <div className="border-t border-deep-charcoal/15 pt-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-deep-charcoal mb-5">
              3. Categories of Cookies We Utilize
            </h2>
            <p className="text-base leading-relaxed text-deep-charcoal/80 font-light mb-8">
              We categorize our cookies into four defined classifications. You have complete sovereignty
              over non-essential cookies and may modify your consent choices at any moment.
            </p>

            <div className="space-y-8">
              {COOKIE_CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="rounded-2xl border border-deep-charcoal/15 p-6 sm:p-8 bg-warm-ivory/30"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-2xl font-light text-deep-charcoal">
                        3.{idx + 1} {cat.title}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-sans uppercase tracking-widest font-semibold ${cat.required
                          ? "bg-deep-charcoal text-warm-ivory"
                          : "bg-deep-charcoal/10 text-deep-charcoal/70"
                          }`}
                      >
                        {cat.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-deep-charcoal/75 font-light mb-6">
                    {cat.description}
                  </p>

                  <div className="rounded-xl border border-deep-charcoal/10 bg-white p-4 sm:p-5 overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="border-b border-deep-charcoal/10 text-deep-charcoal/50 uppercase tracking-wider text-[10px]">
                          <th className="pb-2 pr-4 font-semibold">Cookie Identifier</th>
                          <th className="pb-2 pr-4 font-semibold">Provider</th>
                          <th className="pb-2 pr-4 font-semibold">Operational Purpose</th>
                          <th className="pb-2 font-semibold">Standard Lifespan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-deep-charcoal/10">
                        {cat.examples.map((item) => (
                          <tr key={item.name} className="font-light">
                            <td className="py-2.5 pr-4 text-champagne-gold font-mono font-medium">
                              {item.name}
                            </td>
                            <td className="py-2.5 pr-4 text-deep-charcoal font-medium">
                              {item.provider}
                            </td>
                            <td className="py-2.5 pr-4 text-deep-charcoal/70">{item.purpose}</td>
                            <td className="py-2.5 text-deep-charcoal/60">{item.retention}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: How to Manage and Revoke Consent */}
          <div className="border-t border-deep-charcoal/15 pt-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-deep-charcoal mb-5">
              4. Managing &amp; Modifying Your Cookie Preferences
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-deep-charcoal/80 font-light">
              <p>
                You hold the right to decide whether to accept or reject non-essential cookies. You can
                access and modify your consent parameters at any time using our dedicated preferences
                console:
              </p>

              <div className="pt-2 pb-4">
                <CookieSettingsButton className="inline-flex items-center gap-2 rounded-full bg-deep-charcoal px-7 py-3 font-sans text-xs uppercase tracking-[0.18em] font-medium text-warm-ivory hover:bg-champagne-gold hover:text-deep-charcoal transition-colors">
                  <span>Open Cookie Preferences Panel</span>
                  <span aria-hidden="true">&rarr;</span>
                </CookieSettingsButton>
              </div>

              <p>
                Additionally, most modern browsers allow you to control cookies through browser settings.
                Please refer to the official documentation for your browser:
              </p>

              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                  { name: "Apple Safari", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
                  { name: "Mozilla Firefox", url: "https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" },
                  { name: "Microsoft Edge", url: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
                ].map((b) => (
                  <li key={b.name}>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl border border-deep-charcoal/15 text-center text-xs font-medium text-deep-charcoal hover:border-champagne-gold hover:text-champagne-gold transition-colors"
                    >
                      {b.name} &rarr;
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Updates and Inquiries */}
          <div className="border-t border-deep-charcoal/15 pt-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-deep-charcoal mb-5">
              5. Policy Updates &amp; Atelier Inquiries
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-deep-charcoal/80 font-light">
              <p>
                We may periodically update this Cookie Policy to reflect technical evolutions, operational
                adjustments, or regulatory amendments. Significant alterations will be accompanied by an
                updated effective date at the top of this monograph.
              </p>
              <p>
                For questions concerning our cookie stewardship or data governance, please contact our
                client concierge desk:
              </p>
              <div className="rounded-xl border border-deep-charcoal/15 p-6 bg-warm-ivory/40 max-w-lg space-y-1 text-sm">
                <p className="font-medium text-deep-charcoal">RichMan Interiors Atelier Concierge</p>
                <p className="text-deep-charcoal/70">Warehouse 14, Street 18B, Al Quoz 3, Dubai, UAE</p>
                <p className="text-deep-charcoal/70">
                  Direct Line:{" "}
                  <a href="tel:+97143218899" className="text-deep-charcoal hover:text-champagne-gold">
                    +971 4 321 8899
                  </a>
                </p>
                <p className="text-deep-charcoal/70">
                  Email:{" "}
                  <a
                    href="mailto:privacy@richmaninteriors.ae"
                    className="text-deep-charcoal hover:text-champagne-gold"
                  >
                    privacy@richmaninteriors.ae
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

