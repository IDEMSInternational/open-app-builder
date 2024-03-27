import { readFileSync, writeFileSync } from "fs";
import { GlobOptionsWithFileTypesUnset, glob } from "glob";
import { resolve } from "path";

export interface IEnvReplaceConfig {
  cwd: string;

  /** List of input folder glob patterns to include, default ['**'] */
  includeFolders: string[];

  /** Filename pattern to find */
  fileNameFind: string;

  /** String to replace filename pattern match with to output to different file, default '' */
  fileNameReplace: string;

  /** Additional variables to populate to env. Will be merged with global env */
  envAdditional: Record<string, any>;

  /** List of folder glob patterns to exclude,  */
  excludeFolders: string[];

  /** Specify list of variable names to exclude, default includes all */
  excludeVariables: string[];

  /** Specify list of variable names to include, default includes all */
  includeVariables: string[];

  /** Override generated globs from input folder and filename patters */
  rawGlobInput: string;

  /** Additional options to provide directly to input glob match */
  rawGlobOptions: GlobOptionsWithFileTypesUnset;

  /** Throw an error if environment variable is missing. Default true */
  throwOnMissing: boolean;
}

const DEFAULT_CONFIG: IEnvReplaceConfig = {
  cwd: process.cwd(),
  envAdditional: {},
  excludeFolders: ["node_modules/**"],
  excludeVariables: [],
  fileNameFind: ".template.",
  fileNameReplace: ".",
  includeFolders: ["**"],
  includeVariables: [],
  rawGlobInput: "",
  rawGlobOptions: {},
  throwOnMissing: true,
};

/**
 * Regex pattern used to identify templated variable names.
 * Supports minimal alphanumeric and underscore characters.
 * Uses capture group to detect variable name within ${VAR_NAME} syntax
 */
const VARIABLE_NAME_REGEX = /\${([a-z0-9_]*)}/gi;

/**
 * Utility class to handle replacing placeholder templates with environment variables
 * Inspired by https://github.com/danday74/envsub
 *
 * @example
 * ```ts
 * import { envReplace, IEnvReplaceConfig } from "@idemsInternational/env-replace";
 *
 * // default config processes `.template.` files using process env
 * const config: IEnvReplaceConfig = {}
 * envReplace.replaceFiles(config)
 * ```
 * @see IEnvReplaceConfig for full configuration options
 *
 */
class EnvReplaceClass {
  private config: IEnvReplaceConfig;
  private globalEnv: Record<string, any>;
  private summary: { [inputName: string]: { [variableName: string]: any } };

  /**
   * Replace templated variables in files, as matched via config
   * @returns list of variables replaced, with full output written to file
   */
  public async replaceFiles(config: Partial<IEnvReplaceConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.globalEnv = { ...process.env, ...this.config.envAdditional };
    this.summary = {};

    const { excludeFolders, cwd, rawGlobOptions, fileNameFind, fileNameReplace } = this.config;

    const inputGlob = this.generateInputGlob();
    const inputNames = await glob(inputGlob, {
      ignore: excludeFolders,
      cwd,
      dot: true,
      posix: true,
      ...rawGlobOptions,
    });

    for (const inputName of inputNames) {
      const filepath = resolve(cwd, inputName);
      const sourceContent = readFileSync(filepath, { encoding: "utf-8" });

      // determine variables to replace and values to replace with
      const variablesToReplace = this.generateReplacementList(sourceContent);
      const replacementEnv = this.generateReplacementEnv(variablesToReplace);

      // handle replacement
      const outputName = inputName.replace(fileNameFind, fileNameReplace);
      this.summary[outputName] = {};

      const replaceContent = this.generateReplaceContent(outputName, sourceContent, replacementEnv);
      const outputPath = resolve(cwd, outputName);
      writeFileSync(outputPath, replaceContent);
    }
    return this.summary;
  }

  private generateReplaceContent(
    outputName: string,
    sourceContent: string,
    replacementEnv: Record<string, any>
  ) {
    let replaced = new String(sourceContent).toString();
    for (const [variableName, replaceValue] of Object.entries(replacementEnv)) {
      this.summary[outputName][variableName] = replaceValue;
      replaced = replaced.replaceAll("${" + variableName + "}", replaceValue);
    }
    return replaced;
  }

  private generateReplacementEnv(variableNames: string[]) {
    const { throwOnMissing } = this.config;
    const replacementEnv: Record<string, any> = {};
    for (const variableName of variableNames) {
      let replaceValue = this.globalEnv[variableName];
      replacementEnv[variableName] = replaceValue;
      if (replaceValue === undefined) {
        const msg = `No value for environment variable \${${variableName}}`;
        if (throwOnMissing) throw new Error(msg);
        else console.warn(msg);
      }
    }
    return replacementEnv;
  }

  /**
   * Extract list of all variables within file contents matching variable regex,
   * convert to unique list and filter depending on include/exclude config
   */
  private generateReplacementList(contents: string) {
    // generate list of all required matches in advance to ensure
    // env variables exist as required
    const matches = Array.from(contents.matchAll(VARIABLE_NAME_REGEX));
    // use list of unique variable names for replacement
    const uniqueVariables = [...new Set(matches.map((m) => m[1]))];
    const { includeVariables, excludeVariables } = this.config;
    // filter replacement list if named list of variables to include/exclude set
    if (includeVariables.length > 0) {
      return uniqueVariables.filter((name) => includeVariables.includes(name));
    }
    if (excludeVariables.length > 0) {
      return uniqueVariables.filter((name) => !excludeVariables.includes(name));
    }
    return uniqueVariables;
  }

  /** Generate a glob matching pattern for all included paths with filename pattern match suffix */
  private generateInputGlob() {
    const { includeFolders, fileNameFind, rawGlobInput } = this.config;
    // use raw glob override if provided
    if (rawGlobInput) return rawGlobInput;
    // create match patterns for all included folders and file name patters
    const globs = [];
    for (const folder of includeFolders) {
      globs.push(`${folder}/*${fileNameFind}*`);
    }
    return globs.join("|");
  }
}
const envReplace = new EnvReplaceClass();
export { envReplace };
