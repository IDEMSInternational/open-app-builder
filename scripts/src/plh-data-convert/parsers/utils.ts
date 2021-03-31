import chalk from "chalk";

/**
 * Xls data represents nested objects in the following ways
 * ';' - pre-processing with '_list' columns to format as array
 * '|' - post-processing specific item into set of arguments / parameters
 * ':' - modifiers or properties of an argument
 *
 * As the pipe and colon characters may or may not exist for a particular string
 * it is impossible to know any given data needs to be formatted as string or array
 * to remain consistent with the rest of the column. As such all strings will be
 * treated as arrays, and deeply nested objects extracted in future processing stages
 *
 * original:  db_lookup:first |app_events:event_id | app_launch | before:7:day'
 * nest 1:    [db_lookup:first ,app_events:event_id , app_launch , before:7:day]
 * nest 2:    [[db_lookup,first] ,[app_events,event_id] , [app_launch] , [before,7,day]]
 *
 */
export function parsePLHString(str: string): string[][] {
  if (str.includes(";")) {
    console.error(chalk.red('lists should be pre-processed, but ";" found'));
    process.exit(1);
  }
  const nest1 = str.split("|").map((d) => d.trim());
  const nest2 = nest1.map((el) => el.split(":").map((d) => d.trim()));
  return nest2;
}

/**
 * Split a string by ';' and return array string, ignoring empty elements left by hanging ';'
 */
export function parsePLHListString(str: string): string[] {
  return str
    .split(";")
    .map((val: string) => val.trim())
    .filter((val: string) => val !== "");
}
