import { MarkdownPipe } from "./markdown.pipe";
import { NumberingPipe } from "./numbering.pipe";
import { PLHAssetPipe } from "./plh-asset.pipe";
import { PLHAssetTranslatedPipe } from "./plh-asset-translated.pipe";
import { TranslatePipe } from "./translate.pipe";

export const TEMPLATE_PIPES = [
  MarkdownPipe,
  NumberingPipe,
  PLHAssetPipe,
  PLHAssetTranslatedPipe,
  TranslatePipe,
];
