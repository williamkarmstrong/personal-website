import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    // Opacity is high and the blur strong: at lower values, content scrolling
    // underneath stayed legible through the bar and read as a rendering fault.
    <header className="sticky top-0 z-10 border-b border-border bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-column items-center justify-between gap-6 px-4 py-3 md:px-6">
        <Link href="/" className="font-semibold text-text no-underline">
          {site.name}
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-[var(--radius)] px-3 py-2 text-small text-text-secondary no-underline transition-colors hover:bg-surface-subtle hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
