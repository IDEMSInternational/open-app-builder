import { Component, computed } from "@angular/core";
import { defineAuthorParameterSchema, RowBaseComponent } from "../../row-base.component";
import { NgStyle } from "@angular/common";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  style: coerce.string(""),
  text_align: coerce.allowedValues(["", "start", "end", "left", "right", "center", "justify"], ""),
  type: coerce.string("marked"),
}));

@Component({
  selector: "oab-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"],
  imports: [
    NgStyle,
    TemplatePipesModule, // todo: make pipes standalone
  ],
})
export class TextComponent extends RowBaseComponent(AuthorSchema) {
  public hasTextValue = computed(
    () => !["undefined", "NaN", "null", '""'].includes(this.row().value as string)
  );
}
