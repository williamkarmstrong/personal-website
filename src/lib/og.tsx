import { ImageResponse } from "next/og";

/**
 * Shared Open Graph image renderer — F10.
 *
 * These are what a link looks like when it is pasted into Slack, which is the
 * stated reason the writing section exists. Colours are the design.md §2 paper
 * palette, hardcoded here because ImageResponse renders outside the document
 * and cannot read CSS custom properties.
 *
 * Typography note: this renders in ImageResponse's default sans rather than
 * JetBrains Mono. Matching the site exactly needs a font binary passed to
 * `fonts`, which would mean either a new dependency (@fontsource/jetbrains-mono)
 * or fetching from Google at build time — the latter makes builds fail offline.
 * Deliberately deferred; see spec.md Q23.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#FAFAFA";
const TEXT = "#18181B";
const TEXT_SECONDARY = "#52525B";
const BORDER = "#D4D4D8";
const GRID_LINE = "#ECECEE";

export function renderOgImage({
  label,
  title,
  descriptor,
}: {
  label: string;
  title: string;
  descriptor?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          backgroundImage: `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: TEXT_SECONDARY,
            }}
          >
            {label}
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 76,
              lineHeight: 1.1,
              color: TEXT,
            }}
          >
            {title}
          </div>

          {descriptor && (
            <div
              style={{
                marginTop: 24,
                fontSize: 30,
                lineHeight: 1.4,
                color: TEXT_SECONDARY,
                // Long summaries must not push the footer off the canvas
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {descriptor}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 24,
            fontSize: 24,
            color: TEXT_SECONDARY,
          }}
        >
          <span>William Armstrong</span>
          <span>Glasgow, Scotland</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
