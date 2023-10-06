#!/usr/bin/env node
import { Command } from "commander";

import { AppDataConverter, IConvertOptions } from "./convert/convert";
import postProcessCmd from "./postProcess";

const program = new Command("app-data").description("Manage app data");

/** add sub-commands from child folders */
program.addCommand(postProcessCmd);

interface IConvertProgramOptions {
  inputFolders: string;
  cacheFolder: string;
  outputFolder: string;
  skipCache?: boolean;
}
program
  .description("Convert app data")
  .requiredOption("-i --input-folders <string>", "")
  .requiredOption("-c --cache-folder <string>", "")
  .requiredOption("-o --output-folder <string>", "")
  .option("-s --skip-cache", "Wipe local conversion cache and process all files")
  .action(async (options: IConvertProgramOptions) => {
    const mappedOptions: IConvertOptions = {
      ...options,
      inputFolders: options.inputFolders.split(",").map((f) => f.trim()),
    };
    await new AppDataConverter(mappedOptions).run();
  });

export default program;
