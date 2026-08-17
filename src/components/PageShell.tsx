export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-column px-4 py-12 md:px-6 md:py-20">
      {children}
    </main>
  );
}
