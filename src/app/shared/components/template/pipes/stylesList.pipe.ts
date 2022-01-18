import { Pipe, PipeTransform } from "@angular/core";
/**
 * Convert styles_list `key: value` array into single string that can be passed to [style]
 * @example <div [styles]="_row.styles_list | stylesList"></div>
 */

@Pipe({ name: "stylesList" })
export class StylesListPipe implements PipeTransform {
  transform(styles: string[]) {
    if (styles && Array.isArray(styles)) {
      return styles.join(";");
    }
    return "";
  }
}
