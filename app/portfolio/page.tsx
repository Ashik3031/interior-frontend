import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio & Selected Works | RichMan Interiors Dubai",
  description:
    "Explore RichMan Interiors' architectural portfolio of luxury private villas, golf estates in Emirates Hills, penthouses in Downtown Dubai, and beachfront sanctuaries on Palm Jumeirah.",
  keywords: [
    "Luxury Villa Interior Design Portfolio Dubai",
    "Palm Jumeirah Villa Interiors",
    "Emirates Hills Interior Design Projects",
    "Downtown Dubai Penthouse Fitout",
    "RichMan Interiors Case Studies",
  ],
};

export default function Page() {
  return <PortfolioPage />;
}

