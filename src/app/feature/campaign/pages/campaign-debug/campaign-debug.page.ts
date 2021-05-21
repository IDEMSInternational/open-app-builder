import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { FlowTypes } from "src/app/shared/model";
import {
  DataEvaluationService,
  IDataEvaluationCache,
} from "src/app/shared/services/data/data-evaluation.service";
import {
  ILocalNotificationStorage,
  LocalNotificationService,
} from "src/app/shared/services/notification/local-notification.service";
import { stringToIntegerHash } from "src/app/shared/utils";
import { CampaignService } from "../../campaign.service";

@Component({
  templateUrl: "./campaign-debug.page.html",
  styleUrls: ["./campaign-debug.page.scss"],
})
export class CampaignDebugPage implements OnInit {
  debugCampaignId: string;
  debugCampaignRows: FlowTypes.Campaign_listRow[] = [];
  debugData: IDataEvaluationCache = {} as any;
  notificationsHash: ILocalNotificationStorage = {};
  constructor(
    public campaignService: CampaignService,
    private localNotificationService: LocalNotificationService,
    private dataEvaluationService: DataEvaluationService,
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.listNotifications();
    this.debugData = await this.dataEvaluationService.refreshDBCache();
    const campaign_id = this.route.snapshot.queryParamMap.get("debug_campaign");
    if (campaign_id) {
      this.setDebugCampaign(campaign_id);
    }
  }

  /***************************************************************************************
   *  Notifications
   **************************************************************************************/

  public async scheduleNotification(row: FlowTypes.Campaign_listRow) {
    console.log("scheduling notifications", row);
    const { notification_schedule, id } = row;
    const { _schedule_at, text } = notification_schedule;
    await this.localNotificationService.scheduleNotification({
      schedule: { at: _schedule_at },
      body: text || "TODO - provide fallback",
      title: "TODO",
      extra: { row },
      id: stringToIntegerHash(id),
    });
    await this.listNotifications();
  }
  public logNotifications() {
    console.log("[Notifications]", this.notificationsHash);
  }
  private async listNotifications() {
    const notifications = await this.localNotificationService.getPendingNotifications();
    this.notificationsHash = notifications;
  }

  /***************************************************************************************
   *  Campaign Methods
   **************************************************************************************/

  public setDebugCampaign(debug_campaign: string) {
    if (debug_campaign !== this.debugCampaignId) {
      this.debugCampaignId = debug_campaign;
      const queryParams = { debug_campaign };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: "merge",
        replaceUrl: true,
      });
      console.log("set debug campaign", debug_campaign);
      return this.processCampaign();
    }
  }

  /**
   *
   * @param row
   * TODO - find better way to link with template actions
   * TODO - find way to identify any named action list (not just click_action_list)
   */
  public triggerRowActions(row: FlowTypes.Campaign_listRow) {
    console.log("triggering actions", row);
    if (row.click_action_list) {
      for (const action of row.click_action_list) {
        if (action.action_id === "set_field") {
          const [key, value] = action.args;
          this.templateService.setField(key, value);
        } else {
          console.error("Only set_field actions supported by debugger");
        }
      }
    }
    this.processCampaign();
    // TODO - reload cache after trigger
  }

  private async processCampaign() {
    this.debugCampaignRows = [];
    const campaign_id = this.debugCampaignId;
    const campaignRows = this.campaignService.campaigns[campaign_id];
    this.dataEvaluationService.setDBCache(this.debugData as any);
    const evaluated = await Promise.all(
      campaignRows.map(async (row) => {
        return await this.campaignService.evaluateCampaignRow(row);
      })
    );
    this.debugCampaignRows = evaluated;
    console.log("[Campaign] processed", { data: this.dataEvaluationService.data, evaluated });
  }

  /***************************************************************************************
   *  Debug Methods
   **************************************************************************************/

  public logDebugInfo(row: FlowTypes.Campaign_listRow) {
    console.group(row._id);
    console.log(row);
    console.groupEnd();
  }
  public async setDebugFirstLaunch(value: any) {
    if (value && value !== this.debugData.first_app_launch) {
      console.log("set debug first launch", value);
      this.debugData.first_app_launch = value;
      this.debugData.dbCache.app_events = { app_launch: [{ _created: value }] };
      await this.processCampaign();
    }
  }
  public async setDebugAppDay(value: any) {
    if (value && Number(value) !== this.debugData.app_day) {
      console.log("set debug app day", value);
      this.debugData.app_day = Number(value);
      await this.processCampaign();
    }
  }
}
