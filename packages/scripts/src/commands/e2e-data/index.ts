#!/usr/bin/env node
import { Command } from "commander";

import parseCmd from "./parse";

const program = new Command("e2e-data").description("Parse E2E data");

/** add sub-commands from child folders */
program.addCommand(parseCmd);

export default program;
