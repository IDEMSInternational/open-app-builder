import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyPageRoutingModule } from './family-routing.module';

import { FamilyPage } from './family.page';
import { Blob1Component } from 'src/app/shared/components/blob1/blob1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyPageRoutingModule
  ],
  declarations: [FamilyPage, Blob1Component]
})
export class FamilyPageModule {}
