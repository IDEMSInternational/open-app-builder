#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { DEPLOYMENTS_PATH, ROOT_DIR } from "../../paths";
import { promptOptions, logOutput, logWarning } from "../../utils";
import { ActiveDeployment } from "./get";
import { DeploymentSet } from "./set";

const program = new Command("set-external");

interface IOptions {
  /** Temp method to check if called from workflow or directly via scripts (prefer workflow) */
  workflow?: string;
}

interface IExternalDeployment {
  id: string;
  file_location: string;
}

interface IDeploymentsConfig {
  deployments: IExternalDeployment[];
}

/***************************************************************************************
 * CLI
 * @example yarn workflow deployment set-external
 *************************************************************************************/
export default program
  .description("Set active deployment from external deployments.json")
  .option("-w --workflow", "Specify if script invoked from workflow")
  .action(async (options: IOptions) => {
    console.log("=== SET-EXTERNAL CLI ACTION CALLED ===");
    console.log(`Options:`, options);
    console.log(`Args:`, program.args);

    if (!options.workflow) {
      console.log("WARNING: Not called from workflow");
      logWarning({
        msg1: "[Deprecated] - Set via workflow instead",
        msg2: "yarn workflow deployment set-external",
      });
      return;
    }
    let [deploymentId] = program.args;
    console.log(`Calling setActiveDeployment with ID: ${deploymentId}`);
    await new ExternalDeploymentSet().setActiveDeployment(deploymentId);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export class ExternalDeploymentSet {
  private deploymentsConfigPath = path.resolve(DEPLOYMENTS_PATH, "deployments.json");

  /**
   * Load external deployments from deployments.json and set the specified one as active
   */
  public async setActiveDeployment(deploymentId?: string) {
    console.log("=== SET-EXTERNAL COMMAND STARTED ===");
    console.log(`Deployment ID provided: ${deploymentId}`);

    // Load deployments.json
    const deploymentsConfig = this.loadDeploymentsConfig();
    console.log(
      `Loaded deployments config with ${deploymentsConfig.deployments.length} deployments`
    );

    // Prompt selection from list if no ID provided
    if (!deploymentId) {
      deploymentId = await this.promptDeploymentSelect(deploymentsConfig);
      return this.setActiveDeployment(deploymentId);
    }

    // Find the specified deployment
    console.log(`Looking for deployment with ID: ${deploymentId}`);
    console.log(
      `Available deployments: ${deploymentsConfig.deployments.map((d) => d.id).join(", ")}`
    );

    const deployment = deploymentsConfig.deployments.find((d) => d.id === deploymentId);
    if (!deployment) {
      console.log(`ERROR: Deployment "${deploymentId}" not found!`);
      throw new Error(`Deployment with id "${deploymentId}" not found in deployments.json`);
    }

    console.log(`Found deployment: ${deployment.id} -> ${deployment.file_location}`);

    // Verify the source deployment folder exists
    if (!fs.existsSync(deployment.file_location)) {
      throw new Error(`Source deployment folder not found: ${deployment.file_location}`);
    }

    logOutput({
      msg1: `Source deployment found: ${deployment.id}`,
      msg2: `Path: ${deployment.file_location}`,
    });

    // Delete the entire deployment directory if it exists, then recreate it
    const targetDeploymentPath = path.resolve(DEPLOYMENTS_PATH, deploymentId);
    if (fs.existsSync(targetDeploymentPath)) {
      fs.removeSync(targetDeploymentPath);
      logOutput({
        msg1: `Deleted entire deployment directory: ${deploymentId}`,
        msg2: targetDeploymentPath,
      });
    }
    fs.ensureDirSync(targetDeploymentPath);

    logOutput({
      msg1: `Created target deployment directory: ${deploymentId}`,
      msg2: targetDeploymentPath,
    });

    // Copy all files and folders from source (excluding .git and app_data)
    logOutput({
      msg1: `About to copy files from external deployment...`,
      msg2: `Source: ${deployment.file_location} -> Target: ${targetDeploymentPath}`,
    });

    await this.copySourceDeploymentFiles(deployment, targetDeploymentPath);

    logOutput({
      msg1: `Finished copying files from external deployment`,
      msg2: `Checking target directory contents...`,
    });

    // Check what was actually copied
    try {
      const copiedItems = fs.readdirSync(targetDeploymentPath, { withFileTypes: true });
      logOutput({
        msg1: `Target directory now contains ${copiedItems.length} items:`,
        msg2:
          copiedItems
            .map((item) => `${item.name} (${item.isDirectory() ? "dir" : "file"})`)
            .join(", ") || "EMPTY",
      });
    } catch (error) {
      logWarning({
        msg1: `Failed to read target directory contents:`,
        msg2: error.message,
      });
    }

    // Use the standard DeploymentSet to activate the deployment (this will compile config.ts to config.json)
    const deploymentSet = new DeploymentSet();
    await deploymentSet.setActiveDeployment(deploymentId);

    // Set external_source in the active deployment config for processing
    // Read the activeDeployment.json directly, modify it, and write it back
    const activeDeploymentPath = path.resolve(DEPLOYMENTS_PATH, "activeDeployment.json");
    const activeConfigJson = JSON.parse(fs.readFileSync(activeDeploymentPath, "utf8"));
    activeConfigJson.external_source = deployment.file_location;
    fs.writeFileSync(activeDeploymentPath, JSON.stringify(activeConfigJson, null, 2));

    // Run sync_external workflow to process the app_data
    await this.runSyncExternalWorkflow();

    logOutput({
      msg1: `External deployment setup complete: "${deployment.id}"`,
      msg2: `Target: ${targetDeploymentPath}`,
    });
  }

  private loadDeploymentsConfig(): IDeploymentsConfig {
    if (!fs.existsSync(this.deploymentsConfigPath)) {
      throw new Error(`deployments.json not found at: ${this.deploymentsConfigPath}`);
    }

    try {
      return fs.readJsonSync(this.deploymentsConfigPath);
    } catch (error) {
      throw new Error(`Failed to parse deployments.json: ${error.message}`);
    }
  }

  private async promptDeploymentSelect(deploymentsConfig: IDeploymentsConfig): Promise<string> {
    // Get available deployment IDs
    const deploymentIds = deploymentsConfig.deployments
      .filter((d) => fs.existsSync(d.file_location))
      .map((d) => d.id);

    if (deploymentIds.length === 0) {
      throw new Error("No valid deployments found in deployments.json");
    }

    // Get current deployment if any (for prioritizing in list)
    const currentDeployment = ActiveDeployment.get({
      ignoreMissing: true,
      skipRecompileCheck: true,
    });

    // Move current deployment to start of list if it exists and is external
    if (currentDeployment?.name && deploymentIds.includes(currentDeployment.name)) {
      deploymentIds.splice(deploymentIds.indexOf(currentDeployment.name), 1);
      deploymentIds.unshift(currentDeployment.name);
    }

    const selectedId = await promptOptions(deploymentIds);
    return selectedId;
  }

  /**
   * Copy all necessary files from a source deployment (like PLH-CW) to the target deployment
   * Excludes .git and app_data folders as specified
   * Deletes existing files in target directory first to ensure clean copy
   */
  private async copySourceDeploymentFiles(
    deployment: IExternalDeployment,
    targetLocation: string
  ): Promise<void> {
    const sourceLocation = deployment.file_location;

    logOutput({
      msg1: `Starting copy from source: ${sourceLocation}`,
      msg2: `To target: ${targetLocation}`,
    });

    // Verify source exists
    if (!fs.existsSync(sourceLocation)) {
      throw new Error(`Source location does not exist: ${sourceLocation}`);
    }

    // Get list of all items in the source directory
    const sourceItems = fs.readdirSync(sourceLocation, { withFileTypes: true });

    logOutput({
      msg1: `Found ${sourceItems.length} items in source directory`,
      msg2: sourceItems
        .map((item) => `${item.name} (${item.isDirectory() ? "dir" : "file"})`)
        .join(", "),
    });

    // Copy all items except .git and app_data folders
    for (const item of sourceItems) {
      const sourcePath = path.resolve(sourceLocation, item.name);
      const targetPath = path.resolve(targetLocation, item.name);

      // Skip .git and app_data folders
      if (item.name === ".git" || item.name === "app_data" || item.name === ".gitignore") {
        logOutput({
          msg1: `Skipping excluded folder: ${item.name}`,
          msg2: sourcePath,
        });
        continue;
      }

      try {
        if (item.isDirectory()) {
          fs.copySync(sourcePath, targetPath, { overwrite: true });
          logOutput({
            msg1: `Copied folder: ${item.name}`,
            msg2: `${sourcePath} -> ${targetPath}`,
          });
        } else {
          fs.copySync(sourcePath, targetPath, { overwrite: true });
          logOutput({
            msg1: `Copied file: ${item.name}`,
            msg2: `${sourcePath} -> ${targetPath}`,
          });
        }
      } catch (error) {
        logWarning({
          msg1: `Failed to copy ${item.name}:`,
          msg2: error.message,
        });
      }
    }

    logOutput({
      msg1: `Files copied to deployment: ${deployment.id}`,
      msg2: targetLocation,
    });
  }

  /**
   * Process external app_data using the task provider
   */
  private async runSyncExternalWorkflow(): Promise<void> {
    logOutput({
      msg1: "Processing external app_data...",
      msg2: "Using externalRawData task provider",
    });

    // Import the tasks and process external data directly
    try {
      const tasks = require("../../tasks").default;
      const config = ActiveDeployment.get({ skipRecompileCheck: true });

      const configAny = config as any;

      if (configAny.external_source && config.app_data?.output_path) {
        const sourceFolder = path.resolve(configAny.external_source, "app_data");
        await tasks.externalRawData.processExternalRawData({
          sourceFolder,
          outputFolder: config.app_data.output_path,
        });

        logOutput({
          msg1: "External app_data processing completed successfully",
          msg2: "",
        });
      } else {
        logWarning({
          msg1: "Warning: Missing app_data configuration",
          msg2: "Skipping external data processing",
        });
      }
    } catch (error) {
      logWarning({
        msg1: "Warning: External data processing failed:",
        msg2: error.message,
      });
    }
  }
}
