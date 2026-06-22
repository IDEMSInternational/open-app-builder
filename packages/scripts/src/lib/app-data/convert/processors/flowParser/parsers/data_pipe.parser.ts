import { FlowTypes } from "data-models";
import { DataPipe } from "shared/src/models/dataPipe";
import { DefaultParser } from "./default.parser";

export class DataPipeParser extends DefaultParser<FlowTypes.DataPipeFlow> {
  /** local hashmap of generated outputs. Used for tests  */
  private outputHashmap: { [flow_name: string]: { [output_name: string]: any } } = {};

  /** If extending the class add additional postprocess pipeline here */
  public postProcessFlow(flow: FlowTypes.DataPipeFlow): FlowTypes.DataPipeFlow {
    const tracker = this.phaseTracker;
    const track = <T>(phase: string, fn: () => T): T => (tracker ? tracker.time(phase, fn) : fn());

    const inputSources = track("data_pipe.loadInputSources", () => this.loadInputSources());
    const pipe = track("data_pipe.createPipe", () => new DataPipe(flow.rows, inputSources));
    const missingInputs = track("data_pipe.checkMissingInputs", () => pipe.checkMissingInputs());
    if (missingInputs) {
      const deferId = `${flow.flow_type}.${flow.flow_name}`;
      this.flowProcessor.deferInputProcess(flow, deferId);
      return;
    }
    try {
      const outputs = track("data_pipe.run", () => pipe.run());
      track("data_pipe.cloneOutputs", () => {
        this.outputHashmap[flow.flow_name] = JSON.parse(JSON.stringify(outputs));
      });

      const generated = track("data_pipe.generateFlows", () => this.generateFlows(outputs));

      track("data_pipe.deferGeneratedFlows", () => {
        for (const generatedFlow of generated) {
          const deferId = `${generatedFlow.flow_type}.${generatedFlow.flow_subtype}.${generatedFlow.flow_name}`;
          this.flowProcessor.deferInputProcess(generatedFlow, deferId);
        }
      });

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
        return { flow_name, flow_subtype: "generated", flow_type: "data_list", rows };
      }
    );
    return generatedFlows;
  }

  private loadInputSources() {
    return this.flowProcessor?.processedFlowHashmap?.data_list || {};
  }
}
