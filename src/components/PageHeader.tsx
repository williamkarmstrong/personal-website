/**
 * Page header — design.md §5. Replaces v1's datasheet "title block".
 *
 * No revision field: a website does not have a document revision, and
 * pretending otherwise was the most costume-ish part of the old theme.
 */
export function PageHeader({
  label,
  title,
  descriptor,
  meta = [],
}: {
  label?: string;
  title: string;
  descriptor?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="pb-10">
      {label && <p className="label">{label}</p>}

      <h1 className="mt-3 text-h1 font-semibold text-balance">{title}</h1>

      {descriptor && (
        <p className="measure mt-4 text-body-lg text-text-secondary">
          {descriptor}
        </p>
      )}

      {meta.length > 0 && (
        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {meta.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2">
              <dt className="label">{m.label}</dt>
              <dd className="font-mono text-small text-text-secondary">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
