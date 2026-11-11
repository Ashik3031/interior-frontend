"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation, type IntroStage } from "@/context/NavigationContext";

export type { IntroStage };

interface NavbarProps {
  activeSection?: string;
  introStage?: IntroStage;
}

export default function Navbar({
  activeSection: propActiveSection,
  introStage: propIntroStage,
}: NavbarProps = {}) {
  const nav = useNavigation();
  const introStage = propIntroStage ?? nav.introStage;
  const activeSection = propActiveSection ?? nav.activeSection;
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"dark" | "light">("dark");
  const lastScrollYRef = useRef(0);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  // Close mega menu on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
      }
    };
    if (isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isServicesOpen]);

  // Automatically close submenus on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  // Detect theme of section under navbar to dynamically adapt transparent navbar colors
  useEffect(() => {
    const updateTheme = () => {
      const lower = pathname?.toLowerCase() || "";
      let detected: "dark" | "light" =
        lower === "/about" ||
          lower === "/contact" ||
          lower.startsWith("/services") ||
          lower.includes("portfolio") ||
          lower.includes("protfolio")
          ? "light"
          : "dark";

      const themedElements = document.querySelectorAll("[data-theme]");
      themedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check if section intersects top bar (0 to 60px from viewport top)
        if (rect.top <= 60 && rect.bottom >= 20) {
          const t = el.getAttribute("data-theme");
          if (t === "light" || t === "cream") {
            detected = "light";
          } else if (t === "dark") {
            detected = "dark";
          }
        }
      });

      setNavTheme(detected);
    };

    window.addEventListener("scroll", updateTheme, { passive: true });
    updateTheme();
    return () => window.removeEventListener("scroll", updateTheme);
  }, [pathname]);

  // Handle scroll hiding/showing and background appearance
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const scrollDiff = currentScrollY - lastScrollY;

      // Update background styling state (transparent vs blurred background)
      setIsScrolled(currentScrollY > 40);

      // 1. Always show navbar when at the top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        ticking = false;
        return;
      }

      // 2. Hide navbar when user scrolls down to the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = windowHeight + currentScrollY >= documentHeight - 50;

      if (isAtBottom) {
        setIsVisible(false);
        lastScrollYRef.current = currentScrollY;
        ticking = false;
        return;
      }

      // 3. Directional scroll behavior:
      // Scrolling down (towards bottom) -> hide navbar
      // Scrolling up (towards top) -> show navbar
      const SCROLL_THRESHOLD = 8;
      if (Math.abs(scrollDiff) > SCROLL_THRESHOLD) {
        if (scrollDiff > 0) {
          setIsVisible(false);
          setIsServicesOpen(false);
        } else {
          setIsVisible(true);
        }
        lastScrollYRef.current = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateNavbar();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isHeaderVisible = isVisible || isMobileMenuOpen || introStage !== "complete";

  // Dynamic styling based on scroll state & background theme
  const isLight = !isScrolled && navTheme === "light";
  const textColor = isLight ? "text-[#171816]/90" : "text-white/90";
  const brandTextColor = isLight ? "text-[#171816]" : "text-[#F5F0E7]";
  const ctaBtnColor = isLight
    ? "border-[#171816]/70 text-[#171816] hover:border-[#BE9B59] hover:text-[#BE9B59] hover:bg-[#BE9B59]/10"
    : "border-white/80 text-white hover:border-[#BE9B59] hover:text-[#BE9B59] hover:bg-[#BE9B59]/10";

  const lowerPath = pathname?.toLowerCase() || "";
  const isAboutActive = lowerPath === "/about" || activeSection === "about";
  const isServicesActive = lowerPath.startsWith("/services");
  const isPortfolioActive = lowerPath.includes("portfolio") || lowerPath.includes("protfolio");
  const isContactActive = lowerPath === "/contact" || activeSection === "contact";
  const isConsultationActive =
    lowerPath === "/consultation" || lowerPath === "/book-a-consultation";
  const isHomeActive =
    !isAboutActive &&
    !isServicesActive &&
    !isPortfolioActive &&
    !isContactActive &&
    !isConsultationActive &&
    (pathname === "/" || activeSection === "home");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${isHeaderVisible
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0 pointer-events-none"
        } ${isScrolled
          ? "bg-[#171816]/85 backdrop-blur-md py-4 border-b border-white/5 shadow-sm"
          : "bg-transparent py-6 md:py-8"
        }`}
    >
      <nav
        aria-label="Main Navigation"
        className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative flex items-center justify-between"
      >
        {/* DESKTOP: Left Zone */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-xs tracking-[0.2em] uppercase font-sans font-medium">
          <Link
            href="/#home"
            className={`transition-colors duration-200 relative group py-1 ${isHomeActive
              ? "text-[#BE9B59]"
              : `${textColor} hover:text-[#BE9B59]`
              }`}
          >
            Home
            {isHomeActive && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BE9B59] rounded-full" />
            )}
          </Link>

          <Link
            href="/About"
            className={`transition-colors duration-200 relative group py-1 ${isAboutActive
              ? "text-[#BE9B59]"
              : `${textColor} hover:text-[#BE9B59]`
              }`}
          >
            About Us
            {isAboutActive && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BE9B59] rounded-full" />
            )}
          </Link>

          {/* Services with Luxury Architectural Mega Menu */}
          <div
            ref={servicesMenuRef}
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="flex items-center gap-1.5 py-1">
              <Link
                href="/services"
                onClick={() => setIsServicesOpen(false)}
                className={`transition-colors duration-200 relative group ${isServicesActive
                  ? "text-[#BE9B59]"
                  : `${textColor} hover:text-[#BE9B59]`
                  }`}
              >
                Services
                {isServicesActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BE9B59] rounded-full" />
                )}
              </Link>
              <button
                type="button"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={`${textColor} hover:text-[#BE9B59] transition-colors focus:outline-none cursor-pointer p-0.5`}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-label="Toggle Services Mega Menu"
              >
                <svg
                  className={`w-3 h-3 text-[#BE9B59] transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Minimal & Refined Services Menu */}
            {isServicesOpen && (
              <div
                className="absolute top-full -left-6 pt-3 w-[520px] lg:w-[580px] max-w-[calc(100vw-2rem)] z-50 animate-fade-in"
                role="menu"
                aria-label="Services Menu"
              >
                {/* Invisible hover bridge to eliminate any mouseleave gap */}
                <div className="absolute top-0 left-0 right-0 h-3.5 bg-transparent" />

                <div className="bg-[#141513]/98 backdrop-blur-2xl border border-white/10 rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left">
                  {/* Clean 2-Column Grid of 6 Services */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {[
                      {
                        slug: "complete-turnkey-fit-out",
                        id: "01",
                        title: "Complete Turnkey Fit-Out",
                      },
                      {
                        slug: "mep-works",
                        id: "04",
                        title: "MEP Works — HVAC, Electrical & Plumbing",
                      },
                      {
                        slug: "villa-apartment-renovations",
                        id: "02",
                        title: "Villa & Apartment Renovations",
                      },
                      {
                        slug: "authority-approval-coordination",
                        id: "05",
                        title: "Authority Approval Coordination",
                      },
                      {
                        slug: "office-commercial-interiors",
                        id: "03",
                        title: "Office & Commercial Interiors",
                      },
                      {
                        slug: "project-management-execution",
                        id: "06",
                        title: "Project Management & Execution",
                      },
                    ].map((item) => (
                      <Link
                        key={item.slug}
                        href={`/services/${item.slug}`}
                        onClick={() => setIsServicesOpen(false)}
                        className="group flex items-baseline gap-2.5 py-2.5 px-2.5 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
                        role="menuitem"
                      >
                        <span className="font-sans text-[11px] text-[#BE9B59] font-medium tracking-wider flex-shrink-0">
                          {item.id}
                        </span>
                        <span className="font-editorial text-[16px] text-[#F5F0E7] group-hover:text-[#BE9B59] transition-colors font-light leading-snug">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Minimal Bottom Bar */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href="/services"
                      onClick={() => setIsServicesOpen(false)}
                      className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#BE9B59] hover:text-[#d3b06e] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>All Services Overview</span>
                      <span className="text-sm">&rarr;</span>
                    </Link>

                    <Link
                      href="/consultation"
                      onClick={() => setIsServicesOpen(false)}
                      className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#F5F0E7]/60 hover:text-[#BE9B59] transition-colors"
                    >
                      Book Consultation &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            className={`transition-colors duration-200 relative group py-1 ${isPortfolioActive
              ? "text-[#BE9B59]"
              : `${textColor} hover:text-[#BE9B59]`
              }`}
          >
            Portfolio
            {isPortfolioActive && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BE9B59] rounded-full" />
            )}
          </Link>
        </div>

        {/* DESKTOP & TABLET: Centered Brand Identity relative to Viewport */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href="/"
            className="group flex items-center gap-4 focus:outline-none py-1"
            aria-label="RichMan Interiors Homepage"
          >
            <div
              data-navbar-logo="desktop"
              className="relative w-[38px] h-[48px] xl:w-[44px] xl:h-[56px] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                opacity: introStage === "complete" ? 1 : 0,
              }}
            >
              <Image
                src="/images/RM Interior - Logo Icon .png"
                alt="RichMan Interiors Emblem"
                width={56}
                height={72}
                className="w-full h-full object-contain filter drop-shadow-md brightness-105"
                priority
              />
            </div>
            <div
              className={`flex flex-col items-center justify-center select-none transition-opacity duration-700 ${introStage === "traveling" || introStage === "complete"
                ? "opacity-100"
                : "opacity-0"
                }`}
            >
              <span className={`font-editorial text-xl xl:text-2xl tracking-[0.25em] font-light ${brandTextColor} group-hover:text-[#BE9B59] transition-colors leading-none mb-1`}>
                RICHMAN
              </span>
              <span className="text-[9px] xl:text-[10px] tracking-[0.42em] text-[#BE9B59] uppercase font-sans font-medium">
                INTERIORS
              </span>
            </div>
          </Link>
        </div>

        {/* DESKTOP: Right Zone */}
        <div className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.18em] uppercase font-sans font-medium">
          <Link
            href="/contact"
            className={`transition-colors duration-200 relative group py-1 ${isContactActive
              ? "text-[#BE9B59]"
              : `${textColor} hover:text-[#BE9B59]`
              }`}
          >
            Contact
            {isContactActive && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BE9B59] rounded-full" />
            )}
          </Link>

          <Link
            href="/consultation"
            className={`rounded-full border ${ctaBtnColor} transition-all duration-300 px-5 py-2.5 text-[11px] tracking-[0.2em] font-medium ${isConsultationActive ? "bg-[#BE9B59] !text-[#171816] !border-[#BE9B59]" : ""
              }`}
          >
            BOOK A CONSULTATION
          </Link>
        </div>

        {/* MOBILE / TABLET HEADER ROW */}
        <div className="flex lg:hidden w-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none py-1"
            aria-label="RichMan Interiors Homepage"
          >
            <div
              data-navbar-logo="mobile"
              className="relative w-8 h-10 flex-shrink-0"
              style={{
                opacity: introStage === "complete" ? 1 : 0,
              }}
            >
              <Image
                src="/images/RM Interior - Logo Icon .png"
                alt="RichMan Interiors Emblem"
                width={42}
                height={54}
                className="w-full h-full object-contain brightness-105"
                priority
              />
            </div>
            <div
              className={`flex flex-col select-none transition-opacity duration-700 ${introStage === "traveling" || introStage === "complete"
                ? "opacity-100"
                : "opacity-0"
                }`}
            >
              <span className={`font-editorial text-lg tracking-[0.22em] font-light ${brandTextColor} leading-none mb-0.5`}>
                RICHMAN
              </span>
              <span className="text-[8px] tracking-[0.38em] text-[#BE9B59] uppercase font-sans font-medium">
                INTERIORS
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 ${textColor} hover:text-[#BE9B59] focus:outline-none focus:ring-1 focus:ring-[#BE9B59] rounded-sm cursor-pointer`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Accessible Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-[72px] bg-[#171816]/98 backdrop-blur-xl z-50 flex flex-col justify-between px-8 py-10 lg:hidden border-t border-white/10 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex flex-col space-y-6 text-sm tracking-[0.22em] uppercase font-sans font-medium">
            <Link
              href="/#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#BE9B59] py-2 border-b border-white/5"
            >
              Home
            </Link>
            <Link
              href="/About"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#F5F0E7]/90 hover:text-[#BE9B59] py-2 border-b border-white/5 transition-colors"
            >
              About Us
            </Link>
            {/* Mobile Services Accordion */}
            <div className="border-b border-white/5 py-1">
              <div className="flex items-center justify-between">
                <Link
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${isServicesActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"
                    } hover:text-[#BE9B59] py-1 transition-colors`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                  className="p-1 text-[#BE9B59] focus:outline-none"
                  aria-label="Toggle sub-services menu"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {isMobileServicesOpen && (
                <div className="mt-2 pl-3 border-l border-[#BE9B59]/30 flex flex-col space-y-2.5 py-2">
                  <Link
                    href="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.2em] text-[#BE9B59] font-medium"
                  >
                    &rarr; All Services Overview
                  </Link>
                  <Link
                    href="/services/complete-turnkey-fit-out"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.16em] text-[#F5F0E7]/75 hover:text-[#BE9B59]"
                  >
                    01 Complete Turnkey Fit-Out
                  </Link>
                  <Link
                    href="/services/villa-apartment-renovations"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.16em] text-[#F5F0E7]/75 hover:text-[#BE9B59]"
                  >
                    02 Villa &amp; Apartment Renovations
                  </Link>
                  <Link
                    href="/services/office-commercial-interiors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.16em] text-[#F5F0E7]/75 hover:text-[#BE9B59]"
                  >
                    03 Office &amp; Commercial Interiors
                  </Link>
                  <Link
                    href="/services/mep-works"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.16em] text-[#F5F0E7]/75 hover:text-[#BE9B59]"
                  >
                    04 MEP Works — Electrical, HVAC &amp; Plumbing
                  </Link>
                  <Link
                    href="/services/authority-approval-coordination"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.16em] text-[#F5F0E7]/75 hover:text-[#BE9B59]"
                  >
                    05 Authority Approval Coordination
                  </Link>
                  <Link
                    href="/services/project-management-execution"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.16em] text-[#F5F0E7]/75 hover:text-[#BE9B59]"
                  >
                    06 Project Management &amp; Execution
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isPortfolioActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"
                } hover:text-[#BE9B59] py-2 border-b border-white/5 transition-colors`}
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isContactActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"
                } hover:text-[#BE9B59] py-2 border-b border-white/5 transition-colors`}
            >
              Contact
            </Link>
          </div>

          <div className="pt-8 flex flex-col space-y-5">
            <Link
              href="/consultation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center rounded-full border border-[#BE9B59] text-[#BE9B59] hover:bg-[#BE9B59] hover:text-[#171816] transition-all py-3.5 text-xs tracking-[0.2em] uppercase font-medium"
            >
              BOOK A CONSULTATION
            </Link>
            <div className="text-center text-[10px] tracking-[0.3em] uppercase text-[#D9C9B3]/60">
              DUBAI, UAE · BESPOKE LUXURY
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
