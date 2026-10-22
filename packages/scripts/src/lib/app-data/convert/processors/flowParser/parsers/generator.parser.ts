import { FlowTypes } from "data-models";
import { DefaultParser } from "./default.parser";
import { TemplatedData } from "shared";
import { FlowParserPhaseTracker } from "../flowParserDebug";

export class GeneratorParser extends DefaultParser<FlowTypes.GeneratorFlow> {
  /** local hashmap of generated outputs. Used for tests  */
  private outputHashmap: { [flow_name: string]: { [output_name: string]: any } } = {};

  public override postProcessFlow(flow: FlowTypes.GeneratorFlow): FlowTypes.GeneratorFlow {
    const tracker = this.phaseTracker;
    const track = <T>(phase: string, fn: () => T): T => (tracker ? tracker.time(phase, fn) : fn());

    flow.parameter_list = track("generator.validateParameterList", () =>
      this.validateParameterList(flow)
    );

    const inputSources = track("generator.loadInputSources", () => this.loadInputSources());
    const dataListRows: FlowTypes.Data_listRow[] =
      inputSources[flow.parameter_list.input_data_list];
    if (!dataListRows) {
      const deferId = `${flow.flow_type}.${flow.flow_name}`;
      this.flowProcessor.deferInputProcess(flow, deferId);
      return;
    }
    try {
      const generated = track("generator.generateFlows", () =>
        this.generateFlows(flow, dataListRows, tracker)
      );
      track("generator.cloneOutputs", () => {
        this.outputHashmap[flow.flow_name] = JSON.parse(JSON.stringify(generated));
      });

      track("generator.deferGeneratedFlows", () => {
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

  private validateParameterList(
    flow: FlowTypes.GeneratorFlow
  ): FlowTypes.GeneratorFlow["parameter_list"] {
    const { flow_name, parameter_list } = flow;
    if (!parameter_list) {
      throw new Error("No parameter list provided to generator");
    }
    let { input_data_list, output_flow_name, output_flow_type, output_flow_subtype } =
      parameter_list;
    if (!input_data_list) {
      throw new Error('"input_data_list" required for generator');
    }
    if (!output_flow_type) {
      output_flow_type = "template";
    }
    if (!output_flow_subtype) {
      output_flow_subtype = "generated";
    }
    if (!output_flow_name) {
      output_flow_name = `${flow_name}_{{@gen.id}}`;
    }
    return { input_data_list, output_flow_name, output_flow_type, output_flow_subtype };
  }

  /** Iterate over provided data list rows and use to create a new generated flow from generator base flow  */
  private generateFlows(
    generator: FlowTypes.GeneratorFlow,
    dataListRows: FlowTypes.Data_listRow[],
    tracker: FlowParserPhaseTracker
  ) {
    const generated: FlowTypes.FlowTypeWithData[] = [];

    for (const listRow of dataListRows) {
      const perRow = () => {
        const parser = new TemplatedData({
          context: { gen: listRow },
        });
        const { output_flow_name, output_flow_type, output_flow_subtype } = parser.parse(
          JSON.parse(JSON.stringify(generator.parameter_list))
        ) as FlowTypes.GeneratorFlow["parameter_list"];
        const parsedRows = generator.rows.map((genRow) => {
          const parsed = parser.parse(JSON.parse(JSON.stringify(genRow)));
          return parsed;
        });
        generated.push({
          flow_name: output_flow_name,
          flow_subtype: output_flow_subtype,
          flow_type: output_flow_type,
          rows: parsedRows,
        });
      };
      if (tracker) {
        tracker.time("generator.generateFlows.perRow", perRow);
      } else {
        perRow();
      }
    }
    return generated;
  }

  private loadInputSources() {
    return this.flowProcessor?.processedFlowHashmap?.data_list || {};
  }
}
