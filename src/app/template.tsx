/** Re-mounts on every navigation: plays the curtain + content entrance (CSS, disabled for reduced motion). */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true" />
      <div className="page-in">{children}</div>
    </>
  );
}
