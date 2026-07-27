import { AppShell } from "../../src/ui/app-shell";
import { getDashboardData } from "../../src/server/mock-data";

export default function RoadmapPage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="MVP roadmap"
      eyebrow="3 hour execution plan"
      subtitle="A practical release sequence for turning the current workspace into a real engineering cockpit."
    >
      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Launch target</p>
            <h2>Ship the strongest possible MVP in 3 hours</h2>
          </div>
          <div className="status-pill status-pill--soft">Priority: high</div>
        </div>
        <div className="roadmap-timeline">
          {data.roadmap.map((step) => (
            <article className="roadmap-step" key={step.phase}>
              <div className="roadmap-step__phase">{step.phase}</div>
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="dashboard-grid dashboard-grid--roadmap">
        <section className="panel panel--stacked">
          <div className="panel__header">
            <div>
              <p className="section-label">MVP scope</p>
              <h3>Must ship</h3>
            </div>
          </div>
          <div className="feature-list">
            <div className="feature-list__item"><strong>Portfolio dashboard</strong><span>KPIs, validation state, and project list.</span></div>
            <div className="feature-list__item"><strong>Project cockpit</strong><span>Geometry, risk, engineering metrics, and activity log.</span></div>
            <div className="feature-list__item"><strong>3D preview stage</strong><span>Deterministic preview surface with room for WebGL integration.</span></div>
            <div className="feature-list__item"><strong>Roadmap planning</strong><span>Explicit release plan for the next development window.</span></div>
          </div>
        </section>

        <section className="panel panel--stacked">
          <div className="panel__header">
            <div>
              <p className="section-label">Engineering checklist</p>
              <h3>Release gates</h3>
            </div>
          </div>
          <div className="feature-list">
            <div className="feature-list__item"><strong>Type safety</strong><span>Keep the runtime data model and UI contracts aligned.</span></div>
            <div className="feature-list__item"><strong>Responsive layout</strong><span>Dashboard and project detail must hold on mobile.</span></div>
            <div className="feature-list__item"><strong>Validation UX</strong><span>Surface pass, warn, and fail states clearly.</span></div>
            <div className="feature-list__item"><strong>Navigation</strong><span>Fast path between dashboard, project detail, and roadmap.</span></div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
