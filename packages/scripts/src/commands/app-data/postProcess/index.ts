import { Command } from "commander";
import assetsCmd from "./assets";
import sheetsCmd from "./sheets";

const program = new Command("post-process").description("Post process app data");

/** add sub-commands from child folders */
program.addCommand(assetsCmd);
program.addCommand(sheetsCmd);

export default program;
