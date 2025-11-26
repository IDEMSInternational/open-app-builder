import { Component } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

interface INavigationBarButton {
  image: string | null;
  name?: string | null;
  target_template: string | null;
  text?: string | null;
}

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  button_list: coerce.objectArray<INavigationBarButton>([
    { image: null, name: null, target_template: null, text: null },
  ]),
  variant: coerce.allowedValues(["text_primary_contrast", "text_primary"], "text_primary_contrast"),
}));

@Component({
  selector: "plh-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class TmplNavigationBarComponent extends TemplateBaseComponentWithParams(AuthorSchema) {}
