import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "template-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class TmplSignInComponent extends TemplateBaseComponent {
  constructor(public authService: AuthService) {
    super();
  }
  // ngOnInit() {}
}
