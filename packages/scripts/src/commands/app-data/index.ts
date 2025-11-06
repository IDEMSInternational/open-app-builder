#!/usr/bin/env node
import { Command } from "commander";

import convertCmd from "./convert";
import convertFromRawCmd from "./convert-from-raw";
import postProcessCmd from "./postProcess";
import syncRawCmd from "./sync-raw";

const program = new Command("app-data").description("Manage app data");

/** add sub-commands from child folders */
program.addCommand(convertCmd);
program.addCommand(convertFromRawCmd);
program.addCommand(postProcessCmd);
program.addCommand(syncRawCmd);

export default program;
