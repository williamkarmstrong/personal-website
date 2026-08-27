/**
 * Project content. Source of truth is me.md; publication constraints are
 * spec.md §5.
 *
 * Hard rules encoded here — do not relax without a spec.md change:
 *   - No J.P. Morgan project. The internship is named on /about and nowhere
 *     else, with no technical detail.
 *   - Neurish carries no link or repo, ever. Rights are the client's.
 *   - The concurrent systems work carries no source code. Discussion,
 *     architecture, and benchmark figures only.
 *   - Business Bloom appears nowhere on the site (cut 2026-08-17, spec.md §5
 *     Excluded). Its placing is disputed in me.md §Conflicts #1.
 *
 * Ordered by significance, not date (spec.md §5).
 */

import type { BenchmarkPoint } from "@/components/BenchmarkChart";
import { prose } from "@/lib/prose";

export type ProjectStatus =
  "Shipped" | "Deployed" | "Handed over" | "Archived" | "Coursework";

export interface ProjectLink {
  href: string;
  label: string;
}

export interface ProjectSection {
  /** Rendered as a section label. Keep to one or two words. */
  label: string;
  body: string[];
}

interface FigureBase {
  src: string;
  /**
   * Required, and may not claim more than the picture proves — a bench
   * photograph evidences a bench, not a successful measurement (spec.md §5).
   * For a clip it must also hold with nothing moving, because that is what a
   * reduced-motion reader gets (design.md §5).
   */
  caption: string;
  alt: string;
  /** Intrinsic pixel size. Reserves space before load, so nothing reflows. */
  width: number;
  height: number;
}

export interface ProjectFigure extends FigureBase {
  kind: "image";
}

/**
 * A short, silent screen recording — admitted only where the evidence is an
 * interaction a still cannot carry (spec.md §5 Screen captures).
 */
export interface ProjectClip extends FigureBase {
  kind: "clip";
  /** Shown before play, and permanently under `prefers-reduced-motion`. */
  poster: string;
}

export type ProjectMedia = ProjectFigure | ProjectClip;

/**
 * A figure drawn from measured numbers rather than photographed. It has no
 * `src` and no intrinsic size — it is drawn to the column — but it takes the
 * same caption contract as any other figure: it may not claim more than the
 * measurement shows (spec.md §5).
 */
export interface ProjectChart {
  kind: "chart";
  caption: string;
  /** Read in place of the drawing, so it has to carry the values. */
  description: string;
  xTitle: string;
  yTitle: string;
  yMax: number;
  yTicks: number[];
  points: BenchmarkPoint[];
}

/**
 * An architecture drawing. The geometry lives in the component that draws it —
 * only the words a reader is owed are content.
 */
export interface ProjectDiagram {
  kind: "diagram";
  /** Selects the component. One drawing, one architecture. */
  name: "disk-driver";
  caption: string;
  /** Read in place of the drawing, so it has to carry the whole path. */
  description: string;
}

export type ProjectDrawing = ProjectChart | ProjectDiagram;

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  status: ProjectStatus;
  period: string;
  stack: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
  /** Numbered sequentially in array order, images and clips alike. */
  figures?: ProjectMedia[];
  /** Drawn, not photographed. Numbered after `figures`, in array order. */
  drawings?: ProjectDrawing[];
  /** Set when assets are known to be missing, so the page can say so honestly. */
  pendingAssets?: string;
}

