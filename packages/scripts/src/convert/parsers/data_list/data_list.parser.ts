import { setNestedProperty } from "../../../../../../src/app/shared/utils";
import { FlowTypes } from "../../../../types";
import { extractConditionList, parseAppDataCollectionString } from "../../utils";
import { DefaultParser } from "../default/default.parser";

export class DataListParser extends DefaultParser {
  constructor() {
    super();
  }
  postProcess(row: FlowTypes.Data_listRow) {
    Object.keys(row).forEach((field) => {
      // handle other data structures
      if (field.endsWith("_condition_list")) {
        row[field] = row[field].map((value) => extractConditionList(value));
      }
      if (field.endsWith("notification_schedule")) {
        row[field] = parseAppDataCollectionString(row[field]);
      }
      // assign nested structures, e.g {time.hour : 4} => {time: { hour: 4 }}
      if (field.includes(".")) {
        row = setNestedProperty(field, row[field], row);
        delete row[field];
      }
    });
    return row;
  }
}
