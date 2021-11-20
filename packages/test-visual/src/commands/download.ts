import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { paths } from "../config";
import { downloadToFile, outputCompleteMessage, outputErrorMessage, unzipFile } from "../utils";
import {
  getGHRepoArtifactDLLink,
  getGHRepoArtifacts,
  getGHRepoReleases,
  IGHReleaseData,
} from "../helpers";

const program = new Command("download");
const SCREENSHOT_ARTIFACT_NAME = "screenshots-artifact";

const DEFAULT_OPTIONS = {
  latest: true,
  outputFolder: paths.DOWNLOADED_SCREENSHOTS_FOLDER,
};

export default program
  .description("Download screenshots for a given app version")
  .action(async (opts) => {
    await new ScreenshotDownload().run();
  });

export class ScreenshotDownload {
  async run(options = DEFAULT_OPTIONS) {
    const { outputFolder } = options;
    if (options.latest) {
      const { browser_download_url, id } = await this.getLatestScreenshotsArtifact();
      await this.downloadCacheAsset(browser_download_url, `${id}.zip`);
      const downloadFolderPath = await this.extractCacheAsset(`${id}.zip`, outputFolder);
      return downloadFolderPath;
    }
    // TODO - handle passing release tag (methods require refactor)
    else {
      const { browser_download_url, name } = await this.getReleaseScreenshotAssetData();
      await this.downloadCacheAsset(browser_download_url, `${name}.zip`);
      const downloadFolderPath = await this.extractCacheAsset(`${name}.zip`, outputFolder);
      return downloadFolderPath;
    }
  }

  /**
   *
   * TODO - not filtered to specific branch run (assume fine)
   */
  private async getLatestScreenshotsArtifact() {
    const artifacts = await getGHRepoArtifacts();
    const latestArtifact = artifacts.find((a) => a.name === SCREENSHOT_ARTIFACT_NAME);
    if (!latestArtifact) {
      throw new Error(`No artifacts found with name: ${SCREENSHOT_ARTIFACT_NAME}`);
    }
    console.log("latest artifact", latestArtifact);
    const browser_download_url = getGHRepoArtifactDLLink(latestArtifact);
    return { browser_download_url, id: latestArtifact.id };
  }

  private async getReleaseScreenshotAssetData() {
    const { tag_name, assets, html_url } = await this.getTargetGHReleaseData();
    const screenshotsFilename = `screenshots-${tag_name}.zip`;
    const screenshotsAsset = assets.find((asset) => asset.name === screenshotsFilename);
    if (!screenshotsAsset) {
      outputErrorMessage(
        `No screenshots.zip asset: ${html_url}`,
        `See instructions in readme to populate release screenshots`
      );
      process.exit(1);
    }
    return screenshotsAsset;
  }

  /**
   * Take a release tag for GitHub repo and retrieve metadata for the release via the github api
   * @param releaseTagname string tag assigned to release. If not provided will return latest tag
   **/
  private async getTargetGHReleaseData(releaseTagname?: string) {
    const releases = await getGHRepoReleases();
    if (!releaseTagname) {
      const latestRelease: IGHReleaseData = releases[0];
      return latestRelease;
    } else {
      const matchedRelease: IGHReleaseData = releases.find(
        (release) => release.tag_name === releaseTagname
      ) as IGHReleaseData;
      if (!matchedRelease) {
        outputErrorMessage("Could not find GH release", releaseTagname);
        process.exit(1);
      }
      return matchedRelease;
    }
  }

  /** Check if asset with given filename already exists in cache, and if not download */
  private async downloadCacheAsset(url: string, filename: string) {
    const archiveFilepath = path.resolve(paths.CACHED_ASSETS, filename);
    if (fs.existsSync(archiveFilepath)) {
      console.log("Skipping screenshot download, already exists", archiveFilepath);
    } else {
      await downloadToFile(url, archiveFilepath);
    }
    return archiveFilepath;
  }

  /** Extract the downloaded screenshots to a folder with the same name as the input zip file */
  private async extractCacheAsset(assetName: string, targetDir: string) {
    const srcFile = path.resolve(paths.CACHED_ASSETS, assetName);
    await unzipFile(srcFile, targetDir);
    outputCompleteMessage("Screenshots downloaded", targetDir);
    return targetDir;
  }
}
