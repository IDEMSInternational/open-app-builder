import { parseCommand } from "../../commands";

class DeploymentProvider {
  /** Create a new app deployment configuration */
  async create() {
    parseCommand(`deployment create`);
  }

  async set(name = "") {
    parseCommand(`deployment set ${name} --workflow`);
  }
}

export default new DeploymentProvider();
