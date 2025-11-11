import type { CellObject, ExcelDataType } from "xlsx";

import { processCell } from "./xlsx.utils";

/** yarn workspace scripts test -t xlsx.utils.spec.ts */
describe("XLSX Utils", () => {
  it("preserves HTML formatting for bold, italic and emphasized text", () => {
    const cell: CellObject = {
      h: "<b>Bold</b>, <i>Italic</i> and <em>Emphasized</em>",
      v: "Bold, Italic and Emphasized",
      t: "s" as ExcelDataType,
    };
    processCell(cell);
    expect(cell.v).toBe("<b>Bold</b>, <i>Italic</i> and <em>Emphasized</em>");
  });

  it("preserves percentage values as strings", () => {
    const cell: CellObject = {
      v: 0.5,
      w: "50%",
      t: "n" as ExcelDataType,
    };
    processCell(cell);
    expect(cell.v).toBe("50%");
  });

  it("leaves regular cells unchanged", () => {
    const cell: CellObject = {
      v: "Regular text",
      w: "Regular text",
      t: "s" as ExcelDataType,
    };
    const originalValue = cell.v;
    processCell(cell);
    expect(cell.v).toBe(originalValue);
  });
});
