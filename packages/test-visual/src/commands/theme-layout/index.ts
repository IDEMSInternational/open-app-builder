import { Command } from "commander";
import puppeteer, { Browser } from "puppeteer";
import path from "path";
import fs from "fs-extra";
import os from "os";
import chalk from "chalk";
import logUpdate from "log-update";
import { execFileSync } from "child_process";
import { pathToFileURL } from "url";
import { ROOT_FOLDER, paths } from "../../config";
import { outputCompleteMessage } from "../../utils";

/***************************************************************************************
 * Configuration
 *************************************************************************************/
const COMPONENTS_FOLDER = "src/app/shared/components/template/components";
const PLH_COMPONENTS_FOLDER = "packages/components/plh";

/** Global styles, and component styles that do not use view encapsulation */
const GLOBAL_STYLES = [
  "src/global.scss",
  "src/app/shared/components/template/template-component.scss",
];

/**
 * Component styles compiled with Angular emulated encapsulation.
 * Keys must match the "_nghost-{id}" / "_ngcontent-{id}" attributes used in fixtures.html
 */
const ENCAPSULATED_COMPONENT_STYLES = {
  acc: `${COMPONENTS_FOLDER}/accordion/accordion.component.scss`,
  adbox: `${COMPONENTS_FOLDER}/layout/advanced-dashed-box/advanced-dashed-box.component.scss`,
  aud: `${COMPONENTS_FOLDER}/audio/audio.component.scss`,
  btn: `${COMPONENTS_FOLDER}/button/button.component.scss`,
  chk: `${COMPONENTS_FOLDER}/simple-checkbox/simple-checkbox.component.scss`,
  dbox: `${COMPONENTS_FOLDER}/dashed-box/dashed-box.component.scss`,
  nsel: `${COMPONENTS_FOLDER}/number-selector/number-selector.component.scss`,
  stxt: `${COMPONENTS_FOLDER}/select-text/select-text.component.scss`,
  sub: `${COMPONENTS_FOLDER}/subtitle.scss`,
  tc: `${COMPONENTS_FOLDER}/task-card/task-card.component.scss`,
  tile: `${COMPONENTS_FOLDER}/tile-component/tile-component.component.scss`,
  ttl: `${COMPONENTS_FOLDER}/title/title.component.scss`,
  txt: `${COMPONENTS_FOLDER}/text/text.component.scss`,
  rttl: "src/app/reactive-templates/reactive-components/components/title/title.component.scss",
  cacc: `${PLH_COMPONENTS_FOLDER}/course-accordion/course-accordion.component.scss`,
  clacc: `${PLH_COMPONENTS_FOLDER}/course-lesson-accordion/course-lesson-accordion.component.scss`,
  lcta: `${PLH_COMPONENTS_FOLDER}/lesson-cta/lesson-cta.component.scss`,
  mli: `${PLH_COMPONENTS_FOLDER}/module-list-item/module-list-item.component.scss`,
  ppb: `${PLH_COMPONENTS_FOLDER}/parent-point-box/parent-point-box.component.scss`,
};

const FIXTURES_TEMPLATE_PATH = path.resolve(import.meta.dirname, "fixtures.html");
const NODE_MODULES_FOLDER = path.resolve(ROOT_FOLDER, "node_modules");
const IONIC_ESM_PATH = path.resolve(NODE_MODULES_FOLDER, "@ionic/core/dist/ionic/ionic.esm.js");
const SASS_PATH = path.resolve(NODE_MODULES_FOLDER, "sass/sass.node.mjs");
const ANGULAR_COMPILER_PATH = path.resolve(
  NODE_MODULES_FOLDER,
  "@angular/compiler/fesm2022/compiler.mjs"
);
const REPORT_PATH = path.resolve(paths.THEME_LAYOUT_OUTPUT_FOLDER, "report.json");

/***************************************************************************************
 * CLI
 * @example yarn workspace test-visual start theme-layout --base origin/master
 *************************************************************************************/

interface IProgramOptions {
  /** Git ref to compare the working tree against. Default: HEAD */
  base: string;
  /** Comma-separated list of themes to compare. Default: all themes included in variables.scss */
  themes?: string;
  /** Comma-separated list of Ionic modes to compare. Default: md,ios */
  modes: string;
}

