import { FlowTypes } from "src/app/shared/model";
import { mapToJson } from "src/app/shared/utils";
import { TemplateContainerComponent } from "../template-container.component";
import { mergeTemplateRows } from "../utils/template-utils";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

/**
 * This service handles template row initialisation (with parent override merging)
 * and dynamic row processing.
 *
 * NOTE - the service is not injected as every template should instantiate their own copy
 * for processed row tracking *
 */
export class TemplateRowService {
  /** List of overrides set by parent templates for access during parent processing */
  private parentRowOverrides: {
    [row_nested_name: string]: Partial<FlowTypes.TemplateRow> & { _processed?: boolean };
  };
  /** Hashmap of all rows keyed by nested row name (e.g. contentBox1.row1.title)  */
  public templateRowMap: Map<string, FlowTypes.TemplateRow> = new Map();
  public processedRows: FlowTypes.TemplateRow[];
  public renderedRows: FlowTypes.TemplateRow[]; // rows processed and filtered by condition
  constructor(public container: TemplateContainerComponent) {}

  /***************************************************************************************
   *  Row Initialisation
   **************************************************************************************/

  /**
   * On template init combine any inherited row overrides with template rows,
   * process dynamic variables and filter conditions
   */
  public async processInitialTemplateRows() {
    log_group(this.container.name);
    this.parentRowOverrides = this.getParentOverridesHashmap(this.container.row?.rows);
    const rowsWithOverrides = this.processParentOverrides(this.container.template?.rows);
    const rowWithAdditionalMissing = this.processMissingParentOverrides(rowsWithOverrides);
    this.processedRows = await this.processRows(rowWithAdditionalMissing);
    this.renderedRows = this.filterConditionalTemplateRows(this.processedRows);
    log_groupEnd();
  }

  /***************************************************************************************
   *  Parent Overrides
   **************************************************************************************/

  /**
   * Create a list of any inherited rows that were passed with the original parent template row
   * store as this.parentRowOverrides property on class to more easily track which overrides have and haven't been used
   * @param inheritedRows list of rows passed from parent to current template
   */
  private getParentOverridesHashmap(inheritedRows: FlowTypes.TemplateRow[] = []) {
    const overridesHashmap = {};
    for (const row of inheritedRows) {
      const { _nested_name, _dynamicFields, _dynamicDependencies, type, ...overrideFields } = row;
      overridesHashmap[row.name] = overrideFields;
    }
    return overridesHashmap;
  }

  /**
   * Lookup list of template row overrides from parent and use to merge into existing rows,
   * logging any mismatches and adding as additional set_variable
   */
  private processParentOverrides(originalRows: FlowTypes.TemplateRow[], logName = "") {
    if (Object.keys(this.parentRowOverrides).length > 0) {
      const processedRows = originalRows.map((r) => {
        const processed = this.processRowOverride(r);
        // Note, whilst the main template merge function performs a recursive merge
        // we also want to process any nested overrides
        if (processed.rows && processed.rows.length > 0) {
          processed.rows = this.processParentOverrides(processed.rows, processed.name);
        }
        return processed;
      });
      const overrides = { ...this.parentRowOverrides };
      log("[Overrides Processed]", logName, { originalRows, overrides, processedRows });
      return processedRows;
    } else {
      log("[Overrides Skipped]", logName, { originalRows });
      return originalRows;
    }
  }

  /** Lookup any overrides for a row or a row's nested child rows and apply */
  private processRowOverride(originalRow: FlowTypes.TemplateRow) {
    const override = this.parentRowOverrides[originalRow.name];
    if (override) {
      this.parentRowOverrides[originalRow.name]._processed = true;
      return mergeTemplateRows(override as any, originalRow);
    }
    return originalRow;
  }

  /**
   * Check for any unprocessed overrides (passed by parent, but do not exist on child)
   * assume intended as a set_variable statement pushed to the start of the template
   */
  private processMissingParentOverrides(processedRows: FlowTypes.TemplateRow[]) {
    const unprocessedOverrides = Object.values(this.parentRowOverrides).filter(
      (o) => !o._processed
    );
    if (unprocessedOverrides.length > 0) {
      const names = unprocessedOverrides.map((o) => o.name).join(",");
      console.warn(`[W] Overrides could not find [${names}]; \n Assuming set_variables`, {
        unprocessedOverrides,
        rows: { ...processedRows },
      });
      unprocessedOverrides.forEach((override) => {
        const { name, value } = override as any;
        const type = "set_variable";
        const rowEntry: FlowTypes.TemplateRow = { name, value, type, _nested_name: name };
        processedRows.unshift(rowEntry);
      });
    }
    return processedRows;
  }

