"use client";

import { useEffect, useMemo, useState } from "react";
import type { AgentCard } from "../server/mock-data";

type AgentSwarmPanelProps = {
  items: AgentCard[];
  title?: string;
  subtitle?: string;
};

const toneMap: Record<string, { label: string; glow: string; bar: string }> = {
  active: { label: "ACTIVE", glow: "rgba(124, 243, 255, 0.22)", bar: "linear-gradient(90deg, #7cf3ff, #7c9bff)" },
  benchmarking: { label: "BENCH", glow: "rgba(122, 155, 255, 0.18)", bar: "linear-gradient(90deg, #7c9bff, #b6c7ff)" },
  synthesizing: { label: "SYNTH", glow: "rgba(140, 255, 214, 0.18)", bar: "linear-gradient(90deg, #7cf3ff, #78f4b9)" },
  review: { label: "REVIEW", glow: "rgba(255, 211, 109, 0.18)", bar: "linear-gradient(90deg, #ffd36d, #ffb86c)" },
  running: { label: "RUN", glow: "rgba(124, 243, 255, 0.22)", bar: "linear-gradient(90deg, #7cf3ff, #7c9bff)" },
  watch: { label: "WATCH", glow: "rgba(255, 211, 109, 0.16)", bar: "linear-gradient(90deg, #ffd36d, #ffb86c)" },
  queued: { label: "QUEUE", glow: "rgba(160, 180, 210, 0.12)", bar: "linear-gradient(90deg, #8da4c8, #6d86b2)" },
};

function getTone(status: string) {
  return toneMap[status] ?? toneMap.running;
}

function getProgressValue(progress: string) {
  const match = progress.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function AgentSwarmPanel({
  items,
  title = "14-agent live swarm",
  subtitle = "A synchronized build squad comparing references, generating deltas, and turning them into a product command center.",
}: AgentSwarmPanelProps) {
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setFocusIndex((current) => (current + 1) % items.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const focusAgent = items[focusIndex] ?? items[0];
  const averageProgress = useMemo(() => {
    if (!items.length) {
      return 0;
    }

    return Math.round(items.reduce((total, item) => total + getProgressValue(item.progress), 0) / items.length);
  }, [items]);

  return (
    <section className="panel panel--stacked panel--wide">
      <div className="panel__header">
        <div>
          <p className="section-label">Realtime agent system</p>
          <h3>{title}</h3>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="status-pill">{averageProgress}% synced</div>
      </div>

      {focusAgent ? (
        <div
          style={{
            display: "grid",
            gap: 12,
            padding: 16,
            borderRadius: 20,
            border: "1px solid rgba(124, 243, 255, 0.16)",
            background:
              "radial-gradient(circle at top left, rgba(124, 243, 255, 0.13), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 24px 80px ${getTone(focusAgent.status).glow}`,
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p className="section-label">Focused stream</p>
              <strong style={{ display: "block", fontSize: 24, lineHeight: 1.15 }}>{focusAgent.name}</strong>
              <span style={{ color: "var(--muted)" }}>{focusAgent.focus}</span>
            </div>
            <div style={{ display: "grid", gap: 6, justifyItems: "end" }}>
              <span className="status-pill status-pill--soft">{getTone(focusAgent.status).label}</span>
              <strong style={{ fontSize: 14 }}>{focusAgent.role}</strong>
            </div>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "var(--muted)", fontSize: 12 }}>
              <span>{focusAgent.output}</span>
              <span>{focusAgent.progress}</span>
            </div>
            <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div
                style={{
                  width: `${getProgressValue(focusAgent.progress)}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: getTone(focusAgent.status).bar,
                  boxShadow: "0 0 24px rgba(124, 243, 255, 0.35)",
                }}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, color: "var(--muted)", fontSize: 12 }}>
              <span>Track: {focusAgent.role}</span>
              <span>ETA: {focusAgent.eta}</span>
              <span>Intensity: {focusAgent.intensity}</span>
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((item, index) => {
          const tone = getTone(item.status);
          const active = item.name === focusAgent?.name;

          return (
            <article
              key={`${item.name}-${item.role}`}
              style={{
                display: "grid",
                gap: 10,
                padding: 14,
                borderRadius: 18,
                border: active ? "1px solid rgba(124, 243, 255, 0.4)" : "1px solid rgba(255,255,255,0.08)",
                background: active
                  ? "linear-gradient(180deg, rgba(124,243,255,0.10), rgba(255,255,255,0.03))"
                  : "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                boxShadow: active ? `0 20px 60px ${tone.glow}` : "none",
                transform: active ? "translateY(-2px)" : undefined,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <span className="section-label">Agent {String(index + 1).padStart(2, "0")}</span>
                  <strong style={{ display: "block", fontSize: 15 }}>{item.name}</strong>
                </div>
                <span className="status-pill status-pill--soft">{tone.label}</span>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>Role</span>
                <strong style={{ fontSize: 14 }}>{item.role}</strong>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>Current task</span>
                <span style={{ fontSize: 13, lineHeight: 1.5 }}>{item.focus}</span>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "var(--muted)", fontSize: 12 }}>
                  <span>{item.output}</span>
                  <span>{item.progress}</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <div style={{ width: `${getProgressValue(item.progress)}%`, height: "100%", borderRadius: 999, background: tone.bar }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
