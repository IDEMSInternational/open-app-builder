import fs from "fs-extra";
import path from "path";
import simpleGit from "simple-git";
import { ActiveDeployment } from "../../../commands/deployment/get";
import { logOutput, logWarning } from "../../../utils";

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

  async function processLibrary(libConfig: ILibraryConfig): Promise<IProcessedLibrary | null> {
    const { repo, tag } = libConfig;
    const key = `${repo}#${tag}`;

    if (visited.has(key)) {
      return null;
    }
    visited.add(key);

    const repoName = path.basename(repo, ".git");
    const targetDir = path.join(librariesDir, repoName);

    logOutput({
      msg1: `Fetching library: ${repoName}`,
      msg2: `Tag: ${tag}`,
    });

    await downloadLibrary(repo, tag, targetDir);

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

  for (const lib of rootLibraries) {
    await processLibrary(lib);
  }

  logOutput({
    msg1: "Library Processing Order:",
    msg2: processedLibraries
      .map((lib, index) => `${index + 1}. ${lib.name} (${lib.tag})`)
      .join("\n"),
  });
}

async function downloadLibrary(repo: string, tag: string, targetDir: string) {
  const tempBase = path.resolve(targetDir, "..", "_temp_libs");
  const tempClone = path.join(tempBase, path.basename(targetDir));

  fs.ensureDirSync(tempBase);
  fs.removeSync(tempClone);

  try {
    const git = simpleGit();
    await git.clone(repo, tempClone);
    await git.cwd(tempClone).checkout(tag);

    fs.removeSync(targetDir);
    fs.ensureDirSync(targetDir);

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
    try {
      fs.rmdirSync(tempBase);
    } catch {}
  }
}

async function getLibrariesFromConfig(configPath: string): Promise<ILibraryConfig[]> {
  if (!fs.existsSync(configPath)) return [];

  try {
    const content = fs.readFileSync(configPath, "utf-8");
    const match = content.match(/config\.libraries\s*=\s*(\[[\s\S]*?\]);/);
    if (match && match[1]) {
      const fn = new Function(`return ${match[1]}`);
      const libraries = fn();
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
