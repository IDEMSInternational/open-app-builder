import { Pipe, PipeTransform } from "@angular/core";
import { getImageAssetPath } from "../utils/template-utils";
/**
 * Ensure local assets have correct path name to local asset folder
 * @example <img src="images/my_icon.svg | plhAsset" />
 * Will rewrite image source to "assets/plh_assets/images/my_icon.svg"
 *
 */

@Pipe({ name: "plhAsset" })
export class PLHAssetPipe implements PipeTransform {
  transform(value: string) {
    return getImageAssetPath(value);
  }
}
