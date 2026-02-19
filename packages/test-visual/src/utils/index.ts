import fs from "fs-extra";
import archiver from "archiver";
import extract from "extract-zip";
import chalk from "chalk";
import boxen from "boxen";
import logUpdate from "log-update";
import { Command } from "commander";
import { Stream } from "stream";

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
  const { body, headers } = await fetch(url);
  if (body) {
    const totalLength = parseInt(headers.get("content-length"), 10);
    let bytesReceived = 0;
    // create outstream to write to file
    const outStream = fs.createWriteStream(outputFilePath);
    // convert fetch stream to node readable stream
    // additionally log progress on write updates
    const stream = Stream.Readable.fromWeb(body as any);
    stream.on("data", (chunk) => {
      const progress = Math.round((bytesReceived / totalLength) * 100);
      bytesReceived += chunk.length;
      logUpdate(`${progress}%`);
    });
    // pipe income fetch stream to file write, and resolve promise when complete
    stream.pipe(outStream);
    return new Promise((resolve) => {
      stream.on("close", () => {
        logUpdate.done();
        resolve(true);
      });
    });
  }
  throw new Error(`Download Failed: ${url}`);
}

export function logProgramHelp(program: Command) {
  console.log(chalk.yellow("No command specified. See help below:\n"));
  program.outputHelp();
  console.log("\n");
  process.exit(0);
}

export function _wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
