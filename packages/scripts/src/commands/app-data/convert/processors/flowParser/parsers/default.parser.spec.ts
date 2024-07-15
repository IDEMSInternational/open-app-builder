import { FlowTypes } from "data-models";
import { DefaultParser } from "./default.parser";

const testFlowInputEmpty = ;

const testFlowInputNonEmpty = {
  flow_name: "test_flow_input_nonempty",
  flow_subtype: "generator",
  flow_type: "generated",
  rows: [
    {
      type: "text",
      name: "spaces",
      value: "this is a test string with spaces",
    },
    {
      type: "text",
      name: "tab_and_spaces",
      value: "\tthis is a test string with spaces and tabs\t",
    },
    {
      type: "text",
      name: "newline_not_empty"
      value: "Cats and dogs are the best pets\nTrue?",
    },
    {
      type: "text",
      name: "newline_return_not_empty",
      value: "Cats are cool\rDogs are great\nPersonally...\nI prefer hamsters\r",
    },
    {
      type: "text",
      name: "return_not_empty",
      value: "\this is a test string with spaces and tabs\t",
    },
  ]
};

const testInputSources = {
  data_list: { test_data_list: [{ id: 1 }, { id: 2 }, { id: 3 }] },
};


describe("default Parser", () => {
  it('should remove any spaces and tabs from the input string', () => {
    const parser = new DefaultParser({ processedFlowHashmap: testInputSources } as any);
    const output = parser.run({
      flow_name: "test_flow_input_empty",
      flow_subtype: "generator",
      flow_type: "generated",
      rows: [
        {
          type: "text",
          name: "empty",
          value: "",
        },
        {
          type: "text",
          name: "tab_empty",
          value: "\t\t",
        },
        {
          type: "text",
          name: "newline_empty",
          value: "\n\n",
        },
        {
          type: "text",
          name: "return_empty",
          value: "\r\r",
        },
        {
          type: "text",
          name: "newline_return_empty",
          value: "\r\n\n\r",
        },
      ],
    }) as FlowTypes.FlowTypeWithData; 
    // not possible to use the actual objects as the function used is not exported
    expect(output.rows).toEqual({
      
    }
    ); // this is the actual operation that will be tested
  });

  it('should remove any line breaks from the input string, if it is empty', () => {
    const input1 = 'this is a test string with line breaks\n\n';
    const expectedOutput1 = 'this is a test string with line breaks'; // this is the expected output

    const input2 = '\n\n\n';
    const expectedOutput2 = ''; // this is the expected output
  });
});

