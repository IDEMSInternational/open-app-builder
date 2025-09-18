import { Component, computed, OnInit, signal, Signal } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters, Parameter } from "../../parameters";
import { NgStyle } from "@angular/common";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";

const parameters = () =>
  defineParameters({
    style: new Parameter("style", ""),
    textAlign: new Parameter<"start" | "end" | "left" | "right" | "center" | "justify">(
      "text_align",
      null
    ),
    type: new Parameter("type", "marked"),
  });

@Component({
  selector: "oab-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"],
  standalone: true,
  imports: [
    NgStyle,
    TemplatePipesModule, // todo: make pipes standalone
  ],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class TextComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public hasTextValue = computed(
    () => !["undefined", "NaN", "null", '""'].includes(this.row().value as string)
  );
}
