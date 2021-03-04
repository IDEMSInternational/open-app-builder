import {
  ComponentRef,
  Directive,
  ViewContainerRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Type,
  ViewChild,
} from "@angular/core";
import { ContactFieldService } from "src/app/feature/chat/services/offline/contact-field.service";
import { FlowTypes, ITemplateContainerProps, ITemplateRowProps } from "../models";

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
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TemplateComponent implements OnInit, ITemplateRowProps {
  /** specific data used in component rendering */
  @Input() row: FlowTypes.TemplateRow;
  /** compiled list of variables used across all template rows */
  @Input() localVariables: { [name: string]: any };
  /** reference to parent template container */
  @Input() parent: { name: string; component: TemplateContainerComponent };

  @ViewChild(TmplCompHostDirective, { static: true }) tmplComponentHost: TmplCompHostDirective;

  hidden = false;
  debug = true;

  componentRef: ComponentRef<ITemplateRowProps | ITemplateContainerProps>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const { localVariables, parent, row } = this;
    const type = row.type;
    const viewContainerRef = this.tmplComponentHost.viewContainerRef;
    viewContainerRef.clear();
    // handle recursive template
    if (type === "template") {
      const component = TemplateContainerComponent;
      const factory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = viewContainerRef.createComponent(factory);
      componentRef.instance.parent = parent;
      componentRef.instance.name = row.value;
      // handle display component template
    } else {
      const component = TEMPLATE_COMPONENT_MAPPING[type];
      if (component) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef = viewContainerRef.createComponent<ITemplateRowProps>(factory);
        // handle display components
        componentRef.instance.row = row;
        componentRef.instance.localVariables = localVariables;
      } else {
        console.log("[tmpl.component] - skipped type", row);
      }
    }
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

/***************************************************************************************
 * Template component mapping
 **************************************************************************************/

import { AnimatedSectionGroupComponent } from "./animated_section_group";
import { TmplAudioComponent } from "./audio";
import { TmplButtonComponent } from "./button";
import { TmplDisplayGroupComponent } from "./display_group";
import { TmplImageComponent } from "./image";
import { TmplTemplateGroupComponent } from "./template_group";
import { TmplTextComponent } from "./text";
import { TmplVideoComponent } from "./video";
import { AnimatedSectionComponent } from "./animated_section";
import { TmplSliderComponent } from "./slider";
import { TmplTimerComponent } from "./timer";
import { NavGroupComponent } from "./nav_group";
import { TemplateContainerComponent } from "../template-container.component";

const TEMPLATE_COMPONENT_MAPPING: Record<FlowTypes.TemplateRowType, Type<ITemplateRowProps>> = {
  text: TmplTextComponent,
  title: TmplTextComponent,
  animated_section_group: AnimatedSectionGroupComponent,
  animated_section: AnimatedSectionComponent,
  display_group: TmplDisplayGroupComponent,
  audio: TmplAudioComponent,
  button: TmplButtonComponent,
  image: TmplImageComponent,
  // set variable and nested properties are handled by parent
  set_variable: null as any,
  nested_properties: null as any,
  display_theme: null as any,
  template: TemplateContainerComponent as any,
  template_group: TmplTemplateGroupComponent,
  video: TmplVideoComponent,
  slider: TmplSliderComponent,
  timer: TmplTimerComponent,
  nav_group: NavGroupComponent,
  nav_section: AnimatedSectionComponent,
};
