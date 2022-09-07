import { Injector } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { booleanStringToBoolean } from "src/app/shared/utils";
import { ItemProcessor } from "../../processors/item";
import { TemplateContainerComponent } from "../../template-container.component";
import { mergeTemplateRows } from "../../utils/template-utils";
import { TemplateFieldService } from "../template-field.service";
import { TemplateTranslateService } from "../template-translate.service";
import { TemplateVariablesService } from "../template-variables.service";
import { TemplateInstanceService } from "./template-instance.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

type IRowOverridesHash = {
  [row_name: string]: Partial<FlowTypes.TemplateRow> & { _processed?: boolean };
};
type ITemplateOverridesHash = {
  [template_nested_name: string]: IRowOverridesHash;
};
export type ITemplateRowMap = { [row_nested_name: string]: FlowTypes.TemplateRow };
/**
 * This service handles template row initialisation (with parent override merging)
 * and dynamic row processing.
 *
 * NOTE - the service is not injected as every template should instantiate their own copy
 * for processed row tracking *
 */
export class TemplateRowService extends TemplateInstanceService {
  /** List of overrides set by parent templates for access during parent processing */
  /** Hashmap of all rows keyed by nested row name (e.g. contentBox1.row1.title)  */
  public templateRowMap: ITemplateRowMap = {};
  public renderedRows: FlowTypes.TemplateRow[]; // rows processed and filtered by condition

  private templateVariablesService: TemplateVariablesService;
  private templateTranslateService: TemplateTranslateService;
  private templateFieldService: TemplateFieldService;
  constructor(injector: Injector, public container: TemplateContainerComponent) {
    super(injector);
    this.templateVariablesService = this.getGlobalService(TemplateVariablesService);
    this.templateTranslateService = this.getGlobalService(TemplateTranslateService);
    this.templateFieldService = this.getGlobalService(TemplateFieldService);
  }

  /***************************************************************************************
   *  Row Initialisation
   **************************************************************************************/

