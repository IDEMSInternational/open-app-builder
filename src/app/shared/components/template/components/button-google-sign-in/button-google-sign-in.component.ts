import { Component, computed } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FlowTypes } from "packages/data-models";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IButtonGoogleSignInComponentParams {
  variant: null | "native_google";
  disabled: boolean;
}

@Component({
  selector: "tmpl-button-google-sign-in",
  templateUrl: "./button-google-sign-in.component.html",
  styleUrls: ["./button-google-sign-in.component.scss"],
})
export class TmplButtonGoogleSignInComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));
  // The button text is set as row value directly in the HTML template

  constructor(private authService: AuthService) {
    super();
  }

  public async handleClick() {
    await this.authService.provider.signIn("google.com");
    this.triggerActions("click");
  }

  private getParams(
    authorParams: FlowTypes.TemplateRow["parameter_list"]
  ): IButtonGoogleSignInComponentParams {
    return {
      variant: getStringParamFromTemplateRow(
        this._row,
        "variant",
        null
      ) as IButtonGoogleSignInComponentParams["variant"],
      disabled: getBooleanParamFromTemplateRow(this._row, "disabled", false),
    };
  }
}
