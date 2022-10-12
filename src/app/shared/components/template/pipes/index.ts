import { FilterDisplayComponentPipe } from "./filter-display-component.pipe";
import { LatexPipe } from "./latex.pipe";
import { MarkdownPipe } from "./markdown.pipe";
import { NumberingPipe } from "./numbering.pipe";
import { PLHAssetPipe } from "./plh-asset.pipe";
import { StyleListPipe } from "./styleList.pipe";
import { TranslatePipe } from "./translate.pipe";
import { QRCodePipe } from "./qr-code.pipe";

export const TEMPLATE_PIPES = [
  FilterDisplayComponentPipe,
  MarkdownPipe,
  PLHAssetPipe,
  NumberingPipe,
  StyleListPipe,
  TranslatePipe,
  LatexPipe,
  QRCodePipe,
];
