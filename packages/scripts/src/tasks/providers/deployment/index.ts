import { spawnSync } from "child_process";

class DeploymentProvider {
  private scriptsExec = `yarn workspace scripts start`;

  /** Create a new app deployment configuration */
  async create() {
    spawnSync(`${this.scriptsExec} deployment create`, { shell: true, stdio: "inherit" });
  }

  async set() {}
}

export default new DeploymentProvider();
