import { Injectable } from "@angular/core";
import { ASSETS_CONTENTS_LIST } from "app-data";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { TemplateTranslateService } from "./template-translate.service";

/** Synced assets are automatically copied during build to asset subfolder */
const ASSETS_BASE = `assets/app_data/assets`;

/** Expected folder containing global assets (TODO - merge with scripts) */
const ASSETS_GLOBAL_FOLDER_NAME = "global";

@Injectable({ providedIn: "root" })
export class TemplateAssetService {
  constructor(
    private translateService: TemplateTranslateService,
    private themeService: ThemeService
  ) {}

  getAbsoluteAssetPath(value: string) {
    const assetName = this.cleanAssetName(value);
    const assetEntry = ASSETS_CONTENTS_LIST[assetName];
    if (!assetEntry) {
      console.error("Asset missing", value, assetName);
    }
    return this.convertPLHRelativePathToAssetPath(`${ASSETS_GLOBAL_FOLDER_NAME}/${assetName}`);
  }
  /**
   * Retrieve the path to translated version of an asset path for the current language.
   * Fallsback to original path if does not exist
   */
  getTranslatedAssetPath(value: string) {
    const currentLanguageCode = this.translateService.app_language;
    const assetName = this.cleanAssetName(value);
    const assetEntry = ASSETS_CONTENTS_LIST[assetName];
    if (!assetEntry) {
      console.error("Asset missing", value, assetName);
    }
    if (assetEntry?.translations?.[currentLanguageCode]) {
      return this.convertPLHRelativePathToAssetPath(`${currentLanguageCode}/${assetName}`);
    }
    return this.convertPLHRelativePathToAssetPath(`${ASSETS_GLOBAL_FOLDER_NAME}/${assetName}`);
  }

  /**
   * Retrieve the path to theme-specific version of an asset path for the current theme.
   * Fallsback to original path if does not exist
   */
  getThemeAssetPath(value: string) {
    const themeFolderName = `theme_${this.themeService.getCurrentTheme()}`;
    const assetName = this.cleanAssetName(value);
    const assetEntry = ASSETS_CONTENTS_LIST[assetName];
    if (!assetEntry) {
      console.error("Asset missing", value, assetName);
    }
    if (assetEntry?.themeVariations?.[themeFolderName]) {
      return this.convertPLHRelativePathToAssetPath(
        `${themeFolderName}/${ASSETS_GLOBAL_FOLDER_NAME}/${assetName}`
      );
    }
    return this.convertPLHRelativePathToAssetPath(`${ASSETS_GLOBAL_FOLDER_NAME}/${assetName}`);
  }

  private cleanAssetName(value: string) {
    // remove prefix slash
    if (value.startsWith("/")) value = value.replace("/", "");
    return value;
  }

  /**
   * When asset paths are provided it is relative to the assets folder populated from
   * google drive. Rewrite paths to add correct prefix, fixing common authoring mistakes
   */
  private convertPLHRelativePathToAssetPath(value: string) {
    // ensure starts either "assets" or "/assets/"
    const regex = new RegExp(`^(\/)?assets\/`, "gi");
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
}

/**
 * DEPRECATED - CC 2021-11-12
 * This method was used to make GET/HEAD request to check if an asset exists,
 * however no longer required as a index of assets is provided instead for sync lookup.
 * Recommend to keep for reference (and in case we want to use user-generated content/files)
 *
 * Use HTTP request to check if local asset file exists
 *
 * NOTE - this will still result in a lot of browser errors for files not found
 * https://stackoverflow.com/a/55810490/5693245
 * https://github.com/angular/angular/issues/8832
 *
 * Only workarounds I can think of would be to populate a list of assets
 * during build process, or modifying the webpack server to respond with a 2xx code
 * https://github.com/manfredsteyer/ngx-build-plus
 * https://github.com/just-jeb/angular-builders#readme
 *
 * Tested trying to provide an interceptor (below), but does not prevent the logs
 * (see https://angular.io/guide/http#intercepting-requests-and-responses)
 **/

/*
 private async deprecatedCheckAssetExists(assetPath: string) {
    return new Promise((resolve) => {
        if (environment.production) {
            // observe reponse will send back status code and not just empty (which would also be ok)
            this.http.head(assetPath, { observe: 'response', responseType: 'text' }).subscribe(
                (res) => { resolve(true); },
                (err) => { resolve(false); },
            );
        }
        // HEAD requests not supported in local development
        // https://github.com/angular/angular-cli/issues/5170
        else {
            this.http.get(assetPath, { observe: 'response', responseType: 'arraybuffer' }).subscribe(
                (res) => { resolve(true); },
                (err) => { resolve(false); },
            );
        }

    });
}
 */

/**
 * Deprecated - CC 2021-11-12
 * Worth retaining for future reference
 *
 * Example interceptor to globally handle specific HTTP requests
 * such as those to the ASSETS_BASE folder.
 *
 * See further examples at: https://angular.io/guide/http#intercepting-requests-and-responses
 *
 * Must be included in app.module.ts providers *
 * ```
 * { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
 * ```
 */

/*
@Injectable()
export class DeprecatedAssetRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Example to intercept asset requests and provide mocked response
        if (req.url.includes(ASSETS_BASE)) {
            console.log('asset req', req)
            return of(new HttpResponse({
                status: 200,
            }));
        }
        // Example to intercept responses and alter error code
        // NOTE
        return next.handle(req).pipe(
            catchError(err => {
                console.error('custom err', err.url)
                const assetResponse = new HttpResponse({ status: 204, statusText: "No Asset" })
                return of(assetResponse)
                const newHttpErrorResponse = new HttpErrorResponse({
                    error: err.error,
                    headers: err.headers,
                    status: 500,
                    statusText: err.statusTex,
                    url: err.url
                });
                return Observable.throw(newHttpErrorResponse);
            }),
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    console.log('evt', evt)
                }
            })
        )
    }
}
*/
