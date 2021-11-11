import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TemplateTranslateService } from "./template-translate.service";

@Injectable({ providedIn: "root" })
export class TemplateAssetService {
  constructor(private http: HttpClient, private translateService: TemplateTranslateService) {}

  async getTranslatedAssetPath(value: string) {
    const basePath = this.convertPLHRelativePathToAssetPath(value);
    console.log("getTranslatedAssetPath", { value, basePath });
    return basePath;
  }

  private convertPLHRelativePathToAssetPath(value: string) {
    console.log("get translated asset", value);
    const ASSETS_BASE = "assets/plh_assets";
    // ensure starts either "assets/plh_assets" or "/assets/plh_assets"
    const regex = /^(\/)?assets\/plh_assets/gi;
    let transformed = value;
    if (!regex.test(transformed)) {
      transformed = `${ASSETS_BASE}/${transformed}`.replace("//", "/");
    }
    // remove duplicate path if exist (TODO - CC 2021-05-13 possibly no longer required)
    if (transformed.includes(`${ASSETS_BASE}/${ASSETS_BASE}`)) {
      transformed = transformed.replace(`${ASSETS_BASE}/${ASSETS_BASE}`, ASSETS_BASE);
    }
    return transformed;
  }

  private async checkAssetExists(assetPath: string) {
    return new Promise((resolve) => {
      this.http.head(assetPath).subscribe(
        (res) => {
          console.log("res", res);
          resolve(true);
        },
        (err) => {
          console.error(err);
          resolve(false);
        },
        () => console.log("complete")
      );
    });
  }
}
