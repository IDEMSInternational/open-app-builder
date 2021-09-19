import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import JPEG from "jpeg-js";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { paths } from "../config";
import { getGHRepoReleases } from "../helpers";
import { outputCompleteMessage, outputErrorMessage } from "../utils";
import { ScreenshotDownload } from "./download";
import { ScreenshotGenerate } from "./generate";
import logUpdate from "log-update";

const program = new Command("compare");

const DEFAULT_OPTIONS = {
  clean: false,
  "ignore-errors": false,
};

/***************************************************************************************
 * CLI
 * @example yarn workspace test-visual start compare --clean
 *************************************************************************************/
export default program
  .description("Compare visual regression between screenshots")
  .option("-c, --clean", "Clear previous output screenshots to generate clean")
  .option("-i, --ignore-errors", "Ignore errors thrown when comparing images")
  .action(async (opts) => {
    const options = { ...DEFAULT_OPTIONS, ...opts };
    await new ScreenshotComparator(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
class ScreenshotComparator {
  private diffs = { new: 0, different: 0, same: 0 };
  /** path to folder of downloaded screenshots from release */
  private releaseScreenshotsFolder: string;

  constructor(private options: typeof DEFAULT_OPTIONS) {}

  public async run() {
    const latestRelease = await this.getLatestRelease();
    const { tag_name } = latestRelease;
    this.releaseScreenshotsFolder = path.resolve(paths.CACHED_SCREENSHOTS_FOLDER, tag_name);

    if (!fs.existsSync(this.releaseScreenshotsFolder)) {
      console.log("Downloading screenshots for comparison", tag_name);
      await new ScreenshotDownload().run();
    }
    fs.emptyDirSync(paths.SCREENSHOT_DIFFS_FOLDER);

    // Create new instance of screenshot generator with callbacks that allow comparison
    // post-processing of each screenshot after it has been created
    const generator = new ScreenshotGenerate({
      clean: this.options.clean,
      onScreenshotGenerated: async ({ screenshotPath, index, total }) => {
        const filename = path.basename(screenshotPath);
        const releaseScreenshotPath = path.resolve(this.releaseScreenshotsFolder, filename);
        await this.compareScreenshots(releaseScreenshotPath, screenshotPath);
        logUpdate(`${index}/${total}`, JSON.stringify(this.diffs, null, 2));
      },
      onScreenshotsCompleted: async ({}) => {
        logUpdate.done();
        // console.log(JSON.stringify(this.diffs, null, 2));
      },
    });
    await generator.run();
    outputCompleteMessage(
      `Compare found ${this.diffs.different} templates with differences:`,
      paths.SCREENSHOT_DIFFS_FOLDER
    );
  }

  private async getLatestRelease() {
    const releases = await getGHRepoReleases();
    return releases[0];
  }

  /** Take 2 image paths and calculate a pixel comparison, updating global diffs object with results */
  private async compareScreenshots(beforeImgPath: string, afterImgPath: string) {
    if (!fs.existsSync(beforeImgPath)) {
      this.diffs.new++;
      return;
    }
    if (!fs.existsSync(afterImgPath)) {
      return;
    }

    const afterImg = this.readImageData(afterImgPath);
    const beforeImg = this.readImageData(beforeImgPath);

    if (afterImg && beforeImg) {
      const diff = new PNG({ width: beforeImg.width, height: beforeImg.height });
      const options: pixelmatch.PixelmatchOptions = { threshold: 0.01 };
      const numDiffPixels = pixelmatch(
        beforeImg.data,
        afterImg.data,
        diff.data,
        beforeImg.width,
        beforeImg.height,
        options
      );
      if (numDiffPixels > 0) {
        this.diffs.different++;
        // populate before, after and diff images to output diff folder

        const extension = path.extname(afterImgPath);
        const name = path.basename(afterImgPath, path.extname(afterImgPath));
        const beforeFilename = `${name}.before${extension}`;
        const afterFilename = `${name}.after${extension}`;
        const diffFilename = `${name}.diff${extension}`;

        fs.copyFileSync(beforeImgPath, path.resolve(paths.SCREENSHOT_DIFFS_FOLDER, beforeFilename));
        fs.copyFileSync(afterImgPath, path.resolve(paths.SCREENSHOT_DIFFS_FOLDER, afterFilename));

        const diffImgPath = path.resolve(paths.SCREENSHOT_DIFFS_FOLDER, diffFilename);
        diff.pack().pipe(fs.createWriteStream(diffImgPath));
      } else {
        this.diffs.same++;
      }
    }
  }

  /** Read and decode jpg or png file and return metadata for use in processing */
  private readImageData(filepath: string) {
    const extension = path.extname(filepath);
    const buffer = fs.readFileSync(filepath);
    switch (extension) {
      case ".jpg":
        return JPEG.decode(buffer);
      case ".png":
        return PNG.sync.read(buffer);
      default:
        if (this.options["ignore-errors"]) {
          console.log(`Skip unsupported image ${filepath}`);
          return null;
        } else {
          outputErrorMessage(
            `Image comparison not supported for filetype ${extension}`,
            "Ignore errors via cli option --ignore-errors"
          );
          process.exit(1);
        }
    }
  }
}
