import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "number",
})
export class NumberingPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    let result: string;
    const firstLineText = value.match(/(.*?\:)/, "");
    const list = value
      .split("-")
      .map((r, idx) => {
        if (idx > 0) return (r = `<li>${r}</li>`);
      })
      .join(" ");
    result = firstLineText ? `<p>${firstLineText[0]}</p><ol>${list}<ol>` : `<ol>${list}<ol>`;
    return result;
  }
}
