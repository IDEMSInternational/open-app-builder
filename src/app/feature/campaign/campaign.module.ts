import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { CampaignPageRoutingModule } from "./campaign-routing.module";
import { CampaignDebugPage } from "./pages/campaign-debug/campaign-debug.page";
import { SharedPipesModule } from "src/app/shared/pipes";
import { CampaignDebugVariablesEditorComponent } from "./pages/campaign-debug/components/campaign-variables-editor";
import { CampaignDebugRowComponent } from "./pages/campaign-debug/components/campaign-debug-row";
import { CalcDaysDiffPipe } from "./pages/campaign-debug/components/calcDays.pipe";
import { CampaignScheduleDebugRowComponent } from "./pages/campaign-debug/components/campaign-schedule-debug-row";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CampaignPageRoutingModule, SharedPipesModule],
  declarations: [
    CampaignDebugPage,
    CampaignDebugVariablesEditorComponent,
    CampaignDebugRowComponent,
    CampaignScheduleDebugRowComponent,
    CalcDaysDiffPipe,
  ],
})
export class CampaignModule {}
