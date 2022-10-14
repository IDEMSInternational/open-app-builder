import chalk from "chalk";
import { FlowTypes } from "data-models";
import { TemplatedData } from "shared";
import {
  parseAppDataListString,
  parseAppDataCollectionString,
  parseAppDataActionString,
  parseAppDateValue,
} from "../../../utils";
import { getActiveDeployment } from "../../../../../deployment/get";
import { FlowParserProcessor } from "../flowParser";
// When running this parser assumes there is a 'type' column
type IRowData = { type: string; name?: string; rows?: IRowData };

/**
 * The default processor performs the following:
 * - Look for rows starting `begin_groupname` and `end_groupname`, form a
 * nested group `groupname_group`. E.g. `begin_step` and `end_step` -> `step_group`
 * - Rewrite urls for `_asset` types to direct to local assets folder
 * - Rewrite `_list` content as string array
 */
export class DefaultParser<
  FlowType extends FlowTypes.FlowTypeWithData = FlowTypes.FlowTypeWithData
> {
  activeDeployment = getActiveDeployment();

  public flow: FlowType;

  /** All rows are handled in a queue, processing linearly */
  public queue: IRowData[];
  private summary = { missingAssets: [] };

  /** All parsers have access to main processor */
  constructor(public flowProcessor: FlowParserProcessor) {}

  /** Default function to call a start the process of parsing rows */
  public run(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeWithData {
    this.flow = JSON.parse(JSON.stringify(flow));
    this.queue = flow.rows;
    const processedRows = [];
    // If first row specifies default values extract them and remove row from queue
    const rowDefaultValues = this.extractRowDefaultValues(this.flow);
    if (rowDefaultValues) {
      this.queue.shift();
    }
    // Process queue
    while (this.queue.length > 0) {
      const row = this.queue[0];
      try {
        const processed = new RowProcessor(row, this, rowDefaultValues).run();
        // some rows may be omitted during processing so ignore
        if (processed) {
          const postProcessed = this.postProcessRow(processed);
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
    this.flow.rows = processedRows;
    this.flow = this.postProcessFlow(this.flow);
    return this.flow;
  }

  /** If any flows have a first row that starts `@default` return values */
  private extractRowDefaultValues(flow: FlowType) {
    const firstRow = flow.rows?.[0] || {};
    if (Object.values(firstRow)[0] === "@default") {
      const defaultKey = Object.keys(firstRow)[0];
      delete firstRow[defaultKey];
      return firstRow;
    }
  }

  /***************************************************************************************
   * Postprocess Pipeline
   * If extending the class, override these default methods to add additional
   * postprocess pipeline. By default, each method just returns its input.
   **************************************************************************************/

  /** Overridable method called by parser to apply any additional processing
   * on each individual row. By default the original row is simply returned */
  public postProcessRow(row: any) {
    return row;
  }

  /** Overridable method called by parser to apply any additional processing
   * on each individual flow. By default the original flow is simply returned */
  public postProcessFlow(flow: FlowType) {
    return flow;
  }

  /** Overridable method called by parser to apply any additional processing on the
   * array of all processed flows. By default the original list is simply returned */
  public postProcessFlows(flows: FlowType[]) {
    return flows;
  }
}

/**
 * Process individual template rows. By default this includes steps such as removing metadata columns,
 * migrating deprecated columns, processing default values and self-references and handling translations
 */
class RowProcessor {
  constructor(public row: IRowData, public parent: DefaultParser, public defaultValues?: any) {}

  public run() {
    this.processRowDefaultValues();
    this.removeMetaFields();
    this.cleanFieldValues();
    this.migrateDeprecatedFields();
    this.assignTranslatedFields();
    this.replaceRowSelfReferences();

    // NOTE - translated and row-reference fields can both reference each other
    // (e.g. @row.title -> title::eng -> @row.id ) so additional update required after translate and replace
    this.updateTranslatedFields();

    this.handleSpecialFieldTypes();
    this.processNestedRowGroups();

    // remove rows now left as empty (null return will remove from future processing)
    if (Object.keys(this.row).length === 0) {
      return null;
    }
    return this.row;
  }

  /**
   * When processing datalists only some fields will be translatable. These are identified with a
   * `::eng` suffix, e.g. title::eng
   *
   * Copy these base translations to the base field (e.g. `title`), and track ref in metadata
   * Note, cannot assume all :: statements translations as also used in fields, e.g. fields::favourite
   */

  private assignTranslatedFields() {
    Object.keys(this.row).forEach((field) => {
      // TODO - alter fields syntax to avoid potential conflict (e.g. fields::eng)
      if (field.endsWith("::eng")) {
        // copy eng value to base column. Avoid replace if base column already exists with value
        // (e.g. in case where value, value::eng only applies to some rows in template)
        const baseTranslation = this.row[field];
        const baseField = field.replace("::eng", "");
        if (this.row[baseField] === undefined || this.row[baseField] === "") {
          this.row[baseField] = baseTranslation;
          this.row["_translatedFields"] = {
            ...this.row["_translatedFields"],
            [baseField]: {
              eng: this.row[baseField],
            },
          };
        }
        delete this.row[field];
      }
    });
    this.updateTranslatedFields();
  }

  private updateTranslatedFields() {
    const translatedFields = this.row["_translatedFields"] || {};
    Object.keys(translatedFields).forEach((field) => {
      this.row["_translatedFields"][field] = {
        eng: this.row[field],
      };
    });
  }

  /**
   * TODO - some specific sheet types (e.g. template data_list and derivatives)
   * will likely perfer to convert depending on the name or id of the row (ending in _list or _collection)
   * Should likely want to add support to automate conversion (currently manually handled in template parser)
   **/
  private processNestedRowGroups() {
    const type = this.row.type || "";
    if (type.startsWith("begin_")) {
      try {
        const group = this.extractGroup();
        const groupType = type.replace("begin_", "");
        const subParser = new DefaultParser(this.parent.flowProcessor);
        const childFlow = JSON.parse(JSON.stringify(this.parent.flow));
        childFlow.rows = group;
        const parsedGroup = subParser.run(childFlow);
        this.row = { ...this.row, type: groupType, rows: parsedGroup.rows as any };
      } catch (ex) {
        console.warn("Error on group extract on row", this.row, this.parent.flow, ex);
        console.warn("Error is in sheet ", this.parent.flow._xlsxPath);
      }
    }
    // Can ignore as handled during subgroup extraction
    if (type.startsWith("end_")) {
      this.row = {} as any;
    }
  }

  /**
   * Look through current queue for first instance of a group defined by `begin_` and `end_`
   * row types. Keeps an internal tally of any additional `begin_` types to handle case
   * where further groups are nested within a group
   */
  private extractGroup(startIndex = 0): IRowData[] {
    let nestedIfCount = 0;
    const endIndex = this.parent.queue.slice(startIndex).findIndex((row) => {
      const type = row.type || "";
      if (type.startsWith("begin_")) nestedIfCount++;
      if (type.startsWith("end_")) nestedIfCount--;
      return nestedIfCount === 0;
    });
    if (endIndex === -1) {
      console.log("could not find end index", startIndex);
      throw new Error(
        "extract group error. count not find end index for start index=" + startIndex
      );
    }
    const queueEndIndex = startIndex + endIndex;
    // remove all rows from the queue excluding start and end clause statements (e.g. if/end-if)
    const groupedRows = this.parent.queue.splice(1, queueEndIndex - 1);
    return groupedRows;
  }

  private handleSpecialFieldTypes() {
    Object.entries(this.row).forEach(([field, value]) => {
      // skip processing any fields that will be populated from datalist itmes
      const shouldSkip = typeof value === "string" && value.startsWith("@item.");
      // handle custom fields
      if (!shouldSkip) {
        if (typeof value === "string") {
          if (field.endsWith("_list")) {
            this.row[field] = parseAppDataListString(value);
          }
          if (field.endsWith("_collection")) {
            this.row[field] = parseAppDataCollectionString(this.row[field]);
          }
          if (field.endsWith("action_list")) {
            this.row[field] = this.row[field]
              .map((actionString) => parseAppDataActionString(actionString))
              .filter((action) => action !== null);
          }
        }
        // convert google/excel number dates to dates (https://stackoverflow.com/questions/16229494/converting-excel-date-serial-number-to-date-using-javascript)
        if (field.endsWith("_date")) {
          if (typeof this.row[field] === "number") {
            this.row[field] = parseAppDateValue(this.row[field]);
          }
        }
      }
    });
  }

  /** replace any self references, i.e "hello @row.id" => "hello some_id"   */
  private replaceRowSelfReferences() {
    // Hack - avoid replacing @row statements in data pipes as they refer to row on data source instead
    if (this.parent.flow.flow_type === "data_pipe") return this.row;
    // Handle replacements
    const context = { row: this.row };
    return new TemplatedData({ context, initialValue: this.row }).parse();
  }

  private removeMetaFields() {
    Object.keys(this.row).forEach((field) => {
      if (field.startsWith("__")) {
        delete this.row[field];
      }
      if (field.startsWith("comment")) {
        delete this.row[field];
      }
    });
  }
  private cleanFieldValues() {
    Object.keys(this.row).forEach((field) => {
      if (typeof this.row[field] === "string") {
        // remove whitespace
        this.row[field] = this.row[field].trim();
      }
    });
  }

  private migrateDeprecatedFields() {
    Object.keys(this.row).forEach((field) => {
      if (DEPRECATED_FIELD_NAMES.hasOwnProperty(field)) {
        const replacement = DEPRECATED_FIELD_NAMES[field];
        const warning = `-- ${this.parent.flow.flow_name} --\n[${field}] is deprecated and should be replaced with [${replacement}]`;
        console.warn(chalk.gray(warning));
        this.row[replacement] = JSON.parse(JSON.stringify(this.row[field]));
        delete this.row[field];
      }
    });
  }

  /** Apply any defaults where row value not defined or defaults included/omitted */
  private processRowDefaultValues() {
    if (this.defaultValues) {
      Object.entries(this.defaultValues).forEach(([key, value]) => {
        if (this.row[key] === undefined) {
          this.row[key] = value;
        } else {
          if (typeof this.row[key] === "string") {
            if (this.row[key].includes("@include_default")) {
              this.row[key] = this.row[key].replace("@include_default", value);
            }
            if (this.row[key].includes("@omit_default")) {
              delete this.row[key];
            }
          }
        }
      });
    }
  }
}

/**
 * Add context information to errors originating from row parser.
 * This will from the template error logging method
 * */
function throwRowParseError(error: Error, row: IRowData) {
  console.trace(error);
  error.message = `Error Parsing Row \n  ${chalk.yellow(
    JSON.stringify(row, null, 2)
  )} \n ${chalk.red(error.message)}`;
  // add more context to error
  throw error;
}

const DEPRECATED_FIELD_NAMES = {
  click_action_list: "action_list",
};
