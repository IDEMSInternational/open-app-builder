import * as xlsx from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { exit } from "process";
import { v4 as uuidv4 } from 'uuid';
import { RapidProFlowExport } from '../src/app/feature/chat/chat-service/rapid-pro-export.model';

const inputFolderPath = path.join(__dirname, "./input");
const outputFolderPath = path.join(__dirname, "./output");
const spreadsheetFile = "plh_input1.xlsx";

if (!fs.existsSync(inputFolderPath)) {
    fs.mkdirSync(inputFolderPath);
}

if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
}

interface ConversationExcelRow {
    Type: 'Start_new_flow' | 'Send_message',
    From?: number | string,
    Condition?: string,
    Condition_Var?: string,
    MessageText: string,
    Media?: string,
    Default_Choice?: string,
    Choice_1?: string,
    Choice_2?: string,
    Choice_3?: string,
    Choice_4?: string,
    Choice_5?: string,
    Choice_6?: string,
    Choice_7?: string,
    Choice_8?: string,
    Choice_9?: string,
    Choice_10?: string,
    NodeUUID?: string,
    rapidProNode?: RapidProFlowExport.Node
}

let workbook = xlsx.readFile(path.join(inputFolderPath, spreadsheetFile));

console.log("Sheet names", workbook.SheetNames);

if (!workbook.Sheets["Content_List"]) {
    console.error("No content list!");
    exit();
}

let contentList: {
    Sheet_Name: string,
    Content_Type: "Conversation",
    Character?: "Friend" | "Guide",
    Entry_Condition?: string
}[] = xlsx.utils.sheet_to_json(workbook.Sheets["Content_List"]);

function getFromRows(row: ConversationExcelRow, rows: ConversationExcelRow[]): ConversationExcelRow[] {
    return getFromRowNumbers(row, rows).map((fromRowNumber) => rows[fromRowNumber - 2]);
}

function getFromRowNumbers(row: ConversationExcelRow, rows: ConversationExcelRow[]): number[] {
    if (row.From) {
        if (typeof row.From === "number") {
            return [row.From];
        }
        if (typeof row.From === "string") {
            return row.From.split(",")
                .map((fromStr) => Number.parseInt(fromStr))
                .filter((num) => num != NaN)
        }
    }
    let rowIndex = rows.indexOf(row);
    if (rowIndex < 1) {
        return [];
    }
    return [rowIndex + 2];
}

function getFromNodes(row: ConversationExcelRow, rows: ConversationExcelRow[]) {
    return getFromRowNumbers(row, rows)
        .map((rowNumber) => rows[rowNumber - 2].rapidProNode)
        .filter((node) => node !== undefined);
}

function getRoutersFromRow(row: ConversationExcelRow, rows: ConversationExcelRow[], nodesById: { [nodeId: string]: RapidProFlowExport.Node }) {
    const fromRowsThatExitToRouterNodes = getFromRows(row, rows)
        .filter((row) => row && row.rapidProNode && row.rapidProNode.exits.length > 0 && row.rapidProNode.exits[0].destination_uuid)
        .map((row) => nodesById[row.rapidProNode.exits[0].destination_uuid])
        .filter((node) => node.router !== undefined);

    return fromRowsThatExitToRouterNodes;
}

function attachToUnattachedCategories(routerNode: RapidProFlowExport.Node, newExit: RapidProFlowExport.Exit) {
    let routerCategoriesWithoutExits = routerNode.router.cases.map((routerCase) => {
        return routerNode.router.categories.find((cat) => cat.uuid === routerCase.category_uuid);
    })
        .filter((category) => !category.exit_uuid);
    routerNode.exits.push(newExit);
    routerCategoriesWithoutExits.forEach((category) => {
        category.exit_uuid = newExit.destination_uuid;
    });
}

function processRouterRow(
    row: ConversationExcelRow,
    rows: ConversationExcelRow[],
    nodesById: { [nodeId: string]: RapidProFlowExport.Node },
    flow: RapidProFlowExport.Flow,
    operandType: "@input" | "@field",
    operandValue: "text" | string
) {
    let fromRouters = getRoutersFromRow(row, rows, nodesById);
    if (fromRouters.length === 0) {
        let nodeId = uuidv4();
        let newRouterNode: RapidProFlowExport.Node = {
            "uuid": nodeId,
            "actions": [],
            "router": {
                "type": "switch",
                "default_category_uuid": null, // How do we want excel to specify default?
                "cases": [],
                "categories": [],
                "operand": operandType + "." + operandValue
            },
            "exits": []
        };
        if (operandType === "@input") {
            newRouterNode.router.wait = {
                type: "msg"
            };
        }
        let fromChoices = getFromRows(row, rows)
            .map((fromRow) => getRowChoices(fromRow))
            .find((choices) => choices.length > 0);
        if (fromChoices) {
            for (let choice of fromChoices) {
                let choiceCategory: RapidProFlowExport.Category = {
                    exit_uuid: undefined,
                    name: choice,
                    uuid: uuidv4()
                };
                let choiceCase: RapidProFlowExport.RouterCase = {
                    arguments: [choice],
                    category_uuid: choiceCategory.uuid,
                    type: "has_any_word",
                    uuid: uuidv4()
                };
                newRouterNode.router.categories.push(choiceCategory);
                newRouterNode.router.cases.push(choiceCase);
            }
        }
        flow.nodes.push(newRouterNode);
        fromRouters.push(newRouterNode);
    }


    for (let routerNode of fromRouters) {

        // Find existing exit on router node, or create one and add it to router
        let exit = routerNode.exits.find((exit) => exit.destination_uuid === row.NodeUUID);
        if (!exit) {
            exit = {
                uuid: uuidv4(),
                destination_uuid: row.NodeUUID
            };
            routerNode.exits.push(exit);
        }


        if (operandType === "@input") {
            if (row.Condition) {
                let existingCategory = routerNode.router.categories.find((cat) => cat.name === row.Condition);
                if (existingCategory) {
                    existingCategory.exit_uuid = exit.uuid;
                }
            }
        } else if (operandType === "@field") {
            let fieldCategory: RapidProFlowExport.Category = {
                exit_uuid: undefined,
                name: row.Condition,
                uuid: uuidv4()
            };
            var fieldRouterCase: RapidProFlowExport.RouterCase = {
                arguments: [row.Condition], // Multi condition handling later
                category_uuid: fieldCategory.uuid,
                type: "has_any_word", // Add more case handling later
                uuid: uuidv4()
            };
            routerNode.router.categories.push(fieldCategory);
            routerNode.router.cases.push(fieldRouterCase);
        }

        /*
            Given that the spreadsheet says the current row comes from the row that this router is for
            Any categories without exits should be matched to exit to the node for this row
        */
        attachToUnattachedCategories(routerNode, exit);
    }

}

