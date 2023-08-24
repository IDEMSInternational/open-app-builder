import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import {
  LocalNotifications,
  LocalNotificationSchema,
  ActionType,
  ActionPerformed,
} from "@capacitor/local-notifications";
import { addSeconds } from "date-fns";
import type { Table } from "dexie";
import { interval } from "rxjs";
import { Subscription } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IAppConfig } from "../../model";
import {
  arrayToHashmap,
  arrayToHashmapArray,
  generateTimestamp,
  isNonEmptyArray,
} from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";
import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";

// Notification ids must be +/- 2^31-1 as per capacitor docs
const NOTIFICATION_ID_MAX = 2147483647;

/** Utility type to assert local notification has extra and schedule defined */
export interface ILocalNotification extends LocalNotificationSchema {
  schedule: LocalNotificationSchema["schedule"];
  extra: any;
  _created?: any;
  _row_id?: string;
  _action_performed?: string;
  // maintain timestamp to keep track of what notifications have been processed since load
  _callbacks_processed_time?: number;
}

@Injectable({
  providedIn: "root",
})
/**
 * The local notification service manages scheduled notifications in the database, and handles
 * mapping db notifications to the Capactor notifications API
 * https://capacitorjs.com/docs/apis/local-notifications
 *
 *
 * NOTE - custom icons
 * These need to be registered in advance as android assets (see link above)
 *
 * Note - local notificaitons always display in a banner (even in foreground mode)
 *
 */
export class LocalNotificationService extends AsyncServiceBase {
  /**
   * Observable list of all notifications processed since app load, so additional services can respond to updates
   * Includes any notifications previously scheduled but no longer present (e.g dismissed while app closed)
   **/
  public sessionNotifications$ = new BehaviorSubject<ILocalNotification[]>([]);
  /** Observable list of all scheduled notifications */
  public pendingNotifications$ = new BehaviorSubject<ILocalNotification[]>([]);
  public permissionGranted = false;
  /** Observable list of notificaitons interacted with */
  public interactedNotification$ = new BehaviorSubject<ActionPerformed>(null);

  /** Typed wrapper around database table used to store local notifications */
  private db: Table<ILocalNotification, number>;

  /** Track session start time to resolve list of notifications processed during session */
  private sessionStartTime = new Date().getTime();

  /** Resync notifications periodically using timer */
  private syncTimer$: Subscription;

  /** Use a subject to trigger notification reload to allow debounce */
  private notificationsLoader$ = new BehaviorSubject(true);

  private notificationsByRowId: Record<string, ILocalNotification> = {};

  /** Default settings used where otherwise not specified */
  localNotificationDefaults: LocalNotificationSchema;

  constructor(private dbService: DbService, private appConfigService: AppConfigService) {
    super("Local Notifications");
    this.registerInitFunction(this.init);
  }

  private async init() {
    await this.ensureAsyncServicesReady([this.dbService]);
    this.ensureSyncServicesReady([this.appConfigService]);
    this.subscribeToAppConfigChanges();
    this.db = this.dbService.table<ILocalNotification>("local_notifications");
    this.sessionStartTime = new Date().getTime();
    this.permissionGranted = await this.requestPermission();
    if (this.permissionGranted) {
      if (Capacitor.isNativePlatform()) {
        await LocalNotifications.registerActionTypes({
          types: Object.values(NOTIFICATION_ACTIONS),
        });
      }
      this.addLocalNotificationInteractionListeners();

      // housekeeping
      await this.cleanDBNotifications();
      await this.handleUnprocessedNotifications();

      // complete one intiial load
      // defer and debounce any further calls to load notifications to avoid duplicate processing
      await this.handleNotificationLoad();
      this.notificationsLoader$.pipe(debounceTime(5000)).subscribe(async () => {
        await this.handleNotificationLoad();
        await this.setApiNotifications();
      });
    }
  }

  /** Ensure all notifications in database are also scheduled on device */
  private async setApiNotifications() {
    const existingNotifications = await LocalNotifications.getPending();
    // Ensure notification ops use non-empty arrays to avoid error shown in #1827
    if (isNonEmptyArray(existingNotifications.notifications)) {
      await LocalNotifications.cancel({ notifications: existingNotifications.notifications });
    }
    const toSchedule = this.pendingNotifications$.value;
    if (isNonEmptyArray(toSchedule)) {
      await LocalNotifications.schedule({ notifications: toSchedule });
    }
  }

  public async requestPermission(): Promise<boolean> {
    // If running in browser first check to ensure notification api exists
    if (!Capacitor.isNativePlatform()) {
      if (!window.Notification) {
        console.log("[Notifications Unsupported]");
        return false;
      }
    }
    // Return state of already granted
    const { display } = await LocalNotifications.checkPermissions();
    if (display === "granted") {
      return true;
    }
    // Use notifications api to check permissions. Run in parallel with a 5-second
    // timeout to resolve in cases where prompt does not appear or user fails to interact with it
    const granted = await Promise.race([
      new Promise<boolean>((resolve) => setTimeout(resolve, 5000, false)),
      new Promise<boolean>(async (resolve) => {
        const { display } = await LocalNotifications.requestPermissions();
        resolve(display === "granted");
      }),
    ]);
    // console.log("[Notifications Enabled]", granted);
    return granted;
  }
  /** Trigger notification loader to reprocess on next defer cycle */
  private loadNotifications() {
    this.notificationsLoader$.next(true);
  }

