import type { Metadata } from "next";
// Adjust this import path to wherever you save AboutPage.tsx
import AboutPage from "@/components/Aboutpage";

export const metadata: Metadata = {
    title: "About | RichMan Interiors, Luxury Interior Design & Fit-Out in Dubai",
    description:
        "RichMan Interiors is a Dubai luxury interior design and fit-out company creating calm, personal homes and exceptional spaces across Dubai.",
};

export default function Page() {
    return <AboutPage />;
}