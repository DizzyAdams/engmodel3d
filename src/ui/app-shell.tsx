type AppShellProps = {
  title: string;
  eyebrow: string;
  subtitle: string;
  children: any;
};

export function AppShell({ title, eyebrow, subtitle, children }: AppShellProps) {
  return (
    <main className="app-shell">
      <div className="app-shell__field" aria-hidden="true">
        <div className="app-shell__nebula app-shell__nebula--a" />
        <div className="app-shell__nebula app-shell__nebula--b" />
        <div className="app-shell__orb app-shell__orb--a" />
        <div className="app-shell__orb app-shell__orb--b" />
        <div className="app-shell__scanlines" />
      </div>
      <div className="app-shell__backdrop" aria-hidden="true" />
      <header className="app-shell__topbar">
        <div className="brand">
          <div className="brand__eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="brand__signal-row">
            <span className="brand__signal">14-agent surreal swarm</span>
            <span className="brand__signal">Governed export theater</span>
            <span className="brand__signal">Human review hard gate</span>
          </div>
        </div>
        <div className="topbar-actions">
          <a className="topbar-chip" href="/">
            Dashboard
          </a>
          <a className="topbar-chip" href="/mission-control">
            Mission control
          </a>
          <a className="topbar-chip" href="/#intake">
            Brief intake
          </a>
          <a className="topbar-chip" href="/projects/cantilever-bracket#project-preview">
            Live workbench
          </a>
          <a className="topbar-chip" href="/solutions">
            Solutions
          </a>
          <a className="topbar-chip" href="/workflow">
            Workflow
          </a>
          <a className="topbar-chip" href="/packages">
            Packages
          </a>
          <a className="topbar-chip" href="/roadmap">
            MVP roadmap
          </a>
          <a className="topbar-chip topbar-chip--accent" href="/#pilot">
            Request pilot
          </a>
          <span className="topbar-chip topbar-chip--live">Human review enabled</span>
        </div>
      </header>

      <div className="app-shell__content">{children}</div>
    </main>
  );
}
