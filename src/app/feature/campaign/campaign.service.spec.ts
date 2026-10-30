import { TestBed } from "@angular/core/testing";
import type { ActionPerformed } from "@capacitor/local-notifications";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from "src/app/shared/model";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplateVariablesService } from "src/app/shared/components/template/services/template-variables.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { AppStartupService } from "src/app/shared/services/app-startup/app-startup.service";
import { CapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.service";
import { MockCapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.mock.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import {
  ILocalNotification,
  LocalNotificationService,
} from "src/app/shared/services/notification/local-notification.service";
import { CampaignService } from "./campaign.service";

export class MockCampaignService implements Partial<CampaignService> {
  public async ready(timeoutValue?: number): Promise<boolean> {
    return true;
  }
  //   TODO - implement further methods
}

const clickAction: FlowTypes.TemplateRowAction = {
  trigger: "click",
  action_id: "set_field",
  args: ["notification_tapped", true],
};
const sentAction: FlowTypes.TemplateRowAction = {
  trigger: "sent",
  action_id: "set_field",
  args: ["notification_sent", true],
};

/** Wait for pending promise callbacks to run */
const flush = () => new Promise((resolve) => setTimeout(resolve));

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/campaign/campaign.service.spec.ts
 */
describe("CampaignService", () => {
  let service: CampaignService;
  let capacitorEvents: MockCapacitorEventService;
  let appStartupService: AppStartupService;
  let mockLocalNotificationService: jasmine.SpyObj<LocalNotificationService>;
  let deploymentConfig: { campaigns: { enabled: boolean } };
  let triggerRowActionsSpy: jasmine.Spy;
  let scheduleSpy: jasmine.Spy;
  /** Data lists returned by the mock AppDataService */
  let dataLists: { flow_subtype: string; rows: any[] }[];

  /** Emit a notification tap, as received from the capacitor api */
  function tapNotification(extra: Record<string, any>) {
    capacitorEvents.localNotificationActionPerformed.next({
      actionId: "tap",
      notification: { id: 1, title: "Title", body: "Text", extra },
    } as ActionPerformed);
  }

  // The service is created in each describe block, as some tests emit events before it exists
  beforeEach(() => {
    capacitorEvents = new MockCapacitorEventService();
    deploymentConfig = { campaigns: { enabled: false } };
    dataLists = [];
    mockLocalNotificationService = jasmine.createSpyObj<LocalNotificationService>(
      "LocalNotificationService",
      ["ready", "removeNotifications", "cancelLateNotifications", "scheduleNotification"],
      {
        pendingNotifications$: new BehaviorSubject<ILocalNotification[]>([]),
        sessionNotifications$: new BehaviorSubject<ILocalNotification[]>([]),
        interactedNotification$: new BehaviorSubject(null),
        canSchedule$: new BehaviorSubject(false),
      }
    );
    mockLocalNotificationService.ready.and.resolveTo(true);
    const ready = async () => true;
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataEvaluationService,
          useValue: { ready, refreshDBCache: async () => {}, evaluateReminderCondition: ready },
        },
        { provide: TemplateTranslateService, useValue: { ready, translateRow: (row) => row } },
        { provide: TemplateVariablesService, useValue: { ready, evaluatePLHData: async (d) => d } },
        {
          provide: AppDataService,
          useValue: {
            // copies, like the real service
            getSheetsWithData: async (_type, filterFn) =>
              structuredClone(dataLists.filter(filterFn)),
          },
        },
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: DeploymentService, useValue: { config: deploymentConfig } },
        { provide: LocalNotificationService, useValue: mockLocalNotificationService },
        { provide: CapacitorEventService, useValue: capacitorEvents },
      ],
    });
    appStartupService = TestBed.inject(AppStartupService);
  });

  afterEach(() => {
    // avoid the service's delayed init loading campaigns after the test
    deploymentConfig.campaigns.enabled = false;
  });

  describe("notification tapped while the app is running", () => {
    beforeEach(() => {
      service = TestBed.inject(CampaignService);
      triggerRowActionsSpy = spyOn(service, "triggerRowActions").and.resolveTo();
      spyOn(service, "ready").and.resolveTo(true);
      scheduleSpy = spyOn(service, "scheduleCampaignNotifications").and.resolveTo();
    });

    it("should run click actions once app startup has finished", async () => {
      tapNotification({
        campaign_id: "campaign_1",
        row_id: "row_1",
        action_list: [clickAction, sentAction],
      });
      await flush();
      expect(triggerRowActionsSpy).not.toHaveBeenCalled();

      appStartupService.markComplete();
      await flush();
      expect(triggerRowActionsSpy).toHaveBeenCalledOnceWith([clickAction]);
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
    });

    it("should ignore taps on notifications not booked by campaigns", async () => {
      appStartupService.markComplete();
      tapNotification({ source: "action", id: "action_notification" });
      await flush();
      expect(triggerRowActionsSpy).not.toHaveBeenCalled();
      expect(scheduleSpy).not.toHaveBeenCalled();
    });
  });

  describe("notification tap that opened the app", () => {
    beforeEach(() => {
      // tap emitted before the service is created, as when a tap starts the app
      tapNotification({ campaign_id: "campaign_1", row_id: "row_1", action_list: [clickAction] });
      service = TestBed.inject(CampaignService);
      triggerRowActionsSpy = spyOn(service, "triggerRowActions").and.resolveTo();
      spyOn(service, "ready").and.resolveTo(true);
      scheduleSpy = spyOn(service, "scheduleCampaignNotifications").and.resolveTo();
    });

    it("should run click actions of the earlier tap once app startup has finished", async () => {
      await flush();
      expect(triggerRowActionsSpy).not.toHaveBeenCalled();

      appStartupService.markComplete();
      await flush();
      expect(triggerRowActionsSpy).toHaveBeenCalledOnceWith([clickAction]);
    });
  });

  describe("scheduleCampaignNotifications", () => {
    beforeEach(() => {
      service = TestBed.inject(CampaignService);
      mockLocalNotificationService.canSchedule$.next(true);
    });

    it("should leave existing notifications unchanged when they cannot reach the device", async () => {
      // e.g. rescheduling after a notification action while permission is withdrawn
      mockLocalNotificationService.canSchedule$.next(false);
      service.scheduledCampaigns = { campaign_1: { id: "campaign_1", _active: false } as any };

      await service.scheduleCampaignNotifications();

      expect(mockLocalNotificationService.removeNotifications).not.toHaveBeenCalled();
      expect(mockLocalNotificationService.cancelLateNotifications).not.toHaveBeenCalled();
    });

    it("should cancel late notifications of campaigns that no longer apply", async () => {
      service.scheduledCampaigns = { campaign_1: { id: "campaign_1", _active: false } as any };

      await service.scheduleCampaignNotifications();

      expect(mockLocalNotificationService.cancelLateNotifications).toHaveBeenCalledTimes(1);
      const [filterFn] =
        mockLocalNotificationService.cancelLateNotifications.calls.mostRecent().args;
      expect(filterFn({ extra: { campaign_id: "campaign_1" } })).toBeTrue();
      expect(filterFn({ extra: { campaign_id: "campaign_2" } })).toBeFalse();
    });

    it("should keep late notifications of active campaigns", async () => {
      service.scheduledCampaigns = { campaign_1: { id: "campaign_1", _active: true } as any };
      spyOn(service, "getNextCampaignRows").and.resolveTo([]);

      await service.scheduleCampaignNotifications();

      expect(mockLocalNotificationService.cancelLateNotifications).not.toHaveBeenCalled();
    });

    it("should run one scheduling at a time", async () => {
      service.scheduledCampaigns = { campaign_1: { id: "campaign_1", _active: true } as any };
      let finishFirst: (rows: FlowTypes.Campaign_listRow[]) => void;
      const nextRowsSpy = spyOn(service, "getNextCampaignRows").and.returnValues(
        new Promise((resolve) => (finishFirst = resolve)),
        Promise.resolve([])
      );

      const first = service.scheduleCampaignNotifications();
      const second = service.scheduleCampaignNotifications();
      await flush();
      expect(nextRowsSpy).toHaveBeenCalledTimes(1);

      finishFirst([]);
      await Promise.all([first, second]);
      expect(nextRowsSpy).toHaveBeenCalledTimes(2);
    });

    it("should still schedule after a failed run", async () => {
      service.scheduledCampaigns = { campaign_1: { id: "campaign_1", _active: true } as any };
      const nextRowsSpy = spyOn(service, "getNextCampaignRows").and.rejectWith(new Error("failed"));
      await expectAsync(service.scheduleCampaignNotifications()).toBeRejected();

      nextRowsSpy.and.resolveTo([]);
      await expectAsync(service.scheduleCampaignNotifications()).toBeResolved();
    });
  });

  describe("repeating schedules", () => {
    const row = { id: "row_1", campaign_list: ["campaign_1"], title: "Title", text: "Text" };

    /** Scheduled notifications passed to the local notification service, as [key, date] */
    function getScheduled() {
      return mockLocalNotificationService.scheduleNotification.calls
        .allArgs()
        .map(([notification, key]) => [key, notification.schedule.at]);
    }

    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(2026, 0, 10, 12, 0));
      service = TestBed.inject(CampaignService);
      service.notificationDefaults = {
        title: "Default title",
        text: "Default text",
        time: { hour: 8, minute: 30 },
      };
      mockLocalNotificationService.canSchedule$.next(true);
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it("should repeat from the start date at the schedule's time", () => {
      const repeats = service.getRepeatDates({
        id: "campaign_1",
        schedule: { start_date: "2026-01-11T00:00:00.000", repeat_every_days: 30, repeat_count: 3 },
        time: { hour: 19, minute: 0 },
      });
      expect(repeats).toEqual([
        { at: new Date(2026, 0, 11, 19, 0), number: 1 },
        { at: new Date(2026, 1, 10, 19, 0), number: 2 },
        { at: new Date(2026, 2, 12, 19, 0), number: 3 },
      ]);
    });

    it("should skip past repeats, keeping each repeat's number", () => {
      const repeats = service.getRepeatDates({
        id: "campaign_1",
        schedule: { start_date: "2025-12-01T00:00:00.000", repeat_every_days: 30, repeat_count: 3 },
        time: { hour: 19, minute: 0 },
      });
      expect(repeats).toEqual([{ at: new Date(2026, 0, 30, 19, 0), number: 3 }]);
    });

    it("should stop at the end date, checked before any delay", () => {
      const repeats = service.getRepeatDates({
        id: "campaign_1",
        schedule: {
          start_date: "2026-01-11T00:00:00.000",
          end_date: "2026-03-12T00:00:00.000",
          repeat_every_days: 30,
          repeat_count: 5,
        },
        time: { hour: 19, minute: 0 },
        delay: { days: "7" },
      });
      expect(repeats).toEqual([
        { at: new Date(2026, 0, 18, 19, 0), number: 1 },
        { at: new Date(2026, 1, 17, 19, 0), number: 2 },
        { at: new Date(2026, 2, 19, 19, 0), number: 3 },
      ]);
    });

    it("should start from the next default send time without a start date", () => {
      // default time (08:30) has passed today
      const repeats = service.getRepeatDates({
        id: "campaign_1",
        schedule: { repeat_every_days: 7, repeat_count: 2 },
      });
      expect(repeats).toEqual([
        { at: new Date(2026, 0, 11, 8, 30), number: 1 },
        { at: new Date(2026, 0, 18, 8, 30), number: 2 },
      ]);
    });

    it("should schedule each repeat of the first eligible row with its own key", async () => {
      service.scheduledCampaigns = {
        campaign_1: {
          id: "campaign_1",
          _active: true,
          schedule: {
            start_date: "2026-01-11T00:00:00.000",
            repeat_every_days: 30,
            repeat_count: 2,
          },
          time: { hour: 19, minute: 0 },
        },
      };
      spyOn(service, "getNextCampaignRows").and.resolveTo([{ ...row }]);

      await service.scheduleCampaignNotifications();

      expect(getScheduled()).toEqual([
        ["row_1:1", new Date(2026, 0, 11, 19, 0)],
        ["row_1:2", new Date(2026, 1, 10, 19, 0)],
      ]);
      const [notification] = mockLocalNotificationService.scheduleNotification.calls.first().args;
      expect(notification.extra.row_id).toEqual("row_1");
      expect(Object.keys(service.scheduledNotifications.campaign_1)).toEqual([
        "row_1:1",
        "row_1:2",
      ]);
    });

    it("should keep the row id as key for schedules that don't repeat", async () => {
      service.scheduledCampaigns = {
        campaign_1: { id: "campaign_1", _active: true, time: { hour: 19, minute: 0 } },
      };
      spyOn(service, "getNextCampaignRows").and.resolveTo([{ ...row }]);

      await service.scheduleCampaignNotifications();

      expect(getScheduled()).toEqual([["row_1", new Date(2026, 0, 10, 19, 0)]]);
    });
  });

  describe("schedule end date", () => {
    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(2026, 0, 10, 12, 0));
      deploymentConfig.campaigns.enabled = true;
      service = TestBed.inject(CampaignService);
      spyOn(service, "ready").and.resolveTo(true);
      spyOn(service, "scheduleCampaignNotifications").and.resolveTo();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it("should keep a schedule active until the end of its end date", async () => {
      dataLists = [
        {
          flow_subtype: "campaign_schedule",
          rows: [
            { id: "ends_today", schedule: { end_date: "2026-01-10T00:00:00.000" } },
            { id: "ended_yesterday", schedule: { end_date: "2026-01-09T00:00:00.000" } },
          ],
        },
      ];

      await service.recalculate();

      expect(service.scheduledCampaigns.ends_today._active).toBeTrue();
      expect(service.scheduledCampaigns.ended_yesterday._active).toBeFalse();
    });
  });

  describe("re-checking campaigns", () => {
    const testFields = ["schedule_field", "calc_field", "row_field", "other_field"];
    const clearTestFields = () =>
      testFields.forEach((field) => localStorage.removeItem(`rp-contact-field.${field}`));

    beforeEach(() => {
      clearTestFields();
      deploymentConfig.campaigns.enabled = true;
      dataLists = [
        {
          flow_subtype: "campaign_schedule",
          rows: [
            {
              id: "campaign_1",
              activation_condition_list: [
                { condition_type: "calc", condition_args: { calc: "@field.calc_field == 1" } },
              ],
              schedule: { start_date: "@fields.schedule_field" },
            },
          ],
        },
        {
          flow_subtype: "campaign_rows",
          rows: [
            {
              id: "row_1",
              campaign_list: ["campaign_1"],
              activation_condition_list: [
                {
                  condition_type: "field_evaluation",
                  condition_args: { field_evaluation: { field: "row_field", value: "yes" } },
                },
              ],
            },
          ],
        },
      ];
      service = TestBed.inject(CampaignService);
    });

    afterEach(() => {
      clearTestFields();
    });

    describe("when fields they reference change", () => {
      let localStorageService: LocalStorageService;
      let recalculateSpy: jasmine.Spy;

      beforeEach(async () => {
        localStorageService = TestBed.inject(LocalStorageService);
        await service.reInitialise();
        recalculateSpy = spyOn(service, "recalculate").and.resolveTo();
        // after loading, so only the debounce uses the mock clock (and date, which it also reads)
        jasmine.clock().install();
        jasmine.clock().mockDate();
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it("should find fields referenced by schedules, rows and their conditions", () => {
        // checked separately, as changes in quick succession re-check once
        for (const field of ["schedule_field", "calc_field", "row_field"]) {
          recalculateSpy.calls.reset();
          localStorageService.setString(field, "changed");
          jasmine.clock().tick(2000);
          expect(recalculateSpy).withContext(field).toHaveBeenCalledTimes(1);
        }
      });

      it("should re-check once, after referenced fields stop changing", () => {
        localStorageService.setString("schedule_field", "2026-01-01");
        jasmine.clock().tick(1000);
        localStorageService.setString("row_field", "yes");
        jasmine.clock().tick(1999);
        expect(recalculateSpy).not.toHaveBeenCalled();

        jasmine.clock().tick(1);
        expect(recalculateSpy).toHaveBeenCalledTimes(1);
      });

      it("should not re-check when other fields change", () => {
        localStorageService.setString("other_field", "changed");
        jasmine.clock().tick(5000);
        expect(recalculateSpy).not.toHaveBeenCalled();
      });
    });

    it("should reload campaigns and schedule their notifications", async () => {
      spyOn(service, "ready").and.resolveTo(true);
      scheduleSpy = spyOn(service, "scheduleCampaignNotifications").and.resolveTo();

      await service.recalculate();

      expect(Object.keys(service.scheduledCampaigns)).toEqual(["campaign_1"]);
      expect(service.allCampaigns.campaign_1.map((r) => r.id)).toEqual(["row_1"]);
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
    });

    it("should do nothing when campaigns are disabled", async () => {
      deploymentConfig.campaigns.enabled = false;
      scheduleSpy = spyOn(service, "scheduleCampaignNotifications").and.resolveTo();

      await service.recalculate();

      expect(scheduleSpy).not.toHaveBeenCalled();
    });

    it("should re-check from a `campaign: recalculate` action", async () => {
      const recalculateSpy = spyOn(service, "recalculate").and.resolveTo();
      const actionRegistry = TestBed.inject(TemplateActionRegistry);

      await actionRegistry.trigger({
        trigger: "click",
        action_id: "campaign",
        args: ["recalculate"],
      });

      expect(recalculateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("scheduling once notifications can reach the device", () => {
    beforeEach(() => {
      deploymentConfig.campaigns.enabled = true;
      service = TestBed.inject(CampaignService);
      scheduleSpy = spyOn(service, "scheduleCampaignNotifications").and.resolveTo();
    });

    it("should schedule campaign notifications when campaigns load", async () => {
      mockLocalNotificationService.canSchedule$.next(true);

      await service.reInitialise();

      expect(scheduleSpy).toHaveBeenCalledTimes(1);
    });

    it("should keep existing notifications while scheduling waits", async () => {
      // e.g. campaigns reloaded while permission is withdrawn
      mockLocalNotificationService.pendingNotifications$.next([
        { id: 1, title: "", body: "", schedule: { at: new Date() }, extra: { campaign_id: "c" } },
      ]);

      await service.reInitialise();

      expect(mockLocalNotificationService.removeNotifications).not.toHaveBeenCalled();
    });

    it("should wait until notifications can reach the device", async () => {
      // e.g. permission granted by a `notification: request_permission` action after launch
      await service.reInitialise();
      expect(scheduleSpy).not.toHaveBeenCalled();

      mockLocalNotificationService.canSchedule$.next(true);
      await flush();
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
    });

    it("should clear old notifications before scheduling once notifications can reach the device", async () => {
      // e.g. leftovers from a removed campaign
      mockLocalNotificationService.pendingNotifications$.next([
        { id: 1, title: "", body: "", schedule: { at: new Date() }, extra: { campaign_id: "c" } },
      ]);
      await service.reInitialise();

      mockLocalNotificationService.canSchedule$.next(true);
      await flush();

      expect(mockLocalNotificationService.removeNotifications).toHaveBeenCalledOnceWith([1]);
      expect(mockLocalNotificationService.removeNotifications).toHaveBeenCalledBefore(scheduleSpy);
    });

    it("should schedule again when permission is granted again", async () => {
      // e.g. permission withdrawn and granted again in device settings
      mockLocalNotificationService.canSchedule$.next(true);
      await service.reInitialise();

      mockLocalNotificationService.canSchedule$.next(false);
      mockLocalNotificationService.canSchedule$.next(true);
      await flush();

      expect(scheduleSpy).toHaveBeenCalledTimes(2);
    });

    it("should report errors when scheduling after permission is granted", async () => {
      const consoleErrorSpy = spyOn(console, "error");
      scheduleSpy.and.rejectWith(new Error("scheduling failed"));
      await service.reInitialise();

      mockLocalNotificationService.canSchedule$.next(true);
      await flush();

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
