import { FilterDisplayComponentPipe } from "./filter-display-component.pipe";
import { MarkdownPipe } from "./markdown.pipe";
import { NumberingPipe } from "./numbering.pipe";
import { PLHAssetPipe } from "./plh-asset.pipe";
import { TranslatePipe } from "./translate.pipe";

export const TEMPLATE_PIPES = [
  FilterDisplayComponentPipe,
  MarkdownPipe,
  PLHAssetPipe,
  NumberingPipe,
  TranslatePipe,
];