import { Injectable } from "@angular/core";
import { ASSETS_CONTENTS_LIST, IAssetContents } from "src/app/data";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { TemplateTranslateService } from "./template-translate.service";
import { IAssetEntry, IContentsEntryMinimal } from "data-models";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

/** Synced assets are automatically copied during build to asset subfolder */
const ASSETS_BASE = `assets/app_data/assets`;

/** Expected folder containing global assets (TODO - merge with scripts) */
const ASSETS_GLOBAL_FOLDER_NAME = "global";
const DEFAULT_THEME_NAME = "theme_default";

@Injectable({ providedIn: "root" })
export class TemplateAssetService extends AsyncServiceBase {
  public assetsContentsList: IAssetContents = ASSETS_CONTENTS_LIST;
  constructor(
    private translateService: TemplateTranslateService,
    private themeService: ThemeService,
    private http: HttpClient
  ) {
    super("TemplateAsset");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([this.translateService]);
    this.ensureSyncServicesReady([this.themeService]);
  }

  /**
   * Retrieve an app_data asset via get request
   * @param responseType specify expected response type (depending on file extension)
   */
  public async fetchAsset<T>(
    path: string,
    responseType: "json" | "text" | "arraybuffer" | "blob" = "json"
  ) {
    const translatedPath = this.getTranslatedAssetPath(path);
    return lastValueFrom(this.http.get(translatedPath, { responseType: responseType as any })) as T;
  }

  /**
   * Retrieve the path to a variation of an asset for the current language and theme.
   * It is possible that such a variation does not exist, in which case the path to a
   * different version of the asset will be returned as a fallback.
   * The order of priority for these fallbacks is:
   * 1. current theme, current language
   * 2. default theme, current language
   * 3. current theme, default language
   * 4. default theme, default language
   */
  getTranslatedAssetPath(value: string) {
    let assetName = this.cleanAssetName(value);
    const assetEntry = this.assetsContentsList[assetName];
    if (!assetEntry) {
      console.error("Asset missing", value, assetName);
      return `${ASSETS_GLOBAL_FOLDER_NAME}/${assetName}`;
    }

    const currentThemeName = this.themeService.getCurrentTheme();
    const currentLanguageCode = this.translateService.app_language;

    const themeName = `theme_${currentThemeName}`;
    const langName = currentLanguageCode;

    // 1. current theme, current language
    const override1 = assetEntry.overrides?.[themeName]?.[langName];
    if (override1) {
      return this.getAssetPath(assetName, override1);
    }
    // 2. default theme, current language
    const override2 = assetEntry.overrides?.[DEFAULT_THEME_NAME]?.[langName];
    if (override2) {
      return this.getAssetPath(assetName, override2);
    }
    // 3. current theme, default language
    const override3 = assetEntry.overrides?.[themeName]?.["global"];
    if (override3) {
      return this.getAssetPath(assetName, override3);
    }
    return this.getAssetPath(assetName, assetEntry);
  }

  private cleanAssetName(value: string) {
    // remove prefix slash
    if (value.startsWith("/")) value = value.substring(1);
    return value;
  }

  private getAssetPath(
    assetName: string,
    contentsEntry: IContentsEntryMinimal | Partial<IAssetEntry>
  ) {
    return this.convertGdriveRelativePathToAssetPath(contentsEntry.filePath || assetName);
  }

  /**
   * When asset paths are provided it is relative to the assets folder populated from
   * google drive. Rewrite paths to add correct prefix, fixing common authoring mistakes
   */
  private convertGdriveRelativePathToAssetPath(value: string) {
    // For remote assets, the filepath will be either an external URL (web) or an internal Android filepath (native).
    // These should be left unchanged
    if (value.startsWith("http") || value.startsWith("file://") || value.startsWith("content://")) {
      return value;
    }

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

  public async updateContentsList(assetName: string, updates?: { uri?: string }) {
    // TODO: Store contents list overrides in rxdb via dynamicData service to enable persitence.
    // For now, just update this.assetsContentsList
    const { uri } = updates;
    if (uri) {
      this.assetsContentsList[assetName] ??= {};
      this.assetsContentsList[assetName].filePath = uri;
      // TODO: theme/language overrides. Possibly use "setNestedProperty", e.g.:
      // setNestedProperty(overrides.theme_default.tz_sw, uri, this.templateAssetService.assetsContentList[assetName])
    }
    console.log("[TEMPLATE ASSET] updated asset entry:", this.assetsContentsList[assetName]);
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
