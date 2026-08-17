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

      {/* `prose` carries the 68ch measure, so it goes on the inner div and not
          on the card — on the card, the card itself shrinks to the measure and
          sits visibly narrower than the page header above it. */}
      <article className="card p-6 md:p-12">
        <div className="prose">
          <Content />
        </div>
      </article>
    </PageShell>
  );
}
