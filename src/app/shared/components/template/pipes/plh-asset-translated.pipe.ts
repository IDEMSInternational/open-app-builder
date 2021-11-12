import { Pipe, PipeTransform } from "@angular/core";
import { TemplateAssetService } from "../services/template-asset.service";
/**
 * Retrieve an asset for the current language, with fallback in case not available
 * @example <img src="images/my_icon.svg | plhAssetTranslated" />
 *
 * If the current deployment is za_xho with za_eng default configuration fallback
 *
 * Attempt 1: `assets/plh_assets/za_xho/images/my_icon.svg`
 * Attempt 2: `assets/plh_assets/za_eng/images/my_icon.svg`
 * Attempt 3: `assets/plh_assets/global/images/my_icon.svg`
 *
 * NOTE - requires an additional `| async` to be included. Whilst the full behaviour
 * could be written into a single pipe, it is inadvisable to do so:
 * https://stackoverflow.com/questions/51481630/create-custom-pipe-that-is-async-by-itself
 * https://github.com/angular/angular/blob/master/packages/common/src/pipes/async_pipe.ts
 *
 */

@Pipe({ name: "plhAssetTranslated" })
export class PLHAssetTranslatedPipe implements PipeTransform {
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
