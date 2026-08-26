import * as path from "path";
import * as fs from "fs-extra";
import { zipSync, type ZipOptions } from "fflate";
import type { FlowTypes, IAssetEntry } from "data-models";
import { logWarning } from "../../../../utils";

/**
 * Extensions whose contents compress usefully. Asset packs are dominated by already-compressed
 * media, so deflating everything costs the device CPU on extract for effectively no saving:
 * measured on the largest real pack (`assets_teen_za_en`, 427 files) blanket deflate gives
 * 33.5MB against 34.2MB for this list, while making the device inflate 23MB of mp3/png/gif.
 *
 * Store is deliberately the default for anything unrecognised. A newly-introduced media type
 * must not get inflated on device merely because nobody remembered to add it here.
 */
const DEFLATE_EXTENSIONS = new Set([
  ".css",
  ".csv",
  ".htm",
  ".html",
  ".json",
  ".md",
  ".svg",
  ".txt",
  ".vtt",
  ".xml",
]);

const DEFLATE_LEVEL = 6;
const STORE_LEVEL = 0;

/** @returns the fflate compression level to use for a given pack-relative path */
export function getArchiveCompressionLevel(relativePath: string): 0 | 6 {
  return DEFLATE_EXTENSIONS.has(path.extname(relativePath).toLowerCase())
    ? DEFLATE_LEVEL
    : STORE_LEVEL;
}

/**
 * List every downloadable file in a manifest, in the order they should appear in the archive:
 * each asset's base file immediately followed by that asset's overrides.
 *
 * The grouping is not cosmetic. The app integrates a whole `_assets_contents` row at once, and a
 * row is only complete when every slot it owns has been written - so with entries interleaved the
 * app could not flush anything until the stream ended, and an interruption would discard the lot.
 */
export function listAssetPackSlotPaths(manifest: FlowTypes.AssetPack): string[] {
  const slotPaths: string[] = [];
  for (const row of (manifest.rows || []) as IAssetEntry[]) {
    if (!row.overridesOnly && row.id) {
      slotPaths.push(row.id);
    }
    for (const languageOverrides of Object.values(row.overrides || {})) {
      for (const overrideEntry of Object.values(languageOverrides || {})) {
        if (overrideEntry?.filePath) {
          slotPaths.push(overrideEntry.filePath);
        }
      }
    }
  }
  return slotPaths;
}

/**
 * Write `{packName}.zip` alongside the loose pack files, containing every file the manifest
 * declares. The app downloads this instead of fetching hundreds of individual objects when most
 * of a pack is missing locally.
 *
 * Generated here, next to the manifest and its version hash, rather than left to the (manual)
 * upload step: a zip that has drifted from the loose files is a silent, whole-pack correctness
 * bug, and only generating both from the same source prevents it.
 *
 * The manifest itself is excluded - it is fetched separately, before the archive, and a copy
 * inside would just be a second source of truth to go stale.
 *
 * @returns the uncompressed and compressed totals in bytes, for reporting
 */
export function writeAssetPackArchive(
  targetFolder: string,
  assetPackName: string,
  manifest: FlowTypes.AssetPack
): { rawBytes: number; archiveBytes: number } {
  const archiveEntries: ZipOptions & Record<string, [Uint8Array, ZipOptions]> = {} as any;
  let rawBytes = 0;
  const missingSlotPaths: string[] = [];

  for (const slotPath of listAssetPackSlotPaths(manifest)) {
    const localPath = path.resolve(targetFolder, slotPath);
    if (!fs.existsSync(localPath)) {
      // A manifest entry with no file on disk would become a slot the app can never satisfy from
      // the archive. Skipping keeps the archive self-consistent; the per-file path remains able
      // to fetch it, and the download fails honestly rather than completing with a gap.
      missingSlotPaths.push(slotPath);
      continue;
    }
    const contents = new Uint8Array(fs.readFileSync(localPath));
    rawBytes += contents.byteLength;
    archiveEntries[slotPath] = [contents, { level: getArchiveCompressionLevel(slotPath) }];
  }

  if (missingSlotPaths.length > 0) {
    // Silence here would mean an incomplete archive shipping unnoticed, and every install paying
    // for a per-file fallback to fetch the difference
    logWarning({
      msg1: `Asset pack ${assetPackName}: ${missingSlotPaths.length} manifest entr(ies) missing from disk, excluded from archive`,
      msg2: missingSlotPaths.join("\n"),
    });
  }

  const archive = zipSync(archiveEntries as any, { level: STORE_LEVEL });
  const archivePath = path.resolve(targetFolder, `${assetPackName}.zip`);
  fs.writeFileSync(archivePath, archive);

  return { rawBytes, archiveBytes: archive.byteLength };
}
