"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Theme toggle — design.md §5, spec.md F7.
 *
 * System preference is followed until the user makes an explicit choice, which
 * is then stored and wins. The stored choice is applied by the inline script in
 * layout.tsx before first paint; this component only reflects and changes it.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(stored ?? (systemDark ? "dark" : "light"));
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // aria-label rather than visible text: the icon is the whole control.
      aria-label={
        theme === null
          ? "Toggle theme"
          : `Switch to ${theme === "dark" ? "light" : "dark"} theme`
      }
      className="card-interactive flex size-9 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text"
    >
      {/* Both icons are rendered and swapped with CSS so the control does not
          shift or flash before the theme is known on the client. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="size-4 dark-hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 light-hidden"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
