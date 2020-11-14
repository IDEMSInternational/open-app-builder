import { Component, ChangeDetectorRef } from "@angular/core";
import { AnimationOptions } from "ngx-lottie";
import { IRapidProMessage } from 'src/app/shared/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessage, ChatResponseOption, ResponseCustomAction } from 'src/app/feature/chat/chat-service/chat-msg.model';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/feature/chat/chat-service/chat.service';
import { ChatTriggerPhrase } from 'src/app/feature/chat/chat-service/chat.triggers';
import { ChatActionService } from 'src/app/feature/chat/chat-service/common/chat-action.service';
import { first } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage {
  messages: ChatMessage[] = [];
  allMessages: ChatMessage[] = [];
  responseOptions: ChatResponseOption[] = [];

  lastReceivedMsg: ChatMessage;

  botBlobState:
    | "walking-in"
    | "walking-out"
    | "talking"
    | "run-in"
    | "still"
    | "absent" = "walking-in";
  backgroundBlobVisible: boolean = false;
  botAnimOptions: AnimationOptions = {
    loop: false,
    path: "/assets/lottie-animations/Walk_In_Entrance_Pass_v2.json",
  };

  // Used for getting estimates of number of messages sent automatically
  autoReplyEnabled: boolean = false;
  autoReplyDelay = 500;
  autoReplyWord = "N";
  autoRepeatPhrase = "Repeat simulation";
  autoEndPhrase = "THE END";

  messagesSent: number = 0;
  messagesReceived: number = 0;
  debugMsg: string = "testing???";

  sentResponsesByMessage: { [messageText: string]: string[] } = {};

  triggerPhrase: ChatTriggerPhrase = ChatTriggerPhrase.GUIDE_START;

  scrollingInterval: any;

  inputValue: string = "";

  showingAllMessages = true;

  character: "guide" | "egg" = "guide";
  messageSubscription: Subscription;

  chatViewType: "normal" | "story" = "normal";

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private chatActionService: ChatActionService,
    private localStorageService: LocalStorageService
  ) {
  }

  ionViewDidEnter() {
    console.log("ion did enter");
    this.allMessages = [];
    this.messages = [];
    this.cd.detectChanges();

    this.route.queryParams.pipe(first()).subscribe(params => {
      if (params["character"] && params["character"] === "egg") {
        this.character = "egg";
        this.triggerPhrase = ChatTriggerPhrase.EGG_CHARACTER_START;
      } else {
        this.triggerPhrase = ChatTriggerPhrase.GUIDE_START;
        this.character = "guide";
      }

      if (params.trigger) {
        this.triggerPhrase = params.trigger;
      }

      if (this.messageSubscription) {
        this.messageSubscription.unsubscribe();
      }
      this.chatService.runTrigger({ phrase: this.triggerPhrase }).subscribe((messages$) => {
        console.log("Ran trigger ", this.triggerPhrase);
        this.messageSubscription = messages$
          .asObservable()
          .subscribe((messages) => {
            console.log("from chat service ", messages);
            if (messages.length > 0) {
              const latestMessage = messages[messages.length - 1];
              if (latestMessage.actions && latestMessage.actions.length > 0) {
                for (let action of latestMessage.actions) {
                  this.chatActionService.executeChatAction(action);
                }
              }
              this.onNewMessage(latestMessage);
            }
          });
      });
    });
  }

  ionViewDidLeave() {
    console.log("ion leave");
    this.messageSubscription.unsubscribe();
    this.allMessages = [];
    this.messages = [];
    this.cd.detectChanges();
  }

  onNewMessage(message: ChatMessage) {
    console.log(
      "Got to the bit where I do something with the messages!",
      message
    );
    message.dateReceived = new Date();
    this.lastReceivedMsg = message;
    if (message.isStory) {
      this.chatViewType = "story";
    } else {
      this.chatViewType = "normal";
      this.allMessages.push(message);

      if (this.showingAllMessages) {
        this.messages = this.allMessages;
      } else {
        this.messages = this.allMessages.slice(this.allMessages.length - 2);
      }
    }
    if (message.sender === "bot") {
      this.responseOptions = message.responseOptions
        ? message.responseOptions
        : [];
    } else {
      this.responseOptions = [];
    }
    this.cd.detectChanges();
  }

  doCustomResponseAction(action: ResponseCustomAction) {
    if (action === "bot-leave") {
      this.botAnimOptions = {
        loop: false,
        path: "/assets/lottie-animations/Walk_Out_Exit_Pass_v2.json",
      };
      this.botBlobState = "walking-out";
      setTimeout(() => (this.botBlobState = "absent"), 4200);
    } else if (action === "bot-run-back") {
      this.botBlobState = "run-in";
      this.botAnimOptions = {
        loop: false,
        path: "/assets/lottie-animations/Run_In_Entrance_Pass_v2.json",
      };
      setTimeout(() => (this.botBlobState = "still"), 3200);
    } else if (action === "bot-walk-back") {
      this.botBlobState = "walking-in";
      this.botAnimOptions = {
        loop: false,
        path: "/assets/lottie-animations/Walk_In_Entrance_Pass_v2.json",
      };
      setTimeout(() => (this.botBlobState = "still"), 3200);
    }
  }

  onInputSubmit(event: any) {
    this.sendCustomOption(this.inputValue);
    this.inputValue = "";
  }

  sendCustomOption(text: string) {
    this.onNewMessage({
      text: text,
      sender: "user",
    });
    this.chatService.sendMessage({
      sender: "user",
      text: text
    });
    this.messagesSent += 1;
  }

  selectResponseOption(option: ChatResponseOption) {
    console.log("Selected option", option);
    if (option.customAction) {
      this.doCustomResponseAction(option.customAction);
    }
    this.onNewMessage({
      text: option.text,
      sender: "user",
    });
    this.chatService.sendMessage({
      sender: "user",
      text: option.text
    });
    this.messagesSent += 1;

  }

  toggleShowAllMessages() {
    if (this.showingAllMessages) {
      this.messages = this.allMessages.slice(this.allMessages.length - 2);
      this.showingAllMessages = false;
    } else {
      this.messages = this.allMessages;
      this.showingAllMessages = true;
    }
  }

  stringify(obj: any) {
    return JSON.stringify(obj);
  }

  skipWelcome() {
    this.localStorageService.setBoolean("welcome_skipped", true);
    this.router.navigateByUrl("/home");
  }

  sameAsLastCharacter(currentMsg: ChatMessage, prevMsg: ChatMessage) {
    if (prevMsg) {
      return currentMsg.character === prevMsg.character;
    }
    return false;
  }

  onStoryNextClicked() {
    this.chatService.sendMessage({
      sender: "user",
      text: "Next"
    });
  }

  onStoryPreviousClicked() {
    this.chatService.sendMessage({
      sender: "user",
      text: "Previous"
    });
  }
}
