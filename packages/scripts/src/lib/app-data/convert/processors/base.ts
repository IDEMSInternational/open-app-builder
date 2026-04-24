import { TimeLike } from "fs-extra";
import logUpdate from "log-update";
import PQueue from "p-queue";
import { Logger } from "winston";
import { IContentsEntry, createChildLogger } from "../utils";
import { JsonFileCache } from "../cacheStrategy/jsonFile";
import chalk from "chalk";
import { MockJsonFileCache } from "../cacheStrategy/jsonFile.mock";

class BaseProcessor<InputType = any, OutputType = any> {
  public logger: Logger;

  public cache: JsonFileCache;

  public queue = new PQueue({ autoStart: false, concurrency: 1 });

  public outputs: OutputType[] = [];

  public deferredCounter: { [id: string]: number } = {};

  /**
   * Create a base processor instance. Sets up logging and cache
   * @param context.namespace - Name used as prefix for cache and logging
   */
  constructor(private context: { namespace: string; cache?: JsonFileCache }) {
    this.logger = createChildLogger({ source: context.namespace });
    this.cache = context.cache || new MockJsonFileCache();
  }

  /**
   * Handle a list of inputs. By default this will loop through the inputs, attempt to load
   * from cache and proceed to process individual as required
   */
  async process(inputs: InputType[] = []): Promise<OutputType[]> {
    // add queue process update logs
    const baseTotal = inputs.length;
    this.queue.on("next", () => {
      const total = baseTotal + Object.keys(this.deferredCounter).length;
      const queueCounter = total - this.queue.size - this.queue.pending;
      const logCount = `${queueCounter}/${total} processed`;
      logUpdate(chalk.blue(`[ ${this.context.namespace} ] ${logCount}`));
    });
    // queue inputs
    this.addInputProcessesToQueue(inputs);
    await this.queue.onIdle();
    logUpdate.done();
    const postProcessed = await this.postProcess(this.outputs);
    // ensure queued postProcess complete
    await this.queue.onIdle();
    return postProcessed;
  }

  /** Optional post-processing of combined outputs */
  public async postProcess(outputs: OutputType[]): Promise<any> {
    return outputs;
  }

  /**
   * Override method to specify how to process a particular input
   * Errors are tracked to determine whether response is cacheable or not
   **/
  public async processInput(
    input: InputType
  ): Promise<{ data: OutputType; errors?: { message: string; [key: string]: any }[] }> {
    return { data: null, errors: [{ message: "No process input method defined", input }] };
  }

  /** Callback made after input either retrieved from cache or processed */
  public notifyInputProcessed(input: InputType, source: "cache" | "processor") {
    // console.log("input processed", { input, source });
  }

  /**
   * Use as part of processInput to defer processing until all other queued processes are complete
   * @param deferId unique process ID used with `deferMax` to prevent infinite loops
   **/
  public deferInputProcess(input: InputType, deferId: string, deferMax = 5) {
    this.handleDeferredInputProcess(input, deferId, deferMax);
  }

  /**
   * Optional override handle how cache names are stored
   * By default will create an md5 hash of the data from the cacheHandler
   */
  public generateCacheEntryName(input: InputType): string {
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

  private addInputProcessesToQueue(inputs: InputType[] = [], autoStart = true, priority = 1) {
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

  private handleDeferredInputProcess(input: InputType, deferId: string, deferMax = 5) {
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

  private async handleInputProcessing(input: InputType) {
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
    // process without cache
    const { data, errors } = await this.processInput(input);

    // Log any errors. Cache if processed successfully
    if (errors) {
      for (const { message, ...details } of errors) {
        this.logger.error(message, details);
      }
    } else {
      if (data) {
        const cacheStats = this.generateCacheEntryStats();
        this.cache.add(data, cacheEntryName, cacheStats);
      }
    }

    return { value: data, source: "processor" };
  }
}

export default BaseProcessor;
