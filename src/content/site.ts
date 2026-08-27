/**
 * Site-wide constants. Facts here trace back to me.md.
 *
 * Nothing in me.md §Conflicts or §Off-limits may appear in this file: no
 * contact email (spec.md Q8 unresolved), no CV link, and no J.P. Morgan detail
 * beyond the fact of the internship — which belongs on /about and nowhere else.
 */

import { prose } from "@/lib/prose";

export const site = {
  name: "William Armstrong",

  /**
   * Feeds <meta name="description">, the OG images and the About header, so it
   * is read out of context and must stand alone. Keep under 160 characters or
   * search results truncate it. This is why the longer landing copy is a
   * separate string rather than an extension of this one.
   */
  descriptor: prose`
    Electronics and software engineering at the University of Glasgow, working across the boundary
    between the two.
  `,

  /** Landing title block only — spec.md §5. May not name J.P. Morgan. */
  intro: prose`
    I am in my final year of a BEng in Electronics and Software Engineering at the University of
    Glasgow — a degree that sits across the hardware and software boundary rather than on one side
    of it. What interests me is how those layers behave where they meet, and what it costs to build
    systems where performance is a constraint rather than an afterthought. The work collected here
    is the work that shipped.
  `,

  location: "Glasgow, Scotland",

  /**
   * MUST be set in the Vercel environment before launch (spec.md Q5 — no
   * domain registered yet), or shared links unfurl against localhost.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
    { href: "/about", label: "About" },
  ],

  links: [
    { href: "https://github.com/williamkarmstrong", label: "GitHub", icon: "github" },
    { href: "https://linkedin.com/in/williamkarmstrong", label: "LinkedIn", icon: "linkedin" },
  ],
} as const;
