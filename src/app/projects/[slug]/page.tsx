import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Chip } from "@/components/Chip";
import { Figure, PendingFigure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import {
  getProject,
  hueForStack,
  partNumber,
  projects,
  statusHue,
} from "@/content/projects";

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
          {
            label: "Status",
            value: (
              <Chip hue={statusHue[project.status]} dot>
                {project.status}
              </Chip>
            ),
          },
          { label: "Period", value: project.period },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
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

          {/* Capped at 30rem and centred at natural ratio, never cropped: a
              cropped photograph stops proving what its caption claims. `sizes`
              tracks the capped width so the optimiser is not asked for a
              full-width file. */}
          {project.figures?.map((figure, i) => (
            <Figure key={figure.src} number={i + 1} caption={figure.caption}>
              <Image
                src={figure.src}
                alt={figure.alt}
                width={figure.width}
                height={figure.height}
                sizes="(min-width: 1024px) 40rem, (min-width: 768px) 90vw, 100vw"
                className="mx-auto h-auto max-h-[30rem] w-auto"
              />
            </Figure>
          ))}

          {project.pendingAssets && (
            <PendingFigure note={project.pendingAssets} />
          )}
        </article>

        <aside className="card p-6 lg:sticky lg:top-20">
          <h2 className="label">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item}>
                <Chip hue={hueForStack(item)}>{item}</Chip>
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
