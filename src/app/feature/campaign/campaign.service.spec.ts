import { CampaignService } from "./campaign.service";

export class MockCampaignService implements Partial<CampaignService> {
  public async ready(timeoutValue?: number): Promise<boolean> {
    return true;
  }
  //   TODO - implement further methods
}
