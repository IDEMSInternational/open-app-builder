import { Pipe, PipeTransform } from "@angular/core";
import { parseMarkdown } from "src/app/shared/utils";

@Pipe({
  name: "markdown",
})
export class MarkdownPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    if (value && typeof value === "string" && value.length >= 0) {
      return parseMarkdown(value);
    }
    return value;
  }
}
