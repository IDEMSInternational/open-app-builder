import path from "path";
import fs from "fs";

import { generateFolderFlatMap, IContentsEntry, readContentsFileAsHashmap } from "../../utils";

/** Contents file entries minimally contain modified time and converter version */
interface IContentsFileEntry extends Partial<IContentsEntry> {
  converterVersion?: number;
}

/**
 * DEPRECATED 2022-08-23
 * Common caching strategy used on per-processor level makes most of the code here
 * redundant. Retaining for short period in case useful
 * (recommend remove if not integrated by 2022-11-23)
 *
 * Processor designed to read and write a contents file, and compare values
 */
export class DeprecatedContentsFileProcessor<T extends IContentsFileEntry> {
  constructor(public converterVersion: number) {}

  public process(contentsPath: string) {
    const hashKey = "relativePath";
    const contentsHashmap = readContentsFileAsHashmap(contentsPath, { hashKey });
    const contentsHashmapWithXlsxPath: { [key: string]: T & { xlsxPath: string } } = {};
    Object.entries(contentsHashmap).forEach(([key, value]) => {
      // track the filename of the downloaded file (avoid duplicate .xlsx.xlsx depending if gsheet or xlsx original)
      const xlsxFilename = `${key.replaceAll(".xlsx", "")}.xlsx`;
      const xlsxPath = path.resolve(contentsPath, xlsxFilename);
      const valueWithXlsxPath = { ...value, xlsxPath };
      contentsHashmapWithXlsxPath[key] = valueWithXlsxPath as any;
    });
    return contentsHashmapWithXlsxPath;
  }

  public write(contentsFolder: string) {
    const contentsFilename = "_contents.json";
    const cacheHashmap = generateFolderFlatMap(
      contentsFolder,
      true,
      (p) => p !== contentsFilename
    ) as { [relativePath: string]: IContentsEntry };
    const contentsData = Object.values(cacheHashmap).map((entry) => {
      entry.relativePath = entry.relativePath.replace(".json", "");
      const contentsEntry: IContentsFileEntry = {
        ...entry,
        converterVersion: this.converterVersion,
        relativePath: entry.relativePath.replace(".json", ""),
      };

      return contentsEntry;
    });

    const contentsOutput = path.resolve(contentsFolder, contentsFilename);
    fs.writeFileSync(contentsOutput, JSON.stringify(contentsData, null, 2));
  }

  /** Compare source and target hashmaps (e.g. server and cache)  */
  public compare(source: { [key: string]: T }, target: { [key: string]: T }) {
    // Note - all update actions are same as create (requires new processing)
    const actions: { CREATE: T[]; DELETE: T[]; IGNORE: T[] } = {
      CREATE: [],
      DELETE: [],
      IGNORE: [],
    };
    // Compare source with target, Ignore same files and create on source if different to target
    Object.entries(source).forEach(([key, sourceFile]) => {
      const targetFile = target[key];
      const isSame = this.isFileSame(sourceFile, targetFile);
      if (isSame) {
        actions.IGNORE.push(sourceFile);
      } else {
        actions.CREATE.push(sourceFile);
      }
    });
    // Compare target with source, Delete from target if not exist in source
    Object.entries(target).forEach(([key, targetFile]) => {
      if (!source.hasOwnProperty(key)) {
        actions.DELETE.push(targetFile);
      }
    });
    return actions;
  }

  /**
   * Compare a current sheet json with previously converted.
   * Assumes conversion still valid if both have same modified timestamp and generated
   * using the same converter version
   */
  private isFileSame(sourceFile: T, targetFile?: T) {
    if (targetFile) {
      return (
        sourceFile.modifiedTime === targetFile.modifiedTime &&
        targetFile.converterVersion === this.converterVersion
      );
    }
    return false;
  }
}
