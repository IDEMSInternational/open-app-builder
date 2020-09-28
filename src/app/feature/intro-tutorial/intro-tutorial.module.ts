import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PrivacyPageRoutingModule } from "./intro-tutorial-routing.module";

import { IntroTutorialPage } from "./intro-tutorial.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PrivacyPageRoutingModule],
  declarations: [IntroTutorialPage],
})
export class IntroTutorialPageModule {}
