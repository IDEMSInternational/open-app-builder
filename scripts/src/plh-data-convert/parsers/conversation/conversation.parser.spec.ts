import * as fs from "fs-extra";
import * as path from "path";

import { ConversationTranslator } from "./conversation.converter";
import { ConversationExcelSheet } from "./conversation.models";

const MOCK_JSON_PATH = path.join(__dirname, "../../mocks/rp-export1.json");

describe("ConversationTranslator", () => {
  let mockSheets1: ConversationExcelSheet[] = [
    {
      sheetName: "Test_Sheet_1",
      rows: [
        {
          Type: "Send_message",
          MessageText: "Hi my friend, it’s really good to see you.",
        },
      ],
    },
  ];

  it("should not crash when loading a conversation sheet", () => {
    let translator = new ConversationTranslator();
    expect(() => {
      translator.from(mockSheets1);
    }).not.toThrowError();
  });

  it("can create one flow object for one sheet", () => {
    let translator = new ConversationTranslator();
    let actualExportObject = translator.from(mockSheets1);
    expect(actualExportObject.flows.length).toEqual(1);
  });

  it("can create flow object with a single send message node", () => {
    let translator = new ConversationTranslator();
    let actualExportObject = translator.from(mockSheets1);
    let expectedExportObject = fs.readJsonSync(MOCK_JSON_PATH);
    expect(actualExportObject).toEqual(expectedExportObject);
  });
});
