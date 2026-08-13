/**
 * Page container — design.md §4.
 *
 * Provides the content column and page gutters. Unlike v1's `Sheet`, this does
 * not wrap everything in a single surface: page headers sit on the background,
 * and content blocks opt into `card` individually.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-column px-4 py-12 md:px-6 md:py-20">
      {children}
    </main>
  );
}