  /**
   * On template init combine any inherited row overrides with template rows,
   * process dynamic variables and filter conditions
   */
  public async processContainerTemplateRows() {
    const { name, template, row } = this.container;
    log_group("[Rows Init]", name, row?.value || "");
    const overrides = this.getParentOverridesHashmap(row?.rows, name);
    const rowsWithOverrides = this.processParentOverrides(template?.rows, overrides, name);
    await this.processRows(rowsWithOverrides);
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
  private getParentOverridesHashmap(
    inheritedRows: FlowTypes.TemplateRow[] = [],
    templateNestedName: string
  ) {
    let overridesHashmap: ITemplateOverridesHash = { [templateNestedName]: {} };
    for (const row of inheritedRows) {
      // if an override has child rows it will be nested properties
      // these will be processed on a second pass so store namespaced
      const override = this.extractOverrideFields(row);
      if (override.rows) {
        const childNestedName = `${templateNestedName}.${row.name}`;
        // only process the first level of child properties. The rest can be merged to handle on
        // child template init
        if (childNestedName.split(".").length < 2) {
          const nestedHashmap = this.getParentOverridesHashmap(override.rows, childNestedName);
          overridesHashmap = { ...overridesHashmap, ...nestedHashmap };
          delete override.rows;
        }
      }
      overridesHashmap[templateNestedName][row.name] = override;
    }
    return overridesHashmap;
  }
  /**
   * When overriding rows we don't want to include any dynamic references for the parent
   * as these will not always update in the child. Remove these along with type and nested name
   */
  private extractOverrideFields(row: FlowTypes.TemplateRow) {
    const { _nested_name, _dynamicFields, _dynamicDependencies, type, ...overrideFields } = row;
    if (overrideFields.rows) {
      overrideFields.rows = overrideFields.rows.map((r) => this.extractOverrideFields(r));
    }
    return overrideFields as FlowTypes.TemplateRow;
  }

  /**
   * Lookup list of template row overrides from parent and use to merge into existing rows,
   * logging any mismatches and adding as additional set_variable
   */
  private processParentOverrides(
    originalRows: FlowTypes.TemplateRow[] = [],
    overridesHashmap: ITemplateOverridesHash,
    templateNestedName: string
  ) {
    let processedRows: FlowTypes.TemplateRow[];
    const overrides = overridesHashmap[templateNestedName] || {};

    if (Object.keys(overrides).length > 0) {
      log("[Overrides Start]", templateNestedName, { originalRows, overrides });
    }
    // process main overrides
    processedRows = originalRows.map((r) => {
      const override = overrides[r.name];
      let processed = r;
      if (override) {
        overrides[r.name]._processed = true;
        processed = mergeTemplateRows(override as any, r);
      }
      // process and child row or nested template/properties
      if (processed.rows) {
        if (processed.type === "nested_properties" || processed.type === "template") {
          templateNestedName = `${templateNestedName}.${processed.name}`;
        }
        processed.rows = this.processParentOverrides(
          processed.rows,
          overridesHashmap,
          templateNestedName
        );
      }
      return processed;
    });
    const rowWithAdditionalMissing = this.processMissingParentOverrides(processedRows, overrides);

    if (Object.keys(overrides).length > 0) {
      log("[Overrides End]", templateNestedName, { originalRows, overrides, processedRows });
    }

    return rowWithAdditionalMissing;
  }

  /**
   * Check for any unprocessed overrides (passed by parent, but do not exist on child)
   * assume intended as a set_variable statement pushed to the start of the template
   */
  private processMissingParentOverrides(
    processedRows: FlowTypes.TemplateRow[],
    overrides: IRowOverridesHash = {}
  ) {
    const unprocessedOverrides = Object.values(overrides).filter((o) => !o._processed);
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
    rows = rows || this.container.template.rows;
    logName = logName || this.container.name;
    const processedRows = [];
    for (const preProcessedRow of rows) {
      // call an anonymous function so that we can return/break the async for-of loop if required
      // and still push to the processedRows variable
      const processed = await this.processSingleRow(preProcessedRow, isNestedTemplate);
      // only include rows that do not return undefined (e.g. set_variable)
      if (processed) {
        // in case of processing items one row will be mapped to multiple so include all
        if (Array.isArray(processed)) {
          processed.forEach((p) => processedRows.push(p));
        } else {
          processedRows.push(processed);
        }
      }
    }
    this.container.template.rows = processedRows;
    // filtering can have impure results for deeply nested objects (e.g. changing original rows),
    // so force new object first (e.g. debug_combo_box_in_dg)
    // NOTE - avoid any additional cdr detectChanges after (new object would always force full re-render)
    const renderedRows = this.filterConditionalTemplateRows(
      JSON.parse(JSON.stringify(processedRows))
    );
    this.renderedRows = renderedRows;
    log("[Rows Processed]", logName, { rows, processedRows, renderedRows });
    return processedRows;
  }

  private async processSingleRow(
    preProcessedRow: FlowTypes.TemplateRow,
    isNestedTemplate: boolean
  ) {
    const { _nested_name, _evalContext } = preProcessedRow;
    // Evaluate row variables in context of current local state
    const evalContext = {
      ..._evalContext,
      templateRowMap: this.templateRowMap,
      row: preProcessedRow,
    };

    // First process any dynamic condition. If evaluates as false can stop processing any further
    if (preProcessedRow.hasOwnProperty("condition")) {
      const { condition } = await this.templateVariablesService.evaluatePLHData(
        { condition: preProcessedRow.condition },
        evalContext
      );
      if (!condition || condition === "false") {
        return { ...preProcessedRow, condition: false };
      }
    }
    // As translations are applied in raw format (e.g. "Hello @global.some_field")
    // strings should be translated before dynamic processing
    const translatedRow = this.templateTranslateService.translateRow(preProcessedRow);

    // Continue processing full row
    const parsedRow: FlowTypes.TemplateRow = await this.templateVariablesService.evaluatePLHData(
      { ...translatedRow },
      evalContext
    );

    const row = parsedRow;
    const { name, value, type, _dynamicFields } = row;

    // Make type assigned to hidden consistent
    if (row.hasOwnProperty("hidden")) {
      row.hidden = booleanStringToBoolean(row.hidden);
    }

    if (type === "template") isNestedTemplate = true;

    // Instead of returning themselves items looped child rows
    if (type === "items") {
      // extract raw parameter list
      const itemDataList: { [id: string]: any } = row.value;
      const parameterList = this.hackUnparseItemParameterList(row);
      const parsedItemDataList = await this.parseDataList(itemDataList);
      const itemRows = new ItemProcessor(parsedItemDataList, parameterList).process(row.rows);
      const parsedItemRows = await this.processRows(itemRows, isNestedTemplate, row.name);
      return parsedItemRows;
    }

    // process any nested rows in same way
    if (row.rows) {
      log_group("[Rows Process]", row._nested_name);
      const childRows = await this.processRows(row.rows, isNestedTemplate, row.name);
      row.rows = childRows;
      log_groupEnd();
    }

    // Handle rows that should only be initialised once
    // Only process rows if not part of a nested template row (which will be handled in own template initialisation)
    if (!isNestedTemplate) {
      switch (type) {
        case "set_field":
          // console.warn("[W] Setting fields from template is not advised", row);

          await this.templateFieldService.setField(name, value);
          return;
        // ensure set_variables are recorded via their name (instead of default nested name)
        // if a variable is dynamic keep original for future re-evaluation (otherwise discard)
        case "set_variable":
          this.templateRowMap[name] = row;
          if (_dynamicFields) {
            return preProcessedRow;
          }
          return;
        // merge new actions with existing container action list
        case "update_action_list":
          // TODO - refactor to standalone array merge method
          const existing_actions = this.container.row?.action_list || [];
          // remove any actions previously added by the same update and then add newly processed actions
          const base_actions = existing_actions.filter(
            (a) => !a["_update_name"] || a["_update_name"] !== name
          );
          const new_actions = row.action_list.map((a) => ({
            ...a,
            _update_name: name, // keep track for future updates
            _self_triggered: true, // by default actions are triggered from parent context, specify self
          }));
          const updated_actions = [...base_actions, ...new_actions];
          this.container.row = { ...this.container.row, action_list: updated_actions };
          break;
        default:
          // all other types should just set own value for use in future processing
          this.templateRowMap[_nested_name] = row;
          break;
      }
    }
    return row;
  }

  /**
   * When actions have triggered updates this method is called to handle updating the current template
   * TODO - Design more efficient way to determine if re-rendering necessary
   */
  public async processRowUpdates() {
    return this.processRows(this.container.template.rows);
  }

  /***************************************************************************************
   *  Utils
   **************************************************************************************/

  private async parseDataList(dataList: { [id: string]: any }) {
    const parsed: { [id: string]: any } = {};
    for (const [listKey, listValue] of Object.entries(dataList)) {
      parsed[listKey] = listValue;
      for (const [itemKey, itemValue] of Object.entries(listValue)) {
        if (typeof itemValue === "string") {
          parsed[listKey][itemKey] = await this.templateVariablesService.evaluateConditionString(
            itemValue
          );
        }
      }
    }
    return parsed;
  }

  /**
   * When parsing item parameter lists filter references to @item will be replaced before processing
   * Hacky workaround to replace back with unparsed value
   */
  private hackUnparseItemParameterList(row: FlowTypes.TemplateRow) {
    const list = row.parameter_list;
    const unparsedFilter = row._dynamicFields?.parameter_list?.filter?.[0].fullExpression;
    if (list && unparsedFilter) {
      list.filter = unparsedFilter;
    }
    return list;
  }

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
