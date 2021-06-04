import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LottieModule } from "ngx-lottie";
import { NouisliderModule } from "ng2-nouislider";
import { AngularSvgIconModule } from "angular-svg-icon";

import { SharedPipesModule } from "../../pipes";
import { TooltipDirective } from "../common/directives/tooltip.directive";
import { TemplateContainerComponent } from "./template-container.component";
import { TEMPLATE_COMPONENTS } from "./components";
import { TEMPLATE_PIPES } from "./pipes";
import { TmplCompHostDirective, TemplateComponent } from "./template-component";

import { appendStyleSvgDirective } from "./directives/shadowStyleSvg.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPipesModule,
    NouisliderModule,
    LottieModule,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [...TEMPLATE_COMPONENTS, ...TEMPLATE_PIPES, TemplateContainerComponent],
  declarations: [
    TmplCompHostDirective,
    TemplateComponent,
    TooltipDirective,
    ...TEMPLATE_COMPONENTS,
    ...TEMPLATE_PIPES,
    TemplateContainerComponent,
    appendStyleSvgDirective,
  ],
})
export class TemplateComponentsModule {}
