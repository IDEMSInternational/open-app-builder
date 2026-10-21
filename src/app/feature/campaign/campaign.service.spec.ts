import { TestBed } from "@angular/core/testing";
import type { ActionPerformed } from "@capacitor/local-notifications";
import { FlowTypes } from "src/app/shared/model";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { AppStartupService } from "src/app/shared/services/app-startup/app-startup.service";
import { CapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.service";
import { MockCapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.mock.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
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
  let triggerRowActionsSpy: jasmine.Spy;
  let scheduleSpy: jasmine.Spy;

  /** Emit a notification tap, as received from the capacitor api */
  function tapNotification(extra: Record<string, any>) {
    capacitorEvents.localNotificationActionPerformed.next({
      actionId: "tap",
      notification: { id: 1, title: "Title", body: "Text", extra },
    } as ActionPerformed);
  }

  beforeEach(() => {
    capacitorEvents = new MockCapacitorEventService();
    TestBed.configureTestingModule({
      providers: [
        { provide: DataEvaluationService, useValue: {} },
        { provide: TemplateTranslateService, useValue: {} },
        { provide: AppDataService, useValue: {} },
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: DeploymentService, useValue: { config: { campaigns: { enabled: false } } } },
        { provide: CapacitorEventService, useValue: capacitorEvents },
      ],
    });
    appStartupService = TestBed.inject(AppStartupService);
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
});
