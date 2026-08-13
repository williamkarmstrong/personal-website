import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * The site must remain statically exportable (spec.md §3.1) so that moving off
 * Vercel stays cheap. That means no middleware, route handlers, ISR, or server
 * actions. `output: "export"` is deliberately not set — running on Vercel keeps
 * next/image optimisation and next/og available — but nothing may be added that
 * would prevent it being set.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
