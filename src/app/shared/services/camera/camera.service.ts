import { Injectable } from "@angular/core";
import { Plugins, CameraResultType, CameraOptions } from "@capacitor/core";
const { Camera } = Plugins;

const CAMERA_DEFAULTS: CameraOptions = {
  resultType: CameraResultType.Uri,
  quality: 100,
  allowEditing: false,
};

@Injectable({
  providedIn: "root",
})
/**
 * Access native device operations. Support Android, IOS and Web
 * For full api see https://capacitorjs.com/docs/apis/camera
 */
export class CameraService {
  constructor() {}
  /**
   *
   * @returns image - CameraPhoto Object.
   * @example Use `image.webpath` for local url that can be used as src of an image component
   * ```
   * `imageElement.src = imageUrl;`
   * ```
   * @example Use `image.path` to access original file, which can be read by
   * Filesystem API to read the raw data of the image if desired
   * (or pass resultType: CameraResultType.Base64 to getPhoto)
   */
  async takePhoto(options: Partial<CameraOptions> = {}) {
    const image = await Camera.getPhoto({
      ...CAMERA_DEFAULTS,
      ...options,
    });
    return image;
  }
}
