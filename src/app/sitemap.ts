import type { MetadataRoute } from "next";
import { navLinks, siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "/",
    ...navLinks.map((link) => link.href),
    "/about",
    "/testimonials",
    "/faq",
    "/login",
  ];

  return Array.from(new Set(routes)).map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
