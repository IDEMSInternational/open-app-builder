import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { SettingsService } from "src/app/pages/settings/settings.service";
import { ChatMessage, IChatService } from "../../models";
import { RapidProOfflineFlow } from "./chat.flow";
import { ContactFieldService } from "./contact-field.service";
import { RapidProFlowExport } from "./rapid-pro-export.model";
import { CONVERSATION } from "src/app/shared/services/data/data.service";
import { throwError } from 'rxjs';

const FLOW_EXPORTS_PATH = "assets/rapid-pro-flow-exports/idems-plh-app-2020-11-25.json";

export type FlowStatusChange = {
  name: string;
  uuid: string;
  status: "start" | "completed" | "expired";
};

@Injectable({
  providedIn: "root",
})
export class OfflineChatService implements IChatService {
  type: "offline" = "offline";
  private rpFlowsByName: { [flowName: string]: RapidProFlowExport.Flow } = {};
  private flowsStack: RapidProOfflineFlow[] = [];
  public flowStatus$ = new BehaviorSubject<FlowStatusChange[]>([]);
  private ready$ = new BehaviorSubject<boolean>(false);
  public messages$ = new BehaviorSubject<ChatMessage[]>([]);
  public botTyping$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected http: HttpClient,
    protected contactFieldService: ContactFieldService,
    protected settingsService: SettingsService
  ) {
    this.init();
  }

  /** Provide a promise that can be used to notify components when initialisation has been completed */
  async ready() {
    return this.ready$.pipe(takeWhile((isReady) => isReady === false)).toPromise();
  }

  private init() {
    this.loadFlowData();
    this.settingsService
      .getUserSetting("USE_GDRIVE_CONTENT")
      .subscribe(async (useGDriveContent) => {
        let flowExportsPath = FLOW_EXPORTS_PATH;
        if (useGDriveContent === "true") {
          flowExportsPath = "https://plh-demo1.idems.international/sheet-content/flow-export.json";
          await this.loadExportFile(flowExportsPath);
        }

        this.subscribeToFlowStatusChanges();
        this.ready$.next(true);
      });
  }

  /** Load the list of all flows defined as type 'conversation' within the hardcoded data ts file */
  private loadFlowData() {
    CONVERSATION.forEach((c) => {
      c.flows.forEach((flow) => (this.rpFlowsByName[flow.name] = flow));
    });
  }

  /**
   * Start a flow listed in the offline flow cache via it's name property
   * @param flowName the name of a flow as specified in the flow json
   */
  public startFlowByName(flowName: string) {
    this.messages$ = new BehaviorSubject([]);
    const flow = this.rpFlowsByName[flowName];
    if (flow) {
      const { name, uuid } = flow;
      const status: FlowStatusChange = { name, uuid, status: "start" };
      // Flow starting is handled below via flowStatusChanges subscription
      this.flowStatus$.next([...this.flowStatus$.value, status]);
    } else {
      console.error("flow does not exist", flowName, this.rpFlowsByName);
    }
  }

  public async getFlowNames(): Promise<string[]> {
    await this.ready();
    return Object.keys(this.rpFlowsByName);
  }

  public sendMessage(message: ChatMessage): Observable<any> {
    if (this.flowsStack.length > 0) {
      let currentFlow = this.flowsStack[this.flowsStack.length - 1];
      console.log("Sending message to current flow ", message, currentFlow.name);
      return currentFlow.sendMessage(message);
    } else {
      return throwError("No active flows to send a message to");
    }
  }

  /**
   * It is common that one flow may trigger another flow. These events are captured in flowStatus$ changes,
   * subscribe and trigger new flow starts when this happens
   */
  private subscribeToFlowStatusChanges() {
    this.flowStatus$.subscribe((events) => {
      console.log("Flow status change", events);
      if (events.length > 0) {
        console.log("Flows stack before ", this.flowsStack);
        let latest = events[events.length - 1];
        if (latest.status === "start") {
          const flow = this.rpFlowsByName[latest.name];
          console.log(`%c${flow.name} START`, "background: white; color: green");
          let newFlow = new RapidProOfflineFlow(
            flow,
            this.messages$,
            this.flowStatus$,
            this.contactFieldService,
            this.botTyping$
          );
          this.flowsStack.push(newFlow);
          this.settingsService.getUserSetting("CHAT_DELAY").subscribe((delay) => {
            newFlow.sendMessageDelay = Number.parseInt(delay);
          });
          newFlow.start();
        }
        if (latest.status === "completed") {
          if (this.flowsStack.length > 0) {
            this.flowsStack.pop();
            let currentFlow = this.flowsStack[this.flowsStack.length - 1];
            currentFlow.continue("completed");
          } else {
            console.log("We have reached the end of all active flows");
          }
        }
        console.log("Flows stack after ", this.flowsStack);
      }
    });
  }

  /**
   * Offline flows are stored in json files. Load a file and all the flows represented in it
   * @param exportFilePath assets path with json to load
   */
  private async loadExportFile(exportFilePath: string) {
    const res = (await this.http.get(exportFilePath).toPromise()) as RapidProFlowExport.RootObject;
    if (res.flows && res.flows.length > 0) {
      for (let flow of res.flows) {
        this.rpFlowsByName[flow.name] = flow;
      }
    } else {
      console.warn("No flows in export file ", exportFilePath);
    }
  }
}
