import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { toolboxTopicNames } from '../../toolbox/toolbox-topic-metadata';
import { ToolboxTopicType } from '../../toolbox/toolbox.model';
import { ToolboxService } from '../../toolbox/toolbox.service';
import { URLParts } from '../message.converter';
import { ChatAction } from './chat-actions';

@Injectable({
  providedIn: 'root'
})
export class ChatActionService {

  constructor(private toolboxService: ToolboxService, private router: Router, private localStorageService: LocalStorageService) { }

  public async executeChatAction(action: ChatAction) {
    switch (action.type) {
      case "UNLOCK_TOOLBOX_TOPIC": return this.unlockToolboxTopic(action.params);
      case "NAVIGATE": return this.navigate(action.params as any);
      case "FINISH_WELCOME": return this.localStorageService.setBoolean("welcome_finished", true);
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

  navigate(urlParts: URLParts) {
    console.log("NAVIGATE??", urlParts);
    let url = urlParts.path;
    if (urlParts.query) {
      url += "?" + urlParts.query;
    }
    this.router.navigateByUrl(url);
  }
}
