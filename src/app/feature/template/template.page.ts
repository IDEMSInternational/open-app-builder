import { Component, inject, OnDestroy, OnInit, viewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { FlowTypes, IAppConfig } from "data-models";
import { Subscription } from "rxjs";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { TemplateContainerComponent } from "src/app/shared/components/template/template-container.component";
import { TemplateLifecycleService } from "src/app/shared/components/template/services/template-lifecycle.service";
import { LocalVariableStore } from "src/app/reactive-templates/stores/local-variable-store";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";
import { ContextCreatorService } from "src/app/reactive-templates/services/context-creator.service";
import { EvaluationService } from "src/app/reactive-templates/services/evaluation.service";
import { RowRegistry } from "src/app/reactive-templates/services/row.registry";
import { ActionRegistry } from "src/app/reactive-templates/services/action.registry";
import { ActionService } from "src/app/reactive-templates/services/action.service";
import { NavigationService } from "src/app/reactive-templates/services/navigation-service";

@Component({
  selector: "plh-template-page",
  templateUrl: "./template.page.html",
  styleUrls: ["./template.page.scss"],
  // Each page instance owns its reactive locals and row/action registries; nested templates share them.
  providers: [
    LocalVariableStore,
    VariableStore,
    ContextCreatorService,
    EvaluationService,
    RowRegistry,
    ActionRegistry,
    ActionService,
    NavigationService,
  ],
  standalone: false,
})
export class TemplatePage implements OnInit, OnDestroy {
  templateName: string;
  filterTerm: string;
  allTemplates: FlowTypes.FlowTypeBase[] = [];
  filteredTemplates: FlowTypes.FlowTypeBase[] = [];
  appConfigChanges$: Subscription;
  shouldEmitScrollEvents: boolean = false;

  public useReactiveTemplates: boolean = false;

  // none with reactive templates, so their pages don't get nav_enter
  private container = viewChild(TemplateContainerComponent);
  private lifecycleService = inject(TemplateLifecycleService);

  constructor(
    private route: ActivatedRoute,
    private appDataService: AppDataService,
    private appConfigService: AppConfigService,
    private deploymentService: DeploymentService,
    private navigationService: NavigationService
  ) {
    this.useReactiveTemplates = this.deploymentService.config.useReactiveTemplates ?? false;
  }

  ngOnInit() {
    this.templateName = this.route.snapshot.params.templateName;
    if (!this.templateName) {
      this.listTemplates();
    }
    this.subscribeToAppConfigChanges();
  }

  ionViewWillEnter() {
    this.navigationService.setActive(true);
  }

  ionViewWillLeave() {
    this.navigationService.setActive(false);
    this.lifecycleService.clearActivePage(this.container);
  }

  /** Ionic page lifecycle: cached pages stay rendered but are not shown, so track the shown one */
  ionViewDidEnter() {
    this.lifecycleService.setActivePage(this.container);
  }

  public canLeave(): Promise<boolean> {
    return this.navigationService.canLeave();
  }

  public search() {
    this.filteredTemplates = this.allTemplates.filter(
      (i) => i.flow_name.toLocaleLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1
    );
  }

  /** Create a list of all templates to display when no specific template loaded */
  private listTemplates() {
    const allTemplates = this.appDataService.listSheetsByType("template");
    this.allTemplates = allTemplates.sort((a, b) => (a.flow_name > b.flow_name ? 1 : -1));
    this.filteredTemplates = allTemplates;
  }

  private subscribeToAppConfigChanges() {
    this.appConfigChanges$ = this.appConfigService.changesWithInitialValue$.subscribe(
      (changes: IAppConfig) => {
        // TODO: current header collapse implementation does not work on ios, so do not enable on this platform
        if (Capacitor.getPlatform() === "ios") return;

        this.shouldEmitScrollEvents = !!changes.APP_HEADER_DEFAULTS?.collapse;
      }
    );
  }

  ngOnDestroy() {
    this.lifecycleService.clearActivePage(this.container);
    this.appConfigChanges$.unsubscribe();
  }
}
