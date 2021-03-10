import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Blob1Component } from "./components/blobs/blob1/blob1.component";
import { BlobComponent } from "./components/blobs/blob/blob.component";
import { ReflectAnimationComponent } from "./components/reflect-animation/reflect-animation.component";
import { IonicModule } from "@ionic/angular";
import { StressedMultiHandAnimComponent } from "./components/stressed-multi-hand-anim/stressed-multi-hand-anim.component";
import { PLHMainHeaderComponent } from "./components/plh-main-header";
import { PLHMainTabsComponent } from "./components/plh-main-tabs";
import { RouterModule } from "@angular/router";
import { TemplateComponentsModule } from "./components/template/template.module";
import { RoundIconButtonComponent } from "./components/template/components/round-icon-button/round-icon-button.component";
import { TmplTimerComponent } from "./components/template/components/timer/timer.component";
import { IonModalComponent } from "./components/common/components/ion-modal/ion-modal.component";
import { ReactiveFormsModule } from "@angular/forms";


const Components = [
  BlobComponent,
  Blob1Component,
  ReflectAnimationComponent,
  StressedMultiHandAnimComponent,
  PLHMainHeaderComponent,
  PLHMainTabsComponent,
  RoundIconButtonComponent,
  TmplTimerComponent,
  IonModalComponent
];

@NgModule({
    declarations: [
        Components,
    ],
  imports: [CommonModule, IonicModule, RouterModule, TemplateComponentsModule, ReactiveFormsModule],
  exports: Components,
})
export class SharedModule {}
