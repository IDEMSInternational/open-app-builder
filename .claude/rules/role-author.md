# Working with content authors

Authors build the app in Google Sheets: `template` tabs (pages of typed rows/components), `data_list` tabs,
`global` tabs, plus the workbook `contents` sheet that registers tabs. They do not edit code. Their sheets
are downloaded and compiled to JSON by the sync (see `CLAUDE.md` → Content pipeline); previews and released
apps are built from that JSON, usually via the deployment repo's CI content sync.

Docs to point authors at: `documentation/docs/authors/` (quickstart, `actions.md`,
`template-component-parameter-list.md`, `local-sheets.md`, `translations.md`, `advanced/`) and
`documentation/docs/components/` (per-component parameters).

## What Claude does for authors

- **Explain what a template/flow does**: read the generated JSON in `<deployment>/app_data/sheets/`
  (templates, data_list, global) and narrate it in author terms — rows, conditions, actions, which fields and
  globals gate what, what pop-ups/launch actions fire and in which order.
- **Find the sheet to edit**: use the `_source` block at the end of the flow JSON (workbook, Google Sheets
  `url`, tab = `flow_name`). If a flow exists in several workbooks, `_source` names the winning one; mention
  the shadowed copies (`source_data/sheet_json/_metadata.json`) so nobody edits the wrong workbook.
- **Diagnose "the app doesn't do X"**: check, in this order — is the row's `condition` true (which
  `@fields`/`@global` values does it need)? is a field persisted from an earlier session (localStorage)? is
  the flow duplicated and shadowed (last-wins by `sheets_folders` order)? do several global sheets declare
  the same constant (later wins)? does the feature depend on a parser/component change that is not merged
  (`gh pr view …`)? was the content regenerated after the sheet edit (sync + cache)?
- **Propose sheet edits, never JSON edits**, in this format so it can be applied by copy-paste:

  ```
  Workbook: <name> — <Google Sheets link>      Tab: <flow_name>
  | Row (name / type / position)   | Column        | Current            | New                       |
  |--------------------------------|---------------|--------------------|---------------------------|
  | button_continue (button, ~r42) | action_list   | click | go_to: home | click | go_to: onboarding |
  Why: … Expected effect: … Side effects: … Then: re-sync (or wait for CI) and check <where>.
  ```

  Identify rows by their `name` column and type (row numbers in the cached xlsx can be read with a small
  read-only node/SheetJS script from `packages/scripts/node_modules/xlsx`; they are approximate once the sheet
  is edited). New rows: give the full row as tab-separated cells so it pastes into the sheet.
- **Explain sync and preview**: what `yarn workflow sync_sheets --skip-download` + `populate_src_assets`
  do, when the parser cache must be deleted, why "Duplicate flows found" is usually noise, and the localhost
  `user_mode` trap (`CLAUDE.md` → Local preview gotchas).
- **Route code asks to developers**: if the fix needs a new component parameter, action, or parser change,
  say so plainly and write the ask for a developer (what, where in the code, why) instead of hand-waving a
  sheet workaround.

## Authoring gotchas worth telling authors proactively (as of 2026-08-12)

- A `parameter_list` value is cut at its **second colon** (`key: value:more` loses `:more`); action args are
  colon-split too (URLs fragment).
- An unknown row `type` renders **blank** with no warning; an unknown action trigger is silently treated as
  `click`.
- Bold/italic in a cell becomes literal `<b>`/`<em>` in the value; %-formatted numbers become text; dates
  become Excel serial numbers unless the column is a known date field; empty rows/columns are dropped.
- Row names ending in `_list`/`_collection` are parsed with `;` / `|` heuristics — stray separators change
  meaning.
- The same `flow_name` in two workbooks: **last workbook wins** by `sheets_folders` order in the deployment
  `config.ts`; a copied tab in the deployment workbook deliberately overrides the shared one.
- Field defaults (`declare_field_default`) only apply if the field has never been set on that device/origin.
- **`emit: completed` / `emit: uncompleted` at the root of a `nav_stack` template goes nowhere.** The nav-stack renders the template with no parent row and no `emittedValue` binding, so nothing listens. A template that must work both nested (parent row handles the emit) and as a nav-stack root can handle its own emit with an `update_action_list` row — its actions are merged into the container's own row as `_self_triggered`, e.g. `uncompleted | nav_stack: close_top`. Condition that row so it only applies in the standalone case: when the template *is* nested, `update_action_list` merges into the parent's row, which usually already carries the same handler, and you close one stack too many. (verified 2026-09-09)
- **A `nav_stack` modal does not refresh the page behind it when it closes.** Nav-stack dismissal only removes the modal (`src/app/feature/nav-stack/nav-stack.service.ts`); the automatic re-render `nav_resume` emit only happens on router navigation (`go_to`/`pop_up`, see `template-nav.service.ts` `handleQueryParamChange`). So any `set_variable` on the underlying page (e.g. a `@calc()` over a `@field.*` that the modal changed) stays stale until a manual refresh. Workaround: on the row that opens the stack, add `click | emit: force_reload` **after** `click | nav_stack: open` — that row is inside the underlying page's container chain, so the reload reaches the top-most template and happens invisibly behind the modal. Ordering matters: put it last, or the re-render destroys the row before the modal opens. Not usable: `emit: force_reload` from inside the modal (its container has no parent, so it only reloads itself), or `emit: force_reprocess` anywhere (it deliberately skips `set_variable` rows).(verified 2026-09-09)

