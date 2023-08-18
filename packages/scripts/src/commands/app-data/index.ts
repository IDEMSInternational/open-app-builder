#!/usr/bin/env node
import { Command } from "commander";

import convertCmd from "./convert";
import postProcessCmd from "./postProcess";
import downloadCmd from "./download";
import { logProgramHelp } from "../../utils";

const program = new Command("app-data").description("Manage app data");

/** add sub-commands from child folders */
program.addCommand(convertCmd);
program.addCommand(postProcessCmd);

export default program;
