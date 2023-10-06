import { Command } from "commander";
import { logProgramHelp } from "shared";

// Commands
import appDataCmd from "./app-data";
import compileCmd from "./compile";
import e2eDataCmd from "./e2e-data";
import configCmd from "./config";
import deploymentCmd from "./deployment/cli";
import versionCmd from "./version";
import workflowCmd from "./workflow";
import { IDeploymentConfig } from "data-models";
import { ActiveDeployment } from "../models";
import PACKAGE_JSON from "../../package.json";

class CommandRunnerClass {
  private program: Command;
  private activeDeployment: IDeploymentConfig;
  constructor() {
    const program = new Command();

    program.version(PACKAGE_JSON.version).description(`IDEMS App Scripts ${PACKAGE_JSON.version}`);

    /** add sub-commands from child folders */
    program.addCommand(appDataCmd);
    program.addCommand(compileCmd);
    program.addCommand(e2eDataCmd);
    program.addCommand(configCmd);
    program.addCommand(deploymentCmd);
    program.addCommand(versionCmd);
    program.addCommand(workflowCmd);

    this.program = program;
  }
  /**
   * Invoke the commander CLI with current process args,
   * displaying help if no args defined.
   * This is typically only used in the context of direct execution,
   * e.g. ts-node environments
   * @example
   * ```ts
   * if(isTsNode){
   *  callProgramWithHelp(program)
   * }
   * ```
   */
  public async callProgramWithHelp() {
    const commandArgs = process.argv.slice(2);
    await this.ensureDeploymentLoaded(commandArgs);
    if (commandArgs.length === 0) {
      return logProgramHelp(this.program);
    }

    return this.program.parseAsync(process.argv);
  }

  public async parseCommand(cmd: string) {
    const args = [...process.argv.slice(0, 2), ...cmd.split(" ")];
    await this.ensureDeploymentLoaded(args);
    return this.program.parseAsync(args);
  }

  private async ensureDeploymentLoaded(cmdArgs: string[]) {
    if (this.activeDeployment) return;
    let deploymentSetName: string;
    let [programName, scriptName, ...childArgs] = cmdArgs;
    let isDeploymentSetCommand = false;
    // Skip deployment load for other deployment commands or workflow
    if (programName === "deployment" && scriptName === "set") {
      isDeploymentSetCommand = true;
      deploymentSetName = cmdArgs[2];
    }
    if (programName === "workflow" && scriptName === "run") {
      const [workflowName, workflowScriptName] = childArgs;
      if (workflowName === "deployment" && workflowScriptName === "set") {
        isDeploymentSetCommand = true;
        deploymentSetName = childArgs[2];
      }
    }
    if (isDeploymentSetCommand) {
      this.activeDeployment = await ActiveDeployment.set(deploymentSetName);
      // TODO - find way of marking command complete and not continuing to parse
      //   (not a huge issue if setting again though)
    } else {
      this.activeDeployment = await ActiveDeployment.load();
    }
  }
}

export const CommandRunner = new CommandRunnerClass();
