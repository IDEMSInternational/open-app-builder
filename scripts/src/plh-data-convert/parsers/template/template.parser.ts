import { FlowTypes } from "../../../../types";
import { DefaultParser } from "../default/default.parser";
import { flattenJson, parsePLHCollectionString, parsePLHListString } from "../utils";

export class TemplateParser extends DefaultParser {
  constructor() {
    super();
    this.groupSuffix = "";
  }
  postProcess(row: FlowTypes.TemplateRow, nestedPath?: string) {
    // delete deep meta fields (e.g. __empty)
    Object.keys(row).forEach((k) => {
      if (k.startsWith("__")) {
        delete row[k];
      }
    });
    // remove any comments
    delete row["comments"];
    // remove empty rows
    if (Object.keys(row).length === 0) {
      return;
    }
    // set all empty row and nested row types to 'set_variable' type
    if (!row.type) {
      row.type = "set_variable";
    }
    // TODO - confirm if handling the same and then remove from excel sheets
    if (row.type === ("template_group" as any)) {
      row.type = "template";
    }
    // when unique name not specified assume namespacing with template value (flow_name)
    // or the row type for non-templates
    if (!row.name) {
      if (row.type === "template") {
        row.name = row.value;
      } else {
        row.name = row.type;
      }
    }
    // track path to row when nested
    row._nested_name = nestedPath ? `${nestedPath}.${row.name}` : row.name;

    // convert any variables (local/global) list or collection strings (e.g. 'my_list_1')
    if (row.value && typeof row.value === "string") {
      if (row.name?.includes("_list") && row.value && typeof row.value === "string") {
        row.value = parsePLHListString(row.value);
      }
      if (row.name?.includes("_collection") && row.value && typeof row.value === "string") {
        row.value = parsePLHCollectionString(row.value);
      }
    }

    // parse action list
    if (row.action_list) {
      row.action_list = row.action_list
        .map((actionString) => this.parseActionString(actionString as any))
        .filter((action) => action != null);
    }
    if (row.parameter_list) {
      row.parameter_list = this.parseParameterList(row.parameter_list as any);
    }
    // extract dynamic fields for runtime evaluation
    const dynamicFields = this.extractDynamicFields(row);
    if (dynamicFields) {
      row._dynamicFields = dynamicFields;
      row._dynamicDependencies = this.extractDynamicDependencies(dynamicFields);
    }

    // handle nested rows in same way
    if (row.rows) {
      row.rows = row.rows.map((r) => this.postProcess(r, row._nested_name));
    }
    return row;
  }

  /**
   * Convert action_list string to row action object, e.g.
   *
   * string: `"click | set_value | hide_intro:true"`
   *
   * parsed:
   * ```
   * {
   *    action_id: "set_value",
   *    args: ["hide_intro","true"]
   * }
   * ```
   */
  private parseActionString(actionString: string): FlowTypes.TemplateRowAction {
    const _raw = actionString;
    actionString = _handleTextExceptions(actionString);
    // ensure action starts with named trigger (default 'click')
    const actionTriggers: FlowTypes.TemplateRowAction["trigger"][] = [
      "click",
      "completed",
      "uncompleted",
      "changed",
      "audio_play",
      "audio_pause",
      "audio_end",
      "audio_first_start",
    ];
    if (!actionTriggers.find((t) => actionString.startsWith(t))) {
      actionString = `click | ${actionString}`;
    }
    const _cleaned = actionString;
    // This was causing an error

    // CC 2021-03-27 - Above comment from Michael likely due to intentional catch of unparsed lists ';'
    // which this commit fixes. Should review in future

    // const _parsed = parsePLHString(actionString);
    const parts = actionString.split("|").map((s) => s.trim());
    const trigger = parts[0] as any;
    if (parts[1]) {
      const [action_id, ...args] = parts[1].split(":").map((s) => s.trim()) as any;
      return { trigger, action_id, args, _raw, _cleaned };
    } else {
      return { trigger, action_id: null, args: [], _raw, _cleaned };
    }
    /* let [[trigger], [action_id, ...args]] = _parsed as any[];
    // when responding to actions the action_id is actually the emitted name, so move to args
    if (trigger === "respond_to_action") {
      args.unshift(action_id);
      action_id = "emit";
    }
    return { trigger, action_id, args, _raw, _cleaned }; */
  }

  private parseParameterList(parameterList: string[]) {
    const parameterObj: FlowTypes.TemplateRow["parameter_list"] = {};
    parameterList.forEach((p) => {
      let [key, value] = p.split(":").map((str) => str.trim()) as any[];
      // if a single word is specified, e.g. 'box_display', assume setting param to true
      if (value === undefined) {
        value = "true";
      }
      parameterObj[key] = value;
    });
    return parameterObj;
  }

