import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TEMPLATE_PIPES } from ".";

@NgModule({
  declarations: [...TEMPLATE_PIPES],
  exports: [...TEMPLATE_PIPES],
  imports: [CommonModule],
})
export class TemplatePipesModule {}
