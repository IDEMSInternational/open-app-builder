import type { IDeploymentWorkflows } from "./workflow.model";

// Workflow files
import SYNC_WORKFLOWS from "./sync.workflows";
import MISC_WORKFLOWS from "./misc.workflows";
import CONTENT_WORKFLOWS from "./content.workflows";

/** Default workflows made available to all deployments */
const WORKFLOW_DEFAULTS: IDeploymentWorkflows = {
  ...SYNC_WORKFLOWS,
  ...MISC_WORKFLOWS,
  ...CONTENT_WORKFLOWS,
};

export { WORKFLOW_DEFAULTS };
export * from "./workflow.model";
