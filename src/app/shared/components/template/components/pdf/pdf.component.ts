import { AfterViewInit, Component, computed, Signal, ViewEncapsulation } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { PDFViewerService } from "./pdf.service";
import { toSignal } from "@angular/core/rxjs-interop";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Message displayed when legacy browser detected */
  compatibility_error_message: coerce.string(
    "Embedded PDFs are not supported in this browser, please use an up-to-date version of Google Chrome to view or open in external app"
  ),
  /** Open external text. Default "Open with..." */
  open_external_text: coerce.string("Open with..."),
  /** Page number to start viewing from. Default 1. */
  starting_page: coerce.number(1),
  /** Show open external button. Default false. */
  show_open_external_button: coerce.boolean(false),
  /** Show download button. Default false. */
  show_download_button: coerce.boolean(false),
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

  public serviceReady!: Signal<unknown>;

  // Additional locales are currently excluded from main build to reduce bundle sizes
  public locale = "en-US";

  constructor(public service: PDFViewerService) {
    super();
    this.serviceReady = toSignal(this.service["initialised$"]);
    // name of folder pdf viewer assets copied to as declared in `angular.json`
    pdfDefaultOptions.assetsFolder = "assets/comp-pdf";
  }
  ngAfterViewInit(): void {
    this.service.ready();
  }

  public openExternal() {
    this.parentContainerComponentRef.handleActions(
      [{ action_id: "open_external", args: [this.value()], trigger: "click" }],
      this.rowSignal()
    );
  }

  public download() {
    this.parentContainerComponentRef.handleActions(
      [{ action_id: "save_to_device", args: [this.value()], trigger: "click" }],
      this.rowSignal()
    );
  }
}
