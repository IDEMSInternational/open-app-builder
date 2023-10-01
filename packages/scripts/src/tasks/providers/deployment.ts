import { promptInput } from "../../utils";

import { createDeployment } from "../../commands/deployment/lib/create";
import { importRepo } from "../../commands/deployment/lib/import";
import { DeploymentManager } from "../../commands/deployment/lib/manager";
import { ActiveDeployment } from "../../models";

class DeploymentProvider {
  /** Create a new app deployment configuration */
  async create() {
    return createDeployment();
  }

  async set(name = "") {
    return ActiveDeployment.set(name);
  }

  async import(remoteRepo?: string) {
    if (!remoteRepo) {
      remoteRepo = await promptInput("Specify url to remote git repo");
    }
    return importRepo(remoteRepo);
  }
}

export default new DeploymentProvider();
