import {
  Directive,
  ViewContainerRef,
  Component,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  Type,
  OnInit,
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
    <div class="plh-tmpl-comp" [attr.data-hidden]="row.hidden" [attr.data-debug]="parent.debugMode">
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
})
export class TemplateComponent implements OnInit, ITemplateRowProps {
  /**
   * Specific data used in component rendering
   * when updated from parent changes will automatically propogate to child
   */
  @Input() row: FlowTypes.TemplateRow;
  /** reference to parent template container */
  @Input() parent: TemplateContainerComponent;

  @ViewChild(TmplCompHostDirective, { static: true }) tmplComponentHost: TmplCompHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.renderRow(this.row);
  }

  private renderRow(row: FlowTypes.TemplateRow) {
    // console.log(`[${this.row.name}]`, "render row");
    // Depending on row type, either prepare instantiation of a nested template or a display component
    switch (row.type) {
      case "template":
        return this.renderTemplateComponent(TemplateContainerComponent);
      default:
        const displayComponent = TEMPLATE_COMPONENT_MAPPING[row.type];
        if (displayComponent) {
          this.renderDisplayComponent(displayComponent);
        } else {
          // not all components have mapping, for now just log warning
          console.warn("[tmpl.component] - skipped type", row);
        }
    }
  }

  /** Create and render a nested template component */
  private renderTemplateComponent(component: typeof TemplateContainerComponent) {
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = viewContainerRef.createComponent(factory);
    // assign input variables (note template name taken from the row's value column)
    componentRef.instance.row = this.row;
    componentRef.instance.parent = this.parent;
    componentRef.instance.name = this.row.name;
    componentRef.instance.templatename = this.row.value;
  }

  /** Create and render a common display component */
  private renderDisplayComponent(component: Type<ITemplateRowProps>) {
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    const factory = this.componentFactoryResolver.resolveComponentFactory<ITemplateRowProps>(
      component
    );
    const componentRef = viewContainerRef.createComponent(factory);
    // assign input variables
    componentRef.instance.parent = this.parent;
    componentRef.instance.row = this.row;
  }
}
