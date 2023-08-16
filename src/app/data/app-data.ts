import type { FlowTypes } from "data-models";
import type { IAssetEntry } from "data-models";
import ASSETS_CONTENT_JSON from "src/assets/app_data/assets/contents.json";
import SHEETS_CONTENT_JSON from "src/assets/app_data/sheets/contents.json";
import TRANSLATIONS_CONTENT_JSON from "src/assets/app_data/translations/contents.json";

// Enforce type declaration for contents to avoid inferring from large file

type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
export const SHEETS_CONTENT_LIST = SHEETS_CONTENT_JSON as ISheetContents;

export type IAssetContents = { [relative_path: string]: Partial<IAssetEntry> };
export const ASSETS_CONTENTS_LIST = ASSETS_CONTENT_JSON as IAssetContents;

type ITranslationContents = { [language_code: string]: { filename: string } };
export const TRANSLATIONS_CONTENT_LIST: ITranslationContents = TRANSLATIONS_CONTENT_JSON;
