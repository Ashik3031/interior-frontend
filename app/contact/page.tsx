import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact | RichMan Interiors Atelier & Private Client Concierge Dubai",
  description:
    "Connect with RichMan Interiors. Visit our Al Quoz Design Atelier or Downtown Dubai private client suite. Start your private villa, penthouse, or turnkey renovation commission.",
  keywords: [
    "Contact RichMan Interiors",
    "Dubai Interior Design Studio Address",
    "Al Quoz Interior Design Atelier",
    "Downtown Dubai Interior Architect",
    "Private Client Concierge Interior Design",
  ],
};

export default function Page() {
  return <ContactPage />;
}

