import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolboxPageRoutingModule } from './toolbox-routing.module';

import { ToolboxPage } from './toolbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolboxPageRoutingModule
  ],
  declarations: [ToolboxPage]
})
export class ToolboxPageModule {}
