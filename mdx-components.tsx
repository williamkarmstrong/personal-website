import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx at the project root. Element styling lives in the
 * `.prose-datasheet` block in globals.css so that design.md stays the single
 * authority on type — overriding components here would create a second one.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
