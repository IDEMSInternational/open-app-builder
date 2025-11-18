import { promptInput } from "../../utils";

import { createDeployment } from "../../commands/deployment/create";
import { importRepo } from "../../commands/deployment/import";
import { DeploymentSet } from "../../commands/deployment/set";
import { ExternalDeploymentSet } from "../../commands/deployment/set-external";

class DeploymentProvider {
  /** Create a new app deployment configuration */
  async create() {
    return createDeployment();
  }

  async set(name = "") {
    return new DeploymentSet().setActiveDeployment(name);
  }

  async setExternal(deploymentId = "") {
    console.log("=== DEPLOYMENT PROVIDER setExternal CALLED ===");
    console.log(`Deployment ID: ${deploymentId}`);
    return new ExternalDeploymentSet().setActiveDeployment(deploymentId);
  }

  async import(remoteRepo?: string) {
    if (!remoteRepo) {
      remoteRepo = await promptInput("Specify url to remote git repo");
    }
    return importRepo(remoteRepo);
  }
}

export default new DeploymentProvider();
