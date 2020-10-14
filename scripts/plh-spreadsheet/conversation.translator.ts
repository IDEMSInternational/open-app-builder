import { RapidProFlowExport } from '../../src/app/shared/services/chat/offline/rapid-pro-export.model';
import { ConversationExcelRow, ConversationExcelSheet } from './plh-spreadsheet.model';

export class ConversationTranslator {

    uuidCounter = 0;
    private generateUUID() {
        return "uuid_" + this.uuidCounter++;
    }

    public from(conversationSheets: ConversationExcelSheet[]): RapidProFlowExport.RootObject {

        let rapidProExportObject: RapidProFlowExport.RootObject = {
            campaigns: [],
            fields: [],
            flows: [],
            groups: [],
            site: "",
            triggers: [],
            version: "0.1"
        };

        for (let sheet of conversationSheets) {
            const rows = sheet.rows;
            let flow: RapidProFlowExport.Flow = {
                name: sheet.sheetName,
                uuid: this.generateUUID(),
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
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                const row = rows[rowIndex];
                let nodeId = this.generateUUID();
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
                        "quick_replies": this.getRowChoices(row),
                        "uuid": this.generateUUID()
                    });
                }
                if (row.Type === "Start_new_flow") {
                    actionNode.actions.push({
                        "flow": {
                            "name": row.MessageText,
                            "uuid": this.generateUUID()
                        },
                        "type": "enter_flow",
                        "uuid": this.generateUUID()
                    });
                }

                row.NodeUUID = nodeId;
                row._rapidProNode = actionNode;
                nodesById[nodeId] = actionNode;
                flow.nodes.push(actionNode);

                // Now add connectivity
                if (row.Condition) {
                    if (row.Condition_Var && row.Condition_Var.length > 0) {
                        this.processRouterRow(row, rows, nodesById, flow, "@field", row.Condition_Var);
                    } else {
                        this.processRouterRow(row, rows, nodesById, flow, "@input", "text");
                    }
                } else {
                    // If no condition just add as exit to nodes that this row from says it comes from
                    let fromNodes = this.getFromNodes(row, rows);
                    for (let fromNode of fromNodes) {
                        if (!fromNode.exits.find((exit) => exit.destination_uuid !== nodeId)) {
                            fromNode.exits.push({
                                uuid: this.generateUUID(),
                                destination_uuid: nodeId
                            });
                        }
                    }
                }
            }
            rapidProExportObject.flows.push(flow);
        }

        return rapidProExportObject;

    }

    public getFromRowIndices(row: ConversationExcelRow, rows: ConversationExcelRow[]): number[] {
        if (row.From) {
            if (typeof row.From === "number") {
                return [row.From - 2];
            }
            if (typeof row.From === "string") {
                return row.From.split(",")
                    .map((fromStr) => Number.parseInt(fromStr))
                    .filter((num) => num != NaN || num < 0)
                    .map((num) => num - 2);
            }
        }
        return [];
    }

    public getFromRows(row: ConversationExcelRow, rows: ConversationExcelRow[]): ConversationExcelRow[] {
        return this.getFromRowIndices(row, rows)
            .map((i) => rows[i]);
    }

    public getFromNodes(row: ConversationExcelRow, rows: ConversationExcelRow[]): RapidProFlowExport.Node[] {
        return this.getFromRowIndices(row, rows)
            .map((i) => rows[i]._rapidProNode)
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

    public processRouterRow(
        row: ConversationExcelRow,
        rows: ConversationExcelRow[],
        nodesById: { [nodeId: string]: RapidProFlowExport.Node },
        flow: RapidProFlowExport.Flow,
        operandType: "@input" | "@field",
        operandValue: "text" | string
    ) {
        let fromRouterNodes = this.getRoutersFromRow(row, rows, nodesById);
        if (fromRouterNodes.length === 0) {
            let nodeId = this.generateUUID();
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
            let fromChoices = this.getFromRows(row, rows)
                .map((fromRow) => this.getRowChoices(fromRow))
                .find((choices) => choices.length > 0);
            if (fromChoices) {
                for (let choice of fromChoices) {
                    let choiceCategory: RapidProFlowExport.Category = {
                        exit_uuid: undefined,
                        name: choice,
                        uuid: this.generateUUID()
                    };
                    let choiceCase: RapidProFlowExport.RouterCase = {
                        arguments: [choice],
                        category_uuid: choiceCategory.uuid,
                        type: "has_any_word",
                        uuid: this.generateUUID()
                    };
                    newRouterNode.router.categories.push(choiceCategory);
                    newRouterNode.router.cases.push(choiceCase);
                }
            }
            flow.nodes.push(newRouterNode);
            fromRouterNodes.push(newRouterNode);
        }


        for (let routerNode of fromRouterNodes) {

            // Find existing exit on router node, or create one and add it to router
            let exit = routerNode.exits.find((exit) => exit.destination_uuid === row.NodeUUID);
            if (!exit) {
                exit = {
                    uuid: this.generateUUID(),
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
                    uuid: this.generateUUID()
                };
                var fieldRouterCase: RapidProFlowExport.RouterCase = {
                    arguments: [row.Condition], // Multi condition handling later
                    category_uuid: fieldCategory.uuid,
                    type: "has_any_word", // Add more case handling later
                    uuid: this.generateUUID()
                };
                routerNode.router.categories.push(fieldCategory);
                routerNode.router.cases.push(fieldRouterCase);
            }

            /*
                Given that the spreadsheet says the current row comes from the row that this router is for
                Any categories without exits should be matched to exit to the node for this row
            */
            this.attachToUnattachedCategories(routerNode, exit);
        }

    }

    public getRowChoices(row: ConversationExcelRow) {
        let quick_replies: string[] = [];
        for (var i = 1; i <= 10; i++) {
            if (row["Choice_" + i]) {
                quick_replies.push(row["Choice_" + i]);
            }
        }
        return quick_replies;
    }

}