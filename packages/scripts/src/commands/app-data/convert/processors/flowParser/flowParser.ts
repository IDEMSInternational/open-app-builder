import { FlowTypes } from "data-models";
import * as Parsers from "./parsers";
import { IConverterPaths, IFlowHashmapByType, IParsedWorkbookData } from "../../types";
import { arrayToHashmap, groupJsonByKey, IContentsEntry } from "../../utils";
import BaseProcessor from "../base";

const cacheVersion = 20241121.2;

export class FlowParserProcessor extends BaseProcessor<FlowTypes.FlowTypeWithData> {
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
   * (could use processedFlowHashmap but would require refactor to retain _xlsx path as well as rows)
   */
  public processedFlowHashmapWithMeta: {
    [flowType in FlowTypes.FlowType]?: { [flow_name: string]: FlowTypes.FlowTypeWithData };
  } = {};

  constructor(paths: IConverterPaths) {
    super({ paths, namespace: "flowParser", cacheVersion });
  }

  public override processInput(flow: FlowTypes.FlowTypeWithData) {
    const { flow_name, flow_type, _xlsxPath } = flow;
    const parser = this.parsers[flow_type];
    if (!parser) {
      const message = `No parser available for flow_type: ${flow_type}`;
      this.logger.error({ message, details: { _xlsxPath, flow_name, flow_type } });
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
    const { flow_name, flow_type, _xlsxPath } = flow;
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
}
