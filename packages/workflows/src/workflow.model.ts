// NOTE - this import can lead to build issues
// https://www.codejam.info/2021/10/typescript-cannot-write-file-overwrite-input.html
import type { IDeploymentConfigJson } from "data-models";

// HACK - we want type-safety for workflow tasks, however the tasks list is part of the
// scripts workspace. Avoid circular imports by direct import from relative path
import type { ITasks } from "../../scripts/src/tasks";

export interface IWorkflowContext {
  [step_name: string]: IWorkflowStep & { output: any };
}

interface IWorkflowStep {
  name: string;
  condition?: (context: IWorkflowStepContext) => Promise<boolean>;
  function: (context: IWorkflowStepContext) => Promise<any>;
}
export interface IWorkflowStepContext {
  config: IDeploymentConfigJson;
  workflow: IWorkflowContext;
  tasks: ITasks;
  /** Positional args passed to workflow script */
  args: string[];
  options: { [optionName: string]: string | boolean };
}

export interface IWorkflow {
  /**
   * The label will be used to select the workflow from a list.
   * If omitted the workflow will not be shown for selection
   **/
  label?: string;
  steps: IWorkflowStep[];
  options?: { flags: string; description?: string; defaultValue?: string | boolean }[];
  /** Sub workflows */
  children?: IDeploymentWorkflows;
}

export interface IDeploymentWorkflows {
  [name: string]: IWorkflow;
}

// local cache bust to force recompile of tasks
const version = 1.4;
