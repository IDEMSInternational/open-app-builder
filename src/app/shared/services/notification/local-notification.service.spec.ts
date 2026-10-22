import { TestBed } from "@angular/core/testing";
import type {
  CancelOptions,
  LocalNotificationsPlugin,
  PendingResult,
  ScheduleOptions,
  ScheduleResult,
} from "@capacitor/local-notifications";

import { ILocalNotification, LocalNotificationService } from "./local-notification.service";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.mock.spec";

/** Mock of the capacitor LocalNotifications api methods used when syncing notifications to the device */
class MockLocalNotificationsApi implements Pick<
  LocalNotificationsPlugin,
  "getPending" | "cancel" | "schedule"
> {
  async getPending(): Promise<PendingResult> {
    return { notifications: [] };
  }
  async cancel(options: CancelOptions): Promise<void> {
    return;
  }
  async schedule(options: ScheduleOptions): Promise<ScheduleResult> {
    return { notifications: [] };
  }
}

/** Notification booked by this service via the campaign system */
const campaignNotification = {
  id: 1,
  title: "Campaign Title",
  body: "Campaign Text",
  extra: { campaign_id: "campaign_1", row_id: "row_1" },
};

/** Notification booked by the NotificationService (`notification` action) */
const actionNotification = {
  id: 2,
  title: "Action Title",
  body: "Action Text",
  extra: { source: "action", id: "action_notification" },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/notification/local-notification.service.spec.ts
 */
describe("LocalNotificationService", () => {
  let service: LocalNotificationService;
  let api: MockLocalNotificationsApi;
  let getDBNotificationsSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppConfigService, useValue: new MockAppConfigService() }],
    });
    service = TestBed.inject(LocalNotificationService);
    // Replace localnotification api with mock
    api = new MockLocalNotificationsApi();
    service["api"] = api as any as LocalNotificationsPlugin;
    // Replace db notification records with mock
    getDBNotificationsSpy = spyOn(service as any, "getDBNotifications").and.resolveTo([]);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("setApiNotifications", () => {
    it("should replace its own notifications and keep notification action ones", async () => {
      const pendingCampaignNotification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() + 60000) },
      } as ILocalNotification;
      spyOn(api, "getPending").and.resolveTo({
        notifications: [pendingCampaignNotification, actionNotification],
      });
      getDBNotificationsSpy.and.resolveTo([pendingCampaignNotification]);
      service.pendingNotifications$.next([pendingCampaignNotification]);
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();
      const scheduleSpy = spyOn(api, "schedule").and.resolveTo({ notifications: [] });

      await service["setApiNotifications"]();

      expect(cancelSpy).toHaveBeenCalledOnceWith({ notifications: [pendingCampaignNotification] });
      expect(scheduleSpy).toHaveBeenCalledOnceWith({
        notifications: [pendingCampaignNotification],
      });
    });

    it("should not call cancel when only notification action notifications are pending", async () => {
      spyOn(api, "getPending").and.resolveTo({ notifications: [actionNotification] });
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();

      await service["setApiNotifications"]();

      expect(cancelSpy).not.toHaveBeenCalled();
    });

    it("should keep its own notifications that are due but not yet shown", async () => {
      // e.g. Android delivering an inexact alarm after its scheduled time
      const dueNotification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() - 60000) },
      } as ILocalNotification;
      getDBNotificationsSpy.and.resolveTo([dueNotification]);
      spyOn(api, "getPending").and.resolveTo({ notifications: [dueNotification] });
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();

      await service["setApiNotifications"]();

      expect(cancelSpy).not.toHaveBeenCalled();
    });

    it("should cancel due notifications that are no longer in its records", async () => {
      // e.g. removed when its campaign was deactivated
      const dueNotification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() - 60000) },
      } as ILocalNotification;
      spyOn(api, "getPending").and.resolveTo({ notifications: [dueNotification] });
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();

      await service["setApiNotifications"]();

      expect(cancelSpy).toHaveBeenCalledOnceWith({ notifications: [dueNotification] });
    });
  });

  describe("scheduleNotification", () => {
    beforeEach(() => {
      service.permissionGranted = true;
      service.localNotificationDefaults = { id: null, title: "", body: "", extra: {} };
      spyOn(service as any, "addDBNotification").and.resolveTo();
    });

    it("should allow delivery while the device is idle", async () => {
      const notification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() + 60000) },
      } as ILocalNotification;

      await service.scheduleNotification(notification, "row_1");

      expect(notification.schedule.allowWhileIdle).toBeTrue();
    });
  });
});
