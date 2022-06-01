import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import semver from "semver";
import simpleGit, { ResetMode } from "simple-git";
import type { SimpleGit } from "simple-git";
import { Project, PropertyAssignment, SyntaxKind } from "ts-morph";
import { getActiveDeployment } from "../../commands/deployment/get";
import { logError, logOutput, promptInput, promptOptions } from "../../utils";
import { IDeploymentConfigJson } from "../../commands/deployment/set";
import { IDEMS_APP_CONFIG } from "../../paths";

class GitProvider {
  private git: SimpleGit;
  private deployment: IDeploymentConfigJson;

  /**
   * NOTE - as constructor not used all public api endpoints should call initialiseGitProvider()
   **/
  constructor() {}

  /** Clone a remote repo to deployments */
  public async importRemoteRepo(remoteTarget?: string) {
    if (!remoteTarget) {
      remoteTarget = await promptInput("Specify url to remote git repo");
    }
    const [owner, repo] = remoteTarget.split("/").slice(-2);
    const targetDir = path.resolve(IDEMS_APP_CONFIG.deployments, repo);
    if (fs.existsSync(targetDir)) {
      logError({ msg1: "A folder for this deployment already exists", msg2: targetDir });
    }
    this.git = simpleGit(IDEMS_APP_CONFIG.deployments);
    console.log(chalk.gray(`Cloning ${remoteTarget}`));
    await this.git.clone(remoteTarget, targetDir);
    logOutput({ msg1: "Deployment imported successfully", msg2: targetDir });
    return targetDir;
  }

  /** Stash any existing changes and fetch latest content from main branch */
  public async refreshRemoteRepo() {
    console.log("refreshing remote repo");
    await this.initialiseGitProvider();
    await this.git.checkout("main");
    await this.git.reset(ResetMode.SOFT, ["HEAD"]);
    await this.git.stash(["--keep-index", "--include-untracked"]);
    await this.git.pull();
  }

  public async createContentRelease() {
    await this.initialiseGitProvider();
    console.log("Preparing files...");
    await this.promptChangesReview();
    const tagName = await this.promptReleaseTag();
    const branchName = `content/${tagName}`;
    const compareLink = `${this.deployment.git.content_repo}/compare/main...${branchName}`;
    await this.prepareReleaseBranch(branchName, compareLink);

    // apply changes
    await this.updateGitConfigTs({ content_tag_latest: tagName });

    await this.git.add([this.deployment._config_ts_path]);
    await this.git.commit(`chore: update config`);
    await this.git.add(["app_data"]);
    await this.git.commit(`content: ${tagName}`);
    await this.git.addTag(tagName);
    console.log("pushing changes");
    await this.git.push("origin", branchName);
    logOutput({
      msg1: "Content uploaded successfully. Pull request link:",
      msg2: compareLink,
    });
    // open PR
  }

  /**
   * TODO - Octokit api requires auth, so will need to come up with appropriate handling */
  private async wipCreateReleasePr(head: string, base = "main", body: string) {
    // const [owner, repo] = this.deployment.git.content_repo.split("/").slice(-2);
    // const res = await new Octokit({}).rest.pulls.create({ owner, repo, base, head, body });
    // console.log(res)
  }

  private async prepareReleaseBranch(branchName: string, compareLink: string) {
    // Ensure existing release does not already exist for tag
    if (await this.checkRemoteBranchExists(branchName)) {
      logError({ msg1: "A branch already exists for this release", msg2: compareLink });
    }
    if (await this.checkLocalBranchExists(branchName)) {
      await this.git.deleteLocalBranch(branchName, true);
    }
    await this.git.checkoutLocalBranch(branchName);
  }

  /** Stage all changes and show a summary */
  private async promptChangesReview() {
    // Stage files to show summary
    await this.git.add(".");
    const status = await this.git.status();
    if (status.files.length === 0) {
      logOutput({ msg1: "No files have been changed, skipping" });
      process.exit(0);
    }
    console.log(chalk.blueBright("\nChanges Summary"));
    const summary = status.files.map((file) => ({ change: `[${file.index}]`, path: file.path }));
    console.table(summary);
    console.log("");
    return status;
  }