function getRowChoices(row: ConversationExcelRow) {
    let quick_replies: string[] = [];
    for (var i = 1; i <= 10; i++) {
        if (row["Choice_" + i]) {
            quick_replies.push(row["Choice_" + i]);
        }
    }
    return quick_replies;
}

let exportObject: RapidProFlowExport.RootObject = {
    campaigns: [],
    fields: [],
    flows: [],
    groups: [],
    site: "",
    triggers: [],
    version: "0.1"
};

for (let contentListItem of contentList) {
    if (!workbook.Sheets[contentListItem.Sheet_Name]) {
        console.warn("No worksheet for=" + contentListItem.Sheet_Name + ":");
        break;
    }
    if (contentListItem.Content_Type === "Conversation") {
        const rows: ConversationExcelRow[] = xlsx.utils.sheet_to_json(workbook.Sheets[contentListItem.Sheet_Name]);
        let flow: RapidProFlowExport.Flow = {
            name: contentListItem.Sheet_Name,
            uuid: uuidv4(), 
            spec_version: "v1",
            language: "english",
            type: "type",
            nodes: [],
            _ui: null,
            revision: 0,
            expire_after_minutes: 60,
            metadata: {
                revision: 0,
            },
            localization: null
        };
        const nodesById: { [nodeId: string]: RapidProFlowExport.Node } = {};
        for (let rowNumber = 2; rowNumber < rows.length + 2; rowNumber++) {
            const row = rows[rowNumber - 2];
            let nodeId = uuidv4();
            row.NodeUUID = nodeId;

            let actionNode: RapidProFlowExport.Node = {
                "uuid": nodeId,
                "actions": [],
                "exits": []
            };
            if (row.Type === "Send_message") {
                actionNode.actions.push({
                    "attachments": [],
                    "text": row.MessageText,
                    "type": "send_msg",
                    "quick_replies": getRowChoices(row),
                    "uuid": uuidv4()
                });
            }
            if (row.Type === "Start_new_flow") {
                actionNode.actions.push({
                    "flow": {
                        "name": row.MessageText,
                        "uuid": uuidv4()
                    },
                    "type": "enter_flow",
                    "uuid": uuidv4()
                });
            }

            row.NodeUUID = nodeId;
            row.rapidProNode = actionNode;
            nodesById[nodeId] = actionNode;
            flow.nodes.push(actionNode);

            // Now add connectivity
            if (row.Condition) {
                if (row.Condition_Var && row.Condition_Var.length > 0) {
                    processRouterRow(row, rows, nodesById, flow, "@field", row.Condition_Var);
                } else {
                    processRouterRow(row, rows, nodesById, flow, "@input", "text");
                }
            } else {
                // If no condition just add as exit to nodes that this row from says it comes from
                let fromNodes = getFromNodes(row, rows);
                for (let fromNode of fromNodes) {
                    if (!fromNode.exits.find((exit) => exit.destination_uuid !== nodeId)) {
                        fromNode.exits.push({
                            uuid: uuidv4(),
                            destination_uuid: nodeId
                        });
                    }
                }
            }
        }
        exportObject.flows.push(flow);
        const flowJSONString = JSON.stringify(flow, null, 4);
        const flowOutputPath = path.join(outputFolderPath, `flow-${contentListItem.Sheet_Name}.json`);
        console.log("Outputing for ", flowOutputPath);
        fs.writeFileSync(flowOutputPath, flowJSONString);
    }
}

const exportJSONString = JSON.stringify(exportObject, null, 4);
fs.writeFileSync(path.join(outputFolderPath, "flow-export.json"), exportJSONString, { flag: "w+" });
fs.writeFileSync(path.join(__dirname, "../src/assets/rapid-pro-flow-exports/", "flow-export.json"), exportJSONString, { flag: "w+" });
