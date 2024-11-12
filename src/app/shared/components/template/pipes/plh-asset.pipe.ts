import { Pipe, PipeTransform } from "@angular/core";
import { TemplateAssetService } from "../services/template-asset.service";
/**
 * Retrieve an asset for the current language from nested data asset folder,
 * returning original if not available
 * Usage @example <img src="images/my_icon.svg | plhAsset" />
 */

@Pipe({ name: "plhAsset" })
export class PLHAssetPipe implements PipeTransform {
  constructor(private templateAssetService: TemplateAssetService) {}

  transform(value: string) {
    const translatedPath = this.templateAssetService.getTranslatedAssetPath(value);
    return translatedPath;
  }
}
