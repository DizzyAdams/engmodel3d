export function AppShell({ title, eyebrow, subtitle, children }) {
    return (<main className="app-shell">
      <div className="app-shell__backdrop" aria-hidden="true"/>
      <header className="app-shell__topbar">
        <div className="brand">
          <div className="brand__eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="topbar-actions">
          <a className="topbar-chip" href="/">
            Dashboard
          </a>
          <a className="topbar-chip" href="/roadmap">
            MVP roadmap
          </a>
          <span className="topbar-chip topbar-chip--accent">Human review enabled</span>
        </div>
      </header>

      {children}
    </main>);
}
