import { IAssetEntryHashmap } from "data-models";

export interface IAssetEntriesByType {
  /** Assets that have a global in the default theme, including their respective overrides */
  tracked: IAssetEntryHashmap;
  /** Assets that appear in translation or theme folders but have no corresponding global in the default theme */
  untracked: IAssetEntryHashmap;
}
