import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { paths } from "../config";
import { downloadToFile, outputErrorMessage, unzipFile } from "../utils";
import { getGHRepoReleases, IGHReleaseData } from "../helpers";

const program = new Command("download");

export default program
  .description("Download screenshots for a given app version")
  .action(async (opts) => {
    await new ScreenshotDownload().run();
  });

export class ScreenshotDownload {
  private releaseData: IGHReleaseData;
  private screenshotAsset: IGHReleaseData["assets"][0];
  private archiveFilepath: string;

  async run() {
    await this.getReleaseScreenshotAssetData();
    await this.downloadReleaseScreenshots();
    await this.extractDownloadArchive();
  }

  private async getReleaseScreenshotAssetData() {
    this.releaseData = await this.getTargetGHReleaseData();
    const { tag_name, assets, html_url } = this.releaseData;
    const screenshotsFilename = `screenshots-${tag_name}.zip`;
    const screenshotsAsset = assets.find((asset) => asset.name === screenshotsFilename);
    if (!screenshotsAsset) {
      outputErrorMessage(
        `No screenshots.zip asset: ${html_url}`,
        `See instructions in readme to populate release screenshots`
      );
      process.exit(1);
    }
    this.screenshotAsset = screenshotsAsset;
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

  private async downloadReleaseScreenshots() {
    const { name, browser_download_url } = this.screenshotAsset;
    this.archiveFilepath = path.resolve(paths.CACHED_SCREENSHOTS_FOLDER, name);
    if (fs.existsSync(this.archiveFilepath)) {
      console.log("Skipping screenshot download, already exists", this.archiveFilepath);
    } else {
      await downloadToFile(browser_download_url, this.archiveFilepath);
    }
  }

  private async extractDownloadArchive() {
    const { tag_name } = this.releaseData;
    const extractedFolderpath = path.resolve(paths.CACHED_SCREENSHOTS_FOLDER, tag_name);
    fs.ensureDirSync(extractedFolderpath);
    fs.emptyDirSync(extractedFolderpath);
    unzipFile(this.archiveFilepath, extractedFolderpath);
  }
}
