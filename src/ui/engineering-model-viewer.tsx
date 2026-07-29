"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  DoubleSide,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  GridHelper,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Shape,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type ExtrudeGeometryOptions,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";

import type { ProjectRecord } from "../server/mock-data";

type ViewerStatus = "loading" | "ready" | "unsupported" | "error";

type ViewerParameters = {
  baseLength: number;
  legHeight: number;
  depth: number;
  webThickness: number;
  holeSpacing: number;
  chamfer: number;
  rotation: number;
  color: string;
};

type EngineeringModelViewerProps = {
  project: ProjectRecord;
  id?: string;
};

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (next: number) => void;
};

const MM_TO_SCENE = 0.01;
const STEEL_DENSITY_G_PER_CM3 = 7.85;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseDimensions(dimensions: string) {
  const matches = dimensions.match(/[\d.]+/g);
  const values = matches?.map((value) => Number.parseFloat(value)).filter((value) => Number.isFinite(value)) ?? [];
  return values;
}

function getInitialParameters(project: ProjectRecord): ViewerParameters {
  const [rawLength = 220, rawHeight = 80, rawDepth = 40] = parseDimensions(project.dimensions);
  const baseLength = clamp(rawLength, 160, 360);
  const legHeight = clamp(rawHeight, 60, 180);
  const depth = clamp(rawDepth * 0.65, 16, 34);
  const webThickness = clamp(Math.round(Math.min(baseLength, legHeight) * 0.2), 18, 42);

  return {
    baseLength,
    legHeight,
    depth,
    webThickness,
    holeSpacing: clamp(Math.round(baseLength * 0.36), 48, Math.max(56, baseLength - 40)),
    chamfer: 1.2,
    rotation: -18,
    color: project.id === "cabinet-module" ? "#7c9bff" : "#7cf3ff",
  };
}

function supportsWebGL() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch {
    return false;
  }
}

function addCircularHole(shape: Shape, x: number, y: number, radius: number) {
  const hole = new Shape();
  hole.absarc(x, y, radius, 0, Math.PI * 2, false);
  shape.holes.push(hole);
}

function makeBuildingGeometry(parameters: ViewerParameters) {
  const baseLength = parameters.baseLength * MM_TO_SCENE;
  const legHeight = parameters.legHeight * MM_TO_SCENE;
  const depth = parameters.depth * MM_TO_SCENE;
  const webThickness = parameters.webThickness * MM_TO_SCENE;
  const chamfer = clamp(parameters.chamfer * MM_TO_SCENE, 0, Math.min(depth, webThickness) * 0.22);

  const body = new Shape();
  body.moveTo(0, 0);
  body.lineTo(baseLength, 0);
  body.lineTo(baseLength, legHeight * 0.82);
  body.lineTo(baseLength * 0.5, legHeight);
  body.lineTo(0, legHeight * 0.82);
  body.closePath();

  const extrudeOptions: ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: chamfer > 0,
    bevelSegments: 2,
    bevelThickness: chamfer,
    bevelSize: chamfer,
    steps: 1,
    curveSegments: 18,
  };

  const geometry = new ExtrudeGeometry(body, extrudeOptions);
  geometry.computeBoundingBox();

  const center = new Vector3();
  geometry.boundingBox?.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.computeVertexNormals();

  return geometry;
}

function disposeGeometry(geometry: Mesh["geometry"] | LineSegments["geometry"] | null | undefined) {
  if (geometry && "dispose" in geometry) {
    geometry.dispose();
  }
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function RangeControl({ label, value, min, max, step, unit, onChange }: RangeControlProps) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>{label}</span>
        <strong style={{ fontSize: 14, fontWeight: 700 }}>
          {value}
          {unit}
        </strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ width: "100%" }}
      />
    </label>
  );
}

