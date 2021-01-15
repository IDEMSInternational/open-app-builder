import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarePackageComponent } from './care-package/care-package.component';

import { CarePackagesPage } from './care-packages.page';

const routes: Routes = [
  {
    path: '',
    component: CarePackagesPage
  },
  {
    path: ':carePackageId',
    component: CarePackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarePackagesPageRoutingModule {}
