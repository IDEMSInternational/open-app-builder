import { Command } from "commander";
import puppeteer from "puppeteer";
import path from "path";
import PQueue from "p-queue";
import fs from "fs-extra";
import logUpdate from "log-update";
import { DEXIE_SRC_PATH, paths } from "../config";
import { USER_PROFILE_DEFAULT } from "../data/profiles";
import { DB_TABLES, DB_VERSION } from "data-models/db.model";

// As using commonJS can only import from built
// TODO - ensure built before run
import * as templateImport from "app-data/dist/data/template/index";
import { outputCompleteMessage, outputErrorMessage, zipFolder } from "../utils";
const templateFlows = templateImport.template;

// Import Dexie from the src folder so that same instance can be used to seed the DB
// as is used in the app itself. Uses require import syntax for compatibility
const Dexie = require(DEXIE_SRC_PATH);

/***************************************************************************************
 * Configuration
 *************************************************************************************/
/** url where main app is served from */
const APP_SERVER_URL = "http://localhost:4200";
/** screen size to use during test - purposefully long to include more in screenshots */
const SCREEN_SIZE = { width: 360, height: 1280 };
const SCREENSHOTS_OUTPUT_ZIP = path.resolve(paths.OUTPUT_FOLDER, "screenshots-generated.zip");

/***************************************************************************************
 * CLI
 * @example yarn workspace test-visual start generate --clean
 *************************************************************************************/

interface IProgramOptions {
  onScreenshotGenerated: (args: {
    screenshotPath: string;
    counter: number;
    total: number;
  }) => Promise<void>;
  onScreenshotsCompleted: (args: { total: number }) => Promise<void>;
  /** clear existing snapshots and generate clean */
  clean?: boolean;
  /** run in debug mode with non-headless puppeteer */
  debug?: boolean;
  /** maximum tremplates to process in parallel */
  concurrency?: string;
  /**  */
  pageWait?: string;
}

const DEFAULT_OPTIONS: Partial<IProgramOptions> = {
  onScreenshotGenerated: async ({ screenshotPath, counter, total }) => {
    logUpdate(`${counter}/${total} screenshots generated`);
  },
  onScreenshotsCompleted: async ({ total }) => {
    logUpdate.done();
    logUpdate(`✔️  Screenshots complete`);
  },
};

