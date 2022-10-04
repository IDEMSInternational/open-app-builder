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

    // TODO - Implement support for translated theme-specific assets. It would likely be best to
    // prioritise the translated version if a non-translated theme-specific version also exists.
    // Currently, a translated version of an asset will always be used if it exists,
    // ignoring any theme-specific assets. This is temporarily acceptable as currently
    // there are no translated theme-specific assets - JM 03-10-2022
    const absolutePath = this.templateAssetService.getAbsoluteAssetPath(value);
    const translatedPath = this.templateAssetService.getTranslatedAssetPath(value);
    if (translatedPath !== absolutePath) {
      return translatedPath;
    }
    const themePath = this.templateAssetService.getThemeAssetPath(value);
    return themePath;
  }
}
