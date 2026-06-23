import { FlowTypes } from "data-models";
import * as Parsers from "./parsers";
import { IFlowHashmapByType, IParsedWorkbookData } from "../../types";
import { arrayToHashmap, groupJsonByKey } from "../../utils";
import BaseProcessor from "../base";
import { JsonFileCache } from "../../cacheStrategy/jsonFile";
import { createHash } from "crypto";
import {
  getCacheKeyPayload,
  getDependencyChecksumForFlow,
  ICachedParentFlow,
  stripGeneratedChildrenFromParent,
} from "./flowParserCache";

const cacheVersion = 20260622.0;
const namespace = "FlowParserProcessor";

export class FlowParserProcessor extends BaseProcessor<FlowTypes.FlowTypeWithData> {
  private parentsNeedingCacheFinalize: Array<{
    cacheEntryName: string;
    parent: FlowTypes.FlowTypeWithData;
  }> = [];

  constructor(context: { cache: JsonFileCache }) {
    super({ namespace, cache: context.cache });
    this.cache.configure(namespace, cacheVersion);
  }

  public override async process(inputs: FlowTypes.FlowTypeWithData[] = []) {
    this.processedFlowHashmap = {};
    this.processedFlowHashmapWithMeta = {};
    this.parentsNeedingCacheFinalize = [];
    this.outputs = [];
    this.deferredCounter = {};
    const clonedInputs = inputs.map((input) => JSON.parse(JSON.stringify(input)));
    return super.process(clonedInputs);
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
    // Clone rows so later postProcess mutations do not change dependency checksums
    this.processedFlowHashmap[flow_type][flow_name] = JSON.parse(JSON.stringify(flow.rows));
    this.processedFlowHashmapWithMeta[flow_type][flow_name] = flow;
  }

  /**
   * Apply combined parser postProcess methods
   * @returns hashmap of flowtypes with postprocessed flows
   */
  public async postProcess(flows: FlowTypes.FlowTypeWithData[]) {
    // post process flows by type
    const flowArraysByType = groupJsonByKey(flows, "flow_type");
    for (const [flowType, parser] of Object.entries(this.parsers)) {
      if (flowArraysByType[flowType]) {
        flowArraysByType[flowType] = parser.postProcessFlows(flowArraysByType[flowType]);
      }
    }
    // convert to hashmap for easier processing of generated flows
    const flowHashmapByType: IFlowHashmapByType = {};
    for (const [type, typeFlows] of Object.entries(flowArraysByType)) {
      flowHashmapByType[type] = arrayToHashmap(typeFlows, "flow_name", (k) => {
        this.logger.error("Duplicate flows found", [type, k]);
        return k;
      });
    }

    // convert back from hashmap to hashArrays for final output
    const outputData: IParsedWorkbookData = {};
    for (const [type, typeHashmap] of Object.entries(flowHashmapByType)) {
      outputData[type] = Object.values(typeHashmap);
    }
    return outputData;
  }

  protected override async beforePostProcess(): Promise<void> {
    this.finalizeParentCaches();
    this.cache.flush();
  }

  protected override onCachedEntryRetrieved(
    input: FlowTypes.FlowTypeWithData,
    cachedEntry: ICachedParentFlow
  ) {
    if (!this.isParentFlowType(input.flow_type)) {
      return null;
    }
    const generatedChildren = cachedEntry._generated_children;
    if (!generatedChildren?.length) {
      return null;
    }

    const parent = stripGeneratedChildrenFromParent(cachedEntry);
    const additionalOutputs: FlowTypes.FlowTypeWithData[] = [];
    for (const child of generatedChildren) {
      this.updateProcessedFlowHashmap(child);
      additionalOutputs.push(child);
    }
    this.updateProcessedFlowHashmap(parent);

    return {
      value: parent,
      source: "cache" as const,
      additionalOutputs,
    };
  }

  protected override onInputProcessed(
    input: FlowTypes.FlowTypeWithData,
    output: FlowTypes.FlowTypeWithData,
    cacheEntryName: string,
    source: "cache" | "processor"
  ): void {
    const parentOutput = output as ICachedParentFlow;
    if (
      source === "processor" &&
      this.isParentFlowType(input.flow_type) &&
      parentOutput?._output_flows?.length
    ) {
      this.parentsNeedingCacheFinalize.push({ cacheEntryName, parent: output });
    }
  }

  private isParentFlowType(flowType: FlowTypes.FlowType) {
    return flowType === "generator" || flowType === "data_pipe";
  }

  private finalizeParentCaches() {
    for (const { cacheEntryName, parent } of this.parentsNeedingCacheFinalize) {
      const parentMeta = parent as ICachedParentFlow;
      const generatedChildren = (parentMeta._output_flows || [])
        .map((meta) => this.processedFlowHashmapWithMeta[meta.flow_type]?.[meta.flow_name])
        .filter((flow): flow is FlowTypes.FlowTypeWithData => Boolean(flow));

      if (generatedChildren.length !== parentMeta._output_flows?.length) {
        this.logger.warn({
          message: "Could not finalize parent cache - missing generated children",
          details: {
            flow_name: parent.flow_name,
            flow_type: parent.flow_type,
            expected: parentMeta._output_flows?.length,
            found: generatedChildren.length,
          },
        });
        continue;
      }

      this.cache.add({ ...parent, _generated_children: generatedChildren }, cacheEntryName);
    }
    this.parentsNeedingCacheFinalize = [];
  }

  public shouldUseCachedEntry(input: FlowTypes.FlowTypeWithData, cachedEntry: any): Boolean {
    if (this.isParentFlowType(input.flow_type)) {
      return Boolean((cachedEntry as ICachedParentFlow)?._generated_children?.length);
    }
    return true;
  }

  public override generateCacheEntryName(input: FlowTypes.FlowTypeWithData): string {
    const { flow_name } = input;
    const hash = createHash("md5");
    hash.update(JSON.stringify(getCacheKeyPayload(input)));
    if (this.isParentFlowType(input.flow_type)) {
      hash.update(getDependencyChecksumForFlow(this, input));
    }
    const checksum = hash.digest("hex");
    return `${flow_name}.${checksum}.json`;
  }
}
