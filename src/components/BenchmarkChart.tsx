/**
 * A figure drawn from measured numbers rather than photographed. Same frame,
 * numbering and caption treatment as any other figure (design.md §5) — it is
 * placed inside <Figure> and owns only the drawing.
 *
 * Inline SVG rather than a committed image, for two reasons: the site has two
 * themes and a flat PNG can only be right in one of them, and every colour here
 * has to come from a token (design.md §2). Amber is the systems-and-concurrency
 * hue (§2.3), which is what this measures. Nothing is interactive: a figure on a
 * prose page is an illustration, so the values a hover would have carried are in
 * the accessible description instead.
 */

export interface BenchmarkPoint {
  /** Thread count. Plotted at even spacing, not to scale — the counts double. */
  threads: number;
  /** Every measured run, in order. The median is derived, never stored, so the
      drawing cannot drift from the numbers it was taken from. */
  runs: number[];
}

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

/* Geometry. The right pad holds the end label; the left holds the y ticks and
   their rotated title. */
const W = 640;
const H = 360;
const PAD = { top: 20, right: 68, bottom: 56, left: 70 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

export function BenchmarkChart({
  points,
  yMax,
  yTicks,
  xTitle,
  yTitle,
  description,
}: {
  points: BenchmarkPoint[];
  yMax: number;
  yTicks: number[];
  xTitle: string;
  yTitle: string;
  /** Replaces the drawing for a screen reader, so it must carry the values. */
  description: string;
}) {
  const x = (i: number) => PAD.left + (i / (points.length - 1)) * PLOT_W;
  const y = (value: number) => PAD.top + PLOT_H - (value / yMax) * PLOT_H;

  const medians = points.map((point) => median(point.runs));
  const path = medians.map((m, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(m)}`).join(" ");
  const last = medians.length - 1;

  return (
    /* A viewBox scales its type down with it, and on a phone column the tick
       labels would land under 7px. Below the floor the figure scrolls in its
       own container instead — the same answer the wide tables take. */
    <div className="scroll-x p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={description}
        className="h-auto w-full min-w-[32rem]"
      >
        {/* Gridlines carry the values that are not directly labelled, so they
            stay — hairline and one step off the ground, never dashed. */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={PAD.left + PLOT_W}
              y1={y(tick)}
              y2={y(tick)}
              className="stroke-border"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 12}
              y={y(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-text-faint font-mono text-[13px]"
            >
              {tick}
            </text>
          </g>
        ))}

        {points.map((point, i) => (
          <text
            key={point.threads}
            x={x(i)}
            y={PAD.top + PLOT_H + 26}
            textAnchor="middle"
            className="fill-text-faint font-mono text-[13px]"
          >
            {point.threads}
          </text>
        ))}

        <text
          x={PAD.left + PLOT_W / 2}
          y={H - 8}
          textAnchor="middle"
          className="fill-text-secondary font-mono text-[13px]"
        >
          {xTitle}
        </text>
        <text
          transform={`translate(18 ${PAD.top + PLOT_H / 2}) rotate(-90)`}
          textAnchor="middle"
          className="fill-text-secondary font-mono text-[13px]"
        >
          {yTitle}
        </text>

        {/* Individual runs behind the median, showing the spread the median was
            taken from. Same hue at reduced weight: they are the same
            measurement, not a second series, so they must not read as one. */}
        {points.flatMap((point, i) =>
          point.runs.map((run, j) => (
            <circle
              key={`${point.threads}-${j}`}
              cx={x(i)}
              cy={y(run)}
              r={2.5}
              className="fill-ink-amber opacity-45"
            />
          )),
        )}

        <path
          d={path}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-ink-amber"
        />

        {/* The surface ring keeps a marker legible where it sits on the line and
            over its own run dots. */}
        {medians.map((m, i) => (
          <circle
            key={points[i].threads}
            cx={x(i)}
            cy={y(m)}
            r={4}
            strokeWidth={2}
            className="fill-ink-amber stroke-surface-subtle"
          />
        ))}

        {/* Labelled at the ends only. The axis carries the rest; a number on
            every point stops being read. */}
        {/* Below its marker, not above: the line climbs away to the right, and
            a label set above the first point sits on top of it. */}
        <text
          x={x(0) + 12}
          y={y(medians[0]) + 22}
          className="fill-text-secondary font-mono text-[13px]"
        >
          {medians[0]} ms
        </text>
        <text
          x={x(last) + 12}
          y={y(medians[last])}
          dominantBaseline="middle"
          className="fill-text-secondary font-mono text-[13px]"
        >
          {medians[last]} ms
        </text>
      </svg>
    </div>
  );
}
