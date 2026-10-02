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
- **A `nav_stack` modal does not refresh the page behind it when it closes.** Nav-stack dismissal only removes the modal (`src/app/feature/nav-stack/nav-stack.service.ts`); the automatic re-render `nav_resume` emit only happens on router navigation (`go_to`/`pop_up`, see `template-nav.service.ts` `handleQueryParamChange`). So any `set_variable` on the underlying page (e.g. a `@calc()` over a `@field.*` that the modal changed) stays stale until a manual refresh. Workaround: on the row that opens the stack, add `click | emit: force_reload` **after** `click | nav_stack: open` — that row is inside the underlying page's container chain, so the reload reaches the top-most template and happens invisibly behind the modal. Ordering matters: put it last, or the re-render destroys the row before the modal opens. Not usable: `emit: force_reload` from inside the modal (its container has no parent, so it only reloads itself), or `emit: force_reprocess` anywhere (it deliberately skips `set_variable` rows).(verified 2026-09-09)   If the fields only change *later inside the modal* (so a reload at open is too early), latch on the
  underlying page instead: the opening row ends with `click | emit: completed` (not `force_reload`, which would
  reset the latch), the parent row handles `completed | set_local: <x>_opened: true`, and the page's
  conditions use that local. It resets on the next redraw, when everything is recalculated from fields.
  (used 2026-09-25: kids_teens_mx home check-in button, po_opened)
- **`@local`/`@fields` are not resolved in action parameters whose name starts with `_`**, except `_id`,
  `_index`, `_first`, `_last` (`shouldEvaluateField`, `template-variables.service.ts`;
  `TEMPLATE_ROW_ITEM_METADATA_FIELDS`, `flowTypes.ts`). So `set_data | _list_id: @local.x` passes the
  literal text `@local.x`, set_data throws "[data_list] … not found", and the rest of that action list
  never runs. Use a fixed list name (or one row per list). (verified 2026-09-25: gen_stack_module_start_at_id
  check-in hand-over)


- **`click | …` on a `template` row never fires.** Actions on a nested-template row only run when the child template emits a value matching the trigger (`template-action.service.ts`, `emit` handler). Use the child's emitted values (e.g. `completed` / `uncompleted` from nav-button templates). (verified 2026-09-14)

- **`text_area` shows the row's `value` column, not a `value:` parameter.** `parameter_list: value: …` is silently ignored; pre-fill with `value: @fields.x` in the value column. (verified 2026-09-14)

- **Never use `|` inside an `action_list` cell's arguments, including `||` in `@calc(...)`.** Each action is
  split on every `|` (`app-data-action.utils.ts` `parseAppDataActionString`), so
  `click | set_field: x: @calc(@local.a || '')` saves the literal text `@calc(<value of a>` with no error.
  Use a ternary instead (`@local.a ? … : …`), or compute the value in a `set_variable` row and pass
  `@local.<name>`. `||` is fine in `value`/`condition` cells. (verified 2026-09-16)
- **A deployment copy of a shared tab only overrides it if the `flow_name` matches exactly.** A near-miss
  (`app_menu_global` vs shared `app_menu_globals`) loads *both* tabs; for globals, the later one in
  `contents.json` order (alphabetical) wins per constant, so the shared English values silently beat the
  translated copy. Check with: same constant names declared in two global tabs from different workbooks.
  (found 2026-09-16: kids_teens_mx `app_menu_global`, `auth_global`)
- **`update_action_list` = a template adding actions to its own container row.** Its `action_list` entries
  are appended to the container's row as `_self_triggered` (tagged by row name, so re-processing replaces
  rather than duplicates them) and run in the child template's own queue when it emits the matching value
  (`template-row.service.ts` `update_action_list` case; `template-action.service.ts` emit handler). Triggers
  are emitted values (`completed`, `uncompleted`, custom emits), not `click`. Not documented under
  `documentation/docs/authors/`. (verified 2026-09-18)
  - **Notification tap actions only support globally registered actions, and one bad action stops the rest.**
  `action_list` on `notification: create` runs through `TemplateActionRegistry.trigger`
  (`src/app/feature/notification/notification.service.ts` `triggerNotificationActions`), not the template
  action queue. `emit` (`force_reload`, `completed`, …), `set_local` and other container actions are not
  registered: the registry throws `No handler registered for action_id`, and the remaining actions in the list
  do not run. Use `set_field`, `set_data`, `add_data`, `go_to`, `nav_stack` etc., and keep values static,
  since they may be evaluated when the notification is created rather than when it's tapped. The variable
  holding the list must be named `…_action_list` to parse. (verified 2026-09-21)
- **A `==content_list==` without its header row silently drops the whole workbook.** The first row is read as
  the column names (`flow_type`, `flow_subtype`, `flow_name`, `status`, …); if it's deleted, no row matches and
  every tab in that workbook is skipped with nothing in `packages/scripts/logs/error.log`. The app then fails at
  runtime with `[template] "<name>" not found`. Easy to do when deleting rows at the top of the tab.
  (found 2026-09-25: PLH proximal outcomes, 20 flows missing)
- **`set_variable` values are evaluated as JavaScript**, so `value: @local.a >= @global.b` stores a real
  true/false, not text, and `!@local.x` in a condition negates it correctly. References are swapped for
  `this.local.…` and the whole expression is evaluated; plain-text substitution is only the fallback when
  that fails (e.g. mixed text like `Score: @local.x`) (`template-variables.service.ts`
  `parseContextExpression`). No `@calc()` wrapper is needed for comparisons. (verified 2026-09-25)
- **A `display_group` without `style` is a row.** The default is `style: row`
  (`display-group.component.ts`), so wrapping a `header` and a page in a display group puts them side by side,
  and every child after the first gets a `1em` left margin (`display-group.component.scss`). Add
  `parameter_list: style: column` to any display group used just to show/hide a stack of rows.
  (found 2026-09-25: V3 article_wrap `is_relax`, white space left of the module pause)


