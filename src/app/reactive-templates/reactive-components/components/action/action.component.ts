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
  IActionParameter,
  isAction,
} from "src/app/reactive-templates/services/action.registry";
import { REACTIVE_COMPONENT_MAP } from "..";
import { SetVariableComponent } from "../set-variable/set-variable.component";

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

  /** Holds a dictionary of 'set_variable' type rows keyed by their name */
  private readonly setVariableRows = new Map<string, SetVariableComponent>();

  private readonly componentRefs: ComponentRef<any>[] = [];

  public actionParameters(): IActionParameter[] {
    return Array.from(this.setVariableRows.values()).map((row) => {
      const templateRow = row.row();
      return {
        name: templateRow.name,
        value: templateRow.value,
      } as IActionParameter;
    });
  }

  public async execute(params?: IActionParameter[]): Promise<void> {
    const name = this.name();
    const expression = this.expression();
    const value = this.value();

    // Any row with a name that matches a param should be updated with the param value
    for (const param of params ?? []) {
      const row = this.setVariableRows.get(param.name);
      if (row) {
        row.setExpression(param.value);
      }
    }

    // Params passed to execute() override this action's setVariableRow values where names match
    const mergedParams = this.actionParameters().map((p) => {
      const param = params?.find((i) => i.name === p.name);
      return param ? { ...p, value: param.value } : p;
    });

    // if this is a reference to another action, execute that instead
    if (expression && expression !== name) {
      if (this.actionRegistry.has(value)) {
        const action = this.actionRegistry.get(value);
        await action.execute(mergedParams);
        return; // this action should not define any actions of its own, but removing this return would enable that.
      } else {
        console.error(`[ACTION] No action registered with name: ${expression}`);
        return;
      }
    }

    for (const action of this.actions.values()) {
      await action.execute(mergedParams);
    }
  }

  /** ngOnInit lifecycle hook will only be executed when the action is used as a top-level component */
  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    super.init();

    // An action's expression should be its own name if not already set.
    // e.g it will execute itself by default otherwise it's a reference to another action.
    if (!this.expression()) {
      this.setExpression(this.name());
    }

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

        if (row.type === "set_variable") {
          this.setVariableRows.set(row.name, instance as SetVariableComponent);
        }

        if (isAction(instance)) {
          // Action components need to be manually initialised as ngOnInit is not called automatically
          if (instance instanceof ActionComponent) {
            instance.init();
          }

          this.actions.set(instance.name(), instance);
        }
      }
    }

    this.actionRegistry.register(this);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.actionRegistry.unregister(this.name());
    this.componentRefs.forEach((ref) => ref.destroy());
  }
}
