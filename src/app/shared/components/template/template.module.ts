import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TemplateComponent } from "./template.component";
import { TemplateComponentHostDirective } from "./template.directive";

import { TmplCompHost, TmplCompHostDirective } from "./components/tmpl-comp-host";
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
    TmplSetVariableComponent
];

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    exports: [...TEMPLATE_COMPONENTS, TemplateComponent, TemplateComponentHostDirective],
    declarations: [
        TmplCompHostDirective,
        TmplCompHost,
        ...TEMPLATE_COMPONENTS,
        TemplateComponent,
        TemplateComponentHostDirective,
        LocalVarsReplacePipe
    ],
})
export class TemplateComponentsModule { }
