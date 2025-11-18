#!/usr/bin/env node
import { Command } from "commander";

import compileCmd from "./compile";
import createCmd from "./create";
import getCmd from "./get";
import importCmd from "./import";
import setCmd from "./set";
import setExternalCmd from "./set-external";

const program = new Command("deployment").description("Manage active deployment workspace");

program.addCommand(compileCmd);
program.addCommand(createCmd);
program.addCommand(getCmd);
program.addCommand(importCmd);
program.addCommand(setCmd);
program.addCommand(setExternalCmd);

export default program;
