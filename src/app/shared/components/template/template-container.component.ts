import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { FlowTypes, ITemplateContainerProps } from "./models";
import { TemplateActionService } from "./services/instance/template-action.service";
import { TemplateNavService } from "./services/template-nav.service";
import { TemplateRowService } from "./services/instance/template-row.service";
import { TemplateService } from "./services/template.service";
import { getIonContentScrollTop, setElStyleAnimated, setIonContentScrollTop } from "./utils";

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
  /** Allow parents to also see emitted value (note - currently responding to emit is done in service, not output bindings except for ) */
  @Output() emittedValue = new EventEmitter<{ emit_value: string; emit_data: any }>();
  /** Query params are used for trigger template actions such as opening popups or enabling debug_mode. Ignored if required (e.g. app sidemenu template) */
  @Input() ignoreQueryParamChanges?: boolean;
  children: { [name: string]: TemplateContainerComponent } = {};

  template: FlowTypes.Template;

  /** */
  templateRowService: TemplateRowService;
  templateActionService: TemplateActionService;

  /** track path to template from top parent (not currently used) */
  templateBreadcrumbs: string[] = [];
  private componentDestroyed$ = new Subject<boolean>();
  debugMode: boolean;

  public get cdr() {
    return this.injector.get(ChangeDetectorRef);
  }

  constructor(
    private templateService: TemplateService,
    private templateNavService: TemplateNavService,
    private injector: Injector,
    // Containers created in headless context may not have specific injectors
    public elRef?: ElementRef,
    private route?: ActivatedRoute
  ) {
    this.templateActionService = new TemplateActionService(injector, this);
    this.templateRowService = new TemplateRowService(injector, this);
  }
  /** Assign the templatename as metdaata on the component for easier debugging and testing */
  @HostBinding("attr.data-templatename") get getTemplatename() {
    return this.templatename;
  }

  async ngOnInit() {
    if (!this.ignoreQueryParamChanges) {
      this.subscribeToQueryParamChanges();
    }
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
   * This is currently distinguished in emit statements as
   * ```
   * emit:force_reload    // full rerender
   * emit:force_reprocess   // only recalculate existing rows (not set_variable/set_nested)
   * ```
   */
  public async forceRerender(full = false, shouldProcess = false) {
    // ensure query params are applied on rerender, only for top-level templates
    if (!this.parent) {
      this.templateNavService.updateQueryParamsFromTemplateMetadata(this.template.parameter_list);
    }

    if (shouldProcess) {
      if (full) {
        console.log("[Force Reload]", this.name);
        // ensure angular destroys previous row components before rendering new
        // (note - will cause short content flicker)
        this.templateRowService.renderedRows = [];
        // allow time for other pending ops to finish
        await _wait(50);
        await this.renderTemplate();
      } else {
        await this.templateRowService.processRowUpdates();
        console.log("[Force Reprocess]", this.name, this.templateRowService.renderedRows);
        for (const child of Object.values(this.children || {})) {
          await child.forceRerender(full, shouldProcess);
        }
      }
    } else {
      // ensure we start from the top-most parent template for rendering
      if (this.parent) {
        return this.parent.forceRerender(full, shouldProcess);
      } else {
        if (this.elRef) {
          // we have the top-most parent. Process re-renders, taking note of current
          // page scroll position and trying to return to it once complete
          shouldProcess = true;
          const top = getIonContentScrollTop(this.elRef);
          // if page scrolled, fade the content out and in during re-render to avoid ugly content flicker
          if (full && top > 0) {
            await setElStyleAnimated(this.elRef, "opacity", 0, { duration: 100 });
          }
          await this.forceRerender(full, shouldProcess);
          if (full && top > 0) {
            setTimeout(async () => {
              setIonContentScrollTop(this.elRef, top);
              await setElStyleAnimated(this.elRef, "opacity", 1, { duration: 200 });
            }, 0);
          }
        }
      }
    }
  }

  /***************************************************************************************
   *  Template Initialisation
   **************************************************************************************/

  private async renderTemplate() {
    // Lookup template
    const template = await this.templateService.getTemplateByName(
      this.templatename,
      this.row?.is_override_target
    );
    this.name = this.name || this.templatename;
    this.templateBreadcrumbs = [...(this.parent?.templateBreadcrumbs || []), this.name];
    this.template = template;
    log_group("[Template Render Start]", this.name);
    await this.templateRowService.processContainerTemplateRows();
    log("[Template] Rendered", this.name, {
      template,
      ctxt: { ...this },
      renderedRows: { ...this.templateRowService.renderedRows },
      rowMap: this.templateRowService.templateRowMap,
    });
    // if a parent exists also provide parent reference to this as a child
    if (this.parent) {
      this.parent.children[this.name] = this;
    }
    log_groupEnd();
    // Ensure any parents using onPush are notified of changes (e.g. data-items)
    this.cdr.markForCheck();
  }

  /**
   * When using ngFor loop track by to ensure updates correctly propagated on change
   *
   * NOTE - if the rendered row contains a component that also renders child rows
   * this method should be applied in the child ngFor statement also
   */
  public trackByRow(index: number, row: FlowTypes.TemplateRow) {
    // let value = row.value;
    // if (value && typeof value === "object" && !Array.isArray(value)) {
    //   value = row.value.id;
    // }
    return `${row._nested_name}`;
  }

  /** Query params are used to track state across navigation events */
  private subscribeToQueryParamChanges() {
    if (this.route) {
      this.route.queryParams
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(async (params: any) => {
          this.debugMode = params.debugMode ? true : false;
          // allow templateNavService to process actions based on query param change
          await this.templateNavService.handleQueryParamChange(params, this);
        });
    }
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
