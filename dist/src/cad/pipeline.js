import { buildModelArtifact } from "./spec.js";
import { getParametricFeature } from "./parametric-library.js";
import { ValidationEngine } from "../core/validation-engine.js";
export function runCadPipeline(request) {
    const feature = getParametricFeature(request.profile);
    const artifact = buildModelArtifact({
        project: request.project,
        brief: request.brief,
        features: feature ? [feature] : [],
        constraints: request.constraints,
    });
    const validator = new ValidationEngine();
    const contract = {
        name: "cad-pipeline",
        subjectType: "cad-request",
        rules: [
            {
                code: "profile-required",
                description: "A generation profile must be selected.",
                validate: (subject) => subject.profile.trim().length > 0
                    ? []
                    : [
                        {
                            code: "missing-profile",
                            message: "Profile is required to generate an artifact.",
                            severity: "error",
                            path: "profile",
                        },
                    ],
            },
            {
                code: "brief-required",
                description: "Brief must contain useful instructions.",
                validate: (subject) => subject.brief.trim().length >= 12
                    ? []
                    : [
                        {
                            code: "brief-too-short",
                            message: "Brief must contain at least 12 characters.",
                            severity: "error",
                            path: "brief",
                        },
                    ],
            },
        ],
    };
    const validation = validator.run(contract, request);
    return {
        artifact,
        validation,
        exportTargets: ["cadquery", "openscad", "step", "glb", "ifc"],
    };
}
