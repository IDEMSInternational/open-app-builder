import { Component, ChangeDetectorRef, Input, ViewChild, ElementRef, ViewEncapsulation } from "@angular/core";
import { AnimationOptions } from "ngx-lottie";
import { ActivatedRoute, Router } from "@angular/router";
import { ChatMessage, ChatResponseOption, ResponseCustomAction, IChatService } from "../models";
import { Subscription } from "rxjs";
import { AlertController, ModalController } from "@ionic/angular";
import { Capacitor } from "@capacitor/core";
import { ChatActionService } from "../services/common/chat-action.service";
import { FlowStatusChange, OfflineChatService } from "../services/offline/offline-chat.service";
import { OnlineChatService } from "../services/online/online-chat.service";
import { SettingsService } from "src/app/pages/settings/settings.service";
import { ContactFieldService } from "../services/offline/contact-field.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ChatPage {
  messages: ChatMessage[] = [];
  allMessages: ChatMessage[] = [];
  showFlowSkip = true;
  responseOptions: ChatResponseOption[] = [];
  lastReceivedMsg: ChatMessage;
  botBlobState: "walking-in" | "walking-out" | "talking" | "run-in" | "still" | "absent" =
    "walking-in";
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
  scrollingInterval: any;
  inputValue: string = "";
  showingAllMessages = true;
  character: "guide" | "egg" = "guide";
  messageSubscription: Subscription;
  chatViewType: "normal" | "story" = "normal";
  chatService: OfflineChatService;
  isModal: boolean;
  latestFlowEvent: FlowStatusChange;
  showFlowName: boolean = false;

  botTyping = false;
  typingAnimOptions: AnimationOptions = {
    path: "assets/lottie-animations/3759-typing.json",
    loop: true,
    autoplay: true,
  };
  // when using a modal flowName can be passed by component props
  @Input() flowName: string;
  @ViewChild("normalChatEnd") chatEndDiv: ElementRef;
  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private chatActionService: ChatActionService,
    private settingsService: SettingsService,
    private offlineChatService: OfflineChatService,
    private onlineChatService: OnlineChatService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private contactFieldService: ContactFieldService
  ) {}

  /** Initialise chat configuration on page enter */
  ionViewDidEnter() {
    this.checkIsModal();
    this.processRouteParams();
    this.processRouteQueryParams();
    this.initChatService().then(() => {
      this.startFlow(this.flowName);
    });
  }

  /** Load the online or offline chat service dependent on user preferences
   *  (online chat can only be used when running on native)
   */
  private async initChatService() {
    if (!Capacitor.isNative) {
      this.chatService = this.offlineChatService;
    } else {
      // 2020-11-25 - Online chat disabled here and in settings until tested working
      // const useOfflineChat = await this.settingsService.getUserSetting("USE_OFFLINE_CHAT").toPromise();
      const useOfflineChat = true;
      this.chatService = useOfflineChat ? this.offlineChatService : this.onlineChatService as any;
    }
    this.offlineChatService.botTyping$.subscribe((botTyping) => {
      this.botTyping = botTyping;
    });
    if (this.chatService.type === "offline") {
      this.offlineChatService.flowStatus$.subscribe((events) => {
        if (events.length > 0) {
          this.latestFlowEvent = events[events.length - 1];
        }
      });
      this.settingsService.getUserSetting("SHOW_FLOW_NAME").subscribe((value) => {
        this.showFlowName = value === "true";
      });
    }
    console.log(`%cUsing ${this.chatService.type} chat `, "color: #9c9c9c");
  }

  private async showCustomInputAlert() {
    const alert = await this.alertController.create({
      header: this.lastReceivedMsg.text,
      inputs: [
        {
          type: "text",
        },
      ],
      buttons: [
        {
          text: "Submit",
          handler: (value) => {
            this.sendCustomOption(value[0]);
          },
        },
      ],
    });
    await alert.present();
  }

  /** The chat page can sometimes be displayed in a modal. Check if it is, and assign variable to handle close button display */
  private checkIsModal() {
    this.modalCtrl.getTop().then((isModal) => (this.isModal = isModal ? true : false));
  }

  /** Route params can be used to specify a flow id in route navigation, e.g. /chat/welcome_flow. Set if specified */
  private processRouteParams() {
    const { params } = this.route.snapshot;
    if (params.flowName) {
      this.flowName = params.flowName;
    }
  }

  /** Query params are used to pass character information */
  private processRouteQueryParams() {
    const { queryParams } = this.route.snapshot;
    this.character = queryParams["character"] || "guide";
  }

  private async startFlow(flow_name: string) {
    await this.chatService.ready();
    if (flow_name) {
      this.chatService.startFlowByName(flow_name);
      this.messageSubscription = this.chatService.messages$.subscribe((messages) => {
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
    } else {
      console.error("no flow name specified");
    }
  }

  ionViewDidLeave() {
    this.messageSubscription.unsubscribe();
  }

  private async onNewMessage(message: ChatMessage) {
    console.log("new Message", message);
    message.dateReceived = new Date();
    this.lastReceivedMsg = message;
    if (message.character && message.character.toLowerCase().indexOf("guide") > -1) {
      let guideId = await this.contactFieldService.getContactField("guidenumber");
      if (guideId) {
        message.character = guideId as any;
      }
    }
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
      this.responseOptions = message.responseOptions ? message.responseOptions : [];
      if (message.showTextInput) {
        this.showCustomInputAlert();
      }
    } else {
      this.responseOptions = [];
    }
    let scrollDelay = 100;
    if ((message.attachments && message.attachments.length > 0) || message.innerImageUrl) {
      scrollDelay = 1000;
    }
    if (this.chatEndDiv) {
      setTimeout(() => {
        this.chatEndDiv.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
      }, scrollDelay);
    }
    this.cd.detectChanges();
  }

  private doCustomResponseAction(action: ResponseCustomAction) {
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
    this.onNewMessage({ text, sender: "user" });
    this.chatService.sendMessage({ text, sender: "user" });
    this.messagesSent += 1;
  }

  selectResponseOption(option: ChatResponseOption) {
    const { text, customAction, imageUrl } = option;
    if (customAction) {
      this.doCustomResponseAction(option.customAction);
    }
    let newMsg: ChatMessage = { text, sender: "user" };
    if (option.hideText) {
      newMsg.hideText = true;
    }
    if (option.imageUrl) {
      newMsg.innerImageUrl = option.imageUrl;
    }
    this.onNewMessage(newMsg);
    this.chatService.sendMessage({ text, sender: "user" });
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

  skipFlow() {
    this.router.navigateByUrl("/home");
  }

  sameAsLastCharacter(currentMsg: ChatMessage, prevMsg: ChatMessage) {
    if (prevMsg) {
      const lastTwoBotMessages = this.allMessages
        .filter((msg) => msg.sender === "bot")
        .reverse()
        .slice(0, 2);
      if (lastTwoBotMessages.length === 2) {
        return lastTwoBotMessages[0].character === lastTwoBotMessages[1].character;
      }
    }
    return false;
  }

  onStoryNextClicked() {
    this.chatService.sendMessage({
      sender: "user",
      text: "Next",
    });
  }

  onStoryPreviousClicked() {
    this.chatService.sendMessage({
      sender: "user",
      text: "Previous",
    });
  }
}