  /**
   * Handle notification default and resync initialisation depending on app config changes
   * Includes initial value subscription to set initial values as first update
   */
  private subscribeToAppConfigChanges() {
    this.appConfigService.changesWithInitialValue$.subscribe((appConfig) => {
      if (appConfig.NOTIFICATION_DEFAULTS) {
        this.setNotificationDefaults(appConfig.NOTIFICATION_DEFAULTS as any);
      }
      if (appConfig.NOTIFICATIONS_SYNC_FREQUENCY_MS) {
        this.setNotificationSyncFrequency(appConfig.NOTIFICATIONS_SYNC_FREQUENCY_MS);
      }
    });
  }

  private setNotificationDefaults(defaults: IAppConfig["NOTIFICATION_DEFAULTS"]) {
    this.localNotificationDefaults = {
      id: null, // will be populated during schedule
      title: defaults.title,
      body: defaults.text,
      sound: null,
      attachments: null,
      // actionTypeId: "action_1", // Currently no action buttons included
      extra: null,
      // Note, we don't want android to remove notification as we will handle in db
      autoCancel: false,
    };
  }
  private setNotificationSyncFrequency(frequency: number) {
    if (this.syncTimer$ && !this.syncTimer$.closed) {
      this.syncTimer$.unsubscribe();
    }
    this.syncTimer$ = interval(frequency).subscribe(() => this.loadNotifications());
  }

  /**
   * Retrieve a list of pending notification IDs read from the notifications API plugin
   * and compare against list saved in database.
   * Use to resolve list of upcoming notifications and any been sent but not triggered in the app.
   */
  private async handleNotificationLoad() {
    const dbNotifications = await this.getDBNotifications();
    const currentTime = new Date().getTime();
    this.notificationsByRowId = arrayToHashmap(dbNotifications, "_row_id");
    const sessionNotifications = dbNotifications.filter(
      (n) => n._callbacks_processed_time >= this.sessionStartTime
    );
    this.sessionNotifications$.next(this._sortBySchedule(sessionNotifications));
    const pendingNotifications = dbNotifications.filter(
      (n) => n.schedule.at.getTime() > currentTime
    );
    this.pendingNotifications$.next(this._sortBySchedule(pendingNotifications));
  }

  private _sortBySchedule(notifications: ILocalNotification[]) {
    return notifications.sort((a, b) => (a.schedule.at > b.schedule.at ? 1 : -1));
  }

  /**
   * HACK - in the past duplicate notifications where only tracked by randomly generated ID numbers,
   * which could lead to multiple notifications scheduled for a single authored notification row.
   * Ensure any such duplicates are purged from DB
   */
  private async cleanDBNotifications() {
    const dbNotifications = await this.getDBNotifications();
    const duplicatesByRowId = arrayToHashmapArray<any>(dbNotifications, "_row_id");
    const removeIds: number[] = [];
    // in case multiple entries scheduled for a given row notification id
    // retain only the most recently interacted with (if exists), or can just pick any one
    Object.values(duplicatesByRowId).forEach((duplicates) => {
      if (duplicates.length > 0) {
        const sorted = duplicates.sort(
          (a, b) => b._callbacks_processed_time - a._callbacks_processed_time
        );
        sorted.slice(1).forEach((n) => removeIds.push(n.id));
      }
    });
    if (removeIds.length > 0) {
      console.log("[Notifications] remove duplicates", removeIds);
      await this.db.bulkDelete(removeIds);
    }
  }

  /**
   * Mark any notifications that have not been processed but should have been sent with
   * the current processing timestamp to include in session notifications list
   */
  private async handleUnprocessedNotifications() {
    const dbNotifications = await this.getDBNotifications();
    const unprocessedNotifications = dbNotifications
      .filter((n) => !n._callbacks_processed_time)
      .filter((n) => n.schedule.at.getTime() < new Date().getTime());
    const processTime = new Date().getTime();
    for (const notification of unprocessedNotifications) {
      await this.updateDBNotification(notification.id, {
        _callbacks_processed_time: processTime,
      });
    }
  }

