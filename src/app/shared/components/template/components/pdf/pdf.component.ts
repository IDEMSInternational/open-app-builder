import { AfterViewInit, Component, computed, ViewEncapsulation } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { PDFViewerService } from "./pdf.service";
import { toSignal } from "@angular/core/rxjs-interop";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** The page to display when the component is initially rendered. Default 1. */
  starting_page: coerce.number(1),
  /** Message displayed when legacy browser detected. */
  compatibility_error_message: coerce.string(
    "Embedded PDFs are not supported in this browser, please use an up-to-date version of Google Chrome to view or open in external app"
  ),
  /** Text for the "Open with..." button. Default "Open with...". */
  open_external_text: coerce.string("Open with..."),
  /** Show full screen button. Default true. */
  allow_fullscreen: coerce.boolean(true),
}));

@Component({
  selector: "plh-pdf",
  templateUrl: "./pdf.component.html",
  styleUrls: ["./pdf.component.scss"],
  // Allow override of global pdf viewer styles
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TmplPdfComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements AfterViewInit
{
  public pdfSrc = computed(() => this.value());

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
