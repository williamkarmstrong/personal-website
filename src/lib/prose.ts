/**
 * Joins a paragraph written across several source lines into the single string
 * the page renders.
 *
 * Content is prose, and prose in a data module was being written one paragraph
 * to a line — several of them past 300 characters, one past 600. Those lines
 * are unreviewable in a diff and unamendable without horizontal scrolling, so a
 * paragraph now wraps to the same width as the code around it and the line
 * breaks mean nothing:
 *
 *     body: [
 *       prose`
 *         Application threads synchronised against a disk device through two
 *         bounded producer-consumer queues, drained by dedicated read and
 *         write worker threads.
 *       `,
 *     ],
 *
 * Every run of whitespace — the newline and the indentation that follows it
 * included — collapses to one space, and the ends are trimmed. There is
 * therefore no way to write a line break or a double space here. Neither is
 * wanted: a paragraph break is a new entry in the array, and the typographic
 * marks the copy does use (— and —) are written literally.
 *
 * The interpolation is typed to `string` deliberately. Anything else would let
 * `undefined` or an object reach the page as text.
 */
export function prose(
  parts: TemplateStringsArray,
  ...values: string[]
): string {
  return parts
    .reduce((out, part, i) => out + (i === 0 ? "" : values[i - 1]) + part, "")
    .replace(/\s+/g, " ")
    .trim();
}
