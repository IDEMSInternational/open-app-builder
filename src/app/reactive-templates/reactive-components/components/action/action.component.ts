import {
  Component,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { defineParameters } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import {
  ActionRegistry,
  IAction,
  isAction,
} from "src/app/reactive-templates/services/action.registry";
import { REACTIVE_COMPONENT_MAP } from "..";

const parameters = () => defineParameters({});

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

  public async execute(): Promise<void> {
    for (const action of this.actions.values()) {
      // todo: pass parameters (which are any child set_variable rows?)
      await action.execute();
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.setExpression(this.name()); // An action's expression should be its name

    for (const row of this.row().rows ?? []) {
      const componentType = (REACTIVE_COMPONENT_MAP as any)[row.type];

      if (componentType) {
        const componentRef = createComponent(componentType, {
          environmentInjector: this.injector,
        });
        componentRef.setInput("row", row);
        componentRef.setInput("namespace", this.namespace());

        this.componentRefs.push(componentRef);

        const instance = componentRef.instance;
        if (isAction(instance)) {
          this.actions.set(instance.name(), instance);
        }
      }
    }

    this.actionRegistry.register(this); // todo: Maybe shouldn't register if this is a nested action?
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.actionRegistry.unregister(this.name());
    this.componentRefs.forEach((ref) => ref.destroy());
  }
}
