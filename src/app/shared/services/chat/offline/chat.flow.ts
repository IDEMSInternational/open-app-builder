import { Observable, of, BehaviorSubject } from 'rxjs';
import { ChatMessage, ChatResponseOption } from '../chat-msg.model';
import { FlowStatusChange } from './offline-chat.service';
import { RapidProFlowExport } from './rapid-pro-export.model';

export interface ChatFlow {
    sendMessage(msg: ChatMessage): Observable<any>;
    messages$: BehaviorSubject<ChatMessage[]>;
    flowStatus$: BehaviorSubject<FlowStatusChange[]>;
}

export class RapidProOfflineFlow implements ChatFlow {

    name: string;
    nodesById: { [nodeUUID: string]: RapidProFlowExport.Node } = {};
    currentNode: RapidProFlowExport.Node;
    childFlowId: string = null;

    constructor(protected flowObject: RapidProFlowExport.Flow, public messages$: BehaviorSubject<ChatMessage[]>,
        public flowStatus$: BehaviorSubject<FlowStatusChange[]>, public contactFields: { [field: string]: string }) {
        console.log("Export object!", flowObject);
        this.name = flowObject.name;
        this.flowObject.nodes.forEach((node) => {
            this.nodesById[node.uuid] = node;
        });
        this.flowStatus$.subscribe((flowStatusChanges) => {
            if (flowStatusChanges.length > 0) {
                let latest = flowStatusChanges[flowStatusChanges.length - 1];
                if (this.flowObject.uuid === latest.flowId && latest.status === "start") {
                    console.log("Entered node by status change sub");
                    this.enterNode(this.flowObject.nodes[0]);
                }
            }
        });
    }

    private enterNode(node: RapidProFlowExport.Node) {
        this.currentNode = node;
        console.log("Entered node ", node.uuid, node);
        for (let action of node.actions) {
            if (action.type === "enter_flow") {
                if (action.flow) {
                    this.childFlowId = action.flow.uuid;
                    let flowEvents = this.flowStatus$.getValue();
                    if (flowEvents.length > 0) {
                        let latest = flowEvents[flowEvents.length - 1];
                        if (latest.flowId !== action.flow.uuid) {
                            flowEvents.push({
                                flowId: action.flow.uuid,
                                status: "start"
                            });
                            this.flowStatus$.next(flowEvents);
                        }
                    }
                } else {
                    console.error("Action was to enter_flow however no object for which flow to enter");
                }
            }
            if (action.type === "send_msg" && action.text) {
                this.doSendMessageAction(action);
            }
            if (action.type === "set_contact_field") {
                this.doSetContactFieldAction(action);
            }
        }
        if (!node.router) {
            let firstExitWithDestination = node.exits
                .filter((exit) => exit.destination_uuid)[0];
            if (firstExitWithDestination) {
                console.log("Entered node by exiting from node with no router")
                this.enterNode(this.getNodeById(firstExitWithDestination.destination_uuid));
            } else {
                let flowEvents = this.flowStatus$.getValue();
                flowEvents.push({
                    flowId: this.flowObject.uuid,
                    status: "completed"
                });
                this.flowStatus$.next(flowEvents);
            }
        } else {
            console.log("Router here?");
            if (node.router.operand.indexOf("@input.") < 0) {
                this.useRouter(node);
            }
        }
    }

    private useUserInputRouter(node: RapidProFlowExport.Node, incomingMsg: string) {
        let matchingCategoryId: string;
        for (let routerCase of node.router.cases) {
            let matchesCase: boolean = false;
            if (routerCase.type === "has_any_word") {
                matchesCase = this.matchHasAnyWordCase(routerCase, incomingMsg);
            } else if (routerCase.type === "has_number_between") {
                matchesCase = this.matchHasNumberBetweenCase(routerCase, incomingMsg);
            } else if (routerCase.type === "has_number_lt") {
                matchesCase = this.matchHasNumberLessThanCase(routerCase, incomingMsg);
            } else if (routerCase.type === "has_number_gt") {
                matchesCase = this.matchHasNumberGreaterThanCase(routerCase, incomingMsg);
            }
            if (matchesCase) {
                matchingCategoryId = routerCase.category_uuid;
                break;
            }
        }
        if (matchingCategoryId) {
            this.exitUsingCategoryId(node, matchingCategoryId);
        } else {
            console.warn("Nothing matches :(");
        }
    }

