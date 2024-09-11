import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController, ToastOptions } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { Device, DeviceInfo } from "@capacitor/device";
import { takeWhile } from "rxjs/operators";
import { fromEvent } from "rxjs";

import { FlowTypes, IAppConfig } from "data-models";

import { ContextMenuService } from "src/app/shared/modules/context-menu/context-menu.service";
import {
  IContextMenuAction,
  IContextMenuActionData,
} from "src/app/shared/modules/context-menu/context-menu.types";
import { UserMetaService } from "src/app/shared/services/userMeta/userMeta.service";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { generateTimestamp } from "src/app/shared/utils";
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
import { RouterDisableGuard, RouterEnableGuard } from "./routeGuards";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { ThemeService } from "../theme/services/theme.service";
import { SkinService } from "src/app/shared/services/skin/skin.service";
import {
  IActionHandlers,
  IActionId,
  TemplateActionRegistry,
} from "src/app/shared/components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";

@Injectable({
  providedIn: "root",
})
export class FeedbackService extends SyncServiceBase {
  public isReviewingMode$ = new BehaviorSubject(false);

  public options = {
    contentPageWidth: 480,
    navigationEnabled: true,
    enabled: true,
  };

  private feedbackContext: {
    modal?: HTMLIonModalElement;
    additional?: IFeedbackEntryAdditional;
    ev?: PointerEvent;
  } = {};

  private deviceInfo: DeviceInfo;
  /** Track content el style to allow revert on component destroy */
  private initialContentStyle?: Partial<CSSStyleDeclaration>;

  /** Track template action defaults to restore after disable */
  private actionListDefault: Partial<IActionHandlers>;

  feedbackModuleDefaults: IAppConfig["FEEDBACK_MODULE_DEFAULTS"];
  appStrings: IAppConfig["APP_STRINGS"];
  feedbackButtons: IFeedbackContextMenuButton[];

  constructor(
    private contextMenuService: ContextMenuService,
    private templateService: TemplateService,
    private localStorageService: LocalStorageService,
    private userMetaService: UserMetaService,
    private toastController: ToastController,
    private dbService: DbService,
    private dbSyncService: DBSyncService,
    private appConfigService: AppConfigService,
    private router: Router,
    private themeService: ThemeService,
    private skinService: SkinService,
    private templateActionRegistry: TemplateActionRegistry,
    private deploymentService: DeploymentService
  ) {
    super("Feedback");
    this.subscribeToAppConfigChanges();
    // retrieve device info for passing in metadata
    Device.getInfo().then((deviceInfo) => {
      this.deviceInfo = deviceInfo;
    });
    // Handle enabling/disabling context menu actions depending on whether review mode enabled
    this.isReviewingMode$.subscribe((isReviewMode) => {
      this._WIP_trackContentClicks(isReviewMode);
      this.setContextMenuActions(isReviewMode);
    });
    this.registerFeedbackActions();
  }

  /**
   * Register actions availble within feedback child actions
   * @example
   * ```
   * click | feedback : cancel
   * ```
   * ```
   * click | feedback : submit : @local.some_feedback
   * ```
   */
  private registerFeedbackActions() {
    this.templateActionRegistry.register({
      feedback: async ({ args }) => {
        const [actionId, ...feedbackArgs] = args;
        const childActions = {
          cancel: () => this.clearFeedback(),
          submit: async () => {
            const user_feedback = feedbackArgs[0];
            const metadata = this.generateFeedbackMetadata();
            const { additional, ev } = this.feedbackContext;
            const feedbackEntry: IFeedbackEntry = { metadata, user_feedback, additional };
            if (ev) {
              feedbackEntry.additional.templateTarget = this.generateFeedbackTemplateMeta(ev);
            }
            await this.saveFeedback(feedbackEntry);
            this.clearFeedback();
          },
          open: () => this.sidebarOpen(),
          close: () => this.sidebarClose(),
          template: ([templatename]) => {
            return this.runFeedbackTemplate(templatename);
          },
          enable: () => this.setEnabled(true),
          disable: () => this.setEnabled(false),
          // TODO - Possibly legacy actions (?) to confirm if required
          send: ([data]) => {
            const metadata = this.generateFeedbackMetadata();
            return this.saveFeedback({ metadata, user_feedback: data, additional: {} });
          },
        };
        if (!(actionId in childActions)) {
          console.error("Feedback does not have action", actionId);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  private clearFeedback() {
    const { modal } = this.feedbackContext;
    if (modal) {
      modal.dismiss();
    }
    this.feedbackContext = {};
  }

  /**
   * Work in progress - provide template and component information on click
   * in feedback mode
   */
  private _WIP_trackContentClicks(isReviewMode: boolean) {
    if (isReviewMode) {
      fromEvent<PointerEvent>(document, "click")
        .pipe(takeWhile(() => this.isReviewingMode$.value === true))
        .subscribe((e) => {
          // const meta = this.generateFeedbackTemplateMeta(e);
        });
    }
  }

  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.feedbackModuleDefaults = appConfig.FEEDBACK_MODULE_DEFAULTS;
      this.appStrings = appConfig.APP_STRINGS;
      this.feedbackButtons = appConfig.FEEDBACK_MODULE_DEFAULTS.buttons;
    });
  }

  public async setEnabled(isEnabled = false) {
    this.options.enabled = isEnabled;
    if (this.isReviewingMode$.value !== isEnabled) {
      this.isReviewingMode$.next(isEnabled);
    }
  }

  public async sidebarOpen() {
    this.router.navigate([{ outlets: { sidebar: ["feedback"] } }]);
  }
  public async sidebarClose() {
    this.router.navigate([{ outlets: { sidebar: [] } }]);
  }

  /**
   * Create a standalone popup of the provided template and use to collect user feedback.
   * Modal dismiss and feedback retrieval will be handled by the feedback actions handlers
   * @param additional optional additional user data to be included alongside generated metadata
   * @param ev pointer event captured if context menu created via pointer action
   * (e.g. right-click/long-press/text-select). Will be used to generate specific component metadata
   */
  public async runFeedbackTemplate(
    templatename: string,
    additional: IFeedbackEntryAdditional = {},
    ev?: PointerEvent
  ) {
    this.setEnabled(false);
    const { modal } = await this.templateService.runStandaloneTemplate(templatename, {
      fullscreen: false,
      waitForDismiss: false,
    });

    this.feedbackContext = { modal, ev, additional };
    await modal.onDidDismiss();
    this.setEnabled(true);
  }

  /** Save feedback to local db. Will sync on dmeand */
  public async saveFeedback(entry: IFeedbackEntry) {
    const dbEntry: IFeedbackEntryDB = { ...this.dbService.generateDBMeta(), ...entry };
    await this.dbService.table("feedback").add(dbEntry);
  }
  public async syncFeedback() {
    const syncTableResponse = await this.dbSyncService.syncTable("feedback");
    if (syncTableResponse.error) {
      await this.presentToast(this.appStrings.feedback_unsent_text, { duration: 5000 });
    } else {
      await this.presentToast(this.appStrings.feedback_sent_text);
    }
  }
  public async deleteFeedback(id: number) {
    await this.dbService.table("feedback").delete(id);
  }

  /** Set the width of the main content */
  public setContentPageWidth(pageWidth?: number) {
    const contentEl = document.getElementById("main");
    if (!contentEl) {
      console.error("Main content element not found, cannot set width");
      return;
    }

    if (!this.initialContentStyle) {
      const { width, maxWidth, margin } = contentEl.style;
      this.initialContentStyle = { width, maxWidth, margin };
    }
    if (pageWidth) {
      this.options.contentPageWidth = pageWidth;
      contentEl.style.width = `${pageWidth}px`;
      contentEl.style.maxWidth = `${pageWidth}px`;
      contentEl.style.margin = `auto`;
    } else {
      const { width, maxWidth, margin } = this.initialContentStyle;
      contentEl.style.width = width;
      contentEl.style.maxWidth = maxWidth;
      contentEl.style.margin = margin;
    }
  }

  /** Progamatically set router guards to enable/disable navigation */
  public setNavigationEnabled(enabled?: boolean) {
    this.options.navigationEnabled = enabled;
    this.router.resetConfig(
      this.router.config.map((r) => {
        if (!r.redirectTo) {
          r.canActivate = enabled ? [RouterEnableGuard] : [RouterDisableGuard];
        }
        return r;
      })
    );
    // also update actions to match navigation state (e.g. prevent popup and set actions)
    this.setActionsEnabled(enabled);
  }

  /**
   * When feedback mode is enabled we don't want interactions with elements to trigger any actions
   * Actions can be registered in 2 different ways (on global registry or within an action service instance),
   * so we need to both backup/override all global actions as well as create/delete global overrides for local actions
   */
  public setActionsEnabled(enabled?: boolean) {
    const actionsIDs = [...FlowTypes.ACTION_ID_LIST];
    if (enabled) {
      if (this.actionListDefault) {
        // remove global overrides and restore previous global
        this.templateActionRegistry.unregister(actionsIDs);
        this.templateActionRegistry.register(this.actionListDefault, true);
      }
    } else {
      // backup global and override all actions with dummy list
      const existingActions = this.templateActionRegistry.list();
      this.actionListDefault = existingActions;
      const dummyActionList = {};
      const allowedActions: IActionId[] = ["feedback", "set_local"];
      for (const actionID of actionsIDs) {
        if (!allowedActions.includes(actionID)) {
          dummyActionList[actionID] = () => console.info("Feedback action disabled", actionID);
        }
      }
      this.templateActionRegistry.register(dummyActionList, true);
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
    if (contextData?.selectedText) {
      this.localStorageService.setProtected("FEEDBACK_SELECTED_TEXT", contextData.selectedText);
    }
    // launch feedback template, disable feedback mode to prevent actions on feedback poup
    const additional = { ...contextData, id: feedbackButton.id };
    await this.runFeedbackTemplate(feedbackButton.displayedTemplate, additional, ev);

    // clear previously set field
    this.localStorageService.setProtected("FEEDBACK_SELECTED_TEXT", null);
  }

  /**
   * Generate a path mapping to clicked template element
   */
  private generateFeedbackTemplateMeta(ev: PointerEvent) {
    const elementPath = this.getElementPath(ev.target as HTMLElement);
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
    const { _app_builder_version, name } = this.deploymentService.config();
    const metadata: IFeedbackMetadata = {
      deviceInfo: this.deviceInfo,
      pathname: location.pathname,
      uuid: this.userMetaService.getUserMeta("uuid"),
      timestamp: generateTimestamp(),
      app_version: _app_builder_version,
      app_deployment_name: name,
      app_theme: this.themeService.getCurrentTheme(),
      app_skin: this.skinService.getActiveSkinName(),
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
    await toast.onDidDismiss();
  }

  /** Generate an array of all nested elements from top html to a given element */
  private getElementPath(element: HTMLElement) {
    const parents: HTMLElement[] = [];
    while (element) {
      parents.unshift(element);
      element = element.parentElement;
    }
    return parents;
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