export function EngineeringModelViewer({ project, id }: EngineeringModelViewerProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<Group | null>(null);
  const bodyMeshRef = useRef<Mesh | null>(null);
  const edgeMeshRef = useRef<LineSegments | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [status, setStatus] = useState<ViewerStatus>("loading");
  const [params, setParams] = useState<ViewerParameters>(() => getInitialParameters(project));

  useEffect(() => {
    setParams(getInitialParameters(project));
  }, [project.id]);

  const summary = useMemo(() => {
    const areaMm2 = parametersAreaMm2(params);
    const volumeMm3 = areaMm2 * params.depth;
    const volumeCm3 = volumeMm3 / 1000;
    const massKg = (volumeCm3 * STEEL_DENSITY_G_PER_CM3) / 1000;

    return {
      volumeCm3,
      massKg,
      aspectRatio: params.baseLength / Math.max(params.legHeight, 1),
      holePitchMm: params.holeSpacing,
    };
  }, [params]);

  const downloadStl = () => {
    const mesh = bodyMeshRef.current;
    if (!mesh) return;
    const data = new STLExporter().parse(mesh, { binary: true });
    downloadBlob(`${project.id}-${project.lastRevision}.stl`, new Blob([data], { type: "model/stl" }));
  };

  const downloadGlb = () => {
    const model = modelRef.current;
    if (!model) return;
    new GLTFExporter().parse(
      model,
      (result) => {
        const binary = result instanceof ArrayBuffer;
        const payload = binary ? result : JSON.stringify(result);
        downloadBlob(
          `${project.id}-${project.lastRevision}.glb`,
          new Blob([payload], { type: binary ? "model/gltf-binary" : "application/json" }),
        );
      },
      () => setStatus("error"),
      { binary: true },
    );
  };

  const downloadEngineeringJson = () => {
    const snapshot = {
      schema: "model3deng.engineering-viewer.snapshot",
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      limitation: "STEP remains pending until a CAD kernel or server-side STEP exporter is connected.",
      project: { id: project.id, name: project.name, revision: project.lastRevision },
      parameters: params,
      summary,
    };
    downloadBlob(
      `${project.id}-${project.lastRevision}.engineering.json`,
      new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json;charset=utf-8" }),
    );
  };

  useEffect(() => {
    if (!hostRef.current) {
      return;
    }

    if (!supportsWebGL()) {
      setStatus("unsupported");
      return;
    }

    const host = hostRef.current;
    let renderer: WebGLRenderer | null = null;
    let bodyMaterial: MeshStandardMaterial | null = null;
    let edgeMaterial: LineBasicMaterial | null = null;
    let orbit: OrbitControls | null = null;
    let cleanupResize: (() => void) | null = null;

    try {
      const scene = new Scene();
      const camera = new PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(4.8, 3.1, 5.6);
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.outputColorSpace = SRGBColorSpace;
      renderer.toneMapping = ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(new Color(0x000000), 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      host.innerHTML = "";
      host.appendChild(renderer.domElement);

      orbit = new OrbitControls(camera, renderer.domElement);
      orbit.enableDamping = true;
      orbit.dampingFactor = 0.08;
      orbit.enablePan = true;
      orbit.minDistance = 2.8;
      orbit.maxDistance = 12;
      orbit.maxPolarAngle = Math.PI * 0.49;
      orbit.target.set(0, 0.2, 0);

      const root = new Group();
      scene.add(root);

      const ambient = new HemisphereLight(0xd9f0ff, 0x1b2435, 1.5);
      scene.add(ambient);

      const keyLight = new DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(4, 7, 5);
      scene.add(keyLight);

      const accentLight = new DirectionalLight(0x7cf3ff, 0.9);
      accentLight.position.set(-5, 2.5, -4);
      scene.add(accentLight);

      bodyMaterial = new MeshStandardMaterial({
        color: new Color(params.color),
        metalness: 0.35,
        roughness: 0.38,
        side: DoubleSide,
      });
      edgeMaterial = new LineBasicMaterial({
        color: 0x9bb8ff,
        transparent: true,
        opacity: 0.85,
      });

      const bodyMesh = new Mesh(makeBuildingGeometry(params), bodyMaterial);
      bodyMesh.castShadow = false;
      bodyMesh.receiveShadow = false;
      const edgeMesh = new LineSegments(new EdgesGeometry(bodyMesh.geometry), edgeMaterial);

      root.add(bodyMesh);
      root.add(edgeMesh);

      const grid = new GridHelper(10, 20, 0x3b5376, 0x243347);
      grid.position.y = -1.25;
      const gridMaterial = grid.material as LineBasicMaterial | LineBasicMaterial[];
      if (Array.isArray(gridMaterial)) {
        gridMaterial.forEach((material) => {
          material.transparent = true;
          material.opacity = 0.32;
        });
      } else {
        gridMaterial.transparent = true;
        gridMaterial.opacity = 0.32;
      }
      scene.add(grid);

      const floor = new Mesh(
        new PlaneGeometry(12, 12),
        new MeshStandardMaterial({ color: 0x08111c, transparent: true, opacity: 0.3, roughness: 1, metalness: 0 }),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.28;
      scene.add(floor);

      modelRef.current = root;
      bodyMeshRef.current = bodyMesh;
      edgeMeshRef.current = edgeMesh;
      rendererRef.current = renderer;
      cameraRef.current = camera;
      controlsRef.current = orbit;

      const updateLayout = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;

        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height, false);
      };

      if (typeof ResizeObserver !== "undefined") {
        resizeObserverRef.current = new ResizeObserver(updateLayout);
        resizeObserverRef.current.observe(host);
        cleanupResize = () => {
          resizeObserverRef.current?.disconnect();
          resizeObserverRef.current = null;
        };
      } else {
        window.addEventListener("resize", updateLayout);
        cleanupResize = () => window.removeEventListener("resize", updateLayout);
      }

      const renderFrame = () => {
        orbit?.update();
        renderer?.render(scene, camera);
        animationFrameRef.current = window.requestAnimationFrame(renderFrame);
      };

      updateLayout();
      renderFrame();
      setStatus("ready");
    } catch (error) {
      console.error("Failed to initialize engineering model viewer", error);
      setStatus("error");
      host.innerHTML = "";
      if (renderer) {
        renderer.dispose();
      }
      if (bodyMaterial) {
        bodyMaterial.dispose();
      }
      if (edgeMaterial) {
        edgeMaterial.dispose();
      }
      if (orbit) {
        orbit.dispose();
      }
      cleanupResize?.();
      return;
    }

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      cleanupResize?.();
      controlsRef.current?.dispose();
      disposeGeometry(bodyMeshRef.current?.geometry);
      disposeGeometry(edgeMeshRef.current?.geometry);
      rendererRef.current?.dispose();
      bodyMaterial?.dispose();
      edgeMaterial?.dispose();
      host.innerHTML = "";
      rendererRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
      modelRef.current = null;
      bodyMeshRef.current = null;
      edgeMeshRef.current = null;
      resizeObserverRef.current = null;
    };
  }, []);

  useEffect(() => {
    const bodyMesh = bodyMeshRef.current;
    const edgeMesh = edgeMeshRef.current;
    const model = modelRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!bodyMesh || !edgeMesh || !model || !camera || !controls) {
      return;
    }

    try {
      const nextGeometry = makeBuildingGeometry(params);
      disposeGeometry(bodyMesh.geometry);
      disposeGeometry(edgeMesh.geometry);
      bodyMesh.geometry = nextGeometry;
      edgeMesh.geometry = new EdgesGeometry(nextGeometry, 20);
      bodyMesh.material.color.set(params.color);
      model.rotation.y = MathUtils.degToRad(params.rotation);
      controls.target.set(0, 0.16, 0);
      camera.updateProjectionMatrix();
    } catch (error) {
      console.error("Failed to update engineering model geometry", error);
      setStatus("error");
    }
  }, [params]);

  const renderFallback = status === "unsupported" || status === "error";
  const statusLabel =
    status === "loading"
      ? "Preparing WebGL scene"
      : status === "ready"
        ? "Live model active"
        : status === "unsupported"
          ? "WebGL unavailable"
          : "Scene error";

  return (
    <section className="panel panel--preview" id={id}>
      <div className="panel__header">
        <div>
          <p className="section-label">Model preview</p>
          <h2>Interactive engineering viewer</h2>
          <p className="section-subtitle">
            Orbit the building massing, change the project dimensions, and watch the 3D model rebuild in real time.
          </p>
        </div>
        <div className="status-pill status-pill--soft">{statusLabel}</div>
      </div>

      <div className="engineering-grid" style={{ alignItems: "stretch" }}>
        <article className="engineering-panel" style={{ display: "grid", gap: 12, minHeight: 520 }}>
          <div
            ref={hostRef}
            aria-label={`${project.name} live engineering model`}
            role="img"
            style={{
              position: "relative",
              minHeight: 420,
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid rgba(124, 243, 255, 0.12)",
              background:
                "radial-gradient(circle at 20% 20%, rgba(124, 243, 255, 0.14), transparent 32%), linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))",
            }}
          />
          {renderFallback ? (
            <div
              style={{
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.03)",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {status === "unsupported"
                ? "This browser cannot create a WebGL context. The rest of the project page still works, but the 3D preview falls back to static information."
                : "The 3D scene reported an error. Reload the page or use the engineering state JSON export while the visual preview is unavailable."}
            </div>
          ) : null}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Approx. volume</span>
              <strong style={summaryValueStyle}>{summary.volumeCm3.toFixed(1)} cm³</strong>
            </div>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Approx. mass</span>
              <strong style={summaryValueStyle}>{summary.massKg.toFixed(2)} kg</strong>
            </div>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Aspect ratio</span>
              <strong style={summaryValueStyle}>{summary.aspectRatio.toFixed(2)}:1</strong>
            </div>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Model depth</span>
              <strong style={summaryValueStyle}>{summary.holePitchMm} mm</strong>
            </div>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Rotation</span>
              <strong style={summaryValueStyle}>{params.rotation}°</strong>
            </div>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Project</span>
              <strong style={summaryValueStyle}>{project.id}</strong>
            </div>
          </div>
        </article>

        <article className="engineering-panel" style={{ display: "grid", gap: 14 }}>
          <div style={{ display: "grid", gap: 14 }}>
            <RangeControl
              label="Building width"
              value={params.baseLength}
              min={160}
              max={360}
              step={1}
              unit=" mm"
              onChange={(next) => setParams((current) => ({ ...current, baseLength: next }))}
            />
            <RangeControl
              label="Building height"
              value={params.legHeight}
              min={60}
              max={220}
              step={1}
              unit=" mm"
              onChange={(next) => setParams((current) => ({ ...current, legHeight: next }))}
            />
            <RangeControl
              label="Building depth"
              value={params.depth}
              min={16}
              max={40}
              step={1}
              unit=" mm"
              onChange={(next) => setParams((current) => ({ ...current, depth: next }))}
            />
            <RangeControl
              label="Roof profile"
              value={params.webThickness}
              min={18}
              max={48}
              step={1}
              unit=" mm"
              onChange={(next) => setParams((current) => ({ ...current, webThickness: next }))}
            />
            <RangeControl
              label="Facade rhythm"
              value={params.holeSpacing}
              min={48}
              max={Math.max(64, params.baseLength - 48)}
              step={1}
              unit=" mm"
              onChange={(next) => setParams((current) => ({ ...current, holeSpacing: next }))}
            />
            <RangeControl
              label="Chamfer"
              value={params.chamfer}
              min={0}
              max={3}
              step={0.1}
              unit=" mm"
              onChange={(next) => setParams((current) => ({ ...current, chamfer: next }))}
            />
            <RangeControl
              label="Rotation"
              value={params.rotation}
              min={-180}
              max={180}
              step={1}
              unit="°"
              onChange={(next) => setParams((current) => ({ ...current, rotation: next }))}
            />
            <label style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>Material tone</span>
                <strong style={{ fontSize: 14, fontWeight: 700 }}>
                  {params.color === "#7cf3ff" ? "Aqua" : params.color === "#7c9bff" ? "Indigo" : "Steel"}
                </strong>
              </div>
              <select
                value={params.color}
                onChange={(event) => setParams((current) => ({ ...current, color: event.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(255, 255, 255, 0.04)",
                  color: "var(--text)",
                }}
              >
                <option value="#7cf3ff">Aqua</option>
                <option value="#7c9bff">Indigo</option>
                <option value="#78f4b9">Mint</option>
                <option value="#d5dbea">Steel</option>
              </select>
            </label>
          </div>

          <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(124, 243, 255, 0.12)", background: "rgba(124, 243, 255, 0.05)", lineHeight: 1.6 }}>
            Drag inside the viewport to orbit the part. Scroll to zoom. Every slider mutation rebuilds the solid and
            updates the mass estimate immediately.
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Target format</span>
              <strong style={summaryValueStyle}>{project.exportTarget}</strong>
            </div>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Last revision</span>
              <strong style={summaryValueStyle}>{project.lastRevision}</strong>
            </div>
            <div style={summaryCardStyle}>
              <span style={summaryLabelStyle}>Validation state</span>
              <strong style={summaryValueStyle}>{project.validationState}</strong>
            </div>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="button button--primary" type="button" onClick={downloadStl} disabled={status !== "ready"}>
                Download STL
              </button>
              <button className="button button--ghost" type="button" onClick={downloadGlb} disabled={status !== "ready"}>
                Download GLB
              </button>
              <button className="button button--ghost" type="button" onClick={downloadEngineeringJson}>
                Download JSON
              </button>
            </div>
            <small style={{ color: "var(--muted)", lineHeight: 1.5 }}>
              STL and GLB are generated from the live mesh. STEP remains a governed handoff item until a CAD kernel is connected.
            </small>
          </div>
        </article>
      </div>
    </section>
  );
}

function parametersAreaMm2(parameters: ViewerParameters) {
  const safeThickness = Math.min(parameters.webThickness, Math.max(Math.min(parameters.baseLength, parameters.legHeight) * 0.45, 0));
  const bodyAreaMm2 = parameters.baseLength * safeThickness + parameters.legHeight * safeThickness - safeThickness * safeThickness;
  const holeRadiusMm = clamp(safeThickness * 0.28, 0.75, safeThickness * 0.38);
  const holeAreaMm2 = Math.PI * holeRadiusMm * holeRadiusMm;
  return Math.max(bodyAreaMm2 - holeAreaMm2 * 3, 0);
}

const summaryCardStyle: CSSProperties = {
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  background: "rgba(255, 255, 255, 0.03)",
};

const summaryLabelStyle: CSSProperties = {
  display: "block",
  color: "var(--muted)",
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const summaryValueStyle: CSSProperties = {
  display: "block",
  marginTop: 8,
  fontSize: 16,
  lineHeight: 1.4,
};