  /**
   * Schedule a local notification
   * This will create an optimistic database update, which will then be scheduled to Capacitor
   * API during the loadNotifications callback
   */
  public async scheduleNotification(notification: ILocalNotification) {
    if (!this.permissionGranted) return;
    // add default values
    Object.entries(this.localNotificationDefaults).forEach(([key, value]) => {
      if (!notification.hasOwnProperty(key)) {
        notification[key] = value;
      }
    });
    if (!notification.extra?.id) {
      throw new Error(`no id supplied for notification\n${notification.title}`);
    }
    if (!notification.schedule) {
      throw new Error(`no schedule supplied for notification\n${notification._row_id}`);
    }
    // Capacitor notifications use a random integer as id, however we also want to retain the id of the
    // row used to trigger the notification to avoid duplicates. Ideally this _row_id should be the primary
    // key, however swapping the columns would require additional db migration so just retaining both for now
    notification._row_id = notification.extra.id;
    notification.id = Math.floor(Math.random() * NOTIFICATION_ID_MAX);
    // HACK - for some reason largebody not always passed (possibly from schedule immediate) so reassign
    notification.largeBody = notification.largeBody || notification.body;

    const existingNotification = this.notificationsByRowId[notification._row_id];
    if (existingNotification) {
      await this.removeNotifications([existingNotification.id]);
    }
    this.notificationsByRowId[notification._row_id] = notification;
    await this.addDBNotification(notification as ILocalNotification);
    this.loadNotifications();
  }

  /** Remove API and DB references for a given notification id **/
  public async removeNotifications(ids: number[]) {
    await this.removeDBNotifications(ids);
    this.loadNotifications();
  }

  /**
   * Debug method used to Schedule/Reschedule a notification to trigger after short delay
   * @param notification
   * @param delay - number of seconds to delay sending notification (default 3s)
   * @param forceBackground - WiP - minimise the app to show notification when app in background
   */
  public async scheduleImmediateNotification(
    notification: ILocalNotification,
    delay = 3,
    forceBackground = true
  ) {
    if (!this.permissionGranted) return;
    const notificationDeliveryTime = addSeconds(new Date(), delay);
    const immediateNotification = {
      ...notification,
      schedule: { at: notificationDeliveryTime },
    };
    await this.scheduleNotification(immediateNotification);
    // ensure api notification scheduled immediately
    await LocalNotifications.schedule({ notifications: [immediateNotification] });
    if (Capacitor.isNative && forceBackground) {
      // Ideally we want to minimise the app to see response when app is in background,
      // although the method appears inconsistent. Alternative minimiseApp proposed:
      // https://github.com/ionic-team/capacitor-plugins/issues/130
      // https://github.com/ionic-team/capacitor/issues?q=exitapp
      // App.exitApp();
    }
    return immediateNotification;
  }

  /***************************************************************************************************
   * DB Methods
   *
   * Notifications are autmoatically removed by the capacitor API after processing locally, therefore
   * retain copy in db for longer term storage and identification of notifications that may have been
   * sent while app in background and not processed
   **************************************************************************************************/

  private addDBNotification(notification: ILocalNotification) {
    notification._created = generateTimestamp();
    return this.db.put(notification);
  }

  /** Apply changes on top of an existing notification, with simple merge (i.e. non-nested) */
  private updateDBNotification(id: number, update: Partial<ILocalNotification>) {
    return this.db.update(id, update);
  }

  private async removeDBNotifications(ids: number[]) {
    return this.db.bulkDelete(ids);
  }

  private async getDBNotifications() {
    return this.db.toArray();
  }

  /**
   *
   * NOTE - CC 2021-09-23
   * As notifications contain custom extra data that needs to be handled by different services,
   * we actually don't want to do much directly when notification received. Instead we trigger
   * the load script which handled tracking notificaitons previously schedule but no longer existing
   * (to allow ). Also the triggers don't appear to be working on web
   *
   * TODO - handle removal/re-init methods to avoid memory leaks
   */
  private async addLocalNotificationInteractionListeners() {
    LocalNotifications.addListener(
      "localNotificationActionPerformed",
      async (action) => {
        console.log("[NOTIFICATION ACTION]", action);
        await this.updateDBNotification(action.notification.id, {
          _action_performed: action.actionId,
        });
        this.interactedNotification$.next(action);
        this.loadNotifications();
      }
      // TODO emit event for action to other listeners?
      // good to have default as can only ever have 1 listener for each type
    );
    // Note - currently not working: https://github.com/ionic-team/capacitor/issues/2352
    LocalNotifications.addListener("localNotificationReceived", async (notification) => {
      console.log(["NOTIFICATION RECEIVED"], notification);
      this.loadNotifications();
    });
  }
}

// Explicitly list actions here to enforce strict typing later
type IActionTypeId = "action_1" | "action_2";

/**
 * More fine-grained control to notifications can be set through the use of registered
 * actions. These provide sets of buttons that appear under notifications and perform
 * specific actions.
 *
 * NOTE - not currently used. If wanting to link to paths in the app will require
 * registering custom url scheme
 *
 */
const NOTIFICATION_ACTIONS: {
  [key in IActionTypeId]: ActionType;
} = {
  action_1: {
    id: "action_1",
    actions: [
      {
        title: "Test 1",
        id: "action_1",
        requiresAuthentication: false,
        foreground: true,
        destructive: true,
        input: true,
        inputButtonTitle: "input",
        inputPlaceholder: "some text",
      },
    ],
  },
  action_2: {
    id: "action_1",
    actions: [
      {
        title: "Test 1",
        id: "action_1",
        requiresAuthentication: false,
        foreground: false,
        destructive: false,
        input: false,
        inputButtonTitle: "input",
        inputPlaceholder: "some text",
      },
    ],
  },
};
