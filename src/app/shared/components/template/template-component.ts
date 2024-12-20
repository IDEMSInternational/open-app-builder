import {
  Directive,
  ViewContainerRef,
  Component,
  Input,
  ViewChild,
  Type,
  OnInit,
  ElementRef,
  AfterContentInit,
  ViewEncapsulation,
  HostBinding,
  ComponentRef,
} from "@angular/core";
import { TEMPLATE_COMPONENT_MAPPING } from "./components";
import { FlowTypes, ITemplateRowProps } from "./models";
import { TemplateContainerComponent } from "./template-container.component";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

/*********************************************************************
 *  Directive used as part of loading dynamic flow component elemnt
 *********************************************************************/
@Directive({
  selector: "[plhTemplateComponentHost]",
})
export class TmplCompHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

/*********************************************************************
 * Dynamic element to populate flow specific template component
 * https://angular.io/guide/dynamic-component-loader
 *
 * Overall this component can be thought of as an intermediate between
 * the template container and the intended display component represented
 * within a template's rows.
 *
 * The component handles looking up component types, dynamically instantiating
 * them with input properties, and injecting into a placeholder element.
 * It also manages hidden view display
 *********************************************************************/
@Component({
  selector: "plh-template-component",
  template: `
    <!-- Template Debugger -->
    <plh-template-debugger
      *ngIf="parent && parent.debugMode"
      [row]="_row"
      [parent]="parent"
    ></plh-template-debugger>

    <!-- Injected template component -->
    <ng-template plhTemplateComponentHost></ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./template-component.scss"],
})
export class TemplateComponent implements OnInit, AfterContentInit, ITemplateRowProps {
  /**
   * Specific data used in component rendering
   * when updated from parent changes will automatically propogate to child
   */
  // @Input()
  _row: FlowTypes.TemplateRow;
  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    if (this.componentRef) {
      log("[Component Update]", row.name, row);
      this.componentRef.setInput("row", row);
      this.hackForceReprocessNestedTemplate();
    } else {
      log("[Component Create]", row.name, row);
    }
  }

  /** reference to parent template container */
  @Input() parent: TemplateContainerComponent;

  // Add bindings to track key data attributes on the component itself, e.g.
  // <plh-template-component data-name="number_selector_6" data-type="number_selector">
  @HostBinding("attr.data-hidden") get getAttrHidden() {
    return this._row && this._row.hidden ? true : false; // explictly state for all components to allow css selection
  }
  @HostBinding("attr.data-name") get getComponentName() {
    return this._row?.name || null;
  }
  @HostBinding("attr.data-type") get getComponentType() {
    return this._row?.type || null;
  }
  @HostBinding("attr.has-child-rows") get getChildRows() {
    return this._row?.rows ? "true" : null;
  }

  private componentRef: ComponentRef<TemplateContainerComponent | ITemplateRowProps>;

  styles: { [name: string]: any } = {};

  @ViewChild(TmplCompHostDirective, { static: true }) tmplComponentHost: TmplCompHostDirective;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.renderRow(this._row);
  }
  ngAfterContentInit() {
    if (this._row.style_list) {
      this.setStyleList();
    }
  }

  /**
   * apply any hard-coded styles from template sheet
   * TODO - CC 2021-01-18 - to be reviewed given that often styles need to be applied to
   * child elements and not main container (e.g. display group has custom override method)
   * */
  private setStyleList() {
    const styles = this._row.style_list || [];
    styles.forEach((style) => {
      const [key, value] = style.split(":");
      this.elRef.nativeElement.style.setProperty(key, value);
    });
  }

  private renderRow(row: FlowTypes.TemplateRow) {
    // console.log(`[${row.name}]`, "render row");
    // Depending on row type, either prepare instantiation of a nested template or a display component
    switch (row.type) {
      case "template":
        return this.renderTemplateComponent(row);
      default:
        const displayComponent = TEMPLATE_COMPONENT_MAPPING[row.type];
        if (displayComponent) {
          this.renderDisplayComponent(displayComponent, row);
        } else {
          // not all components have mapping, for now just log warning
          if (displayComponent === undefined) {
            // console.warn(`[tmpl.component] - skipped [${row.type}:${row.name}]`, row);
          }
        }
    }
  }

  /** Create and render a nested template component */
  private renderTemplateComponent(row: FlowTypes.TemplateRow) {
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(TemplateContainerComponent);
    // assign input variables (note template name taken from the row's value column)
    componentRef.instance.parent = this.parent;
    componentRef.setInput("row", row);
    componentRef.instance.name = row.name;
    // assign templatename input using signal
    componentRef.setInput("templatename", row.value);
    this.componentRef = componentRef;
  }

  /** Create and render a common display component */
  private renderDisplayComponent(component: Type<ITemplateRowProps>, row: FlowTypes.TemplateRow) {
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(component);
    // assign input variables
    componentRef.instance.parent = this.parent;
    componentRef.instance.row = row;
    this.componentRef = componentRef;
  }

  /**
   * If the current template is generated as a child of data_items then updates to
   * parent variables will not propagate down. Force reprocessing to workaround
   * See issue https://github.com/IDEMSInternational/open-app-builder/issues/2636
   */
  private async hackForceReprocessNestedTemplate() {
    if (this._row.type === "template") {
      const componentRef = this.componentRef as ComponentRef<TemplateContainerComponent>;
      if (componentRef.instance.parent) {
        // HACK - when a parent updates there may be cases when the updated variables need to be
        // reflected in the child template (e.g. set_nested_variable contains parent local variable)
        // As it is not currently easy to isolate this case, fully recreate any child template when
        // the parent template updates
        if (componentRef.instance.templatename() !== this._row.value) {
          this.componentRef.destroy();
          this.renderTemplateComponent(this._row);
          // TODO - test better ways to manage from container, confirming test cases from
          // https://github.com/IDEMSInternational/open-app-builder/issues/2636
        }
      }
    }
  }
}
