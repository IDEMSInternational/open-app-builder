import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarePackagesPageRoutingModule } from './care-packages-routing.module';

import { CarePackagesPage } from './care-packages.page';
import { CarePackageComponent } from './care-package/care-package.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    CarePackagesPageRoutingModule
  ],
  declarations: [CarePackagesPage, CarePackageComponent]
})
export class CarePackagesPageModule {}
