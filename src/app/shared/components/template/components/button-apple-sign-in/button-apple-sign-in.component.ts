import { Component, computed } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FlowTypes } from "packages/data-models";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IButtonAppleSignInComponentParams {
  variant: null | "native_apple";
  disabled: boolean;
  style: "width_full" | "width_content";
}

@Component({
  selector: "tmpl-button-apple-sign-in",
  templateUrl: "./button-apple-sign-in.component.html",
  styleUrls: ["./button-apple-sign-in.component.scss"],
  standalone: false,
})
export class TmplButtonAppleSignInComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));
  // The button text is set as row value directly in the HTML template

  constructor(private authService: AuthService) {
    super();
  }

  public async handleClick() {
    await this.authService.signIn("apple.com");
    this.triggerActions("click");
  }

  private getParams(
    authorParams: FlowTypes.TemplateRow["parameter_list"]
  ): IButtonAppleSignInComponentParams {
    return {
      variant: getStringParamFromTemplateRow(this._row, "variant", null),
      disabled: getBooleanParamFromTemplateRow(this._row, "disabled", false),
      style: getStringParamFromTemplateRow(this._row, "style", "width_full"),
    } as IButtonAppleSignInComponentParams;
  }
}
