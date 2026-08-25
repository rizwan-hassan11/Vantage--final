import { HomeExperience } from "@/components/home/home-experience";
import { HomeClosing } from "@/components/home/home-closing";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Vantage Printers",
  url: "https://vantage.pk",
  logo: "https://vantage.pk/brand/vantage-lockup.png",
  email: "info@vantageprinters.com",
  telephone: "+92-42-35752374",
  address: {
    "@type": "PostalAddress",
    streetAddress: "28-N Gulberg II",
    addressLocality: "Lahore",
    postalCode: "54660",
    addressCountry: "PK",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomeExperience>
        <HomeClosing />
      </HomeExperience>
    </>
  );
}
