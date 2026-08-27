/**
 * The stack as one line of text rather than a row of chips — design.md §5
 * Stack. It wraps to a second line rather than compressing, and nothing is
 * truncated: the separators are drawn by CSS between list items, so a stack of
 * one renders without a dangling slash.
 */
export function StackList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`stack-list ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
