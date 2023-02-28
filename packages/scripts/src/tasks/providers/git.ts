import simpleGit from "simple-git";

class GitProvider {
  /** Access git clone methods directly independent of deployment */
  public async cloneRepo(repoPath: string, localPath: string) {
    const git = simpleGit();
    return git.clone(repoPath, localPath);
  }
}
// Export class without initialisation to avoid constructor call until required
export default () => new GitProvider();
