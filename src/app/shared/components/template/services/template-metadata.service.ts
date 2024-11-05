import { Injectable, signal, WritableSignal } from "@angular/core";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateService } from "./template.service";
import { FlowTypes } from "src/app/shared/model";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { distinctUntilChanged, filter, map } from "rxjs";
import { Capacitor } from "@capacitor/core";

/** Some authored template metadata values should be stored in the url via query params */
export interface ITemplateMetadataQueryParams {
  landscape?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class TemplateMetadataService extends SyncServiceBase {
  public parameterList: WritableSignal<FlowTypes.Template["parameter_list"]> = signal({});
  private enabled: boolean;

  constructor(
    private templateService: TemplateService,
    private router: Router
  ) {
    super("TemplateMetadata");

    // Currently the only watched parameter is for screen orientation,
    // which is only supported on native platforms
    this.enabled = Capacitor.isNativePlatform();

    this.initialise();
  }

  private initialise() {
    if (this.enabled) {
      this.watchRouteForTopLevelTemplate();
    }
  }

  private watchRouteForTopLevelTemplate() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd), // Listen for route changes
        map(() => this.router.routerState.root),
        map((root) => {
          let active = root;
          while (active.firstChild) {
            active = active.firstChild;
          }
          return active.snapshot.params["templateName"]; // Access the parameter here
        }),
        distinctUntilChanged()
      )
      .subscribe(async (templateName: string | undefined) => {
        console.log("*****templateName*****", templateName);
        if (!templateName) return this.parameterList.set({});
        try {
          const parameterList = await this.templateService.getTemplateMetadata(templateName);
          this.parameterList.set(parameterList || {});
          console.log("this.parameterList", this.parameterList());
        } catch (error) {
          console.error("[TEMPLATE METADATA] Failed to fetch template parameter_list", error);
          this.parameterList.set({});
        }
      });
  }
}
