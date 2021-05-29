import { FlowTypes } from "src/app/shared/model";
import { mapToJson } from "src/app/shared/utils";
import { TemplateContainerComponent } from "../template-container.component";
import { mergeTemplateRows } from "../utils/template-utils";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = true;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

/**
 *
 *
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

  public async processInitialTemplateRows() {
    this.parentRowOverrides = this.getParentOverridesHashmap(this.container.row?.rows);
    const rowsWithOverrides = this.processParentOverrides(this.container.template?.rows);
    const allProcessedRows = this.processMissingParentOverrides(rowsWithOverrides);
    this.processedRows = await this.processRows(allProcessedRows, this.container.template);
    this.renderedRows = this.filterConditionalTemplateRows(this.processedRows);
  }

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
  private processParentOverrides(originalRows: FlowTypes.TemplateRow[]) {
    if (Object.keys(this.parentRowOverrides).length > 0) {
      log("[Overrides Start]", {
        overrides: { ...this.parentRowOverrides },
        originalRows: [...originalRows],
      });
      const processedRows = originalRows.map((r) => {
        const processed = this.processRowOverride(r);
        // Note, whilst the main template merge function performs a recursive merge
        // we also want to process any nested overrides
        if (processed.rows) {
          processed.rows = this.processParentOverrides(processed.rows);
        }
        return processed;
      });
      log("[Overrides End]", { rows: { ...processedRows } });
      return processedRows;
    } else {
      log("[Overrides Skip]", { parentRowOverrides: { ...this.parentRowOverrides } });
      return originalRows;
    }
  }

  /**
   *  Lookup any overrides for a row or a row's nested child rows and apply
   */
  private processRowOverride(originalRow: FlowTypes.TemplateRow) {
    const override = this.parentRowOverrides[originalRow.name];
    if (override) {
      this.parentRowOverrides[originalRow.name]._processed = true;
    }
    return mergeTemplateRows(override as any, originalRow);
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
      console.warn("[W] Overrides could not find target row; Assuming set_variables", {
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
   * @param template used only during dynamic row evaluation for sibling lookup
   * @param isNestedRows if processing rows for use in the a nested template, specify
   * to prevent the variables being processed within the current template
   *
   */
  private async processRows(rows: FlowTypes.TemplateRow[], template: FlowTypes.Template) {
    log("[Process Rows Start]", {
      rows: [...rows],
      rowMap: mapToJson(this.templateRowMap),
    });
    const processedRows = [];
    for (const preProcessedRow of rows) {
      // call an anonymous function so that we can return/break the async for-of loop if required
      // and still push to the processedRows variable
      await (async () => {
        const { _nested_name } = preProcessedRow;
        log_group("[Row start]", preProcessedRow.name, { preProcessedRow });
        // Evaluate row variables in context of current local state
        const evalContext = { templateRowMap: this.templateRowMap, row: preProcessedRow };
        // create a new object with data from evaluation
        const parsedRow: FlowTypes.TemplateRow = await this.container.templateVariables.evaluatePLHData(
          preProcessedRow,
          evalContext
        );
        const { name, value, hidden, type } = parsedRow;
        log("parsedRow", name, { ...parsedRow });
        // Filter out if specified by condition. This might be string or boolean depending on the parser/calcs (check for both)
        // when dealing with nested rows we want to filter out to not pass to child,
        // but if dealing with local rows we want to keep for future processing (will be filtered later)
        // TODO - CC 2021-05-15 ideally calc column should be processed before rest of parsed row in case filtered out
        if (parsedRow.hasOwnProperty("condition")) {
          const condition = parsedRow.condition as any;
          // check for any falsy value (null, undefined, false) as well as 'false' string
          if (!condition || condition === "false") {
            parsedRow.condition = false;
            log("[Row end (condition)]", name);
            log_groupEnd();
            processedRows.push(parsedRow);
            // return now so that set_variable or set_field is not recorded when condition false
            return;
          }
        }
        // Make type assigned to hidden consistent
        if (hidden === (true as any) || hidden === "true") {
          parsedRow.hidden = true;
        }
        // Keep track of rows that should only ever be processed one time
        let omitFromProcessedRows = false;
        // Handle rows that set external data and filter out
        // TODO - confirm no other externally processed rows
        if (type === "set_field") {
          console.warn("[W] Setting fields from template rows is not advised", { ...parsedRow });
          this.container.templateService.setField(name, value);
          // stop processing and remove from future processing
          omitFromProcessedRows = true;
        }
        // store global reference for use in future initialisation logic
        // Note - child templates handle their own initialisation
        if (type !== "template") {
          this.templateRowMap.set(_nested_name, parsedRow);
        }
        // once set_variable rows have been processed they can be removed from the row list
        if (type === "set_variable") {
          omitFromProcessedRows = true;
        }
        log("[Row end]", name, { ...parsedRow });
        log_groupEnd();
        if (!omitFromProcessedRows) {
          processedRows.push(parsedRow);
        }
      })();
    }
    log("[Process Rows End]", {
      rows: [...processedRows],
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
    this.container.template.rows = await this.processRows(
      this.container.template.rows,
      this.container.template
    );
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
