import * as fs from "fs-extra";
import * as path from "path";
import { FlowTypes } from "../../../../types";

import { ConversationParser } from "./conversation.parser";

/**
 * NOTE 2020-12-02 - Broken during refactor, requires fix (instead of sheet need to import as row data, minor edits to json required)
 */
const MOCK_JSON_PATH = path.join(__dirname, "../../mocks/rp-export1.json");

describe("ConversationTranslator", () => {
  let mockSheets1: FlowTypes.Conversation[] = [
    {
      flow_name: "test_sheet_1",
      flow_type: "conversation",
      status: "released",
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
      translator.convert(mockSheets1[0]);
    }).not.toThrowError();
  });

  it("can create one flow object for one sheet", () => {
    let translator = new ConversationParser();
    let actualExportObject = translator.convert(mockSheets1[0]);
    expect(actualExportObject.flows.length).toEqual(1);
  });

  it("can create flow object with a single send message node", () => {
    let translator = new ConversationParser();
    let actualExportObject = translator.convert(mockSheets1[0]);
    let expectedExportObject = fs.readJsonSync(MOCK_JSON_PATH);
    expect(actualExportObject).toEqual(expectedExportObject);
  });
});
