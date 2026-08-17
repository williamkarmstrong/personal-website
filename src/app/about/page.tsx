import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { SkillsTable } from "@/components/SkillsTable";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.descriptor,
};

const experience = [
  {
    role: "Software Engineering Intern",
    org: "J.P. Morgan Chase",
    period: "Summer 2026",
    place: "Glasgow",
  },
  {
    role: "Software Engineer, Path Planning",
    org: "UGRacing Formula Student",
    period: "Sep 2024 – Sep 2025",
    place: "Glasgow",
  },
  {
    role: "Founder",
    org: "UpFix",
    period: "Feb 2021 – Mar 2022",
    place: "Crieff",
  },
];

const competitions = [
  "CFA Institute AI Investment Challenge — 3rd in the UK, 28 teams",
  "J.P. Morgan Sprint Code for Good Hackathon — winner",
  "University of Glasgow guitarguitar Hackathon — 3rd place",
];

/**
 * Publication constraints enforced here (spec.md §5, me.md §Off-limits):
 *   - The J.P. Morgan internship is named. No project, no system, no metrics.
 *   - Business Bloom is absent entirely (cut 2026-08-17, spec.md §5 Excluded).
 *     Its placing is disputed in me.md §Conflicts #1, so it cannot be stated
 *     fully; reinstating it needs the conflict settled and a spec change.
 *   - No contact email until spec.md Q8 is resolved.
 *   - No weak grades.
 *   - The skills table carries no proficiency rating.
 */
export default function Page() {
  return (
    <PageShell>
      <PageHeader
        label="Section"
        title="About"
        descriptor={site.descriptor}
        meta={[{ label: "Based in", value: site.location }]}
      />

      <div className="grid gap-12">
        <section>
          <h2 className="label">Background</h2>
          {/* Not a figure: no number, no caption, and per spec.md §5 the alt
              text describes the room, not the work. Height is never forced to
              match the prose — object-cover would crop a wide group shot into a
              banner, which design.md §5 forbids for this photograph.

              The prose column drops `measure`: inside a sized grid track the
              68ch cap is unreachable anyway, and leaving it on made the text
              column refuse to fill its share of the row. */}
          <div className="card mt-4 grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-10">
            <div>
              <p className="prose">
                I am a final-year Electronics and Software Engineering student
                at the University of Glasgow, and spent the summer of 2026 as a
                software engineering intern at J.P. Morgan. My degree sits
                deliberately at the hardware and software boundary, covering
                systems programming, real-time computer systems, operating
                systems and networked systems, with a focus on C++ and Python.
              </p>
              <p className="prose mt-6">
                I am particularly interested in how these layers interact to
                build systems that are efficient, low-latency and reliable,
                where performance is a fundamental design constraint. Outside
                coursework that has meant a portfolio tracker and EarningsIQ.
              </p>
            </div>

            <Image
              src="/workpic.jpg"
              alt="A group of people seated around a table in a modern open-plan office."
              width={2000}
              height={1333}
              sizes="(min-width: 1024px) 26rem, 92vw"
              priority
              className="h-auto w-full rounded-[var(--radius-lg)] border border-border"
            />
          </div>
        </section>

        <section>
          <h2 className="label">Experience</h2>
          <ul className="mt-4 grid gap-3">
            {experience.map((job) => (
              <li
                key={`${job.org}-${job.period}`}
                className="card flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 p-5"
              >
                <div>
                  <p className="font-medium text-text">{job.role}</p>
                  <p className="text-small text-text-secondary">{job.org}</p>
                </div>
                <p className="font-mono text-micro text-text-faint">
                  {job.period} · {job.place}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="label">Skills</h2>
          <SkillsTable />
        </section>

        <section>
          <h2 className="label">Competitions</h2>
          <ul className="mt-4 grid gap-3">
            {competitions.map((item) => (
              <li key={item} className="card p-5 text-small">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
