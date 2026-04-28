import { Component } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { AuthService } from "src/app/shared/services/auth/auth.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Native rendering variant for Google Sign In button. */
  variant: coerce.allowedValues([null, "native_google"], null),
  /** When true, the button is disabled. */
  disabled: coerce.boolean(false),
  /** Button width style variant. */
  style: coerce.allowedValues(["width_full", "width_content"], "width_full"),
}));

@Component({
  selector: "tmpl-button-google-sign-in",
  templateUrl: "./button-google-sign-in.component.html",
  styleUrls: ["./button-google-sign-in.component.scss"],
  standalone: false,
})
export class TmplButtonGoogleSignInComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  // The button text is set as row value directly in the HTML template

  constructor(private authService: AuthService) {
    super();
  }

  public async handleClick() {
    await this.authService.signIn("google.com");
    this.triggerActions("click");
  }
}
