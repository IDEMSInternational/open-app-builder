import { Pipe, PipeTransform } from "@angular/core";
import { differenceInDays } from "date-fns";

@Pipe({
  name: "calcDaysDiff",
})
export class CalcDaysDiffPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return value;
    }
    const diffInDays = differenceInDays(new Date(), new Date(value));
    return diffInDays;
  }
}
