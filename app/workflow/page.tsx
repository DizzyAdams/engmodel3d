import { AppShell } from "../../src/ui/app-shell";
import { getDashboardData } from "../../src/server/mock-data";

export default function WorkflowPage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Workflow"
      eyebrow="Governed delivery path"
      subtitle="A clear path from buyer brief to validated export, with visible release gates, ownership, and proof at each stage."
    >
      <div className="dashboard-stack">
        <section className="panel panel--hero panel--feature">
          <div className="hero-orbit-grid">
            <div className="hero-copy">
              <p className="section-label">Delivery path</p>
              <h2>The workflow is designed to reduce rework, expose responsibility, and make release posture obvious.</h2>
              <p className="section-subtitle">
                The product is strongest when it behaves like an operating system for engineering delivery: intake,
                reference pressure, generation, validation, human review, and release all stay in one visible chain.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="/projects/casa-contemporanea#project-preview">
                  Open live cockpit
                </a>
                <a className="button button--ghost" href="/#pilot">
                  Go to pilot CTA
                </a>
              </div>
            </div>

            <div className="hero-orbit-card">
              <div className="hero-orbit-card__shell">
                <div className="hero-orbit-card__core">
                  <span>Release logic</span>
                  <strong>{data.governance[2]?.value ?? "Draft -> Validation -> Release"}</strong>
                  <p>{data.governance[2]?.detail ?? "Each project requires human signoff before export handoff."}</p>
                  <div className="hero-orbit-card__meta">
                    <div>
                      <span>Workflow stages</span>
                      <strong>{data.workflow.length}</strong>
                    </div>
                    <div>
                      <span>Parallel lanes</span>
                      <strong>{data.executionTracks.length}</strong>
                    </div>
                    <div>
                      <span>Controls</span>
                      <strong>{data.governance.length} live</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel panel--stacked panel--wide">
          <div className="panel__header">
            <div>
              <p className="section-label">Canonical flow</p>
              <h3>From qualified brief to governed export handoff</h3>
            </div>
            <div className="status-pill">{data.workflow.length} stages</div>
          </div>
          <div className="roadmap-grid">
            {data.workflow.map((step) => (
              <article className="roadmap-card" key={step.stage}>
                <span>{step.stage}</span>
                <strong>{step.title}</strong>
                <p>{step.outcome}</p>
                <small>{step.owner} · {step.signal}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--stacked panel--wide">
          <div className="panel__header">
            <div>
              <p className="section-label">Execution lanes</p>
              <h3>What runs in parallel around the core workflow</h3>
            </div>
            <div className="status-pill status-pill--soft">Realtime</div>
          </div>
          <div className="feature-grid">
            {data.executionTracks.map((track) => (
              <article className="feature-card" key={track.lane}>
                <div className="feature-card__top">
                  <strong>{track.title}</strong>
                  <span>{track.status}</span>
                </div>
                <p>{track.detail}</p>
                <small>{track.owner}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--stacked panel--wide">
          <div className="panel__header">
            <div>
              <p className="section-label">Governance</p>
              <h3>Controls that make the workflow buyer-safe</h3>
            </div>
            <div className="status-pill">Human review enabled</div>
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
              <p className="section-label">Decision summary</p>
              <h3>Why this flow is easier to buy and easier to operate</h3>
            </div>
            <div className="status-pill status-pill--soft">Commercial clarity</div>
          </div>
          <div className="comparison-grid">
            <article className="comparison-card">
              <span>Less ambiguity</span>
              <strong>Every stage has an owner</strong>
              <p>No hidden handoffs. Buyers and operators can see who owns the next move.</p>
            </article>
            <article className="comparison-card">
              <span>Lower release risk</span>
              <strong>Validation happens before export</strong>
              <p>Warnings and release posture stay visible before files leave the system.</p>
            </article>
            <article className="comparison-card">
              <span>Stronger trust</span>
              <strong>Human review remains explicit</strong>
              <p>The workflow feels rigorous because the final gate is visible instead of implied.</p>
            </article>
          </div>
          <div className="detail-callout">
            <div>
              <p className="section-label">Next step</p>
              <strong>Use the live cockpit to show one real project moving through this flow, then close the pilot.</strong>
            </div>
            <p>
              The workflow page explains the system. The cockpit proves it. Together they create a much stronger sales path.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
