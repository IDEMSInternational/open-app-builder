#!/usr/bin/env node
import { Command } from "commander";

import importCmd from "./import";
import setCmd from "./set";
import pullCmd from "./pull";
import syncLibrariesCmd from "./sync-libraries";
import syncSheetsCmd from "./sync-sheets";

const program = new Command("external").description("Manage external deployments");

program.addCommand(importCmd);
program.addCommand(setCmd);
program.addCommand(pullCmd);
program.addCommand(syncLibrariesCmd);
program.addCommand(syncSheetsCmd);

export default program;
