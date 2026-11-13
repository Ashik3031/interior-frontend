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
      let detected: "dark" | "light" = "dark";

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

  // Dynamic styling based on scroll state & background theme
  const isLight = !isScrolled && navTheme === "light";
  const textColor = isLight ? "text-[#171816]/90" : "text-white/90";
  const brandTextColor = isLight ? "text-[#171816]" : "text-[#F5F0E7]";
  const ctaBtnColor = isLight
    ? "border-[#171816]/70 text-[#171816] hover:border-[#BE9B59] hover:text-[#BE9B59] hover:bg-[#BE9B59]/10"
    : "border-white/80 text-white hover:border-[#BE9B59] hover:text-[#BE9B59] hover:bg-[#BE9B59]/10";

  return (
    <>
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
              < div
                className="flex items-center gap-1.5 py-1 cursor-pointer"
                onClick={() => setIsServicesOpen((prev) => !prev)}
              >
                <div
                  className={`transition-colors duration-200 relative group select-none ${isServicesActive
                    ? "text-[#BE9B59]"
                    : `${textColor} hover:text-[#BE9B59]`
                    }`}
                >
                  Services
                  {isServicesActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BE9B59] rounded-full" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsServicesOpen((prev) => !prev);
                  }}
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
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2.5 -mr-1.5 ${textColor} hover:text-[#BE9B59] focus:outline-none transition-colors cursor-pointer flex items-center justify-center`}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Accessible Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] h-[100dvh] w-full bg-[#171816] text-[#F5F0E7] flex flex-col justify-between overflow-hidden lg:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Mobile Drawer Top Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 shrink-0 bg-[#171816] z-20">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 focus:outline-none"
              aria-label="RichMan Interiors Homepage"
            >
              <div className="relative w-8 h-10 flex-shrink-0">
                <Image
                  src="/images/RM Interior - Logo Icon .png"
                  alt="RichMan Interiors Emblem"
                  width={42}
                  height={54}
                  className="w-full h-full object-contain brightness-105"
                  priority
                />
              </div>
              <div className="flex flex-col select-none">
                <span className="font-editorial text-lg tracking-[0.22em] font-light text-[#F5F0E7] leading-none mb-0.5">
                  RICHMAN
                </span>
                <span className="text-[8px] tracking-[0.38em] text-[#BE9B59] uppercase font-sans font-medium">
                  INTERIORS
                </span>
              </div>
            </Link>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-1 text-[#F5F0E7] hover:text-[#BE9B59] transition-colors focus:outline-none cursor-pointer flex items-center justify-center rounded-lg border border-white/15 hover:border-[#BE9B59]/60"
              aria-label="Close navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links Body */}
          <div className="flex-1 px-6 sm:px-8 py-6 flex flex-col space-y-4 text-sm tracking-[0.22em] uppercase font-sans font-medium overflow-y-auto">
            <Link
              href="/#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isHomeActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"} hover:text-[#BE9B59] py-2.5 border-b border-white/5 transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/About"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isAboutActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"} hover:text-[#BE9B59] py-2.5 border-b border-white/5 transition-colors`}
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border-b border-white/5 py-1">
              <div
                className="flex items-center justify-between cursor-pointer py-2 group select-none"
                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
              >
                <div
                  className={`${isServicesActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"
                    } group-hover:text-[#BE9B59] transition-colors flex items-center gap-2`}
                >
                  <span>Services</span>
                  {isServicesActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BE9B59]" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileServicesOpen((prev) => !prev);
                  }}
                  className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#BE9B59] group-hover:border-[#BE9B59]/40 group-hover:bg-[#BE9B59]/10 transition-all cursor-pointer"
                  aria-label="Toggle sub-services menu"
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""
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
                <div className="mt-2 mb-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col space-y-2 animate-fade-in">
                  {/* Featured All Services Link */}
                  <Link
                    href="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#BE9B59]/15 border border-[#BE9B59]/30 text-[#BE9B59] hover:bg-[#BE9B59]/25 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BE9B59]" />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                        All Services Overview
                      </span>
                    </div>
                    <span className="text-xs transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>

                  {/* 6 Individual Luxury Services */}
                  <div className="pt-1 flex flex-col space-y-1">
                    {[
                      {
                        slug: "complete-turnkey-fit-out",
                        id: "01",
                        title: "Complete Turnkey Fit-Out",
                        tag: "Shell to Ready",
                      },
                      {
                        slug: "villa-apartment-renovations",
                        id: "02",
                        title: "Villa & Apartment Renovations",
                        tag: "Prime Residences",
                      },
                      {
                        slug: "office-commercial-interiors",
                        id: "03",
                        title: "Office & Commercial Interiors",
                        tag: "Bespoke Workspace",
                      },
                      {
                        slug: "mep-works",
                        id: "04",
                        title: "MEP Works",
                        tag: "HVAC · Electrical · Plumbing",
                      },
                      {
                        slug: "authority-approval-coordination",
                        id: "05",
                        title: "Authority Approval Coordination",
                        tag: "DM · DCD · Nakheel",
                      },
                      {
                        slug: "project-management-execution",
                        id: "06",
                        title: "Project Management & Execution",
                        tag: "Governance & Quality",
                      },
                    ].map((s) => {
                      const isCurrent = pathname === `/services/${s.slug}`;
                      return (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${isCurrent
                            ? "bg-[#BE9B59]/20 text-[#BE9B59] border border-[#BE9B59]/30"
                            : "hover:bg-white/[0.06] text-[#F5F0E7]/85 hover:text-[#BE9B59] border border-transparent"
                            }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-sans text-[10px] tracking-widest text-[#BE9B59] font-semibold shrink-0">
                              {s.id}
                            </span>
                            <div className="min-w-0">
                              <div className="text-[11.5px] uppercase tracking-[0.14em] font-medium truncate group-hover:text-[#BE9B59] transition-colors">
                                {s.title}
                              </div>
                              <div className="text-[9.5px] font-sans normal-case tracking-normal text-[#F5F0E7]/40 truncate">
                                {s.tag}
                              </div>
                            </div>
                          </div>
                          <span className="text-[#BE9B59]/40 group-hover:text-[#BE9B59] transition-colors text-sm pl-2 shrink-0">
                            &rsaquo;
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isPortfolioActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"
                } hover:text-[#BE9B59] py-2.5 border-b border-white/5 transition-colors`}
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isContactActive ? "text-[#BE9B59]" : "text-[#F5F0E7]/90"
                } hover:text-[#BE9B59] py-2.5 border-b border-white/5 transition-colors`}
            >
              Contact
            </Link>
          </div>

          <div className="p-6 sm:p-8 border-t border-white/10 shrink-0 flex flex-col space-y-4 bg-[#171816]">
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
    </>
  );
}
