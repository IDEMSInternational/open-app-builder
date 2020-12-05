import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppTermsPage } from './app-terms.page';

const routes: Routes = [
  {
    path: '',
    component: AppTermsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppTermsPageRoutingModule {}
