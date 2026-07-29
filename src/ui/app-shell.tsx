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
      <header className="app-shell__topbar" role="banner">
        <div className="brand">
          <div className="brand__eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="brand__signal-row">
            <span className="brand__signal">Construction generation</span>
            <span className="brand__signal">BIM/IFC delivery</span>
            <span className="brand__signal">Sales-ready tours</span>
          </div>
        </div>
        <nav className="topbar-actions" aria-label="Primary navigation">
          <a className="topbar-chip" href="/catalog">
            Model catalog
          </a>
          <a className="topbar-chip" href="/">
            Dashboard
          </a>
          <a className="topbar-chip" href="/mission-control">
            Mission control
          </a>
          <a className="topbar-chip" href="/briefs">
            Briefs salvos
          </a>
          <a className="topbar-chip" href="/#intake">
            Brief intake
          </a>
          <a className="topbar-chip" href="/#catalog">
            Commercial cockpit
          </a>
          <a className="topbar-chip" href="/projects/casa-contemporanea#project-preview">
            3D workbench
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
          <span className="topbar-chip topbar-chip--live" role="status">BIM review gate on</span>
        </nav>
      </header>

      <div className="app-shell__content" id="main-content">{children}</div>
    </main>
  );
}
