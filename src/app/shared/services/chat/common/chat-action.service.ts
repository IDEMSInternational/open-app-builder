import { Injectable } from '@angular/core';
import { toolboxTopicNames } from '../../toolbox/toolbox-topic-metadata';
import { ToolboxTopicType } from '../../toolbox/toolbox.model';
import { ToolboxService } from '../../toolbox/toolbox.service';
import { ChatAction } from './chat-actions';

@Injectable({
  providedIn: 'root'
})
export class ChatActionService {

  constructor(private toolboxService: ToolboxService) { }

  public async executeChatAction(action: ChatAction) {
    switch (action.type) {
      case "UNLOCK_TOOLBOX_TOPIC": return this.unlockToolboxTopic(action.params);
      default: return;
    }
  }

  unlockToolboxTopic(paramMap: { [key: string]: string}) {
    if (paramMap.topic) {
      let matchingTopic = toolboxTopicNames.find((topic) => topic.type === paramMap.topic);
      if (matchingTopic) {
        this.toolboxService.unlockTopic(paramMap.topic as ToolboxTopicType);
      }
    }
  }
}
