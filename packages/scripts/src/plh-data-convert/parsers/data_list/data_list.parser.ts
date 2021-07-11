import { FlowTypes } from "../../../../types";
import { extractConditionList, parsePLHCollectionString } from "../../utils";
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
        row[field] = parsePLHCollectionString(row[field]);
      }
    });
    return row;
  }
}
