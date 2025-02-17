import { Component } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { AuthService } from "src/app/shared/services/auth/auth.service";
@Component({
  selector: "tmpl-button-google-sign-in",
  templateUrl: "./button-google-sign-in.component.html",
  styleUrls: ["./button-google-sign-in.component.scss"],
})
export class TmplButtonGoogleSignInComponent extends TemplateBaseComponent {
  // The button text is set as row value directly in the HTML template

  constructor(private authService: AuthService) {
    super();
  }

  public async handleClick() {
    await this.authService.provider.signInWithGoogle();
    this.triggerActions("click");
  }
}
