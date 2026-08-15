import type { Metadata } from "next";
import { AboutExperience } from "@/components/page/about-experience";

export const metadata: Metadata = {
  title: "About Vantage — Vantage Printers",
  description:
    "From a Lahore design house in 1992 to an integrated print and packaging company, discover the people and ideas behind Vantage.",
};

export default function CompanyPage() {
  return <AboutExperience />;
}
