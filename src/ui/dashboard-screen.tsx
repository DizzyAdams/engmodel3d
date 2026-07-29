import { BriefIntakePanel } from "./brief-intake-panel";
import { AgentSwarmPanel } from "./agent-swarm-panel";
import { ReferenceBenchmarkPanel } from "./reference-benchmark-panel";

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
  swarmMetrics: Array<{ label: string; value: string }>;
  agentRoster: Array<{ name: string; role: string; status: string; focus: string; progress: string; eta: string; output: string; intensity: string }>;
  benchmarkReferences: Array<{ name: string; category: string; adopted: string; score: string; note: string }>;
  executionTracks: Array<{ lane: string; title: string; owner: string; status: string; detail: string }>;
  sectors: Array<{ name: string; buyer: string; pain: string; win: string; formats: string }>;
  workflow: Array<{ stage: string; title: string; owner: string; outcome: string; signal: string }>;
  packages: Array<{ name: string; price: string; timeline: string; fit: string; deliverables: string[]; outcome: string }>;
  trustSignals: Array<{ label: string; value: string; detail: string }>;
  caseStudies: Array<{ name: string; impact: string; summary: string; buyer: string }>;
  marketplaceListings: Array<{
    name: string;
    category: string;
    price: string;
    license: string;
    qualityScore: string;
    formats: string;
    delivery: string;
    signal: string;
  }>;
  marketplaceLanes: Array<{ name: string; count: string; owner: string; status: string; detail: string }>;
  openSourceReferences: Array<{ name: string; domain: string; adoption: string; feature: string; risk: string }>;
  multimodalInputModes: Array<{
    name: string;
    input: string;
    output: string;
    agent: string;
    confidence: string;
    detail: string;
  }>;
  generationWorkflow: Array<{ stage: string; title: string; input: string; output: string; gate: string }>;
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
        <div className="hero-orbit-grid">
          <div className="hero-copy">
            <p className="section-label">Construction generation · BIM · sales tours</p>
            <h2>Generate complete 3D projects from a construction brief.</h2>
            <p className="section-subtitle">
              Turn a house brief, tower study, commercial shell, or interior concept into a governed 3D model with BIM metadata,
              approval checks, sales visuals, and export-ready delivery.
            </p>
            <div className="presentation-strip">
              <div className="presentation-strip__card">
                <span>Construction generation</span>
                <strong>Homes, towers, retail shells, interiors, and facades</strong>
              </div>
              <div className="presentation-strip__card">
                <span>BIM confidence</span>
                <strong>Areas, rooms, levels, IFC metadata, and checks</strong>
              </div>
              <div className="presentation-strip__card">
                <span>Sales output</span>
                <strong>3D tour, renders, listing pack, and investor view</strong>
              </div>
            </div>
            <div className="hero-actions">
              <a className="button button--primary" href="#intake">
                Start construction brief
              </a>
              <a className="button button--ghost" href="/projects/casa-contemporanea#project-preview">
                Open 3D project workbench
              </a>
              <a className="button button--ghost" href="/mission-control">
                Open project control
              </a>
            </div>
          </div>

          <div className="hero-orbit-card">
            <div className="hero-orbit-card__shell">
              <div className="hero-orbit-card__core">
                <span>Realtime project pulse</span>
                <strong>{data.agentRoster[0]?.name ?? "Orchestrator"}</strong>
                <p>{data.agentRoster[0]?.focus ?? "Sequencing geometry, QA, export, and commercial proof."}</p>
                <div className="hero-orbit-card__meta">
                  <div>
                    <span>Status</span>
                    <strong>{data.agentRoster[0]?.status ?? "running"}</strong>
                  </div>
                  <div>
                    <span>ETA</span>
                    <strong>{data.agentRoster[0]?.eta ?? "live"}</strong>
                  </div>
                  <div>
                    <span>Output</span>
                    <strong>{data.agentRoster[0]?.output ?? "14-agent swarm online"}</strong>
                  </div>
                </div>
              </div>
            </div>
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

      <section className="marketplace-showcase panel panel--stacked panel--wide" id="catalog">
        <div className="panel__header">
          <div>
            <p className="section-label">Ready project demos</p>
            <h3>Construction models with delivery pack, formats, and quality score</h3>
          </div>
          <div className="status-pill status-pill--soft">Sales-ready surface</div>
        </div>
        <div className="listing-grid">
          {data.marketplaceListings.map((listing) => (
            <article className="listing-card" key={listing.name}>
              <div className="listing-card__preview" aria-hidden="true">
                <div className="listing-card__model" />
                <span>{listing.qualityScore}</span>
              </div>
              <div className="listing-card__body">
                <div>
                  <span className="listing-card__category">{listing.category}</span>
                  <strong>{listing.name}</strong>
                </div>
                <p>{listing.signal}</p>
                <div className="listing-card__meta">
                  <span>{listing.price}</span>
                  <span>{listing.license}</span>
                  <span>{listing.delivery}</span>
                </div>
                <small>{listing.formats}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="multimodal-board panel panel--stacked panel--wide" id="multimodal">
        <div className="panel__header">
          <div>
            <p className="section-label">Prompt, PNG, JPEG, video, drone</p>
            <h3>Every useful construction input becomes a structured 3D generation job</h3>
          </div>
          <div className="status-pill status-pill--soft">Multimodal pipeline</div>
        </div>
        <div className="multimodal-grid">
          {data.multimodalInputModes.map((mode) => (
            <article className="input-mode-card" key={mode.name}>
              <div className="input-mode-card__top">
                <span>{mode.input}</span>
                <strong>{mode.confidence}</strong>
              </div>
              <h4>{mode.name}</h4>
              <p>{mode.detail}</p>
              <div className="input-mode-card__output">{mode.output}</div>
              <small>{mode.agent}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="generation-flow panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Generation workflow</p>
            <h3>From raw media to BIM, tour, approval pack, and commercial delivery</h3>
          </div>
          <a className="status-pill" href="#intake">
            Start intake
          </a>
        </div>
        <div className="generation-flow__grid">
          {data.generationWorkflow.map((step) => (
            <article className="generation-step" key={step.stage}>
              <span>{step.stage}</span>
              <strong>{step.title}</strong>
              <p>{step.input}</p>
              <div>{step.output}</div>
              <small>{step.gate}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-board panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Construction operating system</p>
            <h3>Brief intake, BIM validation, visualization, and approval delivery</h3>
          </div>
          <a className="status-pill" href="/roadmap">
            Roadmap
          </a>
        </div>
        <div className="ops-board__grid">
          {data.marketplaceLanes.map((lane) => (
            <article className="ops-lane" key={lane.name}>
              <div className="ops-lane__top">
                <span>{lane.status}</span>
                <strong>{lane.count}</strong>
              </div>
              <h4>{lane.name}</h4>
              <p>{lane.detail}</p>
              <small>{lane.owner}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="open-source-board panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Open source leverage</p>
            <h3>Open projects that make construction generation buildable instead of fake</h3>
          </div>
          <div className="status-pill status-pill--soft">Build, do not fake</div>
        </div>
        <div className="open-source-board__grid">
          {data.openSourceReferences.map((reference) => (
            <article className="reference-card" key={reference.name}>
              <span>{reference.domain}</span>
              <strong>{reference.name}</strong>
              <p>{reference.adoption}</p>
              <div className="reference-card__feature">{reference.feature}</div>
              <small>{reference.risk}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="market-command panel panel--stacked panel--wide" id="market">
        <div className="panel__header">
          <div>
            <p className="section-label">Project command</p>
            <h3>Design generation, approval risk, and commercial readiness on one screen</h3>
          </div>
          <a className="status-pill" href="#projects">
            View active projects
          </a>
        </div>
        <div className="market-command__grid">
          <article className="market-command__quote">
            <span>Construction delivery lane</span>
            <strong>Houses, towers, commercial shells and interiors move through one governed queue.</strong>
            <p>
              Each project carries area targets, visual style, BIM health, approval risk, campaign assets, and reviewer status before delivery.
            </p>
          </article>
          <div className="market-command__metrics" aria-label="Marketplace operating metrics">
            <div>
              <span>Qualified demand</span>
              <strong>{data.sectors.length} sectors</strong>
              <small>Mapped to developers, brokers, architects, investors and builders</small>
            </div>
            <div>
              <span>Delivery options</span>
              <strong>{data.exports.length} formats</strong>
              <small>IFC, GLB, plans, renders, schedules and review packs</small>
            </div>
            <div>
              <span>Proof layer</span>
              <strong>{data.trustSignals.length} signals</strong>
              <small>BIM, approval, revision, tour and client signoff credibility</small>
            </div>
            <div>
              <span>Live projects</span>
              <strong>{data.projects.length} workspaces</strong>
              <small>Inspectable construction concepts with status and area</small>
            </div>
          </div>
        </div>
      </section>

      <section className="workflow-rail panel" aria-labelledby="workflow-rail-title">
        <div className="workflow-rail__intro">
          <p className="section-label">Operating path</p>
          <h3 id="workflow-rail-title">Five steps. One clear next action.</h3>
          <p>Keep the engineering decision moving without losing the evidence behind it.</p>
        </div>
        <ol className="workflow-rail__steps">
          <li className="workflow-rail__step workflow-rail__step--active">
            <a href="#intake"><span>01</span><strong>Brief</strong><small>Define constraints</small></a>
          </li>
          <li className="workflow-rail__step"><a href="/projects/casa-contemporanea#project-preview"><span>02</span><strong>Model</strong><small>Inspect geometry</small></a></li>
          <li className="workflow-rail__step"><a href="/projects/casa-contemporanea#validation"><span>03</span><strong>Checks</strong><small>Review risks</small></a></li>
          <li className="workflow-rail__step"><a href="/projects/casa-contemporanea#project-versions"><span>04</span><strong>Review</strong><small>Compare revisions</small></a></li>
          <li className="workflow-rail__step"><a href="/projects/casa-contemporanea#export-readiness"><span>05</span><strong>Export</strong><small>Prepare handoff</small></a></li>
        </ol>
        <div className="workflow-rail__next">
          <span>Next action</span>
          <strong>Start with the project brief</strong>
          <a className="button button--primary" href="#intake">Open intake</a>
        </div>
      </section>

      <BriefIntakePanel exportTargets={data.exports} />

      <section className="panel panel--stacked panel--wide mission-bento">
        <article className="mission-bento__lead">
          <p className="section-label">Surreal thesis</p>
          <h3>The product now behaves like a premium engineering command center</h3>
          <p>
            Swarm telemetry, reference pressure, export posture, and buyer-ready decisions now live in one interface instead of scattered across generic cards.
          </p>
        </article>
        <article className="mission-bento__card">
          <span>Realtime swarm</span>
          <strong>14 agents visible</strong>
          <p>Every lane is explicit enough for a buyer, operator, or reviewer to understand at a glance.</p>
        </article>
        <article className="mission-bento__card">
          <span>Reference pressure</span>
          <strong>Benchmarks are operational</strong>
          <p>We are no longer showing inspiration. We are showing what gets built because of each premium reference.</p>
        </article>
        <article className="mission-bento__card">
          <span>Commercial close</span>
          <strong>Pilot CTA stays near proof</strong>
          <p>The surreal layer sits next to buyer proof, so the interface sells instead of just looking expensive.</p>
        </article>
      </section>

      <AgentSwarmPanel items={data.agentRoster} />

      <ReferenceBenchmarkPanel references={data.benchmarkReferences} commandItems={data.executionTracks} />

      <section className="panel panel--stacked panel--wide" id="solutions">
        <div className="panel__header">
          <div>
            <p className="section-label">Target buyers</p>
            <h3>Who this platform is already strong enough to sell to</h3>
          </div>
          <a className="status-pill" href="/solutions">
            Open solutions page
          </a>
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

      <section className="panel panel--stacked panel--wide" id="workflow">
        <div className="panel__header">
          <div>
            <p className="section-label">Delivery workflow</p>
            <h3>The path from buyer brief to governed export handoff</h3>
          </div>
          <a className="status-pill" href="/workflow">
            Open workflow page
          </a>
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

      <section className="panel panel--stacked panel--wide" id="offer">
        <div className="panel__header">
          <div>
            <p className="section-label">Commercial offer</p>
            <h3>What we can sell first</h3>
          </div>
          <div className="status-pill status-pill--soft">Pilot ready</div>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Brief-to-model pilot</strong>
              <span>Core value</span>
            </div>
            <p>Turn a written brief into a structured parametric proposal with visible assumptions and editable parameters.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Validation gate</strong>
              <span>Risk reducer</span>
            </div>
            <p>Run engineering checks before release so clients see pass, warn, and fail states before export handoff.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Export-ready delivery</strong>
              <span>Buyer outcome</span>
            </div>
            <p>Package the result in STEP, STL, IFC, GLB, or script form with version history and a review trail.</p>
          </article>
        </div>
      </section>

      <section className="panel panel--stacked panel--wide" id="pilot">
        <div className="panel__header">
          <div>
            <p className="section-label">Pilot package</p>
            <h3>What the first paid engagement includes</h3>
          </div>
          <div className="status-pill status-pill--soft">Ready to scope</div>
        </div>
        <div className="pilot-grid">
          <article className="pilot-card">
            <span>Week 1</span>
            <strong>Brief and constraints</strong>
            <p>Lock the problem, acceptance criteria, output format, and engineering limits.</p>
          </article>
          <article className="pilot-card">
            <span>Week 2</span>
            <strong>Parametric prototype</strong>
            <p>Generate the first editable model with visible rules and controlled parameters.</p>
          </article>
          <article className="pilot-card">
            <span>Week 3</span>
            <strong>Validation and export</strong>
            <p>Run checks, package delivery files, and hand over a decision-ready revision history.</p>
          </article>
          <article className="pilot-card">
            <span>Outcome</span>
            <strong>Paid pilot with proof</strong>
            <p>The customer gets a working artifact, not a slide deck or an unfinished concept.</p>
          </article>
        </div>
      </section>

      <section className="panel panel--stacked panel--wide" id="packages">
        <div className="panel__header">
          <div>
            <p className="section-label">Commercial packages</p>
            <h3>Three clear ways to buy the product</h3>
          </div>
          <a className="status-pill" href="/packages">
            Open packages page
          </a>
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
            <p className="section-label">Executive proof</p>
            <h3>Signals that make important engineering buyers trust the product</h3>
          </div>
          <div className="status-pill status-pill--soft">Buyer-safe</div>
        </div>
        <div className="metric-row">
          {data.trustSignals.map((signal) => (
            <div className="metric-card" key={signal.label}>
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
              <small>{signal.detail}</small>
            </div>
          ))}
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
            <p className="section-label">Essential features</p>
            <h3>Seven things the first customer buys</h3>
          </div>
          <div className="status-pill status-pill--soft">No fluff</div>
        </div>
        <div className="feature-grid feature-grid--sales">
          <article className="feature-card feature-card--lead">
            <div className="feature-card__top">
              <strong>Brief intake</strong>
              <span>1</span>
            </div>
            <p>Capture the requirement in plain language, templates, or controlled uploads with the same output structure.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Parameter panel</strong>
              <span>2</span>
            </div>
            <p>Expose only the variables that matter so the user can tune the model without breaking geometry.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Constraint checks</strong>
              <span>3</span>
            </div>
            <p>Validate thickness, clearance, stress, and rule violations before the model reaches a client review.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>3D preview</strong>
              <span>4</span>
            </div>
            <p>Give the buyer a visible artifact early so decisions happen on shape and fit, not on promises.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Version history</strong>
              <span>5</span>
            </div>
            <p>Keep every revision, owner, and change summary so the handoff feels controlled instead of improvised.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Export pack</strong>
              <span>6</span>
            </div>
            <p>Ship STEP, STL, IFC, GLB, or script output as a normalized delivery package with clear file naming.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__top">
              <strong>Commercial handoff</strong>
              <span>7</span>
            </div>
            <p>End with a ready-to-review summary, so the customer can approve, request changes, or buy the next iteration.</p>
          </article>
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Conversion</p>
            <h3>How the first customer should contact you</h3>
          </div>
          <div className="status-pill">Commercial ready</div>
        </div>
        <div className="detail-callout">
          <div>
            <p className="section-label">Call to action</p>
            <strong>Offer a scoped pilot for mechanical parts first, then expand into BIM and reusable modules.</strong>
          </div>
          <p>
            The product is strongest when it reduces iteration time, protects engineering rules, and delivers
            exportable files with a visible review trail.
          </p>
        </div>
      </section>

      <section className="panel panel--stacked panel--wide">
        <div className="panel__header">
          <div>
            <p className="section-label">Initial niche</p>
            <h3>Best first market to sell into</h3>
          </div>
          <div className="status-pill status-pill--soft">Narrow focus</div>
        </div>
        <div className="comparison-grid">
          <article className="comparison-card">
            <span>Primary wedge</span>
            <strong>Mechanical parts</strong>
            <p>Fastest path to value because the workflow is easy to explain, validate, and export.</p>
          </article>
          <article className="comparison-card">
            <span>Secondary wedge</span>
            <strong>Architecture/BIM modules</strong>
            <p>Good expansion path once IFC and metadata mapping are stable enough for real teams.</p>
          </article>
          <article className="comparison-card">
            <span>Buyer language</span>
            <strong>Reduce iteration time</strong>
            <p>Sell time saved, fewer invalid revisions, and cleaner handoff to CAD or fabrication teams.</p>
          </article>
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
