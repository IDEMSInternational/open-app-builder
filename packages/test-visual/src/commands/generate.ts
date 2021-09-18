import { Command } from "commander";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs-extra";
import logUpdate from "log-update";
import archiver from "archiver";
import { DEXIE_SRC_PATH, paths } from "../paths";
import { USER_PROFILE_DEFAULT } from "../data/profiles";
import { DB_TABLES, DB_VERSION } from "data-models/db.model";

// As using commonJS can only import from built
// TODO - ensure built before run
import * as templateImport from "plh-data/dist/data/template/index";
import { outputCompleteMessage, outputErrorMessage } from "../utils";
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
const SCREENSHOTS_OUTPUT_ZIP = path.resolve(paths.SCREENSHOTS_FOLDER, "../screenshots-vlatest.zip");
let CLEAN_OUTPUT_FOLDER = false;

/***************************************************************************************
 * CLI
 * @example yarn workspace test-visual dev -- generate --clean
 *************************************************************************************/
const program = new Command("generate");
export default program
  .description("Generate screenshots")
  .requiredOption("-c, --clean", "Clean output folder before generating", false)
  .action(async (opts) => {
    CLEAN_OUTPUT_FOLDER = opts.clean;
    await new ScreenshotGenerate().run().then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

const DEFAULT_CALLBACKS = {
  onScreenshotGenerated: async (screenshotPath: string) => null,
};

class ScreenshotGenerate {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  callbacks = DEFAULT_CALLBACKS;

  constructor(callbacks: Partial<typeof DEFAULT_CALLBACKS> = {}) {
    // merge any passed callbacks with default
    Object.entries(callbacks).forEach(([key, fn]) => (this.callbacks[key] = fn));
  }

  public async run() {
    console.log("Generating screenshots...");
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
      headless: true,
      defaultViewport: SCREEN_SIZE,
    });
    this.page = await this.browser.newPage();
    // disable javascript during initial nav to prevent full load (can still seed db)
    await this.page.setJavaScriptEnabled(false);
    try {
      await this.page.goto(APP_SERVER_URL);
      await this.page.setJavaScriptEnabled(true);
      // allow dexie to be accessed via window.dexie in page
      // https://stackoverflow.com/questions/48815565/how-to-pass-required-module-object-to-puppeteer-page-evaluate
      await this.page.addScriptTag({ path: DEXIE_SRC_PATH });
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
    if (CLEAN_OUTPUT_FOLDER) {
      fs.emptyDirSync(paths.SCREENSHOTS_FOLDER);
    }
    const totalTemplates = templateFlows.length;
    let index = 0;
    for (const template of templateFlows) {
      const { flow_name } = template;
      const outputPath = path.resolve(paths.SCREENSHOTS_FOLDER, `${flow_name}.jpg`);
      if (!fs.existsSync(outputPath)) {
        await this.gotoTemplate(flow_name);
        await this.page.screenshot({
          path: outputPath,
          fullPage: true,
          captureBeyondViewport: true,
        });
      }
      await this.callbacks.onScreenshotGenerated(outputPath);
      index++;
      logUpdate(`${index}/${totalTemplates} screenshots generated`);
    }
    logUpdate(`✔️  ${index}/${totalTemplates} screenshots generated`);
    logUpdate.done();
  }

  /**
   *
   * Adapted from: https://stackoverflow.com/questions/15641243/need-to-zip-an-entire-directory-using-node-js
   */
  private async generateZipOutput() {
    if (fs.existsSync(SCREENSHOTS_OUTPUT_ZIP)) {
      fs.removeSync(SCREENSHOTS_OUTPUT_ZIP);
    }
    const stream = fs.createWriteStream(SCREENSHOTS_OUTPUT_ZIP);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });
    return new Promise((resolve, reject) => {
      stream.on("close", () => {
        console.log("✔️  Zip saved");
        resolve(SCREENSHOTS_OUTPUT_ZIP);
      });
      archive
        .directory(paths.SCREENSHOTS_FOLDER, false)
        .on("error", (err) => reject(err))
        .pipe(stream);
      archive.finalize();
    });
  }

  private async gotoTemplate(templatename: string) {
    await this.page.goto(`http://localhost:4200/template/${templatename}`, {
      waitUntil: "networkidle2",
    });
    // Try to ensure all rendering complete by requesting animation frame
    await this.page.evaluate(async () => {
      async function waitForAnimationFrame() {
        return new Promise((resolve) => {
          window.requestAnimationFrame(() => resolve(true));
        });
      }
      await waitForAnimationFrame();
    });
  }

  /**
   *
   */
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
