import type { Metadata } from "next";
import { CapabilitiesExperience } from "@/components/page/capabilities-experience";
import { SERVICES_INTRO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities — Vantage Printers",
  description: SERVICES_INTRO,
};

export default function ServicesPage() {
  return <CapabilitiesExperience />;
}
