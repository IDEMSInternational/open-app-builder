import { FlowTypes } from "data-models";
import { DataPipe } from "shared/src/models/dataPipe";
import { DefaultParser } from "./default.parser";

export class DataPipeParser extends DefaultParser<FlowTypes.DataPipeFlow> {
  /** If extending the class add additional postprocess pipeline here */

  public postProcessFlow(flow: FlowTypes.DataPipeFlow): FlowTypes.DataPipeFlow {
    const inputSources = this.loadInputSources();
    const pipe = new DataPipe(flow.rows, inputSources);
    const missingInputs = pipe.checkMissingInputs();
    // Try to defer processing if inputs are missing as they might be generated as part
    // of another flow
    if (missingInputs) {
      const deferId = `${flow.flow_type}.${flow.flow_name}`;
      this.flowProcessor.deferInputProcess(flow, deferId);
      return;
    }
    try {
      const outputs = pipe.run();
      this.populateGeneratedFlows(outputs);
    } catch (error) {
      console.trace(error);
      throw error;
    }
    return this.flow;
  }

  private populateGeneratedFlows(outputs: { [output_name: string]: any[] }) {
    const generated: FlowTypes.DataPipeFlow["_generated"] = { data_list: {} };
    this.flowProcessor.processedFlowHashmap.data_list ??= {};

    for (const [flow_name, rows] of Object.entries(outputs)) {
      generated.data_list[flow_name] = {
        flow_name,
        flow_subtype: "generated",
        flow_type: "data_list",
        rows,
      };
      // also populate generated outputs to be available for future input sources
      this.flowProcessor.processedFlowHashmap.data_list[flow_name] = rows;
    }
    this.flow._generated = generated;
  }

  private loadInputSources() {
    return this.flowProcessor?.processedFlowHashmap?.data_list || {};
  }
}
