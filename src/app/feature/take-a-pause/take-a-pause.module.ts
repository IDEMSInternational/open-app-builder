import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeAPausePageRoutingModule } from './take-a-pause-routing.module';

import { TakeAPausePage } from './take-a-pause.page';
import { PauseStep0Component } from './pause-step0/pause-step0.component';
import { PauseStep1Component } from './pause-step1/pause-step1.component';
import { PauseStep2Component } from './pause-step2/pause-step2.component';
import { PauseStep3Component } from './pause-step3/pause-step3.component';
import { PauseStep4Component } from './pause-step4/pause-step4.component';
import { PauseStep5Component } from './pause-step5/pause-step5.component';
import { PauseThinkComponent } from './pause-think/pause-think.component';
import { PauseFeelComponent } from './pause-feel/pause-feel.component';

import { PauseBodyScannerComponent } from './pause-body-scanner/pause-body-scanner.component';
import { BreathingAnimComponent } from './breathing-anim/breathing-anim.component';
import { ListeningAnimComponent } from './listening-anim/listening-anim.component';
import { StressedAnimComponent } from './stressed-anim/stressed-anim.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeAPausePageRoutingModule,
    SharedModule
  ],
  declarations: [
    TakeAPausePage,
    PauseStep0Component, 
    PauseStep1Component,
    PauseStep2Component,
    PauseStep3Component,
    PauseStep4Component,
    PauseStep5Component, 
    PauseThinkComponent,
    PauseFeelComponent,
    PauseBodyScannerComponent,
    BreathingAnimComponent,
    ListeningAnimComponent,
    StressedAnimComponent
  ]
})
export class TakeAPausePageModule {}
