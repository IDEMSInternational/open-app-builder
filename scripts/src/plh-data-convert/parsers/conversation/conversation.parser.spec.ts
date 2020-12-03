import * as fs from "fs-extra";
import * as path from "path";

import { ConversationParser } from "./conversation.parser";
import { ConversationExcelSheet } from "./conversation.models";

/**
 * NOTE 2020-12-02 - Broken during refactor, requires fix (instead of sheet need to import as row data, minor edits to json required)
 */
const MOCK_JSON_PATH = path.join(__dirname, "../../mocks/rp-export1.json");

describe("ConversationTranslator", () => {
  let mockSheets1: ConversationExcelSheet[] = [
    {
      sheet_name: "test_sheet_1",
      rows: [
        {
          type: "send_message",
          message_text: "Hi my friend, it’s really good to see you.",
        },
      ],
    },
  ];

  it("should not crash when loading a conversation sheet", () => {
    let translator = new ConversationParser();
    expect(() => {
      translator.convert(mockSheets1);
    }).not.toThrowError();
  });

  it("can create one flow object for one sheet", () => {
    let translator = new ConversationParser();
    let actualExportObject = translator.convert(mockSheets1);
    expect(actualExportObject.flows.length).toEqual(1);
  });

  it("can create flow object with a single send message node", () => {
    let translator = new ConversationParser();
    let actualExportObject = translator.convert(mockSheets1);
    let expectedExportObject = fs.readJsonSync(MOCK_JSON_PATH);
    expect(actualExportObject).toEqual(expectedExportObject);
  });
});
