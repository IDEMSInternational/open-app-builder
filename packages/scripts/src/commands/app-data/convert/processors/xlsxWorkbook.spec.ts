import path from "path";
import { XLSXWorkbookProcessor } from "./xlsxWorkbook";

import { SCRIPTS_TEST_DATA_DIR } from "../../../../paths";
import { MockJsonFileCache } from "../cacheStrategy/jsonFile.mock";

const paths = {
  SHEETS_CACHE_FOLDER: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
  SHEETS_INPUT_FOLDER: path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "sheets"),
  SHEETS_OUTPUT_FOLDER: path.resolve(SCRIPTS_TEST_DATA_DIR, "output", "sheets"),
};

const testInputPath = path.resolve(paths.SHEETS_INPUT_FOLDER, "test_input.xlsx");

/** yarn workspace scripts test -t xlsxWorkbook.spec.ts */
describe("XLSX Workbook Processor", () => {
  let processor: XLSXWorkbookProcessor;

  beforeEach(async () => {
    processor = new XLSXWorkbookProcessor({ cache: new MockJsonFileCache() });
  });

  // Processor will convert all inputs to json array, producing
  // an array of arrays
  it("Converts XLSXs to array of JSON sheet arrays", async () => {
    const outputs = await processor.process([{ localPath: testInputPath, md5Checksum: "0001234" }]);
    expect(Array.isArray(outputs)).toEqual(true);
    expect(outputs.length).toEqual(1);
    // // each entry may contain multiple sheets from workbook
    // const testInputsheets = outputs[0];
    // expect(testInputsheets.length).toEqual(5);
    // expect(testInputsheets[0].flow_type).toEqual("data_list");
  });
});
