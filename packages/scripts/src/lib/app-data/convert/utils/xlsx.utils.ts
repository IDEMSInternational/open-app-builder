import * as xlsx from "xlsx";

/**
 * Parses an xlsx file, returning an object with sheet names as keys
 * and a corresponding array of key-value pairs to represent the sheet data
 * (assumes header provided in top row)
 */
export function xlsxToJson(xlsxData: Buffer): { [sheetName: string]: Record<string, any> } {
  const json: Record<string, any> = {};
  const workbook = xlsx.read(xlsxData, { type: "buffer" });
  const { Sheets } = workbook;

  for (const [sheetName, worksheet] of Object.entries(Sheets)) {
    Object.values(worksheet).forEach(processCell);
    json[sheetName] = xlsx.utils.sheet_to_json(worksheet);
  }
  return json;
}

/**
 * Interpret cell formatting and update cell value
 */
export function processCell(cell: xlsx.CellObject) {
  if (!cell) return;

  // If bold or italics, include HTML in cell value
  let html = cell.h;
  if (
    html !== undefined &&
    typeof html === "string" &&
    (html.includes("<b>") || html.includes("<em>") || html.includes("<i>"))
  ) {
    html = html.replace(/<span[^>]*>/g, "<span>"); // Remove span style
    cell.v = html;
  }

  // If authored value was a percentage, override converted decimal value to preserve percentage representation
  // xlsx library parser saves formatted text version of cell value in the .w field
  // https://docs.sheetjs.com/docs/api/parse-options#parsing-options
  const cellText = cell.w;
  if (typeof cell.v === "number" && cellText?.includes("%")) {
    cell.v = cellText;
  }
}
