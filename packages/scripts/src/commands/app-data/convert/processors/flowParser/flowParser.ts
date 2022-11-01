import { FlowTypes } from "data-models";
import * as Parsers from "./parsers";
import { IConverterPaths, IParsedWorkbookData } from "../../types";
import { arrayToHashmap, groupJsonByKey, IContentsEntry } from "../../utils";
import BaseProcessor from "../base";

export class FlowParserProcessor extends BaseProcessor<FlowTypes.FlowTypeWithData> {
  public cacheVersion = 20221026.1;

  public parsers: { [flowType in FlowTypes.FlowType]: Parsers.DefaultParser } = {
    template: new Parsers.TemplateParser(this),
    data_list: new Parsers.DataListParser(this),
    global: new Parsers.DefaultParser(this),
    tour: new Parsers.DefaultParser(this),
    data_pipe: new Parsers.DataPipeParser(this),
  };

  /** Keep a track of all processed flows by type and name (used in data_pipes)*/
  public processedFlowHashmap: {
    [flowType in FlowTypes.FlowType]?: { [flow_name: string]: FlowTypes.FlowTypeWithData["rows"] };
  } = {};

  constructor(paths: IConverterPaths) {
    super({ paths, namespace: "flowParser" });
  }

  public processInput(flow: FlowTypes.FlowTypeWithData) {
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
    const { flow_name, flow_type } = flow;
    if (!this.processedFlowHashmap[flow_type]) {
      this.processedFlowHashmap[flow_type] = {};
    }
    // Key should be unique as duplicates checked in main convert method
    this.processedFlowHashmap[flow_type][flow_name] = flow.rows;
  }

  /**
   * Apply combined parser postProcess methods
   * @returns hashmap of flowtypes with postprocessed flows
   */
  public async postProcess(flows: FlowTypes.FlowTypeWithData[]): Promise<IParsedWorkbookData> {
    const flowsByType: IParsedWorkbookData = groupJsonByKey(flows, "flow_type");
    for (const [flowType, parser] of Object.entries(this.parsers)) {
      if (flowsByType[flowType]) {
        flowsByType[flowType] = parser.postProcessFlows(flowsByType[flowType]);
      }
    }
    const flowTypesWithGenerated: IParsedWorkbookData =
      this.populateDataPipeGeneratedFlows(flowsByType);
    return flowTypesWithGenerated;
  }

  /**
   * Data Pipes can return multiple generated flows from a single pipeline
   * Extract these generated flows and populate as datalists
   */
  private populateDataPipeGeneratedFlows(flowsByType: IParsedWorkbookData) {
    if (flowsByType.data_pipe) {
      const dataPipeHashmap = {};
      const dataListHashmap = arrayToHashmap(flowsByType.data_list || [], "flow_name");
      for (const flow of flowsByType.data_pipe) {
        const { _processed, ...rest } = flow as FlowTypes.DataPipeFlow;
        if (_processed) {
          for (const [flow_name, rows] of Object.entries(_processed)) {
            const datalist: FlowTypes.Data_list = {
              flow_name,
              flow_subtype: "generated",
              flow_type: "data_list",
              rows,
            };
            if (dataListHashmap[flow_name]) {
              this.logger.error({
                message: "Generated datalist will override existing datalist",
                details: [flow_name],
              });
            }
            dataListHashmap[flow_name] = datalist;
          }
        }
        // Populate rest of data pipe (without _processed) to main flows list
        dataPipeHashmap[flow.flow_name] = rest;
      }
      flowsByType.data_pipe = Object.values(dataPipeHashmap);
      flowsByType.data_list = Object.values(dataListHashmap);
    }
    return flowsByType;
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
    return true;
  }
}
