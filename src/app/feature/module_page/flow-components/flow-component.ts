import { CommonModule } from "@angular/common";
import {
  ComponentFactoryResolver,
  Directive,
  Input,
  NgModule,
  Type,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
/*********************************************************************
 * Flow Components
 * These should also be included in module declarations at bottom
 *********************************************************************/
import {
  BeginStepFlowComponent,
  ButtonFlowComponent,
  DescriptionFlowComponent,
  EndStepFlowComponent,
  MainImageFlowComponent,
  StepIntroFlowComponent,
  StepItemFlowComponent,
  TitleFlowComponent,
} from "./components";

/*********************************************************************
 * Flow Component Mapping - Ensure that every type that can be defined
 * in a flow's row has a display component
 *********************************************************************/
type IFlowComponentMapping = { [flow_type in FlowTypes.Module_pageRow["type"]]: Type<any> };

const FLOW_COMPONENT_MAPPING: IFlowComponentMapping = {
  begin_step: BeginStepFlowComponent,
  description: DescriptionFlowComponent,
  end_step: EndStepFlowComponent,
  main_image: MainImageFlowComponent,
  step_intro: StepIntroFlowComponent,
  step_item: StepItemFlowComponent,
  title: TitleFlowComponent,
  button: ButtonFlowComponent,
};

/*********************************************************************
 *  Directive used as part of loading dynamic flow component elemnt
 *********************************************************************/
@Directive({
  selector: "[appFlowComponentHost]",
})
export class FlowComponentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
/*********************************************************************
 * Dynamic element to populate flow specific flow component
 *********************************************************************/
import { Component, OnInit } from "@angular/core";
import { FlowTypes } from "scripts/types";
@Component({
  selector: "plh-module-page-flow-component",
  template: ` <ng-template appFlowComponentHost></ng-template> `,
})
export class FlowComponent implements OnInit {
  @Input() row: FlowTypes.Module_pageRow;
  @ViewChild(FlowComponentHostDirective, { static: true })
  flowComponentHost: FlowComponentHostDirective;
  flowComponents = FLOW_COMPONENT_MAPPING;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.flowComponents[this.row.type]
    );
    const viewContainerRef = this.flowComponentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.data = this.row;
  }
}
/*********************************************************************
 *  Module export
 *********************************************************************/
const FLOW_COMPONENTS = [
  BeginStepFlowComponent,
  ButtonFlowComponent,
  DescriptionFlowComponent,
  EndStepFlowComponent,
  MainImageFlowComponent,
  StepIntroFlowComponent,
  StepItemFlowComponent,
  TitleFlowComponent,
];
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [...FLOW_COMPONENTS, FlowComponent, FlowComponentHostDirective],
  declarations: [...FLOW_COMPONENTS, FlowComponent, FlowComponentHostDirective],
})
export class ModulePageFlowComponentsModule {}
