import { ComponentRef, Directive, OnChanges, SimpleChanges, ViewContainerRef, Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild } from "@angular/core";
import { ContactFieldService } from "src/app/feature/chat/services/offline/contact-field.service";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { AnimatedSectionGroupComponent } from "./animated_section_group";
import { TmplAudioComponent } from "./audio";
import { TmplButtonComponent } from "./button";
import { TmplDisplayGroupComponent } from "./display_group";
import { TmplImageComponent } from "./image";
import { TmplSetVariableComponent } from "./set_variable";
import { TmplTemplateGroupComponent } from "./template_group";
import { TmplTextComponent } from "./text";
import { TmplVideoComponent } from "./video";
import { AnimatedSectionComponent } from "./animated_section";
import { TmplSliderComponent } from "./slider";
import { TmplTimerComponent } from "./timer";

export interface ITemplateComponent {
  template: FlowTypes.Template;
  row: FlowTypes.TemplateRow;
  localVariables: { [name: string]: any };
}

export const TEMPLATE_COMPONENT_MAPPING: Record<FlowTypes.TemplateRowType, Type<ITemplateComponent>> = {
  text: TmplTextComponent,
  title: TmplTextComponent,
  animated_section_group: AnimatedSectionGroupComponent,
  animated_section: AnimatedSectionComponent,
  display_group: TmplDisplayGroupComponent,
  audio: TmplAudioComponent,
  button: TmplButtonComponent,
  image: TmplImageComponent,
  set_variable: TmplSetVariableComponent,
  template_group: TmplTemplateGroupComponent,
  template: TmplTemplateGroupComponent,
  nested_properties: TmplSetVariableComponent,
  video: TmplVideoComponent,
  display_theme: TmplSetVariableComponent,
  slider: TmplSliderComponent,
  timer: TmplTimerComponent
};

@Directive({
  selector: "[plhTemplateComponentHost]",
})
export class TmplCompHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'plh-tmpl-comp',
  template: `
    <div class="plh-tmpl-comp" [hidden]="hidden">
      <ng-template plhTemplateComponentHost></ng-template>
    </div>
  `,
  styleUrls: ['./tmpl-components-common.scss'],
})
export class TmplComponent implements OnInit, OnChanges {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  @ViewChild(TmplCompHostDirective, { static: true }) tmplComponentHost: TmplCompHostDirective;
  hidden = false;

  componentRef: ComponentRef<ITemplateComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private contactFieldService: ContactFieldService) { }

  stringify(obj) {
    return JSON.stringify(obj);
  }

  ngOnInit() {
    if (this.row) {
      let type = TEMPLATE_COMPONENT_MAPPING[this.row.type] ? this.row.type : "set_variable";
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        TEMPLATE_COMPONENT_MAPPING[type]
      );
      const viewContainerRef = this.tmplComponentHost.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent<ITemplateComponent>(componentFactory);
      this.componentRef.instance.row = this.row;
      this.componentRef.instance.template = this.template;
      this.componentRef.instance.localVariables = this.localVariables;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.componentRef) {
      this.componentRef.instance.row = this.row;
      this.componentRef.instance.template = this.template;
      this.componentRef.instance.localVariables = this.localVariables;
    }
    if (typeof this.row.hidden === "string") {
      this.hidden = this.evaluateBooleanExpression(this.row.hidden);
    } else {
      this.hidden = this.row.hidden;
    }
  }

  evaluateBooleanExpression(expression: string | boolean): boolean {
    if (typeof expression === "boolean") {
      return expression;
    }
    const result = this.evalJSExpression(expression);
    if (result == true || result == "true") {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Create a dynamic function to parse the calculation expression without
   * the nees for `eval()` operator
   */
  evalJSExpression(str: string) {
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