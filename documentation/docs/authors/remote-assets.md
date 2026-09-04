# Remote Assets

Remote assets let a deployment ship large media (images, audio, video) **outside** the app bundle and
fetch it on demand, instead of every install carrying files that most users may never see. Assets are
grouped into named **asset packs** hosted in cloud storage. A template asks for a pack, the app
fetches it, and from that point the assets in it resolve exactly like bundled ones.

!!! tip "Where to start"

    Using packs from templates: [Referencing remote assets](#referencing-remote-assets-in-templates)
    and [Downloading asset packs](#downloading-asset-packs).
    Setting a deployment up: [Defining asset packs](#defining-asset-packs),
    [Uploading](#uploading-asset-packs) and [Deployment and storage setup](#deployment-and-storage-setup).

## How it works

At startup the app knows only about its bundled assets. Downloading a pack merges that pack's assets
into the same lookup the bundled ones use, so an author writes `images/welcome.png` without needing to
know whether that file shipped in the app or arrived from a pack.

What "downloading" means depends on the platform:


| Platform      | Behaviour                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Android / iOS | Each file in the pack is fetched and saved to the device. Interrupted downloads resume on the next app launch, skipping files already saved |
| Web           | No files are saved. The pack's assets are pointed at the storage provider's CDN and streamed by the browser                                 |


!!! important

    A pack's assets are unavailable on **both** platforms until a template has run an `asset_pack`
    download action for it at least once — on web that action rewrites the asset paths to CDN URLs
    rather than transferring files. Only the file storage and resume behaviour is native-only.

## Referencing remote assets in templates

Nothing special is needed. Reference the asset exactly as a bundled one, using its path relative to
the assets folder:


| type  | value                |
| ----- | -------------------- |
| image | `images/welcome.png` |


!!! warning

    Do **not** prefix the path with the asset pack name. The pack name is only used when talking to
    storage; in authoring the path is the same whether the file is bundled or remote.

Before the pack has been downloaded, the reference falls back to a bundled asset of the same path if
one exists — so a pack can be used to replace low-resolution bundled placeholders with full-size
versions, for example — and is otherwise unavailable until the pack arrives. Theme and language overrides authored
in the usual asset folder structure are included in the pack and fetched alongside the base file.

## Downloading asset packs

Downloads are triggered from templates with the `asset_pack` action:


| Action              | Behaviour                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `download`          | Download a single named pack. Always runs, even if the pack has already been downloaded, and always blocks the action queue until finished (may be deprecated in future) |
| `ensure_downloaded` | Download only those packs not already completed. Takes an `asset_pack` or `asset_pack_list` parameter                                                                    |
| `cancel_download`   | Abort any active download and mark it `cancelled`                                                                                                                        |
| `reset`             | Return **every** pack to its pre-download state                                                                                                                          |


!!! note "Naming the pack"

    `download` accepts the pack name either as an **argument** (after a colon) or as an `asset_pack`
    **parameter** (after a pipe), so it can be authored the same way as `ensure_downloaded`. The
    argument wins if both are given. `ensure_downloaded` reads the parameter only —
    `asset_pack: ensure_downloaded: my_pack` logs an error and does nothing.

| type   | value                          | action_list                                                                        |
| ------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| button | Download pack                  | `click | asset_pack: download: my_asset_pack`                                      |
| button | Download pack (parameter form) | `click | asset_pack: download | asset_pack: my_asset_pack`                         |
| button | Ensure single pack             | `click | asset_pack: ensure_downloaded | asset_pack: my_asset_pack`                |
| button | Ensure multiple packs          | `click | asset_pack: ensure_downloaded | asset_pack_list: @field.my_pack_list`     |
| button | Ensure without blocking        | `click | asset_pack: ensure_downloaded | asset_pack: my_asset_pack | await: false` |
| button | Cancel download                | `click | asset_pack: cancel_download`                                              |
| button | Reset all packs                | `click | asset_pack: reset`                                                        |


`asset_pack_list` accepts an array (e.g. a field set via `set_field`) or a JSON array string.

### Parameters


| Parameter                 | Action                          | Description                                                                                          |
| ------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `asset_pack`              | `download`, `ensure_downloaded` | Single pack name. For `download`, an alternative to giving the name as an argument                   |
| `asset_pack_list`         | `ensure_downloaded`             | One or more pack names, as an array or JSON array string                                             |
| `await`                   | `ensure_downloaded`             | Default `true`. When `false`, downloads start in the background instead of blocking the action queue |
| `debug_download_delay_ms` | `download`, `ensure_downloaded` | Testing aid, see [Testing and debugging](#testing-and-debugging)                                     |


`download` has no `await` parameter — it always blocks the action queue until the download finishes.

!!! tip

    Use `await: false` when a download shouldn't hold up navigation, e.g. starting an optional pack in
    the background while the user carries on. Note that a download that loses connectivity parks
    itself until connectivity returns, so an awaited call can block the action queue indefinitely.

### One at a time

Downloads run one pack at a time, and one file at a time within a pack:


| Situation                                   | Result                                                     |
| ------------------------------------------- | ---------------------------------------------------------- |
| Same pack requested again while downloading | Joins the download already in progress                     |
| Different pack requested, `await: false`    | Refused for now, retried once the active download finishes |
| Different pack requested, awaited           | Refused and returns immediately, not retried               |




### Updating a pack that users already have

`ensure_downloaded` skips any pack already marked completed, so replacing files in cloud storage does
**not** reach users who have already downloaded that pack. Use `download`, which always re-runs and
re-fetches any file whose size or checksum no longer matches the pack manifest, to pick up changed
content. There is no "update if changed" action.

!!! warning "`reset` affects every pack"

    `asset_pack: reset` is global, not per-pack: it cancels any active download, deletes all downloaded
    files from the device, and returns every asset reference to its bundled version (or to unavailable,
    where no bundled version exists). It is all-or-nothing — if the files cannot be deleted, nothing is
    changed. Treat it as a debugging / support escape hatch rather than a user-facing button.

## Showing download progress

Two things are exposed to authoring:

`asset_pack_download_in_progress` — a system variable holding `"true"` or `"false"` while any
download is running, useful for showing or hiding UI. Reference it as
`@fields._asset_pack_download_in_progress`, or as `@system.asset_pack_download_in_progress` in
deployments using `useReactiveTemplates`.

**The** `_asset_packs` **data list** — one row per pack, which can be read with `data_items` to drive a
progress bar or status display:


| Column                       | Description                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `id` / `name`                | Asset pack name                                                              |
| `download_status`            | `in_progress`, `waiting_for_connection`, `completed`, `error` or `cancelled` |
| `assets_total_count`         | Total number of files in the pack                                            |
| `assets_downloaded_count`    | Number processed so far in the current attempt                               |
| `download_progress_percent`  | Percentage complete for the current attempt, 0-100                           |
| `download_started_at`        | ISO timestamp of when the current attempt started                            |
| `download_completed_at`      | ISO timestamp of completion, empty until completed                           |
| `download_status_updated_at` | ISO timestamp of the most recent status change                               |


For example, looping over the list (see [looping data](./advanced/looping-data.md)) to show each
pack's progress:


| type             | name                                                    | value                                                                |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| begin_data_items |                                                         | @data._asset_packs                                                   |
| text             | [pack_progress_@item.id](mailto:pack_progress_@item.id) | @item.name: @item.assets_downloaded_count / @item.assets_total_count |
| end_data_items   |                                                         |                                                                      |


!!! tip "Counts or percentage?"

    `assets_downloaded_count` is always a real file count, so "x of y files" is accurate however a
    pack was fetched. It steps unevenly though, because files in a pack range from under a kilobyte
    to a couple of megabytes.

    For a **progress bar**, prefer `download_progress_percent`. It tracks transferred bytes when a
    pack is downloaded in bulk and files otherwise, so it moves smoothly either way — and which way
    a given download takes is decided automatically, not by authoring.


!!! note

    The list is not a catalogue of available packs: a row only appears once a pack has been requested
    for the first time. Counts are per **file**, including each theme/language override, so a pack of
    10 images with a translated version of each reports 20. Files skipped as already-downloaded still
    count towards the total.

The statuses behave as follows:

- `completed` is only reached when every file in the pack succeeded.
- `waiting_for_connection` means the download is parked offline and will continue by itself when
connectivity returns.
- `in_progress` and `waiting_for_connection` are picked up automatically on the next app launch if the
app was closed mid-download.
- `error` and `cancelled` are not retried automatically, but either `download` or `ensure_downloaded`
will retry them (`ensure_downloaded` only skips packs that are `completed`).



## Ready-made download button

The `asset_pack_download_button` component wraps a download in a button that shows its own progress
and result:


| type                       | name            | parameter_list                                      |
| -------------------------- | --------------- | --------------------------------------------------- |
| asset_pack_download_button | download_button | asset_pack: my_asset_pack | progress_display: count |



| Parameter          | Value                        | Description                                                 |
| ------------------ | ---------------------------- | ----------------------------------------------------------- |
| `asset_pack`       | pack name                    | Pack to download                                            |
| `default_text`     | text                         | Button text before download (default `Download asset pack`) |
| `progress_text`    | text                         | Button text while downloading (default `Downloading...`)    |
| `success_text`     | text                         | Button text after a successful download (default `Success`) |
| `error_text`       | text                         | Button text after a failed download (default `Error`)       |
| `progress_display` | `count` (default), `percent`, `spinner` | Show a downloaded/total file count, a percentage, or a spinner |


The button behaves like the `download` action, i.e. it always re-downloads the pack rather than
skipping one already held. Its value is set to the current status (`initial`, `downloading`, `success`
or `error`), and any authored `click` actions run after the download attempt completes.

## Recommended pattern

- Call `ensure_downloaded` at a known entry point (e.g. after onboarding, or when a section is first
opened), usually with `await: false` so navigation isn't held up.
- Gate media screens on `@fields._asset_pack_download_in_progress` and/or the pack's
`download_status` from `_asset_packs`, rather than assuming the assets are present.
- Use `download` only where content needs to be refreshed after a pack has been replaced in storage.
- Keep `reset` out of normal user flows.



## Defining asset packs

Asset packs are produced at sync time: assets destined for a pack are held out of the bundled app
assets and written to `app_data/remote_assets/{packName}/` instead. There are two ways to declare one.

**A Google Drive assets folder marked** `remote: true`**.** The whole folder becomes one pack, and the
folder's `name` becomes the pack name:

<!-- cspell:disable -->
```ts
config.google_drive = {
  assets_folders: [
    { id: "1bnGPB70wPp9hzVOpT4LkPX9h3FwIrqfs", name: "Debug Assets" },
    { id: "19Kbwidpb_nOKpJAuRCkVLpAzWbKPzNm1", name: "debug_asset_pack_1", remote: true },
  ],
};
```
<!-- cspell:enable -->

!!! warning

    A remote folder's `name` is used as the pack id in templates, in `_asset_packs` and as the folder
    name in cloud storage, so use a stable identifier without spaces (unlike ordinary assets folders,
    where the name is only a local label).

**A Canto source folder with** `remote_assets` **entries.** Each entry declares a pack `name` plus a
`condition` selecting which of that folder's files belong to it. Files matching no condition remain
bundled assets, and packs are not exclusive — a file is copied into every pack whose condition it
matches:

```ts
config.canto = {
  url: "https://parentingforlifelonghealth.canto.com",
  sourceFolders: [
    {
      id: "V0DQB",
      name: "Debug Canto Assets",
      remote_assets: [
        {
          name: "female_caregiver_pack",
          condition: { type: "custom_field", field: "Caregiver Gender", value: "Female" },
        },
        {
          name: "english_no_age_category_pack",
          condition: {
            type: "and",
            conditions: [
              { type: "custom_field", field: "Language", value: "English" },
              { type: "field_empty", field: "Child Age Category" },
            ],
          },
        },
      ],
    },
  ],
};
```

The supported leaf conditions are `custom_field` (field name plus value to match) and `field_empty`
(field has no value set). Both can be combined with `{ type: "and", conditions: [...] }` and
`{ type: "or", conditions: [...] }`.

!!! note "Assets shared between packs"

    The same asset can belong to several packs — with Canto in particular, a file is copied into every
    pack whose condition it matches. This is by design and costs nothing extra: on device an asset is
    stored once, keyed by its path, so a pack containing assets that another pack has already fetched
    skips re-downloading them.

    The one thing to avoid is two packs unintentionally shipping *different* content at the same path, since they
    share that single stored file and the entry pointing at it — whichever pack downloaded last wins.

## Uploading asset packs

Sync writes each pack to the deployment's `app_data/remote_assets/{packName}/` folder, containing:

- every asset file, in the same folder structure as the source assets folder
- `{packName}.json` — the manifest the app reads, listing each asset's size and checksum
- `{packName}.{version}.zip` — every asset in one archive, used on a device installing the pack for
  the first time. The `{version}` matches the manifest's own `version` field

Uploading is **currently a manual process**. Upload the pack folder as-is (via the Firebase console,
or `gsutil cp -r ./app_data/remote_assets/my_asset_pack gs://my-bucket/asset_packs/`), so that storage
ends up with:

```
{folderName}/{packName}/{packName}.json            <- manifest
{folderName}/{packName}/{packName}.{version}.zip  <- archive of every asset
{folderName}/{packName}/{relativePath}            <- each asset file
```

The folder name in storage must exactly match the pack name used in templates.

!!! warning "Re-uploading a changed pack"

    Upload the asset files and the new `{packName}.{version}.zip` **first**, and `{packName}.json`
    **last**. The manifest is what tells the app a new version exists, so if it arrives first the app
    goes looking for content that is not there yet. It recovers on its own once the rest lands, but
    it looks like a bug in the meantime.

    The archive filename changes with every content change, so a new upload never overwrites the
    archive that in-flight installs are still reading, and a stale archive can never be served for a
    new manifest. Sync only ever leaves the current archive in the pack folder, so you will not
    upload an old one by accident — but uploading **adds** to the bucket rather than replacing, so
    **delete superseded `{packName}.{version}.zip` objects** once no device is still installing from
    them, or storage grows by the size of the pack on every publish.

## Deployment and storage setup

The feature is inactive until the deployment config opts in:

```ts
config.remote_assets = {
  provider: "firebase",
  // bucketName: "my-bucket",  // required for supabase; ignored for firebase
  folderName: "asset_packs",
};
```


| Property     | Description                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`   | `"firebase"` or `"supabase"`. The chosen provider must also be configured in the same config (`config.firebase` / `config.supabase`)      |
| `bucketName` | Storage bucket name. Required for `supabase`; ignored for `firebase`, which reads the bucket from the firebase config                     |
| `folderName` | Path prefix inside the bucket that all asset packs live under. There is no default — it must match the prefix actually used in the bucket |


Without `remote_assets.provider`, the `asset_pack` actions still exist but log an explanatory error
instead of doing anything.

### Firebase

Firebase storage must be enabled for the firebase project associated with the relevant deployment, via
the [firebase console](https://console.firebase.google.com). See also
[Firebase management](../developers/deployments.md#firebase-management) for configuring firebase
itself.

The folder structure in the bucket should mirror the `folderName` given in the deployment config.
Unlike supabase, the `bucketName` value is irrelevant for firebase: the app uses the `storageBucket`
value from `config.firebase.config`, read from the firebase instance at runtime (typically
`{projectId}.firebasestorage.app`, or `{projectId}.appspot.com` on older projects). So asset packs
simply need to be nested inside a folder within firebase storage in the following way:

```
{config.remote_assets.folderName}/{my_asset_pack_name}
```

Two separate things then have to be allowed, or assets fail to load with permission or CORS errors:

**1. Read access.** Assets are fetched from public download URLs, so the bucket's storage rules must
allow unauthenticated reads of the asset pack folder, e.g. for `folderName: "asset_packs"`:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /asset_packs/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

**2. CORS.** On web the browser fetches those URLs cross-origin, so the bucket's CORS policy must
permit `GET` from the app's origin. This is configured with the `gsutil` CLI tool, which comes bundled
with the Google Cloud CLI — for instructions on downloading the tool and setting the policy, see the
[firebase docs](https://firebase.google.com/docs/storage/web/download-files#cors_configuration).

For example, the policy was set on the `debug` deployment by creating a `cors.json`:

```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

and running (the bucket here being that of the debug project, `debug-e8934`):

```sh
gsutil cors set cors.json gs://debug-e8934.firebasestorage.app
```

`"origin": ["*"]` is convenient for debugging; for a production deployment, restrict it to the origins
the app is served from.

### Supabase

This page walks through the firebase setup only. For supabase, the equivalent requirements are:

- `config.supabase` enabled, with its url and public API key
- `bucketName` set in `config.remote_assets` — unlike firebase, it is required and is the bucket the
files are read from
- the bucket configured to allow public read access
- the same `{folderName}/{packName}/…` folder layout inside that bucket



## Testing and debugging

`download` and `ensure_downloaded` accept `debug_download_delay_ms`, which pauses for that many
milliseconds before each asset file, however the pack is being fetched:


```
click | asset_pack: download: my_asset_pack | debug_download_delay_ms: 3000
```

When a pack is fetched in bulk the pause applies as each file is unpacked, not to the transfer
itself, so the window it opens is during installation rather than during the download.

This exists to open a reliable window for interrupting a download — force-quitting the app mid-pack,
toggling aeroplane mode — which is otherwise hard to hit on a fast connection. It should be omitted
outside local testing. Note that the delay applies to skipped files too, so a resumed download won't
look any faster with it enabled: check that status and counts reach completion rather than judging by
speed.

The debug deployment content (the `app-debug-content` repo and its Debug Sheets drive folder) contains
reference templates — `debug_remote_assets` and `debug_asset_packs` — covering downloads, progress
display, overrides and reset.

## Current limitations

- **No background continuation.** Downloads stop when the app is backgrounded or killed, and resume on
next launch rather than continuing while away.
- **No download queue.** One pack and one file at a time, so large packs are slow.
- **No per-pack delete.** Storage is reclaimed for all packs at once via `asset_pack: reset`, or not at
all.
- **No update-if-changed action.** Refreshing replaced content needs `download` (or `reset`).
- **No integrity repair.** There is no way to detect or fix an asset file that becomes corrupted after
it has been downloaded.

