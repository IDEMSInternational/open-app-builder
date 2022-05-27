import fs from "fs";
import path from "path";
import simpleGit, { SimpleGit } from "simple-git";
import { getActiveDeployment } from "../../commands/deployment/get";
import { logError, logOutput, logWarning, promptInput } from "../../utils";

class GitProvider {
  private _git: SimpleGit;

  /** Ensure any calls to git are made from configured subrepo git client */
  private get git(): SimpleGit {
    if (this._git) return this._git;
    const { _workspace_path } = getActiveDeployment();
    return simpleGit(_workspace_path);
  }

  public async clone(options: { repoPath: string }) {
    // not required - instead check .git and if not add remote
    // if (this.git) {
    //   return logWarning({ msg1: "Git repo already exists, skip clone", msg2: this.subrepoPath });
    // }
    // try {
    //   await simpleGit().clone(options.repoPath, "app-data", { "--depth": 1 });
    //   logOutput({ msg1: "Repo cloned successfully", msg2: this.subrepoPath });
    // } catch (error) {
    //   logError({ msg1: "Could not clone repo", msg2: error.message });
    // }
  }

  public async getRemotes() {
    return this.git.getRemotes(true);
  }

  public async stashChanges() {
    return this.git.stash();
  }

  public pullFromRemote() {
    return this.git.pull("origin", "main");
  }

  public async createLocalPullRequest(suffix: number = 1) {
    const branchName = `content/${formatTimestamp()}-${suffix}`;

    // TODO - PromptInput - branch name (accept or change)
    await promptInput("Specify a name for the PR branch", branchName);

    const branchExists = await this.checkBranchExists(branchName);
    if (branchExists) {
      logWarning({
        msg1: "A branch with that name already exists, retry with another branch",
        msg2: branchName,
      });
      return this.createLocalPullRequest(suffix + 1);
    }
    this.git.branch([branchName]);
  }

  private async checkBranchExists(name: string) {
    const branches = await this.git.branch(["--list", `${name}\*`]);
    console.log("branches", branches);
    const remote = await this.git.listRemote(["--heads", "origin", `${name}`]);
    return remote ? true : false;
  }
}

export default new GitProvider();

function formatTimestamp(d = new Date()) {
  let year = d.getFullYear();
  let month = ("0" + (d.getMonth() + 1)).slice(-2);
  let day = ("0" + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
