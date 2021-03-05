import {
  ComponentRef,
  Directive,
  ViewContainerRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  Type,
} from "@angular/core";
import { TEMPLATE_COMPONENT_MAPPING } from "./components";
import { FlowTypes, ITemplateContainerProps, ITemplateRowProps } from "./models";
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
    <div class="plh-tmpl-comp" [hidden]="hidden" [attr.data-type]="row.type">
      <details *ngIf="debug && row.type !== 'template'" class="debug-container">
        <summary>Row: {{ row.type }}</summary>
        <p>type: {{ row.type }}</p>
        <p *ngIf="row.name">name: {{ row.name }}</p>
        <p *ngIf="row.value">value: {{ row.value }}</p>
        <p *ngIf="row.rows">child rows: {{ row.rows | json }}</p>
      </details>
      <ng-template plhTemplateComponentHost></ng-template>
    </div>
  `,
  styleUrls: ["./components/tmpl-components-common.scss"],
})
export class TemplateComponent implements OnInit, ITemplateRowProps {
  // TODO - possibly row and localvariables can be omitted and passed directly from parent (??)
  // TODO - otherwise will require change detection and updating
  /** specific data used in component rendering */
  @Input() row: FlowTypes.TemplateRow;
  /** compiled list of variables used across all template rows */
  @Input() localVariables: { [name: string]: any };
  /** reference to parent template container */
  @Input() parent: TemplateContainerComponent;

  @ViewChild(TmplCompHostDirective, { static: true }) tmplComponentHost: TmplCompHostDirective;

  hidden = false;
  debug = true;

  componentRef: ComponentRef<ITemplateRowProps | ITemplateContainerProps>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.renderRow(this.row);
  }

  private renderRow(row: FlowTypes.TemplateRow) {
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
    componentRef.instance.parent = this.parent;
    componentRef.instance.name = this.row.value;
  }

  /** Create and render a common display component */
  private renderDisplayComponent(component: Type<ITemplateRowProps>) {
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    const factory = this.componentFactoryResolver.resolveComponentFactory<ITemplateRowProps>(
      component
    );
    const componentRef = viewContainerRef.createComponent(factory);
    // assign input variables
    componentRef.instance.row = this.row;
    componentRef.instance.parent = this.parent;
    componentRef.instance.localVariables = this.localVariables;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.componentRef) {
  //     this.componentRef.instance.row = this.row;
  //     // this.componentRef.instance.template = this.template;
  //     // this.componentRef.instance.localVariables = this.localVariables;
  //   }
  //   if (this.row) {
  //     if (typeof this.row.hidden === "string") {
  //       this.hidden = this.evaluateBooleanExpression(this.row.hidden);
  //     } else {
  //       this.hidden = this.row.hidden;
  //     }
  //   }
  // }

  private evaluateBooleanExpression(expression: string | boolean): boolean {
    if (typeof expression === "boolean") {
      return expression;
    }
    const result = this.evalJSExpression(expression);
    if (result === true || result === "true") {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Create a dynamic function to parse the calculation expression without
   * the nees for `eval()` operator
   */
  private evalJSExpression(str: string) {
    try {
      const args = "__local, str";
      const body = `'use strict'; return (${str.replace(/@local\./g, "__local.")})`;
      const result = new Function(args, body).apply(null, [this.localVariables, str]);
      console.log(body, "evals to ", result);
      return result;
    } catch (ex) {
      console.log("Error ? ", ex);
      return str;
    }
  }
}
