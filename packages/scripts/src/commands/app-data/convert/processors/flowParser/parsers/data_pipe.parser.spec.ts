import { FlowTypes } from "data-models";
import type { IDataPipeOperation } from "shared";
import { DataPipeParser } from "./data_pipe.parser";
import { FlowParserProcessor } from "../flowParser";
import { MockJsonFileCache } from "../../../cacheStrategy/jsonFile.mock";

const getTestData = () => ({
  data_list: { test_data_list: [{ id: 1 }, { id: 2 }, { id: 3 }] },
});

/** yarn workspace scripts test -t data_pipe.parser.spec.ts */
describe("data_pipe Parser", () => {
  let parser: DataPipeParser;
  beforeEach(() => {
    // HACK - setup parser with in-memory cache to avoid writing to disk
    parser = new DataPipeParser(new FlowParserProcessor(null as any));
    parser.flowProcessor.cache = new MockJsonFileCache();
    parser.flowProcessor.processedFlowHashmap = getTestData();
  });
  it("Populates generated data lists", async () => {
    const res = parser.run({
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

    // Ensure all flow processing completed, included deferred processing of generated
    await parser.flowProcessor.queue.onIdle();

    expect(parser.flowProcessor.processedFlowHashmap.data_list).toEqual({
      ...getTestData().data_list,
      test_output_1: [{ id: 2 }, { id: 3 }],
      test_output_2: [{ id: 3 }],
    });

    // Also check output references stored
    expect(res._output_flows).toEqual([
      {
        flow_type: "data_list",
        flow_subtype: "generated",
        flow_name: "test_output_1",
      },
      {
        flow_type: "data_list",
        flow_subtype: "generated",
        flow_name: "test_output_2",
      },
    ]);
  });

  it("Allows outputs from one pipe to be used in another", async () => {
    const ops1: IDataPipeOperation[] = [
      {
        input_source: "test_data_list",
        operation: "filter",
        args_list: "id > 1" as any, // will be parsed during process
        output_target: "test_output_1",
      },
    ];
    parser.run({ flow_name: "flow1", flow_type: "data_pipe", rows: ops1 });
    expect(parser["outputHashmap"].flow1).toEqual({ test_output_1: [{ id: 2 }, { id: 3 }] });

    // Ensure all flow processing completed, included deferred processing of generated
    await parser.flowProcessor.queue.onIdle();
    const ops2: IDataPipeOperation[] = [
      {
        input_source: "test_output_1",
        operation: "filter",
        args_list: "id > 2" as any, // will be parsed during process
        output_target: "test_output_2",
      },
    ];
    parser.run({
      flow_name: "flow2",
      flow_type: "data_pipe",
      rows: ops2,
    }) as FlowTypes.DataPipeFlow;
    expect(parser["outputHashmap"].flow2).toEqual({
      test_output_2: [{ id: 3 }],
    });
  });

  it("Defers processing when inputs not available max 5 times", async () => {
    parser.flowProcessor.processedFlowHashmap = {};

    parser.run({
      flow_name: "test_pipe_defer",
      flow_type: "data_pipe",
      rows: [{ input_source: "missing_list" }],
    });
    await parser.flowProcessor.queue.onIdle();
    expect(parser.flowProcessor.deferredCounter).toEqual({ "data_pipe.test_pipe_defer": 5 });
  });

  // QA - https://github.com/IDEMSInternational/parenting-app-ui/issues/2184
  // NOTE - test case more explicitly handled by jsEvaluator.spec
  it("Supports text with line break characters", async () => {
    parser.flowProcessor.processedFlowHashmap = {
      data_list: {
        test_data_list: [{ id: 1, text: "normal" }, { id: 2, text: "line\nbreak" }, { id: 3 }],
      },
    };

    const ops: IDataPipeOperation[] = [
      {
        input_source: "test_data_list",
        operation: "filter",
        args_list: "id < 3" as any, // will be parsed during process
        output_target: "test_output",
      },
    ];
    parser.run({
      flow_name: "test_line_breaks",
      flow_type: "data_pipe",
      rows: ops,
    });
    expect(parser["outputHashmap"].test_line_breaks).toEqual({
      test_output: [
        { id: 1, text: "normal" },
        { id: 2, text: "line\nbreak" },
      ],
    });
  });
});
