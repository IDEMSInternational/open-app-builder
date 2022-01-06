import { Pipe, PipeTransform } from "@angular/core";
import { TemplateAssetService } from "../services/template-asset.service";
/**
 * Retrieve an asset for the current language from nested data asset folder,
 * returning original if not available
 * @example <img src="images/my_icon.svg | plhAsset" />
 */

@Pipe({ name: "plhAsset" })
export class PLHAssetPipe implements PipeTransform {
  constructor(private templateAssetService: TemplateAssetService) {}

  transform(value: string) {
    // keep external links
    if (value.startsWith("http")) {
      return value;
    }
    const path = this.templateAssetService.getTranslatedAssetPath(value);
    return path;
  }
}
