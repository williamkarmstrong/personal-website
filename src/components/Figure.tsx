/**
 * Figures — design.md §5. Numbered sequentially per page, always captioned.
 * A figure without a real caption is just an image; don't number it.
 */
export function Figure({
  number,
  caption,
  children,
}: {
  number: number;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mt-8">
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-subtle">
        {children}
      </div>
      <figcaption className="mt-3 text-small text-text-secondary">
        <span className="font-mono text-text-faint">Fig. {number}</span>{" "}
        <span className="text-text-faint">—</span> {caption}
      </figcaption>
    </figure>
  );
}

/**
 * Stands in where a figure is specified but its asset does not exist yet.
 * States what is missing rather than rendering a decorative placeholder: an
 * empty frame pretending to be content is worse than an honest gap.
 */
export function PendingFigure({ note }: { note: string }) {
  return (
    <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-border-strong p-6">
      <p className="label">Figure pending</p>
      <p className="measure mt-2 text-small text-text-secondary">{note}</p>
    </div>
  );
}
