#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { IDEMS_APP_CONFIG } from "../../paths";
import { promptOptions, logError } from "../../utils";

const program = new Command("set");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Set active deployment")
  // options copied from/passed to generate
  .action(async () => {
    let [deploymentName] = program.args;
    await setActiveDeployment(deploymentName);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Specify or choose a deployment from a list of available deployments, and
 * populate as the active deployment to default deployment json file
 */
async function setActiveDeployment(deploymentName?: string) {
  const allDeployments = await listDeployments();
  if (!deploymentName) {
    deploymentName = await promptOptions(allDeployments.map((d) => d.name));
  }
  const matchingDeployment = allDeployments.find(
    (deployment) => deployment.name === deploymentName
  );
  if (!matchingDeployment) {
    logError({
      msg1: `No deployment found with name: "${deploymentName}"`,
      msg2: `${IDEMS_APP_CONFIG.deployments}`,
    });
  }
  const { filename, ...deployment } = matchingDeployment;
  const defaultDeploymentPath = path.resolve(IDEMS_APP_CONFIG.deployments, "default.json");
  const deploymentMeta = {
    active: { name: deployment.name, filename },
    targets: allDeployments.map((d) => ({ name: d.name, filename: d.filename })),
  };
  fs.writeFileSync(defaultDeploymentPath, JSON.stringify(deploymentMeta, null, 2));
  console.log("deployment set", deployment);
}

/**
 * Deployment files are written in .ts, so cannot be ready directly
 * Iterate over the files and dynamically import to resolve their values,
 * which can be passed back as an array of deployments
 */
async function listDeployments(): Promise<{ filename: string; [key: string]: any }[]> {
  const allDeployments = [];
  const allDeploymentFiles = fs
    .readdirSync(IDEMS_APP_CONFIG.deployments)
    .filter((filename) => path.extname(filename) === ".ts");
  for (const filename of allDeploymentFiles) {
    try {
      const deployment = await loadDeploymentTS(filename);
      // should have default export with a name property
      if (deployment?.name) {
        allDeployments.push({ ...deployment, filename });
      }
    } catch (error) {}
  }
  return allDeployments;
}

/** Read a .ts file containing deployment information and return processed default export */
export async function loadDeploymentTS(filename: string) {
  const filepath = path.resolve(IDEMS_APP_CONFIG.deployments, filename);
  const res = await import(filepath);
  return res.default;
}
