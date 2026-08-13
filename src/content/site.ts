/**
 * Site-wide constants. Facts here trace back to me.md.
 *
 * Nothing in me.md §Conflicts or §Off-limits may appear in this file. Notably:
 * no contact email (spec.md Q8 unresolved), no CV link (resolved: none), and
 * no J.P. Morgan detail beyond the fact of the internship.
 */

export const site = {
  name: "William Armstrong",

  /** spec.md Q-voice: tone is "plain and precise, first person, no
   *  salesmanship" — proposed in me.md §Voice, not yet confirmed. */
  descriptor:
    "Electronics and software engineering at the University of Glasgow, working across the boundary between the two.",

  location: "Glasgow, Scotland",

  /**
   * Required for absolute Open Graph URLs (F10). No domain is registered yet
   * (spec.md Q5) — this MUST be set in the Vercel environment before launch,
   * or shared links will unfurl against localhost.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
    { href: "/about", label: "About" },
  ],

  /** `icon` names the brand mark the component renders — design.md §5. A link
   *  without one renders as text alone. */
  links: [
    { href: "https://github.com/williamkarmstrong", label: "GitHub", icon: "github" },
    { href: "https://linkedin.com/in/williamkarmstrong", label: "LinkedIn", icon: "linkedin" },
  ],
} as const;

