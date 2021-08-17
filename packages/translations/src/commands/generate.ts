import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { checkInputOutputDirs, outputCompleteMessage, recursiveFindByExtension } from "../utils";

const program = new Command("generate");

export default program
  .description("Generate files for translation")
  .requiredOption(
    "-i, --input <input>",
    "Source folder for input files, relative to translations folder. Default ./input",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./input")
  )
  .helpOption("-i, --input", "test help")
  .requiredOption(
    "-o, --output [output]",
    "Target folder for output files, relative to translations folder. Default ./output",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./output")
  )
  .action((opts) => {
    generateTranslations(opts.input, opts.output);
  });

/** Process files for translation from input folder and output to given directory **/
function generateTranslations(inDir: string, outDir: string) {
  checkInputOutputDirs(inDir, outDir);
  copyTranslationFiles(inDir, outDir);
  outputCompleteMessage("Translation Files Generated", outDir);
}

/**
 * Recursively copy all json files from translation directory to output folder,
 * flattening folder paths
 **/
function copyTranslationFiles(inDir: string, outDir: string) {
  const inputFiles = recursiveFindByExtension(inDir, "json");
  for (const filepath of inputFiles) {
    const filename = path.basename(filepath);
    fs.copyFileSync(filepath, `${outDir}/${filename}`);
  }
}
