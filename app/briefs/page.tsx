"use client";

import { useEffect, useMemo, useState } from "react";

type Brief = {
  id: string;
  projectName: string;
  sector: string;
  package: string;
  nextStep: string;
  surrealDirection: string;
  createdAt: string;
};

export default function SavedBriefsPage() {
  const [items, setItems] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadArtifacts() {
      try {
        const base =
          typeof window !== "undefined" && window.location
            ? window.location.origin
            : "http://localhost:3000";
        const res = await fetch(`${base}/api/intake/briefs`);
        if (!res.ok) throw new Error(`API failed with ${res.status}`);
        const json = (await res.json()) as { ok?: boolean; data?: Brief[]; error?: string };
        if (!json.ok || !Array.isArray(json.data)) {
          throw new Error(json.error ?? "Invalid brief payload");
        }
        if (!cancelled) {
          setItems(json.data);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadArtifacts();
    return () => {
      cancelled = true;
    };
  }, []);

  const readyCount = useMemo(() => items.length, [items]);

  return (
    <main className="min-h-screen w-full bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Briefs salvos</h1>
            <p className="mt-2 text-white/70">Briefs registrados localmente para retomada e análise.</p>
          </div>
          <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            {readyCount} brief{readyCount === 1 ? "" : "s"} disponíve{readyCount === 1 ? "l" : "is"}
          </span>
        </div>
        {error && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-red-300">Não foi possível carregar os briefs.</h2>
            <p className="mt-2 text-sm text-white/80">{error}</p>
          </div>
        )}
        {!loading && !error && readyCount === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Nenhum brief salvo ainda</h2>
            <p className="mt-2 text-sm text-white/70">
              Quando você enviar uma solicitação de intake, ela aparecerá aqui para continuar depois.
            </p>
          </div>
        ) : null}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((brief) => (
            <div key={brief.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">{brief.createdAt}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{brief.id}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{brief.projectName}</h3>
              <p className="mt-1 text-sm text-white/70">
                Setor: {brief.sector} · Pacote: {brief.package}
              </p>
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">Próximo passo</div>
                <p className="mt-1 text-sm text-white/80">{brief.nextStep}</p>
              </div>
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">Direção surreal</div>
                <p className="mt-1 text-sm text-white/80">{brief.surrealDirection}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
