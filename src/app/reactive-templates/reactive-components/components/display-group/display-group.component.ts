import { Component, computed, forwardRef, ViewEncapsulation } from "@angular/core";
import { RowListComponent } from "../../row-list.component";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

const parameters = () =>
  defineParameters({
    direction: new Parameter<"row" | "column">("direction", "row"),
    gap: new Parameter<string>("gap", "0"),
    align: new Parameter<"start" | "center" | "end" | "stretch">("align", "start"),
    childSizing: new Parameter<"auto" | "equal">("child_sizing", "auto"),
    justify: new Parameter<
      "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"
    >("justify", "start"),
  });

@Component({
  selector: "oab-display-group",
  templateUrl: "./display-group.component.html",
  styleUrls: ["./display-group.component.scss"],
  encapsulation: ViewEncapsulation.None,
  imports: [forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class DisplayGroupComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public rows = computed(() => this.row().rows || []);

  public align = computed(() => {
    const align = this.params.align.value();
    return align === "start" ? "flex-start" : align === "end" ? "flex-end" : align;
  });

  public justify = computed(() => {
    const justify = this.params.justify.value();
    switch (justify) {
      case "start":
        return "flex-start";
      case "center":
        return "center";
      case "end":
        return "flex-end";
      case "space-between":
        return "space-between";
      case "space-around":
        return "space-around";
      case "space-evenly":
        return "space-evenly";
      default:
        return "flex-start";
    }
  });
}