  /**
   * Process each column specified in VARIABLE_FIELDS, to check whether there are any references to
   * dynamic fields, such as @local.someVar. These can appear nested within objects or arrays so requires
   * recursive iteration
   *
   * Store these references in a separate object so they can be evaluated at runtime
   */
  private extractDynamicFields(data: any) {
    let dynamicFields = {};
    switch (typeof data) {
      case "object":
        // simply convert array to object to handle in next case
        // ie. ["a","b"] => {0: "a", 1: "b"}
        if (Array.isArray(data)) {
          data = _arrayToObject(data);
        }
        if (data !== null) {
          // data is a json-like object
          Object.entries(data).forEach(([key, value]) => {
            // skip processing some columns (remember these can be nested in other objects like parameter_list)
            if (!["comments", "_dynamicFields"].includes(key)) {
              const nestedDynamic = this.extractDynamicFields(value);
              if (nestedDynamic) {
                dynamicFields[key] = nestedDynamic;
              }
            }
          });
        }
        break;
      case "string":
        const dynamicEvaluators = _extractDynamicEvaluators(data as string);
        if (dynamicEvaluators) {
          return dynamicEvaluators;
        }
    }
    // nested dynamic fields are managed in the row themselves
    if (dynamicFields.hasOwnProperty("rows")) {
      delete dynamicFields["rows"];
    }
    // only return is something has been assigned
    if (Object.keys(dynamicFields).length > 0) {
      return dynamicFields;
    }
  }

  private extractDynamicDependencies(dynamicFields: FlowTypes.TemplateRow["_dynamicFields"]) {
    const dynamicDependencies = {};
    const flatFields = flattenJson<FlowTypes.TemplateRowDynamicEvaluator[]>(dynamicFields);
    Object.entries(flatFields).forEach(([key, fields]) => {
      fields.forEach((field) => {
        const deps = dynamicDependencies[field.matchedExpression] || [];
        dynamicDependencies[field.matchedExpression] = [...deps, key];
      });
    });
    return dynamicDependencies;
  }
}

/**
 * some common authoring scenarios have been reduced to single keywords for ease-of-authoring
 * replace these with full specifications
 */
function _handleTextExceptions(text: string) {
  // a maximum of 1 replacement will be made, so order in terms of specifivity
  const shorthandReplacements = {
    exit: "emit | exit",
    mark_as_complete: "emit | complete",
    mark_as_skipped: "emit | skipped",
  };
  Object.entries(shorthandReplacements).some(([original, replacement]) => {
    // use a regular expression to prevent matching words that have additional content before
    // e.g. app_launch should not match on first_app_launch (start of string regex)
    const regex = new RegExp(`^${original}`);
    text = text.replace(regex, replacement);
    // if a match has been found return a true value so that future matches are not made
    // (e.g. prevent app_launch match running after first_launch match)
    return regex.test(text);
  });
  return text;
}

function _extractDynamicEvaluators(
  fullExpression: string
): FlowTypes.TemplateRowDynamicEvaluator[] | null {
  // match fields such as @local.someField
  // deeper nesting will be need to be handled after evaluation as part of JSEvaluation (e.g. @local.somefield.nestedProperty)
  // group 1: @local, @fields etc.
  // group 2: property of group, e.g. @local.'someVar'
  // group 3: trailing evaluation, e.g. @local.someVar'.nestedvar.length'
  const regex = /@([a-z]+)\.([0-9a-z_]+)([0-9a-z_.]*)/gi;
  let allMatches: FlowTypes.TemplateRowDynamicEvaluator[] = [];
  if (typeof fullExpression === "string") {
    let match: RegExpExecArray;
    // run recursive match for all dynamic expressions
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#finding_successive_matches
    /* eslint-disable no-cond-assign */
    while ((match = regex.exec(fullExpression)) !== null) {
      const [matchedExpression, type, fieldName] = match as any[];
      allMatches.push({ fullExpression, matchedExpression, type, fieldName });
    }
    // expect the number of match statements to match the total number of @ characters (replace all non-@)
    // provide a warning if this is not the case
    const expectedMatchLength = fullExpression.replace(/[^@]/g, "").length;
    if (allMatches.length !== expectedMatchLength) {
      console.warn(
        `Expected ${expectedMatchLength} dynamic matches but recorded ${allMatches.length}`,
        fullExpression,
        allMatches
      );
    }
  }
  if (allMatches.length > 0) {
    return allMatches;
  }
  return null;
}

function _arrayToObject(arr: any[]) {
  const obj = {};
  arr.forEach((el, i) => (obj[i] = el));
  return obj;
}
