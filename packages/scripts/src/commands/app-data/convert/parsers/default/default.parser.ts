import chalk from "chalk";
import { FlowTypes } from "data-models";
import { AbstractParser } from "../abstract.parser";
import {
  parseAppDataListString,
  parseAppDataCollectionString,
  parseAppDataActionString,
  parseAppDateValue,
} from "../../utils";
import { getActiveDeployment } from "../../../../deployment/get";
// When running this parser assumes there is a 'type' column
type IRowData = { type: string; name?: string; rows?: IRowData };

/**
 * The default processor performs the following:
 * - Look for rows starting `begin_groupname` and `end_groupname`, form a
 * nested group `groupname_group`. E.g. `begin_step` and `end_step` -> `step_group`
 * - Rewrite urls for `_asset` types to direct to local assets folder
 * - Rewrite `_list` content as string array
 */
export class DefaultParser implements AbstractParser {
  activeDeployment = getActiveDeployment();

  public groupSuffix = "_group";

  /** All rows are handled in a queue, processing linearly */
  private queue: IRowData[];
  private summary = { missingAssets: [] };
  private rowDefaultValues: any = {};

  /** Default function to call a start the process of parsing rows */
  public run(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeWithData {
    this.queue = flow.rows;
    const processedRows = [];
    // If first row specifies default values extract them and remove row from queue
    this.rowDefaultValues = this.extractRowDefaultValues(flow);
    if (this.rowDefaultValues) {
      this.queue.shift();
    }
    // Process queue
    while (this.queue.length > 0) {
      const row = this.queue[0];
      try {
        const processed = this.processRow(row, flow);
        // some rows may be omitted during processing so ignore
        if (processed) {
          const postProcessed = this.postProcess(processed);
          if (postProcessed) {
            processedRows.push(postProcessed);
          }
        }
        this.queue.shift();
      } catch (error) {
        throwRowParseError(error, row);
      }
    }
    if (this.summary.missingAssets.length > 0) {
      console.log(chalk.red("Missing Assets:"));
      console.table(this.summary.missingAssets);
    }

    return { ...flow, rows: processedRows };
  }

  /** If extending the class add additional postprocess pipeline here */
  public postProcess(row: any) {
    return row;
  }

  public postProcessFlows(flows: FlowTypes.FlowTypeWithData[]) {
    return flows;
  }

  /** If any flows have a first row that starts `@default` return values */
  private extractRowDefaultValues(flow: FlowTypes.FlowTypeWithData) {
    const firstRow = flow.rows?.[0] || {};
    if (Object.values(firstRow)[0] === "@default") {
      const defaultKey = Object.keys(firstRow)[0];
      delete firstRow[defaultKey];
      return firstRow;
    }
  }

  /** Handle a single row */
  private processRow(row: IRowData, flow: FlowTypes.FlowTypeWithData) {
    // Apply any defaults where row value not defined or defaults included/omitted
    if (this.rowDefaultValues) {
      Object.entries(this.rowDefaultValues).forEach(([key, value]) => {
        if (row[key] === undefined) {
          row[key] = value;
        } else if (row[key].includes("@include_default")) {
          row[key] = row[key].replace("@include_default", value);
        } else if (row[key].includes("@omit_default")) {
          delete row[key];
        }
      });
    }

    // Handle specific data manipulations for fields
    Object.keys(row).forEach((field) => {
      // delete metadata (e.g. __empty)
      if (field.startsWith("__")) {
        delete row[field];
      }
      // delete any comments, e.g. 'comment', 'comments', 'comment_1' etc.
      if (field.startsWith("comment")) {
        delete row[field];
      }
      // rename legacy fields
      if (DEPRECATED_FIELD_NAMES.hasOwnProperty(field)) {
        const replacement = DEPRECATED_FIELD_NAMES[field];
        const warning = `-- ${flow.flow_name} --\n[${field}] is deprecated and should be replaced with [${replacement}]`;
        console.warn(chalk.gray(warning));
        row[replacement] = JSON.parse(JSON.stringify(row[field]));
        delete row[field];
        field = replacement;
      }
      // replace any self references, i.e "hello @row.id" => "hello some_id", @row.text::eng
      // TODO - should find better long term option that can update based on dynamic value and translations
      if (typeof row[field] === "string") {
        const rowReplacements = [...row[field].matchAll(/@row.([0-9a-z_:]+)/gim)];
        for (const replacement of rowReplacements) {
          const [expression, replaceField] = replacement;
          const replaceValue = row[replaceField];
          row[field] = row[field].replace(expression, replaceValue);
        }
      }
      // remove any trailing whitespace from any entries
      if (typeof row[field] === "string") {
        row[field] = row[field].trim();
      }
      // mark fields for translation, rename so can process regularly (add translation data at end)
      // Note, cannot assume all :: statements translations as also used in fields, e.g. fields::favourite
      // TODO - alter fields syntax to avoid potential conflict (e.g. fields::eng)
      let isTranslateField = false;
      if (field.endsWith("::eng")) {
        // copy eng value to base column. Avoid replace if base column already exists with value
        // (e.g. in case where value, value::eng only applies to some rows in template)
        // (NOTE - could use the exclude_from_translation column, but may end up changing syntax)
        isTranslateField = true;
        const baseTranslation = row[field];
        const baseField = field.replace("::eng", "");
        if (row[baseField] === undefined || row[baseField] === "") {
          row[baseField] = baseTranslation;
        }
        field = baseField;
      }
      if (field.endsWith("_list")) {
        row[field] = parseAppDataListString(row[field]);
      }
      if (field.endsWith("_collection")) {
        row[field] = parseAppDataCollectionString(row[field]);
      }
      // parse action list
      if (field.endsWith("action_list")) {
        row[field] = row[field]
          .map((actionString) => parseAppDataActionString(actionString))
          .filter((action) => action != null);
      }
      // convert google/excel number dates to dates (https://stackoverflow.com/questions/16229494/converting-excel-date-serial-number-to-date-using-javascript)
      if (field.endsWith("_date")) {
        if (typeof row[field] === "number") {
          row[field] = parseAppDateValue(row[field]);
        }
      }

      // assign default translation and track as metadata
      if (isTranslateField) {
        row["_translatedFields"] = {
          ...row["_translatedFields"],
          [field]: {
            eng: row[field],
          },
        };
        delete row[`${field}::eng`];
      }
    });
    // remove rows now left as empty (null return will remove from future processing)
    if (Object.keys(row).length === 0) {
      return null;
    }

    /**
     * TODO - some specific sheet types (e.g. template data_list and derivatives)
     * will likely perfer to convert depending on the name or id of the row (ending in _list or _collection)
     * Should likely want to add support to automate conversion (currently manually handled in template parser)
     **/

    // Extract any required groups that start from this row
    const type = row.type || "";
    if (type.startsWith("begin_")) {
      try {
        const group = this.extractGroup();
        const groupType = type.replace("begin_", "") + this.groupSuffix;
        const subParser = new DefaultParser();
        subParser.groupSuffix = this.groupSuffix;
        const parsedGroup = subParser.run({ ...flow, rows: group });
        return { ...row, type: groupType, rows: parsedGroup.rows };
      } catch (ex) {
        console.warn("Error on group extract on row", row, flow, ex);
        console.warn("Error is in sheet ", flow._xlsxPath);
      }
    }
    // Can ignore as handled during subgroup extraction
    if (type.startsWith("end_")) {
      return;
    }

    return row;
  }

  /**
   * Look through current queue for first instance of a group defined by `begin_` and `end_`
   * row types. Keeps an internal tally of any additional `begin_` types to handle case
   * where further groups are nested within a group
   */
  private extractGroup(startIndex = 0): IRowData[] {
    let nestedIfCount = 0;
    const endIndex = this.queue.slice(startIndex).findIndex((row) => {
      const type = row.type || "";
      if (type.startsWith("begin_")) nestedIfCount++;
      if (type.startsWith("end_")) nestedIfCount--;
      return nestedIfCount === 0;
    });
    if (endIndex === -1) {
      console.log("could not find end index", startIndex);
      throw "extract group error. count not find end index for start index=" + startIndex;
    }
    const queueEndIndex = startIndex + endIndex;
    // remove all rows from the queue excluding start and end clause statements (e.g. if/end-if)
    const groupedRows = this.queue.splice(1, queueEndIndex - 1);
    return groupedRows;
  }
}

/**
 * Add context information to errors originating from row parser.
 * This will from the template error logging method
 * */
function throwRowParseError(error: Error, row: IRowData) {
  error.message = `Error Parsing Row \n  ${chalk.yellow(
    JSON.stringify(row, null, 2)
  )} \n ${chalk.red(error.message)}`;
  // add more context to error
  throw error;
}

const DEPRECATED_FIELD_NAMES = {
  click_action_list: "action_list",
};
