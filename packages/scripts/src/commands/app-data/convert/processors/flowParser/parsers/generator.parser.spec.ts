import { FlowTypes } from "data-models";
import { GeneratorParser } from "./generator.parser";

const dataListInputs = {
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
};

const generatorInput: FlowTypes.GeneratorFlow = {
  flow_name: "test_pipe_parse",
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
};

describe("generator Parser", () => {
  it("Parses generator flow", async () => {
    const parser = new GeneratorParser({
      processedFlowHashmap: { data_list: dataListInputs },
    } as any);
    const output = parser.run(generatorInput);
    expect(output._generated).toEqual({
      template: {
        generated_template_1: {
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
        generated_template_2: {
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
      },
    });
  });
});
