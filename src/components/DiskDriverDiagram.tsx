/**
 * The disk driver's architecture, summarised — the submitted coursework diagram
 * is a numbered collaboration diagram of every call, which is a specification,
 * not a figure. What survives here is the shape a reader needs: the request
 * path down, the completion path back, and the four concurrent parts in the
 * middle.
 *
 * Drawn rather than exported, for the reasons in BenchmarkChart: two themes,
 * and every colour has to come from a token. Amber is the
 * systems-and-concurrency hue (design.md §2.3) and marks only the boxes that
 * are actually concurrent; everything else takes the neutral hairline.
 *
 * Geometry is laid out on a fixed grid: five bands, and two lanes with a
 * gutter between them that every arrow label sits in. The `viewBox` width
 * matches the benchmark chart's so type renders at the same size in both.
 */

/* Lanes. The gutter between them is deliberately kept empty of marks so the
   labels have somewhere to live. */
const LANE_W = 188;
const LEFT_X = 112;
const RIGHT_X = 340;
const LEFT_C = LEFT_X + LANE_W / 2; // 206
const RIGHT_C = RIGHT_X + LANE_W / 2; // 434
const FULL_X = LEFT_X;
const FULL_W = RIGHT_X + LANE_W - LEFT_X; // 416
const MID = FULL_X + FULL_W / 2; // 320

/* Bands, top to bottom, and the return corridors either side of them. */
const APP_Y = 12;
const DRIVER_Y = 106;
const QUEUE_Y = 200;
const WORKER_Y = 298;
const DEVICE_Y = 396;
const BOX_H = 50;
const LANE_H = 54;
const DEVICE_H = 44;
const LEFT_RETURN = 64;
const RIGHT_RETURN = 576;

const W = 640;
const H = 452;

/** Out of a worker, along the margin, and back into the application box. */
const returnPath = (from: number, corridor: number, to: number) =>
  `M${from} ${WORKER_Y + LANE_H / 2} H${corridor} V${APP_Y + BOX_H / 2} H${to}`;

function Box({
  x,
  y,
  w,
  h,
  label,
  concurrent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Draws the amber hairline: this box is one of the concurrent parts. */
  concurrent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        className={
          concurrent
            ? "fill-surface stroke-ink-amber"
            : "fill-surface stroke-border-strong"
        }
        strokeWidth={concurrent ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-text text-[12.5px]"
      >
        {label}
      </text>
    </g>
  );
}

/** Arrow labels and axis-style annotations: mono, quiet, never the mark's hue. */
function Note({
  x,
  y,
  children,
  anchor = "middle",
  rotate = false,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  rotate?: boolean;
}) {
  return (
    <text
      x={rotate ? undefined : x}
      y={rotate ? undefined : y}
      transform={rotate ? `translate(${x} ${y}) rotate(-90)` : undefined}
      textAnchor={anchor}
      dominantBaseline="middle"
      className="fill-text-faint font-mono text-[11px]"
    >
      {children}
    </text>
  );
}

export function DiskDriverDiagram({ description }: { description: string }) {
  return (
    /* Same scroll-below-the-floor rule as the chart: a viewBox scales its type
       down with the column, and these labels are already the smallest on the
       page. */
    <div className="scroll-x p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={description}
        className="h-auto w-full min-w-[34rem]"
      >
        <defs>
          {/* userSpaceOnUse, so the head stays one size while the strokes
              beneath it differ in weight. */}
          <marker
            id="disk-driver-arrow"
            viewBox="0 0 10 10"
            refX={9}
            refY={5}
            markerWidth={7}
            markerHeight={7}
            markerUnits="userSpaceOnUse"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 z" className="fill-text-faint" />
          </marker>
        </defs>

        <g
          className="stroke-text-faint"
          strokeWidth={1.25}
          fill="none"
          markerEnd="url(#disk-driver-arrow)"
        >
          {/* Request out, voucher straight back — the caller never waits on the
              device, which is the whole point of the design. */}
          <path d={`M250 ${APP_Y + BOX_H + 4} V${DRIVER_Y - 4}`} />
          <path d={`M390 ${DRIVER_Y - 4} V${APP_Y + BOX_H + 4}`} />

          <path d={`M${LEFT_C} ${DRIVER_Y + BOX_H + 4} V${QUEUE_Y - 4}`} />
          <path d={`M${RIGHT_C} ${DRIVER_Y + BOX_H + 4} V${QUEUE_Y - 4}`} />

          <path d={`M${LEFT_C} ${QUEUE_Y + LANE_H + 4} V${WORKER_Y - 4}`} />
          <path d={`M${RIGHT_C} ${QUEUE_Y + LANE_H + 4} V${WORKER_Y - 4}`} />

          <path
            d={`M${LEFT_C - 16} ${WORKER_Y + LANE_H + 4} V${DEVICE_Y - 4}`}
          />
          <path
            d={`M${RIGHT_C - 16} ${WORKER_Y + LANE_H + 4} V${DEVICE_Y - 4}`}
          />
          <path
            d={`M${LEFT_C + 16} ${DEVICE_Y - 4} V${WORKER_Y + LANE_H + 4}`}
            strokeDasharray="4 4"
          />
          <path
            d={`M${RIGHT_C + 16} ${DEVICE_Y - 4} V${WORKER_Y + LANE_H + 4}`}
            strokeDasharray="4 4"
          />

          {/* The completion path, dashed because it is deferred: the worker
              publishes on the voucher and the caller collects later. Drawn from
              both workers, since either lane can be the one that completes. */}
          <path d={returnPath(LEFT_X, LEFT_RETURN, LEFT_X - 4)} strokeDasharray="4 4" />
          <path
            d={returnPath(RIGHT_X + LANE_W, RIGHT_RETURN, RIGHT_X + LANE_W + 4)}
            strokeDasharray="4 4"
          />
        </g>

        <Box
          x={FULL_X}
          y={APP_Y}
          w={FULL_W}
          h={BOX_H}
          label="Application threads"
        />
        <Box x={FULL_X} y={DRIVER_Y} w={FULL_W} h={BOX_H} label="Disk driver" />
        <Box
          x={LEFT_X}
          y={QUEUE_Y}
          w={LANE_W}
          h={LANE_H}
          label="Bounded write queue"
          concurrent
        />
        <Box
          x={RIGHT_X}
          y={QUEUE_Y}
          w={LANE_W}
          h={LANE_H}
          label="Bounded read queue"
          concurrent
        />
        <Box
          x={LEFT_X}
          y={WORKER_Y}
          w={LANE_W}
          h={LANE_H}
          label="Write worker thread"
          concurrent
        />
        <Box
          x={RIGHT_X}
          y={WORKER_Y}
          w={LANE_W}
          h={LANE_H}
          label="Read worker thread"
          concurrent
        />
        <Box
          x={FULL_X}
          y={DEVICE_Y}
          w={FULL_W}
          h={DEVICE_H}
          label="Disk device"
        />

        <Note x={242} y={84} anchor="end">
          read / write request
        </Note>
        <Note x={398} y={84} anchor="start">
          voucher
        </Note>

        <Note x={MID} y={172}>
          enqueue
        </Note>
        <Note x={MID} y={186}>
          descriptor + voucher
        </Note>

        <Note x={MID} y={276}>
          dequeue
        </Note>

        <Note x={MID} y={368}>
          sector read / write
        </Note>
        <Note x={MID} y={382}>
          status
        </Note>

        <Note x={48} y={190} rotate>
          result via voucher
        </Note>
        <Note x={592} y={190} rotate>
          result via voucher
        </Note>
      </svg>
    </div>
  );
}
