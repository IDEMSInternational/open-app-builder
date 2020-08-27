import { Subject, Observable, of } from 'rxjs';
import { IRapidProMessage } from './chat.service';

export interface ChatFlow {
    sendMessage(msg: string): Observable<any>;
    messageSubject: Subject<IRapidProMessage>;
}

export class RapidProOfflineFlow implements ChatFlow {

    flowObject: RapidProFlowExport.Flow;
    nodesById: { [nodeUUID: string]: RapidProFlowExport.Node } = {};
    currentNode: RapidProFlowExport.Node;
    incomingSubject: Subject<string> = new Subject();

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
            if (action.type === "send_msg" && action.text) {
                let text = action.text;
                this.messageSubject.next({
                    message: text,
                    body: text,
                    message_id: this.flowObject.nodes[0].actions[0].uuid,
                    title: this.flowObject.name,
                    type: "rapidpro",
                    wasTapped: false,
                    quick_replies: action.quick_replies ? JSON.stringify(action.quick_replies) : "[]"
                });
            }
        }
        if (!node.router) {
            for (let exit of node.exits) {
                this.enterNode(this.getNodeById(exit.destination_uuid), lastUserMsg);
            }
        } else {
            console.log("Router here?");
            this.incomingSubject.subscribe((incomingMsg) => {
                this.incomingSubject = new Subject();
                let matchingCategoryId: string;
                for (let routerCase of node.router.cases) {
                    debugger;
                    let caseResultCatId;
                    if (routerCase.type === "has_any_word") {
                        caseResultCatId = this.matchCategoryIdForHasAnyWordCase(routerCase, incomingMsg);
                    } else if (routerCase.type === "has_number_between") {
                        //
                    }
                    if (caseResultCatId) {
                        matchingCategoryId = caseResultCatId;
                        break;
                    }
                }
                if (matchingCategoryId) {
                    let exit = node.exits.find((exit) => exit.uuid === matchingCategoryId);
                    this.enterNode(this.getNodeById(exit.destination_uuid), incomingMsg);
                } else {
                    console.warn("Nothing matches :(");
                }
            });
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
        this.incomingSubject.next(msg);
        return of(true);
    }

}