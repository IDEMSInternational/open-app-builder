import {
  Directive,
  ViewContainerRef,
  Component,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  Type,
  OnInit,
  ElementRef,
  AfterContentInit,
  ViewEncapsulation,
  HostBinding,
} from "@angular/core";
import { TEMPLATE_COMPONENT_MAPPING } from "./components";
import { FlowTypes, ITemplateRowProps } from "./models";
import { TemplateContainerComponent } from "./template-container.component";

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
    <div
      class="plh-tmpl-comp"
      [attr.data-hidden]="row.hidden"
      [attr.data-debug]="parent.debugMode"
      [ngClass]="{ disabled: row.disabled }"
      [attr.data-rowname]="row.name"
    >
      <!-- Template Debugger -->
      <plh-template-debugger
        *ngIf="parent.debugMode"
        [row]="row"
        [parent]="parent"
      ></plh-template-debugger>
      <!-- Injected template component -->
      <ng-template plhTemplateComponentHost></ng-template>
    </div>
  `,
  styleUrls: ["./components/tmpl-components-common.scss", "./template-container.component.scss"],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      :host :nth-child(1n) {
        width: 100%;
      }
    `,
  ],
})
export class TemplateComponent implements OnInit, AfterContentInit, ITemplateRowProps {
  /**
   * Specific data used in component rendering
   * when updated from parent changes will automatically propogate to child
   */
  @Input() row: FlowTypes.TemplateRow;

  /** reference to parent template container */
  @Input() parent: TemplateContainerComponent;

  @HostBinding("attr.data-hidden") get getAttrHidden() {
    return this.row && this.row.hidden;
  }
  @HostBinding("attr.data-debug-hidden") get getAttrDat() {
    return this.parent && this.parent.debugMode;
  }

  styles: { [name: string]: any } = {};

  @ViewChild(TmplCompHostDirective, { static: true }) tmplComponentHost: TmplCompHostDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.renderRow(this.row);
  }

  ngAfterContentInit() {
    this.setStyleList();
  }

  private renderRow(row: FlowTypes.TemplateRow) {
    // console.log(`[${row.name}]`, "render row");
    // Depending on row type, either prepare instantiation of a nested template or a display component
    switch (row.type) {
      case "template":
        return this.renderTemplateComponent(TemplateContainerComponent, row);
      default:
        const displayComponent = TEMPLATE_COMPONENT_MAPPING[row.type];
        if (displayComponent) {
          this.renderDisplayComponent(displayComponent, row);
        } else {
          // not all components have mapping, for now just log warning
          console.warn("[tmpl.component] - skipped type", row);
        }
    }
  }

  /**
   * CC  2021-04-18
   * TODO - this code looks pretty long and specific, so likely best reviewed
   * and moved into own service
   * Also assume more could be handle with stylesheets instead of specific style
   */
  private setStyleList() {
    const styles = {};
    if (this.row.style_list) {
      for (let i = 0; i < this.row.style_list.length; i++) {
        let splited = this.row.style_list[i].split(":");
        styles[splited[0]] = splited[1];
        this.elRef.nativeElement.style.setProperty(splited[0], splited[1]);
      }
    }
    if (
      this.row.parameter_list &&
      this.row.parameter_list["style"] === "navigation" &&
      this.row.type === "display_group"
    ) {
      this.elRef.nativeElement.style.setProperty("display", "flex");
      this.elRef.nativeElement.style.setProperty("height", "100%");
      this.elRef.nativeElement.style.setProperty("align-items", "flex-end");
      let el_component = this.elRef.nativeElement.parentElement.closest("plh-template-component");
      let el_container = this.elRef.nativeElement.parentElement.closest("plh-template-container");
      while (el_component && el_container) {
        try {
          if (el_component) {
            el_component.style.setProperty("height", "100%");
            el_component.style.setProperty("display", "flex");
            el_component.style.setProperty("align-items", "flex-end");
          }

          if (el_container) {
            el_container.style.setProperty("height", "100%");
            el_container.style.setProperty("display", "flex");
            el_container.style.setProperty("align-items", "flex-end");

            el_component = el_container.parentElement.closest("plh-template-component");
          }

          if (el_component) {
            el_container = el_component.parentElement.closest("plh-template-container");
          }
        } catch (ex) {
          console.error("navigation style settings exception");
          console.error(ex);
        }
      }
    }
    if (this.row.type === "button") {
      this.elRef.nativeElement.style.setProperty("align-self", "normal");
    }
  }

  /** Create and render a nested template component */
  private renderTemplateComponent(
    component: typeof TemplateContainerComponent,
    row: FlowTypes.TemplateRow
  ) {
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = viewContainerRef.createComponent(factory);
    // assign input variables (note template name taken from the row's value column)
    componentRef.instance.row = row;
    componentRef.instance.parent = this.parent;
    componentRef.instance.name = row.name;
    componentRef.instance.templatename = row.value;
  }

  /** Create and render a common display component */
  private renderDisplayComponent(component: Type<ITemplateRowProps>, row: FlowTypes.TemplateRow) {
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    const factory = this.componentFactoryResolver.resolveComponentFactory<ITemplateRowProps>(
      component
    );
    const componentRef = viewContainerRef.createComponent(factory);
    // assign input variables
    componentRef.instance.parent = this.parent;
    componentRef.instance.row = row;
  }
}
