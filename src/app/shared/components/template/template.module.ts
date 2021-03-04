import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TemplateContainerComponent } from "./template-container.component";

import { TemplateComponent, TmplCompHostDirective } from "./components";
import { TemplateBaseComponent } from "./components/base";
import { TmplTextComponent } from "./components/text";
import { AnimatedSectionGroupComponent } from "./components/animated_section_group";
import { TmplTitleComponent } from "./components/title";
import { TmplDisplayGroupComponent } from "./components/display_group";
import { TmplButtonComponent } from "./components/button";
import { TmplAudioComponent } from "./components/audio";
import { TmplImageComponent } from "./components/image";
import { TmplVideoComponent } from "./components/video";
import { TmplTemplateGroupComponent } from "./components/template_group";
import { LocalVarsReplacePipe } from "./pipes/local-vars-replace.pipe";
import { AnimatedSectionComponent } from "./components/animated_section";
import { TmplTimerComponent } from "./components/timer";
import { TmplSliderComponent } from "./components/slider";
import { NavGroupComponent } from "./components/nav_group";
import { SharedPipesModule } from "../../pipes";

const TEMPLATE_COMPONENTS = [
  TemplateBaseComponent,
  TmplTextComponent,
  AnimatedSectionGroupComponent,
  TmplTitleComponent,
  TmplDisplayGroupComponent,
  TmplAudioComponent,
  TmplButtonComponent,
  TmplImageComponent,
  TmplVideoComponent,
  TmplTemplateGroupComponent,
  AnimatedSectionComponent,
  TmplTimerComponent,
  TmplSliderComponent,
  NavGroupComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedPipesModule],
  exports: [...TEMPLATE_COMPONENTS, TemplateContainerComponent],
  declarations: [
    TmplCompHostDirective,
    TemplateComponent,
    ...TEMPLATE_COMPONENTS,
    TemplateContainerComponent,
    LocalVarsReplacePipe,
  ],
})
export class TemplateComponentsModule {}
