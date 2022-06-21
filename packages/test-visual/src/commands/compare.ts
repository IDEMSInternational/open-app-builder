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
  "ignore-errors": false,
};

/***************************************************************************************
 * CLI
 * @example yarn workspace test-visual start compare --clean
 *************************************************************************************/
export default program
  .description("Compare visual regression between screenshots")
  // options for compare
  .option("-i, --ignore-errors", "Ignore errors thrown when comparing images")
  // options copied from/passed to generate
  .option("-c, --clean", "Clean output folder before generating")
  .option("-D --debug", "Run in debug mode (not headless)")
  .option("-C --concurrency <string>", "Max number of browser pages to process in parallel")
  .option("-S --serve-www", "Serve production build from local www folder")
  .action(async (opts) => {
    const options = { ...DEFAULT_OPTIONS, ...opts };
    await new ScreenshotComparator(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
class ScreenshotComparator {
  private summary = { new: 0, different: 0, same: 0 };
  private details: { percentageDiff: number; filename: string }[] = [];

  constructor(private options: typeof DEFAULT_OPTIONS) {}

  public async run() {
    console.log("start compare screenshots");
    // TODO - Add options back for comparing against a specific release
    // const latestRelease = await this.getLatestRelease();
    // const { tag_name } = latestRelease;
    // this.releaseScreenshotsFolder = path.resolve(paths.DOWNLOADED_SCREENSHOTS_FOLDER, tag_name);
    const beforeScreenshotsFolder = paths.DOWNLOADED_SCREENSHOTS_FOLDER;
    // folder ensured in paths so check if empty
    const existingScreenshots = fs.readdirSync(beforeScreenshotsFolder);
    if (existingScreenshots.length === 0) {
      // Ensure latest target screenshots are downloaded
      // TODO - could handle with github action and passing compare folder name
      await new ScreenshotDownload().run({
        latest: true,
        outputFolder: beforeScreenshotsFolder,
      });
    } else {
      console.log("skipping screenshot download");
    }
    fs.emptyDirSync(paths.SCREENSHOT_DIFFS_FOLDER);

    // Create new instance of screenshot generator with callbacks that allow comparison
    // post-processing of each screenshot after it has been created
    const generator = new ScreenshotGenerate({
      ...this.options,
      onScreenshotGenerated: async ({ screenshotPath, counter, total }) => {
        const filename = path.basename(screenshotPath);
        const beforeScreenshotPath = path.resolve(beforeScreenshotsFolder, filename);
        await this.compareScreenshots(beforeScreenshotPath, screenshotPath);
        const msg = `${counter}/${total} [${path.basename(screenshotPath, ".png")}]`;
        return process.env.CI
          ? console.log(msg)
          : logUpdate(`${msg}\n\r${JSON.stringify(this.summary, null, 2)}`);
      },
    });
    await generator.run();
    outputCompleteMessage(
      `Compare found ${this.summary.different} templates with differences:`,
      paths.SCREENSHOT_DIFFS_FOLDER
    );
    this.details = this.details.sort((a, b) => b.percentageDiff - a.percentageDiff);
    this.generateOutputFiles();
  }

  /**
   * Write txt files containing overall and diff summaries to disk for external use
   * NOTE - filenames hardcoded here are also used by `test-visual-compare` github action
   * so avoid changing unless reuqired (or pass as an option)
   */
  private async generateOutputFiles() {
    const summaryFile = path.resolve(paths.OUTPUT_FOLDER, "summary.txt");
    const summaryTxt = Object.entries(this.summary)
      .map(([key, value]) => `${pad(key, 10)}: ${value}`)
      .join("\r\n");
    console.log(summaryTxt);

    const biggestDiffsFile = path.resolve(paths.OUTPUT_FOLDER, "biggestDiffs.txt");
    const biggestDiffs = this.details
      .slice(0, 10)
      .map((v, i) => `${pad(i + 1, 2)} | ${pad(v.percentageDiff, 4)}% | ${v.filename}`);

    const biggestDiffTxt = biggestDiffs.join("\r\n");
    console.log(biggestDiffTxt);

    fs.writeFileSync(summaryFile, summaryTxt);
    fs.writeFileSync(biggestDiffsFile, biggestDiffTxt);
  }

  private async getLatestRelease() {
    const releases = await getGHRepoReleases();
    return releases[0];
  }

  /** Take 2 image paths and calculate a pixel comparison, updating global diffs object with results */
  private async compareScreenshots(beforeImgPath: string, afterImgPath: string) {
    if (!fs.existsSync(beforeImgPath)) {
      this.summary.new++;
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
      const percentageDiffCalc = (numDiffPixels / (beforeImg.width * beforeImg.height)) * 100;
      const percentageDiff = Math.round(percentageDiffCalc * 10) / 10;
      if (numDiffPixels > 0) {
        this.summary.different++;
        this.details.push({ percentageDiff, filename: path.basename(beforeImgPath, ".png") });
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
        this.summary.same++;
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

function pad(str: string | number, chars: number) {
  str = `${str}`;
  const padChars = Math.max(chars - str.length + 1, 0);
  return str + new Array(padChars).join(" ");
}
