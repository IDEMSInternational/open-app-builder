import { Component, computed, OnDestroy } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { IAction, IActionParameter } from "src/app/reactive-templates/services/action.registry";

const parameters = () =>
  defineParameters({
    loopIndex: new Parameter<string | null>("loop_index", null),
    loop: new Parameter<any[]>("loop", [], "script"),
    initialValue: new Parameter<any>("initial_value", null, "script"),
    operator: new Parameter<"+" | "-" | "*" | "/">("operator", "+"),
  });

@Component({
  selector: "oab-expression-builder",
  template: "",
  styleUrls: ["./expression-builder.component.scss"],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class ExpressionBuilderComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements IAction, OnDestroy
{
  public rows = computed(() => this.row().rows || []);
  public loopIndex = this.params.loopIndex.value;
  public loop = this.params.loop.value;

  public getLoopIndex(item: any, index: number): any {
    const customIndex = this.loopIndex();
    return customIndex !== null ? item[customIndex] : index;
  }

  public initialValue = this.params.initialValue.value;

  public async build(): Promise<any> {
    if (!Array.isArray(this.loop())) return "";

    let value = this.initialValue();
    let index = 0;
    const valueType = this.params.valueType.value();

    for (const item of this.loop()) {
      let context = {
        loop: {
          item,
          index: this.getLoopIndex(item, index),
          count: this.loop().length,
          first: this.loop()[0],
          last: this.loop()[this.loop().length - 1],
          is_first: index === 0,
          is_last: index === this.loop().length - 1,
        },
      };

      let operationValue = this.evaluationService.evaluateExpression(
        this.expression(),
        this.namespace(),
        valueType,
        context
      ) as any;

      switch (this.params.operator.value()) {
        case "+":
          value += operationValue;
          break;
        case "-":
          value -= operationValue;
          break;
        case "*":
          value *= operationValue;
          break;
        case "/":
          value /= operationValue;
          break;
      }

      index++;
    }
    return value;
  }

  public async postEvaluation(): Promise<any> {
    return await this.build();
  }

  public async execute(params?: IActionParameter[]): Promise<void> {
    if (this.condition()) {
      await this.storeValue();
    }
  }
}
