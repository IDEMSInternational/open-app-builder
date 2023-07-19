import boxen from "boxen";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
/**
 * find files by a given extension recursively, returning full paths
 * @param ext - file extension (without '.'), e.g. 'xlsx' or 'json'
 * TODO - merge with scripts
 */
export function recursiveFindByExtension(
  base: string,
  ext: string,
  files?: string[],
  result?: string[]
): string[] {
  files = files || fs.readdirSync(base);
  result = result || [];
  for (const file of files) {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      const newFiles = fs.readdirSync(newbase);
      result = recursiveFindByExtension(newbase, ext, newFiles, result);
    } else {
      if (file.split(".").pop() === ext) {
        result.push(newbase);
      }
    }
  }
  return result;
}

/**
 * Check an input directory exists with files, create to populate empty if not.
 * Check an output directory exists, creating if required and emptying
 */
export function checkInputOutputDirs(inDir: string, outDir: string) {
  if (!fs.existsSync(inDir)) {
    fs.mkdirSync(inDir, { recursive: true });
  }
  if (fs.readdirSync(inDir).length === 0) {
    console.warn(chalk.red("Warning - No source translations found\n", inDir));
  }
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.emptyDirSync(outDir);
}

/** Display an output message in a box with 2 lines of text */
export function outputCompleteMessage(text1: string, text2 = "") {
  console.log(
    boxen(
      `
  ${chalk.blueBright(text1)}
          
  ${chalk.cyanBright(text2)}
          `,
      { padding: 1, borderColor: "blueBright" }
    )
  );
}

export function outputErrorMessage(text1: string, text2 = "") {
  console.log(
    boxen(
      `
  ${chalk.red(text1)}
          
  ${chalk.redBright(text2)}
          `,
      { padding: 1, borderColor: "redBright" }
    )
  );
}
