import { createHash } from "crypto";
import { TimeLike } from "fs";
import {
  emptyDirSync,
  ensureDirSync,
  existsSync,
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
  public add(data: any, entryName?: string, stats?: { mtime: TimeLike }) {
    if (data) {
      if (!entryName) {
        entryName = this.generateCacheEntryName(data);
      }
      if (!this.contents[entryName]) {
        this.contents[entryName] = {} as any;
      }
      const filePath = this.writeCacheFile(entryName, data, stats);
      this.contents[entryName].value = data;
      this.writeCacheContents();
      return { filePath, entryName, data };
    }
  }

  /** Clear all cache entries */
  public clear() {
    emptyDirSync(this.folderPath);
    this.contents = {};
    this.writeCacheContents();
  }

  /** Remove and item from the file cache */
  public remove(entryName: string) {
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
   * Returns undefined if no entry exists
   */
  public get<T = any>(entryName: string) {
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
  public info(entryName: string) {
    return this.contents[entryName];
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

  private writeCacheFile(entryName: string, data: any, stats?: { mtime: TimeLike }) {
    const target = path.resolve(this.folderPath, entryName);
    writeJSONSync(target, data);
    if (stats) {
      utimesSync(target, stats.mtime, stats.mtime);
    }
    return target;
  }
  private writeCacheContents() {
    const { contentsPath, folderPath } = this;
    const contents = generateFolderFlatMap(folderPath, { filterFn: (p) => p !== "_contents.json" });
    contents._version = this.version as any;
    this.contents = contents as any;
    writeJSONSync(contentsPath, contents);
  }

  private setup(folderPath: string) {
    ensureDirSync(folderPath);
    this.folderPath = folderPath;
    this.contentsPath = path.resolve(this.folderPath, "_contents.json");
    this.loadCache();
  }

  /**
   * Load contents list into cache
   * Invalidate and clear if cache contents version does not match current cache version
   */
  private loadCache() {
    this.contents = {};
    if (existsSync(this.contentsPath)) {
      const cacheContents = readJSONSync(this.contentsPath);
      const { _version } = cacheContents;
      if (_version === this.version) {
        this.contents = cacheContents;
        return this.contents;
      } else {
        this.clear();
      }
    }
    // repopulate cache if not loaded or cleared
    this.writeCacheContents();
  }
}
