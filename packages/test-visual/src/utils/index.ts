import axios from "axios";
import fs from "fs-extra";
import archiver from "archiver";
import extract from "extract-zip";
import chalk from "chalk";
import boxen from "boxen";
import logUpdate from "log-update";
import { Command } from "commander";

/** Display an output message in a blue box with 2 lines of text */
export function outputCompleteMessage(text1: string, text2 = "") {
  console.log(
    boxen(
      `
  ${chalk.blueBright(text1)}
          
  ${chalk.cyanBright(text2)}
          `,
      { padding: 1, borderColor: "blueBright" }
    )
  );
}

/** Display an output message in a red box with 2 lines of text */
export function outputErrorMessage(text1: string, text2 = "") {
  console.log(
    boxen(
      `
  ${chalk.red(text1)}
          
  ${chalk.redBright(text2)}
          `,
      { padding: 1, borderColor: "redBright" }
    )
  );
}

/**
 * Take a folder directory and zip all contents to zip file
 * @returns path to generated zip
 * */
export function zipFolder(inputFolerPath: string, outputFilepath: string) {
  if (fs.existsSync(outputFilepath)) {
    fs.removeSync(outputFilepath);
  }
  const stream = fs.createWriteStream(outputFilepath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  return new Promise<string>((resolve, reject) => {
    stream.on("close", () => resolve(outputFilepath));
    archive
      .directory(inputFolerPath, false)
      .on("error", (err) => reject(err))
      .pipe(stream);
    archive.finalize();
  });
}

export function unzipFile(zipFilePath: string, outputFolderPath: string) {
  fs.ensureDirSync(outputFolderPath);
  fs.emptyDirSync(outputFolderPath);
  return extract(zipFilePath, { dir: outputFolderPath });
}

export async function downloadToFile(url: string, outputFilePath: string) {
  const client = axios.create();
  console.log("downloading", url);
  const writer = fs.createWriteStream(outputFilePath);
  const { data, headers } = await client.get(url, {
    responseType: "stream",
  });
  const totalLength = headers["content-length"];
  let bytesReceived = 0;
  data.on("data", (chunk: Buffer) => {
    bytesReceived += chunk.length;
    const progress = Math.round((bytesReceived / totalLength) * 100);
    logUpdate(`${progress}%`);
  });
  data.pipe(writer);
  return new Promise<void>((resolve, reject) => {
    writer.on("finish", () => {
      logUpdate(`downloaded ${outputFilePath}`);
      resolve();
    });
    writer.on("error", reject);
  });
}

export function logProgramHelp(program: Command) {
  console.log(chalk.yellow("No command specified. See help below:\n"));
  program.outputHelp();
  console.log("\n");
  process.exit(0);
}
