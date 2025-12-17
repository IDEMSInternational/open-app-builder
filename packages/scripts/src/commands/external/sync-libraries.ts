#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import simpleGit from "simple-git";
import { ActiveDeployment } from "../deployment/get";
import { logOutput, logWarning } from "../../utils";

const program = new Command("sync-libraries");

program.description("Sync libraries defined in deployment config").action(async () => {
  await syncLibraries();
});

interface ILibraryConfig {
  repo: string;
  tag: string;
}

interface IProcessedLibrary extends ILibraryConfig {
  name: string;
  localPath: string;
  dependencies: IProcessedLibrary[];
}

export async function syncLibraries() {
  const config = ActiveDeployment.get({ skipRecompileCheck: true });
  const configAny = config as any;

  if (
    !configAny.libraries ||
    !Array.isArray(configAny.libraries) ||
    configAny.libraries.length === 0
  ) {
    logOutput({
      msg1: "No libraries configured",
      msg2: "Skipping library sync",
    });
    return;
  }

  const rootLibraries = configAny.libraries as ILibraryConfig[];
  const workspacePath = config._workspace_path;
  const librariesDir = path.join(workspacePath, "libraries");

  logOutput({
    msg1: `Syncing libraries to: ${librariesDir}`,
    msg2: `Found ${rootLibraries.length} root libraries`,
  });

  fs.ensureDirSync(librariesDir);

  const visited = new Set<string>();
  const processedLibraries: IProcessedLibrary[] = [];

  // Helper to process a library recursively
  async function processLibrary(libConfig: ILibraryConfig): Promise<IProcessedLibrary | null> {
    const { repo, tag } = libConfig;
    const key = `${repo}#${tag}`;

    if (visited.has(key)) {
      return null; // Already processed or cycle
    }
    visited.add(key);

    const repoName = path.basename(repo, ".git");
    const targetDir = path.join(librariesDir, repoName);

    logOutput({
      msg1: `Fetching library: ${repoName}`,
      msg2: `Tag: ${tag}`,
    });

    // Download and extract
    await downloadLibrary(repo, tag, targetDir);

    // Read config.ts for dependencies
    const childLibraries = await getLibrariesFromConfig(path.join(targetDir, "config.ts"));

    const dependencies: IProcessedLibrary[] = [];
    for (const childLib of childLibraries) {
      const processedChild = await processLibrary(childLib);
      if (processedChild) {
        dependencies.push(processedChild);
      }
    }

    const result: IProcessedLibrary = {
      repo,
      tag,
      name: repoName,
      localPath: targetDir,
      dependencies,
    };

    processedLibraries.push(result);
    return result;
  }

  // Process root libraries
  for (const lib of rootLibraries) {
    await processLibrary(lib);
  }

  logOutput({
    msg1: "Library Processing Order:",
    msg2: "-------------------------",
  });

  processedLibraries.forEach((lib, index) => {
    console.log(`${index + 1}. ${lib.name} (${lib.tag})`);
  });
}

async function downloadLibrary(repo: string, tag: string, targetDir: string) {
  // Use a temp dir outside of targetDir to avoid issues
  const tempBase = path.resolve(targetDir, "..", "_temp_libs");
  const tempClone = path.join(tempBase, path.basename(targetDir));

  fs.ensureDirSync(tempBase);
  fs.removeSync(tempClone); // Ensure clean start

  try {
    const git = simpleGit();
    await git.clone(repo, tempClone);
    await git.cwd(tempClone).checkout(tag);

    // Now prepare targetDir
    fs.removeSync(targetDir);
    fs.ensureDirSync(targetDir);

    // Move app_data and config.ts
    const appDataPath = path.join(tempClone, "app_data");
    const configPath = path.join(tempClone, "config.ts");

    if (fs.existsSync(appDataPath)) {
      fs.copySync(appDataPath, path.join(targetDir, "app_data"));
    }
    if (fs.existsSync(configPath)) {
      fs.copySync(configPath, path.join(targetDir, "config.ts"));
    }
  } catch (e) {
    logWarning({
      msg1: `Failed to download ${repo}`,
      msg2: e.message,
    });
    throw e;
  } finally {
    fs.removeSync(tempClone);
    // Try to remove tempBase if empty
    try {
      fs.rmdirSync(tempBase);
    } catch {}
  }
}

async function getLibrariesFromConfig(configPath: string): Promise<ILibraryConfig[]> {
  if (!fs.existsSync(configPath)) return [];

  try {
    const content = fs.readFileSync(configPath, "utf-8");
    // Regex to find config.libraries = [...]
    const match = content.match(/config\.libraries\s*=\s*(\[[\s\S]*?\]);/);
    if (match && match[1]) {
      // Use eval to evaluate the array safely-ish (assuming it's just data)
      const libraries = eval(match[1]);
      if (Array.isArray(libraries)) {
        return libraries;
      }
    }
  } catch (e) {
    logWarning({
      msg1: `Failed to parse config libraries from ${configPath}`,
      msg2: e.message,
    });
  }
  return [];
}

export default program;
