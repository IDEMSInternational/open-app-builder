import { ConversationTranslator } from './conversation.translator';
import { ConversationExcelSheet } from "./plh-spreadsheet.model";
import * as fs from "fs";
import * as path from "path";

function loadJSONFile(filename: string): any {
    try {
        let filePath = path.join(__dirname, filename);
        let buffer = fs.readFileSync(filePath);
        return JSON.parse(buffer.toString());
    } catch (ex) {
        console.warn("Failed to load test data file ", filename);
        console.error(ex);
        return;
    }
}

describe("ConversationTranslator", () => {

    let mockSheets1: ConversationExcelSheet[] = [
        {
            sheetName: "Test_Sheet_1",
            rows: [
                {
                    Type: "Send_message",
                    MessageText: "Hi my friend, it’s really good to see you."
                }
            ]
        }
    ]

    it("should not crash when loading a conversation sheet", () => {
        let translator = new ConversationTranslator();
        expect(() => {
            translator.from(mockSheets1)
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
        let expectedExportObject = loadJSONFile("./test-json/rp-export1.json");
        expect(actualExportObject).toEqual(expectedExportObject);
    });

});