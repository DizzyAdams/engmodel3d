import { AppShell } from "../../src/ui/app-shell";
import { getDashboardData } from "../../src/server/mock-data";

export default function PackagesPage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Packages"
      eyebrow="Commercial packaging"
      subtitle="Clear ways to buy the product now, grounded in deliverables, timeline, buyer fit, and visible proof."
    >
      <div className="dashboard-stack">
        <section className="panel panel--hero panel--feature">
          <div className="hero-orbit-grid">
            <div className="hero-copy">
              <p className="section-label">Commercial structure</p>
              <h2>Three buying motions, from a fast pilot to an enterprise rollout, without losing the governed-engineering story.</h2>
              <p className="section-subtitle">
                The pricing page should not feel like a generic SaaS table. It should feel like a precise commercial translation
                of the workflow, the trust model, and the quality of the output.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="/#pilot">
                  Start with pilot
                </a>
                <a className="button button--ghost" href="/workflow">
                  Review workflow
                </a>
              </div>
            </div>

            <div className="hero-orbit-card">
              <div className="hero-orbit-card__shell">
                <div className="hero-orbit-card__core">
                  <span>Recommended entry</span>
                  <strong>{data.packages[0]?.name ?? "Pilot Sprint"}</strong>
                  <p>{data.packages[0]?.fit ?? "Best for one critical part or module that needs proof fast."}</p>
                  <div className="hero-orbit-card__meta">
                    <div>
                      <span>Price</span>
                      <strong>{data.packages[0]?.price ?? "$12k-$18k"}</strong>
                    </div>
                    <div>
                      <span>Timeline</span>
                      <strong>{data.packages[0]?.timeline ?? "2-3 weeks"}</strong>
                    </div>
                    <div>
                      <span>Formats</span>
                      <strong>{data.trustSignals[1]?.value ?? "5 formats"}</strong>
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
              <p className="section-label">Commercial packages</p>
              <h3>What each buyer is actually buying</h3>
            </div>
            <div className="status-pill">{data.packages.length} active offers</div>
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
                <div className="tag-row">
                  {pkg.deliverables.map((item) => (
                    <span className="tag-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <p>{pkg.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--stacked panel--wide">
          <div className="panel__header">
            <div>
              <p className="section-label">Why these offers work</p>
              <h3>Trust signals behind the pricing</h3>
            </div>
            <div className="status-pill status-pill--soft">Risk reducers</div>
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
              <p className="section-label">Proof by outcome</p>
              <h3>What the buyer believes after seeing the work</h3>
            </div>
            <div className="status-pill">Proof linked</div>
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
              <p className="section-label">Buying guidance</p>
              <h3>How to guide the conversation</h3>
            </div>
            <div className="status-pill status-pill--soft">Suggested motion</div>
          </div>
          <div className="comparison-grid">
            <article className="comparison-card">
              <span>Entry</span>
              <strong>Pilot Sprint</strong>
              <p>Use this when the buyer needs one real artifact, one governed output, and fast confidence.</p>
            </article>
            <article className="comparison-card">
              <span>Expansion</span>
              <strong>Engineering Pod</strong>
              <p>Use this once the first pilot proves the workflow and the team wants repeatable throughput.</p>
            </article>
            <article className="comparison-card">
              <span>Scale</span>
              <strong>Enterprise Rollout</strong>
              <p>Use this when the client wants standardized delivery, governance, and reporting across programs.</p>
            </article>
          </div>
          <div className="detail-callout">
            <div>
              <p className="section-label">Recommended CTA</p>
              <strong>Lead with the Pilot Sprint and close on the quality of the deliverable, not on feature count.</strong>
            </div>
            <p>
              That keeps the sales motion concrete: one scoped engagement, one validated result, one obvious path to expand.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
