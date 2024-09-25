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
      // As the populated flows will be passed directly to the processor queue
      // can just return undefined so that the data pipe will not be stored in outputs
      return undefined;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  private populateGeneratedFlows(outputs: { [output_name: string]: any[] }) {
    this.flowProcessor.processedFlowHashmap.data_list ??= {};

    for (const [flow_name, rows] of Object.entries(outputs)) {
      const flow: FlowTypes.FlowTypeWithData = {
        flow_name,
        flow_subtype: "generated",
        flow_type: "data_list",
        rows,
      };
      const deferId = `${flow.flow_type}.${flow.flow_subtype}.${flow.flow_name}`;

      // Pass all generated flows to the back of the current processing queue so that they can be
      // populated to processed hashmap and referenced from other processes as required
      this.flowProcessor.deferInputProcess(flow, deferId);
    }
  }

  private loadInputSources() {
    return this.flowProcessor?.processedFlowHashmap?.data_list || {};
  }
}
