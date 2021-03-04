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
import { FlowTypes } from "src/app/shared/model/flowTypes";

export interface ITemplateComponent {
  row?: FlowTypes.TemplateRow;
  rows?: FlowTypes.TemplateRow[];
  localVariables?: { [name: string]: any };
  template?: FlowTypes.Template;
  parent?: { name: string; component: ITemplateComponent };
}

@Directive({
  selector: "[plhTemplateComponentHost]",
})
export class TmplCompHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: "plh-tmpl-comp",
  template: `
    <div class="plh-tmpl-comp" [hidden]="hidden">
      <ng-template plhTemplateComponentHost></ng-template>
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplComponent implements OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() parent: { name: string; component: ITemplateComponent };
  @Input() localVariables: { [name: string]: any };

  @ViewChild(TmplCompHostDirective, { static: true }) tmplComponentHost: TmplCompHostDirective;

  hidden = false;

  componentRef: ComponentRef<ITemplateComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private contactFieldService: ContactFieldService
  ) {}

  stringify(obj) {
    return JSON.stringify(obj);
  }

  ngOnInit() {
    const row = this.row;
    const parent = this.parent;
    const localVariables = this.localVariables;
    let type = row.type;
    let templateComponent = TEMPLATE_COMPONENT_MAPPING[type];
    if (templateComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        templateComponent
      );
      const viewContainerRef = this.tmplComponentHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent<ITemplateComponent>(componentFactory);
      if (type === "template") {
        // handle recursive template
        componentRef.instance.rows = row.rows;
        componentRef.instance.parent = parent;
      } else {
        // handle display components
        componentRef.instance.row = row;
        componentRef.instance.localVariables = localVariables;
      }
    } else {
      console.log("[tmpl.component] - skipped type", this.row);
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

const TEMPLATE_COMPONENT_MAPPING: Record<FlowTypes.TemplateRowType, Type<ITemplateComponent>> = {
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
