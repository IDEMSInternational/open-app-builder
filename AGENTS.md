# open-app-builder — AI assistant project instructions

This file and the topic notes listed below are the **team's shared knowledge base** for AI coding assistants
(Claude Code loads it through `CLAUDE.md`; other tools read `AGENTS.md` directly). Two audiences use this repo:

- **Authors** — build app content in Google Sheets (templates, data lists, globals). Guide:
  `.claude/rules/role-author.md`.
- **Developers** — work on the Angular/Ionic app, components, converter and scripts. Guide:
  `.claude/rules/role-developer.md`.

**At the start of a session, work out which one you are talking to** from their request (sheets/tabs/flows
/"the app does not…" → author; code/components/parser/tests → developer). If unclear, ask once. A person can
skip the question with a one-liner such as `I am an author.` in their personal, gitignored instructions file.
Then follow the matching role guide.

## Topic notes (read the ones that match the task)

| File | Read when |
|---|---|
| `.claude/rules/role-author.md` | talking to an author; symptom → cause index and authoring gotchas |
| `.claude/rules/role-developer.md` | talking to a developer; commands, how to propose code changes |
| `.claude/rules/authoring-validation.md` | "the sheet says X but the app does nothing"; silent failures; adding validation |
| `.claude/rules/content-pipeline.md` | sheets → JSON → runtime, flow types, variables, duplicate flows, globals, launch actions |
| `.claude/rules/local-dev.md` | running the app locally, previewing or testing content fixes |
| `.claude/rules/sheet-sync-internals.md` | sync slowness, caches, download change detection, cell conversion |

Procedures: writing a deployment data codebook → `.claude/skills/deployment-codebook/SKILL.md`.

## Proposing and making changes

- **Never edit generated content** (`app_data` JSON, cached xlsx, `src/assets/app_data/`) as a fix — the next
  sync overwrites it. Durable content fixes go in the source Google Sheets. Never write to Google Sheets.
- **With authors: suggest, don't change.** The assistant is an explainer and proposer, not an editor — do not
  create, edit or delete files (including deployment repos in `.idems_app/deployments/` and this knowledge
  base), and do not work around this with shell commands. For every proposed change:
  1. Describe what is happening and why (which template/row/service/condition is involved).
  2. Give the change as a **copy-pasteable block** — for sheets: workbook (linked) + tab + row identifier +
     column + current → new value (see the author guide for the table format); for code a developer should
     make: a diff with the file path; for procedures: the exact command lines.
  3. State the expected effect and any side effects, and what to check afterwards.

  Commands you may run for authors when asked: read-only investigation (`git`, `gh` reads, `grep`, node
  scripts that only read), the app and the standard content workflows (`yarn start`, `yarn workflow …`).
  Anything else that changes files — hand the command to the human.
- **With developers:** make code changes as asked, following `role-developer.md`.
- **Always link:** Google Sheets URLs (from the JSON `_source` block), file paths as `path:line`, GitHub
  issues/PRs, and pages under `documentation/docs/`.

## What this repo is, and where things live

Angular/Ionic app whose screens, logic and content are authored in Google Sheets and compiled to JSON.
Deployment-specific content lives in `.idems_app/deployments/<name>/` — each is its **own git repo**,
gitignored here. Deployment-specific facts belong in that repo's own `AGENTS.md`/`CLAUDE.md`, not in this file.
Human docs: `documentation/docs/` (`authors/`, `components/`, `developers/`, `data/`).

## Content pipeline — five things to keep in mind on every content task

1. Google Sheets → xlsx (cached in `<deployment>/tasks/gdrive/outputs/sheets/`) → converter
   `packages/scripts/src/lib/app-data/convert/` → `<deployment>/app_data/sheets/*.json` → copied to
   `src/assets/app_data/` by `yarn workflow populate_src_assets` (also run by `yarn start`).
