import { Component, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "scripts/node_modules/rxjs";
import { TEMPLATE } from "../../services/data/data.service";
import { TourService } from "../../services/tour/tour.service";
import { mapToJson } from "../../utils";
import { FlowTypes, ITemplateContainerProps } from "./models";
import { TemplateActionService } from "./services/template-action.service";
import { TemplateNavService } from "./services/template-nav.service";
import { TemplateRowService } from "./services/template-row.service";
import { TemplateVariablesService } from "./services/template-variables.service";
import { TemplateService } from "./services/template.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

@Component({
  selector: "plh-template-container",
  templateUrl: "./template-container.component.html",
  styleUrls: ["./template-container.component.scss"],
})
/**
 * TODOs
 * - Separate out initialisation variables and updated runtime variables for easier change detection/reprocessing
 * - Track dynamic variable dependency (to know when to trigger row change based on set_local/field/global events)
 * - Consider case of template container re-render (some draft cached code exists, but not sure if this is a valid use-case or not)
 */
export class TemplateContainerComponent implements OnInit, OnDestroy, ITemplateContainerProps {
  /** unique instance_name of template if created as a child of another template */
  @Input() name: string;
  /** flow_name of template for lookup */
  @Input() templatename: string;
  @Input() parent?: TemplateContainerComponent;
  @Input() row?: FlowTypes.TemplateRow;
  children: { [name: string]: TemplateContainerComponent } = {};

  /** Local variables track specific updates that have been made via set_local in this template
   *  The are used to help restore correct state if reprocessing rows after parent-triggered render
   * (note, we can't use templateRowMap for this as duplicate named rows would override each other during init) */
  localVariables: any = {};

  template: FlowTypes.Template;

  /** */
  templateRowService: TemplateRowService;
  templateActionService: TemplateActionService;

  /** track path to template from top parent (not currently used) */
  templateBreadcrumbs: string[] = [];
  componentDestroyed$ = new Subject();
  debugMode: boolean;

  constructor(
    public templateService: TemplateService,
    public templateVariables: TemplateVariablesService,
    public tourService: TourService,
    public router: Router,
    public route: ActivatedRoute,
    public elRef: ElementRef,
    public templateNavService: TemplateNavService
  ) {
    this.templateActionService = new TemplateActionService(this);
    this.templateRowService = new TemplateRowService(this);
  }

  async ngOnInit() {
    this.subscribeToQueryParamChanges();
    // add logging if default disabled and in debug view
    if (this.debugMode) {
      this.setLogging(true);
      this.templateRowService.setLogging(true);
    }
    await this.renderTemplate();
  }

  ngOnDestroy(): void {
    // allow any subscriptions to be removed by binding to these events (avoid memory leak)
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }

  /***************************************************************************************
   *
   **************************************************************************************/

  public handleActions(
    actions: FlowTypes.TemplateRowAction[] = [],
    _triggeredBy: FlowTypes.TemplateRow
  ) {
    return this.templateActionService.handleActions(actions, _triggeredBy);
  }

  get templateRowMap() {
    return this.templateRowService.templateRowMap;
  }

  /**
   * Brute force method to force all parent and child templates to rerender
   * e.g. in case where a nested child sets a field that needs to be shown on parent
   * @param shouldProcess by default we only start processing after we have reached
   * the top-most parent template, and then render down
   * @param full specify whether to re-render fully as if template first load
   * (including set_variable statements) or just to reprocess existing rows
   */
  public async forceRerender(full = false, shouldProcess = false) {
    if (shouldProcess) {
      console.log("[Force Rerender]", this.name, full);
      if (full) {
        this.templateRowService.renderedRows = [];
        await this.renderTemplate();
      } else {
        await this.templateRowService.processRowUpdates();
      }
      for (const child of Object.values(this.children || {})) {
        await child.forceRerender(full, shouldProcess);
      }
    } else {
      // ensure we start from the top-most parent template for rendering
      if (this.parent) {
        return this.parent.forceRerender(full, shouldProcess);
      } else {
        shouldProcess = true;
        return this.forceRerender(full, shouldProcess);
      }
    }
  }

  /***************************************************************************************
   *  Template Initialisation
   **************************************************************************************/

  private async renderTemplate() {
    // Lookup template
    const foundTemplate: FlowTypes.Template = TEMPLATE.find(
      (t) => t.flow_name === this.templatename
    );
    if (foundTemplate) {
      // create a deep clone of the object to prevent accidental reference changes
      // assign a name (in case top-level template) and store breadcrumb path for nested
      const template = JSON.parse(JSON.stringify(foundTemplate));
      this.name = this.name || this.templatename;
      this.templateBreadcrumbs = [...(this.parent?.templateBreadcrumbs || []), this.name];

      this.template = template;

      // If the template has previously been rendered but forced to re-initialise from parent
      // try to restore previous state (WiP - TODO / Re-evaluate CC 2021-04-21)
      const cachedRender = this.parent?.children?.[this.name];

      log_group("[Template Render Start]", this.name);

      await this.templateRowService.processInitialTemplateRows();
      this.template.rows = this.templateRowService.processedRows;

      log("[Template] Rendered", this.name, {
        template,
        ctxt: { ...this },
        renderedRows: { ...this.templateRowService.renderedRows },
        rowMap: mapToJson(this.templateRowService.templateRowMap),
      });

      // if a parent exists also provide parent reference to this as a child
      if (this.parent) {
        this.parent.children[this.name] = this;
      }
      log_groupEnd();
    }
    // Template not found
    else {
      console.error(`[Template] - Not Found -`, { ...this });
      this.template = NOT_FOUND_TEMPLATE(this.templatename);
    }
  }

  /**
   * When using ngFor loop track by to ensure updates correctly propagated on change
   * Most important is to keep track of row value as updates to this will want UI refresh
   * Note - we do not track row value change as most likely any value change will come from within
   * the component itself and will not require re-render
   */
  public trackByRow(index: number, row: FlowTypes.TemplateRow) {
    return `${row._nested_name}`;
  }

  /** Query params are used to track state across navigation events */
  private subscribeToQueryParamChanges() {
    this.route.queryParams
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(async (params: any) => {
        this.debugMode = params.debugMode ? true : false;
        // allow templateNavService to process actions based on query param change
        await this.templateNavService.handleQueryParamChange(params, this);
      });
  }

  private setLogging(showLogs: boolean) {
    SHOW_DEBUG_LOGS = showLogs;
    log = SHOW_DEBUG_LOGS ? console.log : () => null;
    log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
    log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;
  }
}

/** helper function used for dev to wait a fixed amount of time */
function _wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const NOT_FOUND_TEMPLATE = (name: string): FlowTypes.Template => ({
  flow_name: "Template_not_found",
  flow_type: "template",
  rows: [
    { type: "title", value: `Template "${name}" not found`, name: "title", _nested_name: "title" },
  ],
  status: "released",
});
