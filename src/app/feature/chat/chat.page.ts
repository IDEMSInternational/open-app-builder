import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  ChatMessage,
  ChatResponseOption,
  ResponseCustomAction,
  mockMessageGenerator,
} from "./message.model";
import { AnimationOptions } from "ngx-lottie";
import { IonContent } from "@ionic/angular";
import { ChatService, IRapidProMessage } from './chat-service/chat.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  messages: ChatMessage[] = [];
  allMessages: ChatMessage[] = [];
  responseOptions: ChatResponseOption[] = [];

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

  triggerMessage: string = "plh_simulation";

  @ViewChild("messagesContent")
  private messagesContent: IonContent;
  scrollingInterval: any;

  inputValue: string = "";

  showingAllMessages = false;

  character: "guide" | "egg" = "guide";

  constructor(
    private cd: ChangeDetectorRef,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params["character"] && params["character"] === "egg") {
        this.character = "egg";
      } else {
        this.character = "guide";
      }
      setTimeout(() => {
        let triggerMessage = this.character === "guide" ? "guide" : "chat";
        this.notificationService.sendRapidproMessage(triggerMessage);
        this.botBlobState = "still";
      }, 3000);
    });
    this.notificationService.messages$
      .asObservable()
      .subscribe((messages) => {
        console.log("from rapid pro ", messages);
        if (messages.length > 0) {
          this.onReceiveRapidProMessage(messages[messages.length - 1]);
        }
      });
  }

  onReceiveRapidProMessage(rapidMsg: IRapidProMessage) {
    this.messagesReceived += 1;
    let chatMsg: ChatMessage = {
      sender: "bot",
      text: rapidMsg.message
    };
    if (rapidMsg.quick_replies) {
      try {
        chatMsg.responseOptions = JSON.parse(rapidMsg.quick_replies).map(
          (word: string) => {
            let responseOption: ChatResponseOption = {
              text: word,
            };
            if (word.toLowerCase().indexOf("help") > -1) {
              responseOption.customAction = "bot-run-back";
            }
            if (word.toLowerCase().indexOf("come back") > -1) {
              responseOption.customAction = "bot-walk-back";
            }
            return responseOption;
          }
        );
      } catch (ex) {
        console.log("Error parsing quick replies", ex);
      }
    }
    if (this.autoReplyEnabled) {
      setTimeout(() => {
        if (rapidMsg.message.toLowerCase().indexOf(this.autoEndPhrase.toLowerCase()) > -1) {
          this.debugMsg = "THE END!!";
        } else if (rapidMsg.message.toLowerCase().indexOf(this.autoRepeatPhrase.toLowerCase()) > -1) {
          this.debugMsg = "repeating...";
          this.notificationService.sendRapidproMessage(this.triggerMessage);
        } else if (rapidMsg.message.toLowerCase().indexOf("sorry, i don't understand") > -1) {
          this.debugMsg = "flow is stuck. repeating...";
          this.notificationService.sendRapidproMessage(this.triggerMessage);
        } else {
          this.debugMsg = "";
          if (chatMsg.responseOptions && chatMsg.responseOptions.length > 0) {
            let responseOption = chatMsg.responseOptions[0];
            if (!this.sentResponsesByMessage[chatMsg.text]) {
              this.sentResponsesByMessage[chatMsg.text] = [];
            } else {
              let unusedResponses = chatMsg.responseOptions
                .filter((option) => this.sentResponsesByMessage[chatMsg.text].indexOf(option.text) < 0);
              if (unusedResponses.length < 1) {
                const responseIndex = Math.floor(Math.random() * chatMsg.responseOptions.length);
                if (chatMsg.responseOptions[responseIndex]) {
                  responseOption = chatMsg.responseOptions[responseIndex];
                } else {
                  responseOption = chatMsg.responseOptions[0];
                }
              } else {
                responseOption = unusedResponses[0];
              }
            }
            this.sentResponsesByMessage[chatMsg.text].push(responseOption.text);
            this.selectResponseOption(responseOption);
          } else {
            this.debugMsg = "auto reply: N";
            this.sendCustomOption(this.autoReplyWord);
          }
        }
      }, this.autoReplyDelay);
    }
    setTimeout(() => {
      this.onReceiveMessage(chatMsg);
    });
  }

  onReceiveMessage(message: ChatMessage) {
    console.log(
      "Got to the bit where I do something with the messages!",
      message
    );
    message.dateReceived = new Date();
    this.allMessages.push(message);
    if (message.sender === "bot") {
      if (this.botBlobState === "still") {
        setTimeout(() => {
          this.botAnimOptions = {
            path: "assets/lottie-animations/TalkingGesture_Pass_v1.json",
            loop: false,
          };
        });
      }
      this.responseOptions = message.responseOptions
        ? message.responseOptions
        : [];
    } else {
      this.responseOptions = [];
    }
    if (this.showingAllMessages) {
      this.messages = this.allMessages;
    } else {
      this.messages = this.allMessages.slice(this.allMessages.length - 2);
    }
    this.messagesContent.scrollToBottom(2000);
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
    this.notificationService.sendRapidproMessage(text);
    this.messagesSent += 1;
    this.onReceiveMessage({
      text: text,
      sender: "user",
    });
  }

  selectResponseOption(option: ChatResponseOption) {
    console.log("Selected option", option);
    if (option.customAction) {
      this.doCustomResponseAction(option.customAction);
    }
    this.notificationService.sendRapidproMessage(option.text);
    this.messagesSent += 1;
    this.onReceiveMessage({
      text: option.text,
      sender: "user",
    });
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
}
