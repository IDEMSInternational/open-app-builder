import { TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplateVariablesService } from "src/app/shared/components/template/services/template-variables.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
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

/** Wait for pending promise callbacks to run */
const flush = () => new Promise((resolve) => setTimeout(resolve));

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/campaign/campaign.service.spec.ts
 */
describe("CampaignService", () => {
  let service: CampaignService;
  let mockLocalNotificationService: jasmine.SpyObj<LocalNotificationService>;
  let deploymentConfig: { campaigns: { enabled: boolean } };

  beforeEach(() => {
    deploymentConfig = { campaigns: { enabled: false } };
    mockLocalNotificationService = jasmine.createSpyObj<LocalNotificationService>(
      "LocalNotificationService",
      ["ready", "removeNotifications", "cancelLateNotifications"],
      {
        pendingNotifications$: new BehaviorSubject<ILocalNotification[]>([]),
        sessionNotifications$: new BehaviorSubject<ILocalNotification[]>([]),
        interactedNotification$: new BehaviorSubject(null),
        canSchedule$: new BehaviorSubject(false),
      }
    );
    mockLocalNotificationService.ready.and.resolveTo(true);
    const readyService = { ready: async () => true };
    TestBed.configureTestingModule({
      providers: [
        { provide: DataEvaluationService, useValue: readyService },
        { provide: TemplateTranslateService, useValue: readyService },
        { provide: TemplateVariablesService, useValue: readyService },
        { provide: AppDataService, useValue: { getSheetsWithData: async () => [] } },
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: DeploymentService, useValue: { config: deploymentConfig } },
        { provide: LocalNotificationService, useValue: mockLocalNotificationService },
      ],
    });
    service = TestBed.inject(CampaignService);
  });

  afterEach(() => {
    // avoid the service's delayed init loading campaigns after the test
    deploymentConfig.campaigns.enabled = false;
  });

  describe("scheduleCampaignNotifications", () => {
    beforeEach(() => {
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
  });

  describe("scheduling once notifications can reach the device", () => {
    let scheduleSpy: jasmine.Spy;

    beforeEach(() => {
      deploymentConfig.campaigns.enabled = true;
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
