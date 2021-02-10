import { Directive, ViewContainerRef } from "@angular/core";
import { Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild } from '@angular/core';
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
  template: `<ng-template plhTemplateComponentHost></ng-template> `,
  styleUrls: ['./tmpl-components-common.scss'],
})
export class TmplCompHost implements OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @ViewChild(TmplCompHostDirective, { static: true })
  flowComponentHost: TmplCompHostDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
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
  }

}