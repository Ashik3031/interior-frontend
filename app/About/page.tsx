import type { Metadata } from "next";
// Adjust this import path to wherever you save AboutPage.tsx
import AboutPage from "@/components/Aboutpage";

export const metadata: Metadata = {
    title: "About | RichMan Interiors, Interior Design & Fit-Out Studio in Dubai",
    description:
        "RichMan Interiors is a Dubai design and fit-out studio creating calm, personal homes and workplaces across the UAE, from the first sketch to the final styling.",
};

export default function Page() {
    return <AboutPage />;
}