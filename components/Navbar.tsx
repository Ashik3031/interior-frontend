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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"dark" | "light">("dark");
  const lastScrollYRef = useRef(0);

  // Detect theme of section under navbar to dynamically adapt transparent navbar colors
  useEffect(() => {
    const updateTheme = () => {
      let detected: "dark" | "light" =
        pathname?.toLowerCase() === "/about" || pathname?.toLowerCase() === "/contact"
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

  const isAboutActive = pathname?.toLowerCase() === "/about" || activeSection === "about";
  const isContactActive = pathname?.toLowerCase() === "/contact" || activeSection === "contact";
  const isConsultationActive =
    pathname?.toLowerCase() === "/consultation" ||
    pathname?.toLowerCase() === "/book-a-consultation";
  const isHomeActive =
    !isAboutActive &&
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

          {/* Services with subtle dropdown indicator */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              className={`${textColor} hover:text-[#BE9B59] transition-colors duration-200 flex items-center gap-1.5 py-1 focus:outline-none cursor-pointer`}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
            >
              <span>Services</span>
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

            {/* Dropdown Menu */}
            {isServicesOpen && (
              <div
                className="absolute top-full left-0 mt-3 w-56 bg-[#171816]/95 backdrop-blur-md border border-white/10 rounded-sm py-2 shadow-2xl animate-fade-in"
                role="menu"
              >
                <Link
                  href="/#interior-architecture"
                  className="block px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase text-[#F5F0E7]/80 hover:text-[#BE9B59] hover:bg-white/5 transition-colors"
                  role="menuitem"
                >
                  Interior Architecture
                </Link>
                <Link
                  href="/#luxury-renovation"
                  className="block px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase text-[#F5F0E7]/80 hover:text-[#BE9B59] hover:bg-white/5 transition-colors"
                  role="menuitem"
                >
                  Luxury Renovation
                </Link>
                <Link
                  href="/#bespoke-joinery"
                  className="block px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase text-[#F5F0E7]/80 hover:text-[#BE9B59] hover:bg-white/5 transition-colors"
                  role="menuitem"
                >
                  Bespoke Joinery & Fit-Out
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/Protfolio"
            className={`${textColor} hover:text-[#BE9B59] transition-colors duration-200 py-1`}
          >
            Portfolio
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
            <Link
              href="/#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#F5F0E7]/90 hover:text-[#BE9B59] py-2 border-b border-white/5 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#F5F0E7]/90 hover:text-[#BE9B59] py-2 border-b border-white/5 transition-colors"
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
