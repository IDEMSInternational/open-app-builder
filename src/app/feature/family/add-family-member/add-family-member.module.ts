import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFamilyMemberPageRoutingModule } from './add-family-member-routing.module';

import { AddFamilyMemberPage } from './add-family-member.page';

import { IonicColorPickerModule } from 'ionic-color-picker';
import { Blob1Component } from 'src/app/shared/components/blob1/blob1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFamilyMemberPageRoutingModule,
    IonicColorPickerModule
  ],
  declarations: [AddFamilyMemberPage, Blob1Component]
})
export class AddFamilyMemberPageModule {}
