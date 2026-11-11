import type { Metadata } from "next";
import Apartments from "@/components/proftfolio";

export const metadata: Metadata = {
    title: "Apartments — ERA Residence Estepona",
    description:
        "Explore ground floor residences, duplexes and penthouses designed for contemporary Mediterranean living on Costa del Sol.",
};

export default function Page() {
    return <Apartments />;
}