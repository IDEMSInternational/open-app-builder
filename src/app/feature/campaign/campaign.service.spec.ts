import { TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { CampaignService } from "./campaign.service";

export class MockCampaignService implements Partial<CampaignService> {
  public async ready(timeoutValue?: number): Promise<boolean> {
    return true;
  }
  //   TODO - implement further methods
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/campaign/campaign.service.spec.ts
 */
describe("CampaignService", () => {
  let service: CampaignService;
  let mockLocalNotificationService: jasmine.SpyObj<LocalNotificationService>;

  beforeEach(() => {
    mockLocalNotificationService = jasmine.createSpyObj<LocalNotificationService>(
      "LocalNotificationService",
      ["removeNotifications", "cancelLateNotifications"],
      { pendingNotifications$: new BehaviorSubject([]) }
    );
    TestBed.configureTestingModule({
      providers: [
        { provide: DataEvaluationService, useValue: {} },
        { provide: TemplateTranslateService, useValue: {} },
        { provide: AppDataService, useValue: {} },
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: DeploymentService, useValue: { config: { campaigns: { enabled: false } } } },
        { provide: LocalNotificationService, useValue: mockLocalNotificationService },
      ],
    });
    service = TestBed.inject(CampaignService);
  });

  describe("scheduleCampaignNotifications", () => {
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
});
