import { extractDynamicFields, FlowTypes } from "data-models";
import {
  assignFlowOverrides,
  extractConditionList,
  parseAppDataCollectionString,
  setNestedProperty,
} from "../../../utils";
import { DefaultParser } from "./default.parser";
import { isObjectLiteral, Logger } from "shared";

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

  public override postProcessFlow(flow: FlowTypes.Data_list): FlowTypes.Data_list {
    flow.metadata = this.getFlowMetadata(flow);
    return flow;
  }

  public postProcessFlows(flows: FlowTypes.Data_list[]) {
    const flowsWithOverrides = assignFlowOverrides(flows);
    return flowsWithOverrides;
  }

  /** Assign column metadata from @metadata row if provided, or infer from data if not*/
  private getFlowMetadata(flow: FlowTypes.Data_list) {
    const [firstRow] = flow.rows;
    const metadata =
      firstRow?.id === "@metadata"
        ? this.assignMetadataFromRow(firstRow)
        : this.inferMetadataFromData(flow.rows);

    const errors = this.qualityCheckMetadata(metadata);
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      Logger.error({
        msg1: `[${flow.flow_name}] Data List validation has (${errors.length}) errors`,
        msg2: flow._xlsxPath,
      });
    }
    return metadata;
  }

  /** Assign data_list metadata using a first `@metadata` row */
  private assignMetadataFromRow(metadataRow: FlowTypes.Data_listRow) {
    // do not extract metadata for id column
    const { id, ...values } = metadataRow;
    const metadata: FlowTypes.Data_list["metadata"] = {};
    for (const [field, metadataString] of Object.entries(values)) {
      metadata[field] = parseAppDataCollectionString(metadataString as string) as any;
    }
    return metadata;
  }

  /** Infer data_list metadata from data */
  private inferMetadataFromData(rows: FlowTypes.Data_listRow[]) {
    const metadata: FlowTypes.Data_list["metadata"] = {};
    for (const row of rows) {
      // do not extract metadata for id column
      const { id, ...values } = row;
      for (const [field, value] of Object.entries(values)) {
        if (!metadata[field]) {
          metadata[field] = { type: undefined };
        }
        // only assign type if previously unassigned
        if (!metadata[field].type) {
          metadata[field].type = this.inferColumnDataType(value);
        }
      }
    }
    return metadata;
  }

  private inferColumnDataType(value: any): FlowTypes.Data_listColumnType {
    if (value === undefined) return undefined;
    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    if (isObjectLiteral(value)) return "object";
    return undefined;
  }

  private qualityCheckMetadata(metadata: FlowTypes.Data_list["metadata"]) {
    const errors: string[] = [];
    for (const [columnName, columnMetadata] of Object.entries(metadata)) {
      // ensure all columns have data type
      if (columnMetadata.type === undefined) {
        errors.push(
          `"${columnName}" column cannot infer type\nEither include an @metadata column or add example value to a row`
        );
      }
    }
    return errors;
  }
}
