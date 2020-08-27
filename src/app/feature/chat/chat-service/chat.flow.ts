import { Subject, Observable, of } from 'rxjs';
import { IRapidProMessage } from './chat.service';

export interface ChatFlow {
    sendMessage(msg: string): Observable<any>;
    messageSubject: Subject<IRapidProMessage>;
    nextFlowIdSubject: Subject<string>;
}

export class RapidProOfflineFlow implements ChatFlow {

    flowObject: RapidProFlowExport.Flow;
    nodesById: { [nodeUUID: string]: RapidProFlowExport.Node } = {};
    currentNode: RapidProFlowExport.Node;
    incomingMsgCallback: (msg: string) => any;
    incomingMsg: string;

    contactFields: { [field: string]: string } = {};

    nextFlowIdSubject: Subject<string> = new Subject();

    constructor(public messageSubject: Subject<IRapidProMessage>, exportObject: RapidProFlowExport.RootObject) {
        console.log("Export object!", exportObject);
        this.flowObject = exportObject.flows[0];
        this.flowObject.nodes.forEach((node) => {
            this.nodesById[node.uuid] = node;
        });
        this.enterNode(this.flowObject.nodes[0], null);
    }

    private enterNode(node: RapidProFlowExport.Node, lastUserMsg: string) {
        this.currentNode = node;
        console.log("Entered node ", node.uuid, node);
        for (let action of node.actions) {
            if (action.type === "enter_flow") {
                let text = "Next flow " + action.flow.name;
                this.messageSubject.next({
                    message: text,
                    body: text,
                    message_id: action.uuid,
                    title: this.flowObject.name,
                    type: "rapidpro",
                    wasTapped: false,
                    quick_replies: "['Start Next Flow', 'Stop for now']"
                });
            }
            if (action.type === "send_msg" && action.text) {
                this.doSendMessageAction(action);
            }
            if (action.type === "set_contact_field") {
                this.doSetContactFieldAction(action);
            }
        }
        if (!node.router) {
            for (let exit of node.exits) {
                this.enterNode(this.getNodeById(exit.destination_uuid), lastUserMsg);
            }
        } else {
            console.log("Router here?");
            if (node.router.type === "switch" && node.router.operand === "@child.run.status") {
                this.useRouter(node, lastUserMsg);
                return;
            }
            let msgResponseFunc = (incomingMsg: string) => {
                this.incomingMsg = null;
                this.useRouter(node, incomingMsg);
            };
            console.log("Setting of callback");
            this.incomingMsgCallback = msgResponseFunc;
        }
    }

    private useRouter(node: RapidProFlowExport.Node, incomingMsg: string) {
        let matchingCategoryId: string;
        for (let routerCase of node.router.cases) {
            let caseResultCatId: string;
            if (node.router.operand === "@child.run.status" && routerCase.arguments && routerCase.arguments[0] === "completed") {
                caseResultCatId = routerCase.category_uuid;
            }
            if (routerCase.type === "has_any_word") {
                caseResultCatId = this.matchCategoryIdForHasAnyWordCase(routerCase, incomingMsg);
            }
            if (routerCase.type === "has_number_between") {
                caseResultCatId = routerCase.category_uuid;
            }
            if (caseResultCatId) {
                matchingCategoryId = caseResultCatId;
                break;
            }
        }
        if (matchingCategoryId) {
            let matchingCategory = node.router.categories.find((cat) => cat.uuid === matchingCategoryId);
            let matchingExit = node.exits.find((exit) => exit.uuid === matchingCategory.exit_uuid);
            this.enterNode(this.getNodeById(matchingExit.destination_uuid), incomingMsg);
        } else {
            console.warn("Nothing matches :(");
        }
    }

    private doSendMessageAction(action: RapidProFlowExport.Action) {
        let text = action.text;
        this.messageSubject.next({
            message: text,
            body: text,
            message_id: action.uuid,
            title: this.flowObject.name,
            type: "rapidpro",
            wasTapped: false,
            quick_replies: action.quick_replies ? JSON.stringify(action.quick_replies) : "[]"
        });
    }

    private doSetContactFieldAction(action: RapidProFlowExport.Action) {
        if (action.field && action.field.key) {
            this.contactFields[action.field.key] = action.value;
        }
    }

    private matchCategoryIdForHasAnyWordCase(routerCase: RapidProFlowExport.Case, incomingMsg: string): string {
        let matchStrings = [];
        for (let arg of routerCase.arguments) {
            matchStrings = matchStrings.concat(arg.toLowerCase().split(" "));
        }
        for (let matchString of matchStrings) {
            if (incomingMsg.toLowerCase() === matchString) {
                return routerCase.category_uuid;
            }
        }
    }

    private getNodeById(uuid: string) {
        return this.nodesById[uuid];
    }

    public sendMessage(msg: string) {
        this.incomingMsg = msg;
        if (this.incomingMsgCallback) {
            this.incomingMsgCallback(msg);
            console.log("Calling of callback");
        }
        return of(true);
    }

}