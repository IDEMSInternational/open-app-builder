import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolboxTopicPage } from './toolbox-topic.page';

const routes: Routes = [
  {
    path: ':type',
    component: ToolboxTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolboxTopicPageRoutingModule {}
