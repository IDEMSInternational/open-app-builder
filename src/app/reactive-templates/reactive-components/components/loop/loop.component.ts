import {
  Component,
  ComponentRef,
  computed,
  EnvironmentInjector,
  forwardRef,
  inject,
  OnDestroy,
} from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";
import {
  IAction,
  IActionParameter,
  isAction,
} from "src/app/reactive-templates/services/action.registry";
import { REACTIVE_COMPONENT_MAP } from "..";
import { createReactiveComponentRef, destroyComponentRefs } from "../../reactive-component-host";

const parameters = () =>
  defineParameters({
    index: new Parameter<string | null>("index", null),
  });

@Component({
  selector: "oab-loop",
  templateUrl: "./loop.component.html",
  styleUrls: ["./loop.component.scss"],
  imports: [forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class LoopComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements IAction, OnDestroy
{
  public rows = computed(() => this.row().rows || []);
  public index = this.params.index.value;
  public hasCustomIndex = computed(() => this.params.index.value() !== null);
  private injector = inject(EnvironmentInjector);

  constructor() {
    super();
    // override the default value type to "script" since loop expressions are typically JavaScript expressions that return arrays
    this.params.valueType.setValue("script");
  }

  private readonly componentRefs: ComponentRef<any>[] = [];

  public getLoopIndex(item: any, index: number): any {
    const customIndex = this.index();
    return customIndex !== null ? item[customIndex] : index;
  }

  public getName(item: any, index: number): string {
    return `${this.name()}.${this.getLoopIndex(item, index)}`;
  }

  public async execute(params?: IActionParameter[]): Promise<void> {
    destroyComponentRefs(this.componentRefs);
    await this.storeValue();
    for (const item of this.value() ?? []) {
      for (const row of this.row().rows ?? []) {
        const componentType = (REACTIVE_COMPONENT_MAP as any)[row.type];
        const componentRef = createReactiveComponentRef(
          componentType,
          this.injector,
          row,
          this.getName(item, 0)
        );
        this.componentRefs.push(componentRef);

        const instance = componentRef.instance;
        const condition = row.condition
          ? this.evaluationService.evaluateExpression(
              row.condition,
              this.getName(item, 0),
              "script"
            )
          : true;

        if (isAction(instance) && condition) {
          instance.init();
          if (instance.condition()) {
            await instance.execute(params);
          }
        }
      }
    }
  }

  /**
   * After storing the updated loop value, re-evaluate all child rows so that
   * expressions using @item / @index tokens reflect the latest item data.
   * Child rows have no @local.xxx dependency on the loop variable, so they
   * can't subscribe themselves — the loop component pushes the update instead.
   */
  protected override async storeValue(): Promise<void> {
    await super.storeValue();
    const prefix = `${this.name()}.`;
    this.rowRegistry
      .getAllNames()
      .filter((name) => name.startsWith(prefix))
      .forEach((name) => {
        const row = this.rowRegistry.get(name);
        row.setExpression(row.row().value);
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    destroyComponentRefs(this.componentRefs);
  }
}
