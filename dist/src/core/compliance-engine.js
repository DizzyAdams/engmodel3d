const resolveTargetValue = (context, target) => {
    if (target === "brief")
        return context.brief;
    if (target === "project")
        return context.project;
    return context.model.format === target ? context.model : undefined;
};
export class ComplianceEngine {
    evaluate(policy, context) {
        const findings = [];
        for (const rule of policy.rules) {
            const value = resolveTargetValue(context, rule.target);
            const passed = rule.validate(value);
            if (!passed) {
                findings.push({
                    code: rule.code,
                    message: rule.description,
                    severity: rule.severity,
                    target: rule.target,
                    path: rule.path,
                });
            }
        }
        return {
            policyId: policy.id,
            policyName: policy.name,
            checkedAt: new Date().toISOString(),
            ok: findings.every((finding) => finding.severity !== "error"),
            findings,
        };
    }
}
