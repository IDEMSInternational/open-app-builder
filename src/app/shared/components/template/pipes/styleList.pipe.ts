import { Pipe, PipeTransform } from "@angular/core";
/**
 * Convert style_list `key: value` array into single string that can be passed to [style]
 * @example <div [styles]="_row.style_list | styleList"></div>
 */

@Pipe({ name: "styleList" })
export class StyleListPipe implements PipeTransform {
  transform(style_list: string[]) {
    if (style_list && Array.isArray(style_list)) {
      return style_list.join(";");
    }
    return "";
  }
}
