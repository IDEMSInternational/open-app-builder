import { Component } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { AuthService } from "src/app/shared/services/auth/auth.service";
@Component({
  selector: "tmpl-button-apple-sign-in",
  templateUrl: "./button-apple-sign-in.component.html",
  styleUrls: ["./button-apple-sign-in.component.scss"],
  standalone: false,
})
export class TmplButtonAppleSignInComponent extends TemplateBaseComponent {
  // The button text is set as row value directly in the HTML template

  constructor(private authService: AuthService) {
    super();
  }

  public async handleClick() {
    await this.authService.provider.signInWithApple();
    this.triggerActions("click");
  }
}
