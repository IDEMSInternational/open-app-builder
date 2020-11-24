import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { oneOnOneTimeElements } from './one-one-one-time';
import { toolboxTopicNames } from './toolbox-topic-metadata';
import { ToolboxElement, ToolboxExport, ToolboxTopic, ToolboxTopicMetadata, ToolboxTopicType } from './toolbox.model';

const UNLOCKED_TOPICS_LS_KEY = "toolbox.unlocked_topics";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {



  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    localStorageService.setJSON(UNLOCKED_TOPICS_LS_KEY, {"ONE_ON_ONE_TIME":true});
  }

  getTopicMetadatas(): Observable<ToolboxTopicMetadata[]> {
    let toolboxTopicMetadatas: ToolboxTopicMetadata[] = toolboxTopicNames
      .map((topic) => ({ ...topic, unlocked: this.isTopicUnlocked(topic.type) }));
    return of(toolboxTopicMetadatas);
  }

  public getTopic(type: ToolboxTopicType): Observable<ToolboxTopic> {
    let topicMetadata: ToolboxTopicMetadata = toolboxTopicNames
      .map((topicMetadata) => ({ ...topicMetadata, unlocked: false }))
      .find((topicMetadata) => topicMetadata.type === type);

    return this.http.get("assets/sheet-content/toolbox-export.json").pipe(map((exportObject: ToolboxExport) => {
      console.log("Toolbox export", exportObject);
      let exportTopic = exportObject.topics.find((topic) => topic.metadata.type === topicMetadata.type);
      if (exportTopic) {
        exportTopic.metadata = topicMetadata;
        return exportTopic;
      } else {
        return {
          metadata: topicMetadata,
          contentSections: []
        };
      }
    }));
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
