import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FilterDisplayComponentPipe } from "./filter-display-component.pipe";
import { MarkdownPipe } from "./markdown.pipe";
import { NumberingPipe } from "./numbering.pipe";
import { PLHAssetPipe } from "./plh-asset.pipe";
import { StyleListPipe } from "./styleList.pipe";
import { TranslatePipe } from "./translate.pipe";

const TEMPLATE_PIPES = [
  FilterDisplayComponentPipe,
  MarkdownPipe,
  PLHAssetPipe,
  NumberingPipe,
  StyleListPipe,
  TranslatePipe,
];

@NgModule({
  declarations: [...TEMPLATE_PIPES],
  exports: [...TEMPLATE_PIPES],
  imports: [CommonModule],
})
export class TemplatePipesModule {}
