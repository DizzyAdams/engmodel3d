export function createViewerSceneState(artifact, exportPlan) {
    return {
        artifactId: artifact.id,
        format: artifact.format,
        meshState: "ready",
        selectedLayer: "primary-solid",
        cameraMode: "orbit",
        exportPlan,
    };
}
