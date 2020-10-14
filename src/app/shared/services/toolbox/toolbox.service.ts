import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { toolboxTopicNames } from './toolbox-topic-metadata';
import { ToolboxTopic, ToolboxTopicMetadata, ToolboxTopicType } from './toolbox.model';

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  constructor() { }

  getTopicMetadatas(): Observable<ToolboxTopicMetadata[]> {
    let toolboxTopicMetadatas: ToolboxTopicMetadata[] = toolboxTopicNames
      .map((topic) => ({ ...topic, unlocked: false }));
    return of(toolboxTopicMetadatas);
  }

  getTopic(type: ToolboxTopicType): Observable<ToolboxTopic> {
    let topicMetadata: ToolboxTopicMetadata = toolboxTopicNames
      .map((topicMetadata) => ({ ...topicMetadata, unlocked: false }))
      .find((topicMetadata) => topicMetadata.type === type)
    return of({
      metadata: topicMetadata,
      contentSections: []
    });
  }

}
