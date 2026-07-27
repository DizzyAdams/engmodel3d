import type { ModelFormat, PrimitiveValue } from "../types/domain.js";

export interface ModelArtifact {
  id: string;
  name: string;
  format: ModelFormat;
  source: string;
  parameters: Record<string, PrimitiveValue>;
  metadata: Record<string, PrimitiveValue>;
}

export interface ExportTarget {
  format: ModelFormat;
  filename: string;
  mimeType: string;
}

