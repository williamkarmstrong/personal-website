export function PageHeader({
  label,
  title,
  descriptor,
  intro,
  meta = [],
  portrait,
}: {
  label?: string;
  title: string;
  descriptor?: string;
  /** Landing standfirst. Replaces `descriptor`, set a step smaller. */
  intro?: string;
  meta?: { label: string; value: React.ReactNode }[];
  /** The landing headshot only — takes a side column from `lg`. */
  portrait?: React.ReactNode;
}) {
  return (
    <header className="pb-10">
      <div
        className={
          portrait
            ? "grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-start lg:gap-12"
            : undefined
        }
      >
        <div>
          {label && <p className="label">{label}</p>}

          <h1 className="mt-3 text-h1 font-semibold text-balance">{title}</h1>

          {intro ? (
            <p className="measure mt-4 text-body leading-[1.55] text-text-secondary">
              {intro}
            </p>
          ) : (
            descriptor && (
              <p className="measure mt-4 text-body-lg text-text-secondary">
                {descriptor}
              </p>
            )
          )}

          {meta.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {meta.map((m) => (
                <div key={m.label} className="flex items-baseline gap-2">
                  <dt className="label">{m.label}</dt>
                  <dd className="text-small text-text-secondary">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {portrait}
      </div>
    </header>
  );
}
