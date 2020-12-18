import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { RemindersService } from "src/app/shared/services/reminders/reminders.service";
import {
  IFlowTaskAction,
  TaskActionService,
} from "src/app/shared/services/task/task-action.service";
import { ChatAction } from "../../models";
import { URLParts } from "../../utils/message.converter";

@Injectable({
  providedIn: "root",
})
export class ChatActionService {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private remindersService: RemindersService,
    private modalCtrl: ModalController,
    private taskActionService: TaskActionService
  ) {}

  /**
   *  Record specific interactions or actions to the database
   */
  public async logActionToDB(action: IFlowTaskAction) {
    this.taskActionService.recordFlowTaskAction(action);
  }

  public async executeChatAction(action: ChatAction) {
    console.log(`%cChatAction: ${action.type}`, "color: #9c9c9c");
    switch (action.type) {
      case "UNLOCK_TOOLBOX_TOPIC":
        return this.unlockToolboxTopic(action.params);
      case "NAVIGATE":
        return this.navigate(action.params as any);
      case "FINISH_WELCOME":
        return this.localStorageService.setBoolean("welcome_finished", true);
      case "CREATE_REMINDER":
        return this.createReminder(action.params);
      default:
        return;
    }
  }

  private unlockToolboxTopic(paramMap: { [key: string]: string }) {
    console.error("TODO - toolbox unlocking");
    // if (paramMap.topic) {
    //   let matchingTopic = toolboxTopicNames.find((topic) => topic.type === paramMap.topic);
    //   if (matchingTopic) {
    //     this.toolboxService.unlockTopic(paramMap.topic as ToolboxTopicType);
    //   }
    // }
  }

  private createReminder(paramMap: { [key: string]: string }) {
    const now = new Date();

    // If no due parameter set to 24 hours from now
    let due = new Date(now.getTime() + 24 * 3600000);
    if (paramMap["due"]) {
      due = new Date(paramMap["due"]);
    }
    const reminder = {
      _created: now.toISOString(),
      _modified: now.toISOString(),
      due: due.toISOString(),
      type: paramMap["type"],
      complete: false,
      data: {},
      notify: paramMap["notify"] === "true",
      repeats: null,
      notifications: [],
    };
    this.remindersService.setReminder(reminder as any);
  }

  private navigate(urlParts: URLParts) {
    let url = urlParts.path;
    if (urlParts.query) {
      url += "?" + urlParts.query;
    }
    if (urlParts.fragment) {
      url += "#" + urlParts.fragment;
    }
    this.router.navigateByUrl(url);
    // close modal if open
    this.modalCtrl.getTop().then((modal) => {
      if (modal) {
        this.modalCtrl.dismiss();
      }
    });
  }
}
