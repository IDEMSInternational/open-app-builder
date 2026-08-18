# Local development gotchas (verified Aug 2026)

1. **Onboarding never starts on `localhost`.** `hackSetDeveloperOptions()` in `src/app/app.component.ts`
   forces `user_mode = "false"` whenever `location.hostname === "localhost"` and the build is not production
   — on every startup. All onboarding launch actions require `@fields.user_mode`, so onboarding is silently
   skipped; clearing storage/incognito does not help. Workaround: open `http://127.0.0.1:<port>` (different
   hostname *and* a fresh origin). A production build also bypasses it.

2. **Fields persist across restarts.** `@fields.*` live in localStorage (`rp-contact-field.` prefix) per
   origin. Flags like `onboarding_*_completed` latch permanently once set — clear site data or use a fresh
   origin to retest.

3. **After switching branches that touch the converter/parser, regenerate content:** delete
   `<deployment>/tasks/template/cache/FlowParserProcessor/` (cache version is rarely bumped on feature
   branches → stale hits), then `yarn workflow sync_sheets --skip-download` and
   `yarn workflow populate_src_assets`. Do not use `clear_workflow_cache` for this — it deletes the whole
   `tasks/` folder including the xlsx download cache.

4. **Content authored against an unmerged feature looks "broken" on master.** Because actions are parsed at
   sync time, a sheet using a trigger/parameter that only an open PR's parser understands will be silently
   parsed as `click` on master. Check the PR/branch state with `gh pr view <n> --repo
   IDEMSInternational/open-app-builder` before debugging. Example (as of 2026-08-18, PR #3580 still open):
   `plh_progress_bar` `on_progress`/`completed` triggers exist only on branch
   `feat/progress-bar-progress-action-trigger`, which changes both
   `packages/components/plh/progress-bar/progress-bar.logic.ts` and the parser.

5. "Duplicate flows found" entries in `packages/scripts/logs/error.log` are usually pre-existing authoring
   noise (last-wins resolution, see `content-pipeline.md`), not blockers.
