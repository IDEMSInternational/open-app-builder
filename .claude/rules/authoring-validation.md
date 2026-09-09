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
-  **A `parameter_list` value that happens to start with `@item.` crashes the whole flow's compile, silently.**
  `handleSpecialFieldTypes()`'s `shouldSkip` check (`convert/processors/flowParser/parsers/default.parser.ts`)
  skips the `_list`→array split for any string field starting with `@item.` — intended for pure item-array
  references like `action_list: @item.action_list`, but it also matches a bare conditional-display expression
  authored in `parameter_list` (e.g. `@item.row_index != @local.last_page_index`). The still-a-string value then
  reaches `TemplateParser.parseParameterList()` (`template.parser.ts`), which unconditionally calls `.forEach()`
  on it and throws `TypeError: parameterList.forEach is not a function`. Because converter `{errors, warnings}`
  are discarded, **the entire containing template silently fails to compile** and is missing from
  `app_data/sheets/contents.json` — any `go_to`/reference to it fails at runtime with "template ... not found".
  The row named in `packages/scripts/logs/error.log` is misleading: it's the top-level row in scope in
  `DefaultParser.run()`'s catch, not the actual nested row that failed — grep the log entry's `flow_name`
  instead and check every row for a `parameter_list` value that reads like a condition.
  **Real fix**: conditional row display has a dedicated `condition` column (`FlowTypes.TemplateRow.condition`,
  `flowTypes.ts`) — a bare `@item.`/`@local.`/`@fields.` expression belongs there, not in `parameter_list`.
  Example (found 2026-08-27): `proximal_outcome_checkin` tab in `PLH proximal outcomes.xlsx` (kids_teens_mx) —
  rows `icon_checkin`/`icon_progress`/`title_checkin`/`title_progress` had their condition in `parameter_list`.

- **An action list that writes a field its own (or a sibling's) condition derives from will invalidate that
  condition before the next row renders.** `set_field`, `set_local`, `set_self` and `trigger_actions` trigger
  exactly one full row reprocess, and it runs *after the entire action queue drains*
  (`processActionQueue` → `processRowUpdates`, `template-action.service.ts`). On that reprocess, ordinary
  `set_variable` rows are recomputed from their `_dynamicFields`; only values written via `set_local` latch,
  because `setLocalVariable` deletes `_dynamicFields.value` first. So a "is it time to do X?" variable derived
  from a timestamp, combined with an action list that stamps "X last done = now", is false by the time the
  follow-on row's condition is evaluated — the branch you expect never appears, emits nothing, and anything
  chained off it (pop-ups, navigation) silently never fires. Action ordering does not help, since the reprocess
  happens once at the end. **Fix:** gate the follow-on row on latched state (a `set_local` flag set in the same
  list) rather than on the recomputed expression, and write "last done" timestamps at the *end* of the flow
  they describe, not the start — otherwise abandoning the flow still marks it done.
  Example (found 2026-09-09): a module-completion action list set `prox_7d_last_ts: @calc(now())` while the
  follow-on check-in row was gated on `days_since >= frequency`; the check-in never rendered.

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
