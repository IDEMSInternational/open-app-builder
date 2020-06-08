import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeAPausePageRoutingModule } from './take-a-pause-routing.module';

import { TakeAPausePage } from './take-a-pause.page';
import { PauseStep0Component } from './pause-step0/pause-step0.component';
import { PauseStep1Component } from './pause-step1/pause-step1.component';

import { PauseStep2Component } from '../pause-step2/pause-step2.component';


import { PauseStep3Component } from './pause-step3/pause-step3.component';

import { PauseStep5Component } from './pause-step5/pause-step5.component';




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
    PauseStep1Component,


    PauseStep0Component,
    PauseStep2Component,

    PauseStep0Component, 

    PauseStep3Component,
    

    PauseStep5Component



  ]
})
export class TakeAPausePageModule {}
