import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import type { PendingLocalNotificationSchema } from "@capacitor/local-notifications";
import { IonicModule, ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import type { ILocalNotificationInteractionDB } from "src/app/shared/services/notification/local-notification-persist.adapter";
import {
  ILocalNotification,
  LocalNotificationService,
  TEST_CAMPAIGN_ID,
} from "src/app/shared/services/notification/local-notification.service";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import { NotificationService } from "../../notification.service";
import { IDBNotification } from "../../notification.types";
import { TEST_COPY_ID_PREFIX, TEST_NOTIFICATION_ID_PREFIX } from "./notifications-debug.constants";
import { NotificationsDebugPage } from "./notifications-debug.page";

const HOUR = 60 * 60 * 1000;

/** Test notification ids are the prefix followed by the due time */
const testNotificationId = jasmine.stringMatching(
  new RegExp(`^${TEST_NOTIFICATION_ID_PREFIX}_\\d+$`)
);

function campaignRecord(id: number, extra: Record<string, any> = {}) {
  return {
    id,
    title: `Campaign ${id}`,
    body: "Campaign text",
    schedule: { at: new Date(Date.now() + HOUR) },
    extra: { campaign_id: "campaign_1", row_id: `row_${id}`, ...extra },
  } as ILocalNotification;
}

function actionRecord(id: string, _internal_id: number): IDBNotification {
  return {
    id,
    title: `Action ${id}`,
    text: "Action text",
    schedule_at: new Date(Date.now() + HOUR).toISOString(),
    action_list: [{ trigger: "notification_interacted", action_id: "go_to", args: ["home"] }],
    _internal_id,
    status: "pending",
  };
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/notification/pages/notifications-debug/notifications-debug.page.spec.ts
 */
describe("NotificationsDebugPage", () => {
  let component: NotificationsDebugPage;
  let fixture: ComponentFixture<NotificationsDebugPage>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;
  let mockLocalNotificationService: jasmine.SpyObj<LocalNotificationService>;
  let mockPersistAdapter: jasmine.SpyObj<LocalNotificationService["persistAdapter"]>;
  let actionRecords$: BehaviorSubject<IDBNotification[]>;
  let campaignHistory$: BehaviorSubject<ILocalNotificationInteractionDB[]>;

  beforeEach(async () => {
    actionRecords$ = new BehaviorSubject<IDBNotification[]>([]);
    campaignHistory$ = new BehaviorSubject<ILocalNotificationInteractionDB[]>([]);

    mockNotificationService = jasmine.createSpyObj<NotificationService>(
      "NotificationService",
      [
        "listNotifications$",
        "listDevicePendingNotifications",
        "scheduleNotification",
        "cancelNotification",
        "cancelDevicePendingNotifications",
        "requestPermission",
      ],
      { status: signal("granted") as any }
    );
    mockNotificationService.listNotifications$.and.returnValue(actionRecords$);
    mockNotificationService.listDevicePendingNotifications.and.resolveTo([]);

    mockPersistAdapter = jasmine.createSpyObj("LocalNotificationPersistAdapter", [
      "removeEntries",
      "loadInteractedNotifications",
    ]);
    (mockPersistAdapter as any).dbEntries$ = campaignHistory$;

    mockLocalNotificationService = jasmine.createSpyObj<LocalNotificationService>(
      "LocalNotificationService",
      [
        "ready",
        "getDBNotifications",
        "scheduleNotification",
        "scheduleImmediateNotification",
        "removeNotifications",
        "removeNotificationsWithoutRescheduling",
      ],
      { persistAdapter: mockPersistAdapter }
    );
    mockLocalNotificationService.ready.and.resolveTo(true);
    mockLocalNotificationService.getDBNotifications.and.resolveTo([]);

    await TestBed.configureTestingModule({
      imports: [NotificationsDebugPage, IonicModule.forRoot()],
      providers: [
        { provide: LocalNotificationService, useValue: mockLocalNotificationService },
        { provide: DBSyncService, useValue: { ready: async () => true } },
        { provide: NotificationService, useValue: mockNotificationService },
        {
          provide: ToastController,
          useValue: { create: async () => ({ present: async () => {} }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsDebugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("lists upcoming notifications from both systems, checked against the device", async () => {
    mockLocalNotificationService.getDBNotifications.and.resolveTo([campaignRecord(1)]);
    mockNotificationService.listDevicePendingNotifications.and.resolveTo([
      { id: 1 } as PendingLocalNotificationSchema,
    ]);
    actionRecords$.next([actionRecord("action_1", 2)]);

    await component.refresh();

    const upcoming = component.upcoming();
    expect(upcoming.map((n) => [n.source, n.warning])).toEqual([
      ["campaign", undefined],
      ["action", "Won't arrive: not scheduled on this device"],
    ]);
  });

  describe("test copies", () => {
    it("sends a copy of a campaign notification in 1 minute", async () => {
      const record = campaignRecord(1);
      mockLocalNotificationService.getDBNotifications.and.resolveTo([record]);
      await component.refresh();

      await component.sendTestCopy(component.upcoming()[0]);

      expect(mockLocalNotificationService.scheduleImmediateNotification).toHaveBeenCalledOnceWith(
        record,
        60
      );
    });

    it("sends a copy of a notification action notification in 1 minute, with its own id", async () => {
      const record = actionRecord("action_1", 2);
      actionRecords$.next([record]);
      const before = Date.now();

      await component.sendTestCopy(component.upcoming()[0]);

      const [copy] = mockNotificationService.scheduleNotification.calls.mostRecent().args;
      expect(copy.id).toEqual(
        jasmine.stringMatching(new RegExp(`^${TEST_COPY_ID_PREFIX}_action_1_\\d+$`))
      );
      expect(copy.title).toEqual(record.title);
      expect(copy.text).toEqual(record.text);
      expect(copy.action_list).toEqual(record.action_list);
      const delayMs = new Date(copy.schedule_at).getTime() - before;
      expect(delayMs).toBeGreaterThanOrEqual(60000);
      expect(delayMs).toBeLessThan(61000);
    });
  });

  describe("test notifications", () => {
    it("schedules a notification action test that shows a toast when tapped", async () => {
      component.setDelay(60);
      const before = Date.now();

      await component.sendTestNotification("action");

      const [notification] = mockNotificationService.scheduleNotification.calls.mostRecent().args;
      expect(notification.id).toEqual(testNotificationId);
      expect(notification.action_list).toEqual([
        jasmine.objectContaining({ trigger: "notification_interacted", action_id: "toast" }),
      ]);
      const delayMs = new Date(notification.schedule_at).getTime() - before;
      expect(delayMs).toBeGreaterThanOrEqual(60000);
      expect(delayMs).toBeLessThan(61000);
    });

    it("schedules a campaign test that shows a toast when tapped", async () => {
      await component.sendTestNotification("campaign");

      const [notification, rowId] =
        mockLocalNotificationService.scheduleNotification.calls.mostRecent().args;
      expect(rowId).toEqual(testNotificationId);
      expect(notification.extra.campaign_id).toEqual(TEST_CAMPAIGN_ID);
      expect(notification.extra.action_list).toEqual([
        jasmine.objectContaining({ trigger: "click", action_id: "toast" }),
      ]);
    });

    it("gives each test notification its own id, so several can be scheduled at once", async () => {
      component.setDelay(60);
      await component.sendTestNotification("campaign");
      component.setDelay(300);
      await component.sendTestNotification("campaign");

      const [first, second] = mockLocalNotificationService.scheduleNotification.calls
        .allArgs()
        .map(([, rowId]) => rowId);
      expect(first).not.toEqual(second);
    });

    it("clears test notifications from the device, both systems and campaign history", async () => {
      // test notifications found only on the device, and one that is not a test
      mockNotificationService.listDevicePendingNotifications.and.resolveTo([
        { id: 8, extra: { campaign_id: TEST_CAMPAIGN_ID } },
        { id: 9, extra: { source: "action", id: `${TEST_NOTIFICATION_ID_PREFIX}_456` } },
        { id: 10, extra: { campaign_id: "campaign_1" } },
      ] as PendingLocalNotificationSchema[]);
      await component.refresh();
      actionRecords$.next([
        actionRecord(`${TEST_NOTIFICATION_ID_PREFIX}_123`, 2),
        actionRecord("action_1", 3),
      ]);
      mockLocalNotificationService.getDBNotifications.and.resolveTo([
        campaignRecord(1, { campaign_id: TEST_CAMPAIGN_ID }),
        campaignRecord(2, { test_copy: true }),
        campaignRecord(3),
      ]);
      campaignHistory$.next([
        { notification_id: 1, notification_meta: { campaign_id: TEST_CAMPAIGN_ID } },
        { notification_id: 4, notification_meta: { campaign_id: "campaign_1" } },
        { notification_id: 5, notification_meta: { source: "action", id: "debug_test_copy_x_1" } },
      ] as ILocalNotificationInteractionDB[]);

      await component.clearTestNotifications();

      expect(mockNotificationService.cancelDevicePendingNotifications).toHaveBeenCalledOnceWith([
        8, 9,
      ]);
      expect(mockNotificationService.cancelNotification).toHaveBeenCalledOnceWith(
        `${TEST_NOTIFICATION_ID_PREFIX}_123`
      );
      // without rescheduling, which would cancel action notifications on the device (#3722)
      expect(
        mockLocalNotificationService.removeNotificationsWithoutRescheduling
      ).toHaveBeenCalledOnceWith([1, 2]);
      expect(mockLocalNotificationService.removeNotifications).not.toHaveBeenCalled();
      // history of cleared campaign notifications, including any not recorded yet
      expect(mockPersistAdapter.removeEntries).toHaveBeenCalledOnceWith([1, 5, 2]);
    });
  });
});
