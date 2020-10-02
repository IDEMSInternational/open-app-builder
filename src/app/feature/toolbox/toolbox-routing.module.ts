import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolboxPage } from './toolbox.page';

const routes: Routes = [
  {
    path: '',
    component: ToolboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolboxPageRoutingModule {}
