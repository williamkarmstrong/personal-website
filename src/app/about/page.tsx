import type { Metadata } from "next";
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
  "Business Bloom Programme — £1,000 grant",
];

/**
 * About — F5.
 *
 * Publication constraints enforced here (spec.md §5, me.md §Off-limits):
 *   - The J.P. Morgan internship is named. No project, no system, no metrics.
 *   - No placing is claimed for Business Bloom; the grant is stated, since it
 *     is not in dispute (me.md §Conflicts #1).
 *   - No contact email until spec.md Q8 is resolved.
 *   - No weak grades.
 *   - The skills table carries no proficiency rating (design.md §5).
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
          <div className="card mt-4 p-6 md:p-10">
            <p className="prose measure">
              I am in my final year of a BEng in Electronics and Software
              Engineering at the University of Glasgow, on track for first class
              honours. The degree sits deliberately across the hardware and
              software boundary, and most of what interests me is how those
              layers behave where they meet — real-time constraints,
              concurrency, and the point where an abstraction stops being free.
            </p>
            <p className="prose measure mt-6">
              The work I care about tends to be the work that shipped. A phone
              repair business at 17 that had to turn a profit. A racing line
              that had to hold up in a live control loop. An earnings-call model
              that had to survive being judged against 28 other teams. Things
              with a consequence attached behave differently from things
              without one.
            </p>
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
          <h2 className="label">Education</h2>
          <div className="card mt-4 p-6 md:p-10">
            <p className="prose measure">
              BEng Electronics &amp; Software Engineering, University of
              Glasgow, 2023–2027. On track for first class honours, and on the
              Engineering Excellence List in every year of the degree so far.
            </p>
          </div>
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
