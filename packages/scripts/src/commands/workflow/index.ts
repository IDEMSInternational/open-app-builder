#!/usr/bin/env node
import { Command } from "commander";

import runCmd from "./run";

const program = new Command("workflow");

/** add sub-commands from child folders */
program.addCommand(runCmd);

export default program;
