import { Pipe, PipeTransform } from "@angular/core";
import { format } from "date-fns";

@Pipe({
  name: "isoDateToDateInput",
})
/**
 * Convert an iso date string to format for date input (e.g. 2020-21-09)
 */
export class IsoDateToDateInputPipe implements PipeTransform {
  transform(isoDateString: string, ...args: any[]): any {
    if (isoDateString) {
      return format(new Date(isoDateString), "yyyy-MM-dd");
    } else {
      // if empty/null/undefined simply return as is
      return isoDateString;
    }
  }
}
