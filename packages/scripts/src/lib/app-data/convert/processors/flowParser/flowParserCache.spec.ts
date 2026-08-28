import { FlowTypes } from "data-models";
import { clearLogs } from "../../utils";
import { FlowParserProcessor } from "./flowParser";
import { MockJsonFileCache } from "../../cacheStrategy/jsonFile.mock";

const generatorFlow = (): FlowTypes.GeneratorFlow => ({
  flow_name: "test_generator",
  flow_type: "generator",
  parameter_list: {
    input_data_list: "test_data_list",
    output_flow_name: "generated_template_@gen.id",
    output_flow_subtype: "generated",
    output_flow_type: "template",
  },
  rows: [
    { name: "title", value: "Welcome to @gen.title" },
    { name: "text", value: "End" },
  ],
});

const dataListFlow = (): FlowTypes.Data_list => ({
  flow_name: "test_data_list",
  flow_type: "data_list",
  rows: [
    { id: 1, title: "Workshop 1" },
    { id: 2, title: "Workshop 2" },
  ],
});

const dataPipeFlow = (): FlowTypes.DataPipeFlow => ({
  flow_name: "test_pipe",
  flow_type: "data_pipe",
  rows: [
    {
      input_source: "test_data_list",
      operation: "filter",
      args_list: "id > 1" as any,
      output_target: "filtered_list",
    },
  ],
});

describe("FlowParser Processor - parent caching", () => {
  let processor: FlowParserProcessor;

  beforeEach(() => {
    processor = new FlowParserProcessor({ cache: new MockJsonFileCache() });
    processor.cache.configure("FlowParserProcessor", 20260622);
    processor.cache.clear();
    clearLogs();
  });

  it("Caches generator output with generated children and restores on second run", async () => {
    const inputs = [generatorFlow(), dataListFlow()];

    await processor.process(inputs);
    expect(processor.processedFlowHashmap.template?.generated_template_1).toBeTruthy();
    expect(processor.processedFlowHashmap.template?.generated_template_2).toBeTruthy();

    const cacheName = processor.generateCacheEntryName(generatorFlow());
    const cached = processor.cache.get(cacheName);
    expect(cached?._generated_children?.length).toEqual(2);

    const secondProcessor = new FlowParserProcessor({ cache: processor.cache });
    secondProcessor.cache.configure("FlowParserProcessor", 20260622);
    await secondProcessor.process(inputs);

    expect(secondProcessor.processedFlowHashmap.template?.generated_template_1).toBeTruthy();
    expect(secondProcessor.processedFlowHashmap.template?.generated_template_2).toBeTruthy();
    expect(secondProcessor.queue.size + secondProcessor.queue.pending).toEqual(0);
  });

  it("Reprocesses generator when input data list changes", async () => {
    const inputs = [generatorFlow(), dataListFlow()];
    await processor.process(inputs);

    const updatedList: FlowTypes.Data_list = {
      ...dataListFlow(),
      rows: [{ id: 1, title: "Changed title" }],
    };
    await processor.process([generatorFlow(), updatedList]);

    expect(processor.processedFlowHashmap.template?.generated_template_1?.[0]?.value).toEqual(
      "Welcome to Changed title"
    );
    expect(processor.processedFlowHashmap.template?.generated_template_2).toBeUndefined();
  });

  it("Caches data_pipe output with generated children and restores on second run", async () => {
    const inputs: FlowTypes.FlowTypeWithData[] = [dataPipeFlow(), dataListFlow()];

    await processor.process(inputs);
    expect(processor.processedFlowHashmap.data_list?.filtered_list).toEqual([
      { id: 2, title: "Workshop 2" },
    ]);

    const cacheName = processor.generateCacheEntryName(dataPipeFlow());
    const cached = processor.cache.get(cacheName);
    expect(cached?._generated_children?.length).toEqual(1);

    const secondProcessor = new FlowParserProcessor({ cache: processor.cache });
    secondProcessor.cache.configure("FlowParserProcessor", 20260622);
    await secondProcessor.process(inputs);

    expect(secondProcessor.processedFlowHashmap.data_list?.filtered_list).toEqual([
      { id: 2, title: "Workshop 2" },
    ]);
  });
});
