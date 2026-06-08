import { Component, computed, forwardRef } from "@angular/core";
import { defineAuthorParameterSchema, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  index: coerce.string(""),
}));

@Component({
  selector: "oab-loop",
  templateUrl: "./loop.component.html",
  styleUrls: ["./loop.component.scss"],
  imports: [forwardRef(() => RowListComponent)],
})
export class LoopComponent extends RowBaseComponent(AuthorSchema) {
  public rows = computed(() => this.row().rows || []);
  public index = computed(() => this.params().index);
  public hasCustomIndex = computed(() => !!this.params().index);

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
