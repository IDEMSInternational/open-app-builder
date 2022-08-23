import { createHash } from "crypto";
import { TimeLike } from "fs";
import {
  emptyDirSync,
  existsSync,
  mkdirSync,
  readJSONSync,
  removeSync,
  utimesSync,
  writeJSONSync,
} from "fs-extra";
import path from "path";
import { generateFolderFlatMap, IContentsEntry } from "../utils";

interface IContentsEntryWithValue extends IContentsEntry {
  value?: any;
}

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

  private contents: { [name: string]: IContentsEntryWithValue };

  constructor(folderPath: string, version: number) {
    this.version = version;
    this.setup(folderPath);
  }

  /**
   * Add a data entry to the cache. By default will store
   * @param data
   * @param entryName
   */
  add(data: any, entryName?: string, stats?: { mtime: TimeLike }) {
    if (data) {
      if (!entryName) {
        entryName = this.generateCacheEntryName(data);
      }
      if (!this.contents[entryName]) {
        this.contents[entryName] = {} as any;
      }
      const filePath = this.writeCacheFile(entryName, data, stats);
      this.contents[entryName].value = data;
      return { filePath, entryName, data };
    }
  }

  /** Remove and item from the file cache */
  remove(entryName: string) {
    if (this.contents.hasOwnProperty(entryName)) {
      delete this.contents[entryName];
    }
    const target = path.resolve(this.folderPath, entryName);
    if (existsSync(target)) {
      removeSync(target);
    }
  }

  /**
   * Retrive a named entry from the cache
   * Will try to return value from in-memory cache with fallback to saved file
   */
  get<T = any>(entryName: string) {
    const entry = this.contents[entryName];
    if (entry) {
      let value = entry.value as T;
      if (!value) {
        const entryPath = path.resolve(this.folderPath, entry.relativePath);
        value = readJSONSync(entryPath);
      }
      return value;
    }
    return undefined;
  }
  /**
   * Return metadata info from the cached file, including md5 hash and modified timestamp
   */
  info(entryName: string) {
    return this.contents[entryName];
  }

  /**
   * Write cache contents to file
   * Provides incremental updates just to files which have had values set
   */
  public save() {
    // Write contents
    const { contentsPath, folderPath } = this;
    const contents = generateFolderFlatMap(folderPath, true, (p) => p !== "_contents.json");
    contents._version = this.version as any;
    this.contents = contents as any;
    writeJSONSync(contentsPath, contents);
  }

  private writeCacheFile(entryName: string, data: any, stats?: { mtime: TimeLike }) {
    const target = path.resolve(this.folderPath, entryName);
    writeJSONSync(target, data);
    if (stats) {
      utimesSync(target, stats.mtime, stats.mtime);
    }
    return target;
  }

  /** Create name for cache entries from stringified data md5 checksum */
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
