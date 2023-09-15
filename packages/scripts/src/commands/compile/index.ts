#!/usr/bin/env node
import { Command } from "commander";

import typesCmd from "./types";

const program = new Command("compile").description("Handle compilation");

/** add sub-commands from child folders */
program.addCommand(typesCmd);

export default program;
