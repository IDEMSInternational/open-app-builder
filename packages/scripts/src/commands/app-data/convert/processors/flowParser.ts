import { FlowTypes } from "data-models";
import { throwTemplateParseError } from "../logging";
import * as Parsers from "../parsers";
import { IConverterPaths, IParsedWorkbookData } from "../types";
import { groupJsonByKey, IContentsEntry } from "../utils";
import BaseProcessor from "./base";

export class FlowParserProcessor extends BaseProcessor<FlowTypes.FlowTypeWithData> {
  public cacheVersion = 20220823.1;

  public parsers: { [flowType in FlowTypes.FlowType]?: Parsers.AbstractParser } = {
    template: new Parsers.TemplateParser(),
    data_list: new Parsers.DataListParser(),
    global: new Parsers.DefaultParser(),
    tour: new Parsers.DefaultParser(),
    // data_pipe: new Parsers.DataPipeParser(),
  };

  constructor(paths: IConverterPaths) {
    super({ paths, namespace: "flowParser" });
  }

  public async processInput(flow: FlowTypes.FlowTypeWithData) {
    const { flow_name, flow_type, _xlsxPath } = flow;
    const parser = this.parsers[flow_type];
    if (!parser) {
      const errMsg = `No parser available for flow_type: ${flow_type}\n${flow_name}\n${_xlsxPath}`;
      throw new Error(errMsg);
    }
    try {
      const parsed = parser.run(flow);
      return parsed;
    } catch (error) {
      // this.logger.error(error, flow);
      throwTemplateParseError(error, flow);
    }
    return null;
  }

  /**
   * Apply combined parser postProcess methods
   * @returns hashmap of flowtypes with postprocessed flows
   */
  public async postProcess(flows: FlowTypes.FlowTypeWithData[]): Promise<IParsedWorkbookData> {
    const flowsByType = groupJsonByKey(flows, "flow_type");
    const postProcessed: IParsedWorkbookData = {};
    Object.entries(flowsByType).forEach(([flow_type, contentFlows]) => {
      const parser: Parsers.AbstractParser = this.parsers[flow_type];
      postProcessed[flow_type] = parser.postProcessFlows(contentFlows);
    });
    return postProcessed;
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
