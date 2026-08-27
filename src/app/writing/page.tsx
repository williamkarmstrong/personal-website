import type { Metadata } from "next";
import Link from "next/link";
import { StatusMarker } from "@/components/StatusMarker";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { publishedPosts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Posts by William Armstrong.",
};

export default function Page() {
  const posts = publishedPosts();

  return (
    <PageShell>
      <PageHeader
        label="Section"
        title="Writing"
        descriptor="Notes on things I have built and what they turned out to cost."
      />

      {posts.length === 0 ? (
        <p className="measure text-text-secondary">Nothing published yet.</p>
      ) : (
        <ul className="grid gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="card card-interactive group block p-6 no-underline hover:-translate-y-px hover:border-border-strong hover:shadow-[var(--shadow-md)] md:p-8"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <time
                    dateTime={post.date}
                    className="font-mono text-micro text-text-faint"
                  >
                    {post.date}
                  </time>
                  {post.draft && (
                    <StatusMarker hue="rose">Draft</StatusMarker>
                  )}
                </div>

                <h2 className="mt-2 text-h3 font-medium text-text group-hover:text-accent">
                  {post.title}
                </h2>

                <p className="measure mt-2 text-text-secondary">
                  {post.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
