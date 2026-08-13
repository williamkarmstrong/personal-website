import { site } from "@/content/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${site.name} — projects and writing`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    label: "Document",
    title: site.name,
    descriptor: site.descriptor,
  });
}
