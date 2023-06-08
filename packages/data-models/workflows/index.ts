import type { IDeploymentWorkflows } from "./workflow.model";

import ANDROID_WORKFLOWS from "./android.workflows";
import REPO_WORKFLOWS from "./repo.workflows";
import DEPLOYMENT_WORKFLOWS from "./deployment.workflows";
import MISC_WORKFLOWS from "./misc.workflows";
import SYNC_WORKFLOWS from "./sync.workflows";

/** Default workflows made available to all deployments */
const WORKFLOW_DEFAULTS: IDeploymentWorkflows = {
  ...ANDROID_WORKFLOWS,
  ...REPO_WORKFLOWS,
  ...DEPLOYMENT_WORKFLOWS,
  ...MISC_WORKFLOWS,
  ...SYNC_WORKFLOWS,
};

export { WORKFLOW_DEFAULTS };
export * from "./workflow.model";
