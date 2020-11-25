import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolboxTopicPage } from './toolbox-topic.page';

const routes: Routes = [
  {
    path: ':type',
    component: ToolboxTopicPage
  },
  {
    path: ':type/:flow_name',
    loadChildren: () => import('./toolbox-flows/toolbox-flows.module').then( m => m.ToolboxFlowsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolboxTopicPageRoutingModule {}
