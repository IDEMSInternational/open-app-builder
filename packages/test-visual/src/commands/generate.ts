import { Command } from "commander";
import puppeteer from "puppeteer";
import path from "path";
import PQueue from "p-queue";
import fs from "fs-extra";
import handler from "serve-handler";
import http from "http";
import logUpdate from "log-update";
import { DEXIE_SRC_PATH, paths } from "../config";
import { outputCompleteMessage, outputErrorMessage, zipFolder } from "../utils";
import { VISUAL_TEST_CONFIG } from "../config/test";

type IPageConfig = (typeof VISUAL_TEST_CONFIG)["pageList"][number];
type IDexieConfig = (typeof VISUAL_TEST_CONFIG)["dexieConfig"];

// Import Dexie from the src folder so that same instance can be used to seed the DB
// as is used in the app itself. Uses require import syntax for compatibility
const Dexie = require(DEXIE_SRC_PATH);

/***************************************************************************************
 * Configuration
 *************************************************************************************/
const APP_SERVER_URL = VISUAL_TEST_CONFIG.appServerUrl;
const SCREENSHOTS_OUTPUT_ZIP = path.resolve(paths.OUTPUT_FOLDER, "screenshots-generated.zip");

/***************************************************************************************
 * CLI
 * @example yarn workspace test-visual start generate --clean
 *************************************************************************************/

interface IProgramOptions {
  /** Callback function to be triggered after every screenshot generated */
  onScreenshotGenerated: (args: {
    screenshotPath: string;
    counter: number;
    total: number;
  }) => Promise<void>;
  /** Callback function to be triggered after all screenshots genereated */
  onScreenshotsCompleted: (args: { total: number }) => Promise<void>;
  /** clear existing snapshots and generate clean. Default: false */
  clean?: boolean;
  /** run in debug mode with non-headless puppeteer. Default: false */
  debug?: boolean;
  /** maximum templates to process in parallel. Default: 10 */
  concurrency?: string;
  /** Serve content from local www folder (e.g. ci). Default: false */
  serveWww?: boolean;
}

const DEFAULT_OPTIONS: IProgramOptions = {
  onScreenshotGenerated: async ({ screenshotPath, counter, total }) => {
    const screenshotName = path.basename(screenshotPath, ".png");
    return process.env.CI
      ? console.log(`${counter}/${total} screenshots generated`, screenshotName)
      : logUpdate(`${counter}/${total} screenshots generated`);
  },
  onScreenshotsCompleted: async ({ total }) => {
    if (!process.env.CI) {
      logUpdate.done();
    }
    console.log(`✔️  Screenshots complete`);
  },
  clean: false,
  concurrency: "10",
  debug: false,
};

