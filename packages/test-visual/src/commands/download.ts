import { Command } from "commander";
import fs, { outputFile } from "fs-extra";
import axios from "axios";
import { Octokit } from "octokit";
import path from "path";
import { paths } from "../paths";
import logUpdate from "log-update";
import { outputErrorMessage } from "../utils";

const program = new Command("download");

export default program
  .description("Download screenshots for a given app version")
  .requiredOption(
    "-i, --input <input>",
    "Source folder for input json files, relative to translations folder. Default ./examples/source",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./examples/source")
  )
  .requiredOption(
    "-o, --output [output]",
    "Target folder for compiled json files, relative to translations folder. Default ./examples/compiled",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./examples/compiled")
  )
  .requiredOption(
    "-t, --translations [translations]",
    "Target folder containing translated sourceText json files, relative to translations folder. Default ./examples/translations",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./examples/translations")
  )
  .action(async (opts) => {
    await downloadReleaseScreenshots();
    return;
    // compileTranslations(opts.input, opts.translations, opts.output);
  });

async function downloadReleaseScreenshots() {
  const repoMeta = {
    repo: "parenting-app-ui",
    owner: "IDEMSInternational",
  };
  const { owner, repo } = repoMeta;
  const octokit = new Octokit({
    //skip authentication as repo public
  });
  // https://github.com/IDEMSInternational/parenting-app-ui/releases
  const res = await octokit.rest.repos.listReleases({ repo, owner });
  const latestRelease = res.data[0];
  let { assets, html_url, tag_name } = latestRelease;
  console.log("latestRelease", latestRelease);
  const screenshotsFilename = `screenshots-${tag_name}.zip`;
  const screenshotsAsset = assets.find((asset) => asset.name === screenshotsFilename);
  if (screenshotsAsset) {
    const downloadFolder = paths.CACHED_SCREENSHOTS_FOLDER;
    const downloadFilepath = path.resolve(downloadFolder, screenshotsFilename);
    await downloadToFile(screenshotsAsset.browser_download_url as string, downloadFilepath);
  } else {
    outputErrorMessage(
      `No screenshots.zip asset: ${html_url}`,
      `See instructions in readme to populate release screenshots`
    );
    // await downloadGithubReleaseZip(zipball_url as string, tag_name as string);
  }
}

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

async function downloadToFile(url: string, outputFilePath: string) {
  const client = axios.create();
  console.log("downloading", url);
  const writer = fs.createWriteStream(outputFilePath);
  const { data, headers } = await client.get(url, {
    responseType: "stream",
  });
  const totalLength = headers["content-length"];
  let bytesReceived = 0;
  data.on("data", (chunk: Buffer) => {
    bytesReceived += chunk.length;
    const progress = Math.round((bytesReceived / totalLength) * 100);
    logUpdate(`${progress}%`);
  });
  data.pipe(writer);
  return new Promise<void>((resolve, reject) => {
    writer.on("finish", () => {
      logUpdate(`downloaded ${outputFilePath}`);
      resolve();
    });
    writer.on("error", reject);
  });
}
