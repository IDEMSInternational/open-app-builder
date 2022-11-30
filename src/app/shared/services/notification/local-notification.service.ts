import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import {
  LocalNotifications,
  LocalNotificationSchema,
  ActionType,
  ActionPerformed,
} from "@capacitor/local-notifications";
import { addSeconds } from "date-fns";
import { interval } from "rxjs";
import { Subscription } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IAppConfig } from "../../model";
import { generateTimestamp } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";
import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";

/** Utility type to assert local notification has extra and schedule defined */
export interface ILocalNotification extends LocalNotificationSchema {
  schedule: LocalNotificationSchema["schedule"];
  extra: any;
  _created?: any;
  _action_performed?: string;
  // maintain timestamp to keep track of what notifications have been processed since load
  _callbacks_processed_time?: number;
}

@Injectable({
  providedIn: "root",
})
/**
 * https://capacitorjs.com/docs/apis/local-notifications
 * NOTE - custom icons
 * These need to be registered in advance as android assets (see link above)
 *
 * Note - local notificaitons always display in a banner (even in foreground mode)
 *
 * Note - complex system required to maintain copy of notifications in db and calculate
 * which may have been triggered since last load as capacitor api removes sent notifications and
 * doesn't always trigger events based on notifications (e.g. dismissed while app closed)
 *
 * TODO - improve logging methods
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
  private db: Dexie.Table<ILocalNotification, number>;

  /** Track session start time to resolve list of notifications processed during session */
  private sessionStartTime = new Date().getTime();

  /** Resync notifications periodically using timer */
  private syncTimer$: Subscription;

  /** Use a subject to trigger notification reload to allow debounce */
  private notificationsLoader$ = new BehaviorSubject(true);

  notificationDefaults: IAppConfig["NOTIFICATION_DEFAULTS"];
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
      // defer and debounce any calls to load notifications to avoid duplicate processing
      this.notificationsLoader$.pipe(debounceTime(5000)).subscribe(() => {
        this.handleNotificationLoad();
      });
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
    this.notificationDefaults = defaults;
    this.localNotificationDefaults = {
      id: new Date().getUTCMilliseconds(),
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
    await this.rescheduleMissingNotifications();

    await this.handleUnprocessedNotifications();

    const dbNotifications = await this.getDBNotifications();
    const sessionNotifications = dbNotifications.filter(
      (n) => n._callbacks_processed_time >= this.sessionStartTime
    );
    this.sessionNotifications$.next(this._sortBySchedule(sessionNotifications));

    const pendingNotifications = await this.getAPINotifications();
    this.pendingNotifications$.next(this._sortBySchedule(pendingNotifications));
  }

  private _sortBySchedule(notifications: ILocalNotification[]) {
    return notifications.sort((a, b) => (a.schedule.at > b.schedule.at ? 1 : -1));
  }

  /**
   * Reschedule any notifications that have been listed in the DB but do not appear as pending on the API
   * This can happen on web when api data is cleared between sessions
   */
  private async rescheduleMissingNotifications() {
    const dbNotifications = await this.getDBNotifications();
    const expected = dbNotifications.filter((n) => n.schedule.at.getTime() > new Date().getTime());

    const pending = await this.getAPINotifications();
    const pendingIds = pending.map((n) => n.id);

    const missing = expected.filter((n) => !pendingIds.includes(n.id));
    for (const notification of missing) {
      await this.scheduleNotification(notification, false);
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

  /** Retrieve list of pending notifications from Capacitor API */
  private async getAPINotifications() {
    const { notifications } = await LocalNotifications.getPending();
    return notifications as ILocalNotification[];
  }

  /**
   * Schedule a local notification
   * @param options - Supports full notification options,
   * with a minimum of schedule required and a named action type
   * see full scheduling options in type interface
   * see named actions below for configurations
   */
  public async scheduleNotification(notification: ILocalNotification, reloadNotifications = true) {
    if (!this.permissionGranted) return;
    // add default values
    Object.entries(this.localNotificationDefaults).forEach(([key, value]) => {
      if (!notification.hasOwnProperty(key)) {
        notification[key] = value;
      }
    });
    // HACK - for some reason largebody not always passed (possibly from schedule immediate) so reassign
    notification.largeBody = notification.largeBody || notification.body;
    await LocalNotifications.schedule({ notifications: [notification] });
    await this.addDBNotification(notification as ILocalNotification);
    if (reloadNotifications) {
      await this.loadNotifications();
    }
  }

  /** Remove API and DB references for a given notification id **/
  public async removeNotification(id: number, reloadNotifications = true) {
    if (!this.permissionGranted) return;
    const notifications = [{ id }];
    await LocalNotifications.cancel({ notifications });
    await this.removeDBNotification(id);
    if (reloadNotifications) {
      await this.loadNotifications();
    }
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
    // remove any existing notificaiton and reschedule with a new id to allow action reprocessing
    await this.removeNotification(notification.id, false);
    const notificationDeliveryTime = addSeconds(new Date(), delay);
    const immediateNotification = {
      ...notification,
      schedule: { at: notificationDeliveryTime },
      id: new Date().getTime(),
    };
    await this.scheduleNotification(immediateNotification, false);
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
    return this.db.put(notification, notification.id);
  }

  /** Apply changes on top of an existing notification, with simple merge (i.e. non-nested) */
  private updateDBNotification(id: number, update: Partial<ILocalNotification>) {
    return this.db.update(id, update);
  }

  private async removeDBNotification(id: number) {
    return this.db.delete(id);
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
        await this.loadNotifications();
      }
      // TODO emit event for action to other listeners?
      // good to have default as can only ever have 1 listener for each type
    );
    // Note - currently not working: https://github.com/ionic-team/capacitor/issues/2352
    LocalNotifications.addListener("localNotificationReceived", async (notification) => {
      console.log(["NOTIFICATION RECEIVED"], notification);
      await this.loadNotifications();
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
