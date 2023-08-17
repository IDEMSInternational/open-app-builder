import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import katex from "katex";
import { extractMath, Segment } from "extract-math";
import DOMPurify from "dompurify";

@Pipe({
  name: "latex",
})
/* Checks for LaTeX equations within a text string and renders text and LaTeX as HTML.
Accepts delimiters around LaTeX equations either of type $...$ and $$...$$, or \(...\) and \[...\].
The equations will be formatted as 'inline' or 'display' in accordance with LaTeX's syntax */
export class LatexPipe implements PipeTransform {
  segments: Segment[] = [];

  constructor(private domSanitizer: DomSanitizer) {}

  transform(latexInput: string): SafeHtml {
    if (latexInput && typeof latexInput === "string" && latexInput.length >= 0) {
      const dollarSignDelimitedSegments = extractMath(latexInput, {
        delimiters: {
          inline: ["$", "$"],
          display: ["$$", "$$"],
        },
      });

      this.segments =
        dollarSignDelimitedSegments.length > 1
          ? dollarSignDelimitedSegments
          : extractMath(latexInput, {
              delimiters: {
                inline: ["\\(", "\\)"],
                display: ["\\[", "\\]"],
              },
            });

      let htmlString = `<p>`;

      // detect whether input string contains a LaTeX 'math' segment, and is therefore in LaTeX's 'paragraph mode', else is itself in 'math mode'
      if (this.segments.some((segment) => segment.math)) {
        for (const segment of this.segments) {
          if (segment.math) {
            htmlString += katex.renderToString(segment.raw, {
              displayMode: segment.type === "display",
              throwOnError: true,
            });
          } else {
            htmlString += segment.value;
          }
        }
      } else {
        htmlString += katex.renderToString(latexInput, {
          throwOnError: true,
        });
      }
      htmlString += `</p>`;

      const sanitizedHtml = DOMPurify.sanitize(htmlString);
      return this.domSanitizer.bypassSecurityTrustHtml(sanitizedHtml);
    }
    return latexInput;
  }
}
