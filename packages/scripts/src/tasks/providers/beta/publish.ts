import fs from "fs-extra";
import path from "path";
import { DEPLOYMENTS_PATH } from "../../../paths";
import { Logger } from "../../../utils";
import git from "../git";

export async function publishExternalDeployment() {
  const activeDeploymentPath = path.resolve(DEPLOYMENTS_PATH, "activeDeployment.json");
  if (!fs.existsSync(activeDeploymentPath)) {
    Logger.error({
      msg1: "No active deployment specified",
      msg2: 'Run "yarn workflow beta set" to configure',
    });
  }

  const activeConfigJson = fs.readJsonSync(activeDeploymentPath);
  const externalSource = activeConfigJson.external_source;

  if (!externalSource) {
    Logger.error({
      msg1: "Active deployment is not an external deployment",
      msg2: 'Run "yarn workflow deployment publish" instead',
    });
  }
  if (!fs.existsSync(externalSource)) {
    Logger.error({
      msg1: "External deployment source no longer exists",
      msg2: externalSource,
    });
  }

  // Run through the same publish flow as a regular deployment, using the external folder as
  // the git workspace so changes are committed and pushed from its original location
  await git().createContentRelease(externalSource);
}

export default {
  publish: publishExternalDeployment,
};
