import type { FlowTypes, IAssetEntry, IAssetEntryHashmap } from "data-models";

/**
 * Convert pack manifest `rows` (keyed by `id` = asset path) into the hashmap shape used by core
 * `contents.json`, so reporting can treat core and pack assets alike.
 *
 * Reverses `AssetsPostProcessor.convertAssetEntriesToRows` except for `overridesOnly` entries,
 * whose `md5Checksum`/`size_kb` that method replaces with the first override's values.
 */
export function convertAssetPackRowsToHashmap(
  rows: FlowTypes.Data_listRow<IAssetEntry>[] | undefined
): IAssetEntryHashmap {
  const hashmap: IAssetEntryHashmap = {};
  for (const row of rows ?? []) {
    const { id, ...entry } = row;
    if (!id) continue;
    hashmap[id] = entry as IAssetEntry;
  }
  return hashmap;
}
