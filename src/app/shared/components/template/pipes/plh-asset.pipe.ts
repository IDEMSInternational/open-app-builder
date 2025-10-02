import { inject, Pipe, PipeTransform, Signal } from "@angular/core";
import { TemplateAssetService } from "../services/template-asset.service";
/**
 * @deprecated 2025-09
 *
 * Prefer to use `TranslatedAssetPipe` which will automatically update
 * assets when theme and language changes
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

/**
 * Take a named asset, add prefix to return from assets directory and auto-update url
 * if theme or language-based overrides exist for asset
 *
 * @example <img [src]="params().logo_asset | translatedAsset" />
 */
@Pipe({ name: "translatedAsset", pure: false, standalone: true })
export class TranslatedAssetPipe implements PipeTransform {
  private templateAssetService = inject(TemplateAssetService);

  transform(assetPath: string) {
    if (!assetPath) return undefined;

    const computedSignal = this.templateAssetService.getTranslatedAssetSignal(assetPath);
    return computedSignal();
  }
}
