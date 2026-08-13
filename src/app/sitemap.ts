import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { publishedPosts } from "@/content/posts";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/writing", "/about"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: new Date(),
    })),
    ...publishedPosts().map((p) => ({
      url: `${site.url}/writing/${p.slug}`,
      lastModified: new Date(p.date),
    })),
  ];
}
