import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioCategoryExperience } from "@/components/page/portfolio-category-experience";
import { PORTFOLIO } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PORTFOLIO.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = PORTFOLIO.find((c) => c.slug === slug);
  if (!cat) return { title: "Portfolio — Vantage Printers" };
  return {
    title: `${cat.title} — Vantage Portfolio`,
    description: cat.short,
  };
}

export default async function PortfolioCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = PORTFOLIO.find((c) => c.slug === slug);
  if (!category) notFound();

  return <PortfolioCategoryExperience category={category} />;
}
