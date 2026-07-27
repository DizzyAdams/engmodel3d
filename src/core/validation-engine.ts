import type { ValidationContract } from "../types/contracts.js";
import type { ValidationIssue, ValidationReport } from "../types/domain.js";

export class ValidationEngine {
  run<TSubject>(contract: ValidationContract<TSubject>, subject: TSubject): ValidationReport {
    const issues: ValidationIssue[] = [];

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
