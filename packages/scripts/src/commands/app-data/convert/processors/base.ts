import { Logger } from "pino";
import path from "path";
import { createChildLogger } from "../logging";
import { IConverterPaths } from "../types";
import { TimeLike } from "fs-extra";
import { IContentsEntry } from "../utils";
import { JsonFileCache } from "../cacheStrategy/jsonFile";

class BaseProcessor<T = any, V = any> {
  /** Used to invalidate cache */
  public cacheVersion = 20220823;

  public logger: Logger;

  public cache: JsonFileCache;

  /**
   * Create a base processor instance. Sets up logging and cache
   * @param context.namespace - Name used as prefix for cache and logging
   */
  constructor(public context: { namespace: string; paths: IConverterPaths }) {
    const { namespace } = context;
    this.logger = createChildLogger({ source: namespace });
    this.setupCache();
  }
  /**
   * Create a namespaced cache folder and populate a list of all files currently cached,
   * included relative path, md5 checksum and modified time
   */
  private setupCache() {
    const { paths, namespace } = this.context;
    const cacheFolder = path.resolve(paths.SHEETS_CACHE_FOLDER, namespace);
    this.cache = new JsonFileCache(cacheFolder, this.cacheVersion);
  }

  /**
   * Handle a list of inputs. By default this will loop through the inputs, attempt to load
   * from cache and proceed to process individual as required
   */
  async process(inputs: T[] = []): Promise<V[]> {
    const outputs: V[] = [];
    for (const input of inputs) {
      const { value, source } = await this.handleInputProcessing(input);
      outputs.push(value);
    }
    return this.postProcess(outputs);
  }

  /** Optional post-processing */
  postProcess(outputs: V[]): any {
    return outputs;
  }

  private async handleInputProcessing(input: T) {
    const cacheEntryName = this.generateCacheEntryName(input);
    const cachedEntry = this.cache.get(cacheEntryName);
    // handle with cache
    if (cachedEntry) {
      if (this.shouldUseCachedEntry(input, cachedEntry)) {
        this.logger.debug("cache retrieved: " + cacheEntryName);
        return { value: cachedEntry, source: "cache" };
      } else {
        this.cache.remove(cacheEntryName);
      }
    }
    // handle with processing
    const output = await this.processInput(input);
    // update cache
    const cacheStats = this.generateCacheEntryStats();
    this.cache.add(output, cacheEntryName, cacheStats);
    return { value: output, source: "processor" };
  }

  public async processInput(input: T): Promise<V> {
    return input as any;
  }

  /**
   * Optional override handle how cache names are stored
   * By default will create an md5 hash of the data from the cacheHandler
   */
  public generateCacheEntryName(input: T): string {
    return this.cache.generateCacheEntryName(input);
  }

  /** Optional override to set timestamp on cache items */
  public generateCacheEntryStats(): { mtime: TimeLike } | undefined {
    return undefined;
  }

  /** Optional override to specify if cached entry should be used */
  public shouldUseCachedEntry(input: any, cachedEntry: IContentsEntry): Boolean {
    return true;
  }
}

export default BaseProcessor;
