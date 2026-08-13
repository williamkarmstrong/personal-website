/**
 * Explicit `*.mdx` module declaration.
 *
 * @types/mdx ships an equivalent ambient declaration, but relying on automatic
 * @types inclusion left the import in src/content/posts.ts unresolved. Declaring
 * it here keeps the build deterministic.
 */
declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
