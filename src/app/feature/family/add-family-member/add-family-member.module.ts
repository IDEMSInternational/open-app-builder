import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFamilyMemberPageRoutingModule } from './add-family-member-routing.module';

import { AddFamilyMemberPage } from './add-family-member.page';

import { IonicColorPickerModule } from 'ionic-color-picker';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFamilyMemberPageRoutingModule,
    IonicColorPickerModule,
    SharedModule
  ],
  declarations: [AddFamilyMemberPage]
})
export class AddFamilyMemberPageModule {}
