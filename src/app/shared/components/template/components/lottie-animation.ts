import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: "plh-tmpl-lottie-animation",
  template: `
    <div class="tmpl-lottie-anim-container" [class]="style">
      <ng-lottie *ngIf="animOptions" [options]="animOptions"></ng-lottie>
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class TmplLottieAnimation extends TemplateBaseComponent implements OnInit {
  assetsPrefix = "/assets/plh_assets/";
  style: string;
  animOptions: AnimationOptions;

  constructor(private http: HttpClient) {
    super();
  }

  @Input() set row(r: FlowTypes.TemplateRow) {
    // Loop by default
    const loop = r?.parameter_list?.loop === "false" ? false : true;
    if (r.value) {
      this.http
        .get(this.assetsPrefix + r.value)
        .toPromise()
        .then(() => {
          this.animOptions = {
            path: this.assetsPrefix + r.value,
            loop: loop,
          };
        })
        .catch(() => {
          this.animOptions = {
            path: r.value.replace("//", "/"),
            loop: loop,
          };
        });
    }
  }

  ngOnInit() {
    if (this._row && this._row.parameter_list) {
      this.style = getStringParamFromTemplateRow(this._row, "style", "");
    }
  }
}
