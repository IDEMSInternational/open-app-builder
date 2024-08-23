import { Component, ElementRef, viewChildren } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { _wait } from "packages/shared/src/utils/async-utils";

// HACK - hardcoded sizing values to make content fit reasonably well
const SIZING = {
  /** Total width for container */
  widthPx: 384,
  /** Target height for text content */
  textContentHeight: 72,
  /** Adjust x for task card overlap */
  xOffset: 64,
  /** Adjust y for task card overlap */
  yOffset: 56,
};

@Component({
  selector: "plh-progress-path",
  templateUrl: "./progress-path.component.html",
  styleUrls: ["./progress-path.component.scss"],
})
export class TmplProgressPathComponent extends TemplateBaseComponent {
  public svgSegmentPath: string;
  public svgViewBox: string;

  public contentHeight = `${SIZING.textContentHeight}px`;
  public width = `${SIZING.widthPx}px`;

  /** Alt implementation - single path for entire svg */
  public svgCombinedPath: string;
  /** Track size of rendered children to help generate combined svg */
  private renderedChildren = viewChildren<ElementRef<HTMLDivElement>>("childRow");

  constructor() {
    super();
    this.generateSVGPath("wavy");
    this.wipGenerateDynamicSVGPath();
  }

  /**
   * Generate a base SVG segment used to connect 2 progress items together
   * Roughly a horizontal line and smooth bend, adjusted for sizing
   */
  private generateSVGPath(variant: "basic" | "wavy" = "basic") {
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
    c 48,0 72,64 48,${viewboxHeight - yOffset - 16}
    `.trim();

    this.svgSegmentPath = variant === "basic" ? basic() : wavy();
    this.svgViewBox = `0 0 ${widthPx} ${viewboxHeight}`;
  }

  /**
   * WiP - generate a single svg that traces a path between all
   * rendered items
   *
   * NOTE - should be triggered in ngAfterViewInit block
   *
   * TODO
   * - Consider using defs and multiple repeated segments
   *   https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
   *
   * - Improve curve to look more natural
   */
  private async wipGenerateDynamicSVGPath() {
    // HACK - ensure components rendered to calc heights correctly
    // TODO - consider fixed heights or some sort of render listener
    await _wait(500);

    // Get coordinate reference points for child rows, alternate LHS, RHS
    // Points are adjusted to accommodate expected task circle cards
    const nodes = this.renderedChildren().map(({ nativeElement }, i) => {
      // TODO - handle RTL lang
      const { left, right, top } = nativeElement.getBoundingClientRect();
      const x = i % 2 === 0 ? left + 32 : right - 104;
      return [x, top - 32];
    });

    // Generate a path connecting each node
    let path = "";
    nodes.forEach(([x1, y1], i) => {
      // initial point
      if (i === 0) {
        path += `M ${x1},${y1}`;
      }
      // path to next
      const next = nodes[i + 1];
      if (next) {
        const [x2, y2] = next;
        // even
        if (i % 2 === 0) {
          // right-bend path (basic / wavy)
          // path += ` h ${x2 - x1 - 32 + 8} c 32,0 32,32 32,32  v ${y2 - y1 - 32}`;
          path += ` h ${x2 - x1 - 32} c 64,0 96,86 32,172`;
        } else {
          // left-bend path (basic / wavy)
          // path += ` h ${x2 - x1 + 32 + 8} c -32,0 -32,32 -32,32  v ${y2 - y1 - 32}`;
          path += ` h -${x1 - x2 - 32} c -64,0 -96,86 -32,172`;
        }
      }
    });
    this.svgCombinedPath = path;
  }
}
