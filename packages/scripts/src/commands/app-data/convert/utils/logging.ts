import chalk from "chalk";

import { IParsedWorkbookData } from "../types";

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

export function logSheetErrorSummary(warnings: any[], errors: any[]) {
  if (warnings.length > 0) {
    console.log(chalk.red(warnings.length, "warnings"));
    for (const warning of warnings) {
      console.log(warning);
    }
  }
  if (errors.length > 0) {
    console.log(chalk.red(errors.length, "errors"));
    for (const err of errors) {
      console.log(err);
    }
  }
}
