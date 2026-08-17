import type { Metadata } from "next";
import Link from "next/link";
import { Chip } from "@/components/Chip";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import {
  hueForStack,
  partNumber,
  projects,
  statusHue,
} from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects by William Armstrong, ordered by significance.",
};

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        label="Section"
        title="Projects"
        descriptor="Ordered by significance rather than date."
      />

      <ul className="grid gap-4">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="card card-interactive group block p-6 no-underline hover:-translate-y-px hover:border-border-strong hover:shadow-[var(--shadow-md)] md:p-8"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-micro text-accent">
                  {partNumber(i)}
                </span>
                <h2 className="text-h3 font-medium text-text group-hover:text-accent">
                  {project.title}
                </h2>
                <Chip hue={statusHue[project.status]} dot>
                  {project.status}
                </Chip>
              </div>

              <p className="measure mt-3 text-text-secondary">
                {project.oneLiner}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item}>
                    <Chip hue={hueForStack(item)}>{item}</Chip>
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
