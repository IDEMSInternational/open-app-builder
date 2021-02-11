import { Directive, OnChanges, ViewContainerRef } from "@angular/core";
import { Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild } from '@angular/core';
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

export const TEMPLATE_COMPONENT_MAPPING: Record<FlowTypes.TemplateRowType, Type<any>> = {
  text: TmplTextComponent,
  title: TmplTextComponent,
  animated_section_group: AnimatedSectionGroupComponent,
  display_group_group: TmplDisplayGroupComponent,
  audio: TmplAudioComponent,
  button: TmplButtonComponent,
  image: TmplImageComponent,
  set_variable: TmplSetVariableComponent,
  template_group: TmplTemplateGroupComponent,
  video: TmplVideoComponent
};

@Directive({
  selector: "[plhTemplateComponentHost]",
})
export class TmplCompHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'plh-tmpl-comp-host',
  template: `
    <div class="plh-tmpl-comp" [hidden]="hidden">
      <ng-template plhTemplateComponentHost></ng-template>
    </div>
  `,
  styleUrls: ['./tmpl-components-common.scss'],
})
export class TmplCompHost implements OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @ViewChild(TmplCompHostDirective, { static: true }) flowComponentHost: TmplCompHostDirective;
  hidden = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private contactFieldService: ContactFieldService) { }
  ngOnInit() {
    if (this.row && TEMPLATE_COMPONENT_MAPPING[this.row.type]) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        TEMPLATE_COMPONENT_MAPPING[this.row.type]
      );
      const viewContainerRef = this.flowComponentHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent<any>(componentFactory);
      componentRef.instance.row = this.row;
      componentRef.instance.template = this.template;
    }
    this.evaluateBooleanExpression(this.row.hidden).then((hidden) => {
      this.hidden = hidden;
    });
    this.template.$local_variables.subscribe(() => {
      this.evaluateBooleanExpression(this.row.hidden).then((hidden) => {
        this.hidden = hidden;
      });
    });
  }

  async evaluateBooleanExpression(expression: string | boolean) {
    if (typeof expression === "boolean") {
      return expression;
    }
    const parsed = this.parseMessageTemplate(expression);
    return parsed.trim().toLowerCase() === "true";
  }

  parseMessageTemplate = (template: string) => {
    console.log("template", template);
    let output: string = "" + template;

    let regexResult: RegExpExecArray;
    // Match Rapid Pro Contact fixed variables
    let atVaraibleRegex = /@([a-z]+)\.([0-9a-zA-Z\_]+)([\.]*[0-9a-zA-Z\_]*)/gm;
    while ((regexResult = atVaraibleRegex.exec(template)) !== null) {
      let fullMatch = regexResult[0];
      let variableType = regexResult[1];
      let fieldName = regexResult[2];
      let subfieldName = regexResult[3] ? regexResult[3].substring(1) : null;
      switch (variableType) {
        case "local": {
          const vars = this.template.$local_variables.getValue();
          output = output.replace(fullMatch, vars[fieldName]);
        }
        case "fields": {
          output = output.replace(fullMatch, "contact fields not supported yet");
          break;
        }
      }
    }

    return output;
  };

}