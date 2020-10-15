import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { oneOnOneTimeElements } from './one-one-one-time';
import { toolboxTopicNames } from './toolbox-topic-metadata';
import { ToolboxElement, ToolboxTopic, ToolboxTopicMetadata, ToolboxTopicType } from './toolbox.model';

const UNLOCKED_TOPICS_LS_KEY = "toolbox.unlocked_topics";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  

  constructor(private localStorageService: LocalStorageService) { }

  getTopicMetadatas(): Observable<ToolboxTopicMetadata[]> {
    let toolboxTopicMetadatas: ToolboxTopicMetadata[] = toolboxTopicNames
      .map((topic) => ({ ...topic, unlocked: this.isTopicUnlocked(topic.type) }));
    return of(toolboxTopicMetadatas);
  }

  getTopic(type: ToolboxTopicType): Observable<ToolboxTopic> {
    let topicMetadata: ToolboxTopicMetadata = toolboxTopicNames
      .map((topicMetadata) => ({ ...topicMetadata, unlocked: false }))
      .find((topicMetadata) => topicMetadata.type === type)
    if (topicMetadata.type === "ONE_ON_ONE_TIME") {
      
      return of({
        metadata: topicMetadata,
        contentSections: [
          {
            title: "One on One Time Tips",
            elements: oneOnOneTimeElements
          }
        ]
      });
    }
    return of({
      metadata: topicMetadata,
      contentSections: []
    });
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

}
