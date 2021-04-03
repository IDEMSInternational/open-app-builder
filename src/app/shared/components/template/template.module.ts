import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TemplateContainerComponent } from "./template-container.component";

import { TEMPLATE_COMPONENTS } from "./components";
import { TmplCompHostDirective, TemplateComponent } from "./template-component";
// import { LocalVarsReplacePipe } from "./pipes/local-vars-replace.pipe";
import { SharedPipesModule } from "../../pipes";
import { TooltipDirective } from "../common/directives/tooltip.directive";
import { NouisliderModule } from "ng2-nouislider";
import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPipesModule,
    NouisliderModule,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [...TEMPLATE_COMPONENTS, TemplateContainerComponent],
  declarations: [
    TmplCompHostDirective,
    TemplateComponent,
    TooltipDirective,
    ...TEMPLATE_COMPONENTS,
    TemplateContainerComponent,
  ],
})
export class TemplateComponentsModule {}
