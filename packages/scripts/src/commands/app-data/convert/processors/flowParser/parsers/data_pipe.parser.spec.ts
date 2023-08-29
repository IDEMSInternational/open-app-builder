import { FlowTypes } from "data-models";
import type { IDataPipeOperation } from "shared";
import { DataPipeParser } from "./data_pipe.parser";

const testInputSources = {
  data_list: { test_data_list: [{ id: 1 }, { id: 2 }, { id: 3 }] },
};

describe("data_pipe Parser", () => {
  it("Populates generated data lists", async () => {
    const parser = new DataPipeParser({ processedFlowHashmap: testInputSources } as any);
    const output = parser.run({
      flow_name: "test_pipe_parse",
      flow_type: "data_pipe",
      rows: [
        {
          input_source: "test_data_list",
          operation: "filter",
          args_list: "id > 1" as any, // will be parsed during process
          output_target: "test_output_1",
        },
        {
          input_source: "test_output_1",
          operation: "filter",
          args_list: "id > 2" as any, // will be parsed during process
          output_target: "test_output_2",
        },
      ],
    }) as FlowTypes.DataPipeFlow;
    expect(output._generated.data_list).toEqual({
      test_output_1: {
        flow_name: "test_output_1",
        flow_subtype: "generated",
        flow_type: "data_list",
        rows: [{ id: 2 }, { id: 3 }],
      },
      test_output_2: {
        flow_name: "test_output_2",
        flow_subtype: "generated",
        flow_type: "data_list",
        rows: [{ id: 3 }],
      },
    });
  });

  it("Allows outputs from one pipe to be used in another", () => {
    const parser = new DataPipeParser({ processedFlowHashmap: testInputSources } as any);
    const ops1: IDataPipeOperation[] = [
      {
        input_source: "test_data_list",
        operation: "filter",
        args_list: "id > 1" as any, // will be parsed during process
        output_target: "test_output_1",
      },
    ];
    parser.run({ flow_name: "flow1", flow_type: "data_pipe", rows: ops1 });
    expect(parser.flowProcessor.processedFlowHashmap.data_list.test_output_1).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
    const ops2: IDataPipeOperation[] = [
      {
        input_source: "test_output_1",
        operation: "filter",
        args_list: "id > 2" as any, // will be parsed during process
        output_target: "test_output_2",
      },
    ];
    const output = parser.run({
      flow_name: "flow2",
      flow_type: "data_pipe",
      rows: ops2,
    }) as FlowTypes.DataPipeFlow;
    expect(output._generated.data_list).toEqual({
      test_output_2: {
        flow_name: "test_output_2",
        flow_subtype: "generated",
        flow_type: "data_list",
        rows: [{ id: 3 }],
      },
    });
  });

  it("Defers processing when inputs not available", async () => {
    let deferred = [];
    const parser = new DataPipeParser({
      processedFlowHashmap: {},
      deferInputProcess: (input: any, id: string) => {
        deferred.push(id);
      },
    } as any);
    parser.run({
      flow_name: "test_pipe_defer",
      flow_type: "data_pipe",
      rows: [{ input_source: "missing_list" }],
    });
    expect(deferred).toEqual(["data_pipe.test_pipe_defer"]);
  });
});