  private async promptReleaseTag() {
    const { git } = this.deployment;
    const currentContentTag = git.content_tag_latest || "1.0.0";
    const releaseTypes: semver.ReleaseType[] = ["patch", "minor", "major"];
    const options = releaseTypes.map((releaseType) => {
      const version = semver.inc(currentContentTag, releaseType);
      return { name: `${releaseType} (${version})`, value: version };
    });
    const nextTag = await promptOptions<string>(options, "Specify a version tag");
    return nextTag;
  }

  /**
   * Update the workflow config.ts git child property directly by parsing and updating ts nodes
   * https://stackoverflow.com/questions/61213501/read-and-update-object-with-typescript-compiler-api
   */
  private async updateGitConfigTs(update: Partial<IDeploymentConfigJson["git"]>) {
    // Setup ts reader
    const project = new Project();
    const { _config_ts_path } = this.deployment;
    const sourceFile = project.addSourceFileAtPath(_config_ts_path);
    // extract config.git property
    const configNode = sourceFile.getVariableDeclarationOrThrow("config");
    const gitConfigNode = configNode
      .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .getPropertyOrThrow("git") as PropertyAssignment;
    const editableNode = gitConfigNode.getInitializerIfKindOrThrow(
      SyntaxKind.ObjectLiteralExpression
    );
    const indentSize = editableNode.getChildIndentationLevel();
    // Update individual values
    // TODO - only supports string literal values
    for (const [name, value] of Object.entries(update)) {
      const childNode = editableNode.getProperty(name);
      if (childNode) {
        const stringLiteralNode = childNode.getFirstChildByKindOrThrow(SyntaxKind.StringLiteral);
        stringLiteralNode.replaceWithText((writer) => writer.quote(value));
      } else {
        editableNode
          .addPropertyAssignment({
            name,
            initializer: (writer) => writer.quote(value),
          })
          .formatText({ indentSize });
      }
    }
    await project.save();
  }

  private async checkRemoteBranchExists(name: string) {
    const remote = await this.git.listRemote(["--heads", "origin", `${name}`]);
    return remote ? true : false;
  }
  private async checkLocalBranchExists(name: string) {
    const localBranches = await this.git.branchLocal();
    return localBranches.all.includes(name);
  }

  /**
   * Ensure git configured for workspace and return configured git provider
   *
   * NOTE - as async cannot be called in constructor and so should be called first
   * from any public api methods
   * */
  private async initialiseGitProvider() {
    if (this.git) {
      return;
    }
    this.deployment = getActiveDeployment();
    const { _workspace_path, git, _config_ts_path } = this.deployment;
    if (!git?.content_repo) {
      logError({
        msg1: "No git content repo configured, specify in config",
        msg2: _config_ts_path,
      });
    }
    if (!_workspace_path) {
      logError({
        msg1: "No active deployment specified",
        msg2: "yarn scripts deployment set",
      });
    }
    // Ensure git initialised with correct remote
    this.git = simpleGit(_workspace_path);
    if (!fs.existsSync(path.join(_workspace_path, ".git"))) {
      await this.git.init();
    }
    const remotes = await this.git.getRemotes(true);
    if (!remotes.find((remote) => remote.refs.fetch === git.content_repo)) {
      for (const remote of remotes) {
        await this.git.removeRemote(remote.name);
      }
      await this.git.addRemote("origin", git.content_repo);
    }
    await this.git.fetch();
    // TODO - handle case where local changes exist that would conflict with checkout
    // TODO - likely remove any app-data changes
    // await this.git.reset([ResetMode.SOFT]);
  }
}
// Export class without initialisation to avoid constructor call until required
export default () => new GitProvider();

function formatTimestamp(d = new Date()) {
  let year = d.getFullYear();
  let month = ("0" + (d.getMonth() + 1)).slice(-2);
  let day = ("0" + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
