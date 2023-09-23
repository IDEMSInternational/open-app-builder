import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import semver from "semver";
import simpleGit, { ResetMode } from "simple-git";
import type { SimpleGit, FileStatusResult } from "simple-git";
import { Project, SyntaxKind } from "ts-morph";
import { ActiveDeployment } from "../../commands/";
import { Logger, logOutput, openUrl, promptOptions } from "../../utils";
import type { IDeploymentConfigJson } from "../../models/deployment.models";

class GitProvider {
  private git: SimpleGit;
  private deployment: IDeploymentConfigJson;

  /**
   * NOTE - as constructor not used all public api endpoints should call initialiseGitProvider()
   **/
  constructor() {}

  /** Access git clone methods directly independent of deployment */
  public async cloneRepo(repoPath: string, localPath: string) {
    const git = simpleGit();
    return git.clone(repoPath, localPath);
  }

  /** Pull latest content from remote repo into local branch. Attempt to resolve any conflicts */
  public async refreshRemoteRepo() {
    await this.initialiseGitProvider();
    console.log(chalk.gray("checkout [main]"));
    try {
      await this.git.checkout("main");
      await this.git.pull("origin", "main");
    } catch (error) {
      // If merge conflict prompt to discard local changes and retry
      console.log(chalk.red(error.message));
      const mergeErrorMsg = "Your local changes to the following files would be overwritten";
      if (error.message.includes(mergeErrorMsg)) {
        const shouldDiscard = await promptOptions(
          [
            { name: "No", value: false },
            { name: "Yes", value: true },
          ],
          "Would you like to discard local changes and retry?"
        );
        if (shouldDiscard) {
          await this.git.reset(ResetMode.SOFT, ["HEAD"]);
          await this.git.stash(["--keep-index", "--include-untracked"]);
          await this.refreshRemoteRepo();
        }
      }
    }
    console.log(chalk.gray("branch up-to-date"));
  }

  public async createContentRelease() {
    await this.initialiseGitProvider();
    console.log("Preparing files...");
    await this.promptChangesReview();
    const revertTagName = this.deployment.git.content_tag_latest;
    const tagName = await this.promptReleaseTag();

    // apply changes
    await this.updateGitConfigTs({ content_tag_latest: tagName });

    const branchName = `content/${tagName}`;
    const repoUrl = this.deployment.git.content_repo.replace(".git", "");
    const compareLink = `${repoUrl}/compare/main...${branchName}`;
    await this.prepareReleaseBranch(branchName, compareLink);
    await this.git.add("./*");
    await this.git.commit(`content: ${tagName}`);
    await this.git.addTag(tagName);
    console.log("pushing changes");
    try {
      await this.git.push("origin", branchName);
      logOutput({
        msg1: "Content uploaded successfully",
        msg2: "Use browser to complete Pull Request",
      });
      console.log(chalk.gray(compareLink));
      await openUrl(compareLink);
    } catch (error) {
      Logger.error({ msg1: "Failed to push to repo", msg2: error.message, logOnly: true });
      console.log("reverting changes");
      // Rollback changes
      // Reset previous commit, revert config ts change, checkout main, unstage files, delete created tag
      await this.git.reset(ResetMode.SOFT, ["HEAD~1"]);
      await this.updateGitConfigTs({ content_tag_latest: revertTagName });
      await this.git.reset(["--"]);
      await this.git.checkout("main");
      await this.git.tag(["--delete", tagName]);
    }

    // open PR
  }

  /**
   * TODO - Octokit api requires auth, so will need to come up with appropriate handling
   * TODO - Alt could use github actions and assume link should go valid
   * TODO - Alt could be to use GH cli (require install and auth)
   */
  private async wipCreateReleasePr(head: string, base = "main", body: string) {
    // const [owner, repo] = this.deployment.git.content_repo.split("/").slice(-2);
    // const res = await new Octokit({}).rest.pulls.create({ owner, repo, base, head, body });
    // console.log(res)
  }

  private async prepareReleaseBranch(branchName: string, compareLink: string) {
    // Ensure existing release does not already exist for tag
    if (await this.checkRemoteBranchExists(branchName)) {
      console.log(chalk.gray(compareLink));
      Logger.error({ msg1: "A branch already exists for this release" });
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
    this.logChangesSummary(status.files);
    console.log("");
    return status;
  }

  private logChangesSummary(fileChanges: FileStatusResult[]) {
    const statusIcons = {
      A: chalk.bgGreen.white(" A "),
      D: chalk.bgRed.white(" D "),
      M: chalk.bgBlue.white(" M "),
      U: chalk.bgGray.white(" U "),
    };
    const changes = [];
    for (const { index, path: filePath } of fileChanges) {
      changes.push(`${statusIcons[index] || index} ${filePath}`);
    }
    console.log(changes.join("\n"));
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

    // git config should exist in config file under a config.git = {...} assignment
    const assigner = "config.git";

    // search for expressions which represent variable assignment, e.g. config.git = {...}
    const expressions = sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionStatement);
    const configGitNode = expressions.find((e) => e.getText().includes(assigner));

    if (!configGitNode) {
      Logger.error({
        msg1: `Could not find [${assigner}] assignment in config file`,
        msg2: _config_ts_path,
      });
    }

    /** Debugging */
    // for (const expression of configGitNode.getDescendants()) {
    //   console.log({ descendent: descendent.constructor.name, text: descendent.getText() });
    // }

    const editableNode = configGitNode.getFirstDescendantByKindOrThrow(
      SyntaxKind.ObjectLiteralExpression
    );

    /** LEGACY - config assignment all in single expression, i.e. config = { ... } */
    // const configNode = sourceFile.getVariableDeclarationOrThrow("config");
    // const gitConfigNode = configNode
    //   .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
    //   .getPropertyOrThrow("git") as PropertyAssignment;
    // const editableNode = gitConfigNode.getInitializerIfKindOrThrow(
    //   SyntaxKind.ObjectLiteralExpression
    // );

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
    this.deployment = ActiveDeployment.get();
    const { _workspace_path, git, _config_ts_path } = this.deployment;
    if (!git?.content_repo) {
      Logger.error({
        msg1: "No git content repo configured, specify in config",
        msg2: _config_ts_path,
      });
    }
    if (!_workspace_path) {
      Logger.error({
        msg1: "No active deployment specified",
        msg2: "yarn workflow deployment set",
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
