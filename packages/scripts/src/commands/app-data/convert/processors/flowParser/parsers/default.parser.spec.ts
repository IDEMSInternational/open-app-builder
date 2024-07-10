import chalk from "chalk";
import { FlowTypes } from "data-models";
import { ActiveDeployment } from "../../../../../deployment/get";
import { FlowParserProcessor } from "../flowParser";
import { DefaultParser } from "./default.parser";
import { RowProcessor } from "./row.processor";

// class MockFlowParserProcessor extends FlowParserProcessor {
//   constructor() {
//     super({} as ActiveDeployment);
//   }
// }

describe("default Parser", () => {
 
});

describe("RowProcessor", () => {
  let flow: FlowTypes.FlowTypeWithData;
  let parser: DefaultParser;

  beforeEach(() => {
    parser = new DefaultParser(new FlowParserProcessor());
    const mockRow = {
      type: 'test', 
      field1: '  value with spaces  ', // leading and trailing whitespace
      field2: '\n\nvalue with line breaks\n\n', // whitespace and newline
      field3: '   \n\n   ', // whitespace and newline
      field4: '\n\r', // newline and carriage return
      field5: '\r', // carriage return
      field6: '\t', // tab
      field7: '\r\rvalue with carriage returns' // carriage returns
    };

  const rowProcessor = new RowProcessor(mockRow, this, undefined);

  rowProcesso
  });

  // it should define first check if the row is just whitespace
  it("should remove any whitespace within a row", () => {

  });
});
