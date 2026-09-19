---
name: deployment-codebook
description: Author a data codebook (xlsx) documenting the server-synced app data of an open-app-builder deployment — dynamic data lists, contact fields, user disaggregation — for data analysts. Use when asked to document, inventory or explain the data a deployment writes.
---

# Deployment data codebook

A codebook documents, for analysts, every field and dynamic data-list column the app writes to the server.
Work from `<deployment>/app_data/sheets/` (the generated JSONs), tracing each field back to the template
rows that write it. Server-side/RapidPro semantics are not derivable from the repo — ask the team.

## Output format (3 tabs)

**`dynamic data lists`** — `Data list name | Column name | Type | Potential values | Interpretation | Sheet link`.
One header row per list (only `Data list name` filled), then one row per column. Dynamic column patterns in
brackets, e.g. `[module_id]`, `completed_[group name]`. A column may appear twice when its meaning depends on
another column (annotate `[if type is X]` in Interpretation). `Potential values` = `;`-separated examples.

**`contact fields`** — `Contact field name | Type | Example value | Potential values | Interpretation | Comment | Sheet link`.
Types: string, number, boolean, timestamp, list of timestamps.

**`user disaggregation`** — `User description | platform | operatingSystem | isVirtual | Example app_user_id`.
Boilerplate rows (fill example ids per deployment): Appetize Android (android/android/true); Appetize iOS
(ios/ios/true); Apple App Store (ios/ios/false); Google Play (android/android/false); Web preview on Android
phone (web/android/false); Web preview Windows regular (web/windows/false); Web preview Windows
responsive/Android (web/android/false); Web preview Windows iPhone (web/ios/false); Web preview on iPhone
(web/ios/false); Web preview on Mac (web/mac/false). Purpose: let analysts filter test users
(`isVirtual: true`, web previews).

## System contact fields (written by app code, same in every deployment)

`_auth_user_id` (string; several `_app_user_id`s sharing one `_auth_user_id` = same person on several devices
→ take the most recent `_server_sync_latest`), `_app_first_launch` (timestamp), `_app_language` (e.g. `gb_en`),
`_app_user_id` (device uuid), `_app_version`, `_content_version`, `_deployment_name`, `_server_sync_latest`
(timestamp).

## Workflow (4 passes)

1. **Inventory (scripted).** Grep `set_field: ([a-zA-Z_][a-zA-Z_0-9]*)` across all JSONs for static field
   writes. Then hunt the ones the regex misses: dynamic names (`set_field: @local…`, versioned prefixes such
   as `terms_@global…`), fields written in calculation templates, `declare_field_default` rows in globals,
   data lists written at runtime (grep the list name across `data_list/`), seed schemas from data-list JSONs.
2. **Interpretation.** For each field/column, find the rows that write it and quote the question text and
   answer options the user sees. Watch for overloaded columns (meaning depends on a `type` column), implicit
   foreign keys between lists (document both ends and their types — mismatches happen), and near-duplicate
   flags (e.g. `archived` vs `hidden`).
3. **Classification (with the user).** Present the full inventory; jointly mark ephemeral UI state
   (`current_*`, labels) vs analyst-relevant (onboarding flags, user type/mode for test filtering, data blobs).
4. **Output.** Write the xlsx. SheetJS is available under `packages/scripts/node_modules/xlsx` (not at repo
   root) but cannot write styles; install `exceljs` in a scratch folder if styling is wanted. Fill `Sheet link`
   from the `_source.url` of the relevant generated JSON.

Common gaps in first drafts: partially documented lists, missing types on id/FK columns, empty `Sheet link`
column, undocumented onboarding/user-mode flags. Check for these before delivering.
