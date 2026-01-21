import { effect, Injectable, signal } from "@angular/core";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateService } from "./template.service";
import { FlowTypes } from "src/app/shared/model";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { TemplateNavService } from "./template-nav.service";

/**
 * Service responsible for handling metadata of the current top-level template,
 * i.e. parameters authored through the template's parameter_list in a contents list
 */
@Injectable({
  providedIn: "root",
})
export class TemplateMetadataService extends SyncServiceBase {
  /** List of parameterList provided with current template */
  public parameterList = signal<FlowTypes.Template["parameter_list"]>({}, { equal: isEqual });

  constructor(
    private templateService: TemplateService,
    private appConfigService: AppConfigService,
    private templateNavService: TemplateNavService
  ) {
    super("TemplateMetadata");

    // subscribe to template name changes and load corresponding template parameter list on change
    effect(
      async () => {
        const templateName = this.templateNavService.currentTemplateName();
        const parameterList = templateName
          ? await this.templateService.getTemplateMetadata(templateName)
          : {};
        this.parameterList.set(parameterList);
      },
      { allowSignalWrites: true }
    );
    // apply any template-specific appConfig overrides on change
    effect(
      () => {
        const templateAppConfig = this.parameterList().app_config;
        this.appConfigService.setAppConfig(templateAppConfig, "template");
      },
      { allowSignalWrites: true }
    );
  }
}
