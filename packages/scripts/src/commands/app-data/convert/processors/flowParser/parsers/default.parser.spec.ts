import chalk from "chalk";
import { FlowTypes } from "data-models";
import { ActiveDeployment } from "../../../../../deployment/get";
import { FlowParserProcessor } from "../flowParser";
import { DefaultParser } from "./default.parser";

// NEXT STEPS to consider: make a mock of the rows of data that will be passed to the parser
// and then somehow find a way to perform, not only a run, but a test on the output for each result
// basically, would be quite long but knowing how to do so, it should be way more reassuring

// Flow {
//   flow_name: 'example_pipe_sort_desc',
//   flow_subtype: 'generated',
//   flow_type: 'data_list',
//   rows: [
//     {
//       id: 'id_2',
//       value: 2,
//       sort_order: 11,
//       sort_alpha: 'basis',
//       completed: false
//     },
//     {
//       id: 'id_1',
//       value: 1,
//       sort_order: 7,
//       sort_alpha: 'bonus',
//       completed: true
//     },
//     { id: 'id_3', value: 3, sort_order: 6, sort_alpha: 'topic' },
//     { id: 'id_4', value: 4, sort_order: 5, sort_alpha: 'world' },
//     {
//       id: 'id_5',
//       value: 5,
//       sort_order: 4,
//       sort_alpha: 'event',
//       completed: true
//     },
//     {
//       id: 'id_8',
//       value: 8,
//       sort_order: 3,
//       sort_alpha: 'skill',
//       completed: false
//     },
//     {
//       id: 'id_7',
//       value: 7,
//       sort_order: 2,
//       sort_alpha: 'guest',
//       completed: false
//     },
//     {
//       id: 'id_6',
//       value: 6,
//       sort_order: 1,
//       sort_alpha: 'photo',
//       completed: true
//     }
//   ]
// }
const testFlowInput: FlowTypes.FlowTypeWithData = {
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
};

const testFlowInputNonEmpty: FlowTypes.FlowTypeWithData = {
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


describe("default Parser", () => {
  it('should remove any spaces and tabs from the input string', () => {
    const expectedOutput = 'thisisateststringwithspacesandtabs'; // this is the expected output

    // not possible to use the actual objects as the function used is not exported
    expect(input.trim()).toBe(expectedOutput); // this is the actual operation that will be tested
  });

  it('should remove any line breaks from the input string, if it is empty', () => {
    const input1 = 'this is a test string with line breaks\n\n';
    const expectedOutput1 = 'this is a test string with line breaks'; // this is the expected output

    const input2 = '\n\n\n';
    const expectedOutput2 = ''; // this is the expected output
  });
});

