import { extractDynamicFields, FlowTypes } from "data-models";
import {
  assignFlowOverrides,
  extractConditionList,
  parseAppDataCollectionString,
  setNestedProperty,
} from "../../../utils";
import { DefaultParser } from "./default.parser";

export class DataListParser extends DefaultParser {
  postProcessRow(row: FlowTypes.Data_listRow) {
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
    // extract dynamic fields for runtime evaluation
    // NOTE CC 2022-08-17 - not currently in use
    const dynamicFields = extractDynamicFields(row);
    if (dynamicFields) {
      // row._dynamicFields = dynamicFields;
      // row._dynamicDependencies = extractDynamicDependencies(dynamicFields);
    }
    return row;
  }

  public postProcessFlows(flows: FlowTypes.FlowTypeWithData[]) {
    const flowsWithOverrides = assignFlowOverrides(flows);
    return flowsWithOverrides;
  }
}
