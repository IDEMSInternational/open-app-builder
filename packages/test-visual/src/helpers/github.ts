import fs from "fs-extra";
import path from "path";
import { Octokit } from "octokit";
import { GH_REPO_NAME, GH_REPO_ORG, paths } from "../config";
import { downloadToFile } from "../utils";

const repoMeta = { repo: GH_REPO_NAME, owner: GH_REPO_ORG };
const { owner, repo } = repoMeta;
//skip authentication as repo public

export async function getGHRepoReleases() {
  const octokit = new Octokit({});
  // https://github.com/IDEMSInternational/parenting-app-ui/releases
  const res = await octokit.rest.repos.listReleases({ repo, owner });
  return res.data;
}

// constructed type from the promise return of the above function (for type support)
type PromiseResolveType<T> = T extends PromiseLike<infer U> ? U : T;
export type IGHReleaseData = PromiseResolveType<ReturnType<typeof getGHRepoReleases>>[0];

/** Retrieve the latest available repo artifacts (NOTE - non-exhaustive, paging not used) */
export async function getGHRepoArtifacts() {
  const octokit = new Octokit({});
  const artifactsRes = await octokit.rest.actions.listArtifactsForRepo({ repo, owner });
  return artifactsRes.data.artifacts;
}
type IGHArtifact = PromiseResolveType<ReturnType<typeof getGHRepoArtifacts>>[0];

/** Get a direct download link for an artifact
 * NOTE - artifacts can't be downloaded without login, so use https://nightly.link/ instead
 * https://github.com/actions/upload-artifact/issues/51
 */
export function getGHRepoArtifactDLLink(artifact: IGHArtifact) {
  const url = artifact.archive_download_url
    .replace("api.github.com/repos", "nightly.link")
    .replace("/zip", ".zip");
  return url;
  // (alt rest implementation)
  // const res = await octokit.rest.actions.downloadArtifact({
  //   repo,
  //   owner,
  //   artifact_id,
  //   archive_format: "zip",
  // });
}

/**
 * WiP - Alt implementation - will likely hit rate limiting
 * @param workflow_id id of workflow from api OR filename of yml file used to generate
 * @example getGHWorkflowArtifacts("my_workflow.yml")
 */
async function wipGetGHWorkflowArtifacts(workflow_id?: string) {
  const octokit = new Octokit({});
  if (workflow_id) {
    const workflowRunRes = await octokit.rest.actions.listWorkflowRuns({
      repo,
      owner,
      workflow_id,
    });
    const promises = workflowRunRes.data.workflow_runs.map(async (run) => {
      const run_id = run.id;
      const artifactsRes = await octokit.rest.actions.listWorkflowRunArtifacts({
        owner,
        repo,
        run_id,
      });
      return { run, artifacts: artifactsRes.data.artifacts };
    });
    const workflowsWithArtifacts = await Promise.all(promises);
    const filtered = workflowsWithArtifacts.filter((w) => w.artifacts.length > 0);
    console.log("artifacts", filtered);
  }
  return { artifacts: [] };
}

/**
 * Download src zip of a github release from zipball_url
 * @param zipball_url - path to download url
 * @param tag_name - used to name the file, e.g. v1.0.2.zip
 */
async function downloadGithubReleaseZip(zipball_url: string, tag_name: string) {
  fs.ensureDirSync(paths.CACHED_ASSETS);
  const outputFilePath = path.resolve(paths.CACHED_ASSETS, `${tag_name}.zip`);
  if (fs.existsSync(outputFilePath)) {
    // TODO - confirm zip not corrupt/meta matches (if possible)
    // Hard todo as head method does not return content length even after redirects (tried various ways)
  } else {
    await downloadToFile(zipball_url as string, outputFilePath);
  }
}
