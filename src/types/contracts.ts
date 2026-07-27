import type { ValidationIssue } from "./domain.js";

export interface ResultEnvelope<TData = undefined, TMeta extends Record<string, unknown> = Record<string, unknown>> {
  ok: boolean;
  data?: TData;
  error?: OperationError;
  meta: TMeta;
}

export interface OperationError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ValidationRule<TSubject = unknown> {
  code: string;
  description: string;
  validate(subject: TSubject): ValidationIssue[] | Promise<ValidationIssue[]>;
}

export interface ValidationContract<TSubject = unknown> {
  name: string;
  subjectType: string;
  rules: ValidationRule<TSubject>[];
}

export interface TaskEnvelope<TPayload = unknown> extends ResultEnvelope<TPayload> {
  taskId: string;
  role: string;
}
