import { Injectable } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DATA_LIST } from "src/app/shared/services/data/data.service";
type ICampaigns = { [campaign_id: string]: FlowTypes.Campaign_listRow[] };
@Injectable({ providedIn: "root" })
export class CampaignService {
  campaigns: ICampaigns;

  constructor(private dataEvaluationService: DataEvaluationService) {
    this.loadCampaigns();
  }

  loadCampaigns() {
    // merge all campaign_row data lists
    const allCampaignRows: FlowTypes.Campaign_listRow[] = [].concat.apply(
      [],
      DATA_LIST.filter((list) => list.flow_subtype === "campaign_rows").map((list) => list.rows)
    );
    const allCampaignRowsByPriority = allCampaignRows.sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    );
    const campaignsById: ICampaigns = {};
    allCampaignRowsByPriority.forEach((row) => {
      const campaign_list = row.campaign_list || [];
      campaign_list.forEach((campaign_id) => {
        if (!campaignsById[campaign_id]) {
          campaignsById[campaign_id] = [];
        }
        campaignsById[campaign_id].push(row);
      });
    });
    this.campaigns = campaignsById;
    console.log("campaignsById", campaignsById);
  }

  async getNextCampaignRow(campaign_id: string) {
    // TODO - decide best way to handle keeping data fresh
    await this.dataEvaluationService.refreshDBCache();
    if (!this.campaigns[campaign_id]) {
      console.error("no data exists for campaign", campaign_id);
      return null;
    }
    const campaignRows = this.campaigns[campaign_id];
    const nextRow = campaignRows.find((row) => {
      const { activation_condition_list, deactivation_condition_list } = row;
      // if any deactivation criteria met return false
      if (
        (deactivation_condition_list || []).find((condition) => this.evaluateCondition(condition))
      ) {
        return false;
      }
      // if all activation criteria met return true
      return (activation_condition_list || []).every((condition) =>
        this.evaluateCondition(condition)
      );
    });
    console.log("next campaign row", campaign_id, nextRow);
    return nextRow;
  }

  private evaluateCondition(condition) {
    return this.dataEvaluationService.evaluateReminderCondition(condition);
  }
}
