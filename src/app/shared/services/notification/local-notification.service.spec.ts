import { signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import type { PermissionState } from "@capacitor/core";
import type {
  CancelOptions,
  LocalNotificationsPlugin,
  PendingResult,
  ScheduleOptions,
  ScheduleResult,
} from "@capacitor/local-notifications";

import {
  createTestCopy,
  ILocalNotification,
  LocalNotificationService,
} from "./local-notification.service";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.mock.spec";
import { NotificationService } from "src/app/feature/notification/notification.service";

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
  /** Notification permission status, as tracked by the NotificationService */
  let permissionStatus: ReturnType<typeof signal<PermissionState | undefined>>;

  beforeEach(() => {
    permissionStatus = signal<PermissionState | undefined>(undefined);
    TestBed.configureTestingModule({
      providers: [
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: NotificationService, useValue: { status: permissionStatus.asReadonly() } },
      ],
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

  describe("notification permission", () => {
    it("should start syncing notifications when permission is granted after launch", async () => {
      spyOn(service, "ready").and.resolveTo(true);
      const startSyncSpy = spyOn(service as any, "startNotificationSync").and.resolveTo();

      permissionStatus.set("granted");
      TestBed.tick();
      await Promise.resolve();

      expect(service.permissionGranted).toBeTrue();
      expect(startSyncSpy).toHaveBeenCalledTimes(1);
    });

    it("should keep the permission found at launch until the status is first checked", () => {
      service.permissionGranted = true;

      TestBed.tick();

      expect(service.permissionGranted).toBeTrue();
    });

    describe("when permission is withdrawn", () => {
      beforeEach(() => {
        service.permissionGranted = true;
        service.canSchedule$.next(true);
        permissionStatus.set("denied");
        TestBed.tick();
      });

      it("should mark notifications as unable to reach the device", () => {
        expect(service.permissionGranted).toBeFalse();
        expect(service.canSchedule$.value).toBeFalse();
      });

      it("should not record new notifications", async () => {
        const addDBNotificationSpy = spyOn(service as any, "addDBNotification").and.resolveTo();
        const notification = {
          ...campaignNotification,
          schedule: { at: new Date(Date.now() + 60000) },
        } as ILocalNotification;

        await service.scheduleNotification(notification, "row_1");

        expect(addDBNotificationSpy).not.toHaveBeenCalled();
      });

      it("should not sync notifications to the device", async () => {
        const getPendingSpy = spyOn(api, "getPending").and.callThrough();
        const scheduleSpy = spyOn(api, "schedule").and.resolveTo({ notifications: [] });
        service.pendingNotifications$.next([
          { ...campaignNotification, schedule: { at: new Date(Date.now() + 60000) } },
        ]);

        await service["setApiNotifications"]();

        expect(getPendingSpy).not.toHaveBeenCalled();
        expect(scheduleSpy).not.toHaveBeenCalled();
      });
    });

    describe("startNotificationSync", () => {
      let loaderSubscribeSpy: jasmine.Spy;

      beforeEach(() => {
        service.permissionGranted = true;
        // the notification loader is piped once per subscription
        loaderSubscribeSpy = spyOn(
          service["notificationsLoader$"] as any,
          "pipe"
        ).and.callThrough();
      });

      it("should load existing notifications before allowing scheduling", async () => {
        // so that the first schedule after permission is granted replaces them
        spyOn(service as any, "handleUnprocessedNotifications").and.resolveTo();
        const existing = {
          ...campaignNotification,
          schedule: { at: new Date(Date.now() + 60000) },
        } as ILocalNotification;
        getDBNotificationsSpy.and.resolveTo([existing]);
        let pendingWhenAllowed: ILocalNotification[] = [];
        service.canSchedule$.subscribe((canSchedule) => {
          if (canSchedule) pendingWhenAllowed = service.pendingNotifications$.value;
        });

        await service["startNotificationSync"]();

        expect(pendingWhenAllowed).toEqual([existing]);
      });

      it("should only set up notification sync once", async () => {
        spyOn(service as any, "handleUnprocessedNotifications").and.resolveTo();

        await service["startNotificationSync"]();
        await service["startNotificationSync"]();

        expect(loaderSubscribeSpy).toHaveBeenCalledTimes(1);
        expect(service.canSchedule$.value).toBeTrue();
      });

      it("should share a setup already in progress", async () => {
        spyOn(service as any, "handleUnprocessedNotifications").and.resolveTo();

        await Promise.all([service["startNotificationSync"](), service["startNotificationSync"]()]);

        expect(loaderSubscribeSpy).toHaveBeenCalledTimes(1);
      });

      it("should retry a failed setup when called again", async () => {
        spyOn(console, "error");
        let attempts = 0;
        spyOn(service as any, "handleUnprocessedNotifications").and.callFake(async () => {
          if (attempts++ === 0) throw new Error("db error");
        });

        await service["startNotificationSync"]();
        expect(service.canSchedule$.value).toBeFalse();
        expect(loaderSubscribeSpy).not.toHaveBeenCalled();

        await service["startNotificationSync"]();
        expect(service.canSchedule$.value).toBeTrue();
        expect(loaderSubscribeSpy).toHaveBeenCalledTimes(1);
      });

      it("should allow scheduling again when permission is granted again", async () => {
        spyOn(service as any, "handleUnprocessedNotifications").and.resolveTo();
        await service["startNotificationSync"]();
        // permission withdrawn, then granted again
        service.permissionGranted = false;
        service["setCanSchedule"](false);
        service.permissionGranted = true;

        await service["startNotificationSync"]();

        expect(service.canSchedule$.value).toBeTrue();
        expect(loaderSubscribeSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("setApiNotifications", () => {
    beforeEach(() => {
      service.permissionGranted = true;
    });

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

    it("should cancel notifications that became due more than an hour ago", async () => {
      // Android delivers inexact alarms at most an hour late
      const staleNotification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      } as ILocalNotification;
      getDBNotificationsSpy.and.resolveTo([staleNotification]);
      spyOn(api, "getPending").and.resolveTo({ notifications: [staleNotification] });
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();

      await service["setApiNotifications"]();

      expect(cancelSpy).toHaveBeenCalledOnceWith({ notifications: [staleNotification] });
    });

    describe("across syncs", () => {
      beforeEach(() => jasmine.clock().install());
      afterEach(() => jasmine.clock().uninstall());

      it("should keep a notification that becomes due between syncs but is not yet shown", async () => {
        const start = new Date("2026-10-22T19:00:00");
        jasmine.clock().mockDate(start);
        const notification = {
          ...campaignNotification,
          schedule: { at: new Date(start.getTime() + 60 * 1000) },
        } as ILocalNotification;
        getDBNotificationsSpy.and.resolveTo([notification]);
        spyOn(api, "getPending").and.resolveTo({ notifications: [notification] });
        const cancelSpy = spyOn(api, "cancel").and.resolveTo();

        // first sync while still in the future: replaced (cancelled and rebooked)
        service.pendingNotifications$.next([notification]);
        await service["setApiNotifications"]();
        expect(cancelSpy).toHaveBeenCalledTimes(1);

        // next sync after its time, with the alarm still pending on the device
        jasmine.clock().mockDate(new Date(start.getTime() + 3 * 60 * 1000));
        service.pendingNotifications$.next([]);
        await service["setApiNotifications"]();
        expect(cancelSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("cancelLateNotifications", () => {
    it("should cancel selected notifications that are due but not yet shown", async () => {
      const late = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() - 60 * 1000) },
      } as ILocalNotification;
      const lateOtherCampaign = {
        ...late,
        id: 3,
        extra: { campaign_id: "campaign_2", row_id: "row_2" },
      } as ILocalNotification;
      const future = {
        ...campaignNotification,
        id: 4,
        schedule: { at: new Date(Date.now() + 60 * 1000) },
      } as ILocalNotification;
      getDBNotificationsSpy.and.resolveTo([late, lateOtherCampaign, future]);
      spyOn(api, "getPending").and.resolveTo({ notifications: [late, lateOtherCampaign, future] });
      const cancelSpy = spyOn(api, "cancel").and.resolveTo();

      await service.cancelLateNotifications((n) => n.extra?.campaign_id === "campaign_1");

      expect(cancelSpy).toHaveBeenCalledOnceWith({ notifications: [late] });
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

    it("should allow delivery while idle even if a schedule turns it off", async () => {
      const notification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() + 60000), allowWhileIdle: false },
      } as ILocalNotification;

      await service.scheduleNotification(notification, "row_1");

      expect(notification.schedule.allowWhileIdle).toBeTrue();
    });

    it("should allow delivery while idle for notifications sent immediately", async () => {
      // e.g. "Send Now" on the notifications debug page
      const scheduleSpy = spyOn(api, "schedule").and.resolveTo({ notifications: [] });
      const notification = {
        ...campaignNotification,
        schedule: { at: new Date(Date.now() + 60000) },
      } as ILocalNotification;

      await service.scheduleImmediateNotification(notification, 4);

      const [{ notifications }] = scheduleSpy.calls.mostRecent().args;
      expect(notifications[0].schedule).toEqual(jasmine.objectContaining({ allowWhileIdle: true }));
    });
  });

  it("removes notifications without rescheduling the others on the device", async () => {
    const db = jasmine.createSpyObj("Table", ["bulkDelete"]);
    db.bulkDelete.and.resolveTo();
    (service as any).db = db;
    const reschedule = spyOn(service as any, "loadNotifications");
    service.pendingNotifications$.next([{ id: 1 }, { id: 3 }] as ILocalNotification[]);

    await service.removeNotificationsWithoutRescheduling([1, 2]);

    expect(db.bulkDelete).toHaveBeenCalledOnceWith([1, 2]);
    expect(service.pendingNotifications$.value.map((n) => n.id)).toEqual([3]);
    expect(reschedule).not.toHaveBeenCalled();
  });
});

describe("createTestCopy", () => {
  const notification: ILocalNotification = {
    id: 123,
    title: "Title",
    body: "Text",
    schedule: { at: new Date("2026-10-27T09:00:00") },
    extra: { campaign_id: "campaign_1", row_id: "row_1", action_list: [] },
    _row_id: "row_1",
    _action_performed: "tap",
    _callbacks_processed_time: 1000,
  };
  const at = new Date("2026-10-27T12:00:00");

  it("sends the copy as part of the test campaign, keeping the original campaign", () => {
    const { immediateNotification } = createTestCopy(notification, at);
    expect(immediateNotification.schedule).toEqual({ at });
    expect(immediateNotification.extra).toEqual({
      campaign_id: "debug_test",
      original_campaign_id: "campaign_1",
      row_id: "row_1",
      action_list: [],
      test_copy: true,
    });
    expect(notification.extra.campaign_id).toEqual("campaign_1");
  });

  it("does not copy whether the original was tapped or processed", () => {
    const { immediateNotification } = createTestCopy(notification, at);
    expect(immediateNotification._action_performed).toBeUndefined();
    expect(immediateNotification._callbacks_processed_time).toBeUndefined();
  });

  it("keeps the original campaign when copying a copy", () => {
    const { immediateNotification: copy } = createTestCopy(notification, at);
    const { immediateNotification } = createTestCopy(copy, at);
    expect(immediateNotification.extra.original_campaign_id).toEqual("campaign_1");
  });

  it("gives each copy its own row id, so copies made at once do not replace each other", () => {
    const first = createTestCopy(notification, at);
    const second = createTestCopy(notification, at);
    expect(first.rowId).toMatch(/^row_1_test_copy_/);
    expect(first.rowId).not.toEqual(second.rowId);
  });
});
