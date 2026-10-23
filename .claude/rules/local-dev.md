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
   IDEMSInternational/open-app-builder` before debugging, and check that the trigger is in the parser's
   allowlist (`app-data-action.utils.ts`) on the branch the content was synced with. A new trigger usually
   needs both a component change and a parser change, so both must be merged and the content re-synced.

5. "Duplicate flows found" entries in `packages/scripts/logs/error.log` are usually pre-existing authoring
   noise (last-wins resolution, see `content-pipeline.md`), not blockers.

6. **`ng serve` can keep serving stale `src/assets` after a sync.** The dev server holds its own in-memory copy
   of assets; after `sync`/`populate_src_assets` some files update and others don't (seen 2026-09-11: 1 generated
   template stale while `contents.json` and the generator JSON updated). Likely cause: `replicateDir` back-dates
   copies to the source mtime (`fs.utimesSync`, `packages/shared/src/utils/file-utils.ts`), which can land inside an
   in-progress webpack rebuild's snapshot. Browser "Disable cache" does not help. Check by fetching
   `http://localhost:4200/assets/app_data/<path>` and comparing to disk; fix by restarting `yarn start`.

7. **`ng serve` binds to IPv6 `::1` only on Windows/Node ≥17,** so `127.0.0.1:4200` refuses connections. To use the
   `127.0.0.1` onboarding workaround (item 1), start with `yarn start --host 127.0.0.1`. (verified 2026-09-11)

<<<<<<< Updated upstream
8. **Testing a content fix without editing repo files or sheets:** re-run the converter's `TemplateParser` on the
   raw `<deployment>/tasks/template/sheet_json/template/<flow>.json` with the rows overridden (ts-node from
   `packages/scripts`, `NODE_PATH=packages/scripts/node_modules`), then serve that JSON to headless Chrome via
   CDP `Fetch.enable` interception of `*<flow>.json*`. Dynamic-data state can be seeded with
   `ng.getComponent(document.querySelector('plh-data-items')).dataItemsService.dynamicDataService.update(...)`.
   (verified 2026-08-19)
=======
8. **A Google Sheet whose name contains `:` (e.g. Drive's "Copy of X - October 20, 5:32 PM") cannot be synced on
   Windows.** The downloader writes `<name>.xlsx` and NTFS treats the colon as an alternate-data-stream
   separator: you get an empty file cut at the colon, with the real xlsx hidden in a stream (`dir /r` shows it).
   The converter loads nothing from that workbook, with no error; its flows are simply missing (seen as
   "data list not found" at runtime). Rename the sheet without `: \ / * ? " < > |`, delete the truncated file
   with `Remove-Item -LiteralPath`, and sync again. Linux CI is not affected. (verified 2026-10-21)

>>>>>>> Stashed changes
