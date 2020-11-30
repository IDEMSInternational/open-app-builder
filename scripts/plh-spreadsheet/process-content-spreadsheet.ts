import * as xlsx from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { ContentIndexRow, ConversationExcelRow, ConversationExcelSheet, ToolboxExcelRow, ToolboxExcelSheet } from './plh-spreadsheet.model';
import { ToolboxTranslator } from './toolbox.translator';
import { ConversationTranslator } from './conversation.translator';
import { glob } from 'glob';

export function main() {
    const inputFolderPath = path.join(__dirname, "./input");
    let outputFolderPaths = [path.join(__dirname, "./output")];
    if (process.argv[2] && process.argv[2].indexOf("save-assets") > -1) {
        outputFolderPaths.push(path.join(__dirname, "../../src/assets/sheet-content"));
    }

    if (!fs.existsSync(inputFolderPath)) {
        fs.mkdirSync(inputFolderPath);
    }

    for (let outputFolderPath of outputFolderPaths) {
        if (!fs.existsSync(outputFolderPath)) {
            fs.mkdirSync(outputFolderPath);
        }
    }

    let xlsxFiles = [];
    try {
        xlsxFiles = glob.sync(path.join(inputFolderPath, "**/*.xlsx"))
    } catch (ex) {
        console.warn("Error getting list of Excel files", ex);
    }
    for (let fileName of xlsxFiles) {
        try {
            let workbook = xlsx.readFile(fileName);
            processWorkbook(fileName, workbook, outputFolderPaths);
        } catch (ex) {
            console.warn("Error parsing workbook ", fileName);
            console.warn(ex);
        }
    }
}
main();

export function processWorkbook(fileName: string, workbook: xlsx.WorkBook, outputFolderPaths: string[]) {
    let contentListSheetName: string = "==Content_List=="

    if (!workbook.Sheets[contentListSheetName]) {
        console.error("No content list sheet for file", fileName);
        return;
    }
    const contentList: ContentIndexRow[] = xlsx.utils.sheet_to_json(workbook.Sheets[contentListSheetName]);

    const conversationSheets: ConversationExcelSheet[] = contentList
        .filter((contentListItem) => contentListItem.Flow_Type === "Conversation")
        .filter((contentListItem) => workbook.Sheets[contentListItem.Flow_Name])
        .map((contentListItem) => {
            const rows: ConversationExcelRow[] = xlsx.utils.sheet_to_json(workbook.Sheets[contentListItem.Flow_Name]);
            return {
                sheetName: contentListItem.Flow_Name,
                rows: rows
            };
        });
    console.log("File ", fileName, "has", conversationSheets.length, "conversation sheets");

    const conversationTranslator = new ConversationTranslator();
    const rapidProExportObject = conversationTranslator.from(conversationSheets);
    const rapidProExportJSONString = JSON.stringify(rapidProExportObject, null, 4);
    for (let outputFolderPath of outputFolderPaths) {
        fs.writeFileSync(path.join(outputFolderPath, "flow-export.json"), rapidProExportJSONString, { flag: "w+" });
    }

    
    const toolboxSheets: ToolboxExcelSheet[] = contentList
        .filter((contentListItem) => contentListItem.Flow_Type === "Toolbox" || contentListItem.Flow_Type === "Tips")
        .filter((contentListItem) => workbook.Sheets[contentListItem.Flow_Name])
        .map((contentListItem) => {
            const rows: ToolboxExcelRow[] = xlsx.utils.sheet_to_json(workbook.Sheets[contentListItem.Flow_Name]);
            return {
                sheetName: contentListItem.Flow_Name,
                topicId: contentListItem.Module ? contentListItem.Module : contentListItem.Topic_Id,
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
