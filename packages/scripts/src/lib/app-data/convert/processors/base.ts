import { TimeLike } from "fs-extra";
import logUpdate from "log-update";
import PQueue from "p-queue";
import { Logger } from "winston";
import { IContentsEntry, createChildFileLogger } from "../utils";
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
    this.logger = createChildFileLogger({ source: context.namespace });
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
      this.onQueueProgress(queueCounter, total);
    });
    // queue inputs
    this.addInputProcessesToQueue(inputs);
    await this.queue.onIdle();
    logUpdate.done();
    await this.beforePostProcess();
    return this.postProcess(this.outputs);
  }

  /** Optional hook run after queue completes and before postProcess */
  protected async beforePostProcess(): Promise<void> {}

  /** Optional post-processing of combined outputs */
  public postProcess(outputs: OutputType[]): any {
    return outputs;
  }

  /** Override method to specify how to process a particular input */
  public processInput(input: InputType): OutputType | Promise<OutputType> {
    console.log("No process input method defined");
    return input as any;
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

  /** Optional override to record per-input processing timings (used by FlowParserProcessor) */
  protected recordInputProcessingTimings(
    _input: InputType,
    _result: { value: any; source: "cache" | "processor" },
    _timings: Record<string, number>
  ): void {}

  /** Optional override called when a cached entry is used; return null to use default handling */
  protected onCachedEntryRetrieved(
    _input: InputType,
    _cachedEntry: any
  ): { value: any; source: "cache"; additionalOutputs?: any[] } | null {
    return null;
  }

  /** Optional override called after an input is processed and cached */
  protected onInputProcessed(
    _input: InputType,
    _output: any,
    _cacheEntryName: string,
    _source: "cache" | "processor"
  ): void {}

  /** Optional override called as queue items complete */
  protected onQueueProgress(_processed: number, _total: number): void {}

  private addInputProcessesToQueue(inputs: InputType[] = [], autoStart = true, priority = 1) {
    this.queue.pause();
    for (const input of inputs) {
      if (input) {
        this.queue.add(
          async () => {
            const result = await this.handleInputProcessing(input);
            if (result.value) {
              this.notifyInputProcessed(result.value, result.source as any);
              this.outputs.push(result.value);
              for (const extra of result.additionalOutputs || []) {
                this.notifyInputProcessed(extra, "cache");
                this.outputs.push(extra);
              }
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

  private async handleInputProcessing(input: InputType): Promise<{
    value: any;
    source: "cache" | "processor";
    additionalOutputs?: any[];
  }> {
    const totalStart = performance.now();
    const cacheEntryNameStart = performance.now();
    const cacheEntryName = this.generateCacheEntryName(input);
    const cacheEntryNameMs = performance.now() - cacheEntryNameStart;

    const cacheGetStart = performance.now();
    const cachedEntry = this.cache.get(cacheEntryName);
    const cacheGetMs = performance.now() - cacheGetStart;

    if (cachedEntry) {
      if (this.shouldUseCachedEntry(input, cachedEntry)) {
        this.logger.debug("cache retrieved: " + cacheEntryName);
        const custom = this.onCachedEntryRetrieved(input, cachedEntry);
        const result = custom ?? { value: cachedEntry, source: "cache" as const };
        this.recordInputProcessingTimings(input, result, {
          cacheEntryNameMs,
          cacheGetMs,
          processInputMs: 0,
          cacheAddMs: 0,
          totalMs: performance.now() - totalStart,
        });
        return result;
      } else {
        this.cache.remove(cacheEntryName);
      }
    }

    const processInputStart = performance.now();
    const output = await this.processInput(input);
    const processInputMs = performance.now() - processInputStart;

    const cacheAddStart = performance.now();
    const cacheStats = this.generateCacheEntryStats();
    this.cache.add(output, cacheEntryName, cacheStats);
    const cacheAddMs = performance.now() - cacheAddStart;

    const result = { value: output, source: "processor" as const };
    this.onInputProcessed(input, output, cacheEntryName, "processor");
    this.recordInputProcessingTimings(input, result, {
      cacheEntryNameMs,
      cacheGetMs,
      processInputMs,
      cacheAddMs,
      totalMs: performance.now() - totalStart,
    });
    return result;
  }
}

export default BaseProcessor;
