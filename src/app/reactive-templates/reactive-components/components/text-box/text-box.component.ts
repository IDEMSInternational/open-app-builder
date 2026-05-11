import { Component } from "@angular/core";
import { defineAuthorParameterSchema, RowBaseComponentWithParams } from "../../row-base.component";
import { IonicModule } from "@ionic/angular";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  disabled: coerce.boolean(),
  // todo: this looks like something that we could remove / replace
  number_input: coerce.boolean(),
  max_length: coerce.number(-1),
  placeholder: coerce.string(""),
  style: coerce.string(""),
  text_align: coerce.string(""),
}));

@Component({
  selector: "oab-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  imports: [IonicModule], // todo: ionic standalone does not seem to work.
})
export class TextBoxComponent extends RowBaseComponentWithParams(AuthorSchema) {
  public async handleChange(value: any) {
    this.setExpression(value);
  }
}
