import { effect, Injectable, signal } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { TemplateMetadataService } from "../../components/template/services/template-metadata.service";
import { deepMergeObjects, RecursivePartial } from "../../utils";
import { IAppConfig } from "data-models";
import { AppConfigService } from "../app-config/app-config.service";
import { SkinService } from "../skin/skin.service";
import { updatedDiff } from "deep-object-diff";

/**
 * Service to apply template-level layout changes (e.g. to header and footer elements)
 * These overrides are on top of changes applied in the deployment config and active skin
 * */
@Injectable({
  providedIn: "root",
})
export class LayoutService extends SyncServiceBase {
  private templateLayoutOverrideSignal = signal<RecursivePartial<IAppConfig>>({});
  private templateLayoutOverride: RecursivePartial<IAppConfig> = {};
  baseAppConfig: IAppConfig;
  /** Track overrides required to undo a previously applied template layout override (if applying another) */
  private revertOverride: RecursivePartial<IAppConfig> = {};

  constructor(
    private templateMetadataService: TemplateMetadataService,
    private appConfigService: AppConfigService,
    private skinService: SkinService
  ) {
    super("Layout");
    effect(
      async () => {
        const templateParameterList = this.templateMetadataService.parameterList();
        // Can't do this because we want to apply undefined values to reset to skin defaults
        // if (Object.keys(templateParameterList).length === 0) return;
        const { footer_template, header_variant } = templateParameterList;

        console.log("footer_template", footer_template);
        console.log("header_variant", header_variant);

        const footerOverrides = { templateName: footer_template };
        const headerOverrides = { variant: header_variant };

        let overrides = {
          // APP_FOOTER_DEFAULTS: footerOverrides,
          APP_HEADER_DEFAULTS: headerOverrides,
        } as RecursivePartial<IAppConfig>;

        const currentSkin = this.skinService.currentSkin;
        if (currentSkin.appConfig) {
          overrides = deepMergeObjects({}, currentSkin.appConfig, overrides);
        }
        this.appConfigService.setAppConfig(overrides);

        return console.log("overrides", overrides);
      },
      { allowSignalWrites: true }
    );
  }
}
