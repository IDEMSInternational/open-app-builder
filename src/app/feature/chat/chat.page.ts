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
    | "absent";
  backgroundBlobVisible: boolean = false;
  botAnimOptions: AnimationOptions = {
    loop: false,
    path: "/assets/lottie-animations/Walk_In_Entrance_Pass_v2.json",
  };

  @ViewChild("messagesContent", { static: false })
  private messagesContent: IonContent;
  scrollingInterval: any;

  inputValue: string = "";

  showingAllMessages = false;

  constructor(
    private chatService: ChatService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.chatService.messageSubject
      .asObservable()
      .subscribe((msg) => {
        this.onReceiveRapidProMessage(msg);
      });
    setTimeout(() => {
      this.chatService.sendRapidproMessage("start_demo");
      this.botBlobState = "still";
    }, 3000);
  }

  onReceiveRapidProMessage(rapidMsg: IRapidProMessage) {
    let chatMsg: ChatMessage = {
      sender: "bot",
      text: rapidMsg.body,
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
    this.chatService.sendRapidproMessage(text);
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
    this.chatService.sendRapidproMessage(option.text);
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
}
