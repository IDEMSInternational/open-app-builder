import { DatePipe } from "@angular/common";
import { Component, computed, effect, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import type { PendingLocalNotificationSchema } from "@capacitor/local-notifications";
import { IonicModule } from "@ionic/angular";
import type { FlowTypes } from "data-models";
import { interval } from "rxjs";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import {
  ILocalNotification,
  LocalNotificationService,
} from "src/app/shared/services/notification/local-notification.service";
import { NotificationService } from "../../notification.service";
import { IDBNotification } from "../../notification.types";
import {
  NOTIFICATION_DEBUG_DEFAULT_DELAY,
  NOTIFICATION_DEBUG_DELAYS,
} from "./notifications-debug.constants";

/** Which notification system scheduled a notification */
type INotificationSource = "campaign" | "action" | "other";

/** Notification pending on the device, labelled by the system that scheduled it */
export interface IDeviceNotification {
  id: number;
  title: string;
  at?: Date;
  source: INotificationSource;
  /** Campaign id, or `notification` action id */
  sourceId?: string;
  raw: PendingLocalNotificationSchema;
}

/** Id shared by test notifications, so that sending another replaces the last */
export const TEST_NOTIFICATION_ID = "debug_test_notification";
/** Campaign id given to campaign test notifications */
export const TEST_CAMPAIGN_ID = "debug_test";

/** How often to refresh the list of notifications scheduled on the device */
const DEVICE_REFRESH_MS = 5000;

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrl: "./notifications-debug.page.scss",
  standalone: true,
  imports: [IonicModule, DatePipe],
})
export class NotificationsDebugPage implements OnInit {
  public notificationService = inject(NotificationService);
  private localNotificationService = inject(LocalNotificationService);
  private dbSyncService = inject(DBSyncService);

  public permissionGranted = computed(() => this.notificationService.status() === "granted");

  /** Delay before test notifications arrive, in seconds */
  public delays = NOTIFICATION_DEBUG_DELAYS;
  public delaySeconds = signal(NOTIFICATION_DEBUG_DEFAULT_DELAY);
  public delayLabel = computed(
    () => this.delays.find((d) => d.seconds === this.delaySeconds())?.label
  );
  /** Most recent test notification, to confirm when it is due */
  public lastTest = signal<{ label: string; at: Date } | undefined>(undefined);

  /** Everything scheduled on the device, from either notification system */
  public deviceNotifications = signal<IDeviceNotification[]>([]);

  /** Pending notifications in the campaign notification service's own records */
  public campaignRecords = toSignal(this.localNotificationService.pendingNotifications$, {
    initialValue: [],
  });

  /** Sent and tapped campaign notifications (`local_notifications_interaction`) */
  public campaignHistory = toSignal(this.localNotificationService.persistAdapter.dbEntries$, {
    initialValue: [],
  });

  /** Notifications scheduled by the `notification` action (`_notifications` data list), newest first */
  private actionRecordList = toSignal(this.notificationService.listNotifications$(), {
    initialValue: [] as IDBNotification[],
  });
  public actionRecords = computed(() =>
    [...this.actionRecordList()].sort((a, b) => b.schedule_at.localeCompare(a.schedule_at))
  );

  constructor() {
    // Mirror permission status to legacy service, as required for campaign test notifications.
    // Note - legacy service init processes (e.g. interaction listeners) will still only run
    // following next app launch if permission was not granted at launch
    effect(() => {
      this.localNotificationService.permissionGranted = this.permissionGranted();
    });
    // Keep the device list current, e.g. to see a notification cancelled by the other system
    interval(DEVICE_REFRESH_MS)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.refreshDeviceNotifications());
  }

  async ngOnInit() {
    await this.dbSyncService.ready();
    await this.localNotificationService.ready();
    await this.refreshDeviceNotifications();
  }

  /** Request permission via same method as authored `notification: request_permission` action */
  public async requestPermission() {
    await this.notificationService.requestPermission();
  }

  public setDelay(value: string | number | undefined) {
    this.delaySeconds.set(Number(value));
  }

  public async refreshDeviceNotifications() {
    try {
      const pending = await this.notificationService.listDevicePendingNotifications();
      const notifications = pending.map(toDeviceNotification);
      notifications.sort((a, b) => (a.at?.getTime() ?? 0) - (b.at?.getTime() ?? 0));
      this.deviceNotifications.set(notifications);
    } catch (error) {
      console.warn("[Notifications Debug] Could not list device notifications", error);
    }
  }

  /**
   * Schedule a test notification through either notification system, arriving after the selected
   * delay. Tapping it shows a toast, so its tap actions can be checked in any deployment
   */
  public async sendTestNotification(source: "campaign" | "action") {
    const at = new Date(Date.now() + this.delaySeconds() * 1000);
    if (source === "campaign") {
      await this.scheduleCampaignTestNotification(at);
      this.lastTest.set({ label: "Campaign", at });
    } else {
      await this.scheduleActionTestNotification(at);
      this.lastTest.set({ label: "Notification action", at });
    }
    // campaign notifications reach the device after the legacy service's 2s debounce
    setTimeout(() => this.refreshDeviceNotifications(), 2500);
  }

  /** Send a copy of a campaign notification after the selected delay, keeping its tap actions */
  public async sendCampaignNotificationCopy(notification: ILocalNotification) {
    await this.localNotificationService.scheduleImmediateNotification(
      notification,
      this.delaySeconds()
    );
    setTimeout(() => this.refreshDeviceNotifications(), 2500);
  }

  public async syncCampaignHistory() {
    await this.dbSyncService.syncTable("local_notifications_interaction");
    await this.localNotificationService.persistAdapter.loadInteractedNotifications();
  }

  public logDetails(details: unknown) {
    console.log("[Notifications Debug]", details);
  }

  /** Schedule as `notification: create` does */
  private scheduleActionTestNotification(at: Date) {
    return this.notificationService.scheduleNotification({
      id: TEST_NOTIFICATION_ID,
      schedule_at: at.toISOString(),
      title: "Test notification (notification action)",
      text: "Tap to check that its actions run",
      action_list: [toastAction("notification_interacted", "Tap actions ran: notification action")],
    });
  }

  /** Schedule through the campaign notification service, as a campaign row does */
  private scheduleCampaignTestNotification(at: Date) {
    const notification = {
      // replaced with a generated id when scheduled
      id: 0,
      title: "Test notification (campaign)",
      body: "Tap to check that its actions run",
      schedule: { at },
      extra: {
        campaign_id: TEST_CAMPAIGN_ID,
        row_id: TEST_NOTIFICATION_ID,
        action_list: [toastAction("click", "Tap actions ran: campaign")],
      },
    } as ILocalNotification;
    return this.localNotificationService.scheduleNotification(notification, TEST_NOTIFICATION_ID);
  }
}

/** Label a pending device notification by the notification system that scheduled it */
export function toDeviceNotification(
  notification: PendingLocalNotificationSchema
): IDeviceNotification {
  const { id, title, schedule, extra } = notification;
  const at = schedule?.at ? new Date(schedule.at) : undefined;
  let source: INotificationSource = "other";
  let sourceId: string | undefined;
  if (extra?.campaign_id) {
    source = "campaign";
    sourceId = extra.campaign_id;
  } else if (extra?.source === "action") {
    source = "action";
    sourceId = extra.id;
  }
  return { id, title, at, source, sourceId, raw: notification };
}

function toastAction(
  trigger: FlowTypes.TemplateRowActionTrigger,
  message: string
): FlowTypes.TemplateRowAction {
  return { trigger, action_id: "toast", args: [], params: { message } };
}
