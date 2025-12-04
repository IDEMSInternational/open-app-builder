import {
  Component,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { ActionRegistry, IAction } from "src/app/reactive-templates/services/action.registry";
import { REACTIVE_COMPONENT_MAP } from "..";

const parameters = () =>
  defineParameters({
    index: new Parameter<string>("index", null),
  });

@Component({
  selector: "oab-action",
  template: "", // no template needed
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class ActionComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements OnInit, OnDestroy, IAction
{
  private actionRegistry = inject(ActionRegistry);
  private injector = inject(EnvironmentInjector);

  private readonly actions = new Map<string, IAction>();
  private readonly componentRefs: ComponentRef<any>[] = [];

  public execute(): void {
    alert(`Executing action: ${this.name()}`);
    for (const action of this.actions.values()) {
      action.execute();
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.actionRegistry.register(this);
    this.setExpression(this.name()); // An action's expression should be it's name

    for (const row of this.row().rows) {
      const componentType = (REACTIVE_COMPONENT_MAP as any)[row.type];

      if (componentType) {
        const componentRef = createComponent(componentType, {
          environmentInjector: this.injector,
        });
        componentRef.setInput("row", row);
        componentRef.setInput("namespace", this.namespace());
        componentRef.changeDetectorRef.detectChanges();

        this.componentRefs.push(componentRef);

        const instance = componentRef.instance;
        if (this.isAction(instance)) {
          this.actions.set(instance.name(), instance);
        }
      }
    }
  }

  private isAction(instance: any): instance is IAction {
    return typeof instance.execute === "function";
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.actionRegistry.unregister(this.name());
    this.componentRefs.forEach((ref) => ref.destroy());
  }
}
