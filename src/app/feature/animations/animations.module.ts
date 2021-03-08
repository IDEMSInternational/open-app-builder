import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimationsPageRoutingModule } from './animations-routing.module';

import { AnimationsPage } from './animations.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimationsPageRoutingModule,
    SharedModule
  ],
  declarations: [AnimationsPage]
})
export class AnimationsPageModule {}
