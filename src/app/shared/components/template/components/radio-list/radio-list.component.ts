import { Component } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { IAnswerListItem } from "../../../../utils";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  answer_list: coerce.objectArray<IAnswerListItem>([
    { name: null, text: null, image: null, image_checked: null },
  ]),
}));

@Component({
  selector: "plh-radio-list",
  templateUrl: "./radio-list.component.html",
  styleUrls: ["./radio-list.component.scss"],
})
export class TmplRadioListComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  public async handleItemClick(value: string) {
    await this.setValue(value);
  }
}
