import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PendingFigure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { getProject, partNumber, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.oneLiner,
    openGraph: { title: project.title, description: project.oneLiner },
  };
}

/** Project detail — F3. */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);

  return (
    <PageShell>
      <PageHeader
        label={partNumber(index)}
        title={project.title}
        descriptor={project.oneLiner}
        meta={[
          { label: "Status", value: project.status },
          { label: "Period", value: project.period },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
        {/* Narrative runs long, so it sits on a card — design.md §4 */}
        <article className="card p-6 md:p-10">
          {project.sections.map((section, i) => (
            <section key={section.label} className={i === 0 ? "" : "mt-10"}>
              <h2 className="label">{section.label}</h2>
              {section.body.map((paragraph, j) => (
                <p
                  key={j}
                  className="prose measure mt-4 text-body"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {project.pendingAssets && (
            <PendingFigure note={project.pendingAssets} />
          )}
        </article>

        <aside className="card p-6 lg:sticky lg:top-20">
          <h2 className="label">Role</h2>
          <p className="mt-2 text-small text-text-secondary">{project.role}</p>

          <h2 className="label mt-8">Stack</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-sm)] bg-surface-subtle px-2 py-1 font-mono text-micro text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>

          <h2 className="label mt-8">Links</h2>
          {project.links.length === 0 ? (
            <p className="mt-2 text-small text-text-faint">
              None — see the notes.
            </p>
          ) : (
            <ul className="mt-2 grid gap-1">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-small no-underline">
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
