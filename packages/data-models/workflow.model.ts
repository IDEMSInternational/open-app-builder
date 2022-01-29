import { ITasks } from "scripts/src/tasks";
import { IDeploymentConfig } from ".";

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
