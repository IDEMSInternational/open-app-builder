import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatActionService } from 'src/app/feature/chat/chat-service/common/chat-action.service';
import { ChatAction, ChatActionType } from 'src/app/feature/chat/chat-service/common/chat-actions';

@Component({
  selector: 'plh-chat-action',
  templateUrl: './chat-action.component.html',
  styleUrls: ['./chat-action.component.scss'],
})
export class ChatActionComponent implements OnInit {

  actionType: string;
  actionJSON: string;
  executionStatus: "in_progress" | "success" | "failure" = "in_progress";
  debugMsg: string;

  constructor(private chatActionService: ChatActionService, private route: ActivatedRoute) {
    this.getActionFromParams()
      .then((action) => {
        this.actionType = action.type;
        this.actionJSON = JSON.stringify(action);
        this.chatActionService.executeChatAction(action).then(() => {
          this.executionStatus = "success";
        }, (err) => {
          this.executionStatus = "failure";
          this.debugMsg = "Failed: " + err;
        });
      }, (err) => {
        this.debugMsg = "Failed to create action: " + err;
      });
  }

  async getActionFromParams(): Promise<ChatAction> {
    const actionType = this.route.snapshot.paramMap.get("actionType");
    if (actionType && ChatActionType[actionType]) {
      const action: ChatAction = {
        type: actionType as ChatActionType,
        executed: false,
        params: this.route.snapshot.queryParams
      };
      return action;
    } else {
      throw "No chat action with type " + actionType;
    }
  }

  ngOnInit() { }

}
