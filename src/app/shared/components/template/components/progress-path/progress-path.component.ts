import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateTranslateService } from "../../services/template-translate.service";

interface IProgressPathParams {
  /** TEMPLATE_PARAMETER: "variant". Default "wavy" */
  variant: "basic" | "wavy" | "curved";
}

// HACK - hardcoded sizing values to make content fit reasonably well
const SIZING = {
  /** Total width for container */
  widthPx: 364,
  /** Target height for text content */
  textContentHeight: 82,
  /** Adjust x for task card overlap */
  xOffset: 68,
  /** Adjust y for task card overlap */
  yOffset: 48,
};

@Component({
  selector: "plh-progress-path",
  templateUrl: "./progress-path.component.html",
  styleUrls: ["./progress-path.component.scss"],
})
export class TmplProgressPathComponent extends TemplateBaseComponent implements OnInit {
  private params: Partial<IProgressPathParams> = {};
  private pathVariant: "basic" | "wavy" | "curved";

  public svgPath: string;
  public svgViewBox: string;
  public contentHeight: string;
  public width = `${SIZING.widthPx}px`;

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.generateSVGPath(this.pathVariant);
  }

  private getParams() {
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "wavy")
      .split(",")
      .join(" ") as IProgressPathParams["variant"];
    this.pathVariant = this.params.variant;
  }

  /**
   * Generate a base SVG segment used to connect 2 progress items together
   * Roughly a horizontal line and smooth bend, adjusted for sizing
   */
  private generateSVGPath(variant: "basic" | "curved" | "wavy" = "wavy") {
    // arbitrary values used to make base width/height fit
    const { widthPx, xOffset, yOffset, textContentHeight } = SIZING;

    // adjust viewbox to include both title content and 100px card (+overlap)
    const viewboxHeight = textContentHeight + 128;

    // SVG Generation (https://www.aleksandrhovhannisyan.com/blog/svg-tutorial/)

    // M - start point (allow space for stroke width and content offset)
    // h - horizontal line, relative length
    // c - bezier curve (64 unit rounded)
    // v - vertical line, relative length

    // Basic generation, smooth
    // https://svg-path-visualizer.netlify.app/#M%20128%2C128%0Ah%20384%20%0Ac%2064%2C0%2064%2C64%2064%2C64%0Av%20352
    const basic = () =>
      `
    M ${xOffset},${yOffset}
    h ${widthPx - 2 * xOffset - 32}
    c 32,0 32,32 32,32
    v ${viewboxHeight - yOffset - 32}
    `.trim();

    // Alt generation that is a bit more wavy
    // https://svg-path-visualizer.netlify.app/#M%2064%2C56%0Ah%20208%0Ac%2048%2C0%2072%2C64%2048%2C128%0A
    const wavy = () =>
      `
    M ${xOffset},${yOffset}
    h ${widthPx - 2 * xOffset - 48}
    c 48,0 72,64 48,${viewboxHeight - yOffset - 4}
    `.trim();

    const curved = () =>
      `
    M ${xOffset},${yOffset}
    c 0,140 280,-80 252,160 1
    v 80
    `.trim();

    switch (variant) {
      case "basic":
        this.svgPath = basic();
        break;
      case "curved":
        this.svgPath = curved();
        break;
      default:
        this.svgPath = wavy();
    }
    this.svgViewBox = `0 0 ${widthPx} ${viewboxHeight}`;
    this.contentHeight = `${textContentHeight}px`;
  }
}
