/* eslint-disable @typescript-eslint/no-unused-expressions */

import fs from "fs-extra";
import path from "path";

import { ExcelToRapidproConverter } from "./excelConverter";

import chai from "chai";
const expect = chai.expect;

/**
 * NOTE 2020-12-02 - Broken during refactor, requires fix (instead of sheet need to import as row data, minor edits to json required)
 */
const MOCKS_FOLDER_PATH = path.join(__dirname, "../mocks");
const MOCK_JSONS = fs
  .readdirSync(MOCKS_FOLDER_PATH, { withFileTypes: true })
  .filter((file) => file.name.endsWith(".json"))
  .map((file) => path.resolve(MOCKS_FOLDER_PATH, file.name));

for (const jsonPath of MOCK_JSONS) {
  const { rapidproModel, excelModel } = fs.readJSONSync(jsonPath);
  const testName = path.basename(jsonPath, ".json");

  describe(testName, () => {
    it("contains correctly formatted rapidpro data", () => {
      expect(rapidproModel).not.to.be.undefined;
    });

    it("contains correctly formatted excel sheet data", () => {
      expect(excelModel).not.to.be.undefined;
    });

    it("converts without error", () => {
      const converter = new ExcelToRapidproConverter(excelModel.flow_name, excelModel.rows);
      expect(() => converter.run()).not.to.throw();
    });

    it("converted excel matches rapidpro", () => {
      const converter = new ExcelToRapidproConverter(excelModel.flow_name, excelModel.rows);
      const converted = converter.run();
      expect(converted).to.deep.equal(rapidproModel);
    });
  });
}
