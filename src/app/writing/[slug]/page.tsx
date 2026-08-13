import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { getPost, loadPostContent, publishedPosts } from "@/content/posts";

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

/** Post — F4. Prose from the adjacent MDX file, metadata from the registry. */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await loadPostContent(slug);

  return (
    <PageShell>
      <PageHeader
        label={post.draft ? "Draft" : "Post"}
        title={post.title}
        descriptor={post.summary}
        meta={[
          { label: post.draft ? "Drafted" : "Published", value: post.date },
        ]}
      />

      {/* Long-form reading sits on a card, in the serif face — design.md §3/§4.
          `prose` carries the 68ch measure, so it goes on the text and not on
          the card; combined, the card itself shrank to the measure and sat
          visibly narrower than the page header above it. */}
      <article className="card p-6 md:p-12">
        <div className="prose">
          <Content />
        </div>
      </article>
    </PageShell>
  );
}
