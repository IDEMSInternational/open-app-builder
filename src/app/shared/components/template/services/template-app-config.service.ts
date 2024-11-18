import { effect, Injectable, signal } from "@angular/core";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateMetadataService } from "./template-metadata.service";
import { deepMergeObjects, RecursivePartial } from "src/app/shared/utils";
import { IAppConfig } from "data-models";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { SkinService } from "src/app/shared/services/skin/skin.service";

/**
 * Service to apply template-level app config changes (e.g. to header and footer elements)
 * These overrides are on top of changes applied by skins (which are themselves on top of those in the deployment config)
 * */
@Injectable({
  providedIn: "root",
})
export class TemplateAppConfigService extends SyncServiceBase {
  constructor(
    private templateMetadataService: TemplateMetadataService,
    private appConfigService: AppConfigService,
    private skinService: SkinService
  ) {
    super("TemplateAppConfig");
    effect(async () => {
      this.applyAppConfigOverrides(this.templateMetadataService.parameterList()?.app_config);
    });
  }

  applyAppConfigOverrides(overrides: RecursivePartial<IAppConfig> = {}) {
    // Template app config overrides are applied on top of skin overrides
    const currentSkin = this.skinService.currentSkin;
    if (currentSkin.appConfig) {
      overrides = deepMergeObjects({}, currentSkin.appConfig, overrides);
    }
    this.appConfigService.setAppConfig(overrides);
  }
}
