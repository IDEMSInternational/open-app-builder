import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolboxFlowsPageRoutingModule } from './toolbox-flows-routing.module';

import { ToolboxFlowsPage } from './toolbox-flows.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolboxFlowsPageRoutingModule
  ],
  declarations: [ToolboxFlowsPage]
})
export class ToolboxFlowsPageModule {}
