import type { Hue } from "@/content/projects";

/**
 * Written out rather than built as `hue-${hue}`. Tailwind resolves utilities by
 * scanning source text for literal class names, so an interpolated one is never
 * generated and every marker would silently fall back to the slate default.
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

/**
 * A dot and a word — design.md §5 Status markers. Status is the only
 * categorical signal that still takes colour, because it is the only one that
 * reads without a legend (§2.3).
 */
export function StatusMarker({
  hue,
  children,
}: {
  hue: Hue;
  children: React.ReactNode;
}) {
  return (
    <span className={`status ${HUE_CLASS[hue]}`}>{children}</span>
  );
}
