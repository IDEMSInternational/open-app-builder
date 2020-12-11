import chalk from "chalk";
import { FlowTypes } from "../../../../types";
import { DefaultParser } from "../default/default.parser";

export class TaskListParser extends DefaultParser {
  constructor(private allFlowsByType: any, private allTasksById: any) {
    super();
  }
  postProcess(row: FlowTypes.Task_listRow) {
    // Check linked flows exist
    const warnings = [];
    if (row.flow_name && row.flow_type) {
      const linkedFlow = this.allFlowsByType[row.flow_type].find(
        (f) => f.flow_name === row.flow_name
      );
      if (!linkedFlow) {
        warnings.push(`Task flow does not exist: ${row.flow_name}`);
      }
    }
    // Check referenced required tasks exist
    if (row.requires_list) {
      for (let requireString of row.requires_list) {
        const task_id = requireString.split("|")[0].trim();
        if (!this.allTasksById[task_id]) {
          warnings.push(`Required task does not exist: ${task_id}`);
        }
      }
    }
    for (let warning of warnings) {
      console.log(chalk.bgYellow.black(`- ${warning}`));
    }
    if (warnings.length > 0) {
      console.log(chalk.gray(JSON.stringify(row, null, 2)));
    }
    return row;
  }
}
