import { TimeLike } from "fs-extra";
import logUpdate from "log-update";
import path from "path";
import PQueue from "p-queue";
import { Logger } from "winston";
import { IConverterPaths } from "../types";
import { IContentsEntry, createChildFileLogger } from "../utils";
import { JsonFileCache } from "../cacheStrategy/jsonFile";
import chalk from "chalk";

class BaseProcessor<T = any, V = any> {
  /** Used to invalidate cache */
  public cacheVersion = 20231001.0;

  public logger: Logger;

  public cache: JsonFileCache;

  public queue = new PQueue({ autoStart: false, concurrency: 1 });

  public outputs: V[] = [];

  public deferredCounter: { [id: string]: number } = {};

  /**
   * Create a base processor instance. Sets up logging and cache
   * @param context.namespace - Name used as prefix for cache and logging
   */
  constructor(public context: { namespace: string; paths: IConverterPaths }) {
    const { namespace } = context;
    this.logger = createChildFileLogger({ source: namespace });
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
    // add queue process update logs
    const total = inputs.length;
    this.queue.on("next", () => {
      const queueCounter = total - this.queue.size - this.queue.pending;
      const logCount = `${queueCounter}/${total} processed`;
      logUpdate(chalk.blue(`[ ${this.context.namespace} ] ${logCount}`));
    });
    // queue inputs
    this.addInputProcessesToQueue(inputs);
    await this.queue.onIdle();
    logUpdate.done();
    return this.postProcess(this.outputs);
  }

  /** Optional post-processing of combined outputs */
  public postProcess(outputs: V[]): any {
    return outputs;
  }

  /** Override method to specify how to process a particular input */
  public processInput(input: T): V | Promise<V> {
    console.log("No process input method defined");
    return input as any;
  }

  /** Callback made after input either retrieved from cache or processed */
  public notifyInputProcessed(input: T, source: "cache" | "processor") {
    // console.log("input processed", { input, source });
  }

  /**
   * Use as part of processInput to defer processing until all other queued processes are complete
   * @param deferId unique process ID used with `deferMax` to prevent infinite loops
   **/
  public deferInputProcess(input: T, deferId: string, deferMax = 5) {
    this.handleDeferredInputProcess(input, deferId, deferMax);
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

  private addInputProcessesToQueue(inputs: T[] = [], autoStart = true, priority = 1) {
    this.queue.pause();
    for (const input of inputs) {
      if (input) {
        this.queue.add(
          async () => {
            const { value, source } = await this.handleInputProcessing(input);
            if (value) {
              this.notifyInputProcessed(value, source as any);
              this.outputs.push(value);
            }
          },
          { priority }
        );
      }
    }
    if (autoStart) {
      this.queue.start();
    }
  }

  private handleDeferredInputProcess(input: T, deferId: string, deferMax = 5) {
    if (!this.deferredCounter.hasOwnProperty(deferId)) {
      this.deferredCounter[deferId] = 0;
    }
    if (this.deferredCounter[deferId] === deferMax) {
      this.logger.error({ message: "Max defer limit reached", details: input });
      return;
    }
    this.deferredCounter[deferId]++;
    const priority = -1 * this.deferredCounter[deferId];
    this.addInputProcessesToQueue([input], true, priority);
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
}

export default BaseProcessor;
