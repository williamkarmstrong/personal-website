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

export type ProjectStatus =
  | "Shipped"
  | "Deployed"
  | "Handed over"
  | "Archived"
  | "Coursework";

export interface ProjectLink {
  href: string;
  label: string;
}

export interface ProjectSection {
  /** Rendered as a section label. Keep to one or two words. */
  label: string;
  body: string[];
}

export interface ProjectFigure {
  src: string;
  /**
   * Required, and may not claim more than the picture proves — a bench
   * photograph evidences a bench, not a successful measurement (spec.md §5).
   */
  caption: string;
  alt: string;
  /** Intrinsic pixel size. next/image needs it to reserve space before load. */
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  status: ProjectStatus;
  period: string;
  stack: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
  /** Numbered sequentially in array order. */
  figures?: ProjectFigure[];
  /** Set when assets are known to be missing, so the page can say so honestly. */
  pendingAssets?: string;
}

export const projects: Project[] = [
  {
    slug: "earningsiq",
    title: "EarningsIQ",
    oneLiner:
      "Multimodal earnings call analysis — layering vocal stress features over transcript sentiment.",
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
          "I built this model on the premise that transcript-only analysis discards signal. The linguistic tone of an earnings call has been shown to predict abnormal returns and post-earnings announcement drift, and none of that survives being reduced to text.",
          "Language is easy to optimise. Tone is not. Management can rehearse the words; the delivery is harder to control.",
        ],
      },
      {
        label: "Approach",
        body: [
          "The system layers FinBERT sentiment over vocal stress features extracted with Wav2Vec2 and Librosa, scoring management confidence against the same timeline as the transcript.",
          "What it produces is a tone-to-text divergence score: the places where the words and the delivery disagree. Alongside that it tracks narrative shifts across quarters and compares a company against its peers.",
        ],
      },
      {
        label: "Role",
        body: [
          "I was the sole software engineer on a four-person team. I designed the system architecture and wrote most of the implementation; my teammates covered the economics and financial analysis.",
        ],
      },
      {
        label: "Result",
        body: [
          "The divergence scores correlated with cumulative abnormal returns across the companies tested, and the tool was deployed as a live application.",
          "Presented nationally against 28 university teams: 3rd in the UK in the CFA Institute AI Investment Challenge, with the work published by the CFA Society.",
        ],
      },
    ],
    figures: [
      {
        src: "/earningsiq.jpg",
        alt: "A laptop displaying the EarningsIQ dashboard for Google's Q1 2024 earnings call, showing key takeaways and summary metrics.",
        caption:
          "The deployed tool analysing Alphabet's Q1 2024 call — sentiment, tone-to-text divergence, and Q&A stress side by side.",
        width: 1500,
        height: 2000,
      },
    ],
  },

  {
    slug: "neurish",
    title: "Neurish",
    oneLiner:
      "A full-stack mobile social platform for neurodivergent users, built with a real client and handed over for release.",
    status: "Handed over",
    period: "2025–2026",
    stack: ["Capacitor", "React", "TypeScript", "Supabase", "MongoDB"],
    links: [],
    sections: [
      {
        label: "Brief",
        body: [
          "A neurodivergent-focused social platform, where accessibility, privacy, and inclusive interaction patterns were requirements rather than refinements.",
          "I worked directly with a client to translate user requirements into features, driving iteration from user flows and design through to shipped functionality. That is the part a university exercise does not teach: the client describes an outcome, and someone has to turn it into something an engineering team can build and argue about.",
        ],
      },
      {
        label: "Role",
        body: [
          "I led the team building Neurish, owning the architectural decisions and keeping delivery moving against a fixed academic deadline, within a collaborative engineering team. Delivered as a Level 3 Team Project and graded A4.",
        ],
      },
      {
        label: "Status",
        body: [
          "The application was handed over successfully on completion, to be released on the app store, and the rights went with it. There is no public repository and no source to show.",
        ],
      },
    ],
    figures: [
      {
        src: "/neurish.jpg",
        alt: "Three team members standing in front of a large screen showing the application running in an iOS simulator.",
        caption:
          "The team at handover, with the app running in the iOS simulator behind them.",
        width: 1124,
        height: 2000,
      },
    ],
    pendingAssets:
      "Interface screenshots. The rights sit with the client, so what can be shown here is limited to the team's own record of the work.",
  },

  {
    slug: "concurrent-systems",
    title: "Concurrent Systems",
    oneLiner:
      "A syscall-log parser rebuilt as a concurrent pipeline, and a disk device driver synchronised through bounded queues.",
    status: "Coursework",
    period: "2025–2026",
    stack: [
      "C++17",
      "C",
      "POSIX threads",
      "Mutexes",
      "Condition variables",
    ],
    links: [],
    sections: [
      {
        label: "Multithreaded strace analyser",
        body: [
          "I rebuilt a sequential syscall-log parser as a concurrent pipeline, using a producer thread streaming trace lines into a bounded, condition-variable-backed work queue. Each worker was given a thread-local statistics map, merged once at join rather than contended on throughout.",
          "The interesting part was not making it concurrent but finding where concurrency stops paying. Benchmarking sequential against multithreaded runs across increasing thread counts locates where speed-up flattens against parsing and queue-synchronisation overhead — past which more threads buy nothing.",
        ],
      },
      {
        label: "Concurrent disk device driver",
        body: [
          "Application threads synchronised against a disk device through two bounded producer-consumer queues, drained by dedicated read and write worker threads with voucher-based asynchronous completion, so callers are not blocked waiting on the device.",
        ],
      },
      {
        label: "Note",
        body: [
          "This was assessed coursework, so no source code is published. The design and the results are discussed here instead.",
        ],
      },
    ],
    pendingAssets:
      "The speed-up-against-thread-count benchmark chart is the figure this page needs. Source data not yet located.",
  },

  {
    slug: "portfolio-tracker",
    title: "Portfolio Tracker",
    oneLiner:
      "A self-directed full-stack asset management application covering equities, funds, and cryptocurrency, built on live market data.",
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
          "A self-directed full-stack portfolio application covering stocks, funds, and cryptocurrencies, handling time-series storage and continuous position valuation, and using the Alpha Vantage API to ingest real-time market data over REST.",
          "Built unprompted, before any of the finance-adjacent competition work — it is where the interest in financial systems actually started rather than something assembled to demonstrate it.",
        ],
      },
    ],
  },

  {
    slug: "upfix",
    title: "UpFix",
    oneLiner:
      "A mobile phone repair and refurbishment business, founded at 17 and run profitably.",
    status: "Archived",
    period: "Feb 2021 – Mar 2022",
    stack: ["Hardware repair", "Refurbishment"],
    links: [],
    sections: [
      {
        label: "What it was",
        body: [
          "I founded and ran a mobile phone repair and refurbishment business at 17, funded by a £600 startup loan through the Peter Jones Tycoon Enterprise Competition, repaying the loan and running it profitably.",
          "The work itself was diagnosing and repairing hardware and software faults, which is where the practical electronics and troubleshooting came from.",
          "It is the odd one out on this page — not software. It is here because it is the earliest evidence of the same instinct: take something apart, work out why it is broken, and ship the fix to someone who is waiting on it.",
        ],
      },
    ],
    figures: [
      {
        src: "/upfix-branding.jpg",
        alt: "A refurbished iPhone resting on a scattered pile of UpFix business cards.",
        caption: "UpFix branding and a refurbished handset, 2021.",
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
  | "blue"
  | "teal"
  | "green"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

/** Exhaustive by type: adding a ProjectStatus without a hue will not compile. */
export const statusHue: Record<ProjectStatus, Hue> = {
  Deployed: "green",
  Shipped: "blue",
  "Handed over": "violet",
  Coursework: "amber",
  Archived: "slate",
};

/**
 * Stack entry → domain hue, keyed by what the thing *is*. Unlisted entries fall
 * back to slate, which is a prompt to add a line here — not a resting state.
 */
export const stackHue: Record<string, Hue> = {
  // Languages
  Python: "blue",
  TypeScript: "blue",
  C: "blue",
  "C++17": "blue",

  // Web & app
  React: "teal",
  Capacitor: "teal",
  Streamlit: "teal",
  "Node.js": "teal",
  Express: "teal",
  EJS: "teal",
  "Chart.js": "teal",

  // Data & storage
  Supabase: "green",
  MongoDB: "green",

  // Systems & concurrency
  "POSIX threads": "amber",
  Mutexes: "amber",
  "Condition variables": "amber",

  // ML & signal
  "HuggingFace Transformers": "violet",
  FinBERT: "violet",
  Wav2Vec2: "violet",
  Librosa: "violet",

  // Hardware
  "Hardware repair": "rose",
  Refurbishment: "rose",
};

export function hueForStack(item: string): Hue {
  return stackHue[item] ?? "slate";
}
