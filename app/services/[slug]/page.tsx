import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, SERVICES } from "@/data/servicesData";
import ServiceDetailPage from "@/components/ServiceDetailPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | RichMan Interiors Dubai",
    };
  }

  return {
    title: `${service.title} | RichMan Interiors Turnkey Atelier Dubai`,
    description: service.subtitle,
    keywords: [
      service.title,
      "RichMan Interiors Dubai",
      "Luxury Interior Design Dubai",
      "Turnkey Fit-Out UAE",
    ],
  };
}

async function ServiceContent({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <ServiceContent params={params} />
    </Suspense>
  );
}
