import { Injectable, OnDestroy, signal } from "@angular/core";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateService } from "./template.service";
import { FlowTypes } from "src/app/shared/model";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { distinctUntilChanged, filter, map, Subject, takeUntil } from "rxjs";
import { Capacitor } from "@capacitor/core";

/**
 * Service responsible for handling metadata of the current top-level template,
 * i.e. parameters authored through the template's parameter_list in a contents list
 */
@Injectable({
  providedIn: "root",
})
export class TemplateMetadataService extends SyncServiceBase implements OnDestroy {
  public parameterList = signal<FlowTypes.Template["parameter_list"]>({});
  private enabled: boolean;
  private destroy$ = new Subject();

  constructor(
    private templateService: TemplateService,
    private router: Router
  ) {
    super("TemplateMetadata");

    // Currently the only watched parameter is for screen orientation,
    // which is only supported on native platforms
    this.enabled = !Capacitor.isNativePlatform();
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
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map((root) => this.extractTemplateNameFromRoute(root)),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(async (templateName: string | undefined) => {
        await this.updateParameterList(templateName);
      });
  }

  private extractTemplateNameFromRoute(root: ActivatedRoute): string | undefined {
    let active = root;
    while (active.firstChild) {
      active = active.firstChild;
    }
    return active.snapshot.params["templateName"];
  }

  private async updateParameterList(templateName: string | undefined) {
    if (!templateName) return this.parameterList.set({});
    try {
      const parameterList = await this.templateService.getTemplateMetadata(templateName);
      this.parameterList.set(parameterList || {});
    } catch (error) {
      console.error("[TEMPLATE METADATA] Failed to fetch template parameter_list", error);
      this.parameterList.set({});
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
