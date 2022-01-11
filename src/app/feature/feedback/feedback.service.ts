import { Injectable } from "@angular/core";

import { ToastController, ToastOptions } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { Device, DeviceInfo } from "@capacitor/device";
import { ContextMenuService } from "src/app/shared/modules/context-menu/context-menu.service";
import {
  IContextMenuAction,
  IContextMenuActionData,
  IContextMenuType,
} from "src/app/shared/modules/context-menu/context-menu.types";
import { UserMetaService } from "src/app/shared/services/userMeta/userMeta.service";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { FEEDBACK_MODULE_DEFAULTS } from "data-models/constants";
import { generateTimestamp } from "src/app/shared/utils";
import { environment } from "src/environments/environment";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";

interface IFeedbackButton {
  id: string;
  menuButtonText: string;
  appearInMenus: IContextMenuType[];
  displayedTemplate: string;
}

const FEEDBACK_BUTTONS: IFeedbackButton[] = FEEDBACK_MODULE_DEFAULTS.buttons;

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  public isReviewingMode$ = new BehaviorSubject(false);

  private deviceInfo: DeviceInfo;

  constructor(
    private contextMenuService: ContextMenuService,
    private templateService: TemplateService,
    private templateFieldService: TemplateFieldService,
    private userMetaService: UserMetaService,
    private toastController: ToastController
  ) {
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
        actionHandler: async (ev, data) =>
          await this.handleContextMenuAction(ev, feedbackButton, data),
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
  private async handleContextMenuAction(
    ev: PointerEvent,
    feedbackButton: IFeedbackButton,
    contextData: IContextMenuActionData = {}
  ) {
    // set selected text to field for access in templates
    const { selected_text_field } = FEEDBACK_MODULE_DEFAULTS;
    if (contextData?.selectedText) {
      await this.templateFieldService.setField(selected_text_field, contextData.selectedText);
    }
    // launch feedback template
    const templateData = await this.templateService.runStandaloneTemplate(
      feedbackButton.displayedTemplate,
      { fullscreen: false }
    );
    // Submit feedback if popup dismissed by emit:completed event
    const { emit_data, emit_value } = templateData || {};
    if (emit_value === "completed") {
      const metadata = this.generateFeedbackMetadata(ev);
      const feedback = emit_data;
      const context = { ...contextData, id: feedbackButton.id };
      console.log("submitting feedback", { metadata, feedback, context });
      // TODO - handle submit
    }
    // clear previously set field
    await this.templateFieldService.setField(selected_text_field, null);
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
    // create a list with only custom data- attributes, ignoring hidden and rowname
    const templateTarget = templatePath.map((e) => {
      const dataFields = { ...e.dataset };
      const { hidden, rowname, ...keptFields } = dataFields;
      return keptFields;
    });
    return {
      templateTarget,
      deviceInfo: this.deviceInfo,
      pathname: location.pathname,
      uuid: this.userMetaService.getUserMeta("uuid"),
      timestamp: generateTimestamp(),
      app_version: environment.version,
      envName: environment.envName,
    };
  }

  public async toggleReviewMode() {
    this.isReviewingMode$.next(!this.isReviewingMode$.value);
  }
  public async setReviewMode(isEnabled = false) {
    this.isReviewingMode$.next(isEnabled);
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
