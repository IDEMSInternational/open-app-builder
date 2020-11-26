import { isNull } from '@angular/compiler/src/output/output_ast';
import { RapidProFlowExport } from '../../src/app/feature/chat/services/offline/rapid-pro-export.model';
import { ConversationExcelRow, ConversationExcelSheet } from './plh-spreadsheet.model';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

export class ConversationTranslator {

    uuidCounter = 0;
    private generateUUID() {
        return uuidv4();
        //return "uuid_" + this.uuidCounter++;
    }

    public from(
        conversationSheets: ConversationExcelSheet[],
        version: string = "13",
        site: string = "https://rapidpro.idems.international",
        flowSpecVersion: string = "13.1.0",
        flowLanguage: string = "base",
        flowType: string = "messaging",
        defaultRevision: number = 0,
        flowExpireAfterMinutes: number = 60): RapidProFlowExport.RootObject {

        let rapidProExportObject: RapidProFlowExport.RootObject = {
            campaigns: [],
            fields: [],
            flows: [],
            groups: [],
            site: site,
            triggers: [],
            version: version
        };

        for (let sheet of conversationSheets) {
            const rows = sheet.rows;
            this.setRowIDs(rows);
            // TODO Also need to consider case of updating an existing flow.
            let flow: RapidProFlowExport.Flow = {
                name: sheet.sheetName,
                uuid: this.generateUUID(),
                // TODO This metadata should possibly be passed in from the "Content list" Excel sheet.
                spec_version: flowSpecVersion,
                language: flowLanguage,
                type: flowType,
                nodes: [],
                _ui: null,
                revision: defaultRevision,
                expire_after_minutes: flowExpireAfterMinutes,
                metadata: {
                    revision: defaultRevision
                },
                localization: {}
            };
            const nodesById: { [nodeId: string]: RapidProFlowExport.Node } = {};
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                const row = rows[rowIndex];
                let nodeId = this.generateUUID();
                row.NodeUUIDForExit = nodeId;

                let actionNode: RapidProFlowExport.Node = {
                    "uuid": nodeId,
                    "actions": [],
                    "exits": [this.createEmptyExit()]
                };
                // Additional nodes added for the row e.g. because of a "Go_to" type.
                let additionalNodes: RapidProFlowExport.Node[] = [];

                // This takes care of blank rows which may still be included because they have a row_id.
                // TODO Should more checks be done if Type is undefined but there may be other contents?
                if (row.Type === undefined) {
                    continue;
                } else if (row.Type === "Send_message" || row.Type === "Story_message") {
                    if (row.MessageText === undefined) {
                        throw new Error("On row " + row.Row_ID.toString() + ": Message text cannot be blank for Type = Send_message.");
                    }
                    let action_text = row.MessageText;
                    // App specific properties that will be appended to MessageText in a link.
                    let link_text = "https://plh-demo1.idems.international/chat/msg-info?";
                    let add_texts: string[] = [];
                    let attachmentUrls: string[] = [];
                    if (row.Type === "Story_message") add_texts.push("isStory=true");
                    if (row.Character) add_texts.push("character="+row.Character);
                    if (row.Choose_multi) add_texts.push("chooseMulti=true");
                    if (row.Display_As_Tick) add_texts.push("displayAsTick=true");
                    if (row.Ticked_By_Default) add_texts.push("tickedByDefault=true");
                    if (row.Choice_Media_Display) add_texts.push("choiceMediaDisplay="+row.Choice_Media_Display);
                    if (add_texts.length > 0) action_text += (" " + link_text + add_texts.join("&"));
                    actionNode.actions.push({
                        "attachments": this.getMediaAttachments(row.Media),
                        "text": action_text,
                        "type": "send_msg",
                        "quick_replies": this.getRowChoices(row),
                        "uuid": this.generateUUID()
                    });
                    row._rapidProNode = actionNode;
                    nodesById[nodeId] = actionNode;
                    if (row.Save_name) {
                        let resultNode: RapidProFlowExport.Node = {
                            "uuid": this.generateUUID(),
                            "actions": [],
                            "exits": [this.createEmptyExit()],
                            "router": {
                                "type": "switch",
                                "default_category_uuid": null,
                                "cases": [],
                                "categories": [
                                    {
                                        "uuid": this.generateUUID(),
                                        "name": "All Responses",
                                        "exit_uuid": null
                                    }
                                ],
                                "operand": "@input.text",
                                "wait": {
                                    "type": "msg"
                                },
                                "result_name": row.Save_name // Is this ok to be the same as the variable?
                            }
                        };
                        resultNode.router.default_category_uuid = resultNode.router.categories[0].uuid;
                        resultNode.router.categories[0].exit_uuid = resultNode.exits[0].uuid;
                        additionalNodes.push(resultNode);
                        // The initial node exits to the resultNode
                        actionNode.exits[0].destination_uuid = resultNode.uuid;
                        let saveNode: RapidProFlowExport.Node = {
                            "uuid": this.generateUUID(),
                            "actions": [
                                {
                                    "uuid": this.generateUUID(),
                                    "type": "set_contact_field",
                                    "field": {
                                        // Can these be the same?
                                        "key": row.Save_name,
                                        "name": row.Save_name
                                    },
                                    "value": "@results." + row.Save_name

                                }
                            ],
                            "exits": [this.createEmptyExit()]
                        }
                        additionalNodes.push(saveNode);
                        // The initial node exits to the resultNode
                        resultNode.exits[0].destination_uuid = saveNode.uuid;
                        row._rapidProNode = saveNode;
                    }
                } else if (row.Type === "Start_new_flow") {
                    actionNode.actions.push({
                        "flow": {
                            "name": row.MessageText,
                            "uuid": this.generateUUID()
                        },
                        "type": "enter_flow",
                        "uuid": this.generateUUID()
                    });
                    this.setEnterFlowRouterAndExits(actionNode);
                    row._rapidProNode = actionNode;
                    nodesById[nodeId] = actionNode;
                } else if (row.Type === "Go_to") {

                } else if (row.Type === "Save_value") {
                    actionNode.actions.push(this.createSaveAction(row.Save_name, row.MessageText));
                    row._rapidProNode = actionNode;
                    nodesById[nodeId] = actionNode;
                } else if (row.Type === "Exit") {
                    actionNode.actions.push(this.createSaveAction(flow.name + "__completed", "true"));
                    row._rapidProNode = actionNode;
                    nodesById[nodeId] = actionNode;
                    if (row.MessageText) {
                        let enterFlowNode: RapidProFlowExport.Node = {
                            "uuid": this.generateUUID(),
                            "actions": [
                                {
                                    "flow": {
                                        "name": row.MessageText,
                                        "uuid": this.generateUUID()
                                    },
                                    "type": "enter_flow",
                                    "uuid": this.generateUUID()
                                }
                            ],
                            "exits": [this.createEmptyExit()]
                        }
                        // The initial node exits to the newFlowNode
                        additionalNodes.push(enterFlowNode);
                        actionNode.exits[0].destination_uuid = enterFlowNode.uuid;
                        row._rapidProNode = enterFlowNode;
                    }
                } else {
                    continue;
                    //throw new Error("Unknown Type");
                }

                // Now add connectivity
                if (row.Condition) {
                    this.processRouterRow(row, rows, flow)
                } else {
                    // If no condition just add as exit to nodes that this row says it comes from.
                    // For a "Go_to" row set the exit to the NodUUIDForExit of the row mentioned in MessageText.
                    let fromNodes = this.getFromNodes(row, rows);
                    for (let fromNode of fromNodes) {
                        if (row.Type === "Go_to") {
                            // TODO This is repeated when there is a condition as well so could move to separate function.
                            if (!row.MessageText) throw new Error("On row " + row.Row_ID + ": MessageText must contain the row to go to.");
                            let messageTextRows = rows.filter((r) => r.Row_ID = row.MessageText);
                            if (messageTextRows.length === 1) {
                                fromNode.exits[0].destination_uuid = messageTextRows[0].NodeUUIDForExit;
                            } else {
                                throw new Error("On row " + row.Row_ID + ": Cannot find row with Row_ID = " + row.MessageText + " from MessageText column.");
                            }
                        } else {
                            fromNode.exits[0].destination_uuid = nodeId;
                        }
                    }
                }
                // Add this after the condition so that the nodes are in a sensible order when importing into Rapid Pro
                // If Type is "Go_to" then there is no node to add.
                if (row.Type !== "Go_to") {
                    flow.nodes.push(actionNode);
                }
                for (let n of additionalNodes) {
                    flow.nodes.push(n);
                }
            }
            rapidProExportObject.flows.push(flow);
        }
        return rapidProExportObject;
    }

    // Create default required router with 2 cases/categories and 2 exit for an "enter_flow" node.
    public setEnterFlowRouterAndExits(node: RapidProFlowExport.Node) {
        let exits: RapidProFlowExport.Exit[] = [
            {
                "uuid": this.generateUUID(),
                "destination_uuid": null    
            },
            {
                "uuid": this.generateUUID(),
                "destination_uuid": null
            }
        ]
        let categories: RapidProFlowExport.Category[] = [
            {
                "uuid": this.generateUUID(),
                "name": "Complete",
                "exit_uuid": exits[0].uuid
            },
            {
                "uuid": this.generateUUID(),
                "name": "Expired",
                "exit_uuid": exits[1].uuid
            }
        ];
        let cases: RapidProFlowExport.RouterCase[] = [
            {
                "uuid": this.generateUUID(),
                "type": "has_only_text",
                "arguments": ["completed"],
                "category_uuid": categories[0].uuid
            },
            {
                "uuid": this.generateUUID(),
                "type": "has_only_text",
                "arguments": ["expired"],
                "category_uuid": categories[1].uuid
            }
        ];
        // TODO Should this always be overwritting the router and exits or adding to them?
        node.router = {
            "cases": cases,
            "categories": categories,
            "operand": "@child.run.status",
            "type": "switch",
            "default_category_uuid": categories[0].uuid
        };
        node.exits = exits;
    }

    public setRowIDs(rows: ConversationExcelRow[]) {
        let nullRows = rows.filter((row) => row.Row_ID === undefined);

        if(nullRows.length == rows.length) {
            for (var i = 0; i <= rows.length - 1; i++) {
                rows[i].Row_ID = (i + 2).toString();
            }
        } else if (nullRows.length == 0) {
            if (new Set(rows.map((row) => row.Row_ID)).size !== rows.length) {
                throw new Error("Row_ID values are not unique.");            
            }
        } else if(nullRows.length !== rows.length) {
            throw new Error("Row_ID column has blank values. If Row_ID is included all rows must have a unique row ID.");            
        }
    }

    public getFromRowIndices(row: ConversationExcelRow): string[] {
        if (row.From) {
            return row.From.toString().split(",");
        }
        return [];
    }

    public getFromRows(row: ConversationExcelRow, rows: ConversationExcelRow[]): ConversationExcelRow[] {
        let ind = this.getFromRowIndices(row);
        return rows.filter((curr_row) => ind.includes(curr_row.Row_ID.toString()));
    }

    public getFromNodes(row: ConversationExcelRow, rows: ConversationExcelRow[]): RapidProFlowExport.Node[] {
        return this.getFromRows(row, rows)
            .map((row) => row._rapidProNode)
            .filter((node) => node !== undefined);
    }

    public getRoutersFromRow(currentRow: ConversationExcelRow,
        rows: ConversationExcelRow[],
        nodesById: { [nodeId: string]: RapidProFlowExport.Node }): RapidProFlowExport.Node[] {
        const fromNodes = this.getFromNodes(currentRow, rows);
        
        let fromNodeExits: RapidProFlowExport.Exit[] = [];
        for (let fromNode of fromNodes) {
            for (let exit of fromNode.exits) {
                fromNodeExits.push(exit);
            }
        }
        return fromNodeExits
            .filter((exit) => exit.destination_uuid)
            .map((exit) => nodesById[exit.destination_uuid])
            .filter((node) => node.router);
    }

    public attachToUnattachedCategories(routerNode: RapidProFlowExport.Node, newExit: RapidProFlowExport.Exit) {
        let routerCategoriesWithoutExits = routerNode.router.cases.map((routerCase) => {
            return routerNode.router.categories.find((cat) => cat.uuid === routerCase.category_uuid);
        })
            .filter((category) => !category.exit_uuid);
        routerNode.exits.push(newExit);
        routerCategoriesWithoutExits.forEach((category) => {
            category.exit_uuid = newExit.uuid;
        });
    }

    public createEmptyExit() : RapidProFlowExport.Exit {
        let exit: RapidProFlowExport.Exit = {
            uuid: this.generateUUID(),
            destination_uuid: null
        };
        return exit;
    }

    public createRouterNode(
        operandType: "@input" | "@fields", 
        operandValue: "text" | string,
        routerType: "switch" | string = "switch",
        defaultName: string = "All Responses",
        ): RapidProFlowExport.Node {
        let nodeId = this.generateUUID();
        let emptyExit = this.createEmptyExit();
        let otherCategory = {
            exit_uuid: emptyExit.uuid,
            name: defaultName,
            uuid: this.generateUUID()
        };

        let newRouterNode: RapidProFlowExport.Node = {
            "uuid": nodeId,
            "actions": [],
            "router": {
                "type": routerType,
                "default_category_uuid": otherCategory.uuid,
                "cases": [],
                "categories": [otherCategory],
                "operand": operandType + "." + operandValue
            },
            "exits": [emptyExit]
        };
        if (operandType === "@input") {
            newRouterNode.router.wait = {
                type: "msg"
            };
        }
        return newRouterNode
    }

    // Adds a condition to a router node based on the condition information in a row.
    public addConditionToRouterNode(
        routerNode: RapidProFlowExport.Node,
        row: ConversationExcelRow,
        rows: ConversationExcelRow[],
        // TODO This could be more global?
        defaultType: RapidProFlowExport.RouterCaseType = "has_only_phrase"
    ) {
        let type: RapidProFlowExport.RouterCaseType
        if(row.Condition_Type) {
            type = row.Condition_Type
        } else type = defaultType
        let choiceCategory: RapidProFlowExport.Category;
        
        // If row has a condition then add a new category, case and exit.
        if (row.Condition) {
            let conds: string[];
            if (row.Condition.includes(",")) {
                conds = row.Condition.split(",").map(s => s.trim());
            } else if (row.Condition.includes(";")) {
                conds = row.Condition.split(";").map(s => s.trim());
            }
            else conds = [row.Condition];

            if (routerNode.actions.length > 0 && routerNode.actions[0].type === "enter_flow") {
                if (conds.length === 2 && conds.includes("completed") && conds.includes("expired")) {
                    routerNode.exits[0].destination_uuid = row.NodeUUIDForExit;
                    routerNode.exits[1].destination_uuid = row.NodeUUIDForExit;
                } else if (conds.length === 1 && conds.includes("completed")) {
                    routerNode.exits[0].destination_uuid = row.NodeUUIDForExit;                    
                }
                else if (conds.length === 1 && conds.includes("expired")) {
                    routerNode.exits[1].destination_uuid = row.NodeUUIDForExit;
                }
                else throw new Error("Condition for a Start_new_flow can only be: completed, expired or both.");
            } else {
                let exit = this.createEmptyExit();
                if (row.Type === "Go_to") {
                    // TODO This is repeated when there is no condition as well so could move to separate function.
                    if (!row.MessageText) throw new Error("On row " + row.Row_ID + ": MessageText must contain the row to go to.");
                    let messageTextRows = rows.filter((r) => r.Row_ID === row.MessageText);
                    if (messageTextRows.length === 1) {
                        exit.destination_uuid = messageTextRows[0].NodeUUIDForExit;
                    } else {
                        throw new Error("On row " + row.Row_ID + ": Cannot find row with Row_ID = " + row.MessageText + " from MessageText column.");
                    }
                } else {
                    exit.destination_uuid = row.NodeUUIDForExit;
                }
                choiceCategory = {
                    exit_uuid: exit.uuid,
                    name: row.Condition,
                    uuid: this.generateUUID()
                };
                let choiceCases: RapidProFlowExport.RouterCase[] = []
                // For "has_any_word" arguments is a list of length one with all words separate by spaces.
                if(type === "has_any_word") {
                    conds = [conds.join(" ")];
                    choiceCases = [
                        {
                            "arguments": conds,
                            "category_uuid": choiceCategory.uuid,
                            "type": type,
                            "uuid": this.generateUUID()
                    }];
                // For phrases need one case per phrase linked to the same category. arguments is a list of length one with the phrase.
                } else if(type === "has_only_phrase" || type === "has_phrase") {
                    for (let con of conds) {
                        choiceCases.push(
                            {
                                "arguments": [con],
                                "category_uuid": choiceCategory.uuid,
                                "type": type,
                                "uuid": this.generateUUID()
                            }
                        );
                    }
                } else {
                    // TODO Other types needs to be implemented. This is not correct for all other types.
                    conds = [conds.join(" ")];
                    choiceCases = [
                        {
                            "arguments": conds,
                            "category_uuid": choiceCategory.uuid,
                            "type": type,
                            "uuid": this.generateUUID()
                    }];
                } 
                routerNode.exits.push(exit);
                routerNode.router.categories.push(choiceCategory);
                for (let c of choiceCases) {
                    routerNode.router.cases.push(c);
                }
            }            
        } else {
            // If the row has no condition then update the default (other) exit.
            // Routers are always created with a default (empty) exit so this always exists.
            routerNode.exits[0].destination_uuid = row.NodeUUIDForExit;
        }
    }

    public processRouterRow(
        row: ConversationExcelRow,
        rows: ConversationExcelRow[],
        flow: RapidProFlowExport.Flow
    ) {
        let fromNodes = this.getFromNodes(row, rows);
        let fromRows: ConversationExcelRow[];
        let routerNode: RapidProFlowExport.Node;
        let newRouterNode: RapidProFlowExport.Node;
        let first: boolean = true;
        let operandType: "@input" | "@fields";
        let operandValue: "text" | string;

        fromRows = this.getFromRows(row, rows);
        // If Condition_Var is given this is operandValue
        if (row.Condition_Var && row.Condition_Var.length > 0) {
            operandType = "@fields";
            operandValue = row.Condition_Var;
        // If the first fromRow has a Save_name then the condition is from a saved field.
        } else if (fromRows && fromRows.length > 0 && fromRows[0].Save_name) {
            operandType = "@fields";
            operandValue = fromRows[0].Save_name;
        // If there is no Condition_Var and fromNode is not of type "set_contact_field" then assumed to be input from text.
        } else {
            operandType = "@input";
            operandValue = "text";
        }
        // Each "from row/node" needs to have it's exits update with a router (could be new or existing router)
        for (let fromNode of fromNodes) {
            // If fromNode is a router of the same type as the current node/row then add a condition to fromNode for the current row/node
            if (fromNode.router && fromNode.router.type == "switch" && fromNode.router.operand && fromNode.router.operand == operandType + "." + operandValue) {
                this.addConditionToRouterNode(fromNode, row, rows);
            } else {
                // If fromNode is not a router or router of a different type then create a new router of the same type and add a condition for the current row/node.
                // Only one new router is created for all fromNodes so that all fromNodes go to the same router.
                // There may be cases where multiple routers may be desired, but this can be done by ordering the rows of the Excel sheet to have different router cases first.
                // TODO Create an example Excel file to demonstate this.
                if (first) {
                    newRouterNode = this.createRouterNode(operandType, operandValue);
                    this.addConditionToRouterNode(newRouterNode, row, rows);
                    flow.nodes.push(newRouterNode);
                    first = false;
                }
                routerNode = newRouterNode;
                // If fromNode is a router of a different type then in parent If then set the "other" exit to the new router
                // If fromNode is not a router and has exactly 1 exit then the fromNode now goes to the new router and the existing exit of fromNode is now the "other" of the router
                // If fromNode has multiple exits but is not a router than this is not valid.
                if (fromNode.router) {
                    if(fromNode.exits[0].destination_uuid) {
                        // How should we throw errors?
                        // Should give details of both exits.
                        throw new Error("Attempting to set multiple default exits");
                    }
                    fromNode.exits[0].destination_uuid = routerNode.uuid;
                } else if (fromNode.exits.length == 1) {
                    // Takes 
                    let oldExitDestUuid = fromNode.exits[0].destination_uuid;
                    fromNode.exits[0].destination_uuid = routerNode.uuid;
                    routerNode.exits[0].destination_uuid = oldExitDestUuid;
                } else {
                    // How should we throw errors?
                    throw new Error("Multiple exists defined but node is not a router");
                }
                // Update the rows which currently link to fromNode to now link to routerNode.
                // This ensures that the next time these rows are updated the are correctly linked to routerNode.
                let fromRows = rows.filter((row) => row._rapidProNode == fromNode);
                // This may or may not be a concern if fromNode is not linked to exactly 1 row.
                if (fromRows.length !== 1) throw new console.warn("A node is attached to " + fromRows.length.toString() + " rows.");
                for (let fromRow of fromRows) {
                    fromRow._rapidProNode = routerNode;
                }
            }
        }
    }

    public getRowChoices(row: ConversationExcelRow): string[] {
        let quick_replies: string[] = [];
        for (var i = 1; i <= 12; i++) {
            if (row["Choice_" + i] !== undefined) {
                let reply = row["Choice_" + i].toString();
                if (row["Choice_" + i + "_Media"] !== undefined) {
                    reply += (" " + row["Choice_" + i + "_Media"].toString());
                }
                quick_replies.push(reply);
            }
        }
        return quick_replies;
    }

    public getMediaAttachments(mediaText: string): string[] {
        if (mediaText === undefined || mediaText === "") return [];
        return mediaText.split(";").map(s => "image:" + s.trim());
    }

    public createSaveAction(fieldName: string, value: string): RapidProFlowExport.Action {
        return {
            "uuid": this.generateUUID(),
            "type": "set_contact_field",
            "field": {
                // Can these be the same?
                "key": fieldName,
                "name": fieldName
            },
            "value": value
        };
    }
}