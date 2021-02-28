import chalk from "chalk";
import { FlowTypes } from "../../../../types";
import { DefaultParser } from "../default/default.parser";

type IConditionList = FlowTypes.Reminder_conditionList;

export class ReminderListParser extends DefaultParser {
  constructor() {
    super();
  }
  postProcess(row: FlowTypes.Reminder_listRow) {
    // extract piped conditions
    const activationConditions = row.activation_condition_list as any[];
    row.activation_condition_list = activationConditions.map((c) => extractConditionList(c));
    const deactivationConditions = row.deactivation_condition_list as any[];
    row.deactivation_condition_list = deactivationConditions.map((c) => extractConditionList(c));
    return row;
  }
}

/**
 * TODO
 * 2021-02-27 CC
 * Failed attempt to make more systematic conversion/typing
 * 
 * 
 * Take an activation or deactivation criteria and format for use
 * @param c condition string formatted with pipe characters to separate action | value | timings
 * @example
 * ```
 * event_completed | first_app_launch | delay_1_day
 * ```
 */
function extractConditionList(conditionText: string) {
  conditionText = _replaceShorthandText(conditionText);
  const data = _parseXlsxData(conditionText);
  // console.log(data);
  console.log(conditionText);
  const condition_type = extractConditionType(data[0]);
  const condition_args = extractConditionArgs(condition_type, data.slice(1));
  return {} as any;
  process.exit(1);
  let [typeStr, argsStr, evaluationStr] = conditionText.split("|").map((s: string) => s.trim());
  if (typeStr.includes("_completed")) {
    argsStr += ":completed";
  }
  console.log([typeStr, argsStr, evaluationStr]);

  // let timing: IConditionList["timing"] = null;
  if (evaluationStr) {
    const [comparatorText, quantity, unit] = evaluationStr.split(":").map((s: string) => s.trim());
    const comparator = _extractComparator(comparatorText);
    // timing = { comparator, quantity: quantity ? Number(quantity) : null, unit } as any;
  }

  const condition: IConditionList = {
    condition_type,
    condition_args,
  };

  Object.values(condition).forEach((v) => {
    if (typeof v === "string" && v.includes(":")) {
      console.error(chalk.red(`condition not fully parsed: ${conditionText}`));
      console.error(condition);
      console.error(chalk.red(v));
      process.exit(1);
    }
  });
  console.log(condition);
  return condition;
}

/** Provide a distinction for the type of condition operation, namely a database lookup or field evaluation */
function extractConditionType(typeStr: string): IConditionList["condition_type"] {
  const [actionStr] = typeStr.split(":").map((s) => s.trim() as any);
  switch (actionStr) {
    case "field_evaluation":
      return "field_evaluation";
    default:
      return "db_lookup";
  }
}
function extractConditionArgs(
  condition_type: IConditionList["condition_type"],
  data: any[]
): IConditionList["condition_args"] {
  console.log(data);
  switch (condition_type) {
    case "db_lookup":
      const [, table_id, sortStr] = data;
      return {
        db_lookup: {
          table_id,
          // aggregate: () => "",
          filter: { field: "", value: "" },
          // order: "",
          // sort_by: "",
        },
      };
    case "field_evaluation":
      return { field_evaluation: { evaluate: data[0] } };
    default:
      console.error(chalk.red(`cannot extract condition args:`, condition_type, data));
      process.exit(1);
  }
}

/**
 * some common authoring scenarios have been reduced to single keywords for ease-of-authoring
 * replace these with full specifications
 */
function _replaceShorthandText(text: string) {
  // a maximum of 1 replacement will be made, so order in terms of specifivity
  const shorthandReplacements = {
    sent: "db_lookup | reminders | sent",
    first_launch: "db_lookup |app_events:first | app_launch",
    app_launch: "db_lookup | app_events | app_launch",
    task_completed: "db_lookup | task_actions",
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

/**
 * When timing conditions are specified related to a reminder, the condition should be specified
 * with leading text such as before_3_day or after_2_day.
 * Convert the text into a logical comparator that will be used during evaluation
 */
function _extractComparator(text: string) {
  // : IConditionList["timing"]["comparator"]
  // when comparing, the target evaluation value will be compared relative to todays date / app day
  // first the difference between the target event and today is calculated, called diffInDays (app or calendar)
  // for an event to happen n days before (or more), diffInDays > n
  // for an event to happen within n days, diffInDays <= n
  switch (text) {
    case "before":
      return ">";
    case "within":
      return "<=";
    default:
      console.error(chalk.red(`Reminder timing comparison not defined: ${text}`));
      process.exit(1);
  }
}

function _parseXlsxData(data: any): any[] {
  if (typeof data === "string") {
    // first parse, convert pipes
    if (data.includes("|")) {
      data = data.split("|").map((d) => d.trim());
      return _parseXlsxData(data);
    }
    if (data.includes(":")) {
      data = data.split(":").map((d) => d.trim());
      return _parseXlsxData(data);
    }
  }
  if (Array.isArray(data)) {
    data = data.map((d) => _parseXlsxData(d));
  }
  return data;
}
