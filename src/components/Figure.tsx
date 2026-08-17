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
        <span className="font-mono text-accent">Fig. {number}</span>{" "}
        <span className="text-text-faint">—</span> {caption}
      </figcaption>
    </figure>
  );
}

/** Stands in where a figure is specified but its asset does not exist yet. */
export function PendingFigure({ note }: { note: string }) {
  return (
    <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-ink-rose/40 bg-wash-rose p-6">
      {/* `text-ink-rose` also recolours the label's leading rule, which is
          drawn in currentColor. */}
      <p className="label text-ink-rose">Figure pending</p>
      <p className="measure mt-2 text-small text-text-secondary">{note}</p>
    </div>
  );
}
