import { FlowTypes } from "data-models";
import { GeneratorParser } from "./generator.parser";
import { FlowParserProcessor } from "../flowParser";
import { MockJsonFileCache } from "../../../cacheStrategy/jsonFile.mock";

const getTestData = () => ({
  test_data_list: [
    {
      id: 1,
      title: "Workshop 1",
      main_image: "img1",
      img_condition: "@fields.showImg1",
      subtype: "type_1",
    },
    { id: 2, title: "Workshop 2", main_image: "img2", img_condition: true, subtype: "type_2" },
  ],
});

const generatorInput = (): FlowTypes.GeneratorFlow => ({
  flow_name: "test_generator",
  flow_type: "generator",
  parameter_list: {
    input_data_list: "test_data_list",
    output_flow_name: "generated_template_@gen.id",
    output_flow_subtype: "generated_@gen.subtype",
    output_flow_type: "template",
  },
  rows: [
    {
      name: "title",
      value: "Welcome to @gen.title",
    },
    {
      name: "image",
      value: "@gen.main_image",
      condition: "@gen.img_condition",
    },
    {
      name: "text",
      value: "End of workshop",
    },
  ],
});

/** yarn workspace scripts test -t generator.parser.spec.ts */
describe("generator Parser", () => {
  let parser: GeneratorParser;
  beforeEach(() => {
    // HACK - setup parser with in-memory cache to avoid writing to disk
    parser = new GeneratorParser(new FlowParserProcessor(null as any));
    parser.flowProcessor.cache = new MockJsonFileCache();
    parser.flowProcessor.processedFlowHashmap = {
      data_list: getTestData(),
    };
  });

  it("Parses generator flow", async () => {
    parser.run(generatorInput());
    expect(parser["outputHashmap"].test_generator).toEqual([
      {
        flow_type: "template",
        flow_subtype: "generated_type_1",
        flow_name: "generated_template_1",
        rows: [
          {
            name: "title",
            value: "Welcome to Workshop 1",
          },
          {
            name: "image",
            value: "img1",
            condition: "@fields.showImg1",
          },
          {
            name: "text",
            value: "End of workshop",
          },
        ],
      },
      {
        flow_type: "template",
        flow_subtype: "generated_type_2",
        flow_name: "generated_template_2",
        rows: [
          {
            name: "title",
            value: "Welcome to Workshop 2",
          },
          {
            name: "image",
            value: "img2",
            condition: "true",
          },
          {
            name: "text",
            value: "End of workshop",
          },
        ],
      },
    ]);
  });
  it("populates list of outputs", async () => {
    const res = parser.run(generatorInput()) as FlowTypes.GeneratorFlow;
    expect(res._output_flows).toEqual([
      {
        flow_type: "template",
        flow_subtype: "generated_type_1",
        flow_name: "generated_template_1",
      },
      {
        flow_type: "template",
        flow_subtype: "generated_type_2",
        flow_name: "generated_template_2",
      },
    ]);
  });
  it("parses generated flows using type parser", async () => {
    parser.run(generatorInput());
    await parser.flowProcessor.queue.onIdle();
    expect(parser.flowProcessor.processedFlowHashmap.template).toEqual({
      generated_template_1: [
        {
          name: "title",
          value: "Welcome to Workshop 1",
          type: "set_variable",
          _nested_name: "title",
        },
        {
          name: "image",
          value: "img1",
          condition: "@fields.showImg1",
          type: "set_variable",
          _nested_name: "image",
          _dynamicFields: {
            condition: [
              {
                fieldName: "showImg1",
                fullExpression: "@fields.showImg1",
                matchedExpression: "@fields.showImg1",
                type: "fields",
              },
            ],
          },
          _dynamicDependencies: { "@fields.showImg1": ["condition"] },
        },
        {
          name: "text",
          value: "End of workshop",
          type: "set_variable",
          _nested_name: "text",
        },
      ],
      generated_template_2: [
        {
          name: "title",
          value: "Welcome to Workshop 2",
          type: "set_variable",
          _nested_name: "title",
        },
        {
          name: "image",
          value: "img2",
          condition: "true",
          type: "set_variable",
          _nested_name: "image",
        },
        {
          name: "text",
          value: "End of workshop",
          type: "set_variable",
          _nested_name: "text",
        },
      ],
    });
  });
});
