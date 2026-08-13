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
 *   - Business Bloom placing is disputed (me.md §Conflicts #1), so no placing
 *     is claimed anywhere. The grant is a fact and may be stated.
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
  /** Uppercase mono label, datasheet-style. Keep to one or two words. */
  label: string;
  body: string[];
}

export interface Project {
  slug: string;
  /** Datasheet part number, e.g. "PRJ-01". Assigned by order. */
  title: string;
  oneLiner: string;
  status: ProjectStatus;
  period: string;
  stack: string[];
  /** Stated plainly. Overclaiming a team project is the fastest way to lose trust. */
  role: string;
  links: ProjectLink[];
  sections: ProjectSection[];
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
    role: "Sole software engineer on a four-person team. Designed the system architecture and wrote most of the implementation; my teammates covered the economics and financial analysis.",
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
          "Transcript-only analysis discards signal. The linguistic tone of an earnings call has been shown to predict abnormal returns and post-earnings announcement drift, and none of that survives being reduced to text.",
          "Language is easy to optimise. Tone is not. Management can rehearse the words; the delivery is harder to control.",
        ],
      },
      {
        label: "Approach",
        body: [
          "The system runs FinBERT sentiment analysis over the transcript, then layers vocal stress features extracted with Wav2Vec2 and Librosa over the same timeline, producing a management confidence score.",
          "The output of interest is the divergence between the two: where the words and the delivery disagree. On top of that the tool tracks narrative shifts across quarters and compares a company against its peers.",
        ],
      },
      {
        label: "Result",
        body: [
          "Tone-to-text divergence scores correlated with cumulative abnormal returns across the companies tested.",
          "Third in the UK in the CFA Institute AI Investment Challenge, against 28 university teams. The work was published by the CFA Society.",
        ],
      },
    ],
  },

  {
    slug: "neurish",
    title: "Neurish",
    oneLiner:
      "A social platform for neurodivergent users, built with a real client and handed over for release.",
    status: "Handed over",
    period: "2025–2026",
    stack: ["Capacitor", "React", "TypeScript", "Supabase", "MongoDB"],
    role: "Team lead. Owned architectural decisions and worked directly with the client, driving iteration from user flows and design through to shipped functionality.",
    links: [],
    sections: [
      {
        label: "Brief",
        body: [
          "A mobile social platform designed for neurodivergent users, where accessibility, privacy, and inclusive interaction patterns were requirements rather than refinements.",
          "This was a real client engagement rather than a university exercise. Part of the work was translating what the client described into features an engineering team could build and argue about.",
        ],
      },
      {
        label: "Role",
        body: [
          "I led the team: architecture, technical direction, and keeping delivery moving against a fixed academic deadline. Delivered as a Level 3 Team Project and graded A4.",
        ],
      },
      {
        label: "Status",
        body: [
          "The application was handed over to the client on completion, and the rights went with it. There is no public repository and no source to show. A store release may follow, at the client's discretion.",
        ],
      },
    ],
    pendingAssets:
      "Screenshots and team photos exist but have not been added to the repository yet.",
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
    role: "Individual work.",
    links: [],
    sections: [
      {
        label: "Multithreaded strace analyser",
        body: [
          "A sequential syscall-log parser, rebuilt as a concurrent pipeline. A producer thread streams trace lines into a bounded work queue backed by a condition variable; each worker holds a thread-local statistics map, merged once at join rather than contended on throughout.",
          "The interesting part was not making it concurrent but finding where concurrency stops paying. Benchmarking sequential against multithreaded runs across increasing thread counts locates the point where speed-up flattens against parsing cost and queue synchronisation overhead — past which more threads buy nothing.",
        ],
      },
      {
        label: "Concurrent disk device driver",
        body: [
          "Application threads synchronised against a disk device through two bounded producer-consumer queues, drained by dedicated read and write worker threads, with voucher-based asynchronous completion so callers are not blocked waiting on the device.",
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
    slug: "ugracing-path-planning",
    title: "Autonomous Racing Line",
    oneLiner:
      "Path planning for a driverless Formula Student car, generating a racing line from detected track cones.",
    status: "Archived",
    period: "Sep 2024 – Sep 2025",
    stack: ["Python", "ROS2", "Real-time perception", "Odometry"],
    role: "Software engineer on the path planning team, within the UGRacing Formula Student team.",
    links: [],
    sections: [
      {
        label: "Problem",
        body: [
          "An autonomous race car competing at Silverstone has to find its own way around a circuit it has never seen, marked only by cones, while moving.",
        ],
      },
      {
        label: "Approach",
        body: [
          "The racing line is generated from the midpoints of a Delaunay triangulation over detected cone positions — the triangulation gives a principled way to find the drivable corridor between left and right cone sets without hand-tuned heuristics.",
          "I owned normalisation and persistence of the completed line as a global racing line. After the first exploratory lap the car reuses the stored path rather than re-planning from perception on every subsequent lap, which removes per-lap perception noise from the control loop.",
        ],
      },
      {
        label: "Constraints",
        body: [
          "Everything ran against real-time perception and odometry data inside a live control loop, so update rate and stability mattered as much as correctness. A planner that produces a better line too slowly is not a better planner.",
        ],
      },
    ],
  },

  {
    slug: "portfolio-tracker",
    title: "Portfolio Tracker",
    oneLiner:
      "A full-stack asset management application tracking equities, funds, and cryptocurrency against live market data.",
    status: "Archived",
    period: "2024",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Chart.js"],
    role: "Solo, self-directed.",
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
          "A portfolio tracker covering equities, funds, and cryptocurrency, ingesting market data over REST and charting positions over time.",
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
    role: "Founder.",
    links: [],
    sections: [
      {
        label: "What it was",
        body: [
          "A phone repair and refurbishment business, funded by a £600 startup loan through the Peter Jones Tycoon Enterprise Competition. I repaid the loan and ran it at a profit.",
          "It is the odd one out on this page — not software. It is here because it is the earliest evidence of the same instinct: take something apart, work out why it is broken, and ship the fix to someone who is waiting on it.",
        ],
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
