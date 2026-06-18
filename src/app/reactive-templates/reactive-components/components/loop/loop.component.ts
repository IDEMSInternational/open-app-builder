import { Component, computed, forwardRef } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";

const parameters = () =>
  defineParameters({
    index: new Parameter<string>("index", null),
  });

@Component({
  selector: "oab-loop",
  templateUrl: "./loop.component.html",
  styleUrls: ["./loop.component.scss"],
  imports: [forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class LoopComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public rows = computed(() => this.row().rows || []);
  public index = this.params.index.value;
  public hasCustomIndex = computed(() => this.params.index.value() !== null);

  public getLoopIndex(item: any, index: number): any {
    return this.hasCustomIndex() ? item[this.index()] : index;
  }

  public getName(item: any, index: number): string {
    return `${this.name()}.${this.getLoopIndex(item, index)}`;
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
}
