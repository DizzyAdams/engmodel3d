const targets = {
    cadquery: { format: "cadquery", filename: "model.py", mimeType: "text/x-python" },
    openscad: { format: "openscad", filename: "model.scad", mimeType: "text/plain" },
    ifc: { format: "ifc", filename: "model.ifc", mimeType: "application/octet-stream" },
    glb: { format: "glb", filename: "model.glb", mimeType: "model/gltf-binary" },
    step: { format: "step", filename: "model.step", mimeType: "application/step" },
};
export function getExportTarget(format) {
    return targets[format];
}
export function listExportTargets() {
    return Object.values(targets);
}
export function buildExportPlan(artifact) {
    const entries = listExportTargets().map((target) => {
        const enabled = target.format === artifact.format || target.format !== "cadquery";
        const reason = target.format === artifact.format
            ? "Primary delivery format emitted by the current pipeline."
            : "Supported downstream format available in the delivery catalog.";
        return { target, enabled, reason };
    });
    return {
        artifactId: artifact.id,
        entries,
    };
}
