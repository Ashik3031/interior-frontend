import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact | RichMan Interiors Atelier & Private Client Concierge Dubai",
  description:
    "Connect with RichMan Interiors at The Tower Plaza Hotel, Sheikh Zayed Road, Dubai. Start your private villa, penthouse, or turnkey renovation commission.",
  keywords: [
    "Contact RichMan Interiors",
    "Dubai Interior Design Studio Address",
    "Sheikh Zayed Road Interior Design Atelier",
    "The Tower Plaza Hotel Office Dubai",
    "Private Client Concierge Interior Design",
  ],
};

export default function Page() {
  return <ContactPage />;
}

