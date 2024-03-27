import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { FlowTypes, IAppConfig } from "data-models";
import { Subscription } from "rxjs";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

@Component({
  selector: "plh-template-page",
  templateUrl: "./template.page.html",
  styleUrls: ["./template.page.scss"],
})
export class TemplatePage implements OnInit, OnDestroy {
  templateName: string;
  filterTerm: string;
  allTemplates: FlowTypes.FlowTypeBase[] = [];
  filteredTemplates: FlowTypes.FlowTypeBase[] = [];
  appConfigChanges$: Subscription;
  shouldEmitScrollEvents: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private appDataService: AppDataService,
    private appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    this.templateName = this.route.snapshot.params.templateName;
    const allTemplates = this.appDataService.listSheetsByType("template");
    this.allTemplates = allTemplates.sort((a, b) => (a.flow_name > b.flow_name ? 1 : -1));
    this.filteredTemplates = allTemplates;
    this.subscribeToAppConfigChanges();
  }

  search() {
    this.allTemplates = this.allTemplates;
    this.filteredTemplates = this.allTemplates.filter(
      (i) => i.flow_name.toLocaleLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1
    );
  }

  trackByFn(index) {
    return index;
  }

  private subscribeToAppConfigChanges() {
    this.appConfigChanges$ = this.appConfigService.changesWithInitialValue$.subscribe(
      (changes: IAppConfig) => {
        // TODO: current header collapse implementation does not work on ios, so do not enable on this platform
        if (Capacitor.getPlatform() === "ios") return;

        this.shouldEmitScrollEvents = changes.APP_HEADER_DEFAULTS?.collapse === true;
      }
    );
  }

  ngOnDestroy() {
    this.appConfigChanges$.unsubscribe();
  }
}
