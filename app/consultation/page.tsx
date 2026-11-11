import type { Metadata } from "next";
import ConsultationPage from "@/components/ConsultationPage";

export const metadata: Metadata = {
  title: "Book a Consultation | RichMan Interiors Turnkey Design Advisory Dubai",
  description:
    "Schedule a private 45-minute architectural interior consultation with RichMan Interiors. Explore blueprints, curated stone & joinery specimens, and transparent budget feasibility.",
  keywords: [
    "Book Interior Design Consultation Dubai",
    "Luxury Villa Interior Designer Consultation",
    "RichMan Interiors Consultation",
    "Turnkey Renovation Advisory Dubai",
    "Private Client Architectural Session",
  ],
};

export default function Page() {
  return <ConsultationPage />;
}

