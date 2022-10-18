import { Injectable } from "@angular/core";

import { ToastController, ToastOptions } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { Device, DeviceInfo } from "@capacitor/device";
import { ContextMenuService } from "src/app/shared/modules/context-menu/context-menu.service";
import {
  IContextMenuAction,
  IContextMenuActionData,
} from "src/app/shared/modules/context-menu/context-menu.types";
import { UserMetaService } from "src/app/shared/services/userMeta/userMeta.service";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { generateTimestamp } from "src/app/shared/utils";
import { environment } from "src/environments/environment";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { DbService } from "src/app/shared/services/db/db.service";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import {
  IFeedbackContextMenuButton,
  IFeedbackEntry,
  IFeedbackEntryAdditional,
  IFeedbackEntryDB,
  IFeedbackMetadata,
  ITemplateTargetEntry,
} from "./feedback.types";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { IAppConfig } from "packages/data-models";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  public isReviewingMode$ = new BehaviorSubject(false);

  private deviceInfo: DeviceInfo;
  feedbackModuleDefaults;
  appStrings;
  feedbackButtons: IFeedbackContextMenuButton[];

  constructor(
    private contextMenuService: ContextMenuService,
    private templateService: TemplateService,
    private templateFieldService: TemplateFieldService,
    private userMetaService: UserMetaService,
    private toastController: ToastController,
    private dbService: DbService,
    private dbSyncService: DBSyncService,
    private appConfigService: AppConfigService
  ) {
    this.subscribeToAppConfigChanges();
    // retrieve device info for passing in metadata
    Device.getInfo().then((deviceInfo) => {
      this.deviceInfo = deviceInfo;
    });
    // Handle enabling/disabling context menu actions depending on whether review mode enabled
    this.isReviewingMode$.subscribe((isReviewMode) => {
      this.setContextMenuActions(isReviewMode);
    });
  }

  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.feedbackModuleDefaults = appConfig.FEEDBACK_MODULE_DEFAULTS;
      this.appStrings = appConfig.APP_STRINGS;
      this.feedbackButtons = appConfig.FEEDBACK_MODULE_DEFAULTS.buttons;
    });
  }

  public async setReviewMode(isEnabled = false) {
    if (this.isReviewingMode$.value !== isEnabled) {
      this.isReviewingMode$.next(isEnabled);
    }
  }

  /**
   * Create a standalone popup of the provided template and use to collect user feedback.
   * On completed emit retrieve any passed values, combine with metadata and submit to server
   * @param additional optional additional user data to be included alongside generated metadata
   * @param ev pointer event captured if context menu created via pointer action
   * (e.g. right-click/long-press/text-select). Will be used to generate specific component metadata
   */
  public async runFeedbackTemplate(
    templatename: string,
    additional: IFeedbackEntryAdditional = {},
    ev?: PointerEvent
  ) {
    const templateData = await this.templateService.runStandaloneTemplate(templatename, {
      fullscreen: false,
    });
    // Submit feedback if popup dismissed by emit:completed event
    const { emit_data, emit_value } = templateData || {};
    if (emit_value === "completed") {
      const metadata = this.generateFeedbackMetadata();
      const feedbackEntry: IFeedbackEntry = { metadata, user_feedback: emit_data, additional };
      if (ev) {
        feedbackEntry.additional.templateTarget = this.generateFeedbackTemplateMeta(ev);
      }
      await this.saveFeedback(feedbackEntry);
    }
  }

  /** Save feedback to local db. Will automatically be synced to server DB */
  public async saveFeedback(entry: IFeedbackEntry) {
    const dbEntry: IFeedbackEntryDB = { ...this.dbService.generateDBMeta(), ...entry };
    await this.dbService.table("feedback").add(dbEntry);
    const syncTableResponse = await this.dbSyncService.syncTable("feedback");
    if (syncTableResponse.error) {
      await this.presentToast(this.appStrings.feedback_unsent_text, { duration: 5000 });
    } else {
      await this.presentToast(this.appStrings.feedback_sent_text);
    }
  }

  /** Handle registration of all defined feedback actions to the relevant context menus */
  private setContextMenuActions(isReviewMode: boolean) {
    for (const feedbackButton of this.feedbackButtons) {
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
    feedbackButton: IFeedbackContextMenuButton,
    contextData: IContextMenuActionData = {}
  ) {
    // set selected text to field for access in templates
    const { selected_text_field } = this.feedbackModuleDefaults;
    if (contextData?.selectedText) {
      await this.templateFieldService.setField(selected_text_field, contextData.selectedText);
    }
    // launch feedback template
    const additional = { ...contextData, id: feedbackButton.id };
    await this.runFeedbackTemplate(feedbackButton.displayedTemplate, additional, ev);

    // clear previously set field
    await this.templateFieldService.setField(selected_text_field, null);
  }

  /**
   * Generate a path mapping to clicked template element
   */
  private generateFeedbackTemplateMeta(ev: PointerEvent) {
    const elementPath: HTMLElement[] = (ev as any).path;
    // filter just to include template components and containers
    const templatePath = elementPath.filter((e) =>
      ["plh-template-component", "plh-template-container"].includes(e.localName)
    );
    // map custom data- attributes to list of kept fields for entry
    const templateTarget: ITemplateTargetEntry[] = templatePath.map((e) => {
      const templateTargetEntry: ITemplateTargetEntry = {
        el: e.localName === "plh-template-component" ? "component" : "container",
      };
      const dataFields = { ...e.dataset };
      const fields: (keyof ITemplateTargetEntry)[] = ["el", "name", "templatename", "type"];
      for (const field of fields) {
        if (dataFields.hasOwnProperty(field)) {
          templateTargetEntry[field] = dataFields[field] as any;
        }
      }
      return templateTargetEntry;
    });
    return templateTarget;
  }

  /**
   * Collate various pieces of feedback info including page url, path to element in focus,
   * device info and user uuid
   */
  public generateFeedbackMetadata() {
    const metadata: IFeedbackMetadata = {
      deviceInfo: this.deviceInfo,
      pathname: location.pathname,
      uuid: this.userMetaService.getUserMeta("uuid"),
      timestamp: generateTimestamp(),
      app_version: environment.version,
      app_deployment_name: environment.deploymentName,
    };
    return metadata;
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
