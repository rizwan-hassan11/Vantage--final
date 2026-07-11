import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Stats } from "@/components/sections/stats";
import { Sustainability } from "@/components/sections/sustainability";
import { Latest } from "@/components/sections/latest";
import { Clients } from "@/components/sections/clients";
import { Certifications } from "@/components/sections/certifications";
import { About } from "@/components/sections/about";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <Sustainability />
      <Latest />
      <Clients />
      <Certifications />
      <About />
    </>
  );
}
