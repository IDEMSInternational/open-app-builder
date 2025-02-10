import { Component, Input } from "@angular/core";

@Component({
  selector: "tmpl-button-google-sign-in",
  templateUrl: "./button-google-sign-in.component.html",
  styleUrls: ["./button-google-sign-in.component.scss"],
})
export class TmplButtonGoogleSignInComponent {
  @Input() value: any;
}
