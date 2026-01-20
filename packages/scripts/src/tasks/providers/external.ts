import fs from "fs-extra";
import path from "path";
import { DEPLOYMENTS_PATH } from "../../paths";
import { logOutput, logWarning } from "../../utils";

export async function importExternalDeployment(sourcePath: string) {
  const absoluteSourcePath = path.resolve(sourcePath);

  // Verify source exists
  if (!fs.existsSync(absoluteSourcePath)) {
    throw new Error(`Source location does not exist: ${absoluteSourcePath}`);
  }

  // Extract deployment name from config.ts
  const configPath = path.join(absoluteSourcePath, "config.ts");
  if (!fs.existsSync(configPath)) {
    throw new Error(`config.ts not found in source path: ${configPath}`);
  }

  const configContent = fs.readFileSync(configPath, "utf8");
  const match = configContent.match(/generateDeploymentConfig\s*\(\s*["']([^"']+)["']\s*\)/);

  if (!match || !match[1]) {
    throw new Error(
      "Could not extract deployment name from config.ts. Expected generateDeploymentConfig('name')"
    );
  }

  const deploymentName = match[1];
  const targetDeploymentPath = path.resolve(DEPLOYMENTS_PATH, deploymentName);

  logOutput({
    msg1: `Importing external deployment: ${deploymentName}`,
    msg2: `Source: ${absoluteSourcePath}`,
  });

  // Delete the entire deployment directory if it exists, then recreate it
  if (fs.existsSync(targetDeploymentPath)) {
    fs.removeSync(targetDeploymentPath);
    logOutput({
      msg1: `Deleted existing deployment directory: ${deploymentName}`,
      msg2: targetDeploymentPath,
    });
  }
  fs.ensureDirSync(targetDeploymentPath);

  logOutput({
    msg1: `Created target deployment directory: ${deploymentName}`,
    msg2: targetDeploymentPath,
  });

  // Save the source path for later use by 'set' command
  fs.writeFileSync(path.join(targetDeploymentPath, ".external_source"), absoluteSourcePath);

  await copySourceDeploymentFiles(absoluteSourcePath, targetDeploymentPath);

  logOutput({
    msg1: `Import complete for deployment: ${deploymentName}`,
    msg2: targetDeploymentPath,
  });
}

/**
 * Copy all necessary files from a source deployment to the target deployment
 * Excludes .git and app_data folders as specified
 */
async function copySourceDeploymentFiles(
  sourceLocation: string,
  targetLocation: string
): Promise<void> {
  logOutput({
    msg1: `Starting copy from source: ${sourceLocation}`,
    msg2: `To target: ${targetLocation}`,
  });

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
}

export default {
  import: importExternalDeployment,
};
