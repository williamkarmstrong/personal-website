import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/content/site";

/**
 * Both variants are rendered and swapped in CSS, not JS, so the right one is
 * painted server-side with no flash before hydration.
 *
 * Both stay `alt=""` — the accessible name is on the wrapping link, so the
 * hidden variant cannot contribute a duplicate.
 */
const MARKS = [
  { src: "/wa_header.png", cls: "dark-hidden" },
  { src: "/wa_header_dark.png", cls: "light-hidden" },
] as const;

/** Shared: both files are trimmed to the same ink box, with no transparent
 *  padding. A re-export that breaks that makes the mark change size on
 *  toggling theme — trim the new file rather than splitting this per variant. */
const MARK_SIZE = { width: 370, height: 163 };

function SiteMark() {
  return (
    <>
      {MARKS.map(({ src, cls }) => (
        <Image
          key={src}
          src={src}
          {...MARK_SIZE}
          // Not optional: without `sizes`, next/image picks from the device
          // widths and ships a 384px file for a 55px mark (N2). Set just above
          // the rendered 55px so the browser takes the 64px candidate rather
          // than upscaling the 48px one.
          sizes="56px"
          alt=""
          priority
          className={`h-6 w-auto ${cls}`}
        />
      ))}
    </>
  );
}

export function SiteHeader() {
  return (
    // Opacity is high and the blur strong: at lower values, content scrolling
    // underneath stayed legible through the bar and read as a rendering fault.
    <header className="sticky top-0 z-10 border-b border-border bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-column items-center justify-between gap-6 px-4 py-3 md:px-6">
        {/* The mark is the only route home now that the wordmark is gone, so
            the accessible name goes here — the images are alt="". The negative
            margin keeps the 44px target from padding the mark off the column
            edge, so it still optically aligns with the content below. */}
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="-mx-2 flex min-h-9 items-center px-2 no-underline"
        >
          <SiteMark />
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
