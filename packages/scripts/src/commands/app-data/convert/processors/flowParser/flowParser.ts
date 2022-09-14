import { FlowTypes } from "data-models";
import * as Parsers from "./parsers";
import { IConverterPaths, IParsedWorkbookData } from "../../types";
import { groupJsonByKey, IContentsEntry } from "../../utils";
import BaseProcessor from "../base";

export class FlowParserProcessor extends BaseProcessor<FlowTypes.FlowTypeWithData> {
  public cacheVersion = 20220831.1;

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
      flowsByType.data_list ?? {};
      for (const flow of flowsByType.data_pipe) {
        const dataPipeFlow = flow as FlowTypes.DataPipeFlow;
        if (dataPipeFlow._processed) {
          for (const [flow_name, rows] of Object.entries(dataPipeFlow._processed)) {
            const datalist: FlowTypes.Data_list = {
              flow_name,
              data_list_name: flow_name,
              flow_subtype: "generated",
              flow_type: "data_list",
              rows,
            };
            if (flowsByType.data_list[flow_name]) {
              this.logger.error({
                message: "Generated datalist will override existing datalist",
                details: [flow_name],
              });
            }
            flowsByType.data_list[flow_name] = datalist;
          }
        }
      }
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
