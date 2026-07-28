import { AppShell } from "../../src/ui/app-shell";
import { getDashboardData } from "../../src/server/mock-data";

export default function SolutionsPage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Solutions"
      eyebrow="Buyer-facing engineering offers"
      subtitle="The fastest way to understand where Model3DEng wins first, why buyers trust it, and how the pilot converts into a real engineering operating system."
    >
      <div className="dashboard-stack">
        <section className="panel panel--hero panel--feature">
          <div className="hero-orbit-grid">
            <div className="hero-copy">
              <p className="section-label">Where we sell first</p>
              <h2>Three buyer profiles, one governed workflow, and a clearer reason to pay for the pilot now.</h2>
              <p className="section-subtitle">
                This page turns the surreal cockpit into a commercial story: who it helps, which pain it removes,
                and what proof a serious engineering buyer sees before approving the engagement.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="/#pilot">
                  Request pilot
                </a>
                <a className="button button--ghost" href="/mission-control">
                  Open mission control
                </a>
              </div>
            </div>

            <div className="hero-orbit-card">
              <div className="hero-orbit-card__shell">
                <div className="hero-orbit-card__core">
                  <span>Commercial posture</span>
                  <strong>{data.trustSignals[0]?.value ?? "100%"}</strong>
                  <p>{data.trustSignals[0]?.detail ?? "Every export is gated by human review before release."}</p>
                  <div className="hero-orbit-card__meta">
                    <div>
                      <span>Primary wedge</span>
                      <strong>{data.sectors[0]?.name ?? "Mechanical parts"}</strong>
                    </div>
                    <div>
                      <span>Proof assets</span>
                      <strong>{data.caseStudies.length} case studies</strong>
                    </div>
                    <div>
                      <span>Offers live</span>
                      <strong>{data.packages.length} packages</strong>
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
              <p className="section-label">Target buyers</p>
              <h3>Who the current product already serves well</h3>
            </div>
            <div className="status-pill">{data.sectors.length} segments</div>
          </div>
          <div className="comparison-grid">
            {data.sectors.map((sector) => (
              <article className="comparison-card" key={sector.name}>
                <span>{sector.buyer}</span>
                <strong>{sector.name}</strong>
                <p>{sector.pain}</p>
                <p>{sector.win}</p>
                <small>{sector.formats}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--stacked panel--wide">
          <div className="panel__header">
            <div>
              <p className="section-label">Why buyers trust it</p>
              <h3>Signals that reduce perceived delivery risk</h3>
            </div>
            <div className="status-pill status-pill--soft">Enterprise-safe</div>
          </div>
          <div className="metric-row">
            {data.trustSignals.map((signal) => (
              <article className="metric-card" key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
                <small>{signal.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--stacked panel--wide">
          <div className="panel__header">
            <div>
              <p className="section-label">Proof</p>
              <h3>Commercially legible case-study angles</h3>
            </div>
            <div className="status-pill">Decision-ready</div>
          </div>
          <div className="comparison-grid">
            {data.caseStudies.map((study) => (
              <article className="comparison-card" key={study.name}>
                <span>{study.buyer}</span>
                <strong>{study.name}</strong>
                <p>{study.summary}</p>
                <small>{study.impact}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--stacked panel--wide">
          <div className="panel__header">
            <div>
              <p className="section-label">How to enter</p>
              <h3>The best first sale is still the pilot</h3>
            </div>
            <div className="status-pill status-pill--soft">Fastest close</div>
          </div>
          <div className="feature-grid">
            {data.packages.map((pkg) => (
              <article className="feature-card" key={pkg.name}>
                <div className="feature-card__top">
                  <strong>{pkg.name}</strong>
                  <span>{pkg.price}</span>
                </div>
                <p>{pkg.fit}</p>
                <p>{pkg.timeline}</p>
              </article>
            ))}
          </div>
          <div className="detail-callout">
            <div>
              <p className="section-label">Recommended CTA</p>
              <strong>Start with the Pilot Sprint, prove one real engineering artifact, then expand into the Engineering Pod.</strong>
            </div>
            <p>
              This keeps the buying motion simple: one scoped problem, one governed output, one visible review trail,
              and one obvious next step if the team wants a broader rollout.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
