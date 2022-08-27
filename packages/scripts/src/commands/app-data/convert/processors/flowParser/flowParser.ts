import { FlowTypes } from "data-models";
import * as Parsers from "./parsers";
import { IConverterPaths, IParsedWorkbookData } from "../../types";
import { groupJsonByKey, IContentsEntry } from "../../utils";
import BaseProcessor from "../base";

export class FlowParserProcessor extends BaseProcessor<FlowTypes.FlowTypeWithData> {
  public cacheVersion = 20220823.1;

  public parsers: { [flowType in FlowTypes.FlowType]: Parsers.DefaultParser } = {
    template: new Parsers.TemplateParser(this),
    data_list: new Parsers.DataListParser(this),
    global: new Parsers.DefaultParser(this),
    tour: new Parsers.DefaultParser(this),
    data_pipe: new Parsers.DataPipeParser(this),
  };

  public processedFlows: IParsedWorkbookData = {};

  constructor(paths: IConverterPaths) {
    super({ paths, namespace: "flowParser" });
  }

  public async processInput(flow: FlowTypes.FlowTypeWithData) {
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
      this.logger.error({ message: "Template parse error", details: flow });
      return null;
    }
  }

  /**
   * Apply combined parser postProcess methods
   * @returns hashmap of flowtypes with postprocessed flows
   */
  public async postProcess(flows: FlowTypes.FlowTypeWithData[]): Promise<IParsedWorkbookData> {
    const flowsByType = groupJsonByKey(flows, "flow_type");
    return flowsByType;
  }

  /**
   * TODO - ignore cache if data_pipe
   * TODO - refine to bypass cache iff datalists no in cache
   */
  public shouldUseCachedEntry(
    input: FlowTypes.FlowTypeWithData,
    cachedEntry: IContentsEntry
  ): Boolean {
    return true;
  }
}
