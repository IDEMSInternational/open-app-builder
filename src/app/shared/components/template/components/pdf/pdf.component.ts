import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { getNumberParamFromTemplateRow } from "src/app/shared/utils";
import { Location } from "@angular/common";
import { TrustedTypesWindow } from "trusted-types";

@Component({
  selector: "plh-pdf",
  templateUrl: "./pdf.component.html",
  styleUrls: ["./pdf.component.scss"],
})
export class TmplPdfComponent extends TemplateBaseComponent implements OnInit {
  startingPage: number;

  constructor(private location: Location) {
    super();
    // name of folder pdf viewer assets copied to as declared in `angular.json`
    pdfDefaultOptions.assetsFolder = "assets/comp-pdf";
    // additional locales are currently excluded from main build
    pdfDefaultOptions.locale = "en-GB";
  }

  async ngOnInit() {
    this.getParams();
    const result = await this.needsES5();
    console.log("result:", result);
  }

  getParams() {
    this.startingPage = getNumberParamFromTemplateRow(this._row, "starting_page", 1);
  }

  private async needsES5(): Promise<boolean> {
    if (typeof window === "undefined") {
      // server-side rendering
      return false;
    }
    const isIE = !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
    const isEdge = /Edge\/\d./i.test(navigator.userAgent);
    const isIOs13OrBelow = this.iOSVersionRequiresES5();
    let needsES5 =
      typeof ReadableStream === "undefined" || typeof Promise["allSettled"] === "undefined";
    if (needsES5 || isIE || isEdge || isIOs13OrBelow) {
      return true;
    }
    return !(await this.supportsOptionalChaining());
  }

  private iOSVersionRequiresES5(): boolean {
    if (typeof window === "undefined") {
      // server-side rendering
      return false;
    }
    const match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== undefined && match !== null) {
      return parseInt(match[1], 10) < 14;
    }

    return false;
  }

  private supportsOptionalChaining(): Promise<boolean> {
    return new Promise((resolve) => {
      const support = (<any>window).supportsOptionalChaining;
      support !== undefined ? resolve(support) : resolve(this.addScriptOpChainingSupport());
    });
  }

  private addScriptOpChainingSupport(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = this.createScriptElement(
        pdfDefaultOptions.assetsFolder + "/op-chaining-support.js"
      );
      script.onload = () => {
        script.remove();
        resolve((<any>window).supportsOptionalChaining as boolean);
      };
      script.onerror = () => {
        script.remove();
        (<any>window).supportsOptionalChaining = false;
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

  private createScriptElement(sourcePath: string): HTMLScriptElement {
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    const ttWindow = window as unknown as TrustedTypesWindow;
    if (ttWindow.trustedTypes) {
      const sanitizer = ttWindow.trustedTypes.createPolicy("foo", {
        createScriptURL: (input) => input,
      });
      script.src = sanitizer.createScriptURL(this.location.normalize(sourcePath)) as any;
    } else {
      script.src = this.location.normalize(sourcePath);
    }

    return script;
  }
}
