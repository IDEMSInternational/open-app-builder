import { extractDynamicFields, FlowTypes } from "data-models";
import {
  assignFlowOverrides,
  extractConditionList,
  parseAppDataCollectionString,
  setNestedProperty,
} from "../../../utils";
import { DefaultParser } from "./default.parser";
import { isEmptyObjectDeep, isObjectLiteral, Logger } from "shared";

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

  public override postProcessFlow(flow: FlowTypes.Data_list) {
    const flowWithMetadata = this.getFlowMetadata(flow);
    return flowWithMetadata;
  }

  public postProcessFlows(flows: FlowTypes.Data_list[]) {
    const flowsWithOverrides = assignFlowOverrides(flows);
    return flowsWithOverrides;
  }

  /** Assign column metadata from @metadata row if provided, or infer from data if not */
  private getFlowMetadata(flow: FlowTypes.Data_list) {
    const [firstRow] = flow.rows;
    let metadataInitial: FlowTypes.Data_list["_metadata"];
    // assign from metadata row and remove
    if (firstRow?.id === "@metadata") {
      metadataInitial = this.assignMetadataFromRow(firstRow);
      flow.rows = flow.rows.slice(1);
    }
    // infer from data when metadata row not available
    else {
      metadataInitial = this.inferMetadataFromData(flow.rows);
    }
    // quality check metadata and assign cleaned meta to flow
    const { warnings, metadata } = this.qualityCheckMetadata(metadataInitial);
    flow._metadata = metadata;

    if (warnings.length > 0) {
      for (const warning of warnings) {
        console.warn(warning);
      }
      Logger.warning({
        msg1: `[${flow.flow_name}] Data List validation has (${warnings.length}) warnings`,
        msg2: flow._xlsxPath,
      });
    }
    return flow;
  }

  /** Assign data_list metadata using a first `@metadata` row */
  private assignMetadataFromRow(metadataRow: FlowTypes.Data_listRow) {
    // do not extract metadata for id column
    const { id, ...values } = metadataRow;
    const metadata: FlowTypes.Data_list["_metadata"] = {};
    for (const [field, metadataString] of Object.entries(values)) {
      if (metadataString) {
        metadata[field] = parseAppDataCollectionString(metadataString as string) as any;
      }
    }
    return metadata;
  }

  /** Infer data_list metadata from data */
  private inferMetadataFromData(rows: FlowTypes.Data_listRow[]) {
    const metadata: FlowTypes.Data_list["_metadata"] = {};
    for (const row of rows) {
      // do not extract metadata for id column
      const { id, ...values } = row;
      for (const [field, value] of Object.entries(values)) {
        // do not assign type to other metadata columns
        if (!field.startsWith("_")) {
          // only assign type if previously unassigned
          if (!metadata[field]?.type) {
            const inferredType = this.inferColumnDataType(value);
            metadata[field] ??= {};
            metadata[field].type = inferredType;
          }
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

  private qualityCheckMetadata(metadata: FlowTypes.Data_list["_metadata"]) {
    const warnings: string[] = [];
    for (const [columnName, columnMetadata] of Object.entries(metadata)) {
      // omit metadata for string or undefined types, will used default "string" at runtime
      if (columnMetadata.type === "string" || columnMetadata.type === undefined) {
        delete metadata[columnName];
      }

      /**
       * TODO - consider whether check below actually useful to have
       * ensure all columns have data type
       */
      // if (columnMetadata.type === undefined) {
      //   metadata[columnName].type = "string";
      //   warnings.push(
      //     `"${columnName}" column cannot infer type (assume string)\nEither include an @metadata column or add example value to a row`
      //   );
      // }
    }
    return { warnings, metadata };
  }
}
