import fs from "fs-extra";
import path from "path";

import { listDeployments } from "../../../commands/deployment/set";
import { IDEMS_APP_CONFIG } from "../../../paths";
import { logError, logOutput, promptInput, promptOptions } from "../../../utils";
import generateDefaultConfig from "./templates/config.default";
import generateExtendedConfig from "./templates/config.extended";

class DeploymentProvider {
  /** Create a new app deployment configuration */
  async create() {
    let parentDeployment: { filename: string; folder: string } = null;
    const isChildDeployment = await promptOptions(
      [
        { name: "New Deployment", value: false },
        { name: "Extend Existing", value: true },
      ],
      "Would you like to create a new deployment or extend an existing deployment?"
    );
    if (isChildDeployment) {
      const allDeployments = await listDeployments();
      const options = Object.values(allDeployments).map((deployment) => ({
        name: deployment.name,
        value: {
          filename: path.basename(deployment.filename),
          folder: path.dirname(path.resolve(IDEMS_APP_CONFIG.deployments, deployment.filename)),
        },
      }));
      parentDeployment = await promptOptions(options, "Which deployment would you like to extend?");
    }

    const nameInput = await promptInput("Specify a name for the deployment");
    const name = nameInput.toLowerCase().replace(/ /, "_");

    const targetConfigFile = parentDeployment
      ? path.join(parentDeployment.folder, `${name}.config.ts`)
      : path.join(IDEMS_APP_CONFIG.deployments, name, `config.ts`);

    if (fs.existsSync(targetConfigFile)) {
      logError({ msg1: "Deployment already exists", msg2: targetConfigFile });
    } else {
      const configTs = parentDeployment
        ? generateExtendedConfig(name, parentDeployment.filename)
        : generateDefaultConfig(name);

      fs.ensureDirSync(path.dirname(targetConfigFile));
      fs.writeFileSync(targetConfigFile, configTs);
      logOutput({ msg1: "Deployment created", msg2: targetConfigFile });
    }
  }
}

export default new DeploymentProvider();