    private useRouter(node: RapidProFlowExport.Node) {
        if (node.router.operand === "@child.run.status") {
            for (let routerCase of node.router.cases) {
                if (routerCase.arguments && routerCase.arguments[0]) {
                    let subscription = this.flowStatus$.subscribe((flowEvents) => {
                        if (flowEvents.length > 0) {
                            let latest = flowEvents[flowEvents.length - 1];
                            if (latest.status === routerCase.arguments[0] && latest.flowId === this.childFlowId) {
                                subscription.unsubscribe();
                                this.childFlowId = null;
                                this.exitUsingCategoryId(node, routerCase.category_uuid);
                            }
                        }
                    });
                }
            }
        }
    }

    private exitUsingCategoryId(node: RapidProFlowExport.Node, matchingCategoryId: string) {
        let matchingCategory = node.router.categories.find((cat) => cat.uuid === matchingCategoryId);
        let matchingExit = node.exits.find((exit) => exit.uuid === matchingCategory.exit_uuid);
        console.log("Entered node via router category ", matchingCategory);
        this.enterNode(this.getNodeById(matchingExit.destination_uuid));
    }

    private matchHasNumberGreaterThanCase(routerCase: RapidProFlowExport.RouterCase, incomingMsg: string): boolean {
        let min = Number.parseFloat(routerCase.arguments[0]);
        let inputNumber = Number.parseFloat(incomingMsg);
        return (min !== NaN && inputNumber !== NaN && inputNumber > min);
    }

    private matchHasNumberLessThanCase(routerCase: RapidProFlowExport.RouterCase, incomingMsg: string): boolean {
        let max = Number.parseFloat(routerCase.arguments[0]);
        let inputNumber = Number.parseFloat(incomingMsg);
        return (max !== NaN && inputNumber !== NaN && inputNumber < max);
    }

    private matchHasNumberBetweenCase(routerCase: RapidProFlowExport.RouterCase, incomingMsg: string): boolean {
        let rangeNumbers = routerCase.arguments.map((arg) => Number.parseFloat(arg)).sort((a, b) => a - b);
        let inputNumber = Number.parseFloat(incomingMsg);
        if (rangeNumbers[0] !== NaN && rangeNumbers[1] !== NaN && inputNumber !== NaN) {
            if (inputNumber > rangeNumbers[0] && inputNumber < rangeNumbers[1]) {
                return true;
            }
        }
        return false;
    }

    private matchHasAnyWordCase(routerCase: RapidProFlowExport.RouterCase, incomingMsg: string): boolean {
        let matchStrings = [];
        for (let arg of routerCase.arguments) {
            matchStrings = matchStrings.concat(arg.toLowerCase().split(" "));
        }
        for (let matchString of matchStrings) {
            if (incomingMsg.toLowerCase() === matchString) {
                return true;
            }
        }
    }

    private doSendMessageAction(action: RapidProFlowExport.Action) {
        let text = action.text;
        let responseOptions: ChatResponseOption[] = [];
        if (action.quick_replies) {
            responseOptions = action.quick_replies.map((quickReply) => ({
                text: quickReply
            }));
        }
        let messages = this.messages$.getValue();
        messages.push({
            sender: "bot",
            text: text,
            responseOptions: responseOptions
        })
        this.messages$.next(messages);
    }

    private doSetContactFieldAction(action: RapidProFlowExport.Action) {
        if (action.field && action.field.key) {
            this.contactFields[action.field.key] = action.value;
            console.log("Contact field update ", action.field.key, action.value);
        }
    }

    private getNodeById(uuid: string) {
        return this.nodesById[uuid];
    }

    public sendMessage(msg: ChatMessage) {
        this.useUserInputRouter(this.currentNode, msg.text);
        return of(true);
    }

}