import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FlowTypes } from "src/app/shared/model";
import {
  DataEvaluationService,
  IDataEvaluationCache,
} from "src/app/shared/services/data/data-evaluation.service";
import { CampaignService } from "../../campaign.service";

@Component({
  templateUrl: "./campaign-debug.page.html",
  styleUrls: ["./campaign-debug.page.scss"],
})
export class CampaignDebugPage implements OnInit {
  debugCampaignId: string;
  debugCampaignRows: FlowTypes.Campaign_listRow[] = [];
  debugData: IDataEvaluationCache = {} as any;
  constructor(
    public campaignService: CampaignService,
    private dataEvaluationService: DataEvaluationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.debugData = await this.dataEvaluationService.refreshDBCache();
    const campaign_id = this.route.snapshot.queryParamMap.get("debug_campaign");
    if (campaign_id) {
      this.setDebugCampaign(campaign_id);
    }
  }

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

  public triggerRowActions(row: FlowTypes.Campaign_listRow) {
    // TODO - reload cache after trigger
  }

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
}
