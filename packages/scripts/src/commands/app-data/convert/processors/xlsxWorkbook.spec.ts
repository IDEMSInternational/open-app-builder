import path from "path";
import { XLSXWorkbookProcessor } from "./xlsxWorkbook";

import { SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
import { IGDriveContentsEntry } from "../types";
const testDataDir = path.resolve(SCRIPTS_WORKSPACE_PATH, "test", "data");
const paths = {
  SHEETS_CACHE_FOLDER: path.resolve(testDataDir, "cache"),
  SHEETS_INPUT_FOLDER: path.resolve(testDataDir, "input"),
  SHEETS_OUTPUT_FOLDER: path.resolve(testDataDir, "output"),
};

const testInputs: IGDriveContentsEntry[] = [
  {
    id: "0123456789ABCDEFG",
    name: "test_input",
    mimeType: "application/vnd.google-apps.spreadsheet",
    modifiedTime: "2021-08-20T09:55:53.006Z",
    size: "2717",
    folderPath: "sheets",
    relativePath: "sheets/test_input.xlsx",
  },
];

let processor: XLSXWorkbookProcessor;
describe("XLSX Workbook Processor", () => {
  beforeAll(() => {
    processor = new XLSXWorkbookProcessor(paths);
    processor.cache.clear();
  });
  afterAll(() => {
    processor.cache.clear();
  });

  // Processor will convert all inputs to json array, producing
  // an array of arrays
  it("Converts XLSXs to array of JSON sheet arrays", () => {
    const outputs = processor.process(testInputs);
    expect(Array.isArray(outputs)).toBeTrue();
    expect(outputs.length).toEqual(testInputs.length);
    // each entry may contain multiple sheets from workbook
    const testInputsheets = outputs[0];
    // 3 test sheets exist
    expect(testInputsheets.length).toEqual(3);
    expect(testInputsheets[0].flow_type).toEqual("data_list");
  });
  it("throws on missing file", () => {
    const missingInput = { ...testInputs[0], relativePath: "missing.xlsx" };
    expect(() => processor.process([missingInput])).toThrowError("Xlsx not found: missing.xlsx");
  });
  it("Uses cache", () => {
    const cacheName = processor.cache.generateCacheEntryName(testInputs[0]);
    expect(processor.cache.get(cacheName)).toBeTruthy();
  });
});
