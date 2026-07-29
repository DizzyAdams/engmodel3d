# Engineering Product Reset - Sprint Program

## Purpose
Create a coherent, high-trust engineering product that feels complete, serious, and usable.

## Note on scope
This plan groups the work into 15 executable sprint blocks. A literal 1500-sprint plan would not be actionable, so this uses a compact structure with enough granularity to drive implementation.

## Sprint 1 - Product spine
- Define the single primary user path.
- Reduce duplicate entry points.
- Keep only home, intake, workbench, and roadmap as primary surfaces.

Acceptance:
- A new user can identify the main workflow in under 10 seconds.

## Sprint 2 - Visual system reset
- Set the product direction for typography, spacing, and hierarchy.
- Replace decorative repetition with a console-like information density.
- Tighten color usage and section rhythm.

Acceptance:
- The interface reads as one product, not several stitched demos.

## Sprint 3 - Intake hardening
- Keep the brief intake functional.
- Ensure the downloadable brief is clean, useful, and scannable.
- Add missing context fields only if they reduce friction.

Acceptance:
- The intake produces a usable brief artifact every time.

## Sprint 4 - Workbench consolidation
- Keep one engineering workbench path.
- Ensure parameters, derived metrics, and validation are visible.
- Remove duplicate or experimental routes from the user journey.

Acceptance:
- The project page behaves like a single coherent workbench.

## Sprint 5 - Viewer quality
- Improve the 3D viewer's visual polish.
- Ensure fallback states are intentional.
- Verify resize, orbit, and load interactions.

Acceptance:
- The viewer feels like part of the product, not an add-on.

## Sprint 6 - Export integrity
- Keep JSON snapshot export canonical.
- Make the manifest explicit about placeholders.
- Prepare the contract for real STEP/STL/GLB generation.

Acceptance:
- Exports are consistent and honest about limitations.

## Sprint 7 - Engineering metrics
- Clarify stress, safety factor, mass, deflection, and load outputs.
- Present pass/warn/fail in a way engineers trust.
- Remove duplicate or conflicting computed values.

Acceptance:
- The metrics read like a real engineering check, not a gimmick.

## Sprint 8 - Navigation and IA
- Make the top navigation short and direct.
- Keep anchors focused on actionable sections.
- Remove redundant CTA labels.

Acceptance:
- The navigation accelerates work rather than creating choice overload.

## Sprint 9 - Design language
- Normalize card shapes, panel treatments, and surfaces.
- Create a single visual language for dashboard and workbench.
- Reduce “AI-generated” styling cues.

Acceptance:
- The UI feels intentionally designed and domain-specific.

## Sprint 10 - Product credibility
- Add stronger engineering-facing copy.
- De-emphasize marketing language.
- Make every section answer “what does the engineer do here?”

Acceptance:
- Each surface has a clear operator action.

## Sprint 11 - Platform readiness
- Verify build, deploy, and artifact generation.
- Remove tracked generated files.
- Keep the repository clean and reproducible.

Acceptance:
- `build` and deploy pass from a clean checkout.

## Sprint 12 - Backend export path
- Define the server-side geometry/export boundary.
- Plan for CAD kernel or exporter integration.
- Keep a clear contract between browser state and final outputs.

Acceptance:
- There is a known path to real STEP/STL/GLB export.

## Sprint 13 - Revision intelligence
- Keep version history visible and meaningful.
- Make comparison and delta inspection more obvious.
- Tie changes to engineering outcomes.

Acceptance:
- Users can see what changed and why it matters.

## Sprint 14 - QA and audit
- Check the site for broken flows.
- Review the top interactions for polish regressions.
- Audit responsiveness and fallback behaviors.

Acceptance:
- No obvious dead ends or broken interactions remain.

## Sprint 15 - Release control
- Prepare a final commit and deploy.
- Document the current limitation set.
- Leave the next build path obvious.

Acceptance:
- The product is shippable and the next upgrade path is clear.

## Execution Rules
- Do not add a new surface unless it removes friction.
- Prefer consolidation over more pages.
- If a feature is not truly functional, label it clearly.
- Keep the work aligned with engineering users, not generic SaaS users.

## Definition of done
- Home is concise and usable.
- Intake is functional.
- Workbench is real.
- Export is honest and structured.
- Visual design is coherent.
- Repo is clean.
- Deploy is current.
