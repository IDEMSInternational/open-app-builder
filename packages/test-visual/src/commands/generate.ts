import puppeteer from "puppeteer";
import path from "path";
import fs from "fs-extra";
import logUpdate from "log-update";
// As using commonJS can only import from built
// TODO - ensure built before run
import * as templateImport from "plh-data/dist/data/template/index";
const templateFlows = templateImport.template;

import { DB_TABLES, DB_VERSION } from "data-models/db.model";

import { Command } from "commander";
import { DEXIE_SRC_PATH, SCREENSHOTS_PATH } from "../paths";

// use dexie from platform src
// TODO - try alt import structure to retain typings
const Dexie = require(DEXIE_SRC_PATH);

import { USER_PROFILE_DEFAULT } from "../data/profiles";

const program = new Command("generate");

/** yarn workspace test-visual dev -- generate */
export default program.description("Generate screenshots").action(async (opts) => {
  console.log("generating screenshots");
  await new ScreenshotGenerate()
    .run()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
});

/** url where main app is served from */
const APP_SERVER_URL = "http://localhost:4200";

/** screen size to use during test - purposefully long to include more in screenshots */
const SCREEN_SIZE = { width: 360, height: 1280 };

const CLEAN_OUTPUT_FOLDER = false;

/** Main class that handles generation methods */
class ScreenshotGenerate {
  browser: puppeteer.Browser;
  page: puppeteer.Page;

  constructor() {}

  public async run() {
    await this.init();
    await this.seedDB();
    await this.page.goto(APP_SERVER_URL, { waitUntil: "networkidle2" });
    await this.generateScreenshots();
    console.log("screenshots generated");
    await this.browser.close();
  }

  private async init() {
    console.log("init");
    this.browser = await puppeteer.launch({
      headless: true,
      timeout: 60000,
      defaultViewport: SCREEN_SIZE,
    });
    this.page = await this.browser.newPage();
    // disable javascript during initial nav to prevent full load (can still seed db)
    await this.page.setJavaScriptEnabled(false);
    await this.page.goto(APP_SERVER_URL);
    await this.page.setJavaScriptEnabled(true);
    // allow dexie to be accessed via window.dexie in page
    // https://stackoverflow.com/questions/48815565/how-to-pass-required-module-object-to-puppeteer-page-evaluate
    await this.page.addScriptTag({ path: DEXIE_SRC_PATH });
  }

  /**
   *
   */
  private async generateScreenshots() {
    console.log("generating screenshots");
    fs.ensureDirSync(SCREENSHOTS_PATH);
    if (CLEAN_OUTPUT_FOLDER) {
      fs.emptyDirSync(SCREENSHOTS_PATH);
    }
    const totalTemplates = templateFlows.length;
    let index = 0;
    for (const template of templateFlows) {
      const { flow_name } = template;
      const outputPath = path.resolve(SCREENSHOTS_PATH, `${flow_name}.jpg`);
      if (!fs.existsSync(outputPath)) {
        await this.gotoTemplate(flow_name);
        await this.page.screenshot({
          path: outputPath,
          fullPage: true,
          captureBeyondViewport: true,
        });
      }
      index++;
      logUpdate(`${index}/${totalTemplates} screenshots generated`);
    }
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
  private async seedDB() {
    const { fields, tables } = USER_PROFILE_DEFAULT;
    // load localstorage fields
    const mappedFields = {};
    Object.entries(fields).forEach(([field, value]) => {
      mappedFields[`rp-contact-field.${field}`] = value;
    });
    await this.setLocalStorage(mappedFields);
    console.log("localstorageSet");
    await this.setIndexedDB(tables);
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
    console.log("setting tables");
    const passedArgs = { DB_TABLES, DB_VERSION, tables };
    const res = await this.page.evaluate(async (args: typeof passedArgs) => {
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
    console.log("db tables created", res);
  }
}

interface IAppWindow extends Window {
  Dexie: typeof Dexie;
}
