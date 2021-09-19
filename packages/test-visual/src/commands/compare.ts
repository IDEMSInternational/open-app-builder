import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import JPEG from "jpeg-js";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { paths } from "../config";
import { getGHRepoReleases } from "../helpers";
import { outputErrorMessage } from "../utils";
import { ScreenshotDownload } from "./download";
import { ScreenshotGenerate } from "./generate";
import logUpdate from "log-update";

const program = new Command("compare");

const DEFAULT_OPTIONS = {
  clean: false,
  "ignore-errors": false,
};

/** @example yarn workspace test-visual start -- compare --clean */
export default program
  .description("Compare visual regression between screenshots")
  .option("-c, --clean", "Clear previous output screenshots to generate clean")
  .option("-i, --ignore-errors", "Ignore errors thrown when comparing images")
  .action(async (opts) => {
    const options = { ...DEFAULT_OPTIONS, ...opts };
    await new ScreenshotComparator(options).run();
  });

class ScreenshotComparator {
  diffs = {
    new: 0,
    different: 0,
    same: 0,
  };

  constructor(private options: typeof DEFAULT_OPTIONS) {}

  public async run() {
    const latestRelease = await this.getLatestRelease();
    const { tag_name } = latestRelease;
    const compareFolder = path.resolve(paths.CACHED_SCREENSHOTS_FOLDER, tag_name);

    if (!fs.existsSync(compareFolder)) {
      console.log("Downloading screenshots for comparison", tag_name);
      await new ScreenshotDownload().run();
    }
    fs.emptyDirSync(paths.SCREENSHOT_DIFFS_FOLDER);
    const generator = new ScreenshotGenerate({
      clean: this.options.clean,
      onScreenshotGenerated: async ({ screenshotPath, index, total }) => {
        const filename = path.basename(screenshotPath);
        const comparePath = path.resolve(compareFolder, filename);
        await this.compareScreenshots(screenshotPath, comparePath);
        logUpdate(`${index}/${total}`, JSON.stringify(this.diffs, null, 2));
      },
      onScreenshotsCompleted: async ({}) => {
        logUpdate.done();
        console.log(JSON.stringify(this.diffs, null, 2));
      },
    });
    await generator.run();
  }

  private async getLatestRelease() {
    const releases = await getGHRepoReleases();
    return releases[0];
  }

  private async compareScreenshots(sourcePath: string, comparePath: string) {
    if (!fs.existsSync(sourcePath)) {
      return;
    }
    if (!fs.existsSync(comparePath)) {
      this.diffs.new++;
      return;
    }

    const img1 = this.readImageData(sourcePath);
    const img2 = this.readImageData(comparePath);

    if (img1 && img2) {
      const diff = new PNG({ width: img1.width, height: img1.height });
      const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img2.height, {
        threshold: 0.01,
      });
      if (numDiffPixels > 0) {
        this.diffs.different++;
        const outputFilename = path.basename(sourcePath).replace(".jpg", ".png");
        const outputFilepath = path.resolve(paths.SCREENSHOT_DIFFS_FOLDER, outputFilename);
        diff.pack().pipe(fs.createWriteStream(outputFilepath));
      } else {
        this.diffs.same++;
      }
    }
  }

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
