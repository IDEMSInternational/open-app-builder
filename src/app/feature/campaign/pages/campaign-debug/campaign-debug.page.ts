import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { FlowTypes } from "src/app/shared/model";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { CampaignService } from "../../campaign.service";
import { CampaignDebugVariablesEditorComponent } from "./components/campaign-variables-editor";

interface IDebugCampaignRows {
  activated: FlowTypes.Campaign_listRow[];
  pending: FlowTypes.Campaign_listRow[];
  deactivated: FlowTypes.Campaign_listRow[];
}

@Component({
  templateUrl: "./campaign-debug.page.html",
  styleUrls: ["./campaign-debug.page.scss"],
})
export class CampaignDebugPage implements OnInit {
  debugCampaignId: string;
  debugCampaignRows: IDebugCampaignRows;

  constructor(
    public campaignService: CampaignService,
    public localNotificationService: LocalNotificationService,
    private dataEvaluationService: DataEvaluationService,
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.localNotificationService.loadNotifications();
    // this.debugData = await this.dataEvaluationService.refreshDBCache();
    const campaign_id = this.route.snapshot.queryParamMap.get("debug_campaign");
    if (campaign_id) {
      this.setDebugCampaign(campaign_id);
    }
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
      return this.processCampaign();
    }
  }

  public scheduleNotification(row: FlowTypes.Campaign_listRow) {
    return this.campaignService.scheduleCampaignNotification(row);
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
    const debugCampaignRows: IDebugCampaignRows = { activated: [], deactivated: [], pending: [] };
    const campaign_id = this.debugCampaignId;
    const campaignRows = this.campaignService.campaigns[campaign_id];
    const evaluated = await Promise.all(
      campaignRows.map(async (row) => {
        return await this.campaignService.evaluateCampaignRow(row);
      })
    );
    evaluated.forEach((row) => {
      if (row._deactivated) {
        debugCampaignRows.deactivated.push(row);
      } else {
        if (row._activated) {
          debugCampaignRows.activated.push(row);
        } else {
          debugCampaignRows.pending.push(row);
        }
      }
    });
    this.debugCampaignRows = debugCampaignRows;
    console.log("[Campaign] processed", {
      data: this.dataEvaluationService.data,
      debugCampaignRows,
    });
  }

  /***************************************************************************************
   *  Debug Methods
   **************************************************************************************/

  public async manageFieldVariables(row?: FlowTypes.Campaign_listRow) {
    const modal = await this.modalCtrl.create({
      component: CampaignDebugVariablesEditorComponent,
      componentProps: {
        campaignRows: row ? [row] : this.debugCampaignRows,
        campaignId: row ? row._id : this.debugCampaignId,
      },
    });
    await modal.present();
    await modal.onDidDismiss();
    await this.processCampaign();
  }
}
