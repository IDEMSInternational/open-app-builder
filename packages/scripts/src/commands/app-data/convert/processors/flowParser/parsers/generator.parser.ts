import { FlowTypes } from "data-models";
import { DefaultParser } from "./default.parser";
import { TemplatedData } from "shared";

export class GeneratorParser extends DefaultParser<FlowTypes.GeneratorFlow> {
  /**
   * Method applied after all flow processing and processing methods to populate
   * generated flows to main list
   */
  public static populateProcessedFlows() {}

  public override postProcessFlow(flow: FlowTypes.GeneratorFlow): FlowTypes.GeneratorFlow {
    flow.parameter_list = this.validateParameterList(flow);

    const inputSources = this.loadInputSources();
    const dataListRows: FlowTypes.Data_listRow[] =
      inputSources[flow.parameter_list.input_data_list];
    // Try to defer processing if inputs are missing as they might be generated as part
    // of another flow
    if (!dataListRows) {
      const deferId = `${flow.flow_type}.${flow.flow_name}`;
      this.flowProcessor.deferInputProcess(flow, deferId);
      return;
    }
    try {
      const generated = this.generateFlows(flow, dataListRows);

      // Pass all generated flows to the back of the current processing queue so that they can be
      // populated to processed hashmap and referenced from other processes as required
      for (const generatedFlow of generated) {
        const deferId = `${generatedFlow.flow_type}.${generatedFlow.flow_subtype}.${generatedFlow.flow_name}`;
        this.flowProcessor.deferInputProcess(generatedFlow, deferId);
      }
    } catch (error) {
      console.trace(error);
      throw error;
    }
    // As the generator has been fully used it no longer needs to be stored, so just return undefined
    return undefined;
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
    dataListRows: FlowTypes.Data_listRow[]
  ) {
    const generated: FlowTypes.FlowTypeWithData[] = [];

    for (const listRow of dataListRows) {
      const parser = new TemplatedData({
        context: { gen: listRow },
      });
      const { output_flow_name, output_flow_type, output_flow_subtype } = parser.parse(
        // ensure original values used each parse
        JSON.parse(JSON.stringify(generator.parameter_list))
      ) as FlowTypes.GeneratorFlow["parameter_list"];
      const parsedRows = generator.rows.map((genRow) => {
        const parsed = parser.parse(JSON.parse(JSON.stringify(genRow)));
        return parsed;
      });
      // populate as generated flow
      const generatedFlow: FlowTypes.FlowTypeWithData = {
        flow_name: output_flow_name,
        flow_subtype: output_flow_subtype,
        flow_type: output_flow_type,
        rows: parsedRows,
      };
      generated.push(generatedFlow);
    }
    return generated;
  }

  private loadInputSources() {
    return this.flowProcessor?.processedFlowHashmap?.data_list || {};
  }
}
