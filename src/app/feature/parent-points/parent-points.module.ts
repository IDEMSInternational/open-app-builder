import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentPointsPageRoutingModule } from './parent-points-routing.module';

import { ParentPointsPage } from './parent-points.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentPointsPageRoutingModule
  ],
  declarations: [ParentPointsPage]
})
export class ParentPointsPageModule {}
