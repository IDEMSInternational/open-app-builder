import { AfterViewInit, Component, computed, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { PDFViewerService } from "./pdf.service";
import { toSignal } from "@angular/core/rxjs-interop";

interface IAuthorParams {
  starting_page?: string;
  /** Message displayed when legacy browser detected */
  compatibility_error_message?: string;
  /** Open external text. Default "Open with..." */
  open_external_text?: string;
}

const DEFAULT_PARAMS: IAuthorParams = {
  compatibility_error_message:
    "Embedded PDFs are not supported in this browser, please use an up-to-date version of Google Chrome to view or open in external app",
  open_external_text: "Open with...",
};

@Component({
  selector: "plh-pdf",
  templateUrl: "./pdf.component.html",
  styleUrls: ["./pdf.component.scss"],
  // Allow override of global pdf viewer styles
  encapsulation: ViewEncapsulation.None,
})
export class TmplPdfComponent extends TemplateBaseComponent implements AfterViewInit {
  public pdfSrc = computed(() => this.value());

  public params = computed(() => {
    const merged: IAuthorParams = { ...DEFAULT_PARAMS, ...this.params };
    const { compatibility_error_message, starting_page, open_external_text } = merged;
    return {
      startingPage: Number(starting_page || 1),
      compatErrorMessage: compatibility_error_message,
      openExternalText: open_external_text,
    };
  });

  public serviceReady = toSignal(this.service["initialised$"]);

  // Additional locales are currently excluded from main build to reduce bundle sizes
  public locale = "en-US";

  constructor(public service: PDFViewerService) {
    super();
    // name of folder pdf viewer assets copied to as declared in `angular.json`
    pdfDefaultOptions.assetsFolder = "assets/comp-pdf";
  }
  ngAfterViewInit(): void {
    this.service.ready();
  }

  public openExternal() {
    this.parent.handleActions(
      [{ action_id: "open_external", args: [this.value()], trigger: "click" }],
      this.rowSignal()
    );
  }
}
