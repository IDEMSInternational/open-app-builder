import katex from "katex";
import { extractMath, Segment } from "extract-math";

export function latexToHtml(latexInput: string) {
  let segments: Segment[] = [];
  if (latexInput && typeof latexInput === "string" && latexInput.length >= 0) {
    const dollarSignDelimitedSegments = extractMath(latexInput, {
      delimiters: {
        inline: ["$", "$"],
        display: ["$$", "$$"],
      },
    });

    segments =
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
    if (segments.some((segment) => segment.math)) {
      for (const segment of segments) {
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

    return htmlString;
  }
  return latexInput;
}
