# Working with developers

Developers work on the app (`src/`), shared components (`packages/components/`), data models
(`packages/data-models/`), the sheet converter and CLI (`packages/scripts/`), workflows
(`packages/workflows/`) and the docs (`documentation/`). Upstream is `IDEMSInternational/open-app-builder`;
feature branches come off `master`. Deployment content repos are separate git repos under
`.idems_app/deployments/`.

Docs: `documentation/docs/developers/` (quickstart, `deployments.md`, `workflows.md`, `adding-components.md`,
`web-previews.md`, `error-logs.md`, …). Generated API docs via `yarn compodoc:serve`.

## Commands (verified 2026-08-18)

- `yarn start` — `yarn prepare` (populate `src/assets/app_data` from the active deployment) + `ng serve --open`
- `yarn workflow deployment set [name]` — choose the active deployment
- `yarn workflow sync_sheets --skip-download` → `yarn workflow populate_src_assets` — regenerate content
  from cached xlsx; `yarn workflow sync` for a full sync. Other workflows in `packages/workflows/src/`.
- `yarn test:unit` (karma), `yarn test:workspaces` (shared + scripts jest), `yarn test:e2e`, `yarn lint`,
  `yarn format` (prettier), `yarn build`
- One spec, headless, no watch: `yarn ng test --no-watch --browsers=ChromeHeadless --include=<path>`.
  `--include` resolves from `src/`, so specs under `packages/` need `../packages/…`; a `packages/…` path
  silently runs 0 specs. (verified 2026-11-05)
- Scripts CLI: `yarn scripts …`; workflow task providers live in `packages/scripts/src/tasks/providers/`

## What the assistant does for developers

- **Explain and locate**: trace a behaviour from sheet row → generated JSON → component/service, citing
  `path:line`. The template engine is under `src/app/shared/components/template/` (services: `template.service.ts`,
  `template-field.service.ts`, `template-variables.service.ts`, actions registry), lifecycle/launch actions in
  `src/app/shared/services/lifecycle-actions/`, the converter in `packages/scripts/src/lib/app-data/convert/`.
- **Make code changes as asked**, and give the commands to verify them (`yarn test:unit --include …`,
  `yarn lint`, regenerate content if the parser changed).
- **Keep parser and runtime in step**: a component that expects a new trigger/parameter needs a matching
  change in the converter (`app-data-action.utils.ts` trigger allowlist, `src/app/shared/components/template/utils/parameter-list.utils.ts` /
  `defineAuthorParameterSchema`, `template.parser.ts`), a `cacheVersion` bump in `flowParser.ts` (or a manual
  cache delete), and regenerated content before it can be seen in the app. Say so whenever a proposal touches
  either side.
- **Check upstream state** with `gh` (`gh pr view <n> --repo IDEMSInternational/open-app-builder`, `gh issue
  list …`) before assuming something is or isn't merged; link the PR/issue.
- **When a change is really an authoring change**, say so and hand back a sheet edit in the author format
  (`role-author.md`) instead of a code patch.

## Developer gotchas (as of 2026-08-18)

- Parser cache: `<deployment>/tasks/template/cache/FlowParserProcessor/` ignores converter code changes
  (`cacheVersion` constant in `flowParser.ts`); `data_pipe`/`generator` flows are never served from cache.
- Row-level parser hooks (`TemplateParser.qualityControlCheck`) don't run for cached flows;
  `FlowParserProcessor.postProcess` runs for all — see `.claude/rules/authoring-validation.md`.
- Converter `{errors, warnings}` are discarded in `packages/scripts/src/tasks/providers/template.ts`; CI
  content sync has no validation gate.
- `yarn workflow clear_workflow_cache` deletes the whole `<deployment>/tasks/` folder (including the xlsx
  download cache) — usually more than you want.
- Sheet-sync slowness is dominated by cache bookkeeping and CLI cold start, not the xlsx conversion —
  `.claude/rules/sheet-sync-internals.md`, upstream issue #3605.
- Local previews (`localhost` forces `user_mode=false`, persisted fields): see `AGENTS.md` → Local preview
  gotchas and `local-dev.md`.
- **A component's themable colours go at the top of its own stylesheet** as
  `$track: var(--my-component-track-color, var(--ion-color-primary-100));` and themes set
  `my-component-track-color` in their `$variable-overrides` (e.g. `text-bubble.component.scss`,
  `plh/progress-summary`). Don't add component defaults to `generate-theme.scss` or to `:root` in
  `variables.scss`: palettes are set on `[data-theme] body` (`theme-selectors.scss`), so a `:root` value
  can't refer to them. Global variables (spacing, font sizes, line-heights) do need a base value in
  `src/theme/variables.scss` rather than a fallback. (verified 2026-11-05: plh_progress_summary)
- **Markdown inserted with `[innerHTML]="… | markdown"` can't be styled from the component's SCSS**
  (emulated encapsulation), so the global `p` margin from `src/theme/_typography.scss` applies. For short
  labels inside a component, interpolate plain text (`{{ params().title }}`) as `plh_progress_bar` does,
  rather than reaching in with `::ng-deep`. (found 2026-11-05)
- **CSS entrance animations replay every time a page is shown again**, even though Ionic keeps the page
  alive (`IonicRouteStrategy` in `app.module.ts`, same DOM nodes): cached pages are hidden with
  `.ion-page-hidden { display: none }`, and `display: none` cancels CSS animations, so they restart on
  return. To play only on a real change, the component has to track that itself. (verified 2026-11-05:
  plh_progress_summary, footer navigation then back)
