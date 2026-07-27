"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import * as THREE from "three";
import type { ProjectRecord } from "../server/mock-data";
import { buildEngineeringExportBundle } from "../cad/export-package";

type EngineeringWorkbenchProps = {
  project: ProjectRecord;
  id?: string;
};

type MaterialKey = "aluminum" | "steel" | "nylon";

const MATERIALS: Record<MaterialKey, { label: string; density: number; allowableStress: number; color: number }> = {
  aluminum: { label: "Aluminum", density: 2.7, allowableStress: 220, color: 0x7cf3ff },
  steel: { label: "Steel", density: 7.85, allowableStress: 355, color: 0x7c9bff },
  nylon: { label: "Nylon", density: 1.15, allowableStress: 75, color: 0x78f4b9 },
};

export function EngineeringWorkbench({ project, id }: EngineeringWorkbenchProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(80);
  const [thickness, setThickness] = useState(18);
  const [load, setLoad] = useState(8000);
  const [material, setMaterial] = useState<MaterialKey>("aluminum");
  const [safetyFactor, setSafetyFactor] = useState(2.2);

  const derived = useMemo(() => {
    const mat = MATERIALS[material];
    const volumeCm3 = ((width * height * thickness) / 1000) * 0.62;
    const massKg = (volumeCm3 * mat.density) / 1000;
    const sectionArea = Math.max(thickness * height * 0.06, 1);
    const stress = load / sectionArea;
    const fos = mat.allowableStress / Math.max(stress, 1);
    const allowableStress = mat.allowableStress / Math.max(safetyFactor, 0.1);
    const allowableLoad = allowableStress * sectionArea;
    const utilization = load / Math.max(allowableLoad, 1);
    const reserve = fos - safetyFactor;
    const deflection = (load * Math.pow(width / 100, 3)) / Math.max(thickness * height * 2400, 1);
    const validity =
      fos >= safetyFactor && deflection <= 1.0
        ? "Ready for review"
        : fos >= safetyFactor * 0.85
          ? "Needs tuning"
          : "Fail";
    return {
      massKg,
      stress,
      fos,
      allowableStress,
      allowableLoad,
      utilization,
      reserve,
      deflection,
      volumeCm3,
      validity,
      materialLabel: mat.label,
      materialLimit: mat.allowableStress,
      safetyFactor,
    };
  }, [height, load, material, safetyFactor, thickness, width]);

  const exportState = {
    width,
    height,
    thickness,
    load,
    material,
    safetyFactor,
    derived,
  };

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06101a);
    scene.fog = new THREE.Fog(0x06101a, 10, 30);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(4.8, 3.2, 6.4);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    const key = new THREE.DirectionalLight(0x7cf3ff, 2.4);
    key.position.set(6, 8, 5);
    const fill = new THREE.DirectionalLight(0x7c9bff, 1.5);
    fill.position.set(-4, 2, -3);

    scene.add(ambient, key, fill);

    const grid = new THREE.GridHelper(14, 14, 0x33506d, 0x1d2f45);
    grid.position.y = -1.9;
    scene.add(grid);

    const model = new THREE.Group();
    scene.add(model);

    const makeModel = () => {
      model.clear();
      const mat = new THREE.MeshStandardMaterial({
        color: MATERIALS[material].color,
        metalness: 0.35,
        roughness: 0.35,
      });

      const base = new THREE.Mesh(new THREE.BoxGeometry(width / 90, 0.24, thickness / 45), mat);
      base.position.y = -1.2;
      model.add(base);

      const upright = new THREE.Mesh(new THREE.BoxGeometry(0.34, height / 82, thickness / 45), mat);
      upright.position.set(-width / 220, height / 164 - 1.2, 0);
      model.add(upright);

      const rib = new THREE.Mesh(new THREE.BoxGeometry(width / 120, height / 110, thickness / 55), mat);
      rib.rotation.z = -0.82;
      rib.position.set(-0.28, -0.28, 0);
      model.add(rib);

      const loadArrow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 1.3, 18),
        new THREE.MeshStandardMaterial({ color: 0xffd36d, emissive: 0x4d3510 }),
      );
      loadArrow.rotation.z = Math.PI / 2;
      loadArrow.position.set(0.9, 0.8, 0);
      model.add(loadArrow);

      const head = new THREE.Mesh(
        new THREE.ConeGeometry(0.18, 0.35, 18),
        new THREE.MeshStandardMaterial({ color: 0xffd36d, emissive: 0x4d3510 }),
      );
      head.rotation.z = -Math.PI / 2;
      head.position.set(1.6, 0.8, 0);
      model.add(head);

      const label = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.06, 16, 30),
        new THREE.MeshStandardMaterial({ color: 0x7cf3ff, emissive: 0x14343d }),
      );
      label.position.set(0, 0.72, 0.42);
      label.rotation.x = Math.PI / 2;
      model.add(label);
    };

    makeModel();

    const resize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) {
        return;
      }
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    rendererRef.current = renderer;
    sceneRef.current = scene;
    modelRef.current = model;
    cameraRef.current = camera;

    const observer = new ResizeObserver(resize);
    observer.observe(mountRef.current);

    const animate = () => {
      model.rotation.y += 0.006;
      renderer.render(scene, camera);
      rafRef.current = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      renderer.dispose();
      mountRef.current?.replaceChildren();
      rendererRef.current = null;
      sceneRef.current = null;
      modelRef.current = null;
      cameraRef.current = null;
    };
  }, [height, material, thickness, width]);

  const downloadArtifact = (filename: string, payload: unknown) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const downloadEngineeringState = () => {
    const exportedAt = new Date().toISOString();
    const bundle = buildEngineeringExportBundle(project, exportState, exportedAt);
    downloadArtifact(`${project.id}.engineering-state.json`, bundle.snapshot);
  };

  const downloadExportManifest = () => {
    const exportedAt = new Date().toISOString();
    const bundle = buildEngineeringExportBundle(project, exportState, exportedAt);
    downloadArtifact(`${project.id}.export-manifest.json`, bundle.manifest);
  };

  return (
    <section className="panel panel--preview" id={id}>
      <div className="panel__header">
        <div>
          <p className="section-label">Model preview</p>
          <h2>Real-time engineering workbench</h2>
          <p className="section-subtitle">
            Tune the load case, material, and bracket dimensions. The viewer updates live and the release status
            changes with the derived engineering margin.
          </p>
        </div>
        <div className="status-pill">{derived.validity}</div>
      </div>

      <div className="workbench-grid">
        <div className="workbench-stage" ref={mountRef} aria-label={`${project.name} live 3D viewer`} />
        <div className="workbench-panel">
          <div className="parameter-stack">
            <label className="parameter-control">
              <span>Width: {width} mm</span>
              <input type="range" min="120" max="320" step="5" value={width} onChange={(event: ChangeEvent<HTMLInputElement>) => setWidth(Number(event.target.value))} />
            </label>
            <label className="parameter-control">
              <span>Height: {height} mm</span>
              <input type="range" min="40" max="160" step="2" value={height} onChange={(event: ChangeEvent<HTMLInputElement>) => setHeight(Number(event.target.value))} />
            </label>
            <label className="parameter-control">
              <span>Thickness: {thickness} mm</span>
              <input type="range" min="8" max="36" step="1" value={thickness} onChange={(event: ChangeEvent<HTMLInputElement>) => setThickness(Number(event.target.value))} />
            </label>
            <label className="parameter-control">
              <span>Load: {load} N</span>
              <input type="range" min="1000" max="20000" step="100" value={load} onChange={(event: ChangeEvent<HTMLInputElement>) => setLoad(Number(event.target.value))} />
            </label>
            <label className="parameter-control">
              <span>Safety factor: {safetyFactor.toFixed(1)}x</span>
              <input
                type="range"
                min="1"
                max="4"
                step="0.1"
                value={safetyFactor}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSafetyFactor(Number(event.target.value))}
              />
            </label>
            <label className="parameter-control">
              <span>Material</span>
              <select value={material} onChange={(event: ChangeEvent<HTMLSelectElement>) => setMaterial(event.target.value as MaterialKey)}>
                {Object.entries(MATERIALS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="pilot-grid pilot-grid--compact">
            <article className="pilot-card">
              <span>FOS</span>
              <strong>{derived.fos.toFixed(2)}x</strong>
              <p>Target {derived.safetyFactor.toFixed(1)}x safety factor</p>
            </article>
            <article className="pilot-card">
              <span>Stress</span>
              <strong>{derived.stress.toFixed(1)} MPa</strong>
              <p>Material limit {derived.materialLimit} MPa</p>
            </article>
            <article className="pilot-card">
              <span>Mass</span>
              <strong>{derived.massKg.toFixed(2)} kg</strong>
              <p>Estimated solid volume {derived.volumeCm3.toFixed(0)} cm3</p>
            </article>
            <article className="pilot-card">
              <span>Deflection</span>
              <strong>{derived.deflection.toFixed(2)} mm</strong>
              <p>Reserve {derived.reserve.toFixed(2)}x over target</p>
            </article>
          </div>

          <div className="calc-grid">
            <article className="intent-card">
              <strong>Allowable stress</strong>
              <p>{derived.allowableStress.toFixed(1)} MPa</p>
              <div className="calc-result">Derived from the target safety factor</div>
            </article>
            <article className="intent-card">
              <strong>Allowable load</strong>
              <p>{derived.allowableLoad.toFixed(0)} N</p>
              <div className="calc-result">Load at the current target</div>
            </article>
            <article className="intent-card">
              <strong>Utilization</strong>
              <p>{(derived.utilization * 100).toFixed(1)}%</p>
              <div className="calc-result">Load divided by allowable load</div>
            </article>
          </div>

          <div className="export-readiness__decision">
            <span>Live status</span>
            <strong>{derived.validity}</strong>
          </div>

          <div className="workbench-export-stack">
            <button className="button button--primary workbench-export" type="button" onClick={downloadEngineeringState}>
              Download engineering state
            </button>
            <button className="button button--ghost workbench-export" type="button" onClick={downloadExportManifest}>
              Download export manifest
            </button>
          </div>
          <p className="workbench-export__note">
            The JSON export is canonical. STEP, STL, and GLB are listed in the manifest as placeholders because
            browser-only builds cannot produce true geometry files.
          </p>
        </div>
      </div>
    </section>
  );
}
