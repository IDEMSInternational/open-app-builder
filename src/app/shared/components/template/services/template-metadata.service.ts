import { computed, effect, Injectable, signal } from "@angular/core";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateService } from "./template.service";
import { FlowTypes } from "src/app/shared/model";
import { Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { ngRouterMergedSnapshot$ } from "src/app/shared/utils/angular.utils";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";

/**
 * Service responsible for handling metadata of the current top-level template,
 * i.e. parameters authored through the template's parameter_list in a contents list
 */
@Injectable({
  providedIn: "root",
})
export class TemplateMetadataService extends SyncServiceBase {
  /** Utility snapshot used to get router snapshot from service (outside render context) */
  private snapshot = toSignal(ngRouterMergedSnapshot$(this.router));

  /** Name of current template provide by route param */
  private templateName = computed<string | undefined>(() => this.snapshot().params.templateName);

  /** List of parameterList provided with current template */
  public parameterList = signal<FlowTypes.Template["parameter_list"]>({}, { equal: isEqual });

  constructor(
    private templateService: TemplateService,
    private appConfigService: AppConfigService,
    private router: Router
  ) {
    super("TemplateMetadata");

    // subscribe to template name changes and load corresponding template parameter list on change
    effect(
      async () => {
        // use full screen popup template if exists, or current template page if not
        const templateName = this.templateService.standaloneTemplateName() || this.templateName();
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
