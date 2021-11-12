import { MarkdownPipe } from "./markdown.pipe";
import { NumberingPipe } from "./numbering.pipe";
import { PLHAssetTranslatedPipe } from "./plh-asset-translated.pipe";
import { TranslatePipe } from "./translate.pipe";

export const TEMPLATE_PIPES = [MarkdownPipe, NumberingPipe, PLHAssetTranslatedPipe, TranslatePipe];
