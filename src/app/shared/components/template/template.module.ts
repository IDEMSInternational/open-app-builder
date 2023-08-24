import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LottieModule } from "ngx-lottie";
import { NouisliderModule } from "ng2-nouislider";
import { RouterModule } from "@angular/router";
import { SwiperModule } from "swiper/angular";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";

import { SharedPipesModule } from "../../pipes";
import { TooltipDirective } from "../common/directives/tooltip.directive";
import { TemplateContainerComponent } from "./template-container.component";
import { TEMPLATE_COMPONENTS } from "./components";
import { TEMPLATE_PIPES } from "./pipes";
import { TmplCompHostDirective, TemplateComponent } from "./template-component";

import { appendStyleSvgDirective } from "./directives/shadowStyleSvg.directive";
import { createCustomElement } from "@angular/elements";
import { PLHAssetPipe } from "./pipes/plh-asset.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedPipesModule,
    NouisliderModule,
    LottieModule,
    RouterModule,
    SwiperModule,
    NgxExtendedPdfViewerModule,
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
  // Include the container component as an entry component so that we can a custom elements for it (see below)
  entryComponents: [TemplateContainerComponent],
  // Pipes that are used in component ts files should be declared here
  providers: [PLHAssetPipe],
})
export class TemplateComponentsModule {
  // Create a custom element for the template container
  // This allows us to inject directly into the dom, which is used by the tour service
  // Adapted from: https://medium.com/@suwigyarathore/angular-element-as-a-web-component-6e77a1e1b4a7
  // Angular docs: https://angular.io/guide/elements

  // TODO - code could possibly be refactored with tour service to own module
  constructor(injector: Injector) {
    // ensure only defined once
    if (!customElements.get("web-template-container")) {
      const el = createCustomElement(TemplateContainerComponent, { injector });
      customElements.define("web-template-container", el);
    }
  }
}
