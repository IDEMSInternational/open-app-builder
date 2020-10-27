import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatActionService } from 'src/app/shared/services/chat/common/chat-action.service';
import { ChatAction, ChatActionType } from 'src/app/shared/services/chat/common/chat-actions';

@Component({
  selector: 'plh-chat-action',
  templateUrl: './chat-action.component.html',
  styleUrls: ['./chat-action.component.scss'],
})
export class ChatActionComponent implements OnInit {

  actionType: string;
  params: any;
  executionStatus: "in_progress" | "success" | "failure" = "in_progress";
  debugMsg: string;

  constructor(private chatActionService: ChatActionService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      if (params.type && ChatActionType[params.type]) {
        this.actionType = params.type;
        const action: ChatAction = {
          type: params.type,
          executed: false,
          params: params
        };
        this.chatActionService.executeChatAction(action).then(() => {
          this.executionStatus = "success";
        }, (err) => {
          this.executionStatus = "failure";
          this.debugMsg = "Failed: " + err;
        });
      } else {
        if (params.type) {
          this.debugMsg = "No chat action with type " + params.type;
        } else {
          this.debugMsg = "No chat action type provided."
        }
        
      }
    });
  }

  ngOnInit() {}

  stringify(obj: any) {
    return JSON.stringify(obj);
  }

}
