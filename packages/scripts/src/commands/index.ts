import { isTsNode } from "../utils";
import { CommandRunner } from "./runner";

const handleExit = () => {
  console.log("Exiting without error.");
  process.exit();
};
const handleError = (e) => {
  console.error("ERROR! An error was encountered while executing");
  console.error(e);
  console.log("Exiting with error.");
  process.exit(1);
};
process.on("SIGINT", handleExit);
process.on("uncaughtException", handleError);

// Run the program directly when called via ts-node (e.g. start script)
if (isTsNode) {
  CommandRunner.callProgramWithHelp();
}

// export program to be called via bin
export { CommandRunner };
