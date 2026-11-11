import type { Metadata } from "next";
import ConsultationPage from "@/components/ConsultationPage";

export const metadata: Metadata = {
  title: "Book a Consultation | RichMan Interiors Turnkey Design Advisory Dubai",
  description:
    "Schedule a private 45-minute architectural interior consultation with RichMan Interiors. Explore blueprints, curated stone & joinery specimens, and transparent budget feasibility.",
};

export default function Page() {
  return <ConsultationPage />;
}

