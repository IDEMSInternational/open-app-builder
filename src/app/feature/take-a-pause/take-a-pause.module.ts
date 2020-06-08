import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeAPausePageRoutingModule } from './take-a-pause-routing.module';

import { TakeAPausePage } from './take-a-pause.page';
import { PauseStep0Component } from './pause-step0/pause-step0.component';
import { PauseStep5Component } from './pause-step5/pause-step5.component';
import { PauseStep4Component } from './pause-step4/pause-step4.component';


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
    PauseStep5Component, 
    PauseStep4Component
  ]
})
export class TakeAPausePageModule {}
