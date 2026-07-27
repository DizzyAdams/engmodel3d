import { createId } from "../core/id.js";
export function buildModelArtifact(spec) {
    const featureLines = spec.features.map((feature) => {
        const values = Object.entries(feature.values)
            .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
            .join(", ");
        return `# ${feature.name}: ${feature.description}${values ? ` | ${values}` : ""}`;
    });
    return {
        id: createId("mdl"),
        name: `${spec.project.name} artifact`,
        format: "cadquery",
        source: [
            "# Auto-generated parametric artifact",
            `# Project: ${spec.project.name}`,
            `# Goal: ${spec.project.goal}`,
            `# Brief: ${spec.brief}`,
            ...featureLines,
        ].join("\n"),
        parameters: spec.constraints,
        metadata: {
            projectId: spec.project.id,
            kind: spec.project.kind,
            featureCount: spec.features.length,
        },
    };
}
