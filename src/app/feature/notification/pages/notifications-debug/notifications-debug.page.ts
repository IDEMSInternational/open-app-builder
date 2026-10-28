import { DatePipe, NgTemplateOutlet } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { Clipboard } from "@capacitor/clipboard";
import { Capacitor } from "@capacitor/core";
import type { PendingLocalNotificationSchema } from "@capacitor/local-notifications";
import { IonicModule, ToastController } from "@ionic/angular";
import type { FlowTypes } from "data-models";
import { format, formatDistanceStrict } from "date-fns";
import { interval } from "rxjs";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import {
  ILocalNotification,
  LocalNotificationService,
  TEST_CAMPAIGN_ID,
} from "src/app/shared/services/notification/local-notification.service";
import { generateTimestamp } from "src/app/shared/utils";
import { NotificationService } from "../../notification.service";
import { IDBNotification } from "../../notification.types";
import {
  NOTIFICATION_DEBUG_DEFAULT_DELAY,
  NOTIFICATION_DEBUG_DELAYS,
  TEST_COPY_DELAY_SECONDS,
  TEST_COPY_ID_PREFIX,
  TEST_NOTIFICATION_ID_PREFIX,
} from "./notifications-debug.constants";
import {
  buildNotificationLists,
  groupActionsByTrigger,
  IDebugNotification,
  IDebugNotificationSources,
  INotificationSource,
  isTestActionNotification,
  isTestCampaignNotification,
  isTestHistoryEntry,
  OVERDUE_NOTICE,
} from "./notifications-debug.utils";

/** How often to refresh the lists, e.g. to move notifications from upcoming to past */
const REFRESH_MS = 5000;
/** Campaign notifications reach the device after the campaign notification service's 2 s debounce */
const CAMPAIGN_SCHEDULING_DELAY_MS = 2500;
/** Number of past notifications to show at first, and to add with "Show more" */
const PAST_PAGE_SIZE = 20;

const SOURCE_LABELS: Record<INotificationSource, string> = {
  campaign: "Campaign",
  action: "Action",
  other: "Other",
};
const SOURCE_COLORS: Record<INotificationSource, string> = {
  campaign: "primary",
  action: "secondary",
  other: "medium",
};

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrl: "./notifications-debug.page.scss",
  standalone: true,
  imports: [IonicModule, DatePipe, NgTemplateOutlet],
})
export class NotificationsDebugPage implements OnInit {
  public notificationService = inject(NotificationService);
  private localNotificationService = inject(LocalNotificationService);
  private dbSyncService = inject(DBSyncService);
  private toastController = inject(ToastController);

  public isWeb = !Capacitor.isNativePlatform();
  public permissionGranted = computed(() => this.notificationService.status() === "granted");
  public sourceLabels = SOURCE_LABELS;
  public sourceColors = SOURCE_COLORS;
  public overdueNotice = OVERDUE_NOTICE;

  /** Delay before test notifications arrive, in seconds */
  public delays = NOTIFICATION_DEBUG_DELAYS;
  public delaySeconds = signal(NOTIFICATION_DEBUG_DEFAULT_DELAY);
  /** Most recent test notification, to confirm when it is due */
  public lastTest = signal<{ label: string; at: Date } | undefined>(undefined);

  private now = signal(Date.now());
  private devicePending = signal<PendingLocalNotificationSchema[]>([]);
  private campaignRecords = signal<ILocalNotification[]>([]);
  private campaignHistory = toSignal(this.localNotificationService.persistAdapter.dbEntries$, {
    initialValue: [],
  });
  private actionRecords = toSignal(this.notificationService.listNotifications$(), {
    initialValue: [] as IDBNotification[],
  });
  private sources = computed<IDebugNotificationSources>(() => ({
    device: this.devicePending(),
    campaignRecords: this.campaignRecords(),
    campaignHistory: this.campaignHistory(),
    actionRecords: this.actionRecords(),
    now: this.now(),
  }));

