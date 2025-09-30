import { Pipe, PipeTransform } from "@angular/core";
import { TemplateAssetService } from "../services/template-asset.service";
/**
 * @deprecated 2025-09
 *
 * Prefer to use service directly which will return a signal, e.g.
 * ```ts
 * private templateAssetService = inject(TemplateAssetService)
 * public imgSrc = templateAssetService.translatedAssetSignal(this.row.value)
 * ```
 *
 * Retrieve an asset for the current language from nested data asset folder,
 * returning original if not available
 * Usage @example <img src="images/my_icon.svg | plhAsset" />
 */

@Pipe({ name: "plhAsset" })
export class PLHAssetPipe implements PipeTransform {
  constructor(private templateAssetService: TemplateAssetService) {}

  transform(value: any) {
    const translatedPath = this.templateAssetService.getTranslatedAssetPath(value);
    return translatedPath;
  }
}
