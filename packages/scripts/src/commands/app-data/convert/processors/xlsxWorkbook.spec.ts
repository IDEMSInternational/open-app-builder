import path from "path";
import { XLSXWorkbookProcessor } from "./xlsxWorkbook";

import { SCRIPTS_TEST_DATA_DIR } from "../../../../paths";
import { clearLogs, getLogs, IContentsEntry } from "../utils";
const paths = {
  SHEETS_CACHE_FOLDER: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
  SHEETS_INPUT_FOLDER: path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "sheets"),
  SHEETS_OUTPUT_FOLDER: path.resolve(SCRIPTS_TEST_DATA_DIR, "output", "sheets"),
};

const testInputs: IContentsEntry[] = [
  {
    modifiedTime: "2021-08-20T09:55:53.006Z",
    size_kb: 2717,
    md5Checksum: "123456789abcd",
    relativePath: "test_input.xlsx",
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
  it("Converts XLSXs to array of JSON sheet arrays", async () => {
    const outputs = await processor.process(testInputs);
    expect(Array.isArray(outputs)).toBeTrue();
    expect(outputs.length).toEqual(testInputs.length);
    // each entry may contain multiple sheets from workbook
    const testInputsheets = outputs[0];
    expect(testInputsheets.length).toEqual(5);
    expect(testInputsheets[0].flow_type).toEqual("data_list");
  });
  it("throws on missing file", async () => {
    clearLogs();
    const missingInput = { ...testInputs[0], relativePath: "missing.xlsx" };
    await processor.process([missingInput]);
    const errLogs = getLogs("error");
    expect(errLogs).toEqual([
      {
        level: "error",
        message: "Xlsx not found: missing.xlsx",
        source: "xlsxWorkbookProcessor",
      },
    ]);
  });
  it("Uses cache", () => {
    const cacheName = processor.cache.generateCacheEntryName(testInputs[0]);
    expect(processor.cache.get(cacheName)).toBeTruthy();
  });
});

/** Utility class to allow direct access to parsed flows for use in tests */
export class TestXLSXWorkbookProcessor extends XLSXWorkbookProcessor {
  constructor() {
    super(paths);
  }
  async getProcessed(sheetPath: string, flowname: string) {
    const parsedWorkbooks = await this.process([{ relativePath: sheetPath } as any]);
    const matchingFlow = parsedWorkbooks[0].find((f) => f.flow_name === flowname);
    return matchingFlow;
  }
}
