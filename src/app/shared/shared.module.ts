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
import { ANIMATION_COMPONENTS } from "./components/animations";
import { AnimationComponent } from "./components/animations/animation.component";
import { RoundIconButtonComponent } from "./components/template/components/round-icon-button/round-icon-button.component";
import { TooltipModule } from "./components/common/directives/tooltip.directive";
import { ComboBoxModalComponent } from "./components/common/components/combo-box-modal/combo-box-modal.component";
import { ReactiveFormsModule } from "@angular/forms";

const Components = [
  BlobComponent,
  Blob1Component,
  ReflectAnimationComponent,
  StressedMultiHandAnimComponent,
  PLHMainHeaderComponent,
  PLHMainTabsComponent,
  AnimationComponent,
  ComboBoxModalComponent,
  ...ANIMATION_COMPONENTS,
];

@NgModule({
  declarations: [Components],
  imports: [CommonModule, IonicModule, RouterModule, TemplateComponentsModule, ReactiveFormsModule],
  exports: Components,
})
export class SharedModule {}