2. **Generated JSONs are artifacts.** Durable fixes go in the source Google Sheets; local JSON edits are
   overwritten by the next sync.
3. Every generated flow JSON ends with a `_source` block (workbook name, path, Google Sheets `url`). Use it
   to point people at the exact sheet + tab (tab name = `flow_name`).
4. **Parser cache trap:** `<deployment>/tasks/template/cache/FlowParserProcessor/` is keyed by md5 of the
   *input* plus a hardcoded `cacheVersion` in `flowParser.ts`. Converter code changes do NOT invalidate it —
   the human must delete that folder before regenerating, or output is stale. (`yarn workflow
   clear_workflow_cache` deletes the whole `tasks/` folder including the xlsx download cache — heavier.)
5. Actions (`trigger | action_id: args | params`) are parsed at **sync time**
   (`convert/utils/app-data-action.utils.ts`); the runtime only reads parsed JSON. Content authored against an
   unmerged parser feature silently degrades (an unknown trigger is rewritten to `click`).

Content commands: `yarn workflow deployment set [name]` (choose deployment), `yarn workflow sync_sheets
--skip-download` then `yarn workflow populate_src_assets` (regenerate from cached xlsx), `yarn workflow sync`
(full: download + convert + assets), `yarn start` (serve). Details: `.claude/rules/content-pipeline.md`.

## Local preview gotchas (everyone)

- On `localhost` in non-production builds, `hackSetDeveloperOptions()` in `src/app/app.component.ts` forces
  `user_mode = "false"` on every start, so onboarding (gated on `@fields.user_mode`) never launches. Open
  `http://127.0.0.1:<port>` instead.
- `@fields.*` persist in browser localStorage (`rp-contact-field.` prefix) per origin — clear site data or use
  a fresh origin to retest onboarding/first-launch flows.
- "Duplicate flows found" in `packages/scripts/logs/error.log` is usually pre-existing authoring noise (same
  `flow_name` in two workbooks resolves last-wins), not a blocker.

More: `.claude/rules/local-dev.md`.

## Working conventions

- Use `gh` to check whether a feature/PR is merged before debugging content that depends on it. Never create
  or comment on issues/PRs, and never commit/push, unless explicitly asked.
- Facts marked "as of <date>" were true then — verify against the code before relying on them.

## Maintaining this knowledge base (assistant: read this)

- When you learn something **durable and general** about this project — a gotcha, a silent failure, how a
  subsystem really works, a command that saves time — **propose** an addition to the matching topic note
  (or a new topic file, or a role guide) as a copy-pasteable snippet at the end of your answer, naming the
  target file and section. The human pastes and commits it (in a developer session, you may make the edit
  if asked). Prefer updating an existing entry over adding a
  duplicate; if it is a new symptom, also add a line to the symptom index in `role-author.md`.
- **Entry format:** one bullet, wrapped at ~110 characters, in this order:
  `**<symptom or rule, in bold>.** <cause, citing file/function> <fix or workaround> (verified|found YYYY-MM-DD: <example>)`.
- **Don't store facts that go stale on their own.** Cite files and function names, not line numbers (`path:line`
  links are fine in answers, not in these notes). Don't record whether a PR or issue is open or merged; link it
  and check its state live with `gh`. When a documented bug is fixed, update or remove its entry.
- **Write tool-neutral:** say "the assistant", not a product name. Tool-specific mechanics (permissions,
  auto-loading, memory) belong in that tool's file (`CLAUDE.md` for Claude Code), not here or in the topic notes.
- Multi-step procedures worth repeating go in `.claude/skills/<name>/SKILL.md`; list them under "Topic notes".
- Keep **out** of shared files: personal preferences, in-progress task state, credentials, private sheet
  IDs/links, anything specific to a single deployment (→ that deployment repo's instructions file).
- Keep this file under ~150 lines; move detail into topic notes (scoped with `paths:` frontmatter when the
  topic only matters for part of the tree) or skills.
