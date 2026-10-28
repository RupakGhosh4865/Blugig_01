/**
 * Page enter transition (opacity 0 → 1, y 16 → 0, 0.5s). Pure CSS so the
 * server-rendered hero is never held at opacity 0 waiting for JavaScript.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
