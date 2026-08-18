---
paths:
  - "packages/scripts/**"
  - "packages/data-models/**"
  - "packages/components/**"
  - "src/app/shared/components/template/**"
---

# Silent-failure catalogue and validation hooks (as of 2026-08-12; verify before relying on line-level claims)

Useful when debugging "the sheet says X but the app does nothing", or when adding lint/validation.

## Things that fail silently

- **Unknown action trigger** → rewritten to `click` (`convert/utils/app-data-action.utils.ts`).
- **Unknown row type** → renders blank; the warning is commented out
  (`filter-display-component.pipe.ts`, `template-component.ts`).
- **Converter `{errors, warnings}` are discarded** in `packages/scripts/src/tasks/providers/template.ts`
  (only logged, never surfaced or gating). CI content sync
  (`.github/workflows/reusable-content-sync.yml`) has no validation gate.
- **`parameter_list` values truncate at the second colon** (`template.parser.ts` `parseParameterList`
  splits on `:` once); action args are also colon-split (URLs fragment). `_list`/`_collection` row-name
  conventions are parsed with `includes(";")`/`includes("|")` heuristics; shorthands are rewritten
  (`exit` → `emit | exit`).
- **`ACTION_ID_LIST`** (`packages/data-models/flowTypes.ts`) has no runtime consumers; several declared
  ids have no handler. Real handlers are registered at runtime across ~20 services via
  `templateActionRegistry.register`. Components emit free-form trigger strings while the parser's trigger
  allowlist is hardcoded.
- Only ~22 of ~70 components declare zod param schemas (`defineAuthorParameterSchema`,
  `parameter-list.utils.ts`); the rest read params ad hoc. `optimise_build` makes the valid component set
  deployment-specific.

## Pre-wired hooks for validation

- `TemplateParser.qualityControlCheck` (`template.parser.ts`) — row-level, currently empty; **skipped for
  cached flows**.
- `FlowParserProcessor.postProcess` (`flowParser.ts`) — runs on all flows including cached ones, so it is
  the cache-immune place for cross-flow checks.
- zod v4 is already a dependency.

## `app_data` cannot serve as a reverse source

Meta fields are removed, `@local.<row>` is rewritten to `this.value`, `display_group` variables are hoisted
(rows physically moved), names are auto-generated, and types are defaulted (empty → `set_variable`,
`template_group` → `template`). Treat generated JSON as compiled output.
