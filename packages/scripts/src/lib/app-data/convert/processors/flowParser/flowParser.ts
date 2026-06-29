import { FlowTypes } from "data-models";
import * as Parsers from "./parsers";
import { IFlowHashmapByType, IParsedWorkbookData } from "../../types";
import { arrayToHashmap, groupJsonByKey, IContentsEntry } from "../../utils";
import BaseProcessor from "../base";
import { JsonFileCache } from "../../cacheStrategy/jsonFile";
import { createHash } from "crypto";
import {
  FlowParserPerfLogger,
  getFlowMeta,
  IFlowParserRunTimings,
  IPhaseTimings,
  perfNow,
} from "./flowParserDebug";

const cacheVersion = 20251029.0;
const namespace = "FlowParserProcessor";

export class FlowParserProcessor extends BaseProcessor<FlowTypes.FlowTypeWithData> {
  public perfLogger = new FlowParserPerfLogger();
  private currentParserTimings: IFlowParserRunTimings | null = null;

  constructor(context: { cache: JsonFileCache }) {
    super({ namespace, cache: context.cache });
    this.cache.configure(namespace, cacheVersion);
  }

  public parsers: { [flowType in FlowTypes.FlowType]: Parsers.DefaultParser } = {
    data_list: new Parsers.DataListParser(this),
    data_pipe: new Parsers.DataPipeParser(this),
    generator: new Parsers.GeneratorParser(this),
    global: new Parsers.DefaultParser(this),
    template: new Parsers.TemplateParser(this),
    tour: new Parsers.DefaultParser(this),
    asset_pack: new Parsers.DefaultParser(this),
  };

  /** Keep a track of all processed flows by type and name (used in data_pipes)*/
  public processedFlowHashmap: {
    [flowType in FlowTypes.FlowType]?: { [flow_name: string]: any[] };
  } = {};

  /**
   * Additional hashmap with full flow data (not just rows), for use in tracking flow duplicates
   * (could use processedFlowHashmap but would require refactor to retain _source path as well as rows)
   */
  public processedFlowHashmapWithMeta: {
    [flowType in FlowTypes.FlowType]?: { [flow_name: string]: FlowTypes.FlowTypeWithData };
  } = {};

  public override async process(inputs: FlowTypes.FlowTypeWithData[] = []) {
    this.perfLogger.start(inputs.length);
    FlowParserPerfLogger.setCurrent(this.perfLogger);
    try {
      return await super.process(inputs);
    } finally {
      this.perfLogger.finish();
      FlowParserPerfLogger.setCurrent(null);
    }
  }

  protected override onQueueProgress(processed: number, total: number): void {
    this.perfLogger.updateQueueProgress(processed, total);
  }

  protected override recordInputProcessingTimings(
    input: FlowTypes.FlowTypeWithData,
    result: { value: any; source: "cache" | "processor" },
    timings: Record<string, number>
  ): void {
    const deferred = result.source === "processor" && !result.value;
    this.perfLogger.recordFlow({
      ...getFlowMeta(input),
      source: result.value ? result.source : "skipped",
      timings: {
        cacheEntryNameMs: timings.cacheEntryNameMs,
        cacheGetMs: timings.cacheGetMs,
        processInputMs: timings.processInputMs,
        cacheAddMs: timings.cacheAddMs,
        totalMs: timings.totalMs,
        deferred,
        parser: this.currentParserTimings ?? undefined,
      },
    });
    this.currentParserTimings = null;
  }

  public override processInput(flow: FlowTypes.FlowTypeWithData) {
    const { flow_name, flow_type, _source } = flow;
    const parser = this.parsers[flow_type];
    if (!parser) {
      const message = `No parser available for flow_type: ${flow_type}`;
      this.logger.error({ message, details: { ..._source, flow_name, flow_type } });
      return null;
    }
    try {
      const parsed = parser.run(flow);
      return parsed;
    } catch (error) {
      this.logger.error({
        message: "Template parse error",
        details: { error: error.message, flow },
      });
      return null;
    }
  }

