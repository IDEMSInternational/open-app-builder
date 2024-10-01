import { FlowTypes } from "data-models";
import { DataPipe } from "shared/src/models/dataPipe";
import { DefaultParser } from "./default.parser";

export class DataPipeParser extends DefaultParser<FlowTypes.DataPipeFlow> {
  /** local hashmap of generated outputs. Used for tests  */
  private outputHashmap: { [flow_name: string]: { [output_name: string]: any } } = {};

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
      // HACK - populate to output hashmap for use in tests. Clone output due to deep nest issues
      this.outputHashmap[flow.flow_name] = JSON.parse(JSON.stringify(outputs));

      const generated = this.generateFlows(outputs);

      // Pass all generated flows to the back of the current processing queue so that they can be
      // populated to processed hashmap and referenced from other processes as required
      for (const generatedFlow of generated) {
        const deferId = `${generatedFlow.flow_type}.${generatedFlow.flow_subtype}.${generatedFlow.flow_name}`;
        this.flowProcessor.deferInputProcess(generatedFlow, deferId);
      }

      // Return the parsed flow along with a summary of output flows to store within outputs
      flow._output_flows = generated.map(({ rows, ...keptFields }) => keptFields);
      return flow;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  private generateFlows(outputs: { [output_name: string]: any[] }) {
    const generatedFlows: FlowTypes.Data_list[] = Object.entries(outputs).map(
      ([flow_name, rows]) => {
        return { flow_type: "data_list", flow_subtype: "generated", flow_name, rows };
      }
    );
    return generatedFlows;
  }

  private loadInputSources() {
    return this.flowProcessor?.processedFlowHashmap?.data_list || {};
  }
}
