import { createHash } from "crypto";
import { emptyDirSync, existsSync, mkdirSync, readJSONSync, writeJSONSync } from "fs-extra";
import path from "path";
import { generateFolderFlatMap, IContentsEntry } from "../utils";

/**
 * The cache processor creates a file cache that can store json outputs from
 * previous processes
 *
 * A main contents list keeps track of all cached inputs and their corresponding outputs,
 * named via an md5 hash of the input contents (with optional override)
 *
 * A versioning system handles clearing cache as required
 */
export class JsonFileCache {
  public folderPath: string;
  public contentsPath: string;
  public version: number;

  private contents: { [name: string]: IContentsEntry };

  constructor(folderPath: string, version: number) {
    this.version = version;
    this.setup(folderPath);
  }

  add(data: any, entryName?: string) {
    if (!entryName) {
      entryName = this.generateCacheEntryName(data);
    }
    this.contents[entryName] = data;
  }
  get<T = any>(entryName: string) {
    const entry = this.contents[entryName];
    const entryPath = path.resolve(this.folderPath, entry.relativePath);
    return readJSONSync(entryPath) as T;
  }
  info(entryName: string) {
    return this.contents[entryName];
  }

  /**
   * Write cache contents to file
   * TODO - provide incremental write instead of clearing everything
   */
  public save() {
    // Write files
    emptyDirSync(this.folderPath);
    for (const [name, value] of Object.entries<any>(this.contents)) {
      if (value && typeof value === "object") {
        const outputPath = path.resolve(this.folderPath, name);
        writeJSONSync(outputPath, value);
      }
    }
    // Write contents
    const { contentsPath, folderPath } = this;
    const contents = generateFolderFlatMap(folderPath, true, (p) => p !== "_contents.json");
    contents._version = this.version as any;
    this.contents = contents as any;
    writeJSONSync(contentsPath, contents);
  }

  /**  */
  public generateCacheEntryName(data: any) {
    if (data) {
      if (typeof data === "object") {
        data = JSON.stringify(data);
      } else {
        data = `${data}`;
      }
      const hash = createHash("md5");
      hash.update(data);
      const checksum = hash.digest("hex");
      return checksum;
    } else {
      throw new Error(`Invalid cache entry name: ${data}`);
    }
  }

  private setup(folderPath: string) {
    this.folderPath = folderPath;
    this.contentsPath = path.resolve(folderPath, "_contents.json");
    this.contentsPath = path.resolve(this.folderPath, "_contents.json");
    if (!existsSync(this.folderPath)) {
      mkdirSync(this.folderPath);
    }
    this.load();
  }

  /**
   * Load contents list into cache
   * Invalidate and clear if cache contents version does not match current cache version
   */
  private load() {
    this.contents = {};
    if (existsSync(this.contentsPath)) {
      const cacheContents = readJSONSync(this.contentsPath);
      const { _version, ...entries } = cacheContents;
      if (_version === this.version) {
        this.contents = cacheContents;
      } else {
        emptyDirSync(this.folderPath);
      }
    }
  }
}
