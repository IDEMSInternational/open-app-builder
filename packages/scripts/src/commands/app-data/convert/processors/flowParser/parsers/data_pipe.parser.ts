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
      this.handleOutputs(outputs);
    } catch (error) {
      console.trace(error);
      throw error;
    }
    return this.flow;
  }

  private handleOutputs(outputs: { [output_name: string]: any[] }) {
    // store generated outputs to flow
    this.flow._processed = outputs;
    // also populate generated outputs to be available for future input sources
    if (!this.flowProcessor.processedFlowHashmap.data_list) {
      this.flowProcessor.processedFlowHashmap.data_list = {};
    }
    for (const [flow_name, rows] of Object.entries(outputs)) {
      this.flowProcessor.processedFlowHashmap.data_list[flow_name] = rows;
    }
  }

  private loadInputSources() {
    return this.flowProcessor?.processedFlowHashmap?.data_list || {};
  }
}