  public setParserTimings(timings: IFlowParserRunTimings): void {
    this.currentParserTimings = timings;
  }

  public accumulateParserPhases(phases: IPhaseTimings): void {
    this.perfLogger.accumulatePhases(phases);
  }

  /**  When an input has been processed keep a reference in the hashmap */
  public notifyInputProcessed(
    input: FlowTypes.FlowTypeWithData,
    source: "cache" | "processor"
  ): void {
    this.updateProcessedFlowHashmap(input);
  }

  public updateProcessedFlowHashmap(flow: FlowTypes.FlowTypeWithData) {
    const { flow_name, flow_type } = flow;
    this.processedFlowHashmap[flow_type] ??= {};
    this.processedFlowHashmapWithMeta[flow_type] ??= {};
    // NOTE - duplicate flows are identified up during main converter
    this.processedFlowHashmap[flow_type][flow_name] = flow.rows;
    this.processedFlowHashmapWithMeta[flow_type][flow_name] = flow;
  }

  /**
   * Apply combined parser postProcess methods
   * @returns hashmap of flowtypes with postprocessed flows
   */
  public async postProcess(flows: FlowTypes.FlowTypeWithData[]) {
    const postProcessStart = perfNow();
    // post process flows by type
    const flowArraysByType = groupJsonByKey(flows, "flow_type");
    for (const [flowType, parser] of Object.entries(this.parsers)) {
      if (flowArraysByType[flowType]) {
        const typeStart = perfNow();
        flowArraysByType[flowType] = parser.postProcessFlows(flowArraysByType[flowType]);
        this.perfLogger.recordPostProcess({
          phase: "postProcess",
          flow_type: flowType,
          flow_count: flowArraysByType[flowType].length,
          duration_ms: perfNow() - typeStart,
        });
      }
    }
    const groupByTypeMs = perfNow() - postProcessStart;

    const hashmapStart = perfNow();
    // convert to hashmap for easier processing of generated flows
    const flowHashmapByType: IFlowHashmapByType = {};
    for (const [type, typeFlows] of Object.entries(flowArraysByType)) {
      flowHashmapByType[type] = arrayToHashmap(typeFlows, "flow_name", (k) => {
        this.logger.error("Duplicate flows found", [type, k]);
        return k;
      });
    }
    const hashmapMs = perfNow() - hashmapStart;

    const outputStart = perfNow();
    // convert back from hashmap to hashArrays for final output
    const outputData: IParsedWorkbookData = {};
    for (const [type, typeHashmap] of Object.entries(flowHashmapByType)) {
      outputData[type] = Object.values(typeHashmap);
    }
    const outputMs = perfNow() - outputStart;

    this.logger.info({
      message: "FlowParser postProcess phase timings",
      details: {
        groupByTypeMs,
        hashmapMs,
        outputMs,
        totalMs: perfNow() - postProcessStart,
      },
    });

    this.perfLogger.recordPostProcessComplete();

    return outputData;
  }

  public shouldUseCachedEntry(
    input: FlowTypes.FlowTypeWithData,
    cachedEntry: IContentsEntry
  ): Boolean {
    // Ignore cache if data_pipe (in case dependencies have changed)
    // TODO refine to bypass cache iff datalists not in cache
    if (input.flow_type === "data_pipe") {
      return false;
    }
    // TODO - optimise to use cache if generator and list unchanged
    if (input.flow_type === "generator") {
      return false;
    }
    return true;
  }

  public override generateCacheEntryName(input: FlowTypes.FlowTypeWithData): string {
    const { flow_name } = input;
    const hash = createHash("md5");
    hash.update(JSON.stringify(input));
    const checksum = hash.digest("hex");
    return `${flow_name}.${checksum}.json`;
  }
}
