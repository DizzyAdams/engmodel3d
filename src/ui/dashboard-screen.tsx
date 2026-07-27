type DashboardData = {
  stats: Array<{ label: string; value: string }>;
  kpis: Array<{ label: string; value: string; delta: string }>;
  calculations: Array<{ label: string; formula: string; result: string }>;
  engineeringSnapshot: Array<{ label: string; value: string }>;
  governance: Array<{ label: string; value: string; detail: string }>;
  exports: Array<{ format: string; filename: string; mimeType: string }>;
  capabilities: Array<{ name: string; status: string; detail: string }>;
  roadmap: Array<{ phase: string; title: string; detail: string }>;
  comparisonTheme: Array<{ label: string; value: string; detail: string }>;
  projects: Array<{
    id: string;
    name: string;
    category: string;
    summary: string;
    status: string;
    dimensions: string;
  }>;
};

type DashboardScreenProps = {
  data: DashboardData;
};

export function DashboardScreen({ data }: DashboardScreenProps) {
  return (
    <div className="dashboard-stack">
      <section className="panel panel--hero panel--feature">
        <div className="hero-copy">
          <p className="section-label">Workspace overview · v1.2</p>
          <h2>Brief, generate, validate, review, export.</h2>
          <p className="section-subtitle">
            The first version of the product should feel like an engineering cockpit: clear project state,
            fast model inspection, and visible agent coordination.
          </p>
          <div className="presentation-strip">
            <div className="presentation-strip__card">
              <span>Investor story</span>
              <strong>AI + CAD + validation in one traceable workflow</strong>
            </div>
            <div className="presentation-strip__card">
              <span>MVP target</span>
              <strong>3 hours to a polished, enterprise-ready cockpit baseline</strong>
            </div>
            <div className="presentation-strip__card">
              <span>Release posture</span>
              <strong>Human reviewed, export aware, version controlled</strong>
            </div>
          </div>
          <div className="hero-actions">
            <a className="button button--primary" href="/projects/cantilever-bracket">
              Open example project
            </a>
            <a className="button button--ghost" href="#projects">
              Browse projects
            </a>
          </div>
        </div>

        <div className="metric-row">
          {data.stats.map((stat) => (
            <div className="metric-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel panel--stacked">
          <div className="panel__header">
            <div>
              <p className="section-label">Pipeline</p>
              <h3>Current flow</h3>
            </div>
            <div className="status-pill">Realtime orchestration</div>
          </div>
          <div className="pipeline-rail">
            <div className="project-row">
              <div className="project-row__title">
                <strong>Brief intake</strong>
                <span>Natural language, templates, or controlled uploads.</span>
              </div>
              <div className="project-row__detail">Step 01</div>
            </div>
            <div className="project-row">
              <div className="project-row__title">
                <strong>Parametric generation</strong>
                <span>Structured output before any downstream export.</span>
              </div>
              <div className="project-row__detail">Step 02</div>
            </div>
            <div className="project-row">
              <div className="project-row__title">
                <strong>Validation & review</strong>
                <span>Geometry checks, constraint gates, and visual QA review.</span>
              </div>
              <div className="project-row__detail">Step 03</div>
            </div>
          </div>
        </section>

        <section className="panel panel--stacked" id="projects">
          <div className="panel__header">
            <div>
              <p className="section-label">Projects</p>
              <h3>Live workspaces</h3>
            </div>
            <div className="status-pill status-pill--muted">{data.projects.length} active</div>
          </div>
          <div className="project-list">
            {data.projects.map((project) => (
              <a className="project-row" href={`/projects/${project.id}`} key={project.id}>
                <div className="project-row__title">
                  <strong>{project.name}</strong>
                  <span>
                    {project.category} · {project.dimensions}
                  </span>
                  <span>{project.summary}</span>
                </div>
                <div className="status-pill">{project.status}</div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="panel panel--wide panel--stacked">
        <div className="panel__header">
          <div>
            <p className="section-label">Engineering KPIs</p>
            <h3>Portfolio health</h3>
          </div>
          <div className="status-pill status-pill--soft">Live metrics</div>
        </div>
        <div className="metric-row">
          {data.kpis.map((kpi) => (
            <div className="metric-card" key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.delta}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Engineering calculations</p>
            <h3>Derived values and assumptions</h3>
          </div>
          <div className="status-pill status-pill--soft">Calculation layer</div>
        </div>
        <div className="calc-grid">
          {data.calculations.map((item) => (
            <article className="intent-card" key={item.label}>
              <strong>{item.label}</strong>
              <p>{item.formula}</p>
              <div className="calc-result">{item.result}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Platform snapshot</p>
            <h3>System-level indicators</h3>
          </div>
          <div className="status-pill">Engineering ops</div>
        </div>
        <div className="snapshot-grid">
          {data.engineeringSnapshot.map((item) => (
            <article className="snapshot-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Governance</p>
            <h3>Policy, retention, and release gates</h3>
          </div>
          <div className="status-pill status-pill--soft">Enterprise controls</div>
        </div>
        <div className="feature-grid">
          {data.governance.map((item) => (
            <article className="feature-card" key={item.label}>
              <div className="feature-card__top">
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Export catalog</p>
            <h3>Supported delivery targets</h3>
          </div>
          <div className="status-pill status-pill--soft">Normalized artifacts</div>
        </div>
        <div className="comparison-grid">
          {data.exports.map((target) => (
            <article className="comparison-card" key={target.format}>
              <span>{target.format}</span>
              <strong>{target.filename}</strong>
              <p>{target.mimeType}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">3D and engineering features</p>
            <h3>What the platform already knows how to do</h3>
          </div>
          <div className="status-pill status-pill--soft">Core feature set</div>
        </div>
        <div className="feature-grid">
          {data.capabilities.map((feature) => (
            <article className="feature-card" key={feature.name}>
              <div className="feature-card__top">
                <strong>{feature.name}</strong>
                <span>{feature.status}</span>
              </div>
              <p>{feature.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">MVP roadmap</p>
            <h3>Execution plan for the next 3 hours</h3>
          </div>
          <a className="status-pill" href="/roadmap">
            Open full roadmap
          </a>
        </div>
        <div className="roadmap-grid">
          {data.roadmap.map((item) => (
            <article className="roadmap-card" key={item.phase}>
              <span>{item.phase}</span>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Revision strategy</p>
            <h3>How the platform handles version comparison</h3>
          </div>
          <div className="status-pill status-pill--soft">Revision aware</div>
        </div>
        <div className="comparison-grid">
          {data.comparisonTheme.map((item) => (
            <article className="comparison-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
