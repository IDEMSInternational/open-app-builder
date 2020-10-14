import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { toolboxTopicNames } from './toolbox-topics';
import { ToolboxTopic } from './toolbox.model';

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  constructor() { }

  getTopics(): Observable<ToolboxTopic[]> {
    let toolboxTopics: ToolboxTopic[] = toolboxTopicNames
      .map((topic) => ({ ...topic, unlocked: false, pages: [] }))
    return of(toolboxTopics);
  }

}
