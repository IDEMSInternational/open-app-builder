#!/usr/bin/env node
import { Command } from "commander";

import decryptCmd from "./decrypt";
import encryptCmd from "./encrypt";

const program = new Command("config").description("Encrypt and Decrypt sensitive configurations");

/** add sub-commands from child folders */
program.addCommand(decryptCmd);
program.addCommand(encryptCmd);

export default program;
