import fs from "fs-extra";
import path from "path";
import { Octokit } from "octokit";
import { GH_REPO_NAME, GH_REPO_ORG, paths } from "../config";
import { downloadToFile } from "../utils";

export async function getGHRepoReleases() {
  const repoMeta = { repo: GH_REPO_NAME, owner: GH_REPO_ORG };
  const { owner, repo } = repoMeta;
  const octokit = new Octokit({
    //skip authentication as repo public
  });
  // https://github.com/IDEMSInternational/parenting-app-ui/releases
  const res = await octokit.rest.repos.listReleases({ repo, owner });

  return res.data;
}

// constructed type from the promise return of the above function (for type support)
type PromiseResolveType<T> = T extends PromiseLike<infer U> ? U : T;
export type IGHReleaseData = PromiseResolveType<ReturnType<typeof getGHRepoReleases>>[0];

/**
 * Download src zip of a github release from zipball_url
 * @param zipball_url - path to download url
 * @param tag_name - used to name the file, e.g. v1.0.2.zip
 */
async function downloadGithubReleaseZip(zipball_url: string, tag_name: string) {
  fs.ensureDirSync(paths.CACHED_RELEASES);
  const outputFilePath = path.resolve(paths.CACHED_RELEASES, `${tag_name}.zip`);
  if (fs.existsSync(outputFilePath)) {
    // TODO - confirm zip not corrupt/meta matches (if possible)
    // Hard todo as head method does not return content length even after redirects (tried various ways)
  } else {
    await downloadToFile(zipball_url as string, outputFilePath);
  }
}
