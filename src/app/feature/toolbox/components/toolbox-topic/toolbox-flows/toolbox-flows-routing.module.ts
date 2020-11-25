import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolboxFlowsPage } from './toolbox-flows.page';

const routes: Routes = [
  {
    path: '',
    component: ToolboxFlowsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolboxFlowsPageRoutingModule {}
