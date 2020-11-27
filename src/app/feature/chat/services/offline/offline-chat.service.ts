import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { SettingsService } from 'src/app/feature/settings/settings.service';
import { ChatMessage, IChatService } from "../../models";
import { RapidProOfflineFlow } from "./chat.flow";
import { ContactFieldService } from "./contact-field.service";
import { RapidProFlowExport } from "./rapid-pro-export.model";

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
  type = "offline";
  private flowsByName: { [flowName: string]: RapidProFlowExport.Flow } = {};
  private currentFlow: RapidProOfflineFlow;
  public flowStatus$ = new BehaviorSubject<FlowStatusChange[]>([]);
  private ready$ = new BehaviorSubject<boolean>(false);
  public messages$ = new BehaviorSubject<ChatMessage[]>([]);
  public botTyping$ = new BehaviorSubject<boolean>(false);

  constructor(protected http: HttpClient, protected contactFieldService: ContactFieldService,
    protected settingsService: SettingsService) {
    this.init();
  }

  /** Provide a promise that can be used to notify components when initialisation has been completed */
  async ready() {
    return this.ready$.pipe(takeWhile((isReady) => isReady === false)).toPromise();
  }

  private async init() {
    await this.loadExportFile(FLOW_EXPORTS_PATH);
    this.subscribeToFlowStatusChanges();
    this.ready$.next(true);
  }

  /**
   * Start a flow listed in the offline flow cache via it's name property
   * @param flowName the name of a flow as specified in the flow json
   */
  public startFlowByName(flowName: string) {
    this.messages$ = new BehaviorSubject([]);
    const flow = this.flowsByName[flowName];
    if (flow) {
      const { name, uuid } = flow;
      const status: FlowStatusChange = { name, uuid, status: "start" };
      // Flow starting is handled below via flowStatusChanges subscription
      this.flowStatus$.next([...this.flowStatus$.value, status]);
    } else {
      console.error("flow does not exist", flowName, this.flowsByName);
      this.currentFlow = undefined;
    }
  }

  public sendMessage(message: ChatMessage): Observable<any> {
    console.log("Sending message to current flow ", message, this.currentFlow.name);
    return this.currentFlow.sendMessage(message);
  }

  /**
   * It is common that one flow may trigger another flow. These events are captured in flowStatus$ changes,
   * subscribe and trigger new flow starts when this happens
   */
  private subscribeToFlowStatusChanges() {
    this.flowStatus$.subscribe((events) => {
      console.log("Flow status change", events);
      if (events.length > 0) {
        let latest = events[events.length - 1];
        if (latest.status === "start") {
          const flow = this.flowsByName[latest.name];
          console.log(`%c${flow.name} START`, "background: white; color: green");
          this.currentFlow = new RapidProOfflineFlow(
            flow,
            this.messages$,
            this.flowStatus$,
            this.contactFieldService,
            this.botTyping$
          );
          this.settingsService.getUserSetting("CHAT_DELAY").subscribe((delay) => {
            this.currentFlow.sendMessageDelay = Number.parseInt(delay);
          });
          this.currentFlow.start();
        }
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
        this.flowsByName[flow.name] = flow;
        
      }
    } else {
      console.warn("No flows in export file ", exportFilePath);
    }
  }
}
