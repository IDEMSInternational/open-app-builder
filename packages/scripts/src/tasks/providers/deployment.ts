import { spawnSync } from "child_process";

const scriptsExec = `yarn workspace scripts start`;

class DeploymentProvider {
  /** Create a new app deployment configuration */
  async create() {
    spawnSync(`${scriptsExec} deployment create`, { shell: true, stdio: "inherit" });
  }

  async set(name = "") {
    spawnSync(`${scriptsExec} deployment set ${name}`, { shell: true, stdio: "inherit" });
  }
}

export default new DeploymentProvider();