const program = new Command("generate");
export default program
  .description("Generate screenshots")
  .option("-c, --clean", "Clean output folder before generating")
  .option("-D --debug", "Run in debug mode (not headless)")
  .option("-C --concurrency <string>", "Max number of browser pages to process in parallel")
  .option("-S --serve-www", "Serve production build from local www folder")
  .action(async (opts) => {
    console.log("Generating screenshots...");
    await new ScreenshotGenerate(opts).run().then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export class ScreenshotGenerate {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  server?: http.Server;

  private options: IProgramOptions;
  constructor(opts: Partial<IProgramOptions> = {}) {
    this.options = DEFAULT_OPTIONS;
    // Merge any options where passed. Avoid spread merge to avoid merging null/undefined
    Object.entries(opts).forEach(([key, value]) => {
      if (value) {
        this.options[key] = value;
      }
    });

    this.options = { ...DEFAULT_OPTIONS, ...opts } as IProgramOptions;
    // console.table(this.options);
  }

  public async run() {
    await this.startFrontendServer();
    await this.prepareBrowserRunner();
    await this.seedBrowserDB();
    await this.generateTemplateScreenshots();
    await this.generateZipOutput();
    await this.browser.close();
    await this.stopFrontendServer();
    outputCompleteMessage("Screenshots successfully generated", SCREENSHOTS_OUTPUT_ZIP);
  }

  /** Run a local webserver to server to serve frontend build from www folder */
  private async startFrontendServer() {
    if (this.options.serveWww) {
      return new Promise((resolve, reject) => {
        this.server = http.createServer((request, response) => {
          // https://github.com/vercel/serve-handler#options
          return handler(request, response, {
            public: paths.WWW_FOLDER,
            rewrites: [{ source: "**", destination: "/index.html" }],
          });
        });
        this.server.listen(4200, () => {
          console.log("server listening on http://localhost:4200");
          resolve(this.server);
        });
      });
    }
  }
  private stopFrontendServer() {
    if (this.server) {
      return new Promise((resolve, reject) => {
        this.server!.close((err) => {
          if (err) {
            reject(err);
          }
          console.log("server stopped");
          resolve(true);
        });
      });
    }
  }

  /** Create initial puppeteer browser and custom page objects   */
  private async prepareBrowserRunner() {
    const { height, width } = VISUAL_TEST_CONFIG.pageDefaults;
    this.browser = await puppeteer.launch({
      headless: !this.options.debug,
      defaultViewport: { width, height },
      args: ["--disable-notifications"],
      dumpio: this.options.debug,
    });
    this.page = await this.setupPage();
    console.log("✔️  Browser ready");
  }

  /** Create a custom browser page object and inject dynamic scripts required for use during db seeding */
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
    const { pageList, pageDefaults } = VISUAL_TEST_CONFIG;
    const totalTemplates = pageList.length;

    // run an initial request that can be used to check for console errors in debug mode
    if (this.options.debug) {
      await this.page.goto(APP_SERVER_URL, { waitUntil: "networkidle2" });
      await this.page.waitForTimeout(10000);
    }

    // create a task queue for handling concurrent requests
    const concurrency = Number(this.options.concurrency);
    const queue = new PQueue({
      concurrency,
      timeout: 60000,
      autoStart: false,
      throwOnTimeout: false,
    });

    // setup screenshot requests
    pageList.forEach((pageConfig) => {
      const task = async () => {
        const { name, height, width } = pageConfig;
        const outputPath = path.resolve(paths.SCREENSHOTS_FOLDER, `${name}.png`);
        if (!fs.existsSync(outputPath)) {
          const page = await this.browser.newPage();
          // resize page viewport if override provided
          if (height !== pageDefaults.height || width !== pageDefaults.width) {
            await page.setViewport({ width: pageConfig.width, height: pageConfig.height });
          }
          try {
            await this.goToUrl(pageConfig, page);
            await page.screenshot({
              path: outputPath,
              fullPage: true,
              captureBeyondViewport: true,
              type: "png",
            });
            // free up memory before closing page tab
            // https://github.com/puppeteer/puppeteer/issues/1490
            await page.goto("about:blank");
            await page.close();
          } catch (error) {
            // TODO - keep track of templates with errors
            // queue.pause();
            console.error("ERROR:", error);
            // process.exit(1);
          }
        }
        const counter = totalTemplates - queue.size - queue.pending;
        await this.options.onScreenshotGenerated({
          screenshotPath: outputPath,
          counter,
          total: totalTemplates,
        });
        return;
      };
      queue.add(task);
    });
    queue.on("next", () => {
      // TODO - might be good also to track resources, total pages or timestamps to prevent mem leaks
    });
    queue.start();
    await queue.onIdle();
    await this.options.onScreenshotsCompleted({ total: totalTemplates });
  }

  private async generateZipOutput() {
    await zipFolder(paths.SCREENSHOTS_FOLDER, SCREENSHOTS_OUTPUT_ZIP);
    console.log("✔️  Zip saved");
  }

  /** Load a template page from within the app and wait for content to render */
  private async goToUrl(pageConfig: IPageConfig, page: puppeteer.Page) {
    const { url, selector } = pageConfig;
    await page.goto(`${APP_SERVER_URL}/${url}`, {
      waitUntil: "networkidle2",
    });
    // wait for expected template container component to be in dom
    await page.waitForSelector(selector);
    // Additional timeout to support page fully loading
    // TODO - replace with function call from the app
    await page.waitForTimeout(pageConfig.pageWait);
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
    const { dexieConfig, localStorageFields } = VISUAL_TEST_CONFIG;
    // load localstorage fields
    const mappedFields = {};
    Object.entries(localStorageFields).forEach(([field, value]) => {
      mappedFields[`rp-contact-field.${field}`] = value;
    });
    await this.setLocalStorage(mappedFields);
    console.log("✔️  Localstorage set");
    await this.setIndexedDB(dexieConfig);
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
  private async setIndexedDB(dexieConfig: IDexieConfig) {
    const { data, tableSchema, version } = dexieConfig;
    const passedArgs = { tableSchema, version, data };
    return this.page.evaluate(async (args: typeof passedArgs) => {
      const appWindow: IAppWindow = window as any;
      const db = new appWindow.Dexie("plh-app-db");
      const { tableSchema, data, version } = args;
      // when configuring database from seed require setting a lower version
      // so that it can be configured as the correct version in the app
      db.version(version - 1).stores(tableSchema);
      await db.open().catch((err) => {
        console.error("could not open db", err);
      });
      for (const table_id of Object.keys(data)) {
        const rows = data[table_id];
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
