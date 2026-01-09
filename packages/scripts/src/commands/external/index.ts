#!/usr/bin/env node
import { Command } from "commander";

import importCmd from "./import";

const program = new Command("external").description("Manage external deployments");

program.addCommand(importCmd);

export default program;
