import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "number",
})
export class NumberingPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    let result: string;
    result = value
      .split("-")
      .map((r, idx) => {
        if (idx > 0) return (r = `<li>${r}</li>`);
      })
      .join(" ");
    return `<ol>${result}<ol>`;
  }
}
