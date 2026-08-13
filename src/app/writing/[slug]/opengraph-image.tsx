import { getPost, publishedPosts } from "@/content/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Post";

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    label: "Post",
    title: post?.title ?? "Writing",
    descriptor: post?.summary,
  });
}
