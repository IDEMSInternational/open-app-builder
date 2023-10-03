#!/usr/bin/env node

"use strict";

import { runProgram } from "./utils.mjs";

// add extra commands for workflow run
// TODO - check what is parsed for electron apps
// https://github.com/tj/commander.js?#parse-and-parseasync
process.argv.splice(2, 0, "workflow", "run");

await runProgram(process.argv);