export const projects: Project[] = [
  {
    slug: "earningsiq",
    title: "EarningsIQ",
    oneLiner: prose`
      Multimodal earnings call analysis — layering vocal stress features over transcript sentiment.
    `,
    status: "Deployed",
    period: "2025–2026",
    stack: [
      "Python",
      "HuggingFace Transformers",
      "FinBERT",
      "Wav2Vec2",
      "Librosa",
      "Streamlit",
    ],
    links: [
      {
        href: "https://rpc.cfainstitute.org/blogs/enterprising-investor/2026/can-ai-decode-what-management-says-in-earnings-call",
        label: "CFA Institute article",
      },
      { href: "https://earningsiq.streamlit.app", label: "Live app" },
      {
        href: "https://github.com/williamkarmstrong/earnings-iq",
        label: "Repository",
      },
    ],
    sections: [
      {
        label: "Premise",
        body: [
          prose`
            I built this model on the premise that transcript-only analysis discards signal. The
            linguistic tone of an earnings call has been shown to predict abnormal returns and
            post-earnings announcement drift, and none of that survives being reduced to text.
          `,
          prose`
            Language is easy to optimise. Tone is not. Management can rehearse the words; the
            delivery is harder to control.
          `,
        ],
      },
      {
        label: "Approach",
        body: [
          prose`
            The system layers FinBERT sentiment over vocal stress features extracted with Wav2Vec2
            and Librosa, scoring management confidence against the same timeline as the transcript.
          `,
          prose`
            What it produces is a tone-to-text divergence score: the places where the words and the
            delivery disagree. Alongside that it tracks narrative shifts across quarters and
            compares a company against its peers.
          `,
        ],
      },
      {
        label: "Role",
        body: [
          prose`
            I was the sole software engineer on a four-person team. I designed the system
            architecture and wrote most of the implementation; my teammates covered the economics
            and financial analysis.
          `,
        ],
      },
      {
        label: "Result",
        body: [
          prose`
            The divergence scores correlated with cumulative abnormal returns across the companies
            tested, and the tool was deployed as a live application.
          `,
          prose`
            Presented nationally against 28 university teams: 3rd in the UK in the CFA Institute AI
            Investment Challenge, with the work published by the CFA Society.
          `,
        ],
      },
    ],
    // The photograph first, then the three panels in the order the prose
    // argues them: the signal over time, what the two models disagree about,
    // and what that was tested against.
    figures: [
      {
        kind: "image",
        src: "/earningsiq.jpg",
        alt: prose`
          A laptop displaying the EarningsIQ dashboard for Google's Q1 2024 earnings call, showing
          key takeaways and summary metrics.
        `,
        caption: prose`
          The deployed tool analysing Alphabet's Q1 2024 call — sentiment, tone-to-text divergence,
          and Q&A stress side by side.
        `,
        width: 1500,
        height: 2000,
      },
      {
        kind: "image",
        src: "/earningsiq-intra-call.jpg",
        alt: prose`
          A line chart of sentiment between −1 and 1 across 56 minutes of call time. A shaded region
          and a labelled marker show where Q&A was detected to begin, a dashed horizontal line marks
          the Wav2Vec2 score at +0.36, and an audio player sits beneath the chart.
        `,
        caption: prose`
          Sentiment per utterance across the full call. The Q&A boundary is detected rather than
          marked by hand, and the Wav2Vec2 acoustic score runs across it as a dashed baseline.
          Clicking a point seeks the call audio to that moment, so a reading can be checked against
          what was actually said.
        `,
        width: 2000,
        height: 972,
      },
      {
        kind: "image",
        src: "/earningsiq-divergence.jpg",
        alt: prose`
          Two panels. Left: net sentiment and hedging per hundred words plotted across four quarters
          from Q1 2023 to Q1 2024, with figures of +0.436 and +0.38 beneath. Right: paired bars
          comparing FinBERT and Wav2Vec2 scores for prepared remarks and for Q&A.
        `,
        caption: prose`
          Narrative tracked across quarters, beside the divergence the tool exists to measure. In
          prepared remarks the acoustic score sits below FinBERT; in Q&A the two swap over. The gap
          between the pair, not either bar alone, is the output.
        `,
        width: 2000,
        height: 972,
      },
      {
        kind: "image",
        src: "/earningsiq-event-study.jpg",
        alt: prose`
          An event-study panel headed with a market beta of 1.09, cumulative abnormal return of
          +3.99%, t-statistic of +1.23 and model R-squared of 0.21. A bar and line chart plots daily
          and cumulative abnormal return from t−1 to t+3, beside a ranking of average absolute CAR
          by sector, from semiconductors at 10.5% down to pharmaceuticals at 2.7%.
        `,
        caption: prose`
          The CAPM event study the returns are measured against — daily abnormal return over a
          SPY-based expectation, cumulating across the t−1 to t+3 window, with average earnings
          sensitivity by sector alongside. The panel reports its own t-statistic of 1.23: one event,
          short of conventional significance, and shown rather than omitted.
        `,
        width: 2000,
        height: 1113,
      },
    ],
  },

  {
    slug: "neurish",
    title: "Neurish",
    oneLiner: prose`
      A full-stack mobile social platform for neurodivergent users, built with a real client and
      handed over for release.
    `,
    status: "Handed over",
    period: "2025–2026",
    stack: ["Capacitor", "React", "TypeScript", "Supabase", "MongoDB"],
    links: [],
    sections: [
      {
        label: "Brief",
        body: [
          prose`
            A neurodivergent-focused social platform, where accessibility, privacy, and inclusive
            interaction patterns were requirements rather than refinements.
          `,
          prose`
            I worked directly with a client to translate user requirements into features, driving
            iteration from user flows and design through to shipped functionality. That is the part
            a university exercise does not teach: the client describes an outcome, and someone has
            to turn it into something an engineering team can build and argue about.
          `,
        ],
      },
      {
        label: "Role",
        body: [
          prose`
            I led the team building Neurish, owning the architectural decisions and keeping delivery
            moving against a fixed academic deadline, within a collaborative engineering team.
            Delivered as a Level 3 Team Project and graded A4.
          `,
        ],
      },
      {
        label: "Status",
        body: [
          prose`
            The application was handed over successfully on completion, to be released on the app
            store, and the rights went with it. There is no public repository and no source to show.
          `,
        ],
      },
    ],
    // The two clips run before the handover photograph: the product first, the
    // record of shipping it second. Both are seeded demonstration content —
    // no real user appears in either (spec.md §5 Screen captures).
    figures: [
      {
        kind: "clip",
        src: "/neurish-haven.mp4",
        poster: "/neurish-haven-poster.jpg",
        alt: prose`
          The haven feed scrolling through posts in the Autism Support Network and Late-Diagnosed
          Adults groups, each with Glow and Comment actions beneath it.
        `,
        caption: prose`
          The haven feed in the iOS simulator — posts scoped to a support group, filtered by New,
          Hot, Interests or Support, and answered with Glow rather than a like. Seeded demonstration
          content.
        `,
        width: 434,
        height: 934,
      },
      {
        kind: "clip",
        src: "/neurish-connect.mp4",
        poster: "/neurish-connect-poster.jpg",
        alt: prose`
          A profile card in the connect tab being swiped right, stamped CONNECT, followed by a
          dialog confirming that both people want to connect.
        `,
        caption: prose`
          The connect flow — a profile card carries interests and a match percentage, and a
          connection is only made when both people have swiped. Seeded demonstration content.
        `,
        width: 434,
        height: 934,
      },
      {
        kind: "image",
        src: "/neurish.jpg",
        alt: prose`
          Three team members standing in front of a large screen showing the application running in
          an iOS simulator.
        `,
        caption: prose`
          The team at handover, with the app running in the iOS simulator behind them.
        `,
        width: 1124,
        height: 2000,
      },
    ],
  },

  {
    slug: "concurrent-systems",
    title: "Concurrent Systems",
    oneLiner: prose`
      A syscall-log parser rebuilt as a concurrent pipeline, and a disk device driver synchronised
      through bounded queues.
    `,
    status: "Coursework",
    period: "2025–2026",
    stack: ["C++17", "C", "POSIX threads", "Mutexes", "Condition variables"],
    links: [],
    sections: [
      {
        label: "Multithreaded strace analyser",
        body: [
          prose`
            I rebuilt a sequential syscall-log parser as a concurrent pipeline, using a producer
            thread streaming trace lines into a bounded, condition-variable-backed work queue. Each
            worker was given a thread-local statistics map, merged once at join rather than
            contended on throughout.
          `,
          prose`
            The interesting part was not making it concurrent but finding where concurrency stops
            paying. Benchmarked against one thread, two, four, and eight on the same trace, it never
            started: each added thread cost time rather than saved it. Parsing a single line is
            short enough that the queue synchronisation around it, and the merge at join, dominate
            the work being handed out.
          `,
        ],
      },
      {
        label: "Concurrent disk device driver",
        body: [
          prose`
            Application threads synchronised against a disk device through two bounded
            producer-consumer queues, drained by dedicated read and write worker threads with
            voucher-based asynchronous completion, so callers are not blocked waiting on the device.
          `,
        ],
      },
      {
        label: "Note",
        body: [
          prose`
            This was assessed coursework, so no source code is published. The design and the results
            are discussed here instead.
          `,
        ],
      },
    ],
    drawings: [
      {
        kind: "chart",
        caption: prose`
          Wall-clock time for the same trace against worker-thread count, three runs at each count
          with the medians joined. Time rises at every step — 167 ms on one thread to 489 ms on
          eight — so on this input the queue and merge overhead outweighs the parsing the extra
          threads take on.
        `,
        description: prose`
          Line chart of execution time in milliseconds against worker-thread count, on a scale from
          0 to 600 ms. Median of three runs: 167 ms on 1 thread, 284 ms on 2, 396 ms on 4, 489 ms on
          8. The three runs at each thread count fall within 15 ms of one another. Time increases at
          every step; there is no speed-up at any thread count.
        `,
        xTitle: "Worker threads",
        yTitle: "Execution time (ms)",
        yMax: 600,
        yTicks: [0, 200, 400, 600],
        points: [
          { threads: 1, runs: [165, 174, 167] },
          { threads: 2, runs: [285, 284, 271] },
          { threads: 4, runs: [396, 400, 390] },
          { threads: 8, runs: [490, 480, 489] },
        ],
      },
      {
        kind: "diagram",
        name: "disk-driver",
        caption: prose`
          The driver's shape. An application thread hands a read or a write to the driver and is
          given a voucher rather than made to wait: the request sits in one of two bounded queues
          until the worker thread that owns that direction drains it against the device, and the
          result is published on the voucher for the caller to redeem. Vouchers and sector
          descriptors come from bounded pools rather than being allocated per request. Drawn from
          the submitted collaboration diagrams, with the call sequence dropped.
        `,
        description: prose`
          Architecture diagram of the disk device driver, flowing top to bottom. Application threads
          issue a read or write request to the disk driver and receive a voucher back immediately.
          The driver enqueues the sector descriptor and voucher onto one of two bounded queues: a
          write queue and a read queue. A dedicated write worker thread and read worker thread
          dequeue from their respective queues and perform the sector read or write against the disk
          device, which returns status. Each worker publishes the result on the voucher, which
          travels back to the application threads to be redeemed. The two queues and the two worker
          threads are the concurrent parts of the design.
        `,
      },
    ],
  },

  {
    slug: "portfolio-tracker",
    title: "Portfolio Tracker",
    oneLiner: prose`
      A self-directed full-stack asset management application covering equities, funds, and
      cryptocurrency, built on live market data.
    `,
    status: "Archived",
    period: "2024",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Chart.js"],
    links: [
      {
        href: "https://github.com/williamkarmstrong/investment-tracker",
        label: "Repository",
      },
    ],
    sections: [
      {
        label: "What it is",
        body: [
          prose`
            A self-directed full-stack portfolio application covering stocks, funds, and
            cryptocurrencies, handling time-series storage and continuous position valuation, and
            using the Alpha Vantage API to ingest real-time market data over REST.
          `,
          prose`
            Built unprompted, before any of the finance-adjacent competition work — it is where the
            interest in financial systems actually started rather than something assembled to
            demonstrate it.
          `,
        ],
      },
    ],
    // Demonstration holdings, not a real position (spec.md §5 UI stills) —
    // the same rule the Neurish clips run under. Browser chrome is trimmed,
    // which is not a crop (design.md §5).
    figures: [
      {
        kind: "image",
        src: "/portfolio-tracker.jpg",
        alt: prose`
          The Portfolio Tracker interface: a table of three holdings — cash, Apple Inc, and Bitcoin
          — with quantity, price and value columns, a pie chart of their relative weights below it,
          a running total of $16,761.93, and an add-asset form alongside.
        `,
        caption: prose`
          The tracker running on 22 September 2024. Three demonstration positions revalued against
          live Alpha Vantage quotes on page load, weighted by value in the chart beneath.
        `,
        width: 2000,
        height: 996,
      },
    ],
  },

  {
    slug: "upfix",
    title: "UpFix",
    oneLiner: prose`
      A mobile phone repair and refurbishment business, founded at 17 and run profitably.
    `,
    status: "Archived",
    period: "Feb 2021 – Mar 2022",
    stack: ["Hardware repair", "Refurbishment"],
    links: [],
    sections: [
      {
        label: "What it was",
        body: [
          prose`
            I founded and ran a mobile phone repair and refurbishment business at 17, funded by a
            £600 startup loan through the Peter Jones Tycoon Enterprise Competition, repaying the
            loan and running it profitably.
          `,
          prose`
            The work itself was diagnosing and repairing hardware and software faults, which is
            where the practical electronics and troubleshooting came from.
          `,
          prose`
            It is the odd one out on this page — not software. It is here because it is the earliest
            evidence of the same instinct: take something apart, work out why it is broken, and ship
            the fix to someone who is waiting on it.
          `,
        ],
      },
    ],
    figures: [
      {
        kind: "image",
        src: "/upfix-branding.jpg",
        alt: prose`
          A refurbished iPhone resting on a scattered pile of UpFix business cards.
        `,
        caption: prose`
          UpFix branding and a refurbished handset, 2021.
        `,
        width: 1500,
        height: 2000,
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Datasheet part number, derived from significance order. */
export function partNumber(index: number): string {
  return `PRJ-${String(index + 1).padStart(2, "0")}`;
}

/**
 * Signal hues — design.md §2.3 fixes what each one means. A hue may not be
 * borrowed for a new purpose: if something needs colour and no existing meaning
 * fits, §2.3 gets a new row before any code changes.
 */
export type Hue =
  "blue" | "teal" | "green" | "amber" | "rose" | "violet" | "slate";

/** Exhaustive by type: adding a ProjectStatus without a hue will not compile. */
export const statusHue: Record<ProjectStatus, Hue> = {
  Deployed: "green",
  Shipped: "blue",
  "Handed over": "violet",
  Coursework: "amber",
  Archived: "slate",
};

/*
 * The stack-domain hue map lived here until design.md v3.3 retired it (§2.3).
 * It was a real map — language blue, web teal, data green, systems amber, ML
 * violet, hardware rose — and it was undecodable: nothing on the page told a
 * reader what violet meant, so six hues arrived on one card carrying meaning
 * only the author could read. Stack is now set as text and takes no hue.
 * `statusHue` above survives because status reads without a legend.
 */
