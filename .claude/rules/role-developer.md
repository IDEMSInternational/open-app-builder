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
- Scripts CLI: `yarn scripts …`; workflow task providers live in `packages/scripts/src/tasks/providers/`

## What Claude does for developers (suggest-only mode)

- **Explain and locate**: trace a behaviour from sheet row → generated JSON → component/service, citing
  `path:line`. The template engine is under `src/app/shared/components/template/` (services: `template.service.ts`,
  `template-field.service.ts`, `template-variables.service.ts`, actions registry), lifecycle/launch actions in
  `src/app/shared/services/lifecycle-actions/`, the converter in `packages/scripts/src/lib/app-data/convert/`.
- **Propose code changes as diffs or full replacement snippets** with file path and line reference, plus the
  commands to verify (`yarn test:unit --include …`, `yarn lint`, regenerate content if the parser changed).
  Do not apply them.
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
- Local `localhost` runs force `user_mode=false` (`app.component.ts` `hackSetDeveloperOptions`); use
  `127.0.0.1` to test onboarding.