  /***************************************************************************************
   *  Row Processing
   **************************************************************************************/

  /**
   * Process the main template rows, filtering by condition, processing variables
   * and extracting template references for child overrides
   *
   * @param isNestedTemplate indicate if processing child rows of a template row to skip specific functions
   */
  private async processRows(rows: FlowTypes.TemplateRow[], isNestedTemplate = false, logName = "") {
    logName = logName || this.container.name;
    const processedRows = [];
    for (const preProcessedRow of rows) {
      // call an anonymous function so that we can return/break the async for-of loop if required
      // and still push to the processedRows variable
      await (async () => {
        const { _nested_name } = preProcessedRow;
        // Evaluate row variables in context of current local state
        const evalContext = { templateRowMap: this.templateRowMap, row: preProcessedRow };
        const { templateVariables } = this.container;

        // First process any dynamic condition. If evaluates as false can stop processing any further
        if (preProcessedRow.hasOwnProperty("condition")) {
          const { condition } = await templateVariables.evaluatePLHData(
            { condition: preProcessedRow.condition },
            evalContext
          );
          if (!condition || condition === "false") {
            processedRows.push({ ...preProcessedRow, condition: false });
            return;
          }
        }

        // Continue processing full row
        let parsedRow: FlowTypes.TemplateRow = await templateVariables.evaluatePLHData(
          preProcessedRow,
          evalContext
        );
        const { name, value, hidden, type } = parsedRow;

        // Make type assigned to hidden consistent
        if (hidden === "true") parsedRow.hidden = true;

        if (type === "template") isNestedTemplate = true;

        // process any nested rows in same way
        if (parsedRow.rows) {
          parsedRow.rows = await this.processRows(parsedRow.rows, isNestedTemplate, _nested_name);
        }

        // Handle rows that should only be initialised once
        // Only process rows if not part of a nested template row (which will be handled in own template initialisation)
        if (!isNestedTemplate) {
          switch (type) {
            case "set_field":
              console.warn("[W] Setting fields from template is not advised", parsedRow);
              this.container.templateService.setField(name, value);
              return;
            // ensure set_variables are recorded via their name (instead of default nested name)
            case "set_variable":
              this.templateRowMap.set(name, parsedRow);
              return;
            default:
              // all other types should just set own value for use in future processing
              this.templateRowMap.set(_nested_name, parsedRow);
              break;
          }
        }
        processedRows.push(parsedRow);
      })();
    }
    log("[Rows Processed]", logName, {
      original: [...rows],
      processed: [...processedRows],
      rowMap: mapToJson(this.templateRowMap),
    });
    return processedRows;
  }

  /**
   * When actions have triggered updates this method is called to handle updating the current template
   * TODO - Design more efficient way to determine if re-rendering necessary
   */
  public async processRowUpdates() {
    log_group(`[Reprocess Template]`, this.container.name, {
      rowMap: mapToJson(this.templateRowMap),
      rows: this.container.template.rows,
      template: this.container.template,
    });
    this.container.template.rows = await this.processRows(this.container.template.rows);
    this.renderedRows = this.filterConditionalTemplateRows(this.container.template.rows);
    log("[Reprocess Complete]", this.renderedRows);
    log_groupEnd();
  }

  /***************************************************************************************
   *  Utils
   **************************************************************************************/

  /** recursively filter out any rows that have a false condition */
  private filterConditionalTemplateRows(rows: FlowTypes.TemplateRow[] = []) {
    return rows
      .filter((row) => row.condition !== false)
      .map((row) => {
        if (row.rows) {
          row.rows = this.filterConditionalTemplateRows(row.rows);
        }
        return row;
      });
  }
  public setLogging(showLogs: boolean) {
    SHOW_DEBUG_LOGS = showLogs;
    log = SHOW_DEBUG_LOGS ? console.log : () => null;
    log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
    log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;
  }
}
