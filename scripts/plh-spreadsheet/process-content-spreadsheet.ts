import * as xlsx from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { ContentIndexRow, ConversationExcelRow, ConversationExcelSheet, ToolboxExcelRow, ToolboxExcelSheet } from './plh-spreadsheet.model';
import { ToolboxTranslator } from './toolbox.translator';
import { ConversationTranslator } from './conversation.translator';

export function main() {
    const inputFolderPath = path.join(__dirname, "./input");
    let outputFolderPaths = [path.join(__dirname, "./output")];
    if (process.argv[2] && process.argv[2].indexOf("save-assets") > -1) {
        outputFolderPaths.push(path.join(__dirname, "../../src/assets/sheet-content"));
    }
    const spreadsheetFileName = "plh_input1.xlsx";

    if (!fs.existsSync(inputFolderPath)) {
        fs.mkdirSync(inputFolderPath);
    }

    for (let outputFolderPath of outputFolderPaths) {
        if (!fs.existsSync(outputFolderPath)) {
            fs.mkdirSync(outputFolderPath);
        }
    }

    try {
        let workbook = xlsx.readFile(path.join(inputFolderPath, spreadsheetFileName));
        processWorkbook(workbook, outputFolderPaths);

    } catch (ex) {
        console.warn("No input spreadsheet found");
        console.warn(ex);
    }
}
main();

export function processWorkbook(workbook: xlsx.WorkBook, outputFolderPaths: string[]) {
    console.log("Sheet names", workbook.SheetNames);

    if (!workbook.Sheets["Content_List"]) {
        console.error("No content list sheet!");
        return;
    }
    const contentList: ContentIndexRow[] = xlsx.utils.sheet_to_json(workbook.Sheets["Content_List"]);
    
    console.log("Content list", contentList);

    const conversationSheets: ConversationExcelSheet[] = contentList
        .filter((contentListItem) => contentListItem.Content_Type === "Conversation")
        .filter((contentListItem) => workbook.Sheets[contentListItem.Sheet_Name])
        .map((contentListItem) => {
            const rows: ConversationExcelRow[] = xlsx.utils.sheet_to_json(workbook.Sheets[contentListItem.Sheet_Name]);
            return {
                sheetName: contentListItem.Sheet_Name,
                rows: rows
            };
        });
    console.log("Conversation Sheets: ", conversationSheets);

    const conversationTranslator = new ConversationTranslator();
    const rapidProExportObject = conversationTranslator.from(conversationSheets);
    const rapidProExportJSONString = JSON.stringify(rapidProExportObject, null, 4);
    for (let outputFolderPath of outputFolderPaths) {
        fs.writeFileSync(path.join(outputFolderPath, "flow-export.json"), rapidProExportJSONString, { flag: "w+" });
    }

    
    const toolboxSheets: ToolboxExcelSheet[] = contentList
        .filter((contentListItem) => contentListItem.Content_Type === "Toolbox")
        .filter((contentListItem) => workbook.Sheets[contentListItem.Sheet_Name])
        .map((contentListItem) => {
            const rows: ToolboxExcelRow[] = xlsx.utils.sheet_to_json(workbook.Sheets[contentListItem.Sheet_Name]);
            return {
                sheetName: contentListItem.Sheet_Name,
                rows: rows
            };
        });
    
    const toolboxTranslator = new ToolboxTranslator();
    const toolboxJSON = toolboxTranslator.from(toolboxSheets);
    const toolboxJSONString = JSON.stringify(toolboxJSON, null, 4);
    for (let outputFolderPath of outputFolderPaths) {
        fs.writeFileSync(path.join(outputFolderPath, "toolbox-export.json"), toolboxJSONString, { flag: "w+" });
    }
    
}
