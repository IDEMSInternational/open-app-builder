import chalk from "chalk";
import { FlowTypes } from "../../../types";
import { booleanStringToBoolean } from "../../utils";
import { parsePLHString } from "./plh-string.utils";

const DEBUG_MODE = false;

type ICondition = FlowTypes.DataEvaluationCondition;

/**
 * Take an activation or deactivation criteria and format for use
 * Note, as the data can vary greatly try to handle in as generic a way as possible,
 * assuming all fields have the maximum amount of customisation (nesting multiple levels deep)
 *
 * @param c condition string formatted with pipe and colon characters to handle properties, and keywords for replacement
 *
 * @example
 * ```
 * first_launch | before:7:day; task_completed | some_task
 * ```
 * raw:     'first_launch | before:7:day'
 * cleaned: 'db_lookup |app_events:first | event_id:app_launch | before:7:day'
 * parsed:
 * [
 *   [ [ 'db_lookup' ] ],
 *   [ [ 'app_events' ], [ 'first' ] ],
 *   [ [ 'event_id' ] , [ 'app_launch' ] ],
 *   [ [ 'before' ], [ '7' ], [ 'day' ] ]
 * ]
 *
 * TODO - CC 2021-05-15 ideally this should be refactored and combined with condition handling in templates
 */
export function extractConditionList(conditionText: string) {
  const txt = conditionText;
  const cleanedTxt = _handleTextExceptions(conditionText);
  let data: string[][] = parsePLHString(cleanedTxt);
  data = _handleDataExceptions(data);
  const conditionExtractors: {
    [key in ICondition["condition_type"]]: (data: any[][]) => ICondition;
  } = {
    field_evaluation: parseFieldEvaluationCondition,
    db_lookup: parseDBLookupCondition,
  };
  const condition_type = data[0][0];
  if (!conditionExtractors.hasOwnProperty(condition_type)) {
    console.error(chalk.red(`cannot extract condition args:`, data));
    process.exit(1);
  }
  const condition: ICondition = conditionExtractors[condition_type](data);
  if (DEBUG_MODE) {
    condition._cleaned = cleanedTxt;
    condition._parsed = data;
  }
  condition._raw = txt;
  return condition;
}

function parseFieldEvaluationCondition(data: any[][]): ICondition {
  const [[condition_type], [evaluate]] = data;
  return {
    condition_type,
    condition_args: {
      field_evaluation: { evaluate },
    },
  };
}
function parseDBLookupCondition(data: any[][]): ICondition {
  const [typeData, tableData, valueData, evaulateData] = data;
  const [condition_type] = typeData;
  const [table_id, orderStr] = tableData;
  const [filter_field, filter_value] = valueData;

  let evaluate = null;
  if (evaulateData) {
    const [comparatorText, quantity, unit] = evaulateData as any[];
    const operator = _extractComparator(comparatorText);
    evaluate = { operator, value: quantity, unit };
  }

  // // convert boolean value strings
  // const value = stringToBoolean(filter_value);

  return {
    condition_type,
    condition_args: {
      db_lookup: {
        table_id,
        filter: { field: filter_field || "id", value: filter_value },
        order: orderStr === "first" ? "asc" : "desc",
        evaluate,
      },
    },
  };
}

/**
 * some common authoring scenarios have been reduced to single keywords for ease-of-authoring
 * replace these with full specifications
 */
function _handleTextExceptions(text: string) {
  // a maximum of 1 replacement will be made, so order in terms of specifivity
  // TODO CC 2021-05-17 - All needs review - ideally should just take a list of params as args,
  // e.g. table_id: 'app_events'; sort: 'asc', or perhaps where:{...}
  const shorthandReplacements = {
    sent: "db_lookup | reminder_events:last | reminder_id:sent", // Deprecated
    first_launch: "db_lookup |app_events:first | event_id:app_launch",
    app_launch: "db_lookup | app_events:last | event_id:app_launch",
    "task_completed:first": "db_lookup | task_actions:first",
    task_completed: "db_lookup | task_actions:last",
    "get_field:first": "db_lookup | data_events:first",
    get_field: "field_evaluation",
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

/** Make additional replacements to format data in a consistent way */
function _handleDataExceptions(data: string[][]) {
  if (data[1]?.[0] === "task_actions") {
    data[2].unshift("task_id");
  }
  return data;
}

/**
 * When timing conditions are specified related to a reminder, the condition should be specified
 * with leading text such as before_3_day or after_2_day.
 * Convert the text into a logical comparator that will be used during evaluation
 */
function _extractComparator(text: string) {
  //
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
