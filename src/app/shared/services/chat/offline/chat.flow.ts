import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChatMessage, ChatResponseOption } from '../chat-msg.model';
import { convertRapidProAttachments } from '../message.converter';
import { ContactFieldService } from './contact-field.service';
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
    running = false;

    flowStepDelay = 200;
    sendMessageDelay = 1000;

    flowResults: { [resultName: string]: string } = {};

    constructor(protected flowObject: RapidProFlowExport.Flow, public messages$: BehaviorSubject<ChatMessage[]>,
        public flowStatus$: BehaviorSubject<FlowStatusChange[]>, public contactFieldService: ContactFieldService) {
        console.log("Export object!", flowObject);
        this.name = flowObject.name;
        this.flowObject.nodes.forEach((node) => {
            this.nodesById[node.uuid] = node;
        });
    }

    public start() {
        if (!this.running) {
            this.running = true;
            this.enterNode(this.flowObject.nodes[0]);
        } else {
            console.warn("Attempted to start flow that is already running ", this.flowObject.name, this.flowObject.uuid);
        }
    }

    public reset() {
        this.running = false;
    }

    private async enterNode(node: RapidProFlowExport.Node) {
        this.currentNode = node;
        console.log("Entered node id ", node.uuid, node);
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
                                flowName: action.flow.name,
                                status: "start"
                            });
                            console.log("Next on BS: child flow");
                            this.flowStatus$.next(flowEvents);
                        }
                    }
                } else {
                    console.error("Action was to enter_flow however no object for which flow to enter");
                }
            }
            if (action.type === "send_msg" && action.text) {
                await this.wait(this.sendMessageDelay);
                this.doSendMessageAction(action);
            }
            if (action.type === "set_contact_field") {
                this.doSetContactFieldAction(action);
            }
            if (action.type === "set_contact_name") {
                this.doSetContactNameAction(action);
            }
        }
        await this.wait();
        if (!node.router) {
            let firstExitWithDestination = node.exits
                .filter((exit) => exit.destination_uuid)[0];
            if (firstExitWithDestination) {
                console.log("Entered node by exiting from node with no router");
                this.enterNode(this.getNodeById(firstExitWithDestination.destination_uuid));
            } else {
                console.log("This should be flow completion")
                let flowEvents = this.flowStatus$.getValue();
                flowEvents.push({
                    flowId: this.flowObject.uuid,
                    flowName: this.flowObject.name,
                    status: "completed"
                });
                this.running = false;
                this.flowStatus$.next(flowEvents);
            }
        } else {
            console.log("Router here?");
            if (node.router.operand.indexOf("@input.") < 0) {
                this.useRouter(node);
            }
        }
    }

    private wait(delay = this.flowStepDelay): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, delay);
        });
    }

    private useUserInputRouter(node: RapidProFlowExport.Node, incomingMsg: string) {
        if (node.router.result_name) {
            this.flowResults[node.router.result_name] = incomingMsg;
        }
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
        } else if (node.router.default_category_uuid) {
            this.exitUsingCategoryId(node, node.router.default_category_uuid);
        } else {
            console.warn("Nothing matches for node ", node.uuid);
        }
    }

    private useRouter(node: RapidProFlowExport.Node) {
        if (node.router.operand === "@child.run.status") {
            for (let routerCase of node.router.cases) {
                if (routerCase.arguments && routerCase.arguments[0] === "completed") {
                    let subscription = this.flowStatus$.subscribe((flowEvents) => {
                        if (flowEvents.length > 0) {
                            let latest = flowEvents[flowEvents.length - 1];
                            if (latest.status === "completed" && latest.flowId === this.childFlowId) {
                                console.log("Returning to parent flow after subflow completion");
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

    private async parseMessageTemplate(template: string): Promise<string> {
        let output: string = "" + template;

        let regexResult: RegExpExecArray;
        // Match Contact fields
        let contactFieldRegex = /@contact\.([\S]*)/gm;
        while ((regexResult = contactFieldRegex.exec(template)) !== null) {
            let fullMatch = regexResult[0];
            let fieldName = regexResult[1];
            output = output.replace(fullMatch, await this.contactFieldService.getContactField(fieldName));
        }

        // Match Result fields
        let resultFieldRegex = /@results\.([\S]*)/gm;
        while ((regexResult = resultFieldRegex.exec(template)) !== null) {
            let fullMatch = regexResult[0];
            let fieldName = regexResult[1];
            output = output.replace(fullMatch, this.flowResults[fieldName]);
        }

        return output;
    }

    private async doSendMessageAction(action: RapidProFlowExport.Action) {
        let responseOptions: ChatResponseOption[] = [];
        if (action.quick_replies) {
            responseOptions = action.quick_replies.map((quickReply) => ({
                text: quickReply
            }));
        }
        const messages = this.messages$.getValue();
        const text = await this.parseMessageTemplate(action.text);
        const attachments = await convertRapidProAttachments(action.attachments);
        const newMessage: ChatMessage = {
            sender: "bot",
            text: text,
            responseOptions: responseOptions,
            attachments: attachments
        };
        messages.push(newMessage);
        this.messages$.next(messages);
    }

    private async doSetContactNameAction(action: RapidProFlowExport.Action) {
        if (action.name) {
            const nameParsed = await this.parseMessageTemplate(action.name);
            this.contactFieldService.setContactField("name", nameParsed);
        }
    }

    private doSetContactFieldAction(action: RapidProFlowExport.Action) {
        if (action.field && action.field.key) {
            this.contactFieldService.setContactField(action.field.key, action.value);
        }
    }

    private getNodeById(uuid: string) {
        return this.nodesById[uuid];
    }

    public sendMessage(msg: ChatMessage) {
        if (this.currentNode && this.currentNode.router && this.currentNode.router.operand === "@input.text") {
            setTimeout(() => this.useUserInputRouter(this.currentNode, msg.text), 1000);
        }
        return of(true);
    }

}