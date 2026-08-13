import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { site } from "@/content/site";

/** Brand marks, keyed by the `icon` name in the content module. */
const brandIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
} as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-column flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-8 md:px-6">
        <p className="text-small text-text-faint">
          {site.name} — {site.location}
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {site.links.map((link) => {
            const Icon = brandIcons[link.icon];

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-2 text-small text-text-secondary no-underline transition-colors hover:text-text"
                >
                  <Icon />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
