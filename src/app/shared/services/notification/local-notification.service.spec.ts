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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppConfigService, useValue: new MockAppConfigService() }],
    });
    service = TestBed.inject(LocalNotificationService);
    // Replace localnotification api with mock
    api = new MockLocalNotificationsApi();
    service["api"] = api as any as LocalNotificationsPlugin;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("setApiNotifications", () => {
    it("should not cancel notifications booked by the notification action", async () => {
      spyOn(api, "getPending").and.resolveTo({
        notifications: [campaignNotification, actionNotification],
      });
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();

      await service["setApiNotifications"]();

      expect(cancelSpy).toHaveBeenCalledOnceWith({ notifications: [campaignNotification] });
    });

    it("should not call cancel when only notification action notifications are pending", async () => {
      spyOn(api, "getPending").and.resolveTo({ notifications: [actionNotification] });
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();

      await service["setApiNotifications"]();

      expect(cancelSpy).not.toHaveBeenCalled();
    });

    it("should reschedule its own pending notifications", async () => {
      const pendingNotification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() + 60000) },
      } as ILocalNotification;
      service.pendingNotifications$.next([pendingNotification]);
      const scheduleSpy = spyOn(api, "schedule").and.resolveTo({ notifications: [] });

      await service["setApiNotifications"]();

      expect(scheduleSpy).toHaveBeenCalledOnceWith({ notifications: [pendingNotification] });
    });
  });
});