const program = new Command("theme-layout");
export default program
  .description(
    "Compare computed layout of component fixtures across all themes, between a git ref and the working tree"
  )
  .option("-b, --base <string>", "Git ref to compare the working tree against", "HEAD")
  .option("-t, --themes <string>", "Comma-separated list of themes to compare (default: all)")
  .option("-m, --modes <string>", "Comma-separated list of Ionic modes to compare", "md,ios")
  .action(async (opts: IProgramOptions) => {
    await new ThemeLayoutComparator(opts).run().then(() => process.exit(0));
  });

/***************************************************************************************
 * Types
 *************************************************************************************/

interface IElementMeasurement {
  /** Human-readable element path, including classes */
  label: string;
  lineHeight: string;
  fontSize: string;
  /** Bounding box relative to fixture: [x, y, width, height] */
  rect: number[];
}
/** Measurements keyed by fixture name, then element path */
type IFixtureMeasurements = Record<string, Record<string, IElementMeasurement>>;
/** Fixture measurements keyed by "theme (mode)" */
type IThemeMeasurements = Record<string, IFixtureMeasurements>;

interface IElementChange {
  fixture: string;
  element: string;
  /** Changed computed styles, e.g. "line-height: normal -> 22px" */
  styles: string[];
  /** Whether the element's own bounding box changed */
  layoutChanged: boolean;
}
interface IThemeReport {
  /** Elements with changed line-height or font-size */
  styleChanges: IElementChange[];
  /** Elements with a changed bounding box but no changed styles in the same fixture */
  unexplainedLayoutChanges: IElementChange[];
  /** Number of elements with changed bounding boxes */
  layoutChangeCount: number;
}

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export class ThemeLayoutComparator {
  private browser: Browser;

  constructor(private options: IProgramOptions) {}

  public async run() {
    const baseFolder = this.extractGitRef(this.options.base);
    const sources = { base: baseFolder, current: ROOT_FOLDER };
    const pageUrls = { base: "", current: "" };
    let themes: string[];
    try {
      themes = this.getThemes(baseFolder, ROOT_FOLDER);
      for (const [label, sourceFolder] of Object.entries(sources)) {
        pageUrls[label] = await this.buildFixturesPage(label, sourceFolder);
      }
    } finally {
      // Extracted source is only required to compile styles
      fs.removeSync(baseFolder);
    }
    const modes = this.options.modes.split(",").map((mode) => mode.trim());

    const args = ["--allow-file-access-from-files"];
    // when running via github actions bypass sandbox
    if (process.env.CI) {
      args.push("--disable-setuid-sandbox", "--no-sandbox");
    }
    this.browser = await puppeteer.launch({ headless: true, args });
    const measurements: Record<keyof typeof sources, IThemeMeasurements> = {
      base: {},
      current: {},
    };
    for (const [label, pageUrl] of Object.entries(pageUrls)) {
      measurements[label] = await this.measureThemes(label, pageUrl, themes, modes);
    }
    await this.browser.close();

    const report = this.compareMeasurements(measurements.base, measurements.current);
    fs.writeJSONSync(REPORT_PATH, report, { spaces: 2 });
    this.logReport(report);
    outputCompleteMessage(
      `Theme layout compared: ${this.options.base} -> working tree`,
      REPORT_PATH
    );
  }

  /**
   * Extract source folders from a git ref to a temporary folder, so that styles can be compiled as
   * they were at that ref (kept outside of the repo to avoid being picked up by other tooling)
   */
  private extractGitRef(ref: string) {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), "theme-layout-"));
    const archivePath = path.resolve(outputFolder, "source.tar");
    execFileSync(
      "git",
      ["archive", "--format=tar", `--output=${archivePath}`, ref, "src", PLH_COMPONENTS_FOLDER],
      { cwd: ROOT_FOLDER }
    );
    execFileSync("tar", ["-xf", archivePath, "-C", outputFolder]);
    fs.removeSync(archivePath);
    console.log(`✔️  Extracted source from ${ref}`);
    return outputFolder;
  }

  /** List themes included in variables.scss of both source folders, filtered by any theme options */
  private getThemes(baseFolder: string, currentFolder: string) {
    const [baseThemes, currentThemes] = [baseFolder, currentFolder].map((folder) => {
      const variables = fs.readFileSync(path.resolve(folder, "src/theme/variables.scss"), "utf8");
      const includes = Array.from(variables.matchAll(/@include themes\.theme-([\w-]+);/g));
      return includes.map((match) => match[1]);
    });
    const unmatched = [
      ...baseThemes.filter((theme) => !currentThemes.includes(theme)),
      ...currentThemes.filter((theme) => !baseThemes.includes(theme)),
    ];
    if (unmatched.length > 0) {
      console.log(
        chalk.yellow(`Skipping themes not present in both sources: ${unmatched.join(", ")}`)
      );
    }
    let themes = currentThemes.filter((theme) => baseThemes.includes(theme));
    if (this.options.themes) {
      const selected = this.options.themes.split(",").map((theme) => theme.trim());
      themes = themes.filter((theme) => selected.includes(theme));
    }
    return themes;
  }

  /** Compile styles for a source folder and write alongside a copy of the fixtures page */
  private async buildFixturesPage(label: string, sourceFolder: string) {
    const outputFolder = path.resolve(paths.THEME_LAYOUT_OUTPUT_FOLDER, label);
    fs.emptyDirSync(outputFolder);
    fs.writeFileSync(
      path.resolve(outputFolder, "styles.css"),
      await this.compileStyles(sourceFolder)
    );
    const html = fs
      .readFileSync(FIXTURES_TEMPLATE_PATH, "utf8")
      .replace("{{IONIC_ESM_URL}}", pathToFileURL(IONIC_ESM_PATH).href);
    const pagePath = path.resolve(outputFolder, "index.html");
    fs.writeFileSync(pagePath, html);
    console.log(`✔️  Compiled ${label} styles`);
    return pathToFileURL(pagePath).href;
  }

  /**
   * Compile global and component styles from a source folder in a similar way to the app build,
   * resolving "~" and "/src" imports and applying emulated encapsulation to component styles
   */
  private async compileStyles(sourceFolder: string) {
    const sass = await import(pathToFileURL(SASS_PATH).href);
    const { encapsulateStyle } = await import(pathToFileURL(ANGULAR_COMPILER_PATH).href);
    const importer = {
      findFileUrl: (url: string) => {
        if (url.startsWith("~"))
          return pathToFileURL(path.resolve(NODE_MODULES_FOLDER, url.slice(1)));
        if (url.startsWith("/src/")) return pathToFileURL(path.join(sourceFolder, url));
        return null;
      },
    };
    const compile = (file: string): string =>
      sass.compile(path.resolve(sourceFolder, file), {
        importers: [importer],
        loadPaths: [NODE_MODULES_FOLDER],
        logger: sass.Logger.silent,
      }).css;
    // Plain css imports (e.g. Ionic core styles) are not inlined by sass
    const inlineCssImports = (css: string) =>
      css.replace(/@import\s+(?:url\()?["']~([^"']+)["']\)?;/g, (_, importPath) =>
        fs.readFileSync(path.resolve(NODE_MODULES_FOLDER, importPath), "utf8")
      );
    // Font urls are relative to the app build output, so resolve to the (unchanged) local assets
    const resolveAssetUrls = (css: string) =>
      css.replaceAll(
        "../assets/",
        `${pathToFileURL(path.resolve(ROOT_FOLDER, "src/assets")).href}/`
      );

    let css = GLOBAL_STYLES.map((file) => resolveAssetUrls(inlineCssImports(compile(file)))).join(
      "\n"
    );
    for (const [id, file] of Object.entries(ENCAPSULATED_COMPONENT_STYLES)) {
      if (!fs.existsSync(path.resolve(sourceFolder, file))) {
        console.log(chalk.yellow(`Skipping styles not present in source: ${file}`));
        continue;
      }
      css += `\n/* ${file} */\n${encapsulateStyle(compile(file), id)}`;
    }
    return css;
  }

  /** Load the fixtures page for every theme and mode, and record element measurements */
  private async measureThemes(label: string, pageUrl: string, themes: string[], modes: string[]) {
    const page = await this.browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    const measurements: IThemeMeasurements = {};
    const total = themes.length * modes.length;
    for (const mode of modes) {
      for (const theme of themes) {
        await page.goto(`${pageUrl}?theme=${theme}&mode=${mode}`);
        // Use string expressions rather than functions, to avoid tsx function serialisation issues
        await page.waitForFunction("window.themeLayoutResult || window.themeLayoutError", {
          timeout: 30000,
        });
        const error = await page.evaluate("window.themeLayoutError");
        if (error) {
          throw new Error(`Failed to measure ${label} ${theme} (${mode}):\n${error}`);
        }
        measurements[`${theme} (${mode})`] = (await page.evaluate(
          "window.themeLayoutResult"
        )) as IFixtureMeasurements;
        const progress = `${Object.keys(measurements).length}/${total} ${label} themes measured`;
        process.env.CI ? console.log(progress) : logUpdate(progress);
      }
    }
    if (!process.env.CI) {
      logUpdate.done();
    }
    await page.close();
    return measurements;
  }

  /**
   * Compare measurements for each theme. Changed line-height or font-size are reported as the likely
   * cause of any layout changes within the same fixture, other layout changes are reported individually
   */
  private compareMeasurements(base: IThemeMeasurements, current: IThemeMeasurements) {
    const report: Record<string, IThemeReport> = {};
    for (const themeMode of Object.keys(current)) {
      const themeReport: IThemeReport = {
        styleChanges: [],
        unexplainedLayoutChanges: [],
        layoutChangeCount: 0,
      };
      for (const fixture of Object.keys(current[themeMode])) {
        const baseElements = base[themeMode][fixture] || {};
        const currentElements = current[themeMode][fixture];
        const styleChanges: IElementChange[] = [];
        const layoutChanges: IElementChange[] = [];
        const keys = Array.from(
          new Set([...Object.keys(baseElements), ...Object.keys(currentElements)])
        );
        for (const key of keys) {
          const before = baseElements[key];
          const after = currentElements[key];
          const element = (after || before).label;
          if (!before || !after) {
            layoutChanges.push({ fixture, element, styles: [], layoutChanged: true });
            continue;
          }
          const styles = [];
          if (before.lineHeight !== after.lineHeight) {
            styles.push(`line-height: ${before.lineHeight} -> ${after.lineHeight}`);
          }
          if (before.fontSize !== after.fontSize) {
            styles.push(`font-size: ${before.fontSize} -> ${after.fontSize}`);
          }
          // Ignore elements without size (e.g. hidden inputs), whose position may not be relative to the fixture
          const isEmpty = (rect: number[]) => rect[2] === 0 && rect[3] === 0;
          const layoutChanged =
            before.rect.join() !== after.rect.join() &&
            !(isEmpty(before.rect) && isEmpty(after.rect));
          const change = { fixture, element, styles, layoutChanged };
          if (styles.length > 0) styleChanges.push(change);
          if (layoutChanged) layoutChanges.push(change);
        }
        themeReport.styleChanges.push(...styleChanges);
        themeReport.layoutChangeCount += layoutChanges.length;
        if (styleChanges.length === 0) {
          themeReport.unexplainedLayoutChanges.push(...layoutChanges);
        }
      }
      report[themeMode] = themeReport;
    }
    return report;
  }

  /** Log changes grouped across themes, as the same change typically applies to multiple themes */
  private logReport(report: Record<string, IThemeReport>) {
    const groups: Record<string, string[]> = {};
    const addToGroup = (description: string, themeMode: string) => {
      groups[description] ??= [];
      groups[description].push(themeMode);
    };
    // Full element paths are included in the report file, abbreviate for logs
    const abbreviate = (element: string) => `…/${element.split("/").slice(-3).join("/")}`;
    for (const [themeMode, { styleChanges, unexplainedLayoutChanges }] of Object.entries(report)) {
      for (const { fixture, element, styles, layoutChanged } of styleChanges) {
        const effect = layoutChanged ? "" : chalk.gray(" (no change to element size)");
        const description = `${chalk.cyan(fixture)} ${abbreviate(element)}\n    ${styles.join(", ")}${effect}`;
        addToGroup(description, themeMode);
      }
      for (const { fixture, element } of unexplainedLayoutChanges) {
        const description = `${chalk.cyan(fixture)} ${abbreviate(element)}\n    ${chalk.red("layout changed")}`;
        addToGroup(description, themeMode);
      }
    }

    console.log(chalk.bold("\nLayout changes per theme"));
    for (const [themeMode, { layoutChangeCount }] of Object.entries(report)) {
      const summary =
        layoutChangeCount === 0 ? chalk.green("none") : chalk.yellow(layoutChangeCount);
      console.log(`  ${themeMode}: ${summary}`);
    }
    if (Object.keys(groups).length > 0) {
      console.log(chalk.bold("\nChanged elements"));
      for (const [description, themeModes] of Object.entries(groups)) {
        console.log(`  ${description}\n    ${chalk.gray(themeModes.join(", "))}`);
      }
    }
  }
}
