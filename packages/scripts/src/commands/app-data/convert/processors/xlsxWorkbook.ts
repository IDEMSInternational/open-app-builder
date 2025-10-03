import BaseProcessor from "./base";
import { readFile } from "fs-extra";
import { basename, extname } from "path";
import { xlsxToJson } from "../utils/xlsx.utils";
import { JsonFileCache } from "../cacheStrategy/jsonFile";

const cacheVersion = 20251001.0;
const namespace = "XLSXWorkbookProcessor";

/** Path to xlsx file for conversion  */
type InputType = { localPath: string; md5Checksum: string };

type OutputType = { [sheetName: string]: Record<string, any> };

/**
 * The XLSXWorkbookProcessor handles converting xlsx files to json sheet representation
 * It uses caching based on the md5 checksums of .xlsx file
 */
export class XLSXWorkbookProcessor extends BaseProcessor<InputType, OutputType> {
  constructor(context: { cache: JsonFileCache }) {
    super({ namespace, cache: context.cache });
    this.cache.configure(namespace, cacheVersion);
  }

  public override async processInput(input: InputType) {
    const { localPath } = input;
    const xlsxData = await readFile(localPath);
    return xlsxToJson(xlsxData);
  }

  public override generateCacheEntryName(input: InputType): string {
    const { localPath, md5Checksum } = input;
    const filename = basename(localPath);
    const extName = extname(localPath);
    return filename.replace(`${extName}`, `.${md5Checksum}.json`);
  }
}
