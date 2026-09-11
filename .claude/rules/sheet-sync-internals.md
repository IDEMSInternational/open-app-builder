---
paths:
  - "packages/scripts/**"
  - "packages/@idemsInternational/gdrive-tools/**"
  - "packages/workflows/**"
---

# Sheet sync internals and performance (as of 2026-08-13; verify before relying on line-level claims)

Tracked upstream as https://github.com/IDEMSInternational/open-app-builder/issues/3605.

## Where the time goes (measured on a ~1,200-flow deployment, `sync_sheets --skip-download`, zero changes: ~8 min)

- **CLI cold start** can take minutes (18 s warm). ts-node has swc enabled; the eager module graph pulls
  `gdrive-tools` → the full `googleapis` index even for convert-only commands. Windows Defender scanning makes
  cold start much worse (a repo exclusion is a legitimate developer workaround). `translations_apply` spawns a
  second CLI.
- **Flow parse (~3 min for zero changes)** is I/O-bound cache bookkeeping:
  `JsonFileCache.add()` → `writeCacheContents()` (`convert/cacheStrategy/jsonFile.ts`) re-reads and md5s the
  *entire* cache folder and rewrites `_contents.json` on every add. `shouldUseCachedEntry` (`flowParser.ts`)
  returns false for all `data_pipe`/`generator` flows, so each of those triggers a remove+parse+add cycle →
  cost is O(#data_pipes × #cache_entries). The cache is never pruned (content-keyed orphans accumulate), so it
  compounds over months with no code change and hits generator-heavy deployments hardest.
- xlsx cache and translations are cheap; converter/gdrive-tools code had not changed for months when this
  was measured (non-cause).

Proposed fixes (not implemented as of 2026-08-13): incremental `_contents.json` update written once at the
end; dependency-aware cache keys for data_pipe/generator (hash input + referenced data_list hashes);
mark-and-sweep cache pruning; bundle the CLI / lazy-import gdrive-tools; write-if-changed instead of
emptyDir+rewrite for `sheet_json`/outputs/post-process.

## Sheets download change detection is fragile

Google Sheets exports have no md5, so gdrive-tools detects change by *exact equality* of the server
`modifiedTime` and the local file mtime (stamped with `utimesSync` after download). Anything that disturbs
mtimes (backup tools, some sync clients) causes a full re-export every sync. The gdrive cache is not part of
the content repo.

## Assets (secondary)

Canto restructure does emptyDir + full sequential re-copy each sync; remote asset packs delete+rewrite;
post-process stages a full corpus copy to temp; the corpus is md5-hashed several times per sync via
`generateFolderFlatMap`. A stat-based md5 cache (path,size,mtime) + diffing would remove most of it.

## Intermediate `sheet_json` is post-filter

`source_data/sheet_json/` is written *after* status filtering and duplicate resolution: drafts and shadowed
duplicate flows never reach it (only `_metadata.json` records all copies with `_source`). Don't treat it as
a complete mirror of the sheets.

## Cell conversion is not injective (`xlsx.utils.ts` `processCell`)

Bold/italic rich text becomes literal `<b>`/`<em>` in the cell value; %-formatted numbers become their
formatted text; dates arrive as raw Excel serials (ISO conversion happens later, per field); empty
cells/rows and all-empty columns are dropped. Sheet→JSON is many-to-one, so JSON cannot be a faithful
reverse source for regenerating sheets.
