import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "MKYT",
    description: siteConfig.mission,
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf2",
    theme_color: "#e9682c",
    categories: ["food", "business", "shopping"],
  };
}
