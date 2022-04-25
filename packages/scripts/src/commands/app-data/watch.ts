#!/usr/bin/env node
// import { Command } from "commander";
// import path from "path";
// import { watch } from "chokidar";
// import fs from "fs-extra";
// import { ROOT_DIR } from "../../paths";
// import chalk from "chalk";

// const program = new Command("watch");

// /***************************************************************************************
//  * The watch command watches for changes to the app-data folder and automatically
//  * copies assets to frontend folder
//  *
//  * NOTE - this should be handled directly by the angular.json folder, however it appears
//  * not to accurately detect changes after initial copy.
//  *
//  * It is expected that this can be deprecated when moving away from app-data folder
//  * to direct asset copy
//  *
//  * @example yarn scripts app-data watch
//  *************************************************************************************/
// interface IProgramOptions {}
// export default program.description("Watch app data").action(async (options: IProgramOptions) => {
//   // TODO - watch only configured for default workspace values
//   // Should decide if custom dirs required and generalise if needed
//   const appDataFolder = path.join(ROOT_DIR, "packages", "app-data");
//   const srcAssetsFolder = path.join(ROOT_DIR, "src", "assets", "app_data");

//   // clear srcAssets
//   fs.ensureDirSync(srcAssetsFolder);
//   fs.emptyDirSync(srcAssetsFolder);

//   const appDataSheetsFolder = path.join(appDataFolder, "sheets");
//   const srcAssetsSheetsFolder = path.join(srcAssetsFolder, "sheets");

//   watch("**/*.json", { cwd: appDataSheetsFolder, depth: 3 }).on("change", (filepath) => {
//     console.log(chalk.gray("[M]", filepath));
//     const appDataPath = path.resolve(appDataSheetsFolder, filepath);
//     const srcAssetsPath = path.resolve(srcAssetsSheetsFolder, filepath);
//     fs.ensureDirSync(path.dirname(srcAssetsPath));
//     fs.copyFileSync(appDataPath, srcAssetsPath);
//   });

//   const appDataAssetsFolder = path.join(appDataFolder, "sheets");
// });
