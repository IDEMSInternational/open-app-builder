import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import { logOutput, logWarning } from "../../../../utils";

/** Name of the single flow all global sheets are combined into */
export const COMBINED_GLOBAL_NAME = "_global";

/** A global flow along with the name of the sheet it came from */
export interface IGlobalSheet {
  /** Source path relative to the sheets folder, without extension, e.g. `subfolder/my_globals` */
  sheet: string;
  flow: FlowTypes.FlowTypeWithData;
}

type IGlobalRow = FlowTypes.GlobalRow & { _sheet: string };

/**
 * Combine all global flows into a single `_global.json` file within the target folder,
 * replacing any existing global output. Rows are tagged with the `_sheet` they came from
 * and ordered by sheet name
 * @returns the combined global flow
 */
export function combineGlobals(
  sheets: IGlobalSheet[],
  targetFolder: string,
  verbose = false
): FlowTypes.FlowTypeWithData {
  let combined = createCombinedGlobal();
  const sortedSheets = [...sheets].sort((a, b) => a.sheet.localeCompare(b.sheet));
  for (const { sheet, flow } of sortedSheets) {
    combined = replaceGlobalSheetRows(combined, sheet, flow.rows || []);
  }
  warnDuplicateNames(combined.rows as IGlobalRow[]);

  fs.ensureDirSync(targetFolder);
  fs.emptyDirSync(targetFolder);
  fs.writeJsonSync(path.resolve(targetFolder, `${COMBINED_GLOBAL_NAME}.json`), combined, {
    spaces: 2,
  });
  if (verbose) {
    logOutput({
      msg1: `Combined ${sheets.length} global sheets, ${combined.rows.length} rows`,
      msg2: targetFolder,
    });
  }
  return combined;
}

/** Create an empty combined global flow */
export function createCombinedGlobal(): FlowTypes.FlowTypeWithData {
  return {
    flow_type: "global",
    flow_name: COMBINED_GLOBAL_NAME,
    status: "released",
    rows: [],
  } as FlowTypes.FlowTypeWithData;
}

/**
 * Replace all rows from a single sheet within the combined global flow. New rows are inserted
 * where the sheet's previous rows started (or appended if the sheet is new) so ordering between
 * sheets is preserved. Pass an empty array of rows to remove a sheet
 */
export function replaceGlobalSheetRows(
  combined: FlowTypes.FlowTypeWithData,
  sheet: string,
  rows: FlowTypes.GlobalRow[]
): FlowTypes.FlowTypeWithData {
  const existingRows = (combined.rows || []) as IGlobalRow[];
  const insertIndex = existingRows.findIndex((row) => row._sheet === sheet);
  const keptRows = existingRows.filter((row) => row._sheet !== sheet);
  const sheetRows: IGlobalRow[] = rows.map((row) => ({ ...row, _sheet: sheet }));
  const index = insertIndex === -1 ? keptRows.length : insertIndex;
  keptRows.splice(index, 0, ...sheetRows);
  return { ...combined, rows: keptRows };
}

/** Warn when the same global name is declared in multiple sheets, as later values will override */
function warnDuplicateNames(rows: IGlobalRow[]) {
  const sheetsByName: { [name: string]: string } = {};
  for (const { name, _sheet } of rows) {
    if (!name) continue;
    if (sheetsByName[name] && sheetsByName[name] !== _sheet) {
      logWarning({
        msg1: `Duplicate global: ${name}`,
        msg2: `${sheetsByName[name]} will be overridden by ${_sheet}`,
      });
    }
    sheetsByName[name] = _sheet;
  }
}
