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

    if (!fs.existsSync(inputFolderPath)) {
        fs.mkdirSync(inputFolderPath);
    }

    for (let outputFolderPath of outputFolderPaths) {
        if (!fs.existsSync(outputFolderPath)) {
            fs.mkdirSync(outputFolderPath);
        }
    }

    try {
        const xlsxFiles = fs.readdirSync(inputFolderPath)
            .filter((fileName) => fileName.endsWith(".xlsx"));
        console.log("XLSX files to process ", xlsxFiles);
        for (let fileName of xlsxFiles) {
            let workbook = xlsx.readFile(path.join(inputFolderPath, fileName));
            processWorkbook(workbook, outputFolderPaths);
        }
    } catch (ex) {
        console.warn("Excel parsing error");
        console.warn(ex);
    }
}
main();

export function processWorkbook(workbook: xlsx.WorkBook, outputFolderPaths: string[]) {
    console.log("Sheet names", workbook.SheetNames);
    let contentListSheetName: string = "==Content_List=="

    if (!workbook.Sheets[contentListSheetName]) {
        console.error("No content list sheet!");
        return;
    }
    const contentList: ContentIndexRow[] = xlsx.utils.sheet_to_json(workbook.Sheets[contentListSheetName]);
    
    console.log("Content list", contentList);

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
    console.log("Conversation Sheets: ", JSON.stringify(conversationSheets));

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
