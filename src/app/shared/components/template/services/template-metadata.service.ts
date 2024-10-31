import { Injectable } from "@angular/core";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateService } from "./template.service";
import { FlowTypes } from "src/app/shared/model";
import { ActivatedRoute, Router } from "@angular/router";

/** Some authored template metadata values should be stored in the url via query params */
export interface ITemplateMetadataQueryParams {
  landscape?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class TemplateMetadataService extends SyncServiceBase {
  route: ActivatedRoute;

  constructor(
    private templateService: TemplateService,
    private router: Router
  ) {
    super("TemplateMetadata");
  }

  public async applyQueryParamsForTemplate(templateName: string) {
    const templateMetadata = await this.templateService.getTemplateMetadata(templateName);
    await this.updateQueryParamsFromTemplateMetadata(templateMetadata);
  }
  public async updateQueryParamsFromTemplateMetadata(
    templateMetadata: FlowTypes.Template["parameter_list"]
  ) {
    const templateMetadataQueryParams: ITemplateMetadataQueryParams = {};
    templateMetadataQueryParams.landscape = templateMetadata?.landscape || null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: templateMetadataQueryParams,
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }
}
