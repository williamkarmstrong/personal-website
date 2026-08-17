import type { ComponentType } from "react";

/**
 * Registering posts explicitly rather than globbing keeps the index
 * type-checked and makes an unpublished draft impossible to leak by accident.
 */
export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  /** ISO date. URLs never change once published. */
  date: string;
  draft?: boolean;
}

export const posts: PostMeta[] = [
  {
    slug: "pipeline-check",
    title: "Pipeline check",
    summary:
      "Scaffold post used to exercise the MDX rendering path. Not published.",
    date: "2026-08-12",
    draft: true,
  },
];

const loaders: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "pipeline-check": () => import("./posts/pipeline-check.mdx"),
};

/** Drafts render in development only; they do not exist in a production build. */
export function publishedPosts(): PostMeta[] {
  const visible =
    process.env.NODE_ENV === "development"
      ? posts
      : posts.filter((p) => !p.draft);

  return [...visible].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): PostMeta | undefined {
  return publishedPosts().find((p) => p.slug === slug);
}

export function loadPostContent(slug: string) {
  const loader = loaders[slug];
  if (!loader) throw new Error(`No MDX content registered for post "${slug}"`);
  return loader();
}
