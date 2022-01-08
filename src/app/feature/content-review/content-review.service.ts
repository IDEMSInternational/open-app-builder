import { Injectable } from "@angular/core";

import { ToastController, ToastOptions } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { Device, DeviceInfo } from "@capacitor/device";
import { EventService } from "src/app/shared/services/event/event.service";
import { ContextMenuService } from "src/app/shared/modules/context-menu/context-menu.service";
import {
  IContextMenuAction,
  IContextMenuType,
} from "src/app/shared/modules/context-menu/context-menu.types";
import { UserMetaService } from "src/app/shared/services/userMeta/userMeta.service";
import { TemplateService } from "src/app/shared/components/template/services/template.service";

interface IFeedbackButton {
  id: string;
  menuButtonText: string;
  appearInMenus: IContextMenuType[];
  displayedTemplate: string;
}

const FEEDBACK_BUTTONS: IFeedbackButton[] = [
  {
    id: "feedback-addFeedback",
    menuButtonText: "Add Feedback",
    appearInMenus: ["rightClick", "longPress", "textSelect"],
    displayedTemplate: "feature_content_review_feedback",
  },
  {
    id: "feedback-suggestChange",
    menuButtonText: "Suggest Change",
    appearInMenus: ["textSelect"],
    displayedTemplate: "feature_content_review_suggest",
  },
];

@Injectable({
  providedIn: "root",
})
export class ContentReviewService {
  public isReviewingMode$ = new BehaviorSubject(false);

  private deviceInfo: DeviceInfo;

  constructor(
    private contextMenuService: ContextMenuService,
    private eventService: EventService,
    private templateService: TemplateService,
    private userMetaService: UserMetaService,
    private toastController: ToastController
  ) {
    this.registerEventHandlers();
    // retrieve device info for passing in metadata
    Device.getInfo().then((deviceInfo) => {
      this.deviceInfo = deviceInfo;
    });
    // Handle enabling/disabling context menu actions depending on whether review mode enabled
    this.isReviewingMode$.subscribe((isReviewMode) => {
      this.setContextMenuActions(isReviewMode);
    });
  }

  /** Handle registration of all defined feedback actions to the relevant context menus */
  private setContextMenuActions(isReviewMode: boolean) {
    for (const feedbackButton of FEEDBACK_BUTTONS) {
      const action: IContextMenuAction = {
        ...feedbackButton,
        actionHandler: async (ev) => await this.handleContextMenuAction(ev, feedbackButton),
      };
      for (const contextMenu of feedbackButton.appearInMenus) {
        if (isReviewMode) {
          this.contextMenuService.registerContextMenuAction(contextMenu, action);
        } else {
          this.contextMenuService.removeContextMenuAction(contextMenu, action.id);
        }
      }
    }
  }

  /**
   * Callback triggered from context menu when action selected
   * @param ev pointer event that initiated context menu call, such as right-click event
   * @param feedbackButton button that was clicked from the context menu to trigger action
   * */
  private async handleContextMenuAction(ev: PointerEvent, feedbackButton: IFeedbackButton) {
    const data = await this.templateService.runStandaloneTemplate(
      feedbackButton.displayedTemplate,
      { fullscreen: false }
    );
    // Submit feedback if popup dismissed by emit:completed event
    const { emit_data, emit_value } = data || {};
    if (emit_value === "completed") {
      const metadata = this.generateFeedbackMetadata(ev);
      const feedback = emit_data;
      console.log("submitting feedback", { metadata, feedback });
    }
  }

  /**
   * Collate various pieces of feedback info including page url, path to element in focus,
   * device info and user uuid
   */
  private generateFeedbackMetadata(ev: PointerEvent) {
    const elementPath: HTMLElement[] = (ev as any).path;
    // filter just to include template components and containers
    const templatePath = elementPath.filter((e) =>
      ["plh-template-component", "plh-template-container"].includes(e.localName)
    );
    // create a list with only custom data- attributes
    const templatePathData = templatePath.map((e) => ({ ...e.dataset }));
    console.log("elementPath", { elementPath, templatePath, templatePathData });
    return {
      templatePathData,
      deviceInfo: this.deviceInfo,
      pathname: location.pathname,
      uuid: this.userMetaService.getUserMeta("uuid"),
    };
  }

  public async toggleReviewMode() {
    this.isReviewingMode$.next(!this.isReviewingMode$.value);
  }

  // TODO
  private registerEventHandlers() {
    this.eventService.all("CONTENT_REVIEW").subscribe((event) => {
      console.log("content review event triggered", event);
    });
  }

  private async presentToast(message: string, opts: Partial<ToastOptions> = {}) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      ...opts,
    });
    toast.present();
  }
}

// this.useLongPress();

//   if (this.currentPlatform === "android") {
//     this.presentToast("Reviewing mode. Use long press on specific component");
//     this.guesture.enable(true);
//   }
// private useLongPress() {
//   this.guesture = this.gestureCtrl.create({
//     el: document.body,
//     threshold: 0,
//     gestureName: "long-press",
//     onStart: (ev) => {
//       this.longPressActive = true;
//       this.longPressAction(ev);
//     },
//     onEnd: (ev) => {
//       this.longPressActive = false;
//     },
//   });
// }
