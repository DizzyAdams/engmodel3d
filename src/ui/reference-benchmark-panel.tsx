import type { ExecutionTrack, ReferenceBenchmark } from "../server/mock-data";

type ReferenceBenchmarkPanelProps = {
  references: ReferenceBenchmark[];
  commandItems: ExecutionTrack[];
  title?: string;
};

const statusTone: Record<string, string> = {
  running: "rgba(124, 243, 255, 0.16)",
  watch: "rgba(255, 211, 109, 0.16)",
  queued: "rgba(160, 180, 210, 0.10)",
};

export function ReferenceBenchmarkPanel({
  references,
  commandItems,
  title = "Reference pressure map",
}: ReferenceBenchmarkPanelProps) {
  return (
    <section className="panel panel--stacked panel--wide">
      <div className="panel__header">
        <div>
          <p className="section-label">Comparative intelligence</p>
          <h3>{title}</h3>
          <p className="section-subtitle">
            The product is benchmarked against serious tools, then translated into a concrete feature command list.
          </p>
        </div>
        <div className="status-pill status-pill--soft">{references.length} active references</div>
      </div>

      <div className="comparison-grid" style={{ marginBottom: 18 }}>
        {references.map((reference) => (
          <article
            className="comparison-card"
            key={reference.name}
            style={{
              display: "grid",
              gap: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              background:
                "radial-gradient(circle at top right, rgba(124,243,255,0.08), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <span>{reference.category}</span>
                <strong style={{ display: "block", fontSize: 17, marginTop: 4 }}>{reference.name}</strong>
              </div>
              <span className="status-pill status-pill--soft">{reference.score}</span>
            </div>
            <p style={{ margin: 0 }}>{reference.note}</p>
            <div style={{ display: "grid", gap: 6 }}>
              <span className="section-label">What we steal</span>
              <strong style={{ fontSize: 14 }}>{reference.adopted}</strong>
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <span className="section-label">Our move</span>
              <p style={{ margin: 0 }}>Translate this benchmark into a product-specific move that feels native to the engineering cockpit.</p>
            </div>
          </article>
        ))}
      </div>

      <div className="panel__header" style={{ marginBottom: 14 }}>
        <div>
          <p className="section-label">Feature command</p>
          <h3>What ships because of the comparison</h3>
        </div>
        <div className="status-pill">Execution-linked</div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {commandItems.map((item) => (
          <article
            key={`${item.lane}-${item.title}`}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1fr)",
              gap: 14,
              padding: 16,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.08)",
              background: `linear-gradient(180deg, ${statusTone[item.status] ?? statusTone.running}, rgba(255,255,255,0.02))`,
            }}
          >
            <div style={{ display: "grid", gap: 6 }}>
              <span className="section-label">Feature</span>
              <strong style={{ fontSize: 16 }}>{item.title}</strong>
              <p style={{ margin: 0, color: "var(--muted)" }}>{item.detail}</p>
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <span className="section-label">Reference delta</span>
              <p style={{ margin: 0 }}>{item.lane}</p>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span className="status-pill status-pill--soft">{item.status}</span>
                <span className="status-pill status-pill--muted">{item.owner}</span>
              </div>
              <p style={{ margin: 0 }}>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
