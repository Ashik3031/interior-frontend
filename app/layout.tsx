import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import { NavigationProvider } from "@/context/NavigationContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import CookieConsentBanner from "@/components/cookie-consent/CookieConsentBanner";
import CookiePreferencesModal from "@/components/cookie-consent/CookiePreferencesModal";
import LiveChatConcierge from "@/components/LiveChatConcierge";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RichMan Interiors | Bespoke Luxury Interior Design & Renovation Dubai",
  description:
    "RichMan Interiors is a premier luxury interior design and renovation studio based in Dubai, UAE. Thoughtfully designed interiors, timeless materials, and exceptional spaces.",
  keywords: [
    "RichMan Interiors",
    "Luxury Interior Design Dubai",
    "Dubai Interior Architecture",
    "Villa Renovation Dubai",
    "Penthouse Interior Design",
  ],
  icons: {
    icon: [
      { url: "/images/RM Interior - Logo Icon .png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/images/RM Interior - Logo Icon .png",
    apple: [
      { url: "/images/RM Interior - Logo Icon .png", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#171816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#171816] text-[#F5F0E7] font-sans antialiased selection:bg-[#BE9B59] selection:text-[#171816] overflow-x-hidden">
        <NavigationProvider>
          <CookieConsentProvider>
            <Navbar />
            <ScrollProgress />
            {children}
            <Footer />
            <LiveChatConcierge />
            <CookieConsentBanner />
            <CookiePreferencesModal />
          </CookieConsentProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
