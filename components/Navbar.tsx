"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation, type IntroStage } from "@/context/NavigationContext";
import StaggeredMenu, { type StaggeredMenuItem } from "./StaggeredMenu";

export type { IntroStage };

interface NavbarProps {
  activeSection?: string;
  introStage?: IntroStage;
}

const SERVICES = [
  { slug: "complete-turnkey-fit-out", title: "Complete Turnkey Fit-Out" },
  { slug: "villa-apartment-renovations", title: "Villa & Apartment Renovations" },
  { slug: "office-commercial-interiors", title: "Office & Commercial Interiors" },
  { slug: "mep-works", title: "MEP Works" },
  { slug: "authority-approval-coordination", title: "Authority Approval Coordination" },
  { slug: "project-management-execution", title: "Project Management & Execution" },
];

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"dark" | "light">("dark");
  const lastScrollYRef = useRef(0);

  // Detect theme of section under navbar (for transparent state colours)
  useEffect(() => {
    const updateTheme = () => {
      let detected: "dark" | "light" = "dark";
      document.querySelectorAll("[data-theme]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 20) {
          const t = el.getAttribute("data-theme");
          if (t === "light" || t === "cream") detected = "light";
          else if (t === "dark") detected = "dark";
        }
      });
      setNavTheme(detected);
    };

    window.addEventListener("scroll", updateTheme, { passive: true });
    updateTheme();
    return () => window.removeEventListener("scroll", updateTheme);
  }, [pathname]);

  // Scroll hide/show + background state
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let ticking = false;

    const lower = pathname?.toLowerCase() || "";
    const isHome =
      lower === "/" ||
      lower === "" ||
      activeSection === "home";

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollYRef.current;

      // On the home page: navbar stays visible across all animation frames (frame 1 to last frame)
      // and hides cleanly as soon as the frame sequence finishes and the hero unpins
      if (isHome) {
        const heroEl = document.getElementById("home");
        const isHeroFrameScrubbing = heroEl
          ? heroEl.getBoundingClientRect().bottom >= window.innerHeight - 20
          : currentScrollY < (window.innerHeight * 2.2);

        setIsScrolled(false);
        setIsVisible(isHeroFrameScrubbing);
        lastScrollYRef.current = currentScrollY;
        ticking = false;
        return;
      }

      // Sub-pages: dynamic hide-on-scroll-down, reveal-on-scroll-up navigation
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        ticking = false;
        return;
      }

      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setIsVisible(false);
        lastScrollYRef.current = currentScrollY;
        ticking = false;
        return;
      }

      if (Math.abs(scrollDiff) > 8) {
        setIsVisible(scrollDiff < 0);
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
  }, [pathname, activeSection]);

  const isHeaderVisible = isVisible || isMenuOpen || introStage !== "complete";

  // Active route logic (unchanged)
  const lowerPath = pathname?.toLowerCase() || "";
  const isAboutActive = lowerPath === "/about" || activeSection === "about";
  const isServicesActive = lowerPath.startsWith("/services");
  const isPortfolioActive =
    lowerPath.includes("portfolio") || lowerPath.includes("protfolio");
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

  const isLight = isScrolled || isMenuOpen || navTheme === "light";
  // When the (white) panel is open or navbar is scrolled or over a light section,
  // the text and controls use deep charcoal for crisp, luxury contrast.
  const brandTextColor = isLight
    ? "text-[#171816]"
    : "text-[#F5F0E7]";
  const menuButtonColor = isLight ? "#171816" : "#ffffff";

  const ctaBtnColor = isLight
    ? "border-[#171816]/70 text-[#171816] hover:border-[#BE9B59] hover:text-[#BE9B59] hover:bg-[#BE9B59]/10"
    : "border-white/80 text-white hover:border-[#BE9B59] hover:text-[#BE9B59] hover:bg-[#BE9B59]/10";

  const menuItems: StaggeredMenuItem[] = [
    { label: "Home", ariaLabel: "Go to home page", link: "/#home", active: isHomeActive },
    { label: "About Us", ariaLabel: "Learn about us", link: "/About", active: isAboutActive },
    {
      label: "Services",
      ariaLabel: "View our services",
      link: "/services",
      active: isServicesActive,
      children: SERVICES.map((s) => ({
        label: s.title,
        link: `/services/${s.slug}`,
      })),
    },
    { label: "Portfolio", ariaLabel: "View our portfolio", link: "/portfolio", active: isPortfolioActive },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact", active: isContactActive },
  ];

  const logo = (
    <Link
      href="/"
      className="group flex items-center gap-3 lg:gap-4 focus:outline-none py-1"
      aria-label="RichMan Interiors Homepage"
    >
      {/* Desktop logo (intro animation target) */}
      <div
        data-navbar-logo="desktop"
        className={`hidden lg:block relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${isHomeActive
          ? "w-[52px] h-[66px] xl:w-[60px] xl:h-[76px]"
          : "w-[38px] h-[48px] xl:w-[44px] xl:h-[56px]"
          }`}
        style={{ opacity: introStage === "complete" ? 1 : 0 }}
      >
        <Image
          src="/images/white_logo_icon.png"
          alt="RichMan Interiors Emblem"
          width={72}
          height={92}
          className="w-full h-full object-contain filter drop-shadow-md brightness-105"
          priority
        />
      </div>

      {/* Mobile logo (intro animation target) */}
      <div
        data-navbar-logo="mobile"
        className={`block lg:hidden relative flex-shrink-0 ${isHomeActive
          ? "w-[38px] h-[48px] sm:w-[42px] sm:h-[54px]"
          : "w-8 h-10"
          }`}
        style={{ opacity: introStage === "complete" ? 1 : 0 }}
      >
        <Image
          src="/images/RM Interior - Logo Icon .png"
          alt="RichMan Interiors Emblem"
          width={50}
          height={64}
          className="w-full h-full object-contain brightness-105 bg-transparent"
          priority
        />
      </div>

      {!isHomeActive && (
        <div
          className={`flex flex-col select-none transition-opacity duration-700 ${introStage === "traveling" || introStage === "complete"
            ? "opacity-100"
            : "opacity-0"
            }`}
        >
          <span
            className={`font-editorial text-lg lg:text-xl xl:text-2xl tracking-[0.22em] lg:tracking-[0.25em] font-light ${brandTextColor} group-hover:text-[#BE9B59] transition-colors leading-none mb-0.5 lg:mb-1`}
          >
            RICHMAN
          </span>
          <span className="text-[8px] lg:text-[9px] xl:text-[10px] tracking-[0.38em] lg:tracking-[0.42em] text-[#BE9B59] uppercase font-sans font-medium">
            INTERIORS
          </span>
        </div>
      )}
    </Link>
  );

  const headerActions = (
    <Link
      href="/consultation"
      className={`rounded-full border ${ctaBtnColor} transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-sans font-medium whitespace-nowrap ${isConsultationActive ? "!bg-[#BE9B59] !text-[#171816] !border-[#BE9B59]" : ""
        }`}
    >
      <span className="sm:hidden">Consult</span>
      <span className="hidden sm:inline">Book a Consultation</span>
    </Link>
  );

  const footer = (
    <div className="text-[10px] tracking-[0.3em] uppercase text-[#171816]/50">
      DUBAI, UAE · BESPOKE LUXURY
    </div>
  );

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      displaySocials={false}
      displayItemNumbering
      menuButtonColor={menuButtonColor}
      openMenuButtonColor="#171816"
      changeMenuColorOnOpen
      colors={["#FAF8F5", "#BE9B59"]}
      panelColor="#ffffff"
      accentColor="#BE9B59"
      logo={logo}
      headerActions={headerActions}
      footer={footer}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      headerClassName={`transition-all duration-500 transform ${isHeaderVisible
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0 pointer-events-none"
        } ${isScrolled && !isMenuOpen
          ? "bg-white/90 backdrop-blur-md py-4 border-b border-[#171816]/10 shadow-sm"
          : "bg-transparent py-6 md:py-8"
        }`}
    />
  );
}