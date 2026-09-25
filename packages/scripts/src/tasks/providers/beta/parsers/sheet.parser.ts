import { FlowTypes } from "data-models";
import { xlsxToJson } from "../../../../lib/app-data/convert/utils/xlsx.utils";
import { logWarning } from "../../../../utils";

const CONTENT_LIST_SHEET = "==content_list==";

/**
 * Basic conversion of an xlsx workbook to flow jsons.
 * Each entry in the `==content_list==` tab produces a flow containing all content list columns
 * (flow_type, flow_name, and any others) along with the rows from the matching tab.
 * Row data is kept as authored, with no further parsing applied
 */
export function parseSheetWorkbook(
  xlsxData: Buffer,
  sourcePath: string
): FlowTypes.FlowTypeWithData[] {
  const sheetData = xlsxToJson(xlsxData);
  const contentList = sheetData[CONTENT_LIST_SHEET] as FlowTypes.FlowTypeBase[];
  if (!contentList) {
    logWarning({ msg1: "No Content List", msg2: sourcePath });
    return [];
  }
  const flows: FlowTypes.FlowTypeWithData[] = [];
  for (const { flow_type, flow_name, ...contentColumns } of contentList) {
    if (!flow_name) continue;
    if (!sheetData.hasOwnProperty(flow_name)) {
      logWarning({ msg1: `No Contents: ${flow_name}`, msg2: sourcePath });
      continue;
    }
    flows.push({
      flow_type,
      flow_name,
      ...contentColumns,
      rows: sheetData[flow_name],
    } as FlowTypes.FlowTypeWithData);
  }
  return flows;
}
