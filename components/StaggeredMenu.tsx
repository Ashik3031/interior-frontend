"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export interface StaggeredMenuSubItem {
  label: string;
  link: string;
}

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
  active?: boolean;
  children?: StaggeredMenuSubItem[];
}

export interface StaggeredMenuSocial {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  items: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocial[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  position?: "left" | "right";
  /** Pre-reveal layer colours (the staggered strips). Panel itself uses panelColor. */
  colors?: string[];
  panelColor?: string;
  accentColor?: string;
  /** Colour of the Menu/Close button while the menu is closed / open */
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  /** Left side of the header (your logo / brand) */
  logo?: React.ReactNode;
  /** Rendered at the bottom of the panel (CTA, address, etc.) */
  footer?: React.ReactNode;
  /** Rendered in the header, just left of the menu icon (e.g. a CTA button) */
  headerActions?: React.ReactNode;
  /** Extra classes for the fixed header bar (background, visibility, padding…) */
  headerClassName?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export default function StaggeredMenu({
  items,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  position = "right",
  colors = ["#EFE6D2", "#BE9B59"],
  panelColor = "#ffffff",
  accentColor = "#BE9B59",
  menuButtonColor = "#ffffff",
  openMenuButtonColor = "#171816",
  changeMenuColorOnOpen = true,
  logo,
  footer,
  headerActions,
  headerClassName = "",
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  const offscreen = position === "left" ? -100 : 100;
  const layerColors = colors.slice(0, 4);

  const q = useCallback(
    (selector: string) =>
      Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>(selector) ?? []
      ),
    []
  );

  const resetContent = useCallback(() => {
    gsap.set(q(".sm-item-inner"), { yPercent: 130, rotate: 6 });
    gsap.set(q(".sm-num"), { opacity: 0 });
    gsap.set(q(".sm-sub"), { opacity: 0, y: 12 });
    gsap.set(q(".sm-social"), { opacity: 0, y: 20 });
    gsap.set(q(".sm-footer"), { opacity: 0, y: 20 });
  }, [q]);

  // Initial off-screen state
  useLayoutEffect(() => {
    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.set([...layers, panelRef.current], { xPercent: offscreen });
    resetContent();
  }, [offscreen, resetContent, items.length]);

  const playOpen = useCallback(() => {
    tlRef.current?.kill();
    setPanelVisible(true);

    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    const panel = panelRef.current;
    if (!panel) return;

    // Make sure elements are mounted/visible before animating
    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      const step = 0.07;

      layers.forEach((layer, i) => {
        tl.to(
          layer,
          { xPercent: 0, duration: 0.5, ease: "power4.out" },
          i * step
        );
      });

      const panelStart = layers.length * step + 0.08;
      tl.to(
        panel,
        { xPercent: 0, duration: 0.65, ease: "power4.out" },
        panelStart
      );
      tl.to(
        q(".sm-item-inner"),
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
        },
        panelStart + 0.12
      );
      tl.to(
        q(".sm-num"),
        { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 },
        panelStart + 0.3
      );
      tl.to(
        q(".sm-sub"),
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.04 },
        panelStart + 0.45
      );
      tl.to(
        q(".sm-social"),
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 },
        panelStart + 0.5
      );
      tl.to(
        q(".sm-footer"),
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        panelStart + 0.55
      );
      tlRef.current = tl;
    });
  }, [q]);

  const playClose = useCallback(() => {
    tlRef.current?.kill();
    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    const panel = panelRef.current;
    if (!panel) return;

    tlRef.current = gsap.timeline().to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.4,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        resetContent();
        setPanelVisible(false);
      },
    });
  }, [offscreen, resetContent]);

  const setMenu = useCallback(
    (next: boolean) => {
      if (openRef.current === next) return;
      openRef.current = next;
      setOpen(next);
      if (next) {
        playOpen();
        onMenuOpen?.();
      } else {
        playClose();
        onMenuClose?.();
      }
    },
    [playOpen, playClose, onMenuOpen, onMenuClose]
  );

  // Close on route change
  useEffect(() => {
    setMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setMenu]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cleanup
  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const buttonColor =
    open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

  const sideClass = position === "left" ? "left-0" : "right-0";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 pointer-events-none"
      data-open={open}
    >
      {/* Backdrop */}
      <div
        onClick={() => setMenu(false)}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
      />

      {/* Staggered pre-layers */}
      <div
        className={`absolute top-0 bottom-0 ${sideClass} w-full sm:w-[clamp(320px,42vw,540px)] pointer-events-none`}
        aria-hidden="true"
      >
        {layerColors.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ background: c }}
          />
        ))}
      </div>

      {/* Header bar: logo + toggle */}
      <header
        className={`absolute top-0 left-0 right-0 z-20 pointer-events-none ${headerClassName}`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="pointer-events-auto">{logo}</div>

          <div className="pointer-events-auto flex items-center gap-3 sm:gap-5">
            {headerActions}
            <button
              type="button"
              onClick={() => setMenu(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-full cursor-pointer select-none focus:outline-none transition-colors duration-300 hover:!text-[#BE9B59]"
              style={{ color: buttonColor }}
            >
              <span className="relative block w-5 h-5" aria-hidden="true">
                {/* Three lines */}
                <span
                  className={`absolute inset-0 flex flex-col items-end justify-between py-[3px] transition-all duration-300 ${open ? "opacity-0 rotate-90 scale-50" : "opacity-100"
                    }`}
                >
                  <span className="block h-px w-full bg-current" />
                  <span className="block h-px w-full bg-current" />
                  <span className="block h-px w-full bg-current" />
                </span>
                {/* Close cross */}
                <span
                  className={`absolute inset-0 transition-all duration-300 ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90 scale-50"
                    }`}
                >
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current rotate-45" />
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current -rotate-45" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Panel */}
      <aside
        ref={panelRef}
        id="staggered-menu-panel"
        aria-hidden={!open}
        aria-label="Main navigation"
        className={`absolute top-0 bottom-0 ${sideClass} z-10 w-full sm:w-[clamp(320px,42vw,540px)] flex flex-col pointer-events-auto overflow-y-auto ${panelVisible ? "visible" : "invisible"
          }`}
        style={{ background: panelColor }}
      >
        <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 pt-28 pb-8">
          <ul
            className="flex flex-col gap-1 sm:gap-2"
            style={{ counterReset: "smItem" }}
          >
            {items.map((item, idx) => (
              <li key={item.label + idx} className="relative">
                <div className="overflow-hidden py-1">
                  <Link
                    href={item.link}
                    aria-label={item.ariaLabel || item.label}
                    tabIndex={open ? 0 : -1}
                    className="sm-item-inner group relative inline-block origin-bottom-left"
                  >
                    <span
                      className={`font-editorial font-light uppercase leading-[1.05] tracking-[0.04em] text-4xl sm:text-5xl transition-colors duration-300 ${item.active
                        ? "text-[var(--sm-accent)]"
                        : "text-[#171816] group-hover:text-[var(--sm-accent)]"
                        }`}
                      style={
                        { ["--sm-accent" as string]: accentColor } as React.CSSProperties
                      }
                    >
                      {item.label}
                    </span>
                    {displayItemNumbering && (
                      <span
                        className="sm-num absolute -top-0.5 -right-7 font-sans text-[11px] tracking-widest font-medium"
                        style={{ color: accentColor }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    )}
                  </Link>
                </div>

                {item.children && item.children.length > 0 && (
                  <ul className="mt-2 mb-3 ml-1 flex flex-col gap-1.5 border-l border-black/10 pl-4">
                    {item.children.map((c) => (
                      <li key={c.link} className="sm-sub">
                        <Link
                          href={c.link}
                          tabIndex={open ? 0 : -1}
                          className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#171816]/60 hover:text-[#BE9B59] transition-colors"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-8 sm:px-12 pb-8 flex flex-col gap-6">
          {displaySocials && socialItems.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3
                className="sm-social font-sans text-[11px] uppercase tracking-[0.3em] font-medium"
                style={{ color: accentColor }}
              >
                Socials
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socialItems.map((s) => (
                  <li key={s.label} className="sm-social">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={open ? 0 : -1}
                      className="font-sans text-xs uppercase tracking-[0.2em] text-[#171816]/80 hover:text-[#BE9B59] transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footer && <div className="sm-footer">{footer}</div>}
        </div>
      </aside>
    </div>
  );
}