console.log("generate");
const program = new Command("generate");
export default program
  .description("Generate screenshots")
  .requiredOption("-c, --clean", "Clean output folder before generating", false)
  .requiredOption("-D --debug", "Run in debug mode (not headless)", false)
  .requiredOption(
    "-C --concurrency <string>",
    "Max number of browser pages to process in parallel",
    "10"
  )
  .requiredOption(
    "-PW --page-wait <string>",
    "Additional wait time given to help ensure page loaded",
    "500"
  )
  .action(async (opts) => {
    console.log("Generating screenshots...");
    console.table(opts);

    const options = { ...DEFAULT_OPTIONS, ...opts } as any;
    await new ScreenshotGenerate(options).run().then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export class ScreenshotGenerate {
  browser: puppeteer.Browser;
  page: puppeteer.Page;

  constructor(private options: IProgramOptions) {}

  public async run() {
    await this.prepareBrowserRunner();
    await this.seedBrowserDB();
    await this.generateTemplateScreenshots();
    await this.generateZipOutput();
    await this.browser.close();
    outputCompleteMessage("Screenshots successfully generated", SCREENSHOTS_OUTPUT_ZIP);
  }

  /**
   * Create a headless browser window and inject dynamic scripts required
   * for use during db seeding
   */
  private async prepareBrowserRunner() {
    this.browser = await puppeteer.launch({
      headless: !this.options.debug,
      defaultViewport: SCREEN_SIZE,
      args: ["--disable-notifications"],
      dumpio: this.options.debug,
    });
    this.page = await this.setupPage();
    console.log("✔️  Browser ready");
  }

  private async setupPage() {
    const page = await this.browser.newPage();
    // disable javascript during initial nav to prevent full load (can still seed db)
    await page.setJavaScriptEnabled(false);
    try {
      await page.goto(APP_SERVER_URL);
      await page.setJavaScriptEnabled(true);
      // allow dexie to be accessed via window.dexie in page
      // https://stackoverflow.com/questions/48815565/how-to-pass-required-module-object-to-puppeteer-page-evaluate
      await page.addScriptTag({ path: DEXIE_SRC_PATH });
      return page;
    } catch (error) {
      outputErrorMessage(`Could not load app on ${APP_SERVER_URL}`, "Is the server running?");
      process.exit(1);
    }
  }

  /**
   * Iterate over all app data template files, navigate, wait for render
   * and then take a screenshot
   */
  private async generateTemplateScreenshots() {
    if (this.options.clean) {
      fs.emptyDirSync(paths.SCREENSHOTS_FOLDER);
    }
    const totalTemplates = templateFlows.length;
    let counter = 0;

    // run an initial request that can be used to check for console errors in debug mode
    if (this.options.debug) {
      await this.page.goto(APP_SERVER_URL, { waitUntil: "networkidle2" });
      await this.page.waitForTimeout(10000);
    }
    const concurrency = Number(this.options.concurrency);
    const queue = new PQueue({ concurrency, timeout: 10000, autoStart: false });
    // create an array of browser page tabs for loading pages concurrently
    // const pagePromises = new Array(concurrency + 1).fill(0).map(async () => this.setupPage());
    // const pages = await Promise.all(pagePromises);

    templateFlows.forEach((template) => {
      const task = async () => {
        // parallel

        const { flow_name } = template;
        const outputPath = path.resolve(paths.SCREENSHOTS_FOLDER, `${flow_name}.png`);
        if (!fs.existsSync(outputPath)) {
          const page = await this.browser.newPage();
          await this.gotoTemplate("home", page);
          await this.gotoTemplate(flow_name, page);
          await page.screenshot({
            path: outputPath,
            fullPage: true,
            captureBeyondViewport: true,
            type: "png",
          });
          await page.close();
        }
        counter++;
        await this.options.onScreenshotGenerated({
          screenshotPath: outputPath,
          counter,
          total: totalTemplates,
        });
      };
      queue.add(task);
    });
    queue.start();
    await queue.onEmpty();
    console.log("complete");
    await this.options.onScreenshotsCompleted({ total: totalTemplates });
  }

  private async generateZipOutput() {
    await zipFolder(paths.SCREENSHOTS_FOLDER, SCREENSHOTS_OUTPUT_ZIP);
    console.log("✔️  Zip saved");
  }

  private async gotoTemplate(templatename: string, page: puppeteer.Page) {
    await page.goto(`http://localhost:4200/template/${templatename}`, {
      waitUntil: "networkidle2",
    });
    // Additional timeout to support page fully loading
    // TODO - replace with function call from the app
    await page.waitForSelector(`plh-template-container[data-templatename="${templatename}"`);
    await page.waitForTimeout(Number(this.options.pageWait));
    // Try to ensure all rendering complete by requesting animation frame
    await page.evaluate(async () => {
      async function waitForAnimationFrame() {
        return new Promise((resolve) => {
          window.requestAnimationFrame(() => resolve(true));
        });
      }
      await waitForAnimationFrame();
    });
  }

  /** Run custom scripts to seed localstorage and indexeddb profile for app **/
  private async seedBrowserDB() {
    const { fields, tables } = USER_PROFILE_DEFAULT;
    // load localstorage fields
    const mappedFields = {};
    Object.entries(fields).forEach(([field, value]) => {
      mappedFields[`rp-contact-field.${field}`] = value;
    });
    await this.setLocalStorage(mappedFields);
    console.log("✔️  Localstorage set");
    await this.setIndexedDB(tables);
    console.log("✔️  IndexedDB set");
  }

  /** Run evaluation to access page window and set values to localstorage  */
  private setLocalStorage(values: { [key: string]: string }) {
    return this.page.evaluate((valuesArg: { [key: string]: string }) => {
      Object.entries(valuesArg).forEach(([key, value]) => {
        localStorage.setItem(key, `${value}`);
      });
    }, values);
  }

  /**
   * Run evaluation to access page window and run commands on Dexie indexedDB
   * NOTE - requires dexie scripts to be included (handled in init)
   **/
  private async setIndexedDB(tables: typeof USER_PROFILE_DEFAULT["tables"]) {
    const passedArgs = { DB_TABLES, DB_VERSION, tables };
    return this.page.evaluate(async (args: typeof passedArgs) => {
      const appWindow: IAppWindow = window as any;
      const db = new appWindow.Dexie("plh-app-db");
      const { DB_TABLES, tables, DB_VERSION } = args;
      // when configuring database from seed require setting a lower version
      // so that it can be configured as the correct version in the app
      db.version(DB_VERSION - 1).stores(DB_TABLES);
      await db.open().catch((err) => {
        console.error("could not open db", err);
      });
      for (const table_id of Object.keys(tables)) {
        const rows = tables[table_id];
        await db.table(table_id).bulkPut(rows);
      }
      const res = Object.keys(db._dbSchema);
      db.close();
      // delete window.Dexie;
      return res;
    }, passedArgs);
  }
}

interface IAppWindow extends Window {
  Dexie: typeof Dexie;
}
