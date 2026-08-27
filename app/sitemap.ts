import type { MetadataRoute } from "next";
import { PORTFOLIO } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/company", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/partners", priority: 0.6, changeFrequency: "monthly" as const },
    {
      path: "/start-a-project",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
  ];

  return [
    ...staticRoutes.map(({ path, ...entry }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      ...entry,
    })),
    ...PORTFOLIO.map((category) => ({
      url: `${siteUrl}/work/${category.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

