import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import type { PendingLocalNotificationSchema } from "@capacitor/local-notifications";
import { IonicModule } from "@ionic/angular";
import { of } from "rxjs";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import { NotificationService } from "../../notification.service";
import {
  NotificationsDebugPage,
  TEST_CAMPAIGN_ID,
  TEST_NOTIFICATION_ID,
  toDeviceNotification,
} from "./notifications-debug.page";

const campaignNotification: PendingLocalNotificationSchema = {
  id: 1,
  title: "Campaign Title",
  body: "Campaign Text",
  schedule: { at: new Date("2026-10-22T19:00:00") },
  extra: { campaign_id: "campaign_1", row_id: "row_1" },
};
const actionNotification: PendingLocalNotificationSchema = {
  id: 2,
  title: "Action Title",
  body: "Action Text",
  schedule: { at: new Date("2026-10-22T09:00:00") },
  extra: { source: "action", id: "action_notification" },
};
const otherNotification: PendingLocalNotificationSchema = {
  id: 3,
  title: "Other Title",
  body: "Other Text",
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/notification/pages/notifications-debug/notifications-debug.page.spec.ts
 */
describe("NotificationsDebugPage", () => {
  let component: NotificationsDebugPage;
  let fixture: ComponentFixture<NotificationsDebugPage>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;
  let mockLocalNotificationService: jasmine.SpyObj<LocalNotificationService>;

  beforeEach(async () => {
    mockNotificationService = jasmine.createSpyObj<NotificationService>(
      "NotificationService",
      [
        "listNotifications$",
        "listDevicePendingNotifications",
        "scheduleNotification",
        "requestPermission",
      ],
      { status: signal("granted") as any }
    );
    mockNotificationService.listNotifications$.and.returnValue(of([]));
    mockNotificationService.listDevicePendingNotifications.and.resolveTo([]);

    mockLocalNotificationService = jasmine.createSpyObj<LocalNotificationService>(
      "LocalNotificationService",
      ["ready", "scheduleNotification", "scheduleImmediateNotification"],
      {
        pendingNotifications$: of([]) as any,
        persistAdapter: { dbEntries$: of([]) } as any,
      }
    );
    mockLocalNotificationService.ready.and.resolveTo(true);

    await TestBed.configureTestingModule({
      imports: [NotificationsDebugPage, IonicModule.forRoot()],
      providers: [
        { provide: LocalNotificationService, useValue: mockLocalNotificationService },
        { provide: DBSyncService, useValue: { ready: async () => true } },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsDebugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("toDeviceNotification", () => {
    it("labels notifications by the system that scheduled them", () => {
      expect(toDeviceNotification(campaignNotification)).toEqual(
        jasmine.objectContaining({ source: "campaign", sourceId: "campaign_1" })
      );
      expect(toDeviceNotification(actionNotification)).toEqual(
        jasmine.objectContaining({ source: "action", sourceId: "action_notification" })
      );
      expect(toDeviceNotification(otherNotification)).toEqual(
        jasmine.objectContaining({ source: "other", sourceId: undefined })
      );
    });
  });

  it("lists notifications scheduled on the device, soonest first", async () => {
    mockNotificationService.listDevicePendingNotifications.and.resolveTo([
      campaignNotification,
      actionNotification,
    ]);

    await component.refreshDeviceNotifications();

    expect(component.deviceNotifications().map((n) => n.source)).toEqual(["action", "campaign"]);
  });

  describe("test notifications", () => {
    it("schedules a notification action test that shows a toast when tapped", async () => {
      component.setDelay(60);
      const before = Date.now();

      await component.sendTestNotification("action");

      const [notification] = mockNotificationService.scheduleNotification.calls.mostRecent().args;
      expect(notification.id).toEqual(TEST_NOTIFICATION_ID);
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
      expect(rowId).toEqual(TEST_NOTIFICATION_ID);
      expect(notification.extra.campaign_id).toEqual(TEST_CAMPAIGN_ID);
      expect(notification.extra.action_list).toEqual([
        jasmine.objectContaining({ trigger: "click", action_id: "toast" }),
      ]);
    });

    it("sends copies of campaign notifications after the selected delay", async () => {
      const notification = { ...campaignNotification } as any;
      component.setDelay(300);

      await component.sendCampaignNotificationCopy(notification);

      expect(mockLocalNotificationService.scheduleImmediateNotification).toHaveBeenCalledOnceWith(
        notification,
        300
      );
    });
  });
});
