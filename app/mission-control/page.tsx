import { AppShell } from "../../src/ui/app-shell";
import { AgentSwarmPanel } from "../../src/ui/agent-swarm-panel";
import { ReferenceBenchmarkPanel } from "../../src/ui/reference-benchmark-panel";
import { getDashboardData } from "../../src/server/mock-data";

export default function MissionControlPage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Mission Control"
      eyebrow="Surreal multi-agent command center"
      subtitle="A premium control surface for 14 live engineering agents, reference pressure, export posture, and commercial readiness. Built to feel closer to a launch room than a dashboard."
    >
      <div className="dashboard-stack">
        <section className="panel panel--hero panel--feature mission-hero">
          <div className="mission-hero__grid">
            <div className="hero-copy">
              <p className="section-label">Realtime orchestration</p>
              <h2>One room for the entire engineering swarm, the premium benchmarks, and the buyer-facing decision gate.</h2>
              <p className="section-subtitle">
                This surface keeps the product surreal without becoming vague: every lane has an owner, every benchmark has a reason,
                and every export is tied to a visible release posture.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="/projects/cantilever-bracket#project-swarm">
                  Open project swarm
                </a>
                <a className="button button--ghost" href="/#pilot">
                  Jump to pilot CTA
                </a>
              </div>
            </div>

            <div className="mission-spotlight">
              <div className="mission-spotlight__shell">
                <div className="mission-spotlight__core">
                  <span>Focused stream</span>
                  <strong>{data.agentRoster[0]?.name}</strong>
                  <p>{data.agentRoster[0]?.focus}</p>
                  <div className="mission-spotlight__meta">
                    <div>
                      <span>Status</span>
                      <strong>{data.agentRoster[0]?.status}</strong>
                    </div>
                    <div>
                      <span>ETA</span>
                      <strong>{data.agentRoster[0]?.eta}</strong>
                    </div>
                    <div>
                      <span>Output</span>
                      <strong>{data.agentRoster[0]?.output}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mission-metrics">
            {data.swarmMetrics.concat(data.stats.slice(0, 2)).map((metric) => (
              <article className="mission-metric-card" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--stacked panel--wide mission-bento">
          <article className="mission-bento__lead">
            <p className="section-label">Decision theater</p>
            <h3>Why this cockpit sells better</h3>
            <p>
              The surreal layer is not decoration. It compresses geometry, QA, benchmarking, and commercial framing into one readable system.
            </p>
          </article>
          <article className="mission-bento__card">
            <span>Swarm</span>
            <strong>14 lanes alive</strong>
            <p>Operators understand who owns the next move before they open the workbench.</p>
          </article>
          <article className="mission-bento__card">
            <span>Benchmarking</span>
            <strong>Reference pressure stays visible</strong>
            <p>Linear, Onshape, Fusion, nTop, Stripe, and Vercel are translated into product moves, not moodboards.</p>
          </article>
          <article className="mission-bento__card">
            <span>Commercial</span>
            <strong>Pilot CTA remains obvious</strong>
            <p>The buyer can jump from spectacle to a real scoped pilot without losing trust.</p>
          </article>
        </section>

        <AgentSwarmPanel
          items={data.agentRoster}
          title="Full live swarm"
          subtitle="Every specialist lane is visible, pulse-driven, and tied to a commercial consequence."
        />

        <ReferenceBenchmarkPanel
          references={data.benchmarkReferences}
          commandItems={data.executionTracks}
          title="Reference pressure matrix"
        />

        <section className="panel panel--stacked panel--wide mission-grid-2up">
          <article className="mission-column-card">
            <div className="panel__header">
              <div>
                <p className="section-label">Execution map</p>
                <h3>Active operating lanes</h3>
              </div>
              <div className="status-pill status-pill--soft">Parallel</div>
            </div>
            <div className="pipeline-rail">
              {data.executionTracks.map((track) => (
                <div className="project-row" key={track.lane}>
                  <div className="project-row__title">
                    <strong>{track.title}</strong>
                    <span>{track.detail}</span>
                  </div>
                  <div className="project-row__detail">{track.status}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="mission-column-card">
            <div className="panel__header">
              <div>
                <p className="section-label">Portfolio pressure</p>
                <h3>Projects most ready to sell</h3>
              </div>
              <div className="status-pill">Commercial</div>
            </div>
            <div className="project-list">
              {data.projects.map((project) => (
                <a className="project-row" href={`/projects/${project.id}`} key={project.id}>
                  <div className="project-row__title">
                    <strong>{project.name}</strong>
                    <span>
                      {project.category} · {project.dimensions}
                    </span>
                  </div>
                  <div className="status-pill status-pill--soft">{project.status}</div>
                </a>
              ))}
            </div>
          </article>
        </section>
      </div>
    </AppShell>
  );
}
