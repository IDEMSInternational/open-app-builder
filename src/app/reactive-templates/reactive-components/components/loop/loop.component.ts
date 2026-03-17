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
}
