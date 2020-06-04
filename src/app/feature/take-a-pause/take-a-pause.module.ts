import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeAPausePageRoutingModule } from './take-a-pause-routing.module';

import { TakeAPausePage } from './take-a-pause.page';
import { PauseStep0Component } from './pause-step0/pause-step0.component';
import { PauseStep1Component } from './pause-step1/pause-step1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeAPausePageRoutingModule
  ],
  declarations: [
    TakeAPausePage,
    PauseStep0Component, 
    PauseStep1Component
  ]
})
export class TakeAPausePageModule {}
