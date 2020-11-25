import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ToolboxFlowsPageRoutingModule } from "./toolbox-flows-routing.module";
import { ToolboxFlowsPage } from "./toolbox-flows.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ToolboxFlowsPageRoutingModule, SharedModule],
  declarations: [ToolboxFlowsPage],
})
export class ToolboxFlowsPageModule {}
