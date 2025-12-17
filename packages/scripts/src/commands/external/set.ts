#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { DEPLOYMENTS_PATH } from "../../paths";
import { logOutput, logWarning } from "../../utils";
import { DeploymentSet } from "../deployment/set";
import { runSyncExternalWorkflow } from "./pull";

const program = new Command("set");

program
  .description("Set active deployment and sync external data")
  .argument("<deploymentName>", "Name of the deployment to set")
  .action(async (deploymentName: string) => {
    await setExternalDeployment(deploymentName);
  });

export async function setExternalDeployment(deploymentName: string) {
  // 1. Set active deployment
  const deploymentSet = new DeploymentSet();
  await deploymentSet.setActiveDeployment(deploymentName);

  // 2. Check for .external_source and update activeDeployment.json
  const deploymentPath = path.resolve(DEPLOYMENTS_PATH, deploymentName);
  const externalSourceFile = path.join(deploymentPath, ".external_source");

  if (fs.existsSync(externalSourceFile)) {
    const externalSource = fs.readFileSync(externalSourceFile, "utf8").trim();

    const activeDeploymentPath = path.resolve(DEPLOYMENTS_PATH, "activeDeployment.json");
    const activeConfigJson = JSON.parse(fs.readFileSync(activeDeploymentPath, "utf8"));
    activeConfigJson.external_source = externalSource;
    fs.writeFileSync(activeDeploymentPath, JSON.stringify(activeConfigJson, null, 2));

    logOutput({
      msg1: "Updated active deployment config with external source",
      msg2: externalSource,
    });

    // 3. Run sync workflow
    await runSyncExternalWorkflow();
  } else {
    logWarning({
      msg1: "No .external_source file found in deployment",
      msg2: "Skipping external data sync",
    });
  }
}

export default program;