  private lists = computed(() => buildNotificationLists(this.sources()));
  public upcoming = computed(() => this.lists().upcoming);
  public past = computed(() => this.lists().past);
  public pastLimit = signal(PAST_PAGE_SIZE);
  public pastShown = computed(() => this.past().slice(0, this.pastLimit()));
  public testCount = computed(
    () => [...this.upcoming(), ...this.past()].filter((n) => n.isTest).length
  );

  /** Keys of notifications with details shown */
  public expanded = signal<Record<string, boolean>>({});

  constructor() {
    interval(REFRESH_MS)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.refresh());
  }

  async ngOnInit() {
    await this.dbSyncService.ready();
    await this.localNotificationService.ready();
    await this.refresh();
  }

  /** Request permission via same method as authored `notification: request_permission` action */
  public async requestPermission() {
    await this.notificationService.requestPermission();
  }

  /** Reload notifications scheduled on the device and saved by the campaign service */
  public async refresh() {
    // Update each independently, so that one failing does not leave the other out of date
    const [device, campaignRecords] = await Promise.allSettled([
      this.notificationService.listDevicePendingNotifications(),
      this.localNotificationService.getDBNotifications(),
    ]);
    if (device.status === "fulfilled") this.devicePending.set(device.value);
    if (campaignRecords.status === "fulfilled") this.campaignRecords.set(campaignRecords.value);
    for (const result of [device, campaignRecords]) {
      if (result.status === "rejected") {
        console.warn("[Notifications Debug] Could not list notifications", result.reason);
      }
    }
    this.now.set(Date.now());
  }

  public toggleDetails(key: string) {
    this.expanded.update((expanded) => ({ ...expanded, [key]: !expanded[key] }));
  }

  public showMorePast() {
    this.pastLimit.update((limit) => limit + PAST_PAGE_SIZE);
  }

  public actionGroups(notification: IDebugNotification) {
    return groupActionsByTrigger(notification.actions);
  }

  public tapStatus({ tapped, tappedAt }: IDebugNotification) {
    if (!tapped) return "Not tapped";
    return tappedAt ? `Tapped at ${format(tappedAt, "HH:mm")}` : "Tapped";
  }

  public relativeTime(at?: Date) {
    return at ? formatDistanceStrict(at, this.now(), { addSuffix: true }) : "";
  }

  /** Send a test copy of a notification, with the same text and actions, in 1 minute */
  public async sendTestCopy({ original }: IDebugNotification) {
    if (!original) return;
    const at = new Date(Date.now() + TEST_COPY_DELAY_SECONDS * 1000);
    if (original.source === "campaign") {
      await this.localNotificationService.scheduleImmediateNotification(
        original.notification,
        TEST_COPY_DELAY_SECONDS
      );
    } else {
      const { id, title, text, action_list } = original.notification;
      await this.notificationService.scheduleNotification({
        id: `${TEST_COPY_ID_PREFIX}_${id}_${at.getTime()}`,
        schedule_at: at.toISOString(),
        title,
        text,
        action_list,
      });
    }
    this.refreshAfterScheduling();
    await this.showToast(`Test copy due at ${format(at, "HH:mm:ss")}.`);
  }

  public setDelay(value: string | number | undefined) {
    this.delaySeconds.set(Number(value));
  }

  /**
   * Schedule a test notification through either notification system, arriving after the selected
   * delay. Tapping it shows a toast, so its tap actions can be checked in any deployment
   */
  public async sendTestNotification(source: "campaign" | "action") {
    const at = new Date(Date.now() + this.delaySeconds() * 1000);
    const id = `${TEST_NOTIFICATION_ID_PREFIX}_${at.getTime()}`;
    if (source === "campaign") {
      await this.scheduleCampaignTestNotification(id, at);
      this.lastTest.set({ label: "Campaign", at });
    } else {
      await this.scheduleActionTestNotification(id, at);
      this.lastTest.set({ label: "Action", at });
    }
    this.refreshAfterScheduling();
  }

  /**
   * Remove test notifications and test copies sent from debug pages, from the device and from
   * both systems' records. Records already synced to the server stay there.
   * Only test notifications are cancelled, so other notifications on the device are left as they are
   */
  public async clearTestNotifications() {
    const deviceIds = this.upcoming()
      .filter((n) => n.isTest && n.deviceId !== undefined)
      .map((n) => n.deviceId as number);
    await this.notificationService.cancelDevicePendingNotifications(deviceIds);
    const actionIds = this.actionRecords()
      .map((record) => record.id)
      .filter((id) => isTestActionNotification(id));
    for (const id of actionIds) {
      await this.notificationService.cancelNotification(id);
    }
    const campaignRecords = await this.localNotificationService.getDBNotifications();
    const campaignIds = campaignRecords
      .filter((record) => isTestCampaignNotification(record.extra))
      .map((record) => record.id);
    // Avoids `removeNotifications`, which reschedules and so cancels action notifications (#3722)
    await this.localNotificationService.removeNotificationsWithoutRescheduling(campaignIds);
    const historyIds = this.campaignHistory()
      .filter((entry) => isTestHistoryEntry(entry))
      .map((entry) => entry.notification_id);
    // Include cleared campaign notifications without history yet, so it is not recorded later
    const removedHistoryIds = [...new Set([...historyIds, ...campaignIds])];
    if (removedHistoryIds.length > 0) {
      await this.localNotificationService.persistAdapter.removeEntries(removedHistoryIds);
    }
    this.lastTest.set(undefined);
    this.refreshAfterScheduling();
    await this.showToast("Test notifications cleared");
  }

  /** Copy a notification's details, e.g. to paste into a bug report */
  public async copyDetails({ title, text, source, at, raw }: IDebugNotification) {
    const scheduled_for = at ? generateTimestamp(at) : undefined;
    const details = JSON.stringify({ title, text, source, scheduled_for, ...raw }, null, 2);
    try {
      await Clipboard.write({ string: details });
      await this.showToast("Details copied");
    } catch (error) {
      console.warn("[Notifications Debug] Could not copy details", error);
      await this.showToast("Could not copy details");
    }
  }

  public async syncCampaignHistory() {
    await this.dbSyncService.syncTable("local_notifications_interaction");
    await this.localNotificationService.persistAdapter.loadInteractedNotifications();
  }

  /** Refresh now, and again once campaign notifications have reached the device */
  private refreshAfterScheduling() {
    this.refresh();
    setTimeout(() => this.refresh(), CAMPAIGN_SCHEDULING_DELAY_MS);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 3000 });
    await toast.present();
  }

  /** Schedule as `notification: create` does */
  private scheduleActionTestNotification(id: string, at: Date) {
    return this.notificationService.scheduleNotification({
      id,
      schedule_at: at.toISOString(),
      title: "Test notification (action)",
      text: "Tap to check that its actions run",
      action_list: [toastAction("notification_interacted", "Tap actions ran: action")],
    });
  }

  /** Schedule through the campaign notification service, as a campaign row does */
  private scheduleCampaignTestNotification(id: string, at: Date) {
    const notification = {
      // replaced with a generated integer id when scheduled
      id: 0,
      title: "Test notification (campaign)",
      body: "Tap to check that its actions run",
      schedule: { at },
      extra: {
        campaign_id: TEST_CAMPAIGN_ID,
        row_id: id,
        action_list: [toastAction("click", "Tap actions ran: campaign")],
      },
    } as ILocalNotification;
    return this.localNotificationService.scheduleNotification(notification, id);
  }
}

function toastAction(
  trigger: FlowTypes.TemplateRowActionTrigger,
  message: string
): FlowTypes.TemplateRowAction {
  return { trigger, action_id: "toast", args: [], params: { message } };
}
