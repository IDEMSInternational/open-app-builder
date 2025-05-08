import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arraySort",
  standalone: false,
})

/**
 * Simple pipe to sort a string array
 */
export class ArraySortPipe implements PipeTransform {
  transform(value: string[]) {
    return value.sort();
  }
}
