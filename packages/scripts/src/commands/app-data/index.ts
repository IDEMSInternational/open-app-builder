#!/usr/bin/env node
import { Command } from "commander";

import { AppDataConverter, IConvertOptions } from "./convert/convert";
import postProcessCmd from "./postProcess";

const program = new Command("app-data").description("Manage app data");

/** add sub-commands from child folders */
program.addCommand(postProcessCmd);

program
  .command("convert")
  .description("Convert app data")
  .requiredOption("-i --input-folder <string>", "")
  .requiredOption("-c --cache-folder <string>", "")
  .requiredOption("-o --output-folder <string>", "")
  .option("-s --skip-cache", "Wipe local conversion cache and process all files")
  .action(async (options: IConvertOptions) => {
    await new AppDataConverter(options).run();
  });

export default program;
