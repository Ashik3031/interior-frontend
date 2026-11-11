import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Services & Disciplines | RichMan Interiors Turnkey Atelier Dubai",
  description:
    "Explore RichMan Interiors' 6 practice disciplines: Complete Turnkey Fit-Out, Villa & Apartment Renovations, Office & Commercial Interiors, MEP Works (Electrical, HVAC & Plumbing), Authority Approval Coordination, and Project Management & Execution in Dubai, UAE.",
  keywords: [
    "Complete Turnkey Fit-Out Dubai",
    "Villa & Apartment Renovations Dubai",
    "Office & Commercial Interiors Dubai",
    "MEP Works Dubai HVAC Electrical Plumbing",
    "Authority Approval Coordination Dubai Municipality DCD",
    "Project Management & Execution Interior Fit-Out",
  ],
};

export default function Page() {
  return <ServicesPage />;
}

