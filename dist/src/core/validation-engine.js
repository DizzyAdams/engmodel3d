export class ValidationEngine {
    run(contract, subject) {
        const issues = [];
        for (const rule of contract.rules) {
            const result = rule.validate(subject);
            if (result instanceof Promise) {
                throw new Error(`Async validation rule not supported in sync engine: ${rule.code}`);
            }
            issues.push(...result);
        }
        return {
            ok: issues.every((issue) => issue.severity !== "error"),
            issues,
            checkedAt: new Date().toISOString(),
        };
    }
}
