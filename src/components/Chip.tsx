import type { Hue } from "@/content/projects";

/**
 * Written out rather than built as `hue-${hue}`. Tailwind resolves utilities by
 * scanning source text for literal class names, so an interpolated one is never
 * generated and every chip would silently fall back to the slate default.
 */
const HUE_CLASS: Record<Hue, string> = {
  blue: "hue-blue",
  teal: "hue-teal",
  green: "hue-green",
  amber: "hue-amber",
  rose: "hue-rose",
  violet: "hue-violet",
  slate: "hue-slate",
};

export function Chip({
  hue,
  dot = false,
  children,
}: {
  hue: Hue;
  dot?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`chip ${HUE_CLASS[hue]} ${dot ? "chip-dot" : ""}`}>
      {children}
    </span>
  );
}
