import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { partNumber, projects } from "@/content/projects";
import { publishedPosts } from "@/content/posts";
import { site } from "@/content/site";

/** Landing — F2. A short introduction and a way in, not an About page. */
export default function Page() {
  const recentProjects = projects.slice(0, 3);
  const recentPosts = publishedPosts().slice(0, 3);

  return (
    <PageShell>
      <PageHeader
        title={site.name}
        descriptor={site.descriptor}
        meta={[{ label: "Based in", value: site.location }]}
      />

      <section className="mt-8" aria-labelledby="selected-work">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="selected-work" className="label">
            Selected work
          </h2>
          <Link href="/projects" className="text-small no-underline">
            All projects →
          </Link>
        </div>

        <ul className="mt-4 grid gap-4">
          {recentProjects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="card card-interactive group block p-6 no-underline hover:-translate-y-px hover:border-border-strong hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-micro text-text-faint">
                    {partNumber(i)}
                  </span>
                  <h3 className="text-h3 font-medium text-text group-hover:text-accent">
                    {project.title}
                  </h3>
                </div>
                <p className="measure mt-2 text-text-secondary">
                  {project.oneLiner}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="recent-writing">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="recent-writing" className="label">
            Writing
          </h2>
          {recentPosts.length > 0 && (
            <Link href="/writing" className="text-small no-underline">
              All posts →
            </Link>
          )}
        </div>

        {recentPosts.length === 0 ? (
          <p className="measure mt-4 text-text-secondary">
            Nothing published yet.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="card card-interactive group block p-6 no-underline hover:-translate-y-px hover:border-border-strong hover:shadow-[var(--shadow-md)]"
                >
                  <time
                    dateTime={post.date}
                    className="font-mono text-micro text-text-faint"
                  >
                    {post.date}
                  </time>
                  <h3 className="mt-1 text-h3 font-medium text-text group-hover:text-accent">
                    {post.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
