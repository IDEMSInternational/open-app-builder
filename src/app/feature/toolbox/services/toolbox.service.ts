import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { toolboxTopicNames } from "../data/toolbox-topic-metadata";
import { ToolboxTopicMetadata, ToolboxTopicType, ToolboxTip } from "../models/toolbox.model";
import { TIPS } from "src/app/shared/services/data/data.service";

const UNLOCKED_TOPICS_LS_KEY = "toolbox.unlocked_topics";

@Injectable({
  providedIn: "root",
})
export class ToolboxService {
  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    localStorageService.setJSON(UNLOCKED_TOPICS_LS_KEY, { ONE_ON_ONE_TIME: true });
  }

  getTopicMetadatas(): Observable<ToolboxTopicMetadata[]> {
    let toolboxTopicMetadatas: ToolboxTopicMetadata[] = toolboxTopicNames.map((topic) => ({
      ...topic,
      unlocked: this.isTopicUnlocked(topic.type),
    }));
    return of(toolboxTopicMetadatas);
  }

  isTopicUnlocked(type: ToolboxTopicType) {
    let unlockedTopicMap: Object = this.localStorageService.getJSON(UNLOCKED_TOPICS_LS_KEY);
    if (unlockedTopicMap) {
      return unlockedTopicMap.hasOwnProperty(type);
    }
    return false;
  }

  unlockTopic(type: ToolboxTopicType) {
    let unlockedTopicMap: Object = this.localStorageService.getJSON(UNLOCKED_TOPICS_LS_KEY);
    if (!unlockedTopicMap) {
      unlockedTopicMap = {};
    }
    unlockedTopicMap[type] = true;
    return this.localStorageService.setJSON(UNLOCKED_TOPICS_LS_KEY, unlockedTopicMap);
  }

  getTips(): Observable<ToolboxTip[]> {
    let toolboxTipsData = TIPS as ToolboxTip[];
    console.log(toolboxTipsData);
    return of(toolboxTipsData);
  }

  getModules(ModuleName: string): Observable<ToolboxTip[]> {
    let toolboxTipsData = TIPS as ToolboxTip[];
    let toolboxModules = toolboxTipsData.filter((tip) => {
      return tip.module === ModuleName;
    });
    return of(toolboxModules);
  }
  getFlows(FlowName: string): Observable<ToolboxTip> {
    let toolboxTipsData = TIPS as ToolboxTip[];

    // using Array.find assuming that they can only be one flow item
    let moduleFlows = toolboxTipsData.find((tip) => {
      return tip.flow_name === FlowName;
    });
    return of(moduleFlows);
  }
}
