import boxen from "boxen";
import chalk from "chalk";
import type { FlowTypes } from "data-models";
import { IParsedWorkbookData } from "./types";

/** Collate totals of flows by subtype and log */
export function logSheetsSummary(data: IParsedWorkbookData) {
  const countBySubtype = {};
  Object.values(data).forEach((flows) => {
    flows.forEach((flow) => {
      let type = flow.flow_type;
      if (flow.flow_subtype) type += `.${flow.flow_subtype}`;
      if (!countBySubtype[type]) countBySubtype[type] = 0;
      countBySubtype[type]++;
    });
  });
  const logOutput = Object.keys(countBySubtype)
    .sort()
    .map((key) => {
      const [type, subtype] = key.split(".");
      return { type, subtype: subtype || null, total: countBySubtype[key] };
    });
  console.log("\nSheet Summary");
  console.table(logOutput);
}

export function logCacheActionsSummary(actions: any) {
  // log summary
  const summary = {};
  Object.entries<any>(actions).forEach(([key, value]) => (summary[key] = value.length));
  console.log("\nFile Summary\n", summary);
}

export function logSheetErrorSummary(conversionWarnings: any[], conversionErrors: any[]) {
  if (conversionWarnings.length > 0) {
    console.log(chalk.red(conversionWarnings.length, "warnings"));
    for (const warning of conversionWarnings) {
      console.log(warning);
    }
  }
  if (conversionErrors.length > 0) {
    console.log(chalk.red(conversionErrors.length, "errors"));
    for (const err of conversionErrors) {
      console.log(err);
    }
  }
}

/** Debug info to log and exit when a template parsing error occurs */
export function throwTemplateParseError(error: Error, flow: FlowTypes.FlowTypeWithData) {
  const errMsg = boxen(
    `
${chalk.red("Template Parse Error")}

${chalk.yellow(flow.flow_name)}

${flow._xlsxPath}

This is likely an authoring error, see full stacktrace below
      `,
    { padding: 1, borderColor: "red" }
  );
  console.log(errMsg);
  console.error(error);
  throw errMsg;
  // process.exit(1);
}
