// NOTE - this import can lead to build issues
// https://www.codejam.info/2021/10/typescript-cannot-write-file-overwrite-input.html
import type { ITasks } from "scripts/src/tasks";
import type { IDeploymentConfig } from "../deployment.model";

export interface IWorkflowContext {
  [step_name: string]: { output: any };
}

interface IWorkflowStep {
  name: string;
  function: (context: {
    config: IDeploymentConfig;
    workflow: IWorkflowContext;
    tasks: ITasks;
  }) => Promise<any>;
}
export interface IWorkflow {
  label: string;
  steps: IWorkflowStep[];
}

export interface IDeploymentWorkflows {
  [name: string]: IWorkflow;
}

// local cache bust to force recompile of tasks
const version = 1.4;
