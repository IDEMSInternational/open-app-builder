import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TemplateContainerComponent } from "./template-container.component";
import { TemplateComponentHostDirective } from "./template.directive";

import { TmplComponent, TmplCompHostDirective } from "./components/tmpl.component";
import { TmplTextComponent } from "./components/text";
import { AnimatedSectionGroupComponent } from "./components/animated_section_group";
import { TmplTitleComponent } from "./components/title";
import { TmplDisplayGroupComponent } from "./components/display_group";
import { TmplButtonComponent } from "./components/button";
import { TmplAudioComponent } from "./components/audio";
import { TmplImageComponent } from "./components/image";
import { TmplVideoComponent } from "./components/video";
import { TmplTemplateGroupComponent } from "./components/template_group";
import { TmplSetVariableComponent } from "./components/set_variable";
import { LocalVarsReplacePipe } from "./local-vars-replace.pipe";
import { AnimatedSectionComponent } from "./components/animated_section";
import { TmplTimerComponent } from "./components/timer";
import { TmplSliderComponent } from "./components/slider";

const TEMPLATE_COMPONENTS = [
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
    TmplSetVariableComponent,
    TmplTimerComponent,
    TmplSliderComponent
];

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    exports: [...TEMPLATE_COMPONENTS, TemplateContainerComponent, TemplateComponentHostDirective],
    declarations: [
        TmplCompHostDirective,
        TmplComponent,
        ...TEMPLATE_COMPONENTS,
        TemplateContainerComponent,
        TemplateComponentHostDirective,
        LocalVarsReplacePipe
    ],
})
export class TemplateComponentsModule { }
